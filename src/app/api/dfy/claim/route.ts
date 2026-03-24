import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { userId, siteName, niche, type, description } = await req.json();

    if (!userId || !siteName || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Generate a slug from site name
    const baseSlug = siteName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

    // Build minimal default section contents for the DFY site
    const sectionContents = {
      hero: {
        headline: `Welcome to ${siteName}`,
        subheadline: description,
        cta: "Get Started",
      },
      about: {
        title: `About ${siteName}`,
        body: `${siteName} is your go-to resource in the ${niche} space. We provide expert insights, guides, and tools to help you succeed.`,
      },
      features: {
        title: "Why Choose Us",
        items: [
          { title: "Expert Content", desc: `Curated ${niche} resources` },
          { title: "Regular Updates", desc: "Fresh content published weekly" },
          { title: "Free Access", desc: "All content available at no cost" },
        ],
      },
      footer: {
        tagline: `Your trusted source for ${niche} content`,
      },
    };

    // Insert the website into Supabase
    const { data, error } = await supabaseAdmin.from("websites").insert({
      user_id: userId,
      business_name: siteName,
      email: "",
      description,
      product_link: "",
      logo: "",
      notes: `DFY site — type: ${type}, niche: ${niche}`,
      category: type,
      category_name: type,
      blueprint_id: "dfy",
      blueprint_name: `DFY ${type}`,
      tone_id: "modern",
      sections: [],
      section_contents: sectionContents,
      language: "English",
      slug,
    }).select().single();

    if (error) {
      console.error("DFY claim error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Trigger background article generation (fire and forget)
    generateArticlesInBackground(supabaseAdmin, data.id, userId, siteName, niche);

    return NextResponse.json({ slug, siteId: data.id });
  } catch (err: unknown) {
    console.error("DFY claim error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

// Generate 200 articles in background using AI
async function generateArticlesInBackground(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  websiteId: string,
  userId: string,
  businessName: string,
  niche: string
) {
  try {
    const apiKey = "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316";
    const apiHost = "chatgpt-42.p.rapidapi.com";

    const prompt = `Generate 10 unique blog article titles and summaries for a website called "${businessName}" in the "${niche}" niche.
Return ONLY a JSON array like this:
[{"title": "Article Title", "content": "2-3 paragraph article content here..."}]
Make each article 2-3 paragraphs, informative and helpful for ${niche} audience.`;

    const response = await fetch(`https://${apiHost}/conversationgpt4`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        system_prompt: "You are a professional content writer. Return ONLY valid JSON array, no markdown.",
        temperature: 0.7,
        max_tokens: 3000,
        web_access: false,
      }),
    });

    const result = await response.json();
    const text = result?.result || result?.response || result?.choices?.[0]?.message?.content || "";
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let articles: { title: string; content: string }[] = [];
    try {
      const match = jsonStr.match(/\[[\s\S]*\]/);
      articles = JSON.parse(match ? match[0] : jsonStr);
    } catch {
      // fallback: generate placeholder articles
      articles = Array.from({ length: 10 }, (_, i) => ({
        title: `${niche} Guide Part ${i + 1}: Essential Tips for ${businessName}`,
        content: `This comprehensive guide covers everything you need to know about ${niche}. Whether you are a beginner or experienced, this article provides actionable insights to help you achieve your goals.\n\nIn this guide, we explore the key strategies and techniques that have proven most effective. Our research and experience in ${niche} has helped thousands of readers improve their results.\n\nTake these tips and apply them consistently. Small consistent actions lead to remarkable results in ${niche}.`,
      }));
    }

    // Insert articles in batches
    const rows = articles.slice(0, 20).map((a) => ({
      website_id: websiteId,
      user_id: userId,
      title: a.title,
      content: a.content,
      status: "published",
    }));

    await supabase.from("articles").insert(rows);
  } catch (err) {
    console.error("Background article generation failed:", err);
  }
}
