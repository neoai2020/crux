import { NextRequest, NextResponse } from "next/server";
import { canGenerateMarketing, recordMarketingGeneration, getRemainingMarketingGenerations } from "@/lib/marketing";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ remaining: 15 });
  }
  const remaining = await getRemainingMarketingGenerations(userId);
  return NextResponse.json({ remaining });
}

const SYSTEM_PROMPT = `You are an expert social media copywriter who writes high-converting marketing posts. Given a business name, description, website URL, and target platform, generate a unique marketing post.

Rules:
- Write in a natural, engaging tone that fits the platform's culture
- Include the website URL naturally in the post
- Use relevant emojis sparingly
- Each post should use a different angle/hook (curiosity, storytelling, problem-solution, social proof, question, urgency, tips, personal journey, etc.)
- Keep posts concise but impactful
- For Reddit: include a suggested subreddit and title
- For Twitter/X: keep under 280 chars or format as a thread
- For LinkedIn: professional tone with line breaks
- For Facebook: conversational, group-friendly tone
- For Quora: answer-style format
- For Forums: helpful, community-first tone

Return ONLY a JSON object:
{
  "title": "Post title or subject",
  "message": "The full post content with URL included",
  "subreddit": "r/SubredditName (only for Reddit, otherwise null)"
}

No explanation, no markdown fences, just the JSON.`;

function buildFallbackPost(
  businessName: string,
  url: string,
  description: string,
  platform: string,
  index: number
): { title: string; message: string; subreddit?: string } {
  const name = businessName || "our product";
  const desc = description || "an innovative solution";

  const hooks = [
    { style: "curiosity", opener: `🤔 What if I told you there's a way to completely change how you approach ${name}?` },
    { style: "story", opener: `📖 6 months ago, I was stuck. Then I found ${name} and everything changed.` },
    { style: "problem", opener: `❌ Tired of wasting time on things that don't work? ${name} solves exactly that.` },
    { style: "proof", opener: `🏆 Thousands of people have already discovered ${name} — and the results speak for themselves.` },
    { style: "cta", opener: `⚡ Stop scrolling. If you need ${desc}, this is it.` },
    { style: "question", opener: `💭 Have you ever felt like you're doing everything right but still not seeing results?` },
    { style: "controversial", opener: `🔥 Unpopular opinion: Most advice on this topic is outdated.` },
    { style: "personal", opener: `🙋 Real talk — a year ago, I almost gave up. Then someone recommended ${name}.` },
    { style: "tips", opener: `📋 3 things I wish I knew sooner about ${desc}:` },
    { style: "urgency", opener: `⏰ This won't be available forever — I just got access to ${name}.` },
  ];

  const hook = hooks[index % hooks.length];
  const body = `\n\n${desc}\n\nCheck it out: ${url}\n\nWould love to hear your thoughts! 🚀`;

  const base = {
    title: `${hook.style === "story" ? "My journey with" : "Check out"} ${name}`,
    message: `${hook.opener}${body}`,
  };

  if (platform === "Reddit") {
    return { ...base, subreddit: "r/Entrepreneur" };
  }
  return base;
}

export async function POST(req: NextRequest) {
  try {
    const { businessName, url, description, platforms, userId } = await req.json();

    if (!userId || !businessName || !platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const allowed = await canGenerateMarketing(userId);
    if (!allowed) {
      const remaining = await getRemainingMarketingGenerations(userId);
      return NextResponse.json({ error: "Daily generation limit reached (15/day). Resets tomorrow!", remaining }, { status: 429 });
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    const apiHost = process.env.RAPIDAPI_HOST;
    const siteUrl = url || `crux.site/${businessName.toLowerCase().replace(/\s+/g, "-")}`;
    const desc = description || `${businessName} - an innovative platform`;

    const PLATFORM_NAMES: Record<string, string> = {
      reddit: "Reddit",
      forum: "Forums",
      facebook: "Facebook Groups",
      twitter: "X / Twitter",
      linkedin: "LinkedIn",
      quora: "Quora",
    };

    const PLATFORM_ICONS: Record<string, string> = {
      reddit: "🔴",
      forum: "💬",
      facebook: "📘",
      twitter: "🐦",
      linkedin: "💼",
      quora: "❓",
    };

    interface GeneratedMessage {
      platform: string;
      icon: string;
      title: string;
      message: string;
      subreddit?: string;
    }

    const messages: GeneratedMessage[] = [];
    let globalIdx = 0;

    for (const platformId of platforms) {
      const platformName = PLATFORM_NAMES[platformId] || platformId;
      const postsPerPlatform = platformId === "reddit" || platformId === "twitter" ? 2 : 1;

      for (let p = 0; p < postsPerPlatform; p++) {
        let result: { title: string; message: string; subreddit?: string } | null = null;

        if (apiKey && apiHost) {
          try {
            const angle = ["curiosity hook", "storytelling", "problem-solution", "social proof", "direct CTA", "question opener", "controversial take", "personal journey", "listicle/tips", "urgency/FOMO"][globalIdx % 10];

            const response = await fetch(`https://${apiHost}/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-rapidapi-key": apiKey,
                "x-rapidapi-host": apiHost,
              },
              body: JSON.stringify({
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  {
                    role: "user",
                    content: `Business: ${businessName}\nDescription: ${desc}\nURL: ${siteUrl}\nPlatform: ${platformName}\nAngle: ${angle}\nPost number: ${p + 1} of ${postsPerPlatform} for this platform`,
                  },
                ],
                temperature: 0.85,
              }),
              signal: AbortSignal.timeout(20000),
            });

            if (response.ok) {
              const data = await response.json();
              const text =
                data?.choices?.[0]?.message?.content ||
                data?.result ||
                data?.response ||
                "";

              const jsonMatch = text.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                if (parsed.title && parsed.message) {
                  if (!parsed.message.includes(siteUrl)) {
                    parsed.message += `\n\n👉 ${siteUrl}`;
                  }
                  result = {
                    title: parsed.title,
                    message: parsed.message,
                    subreddit: platformId === "reddit" ? (parsed.subreddit || "r/Entrepreneur") : undefined,
                  };
                }
              }
            }
          } catch {
            // fall through to fallback
          }
        }

        if (!result) {
          result = buildFallbackPost(businessName, siteUrl, desc, platformName, globalIdx);
        }

        messages.push({
          platform: platformName,
          icon: PLATFORM_ICONS[platformId] || "📝",
          title: result.title,
          message: result.message,
          subreddit: result.subreddit,
        });

        globalIdx++;
      }
    }

    await recordMarketingGeneration(userId);
    const remaining = await getRemainingMarketingGenerations(userId);

    return NextResponse.json({ messages, remaining });
  } catch (err) {
    console.error("Marketing generation error:", err);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
