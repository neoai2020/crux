import { NextRequest, NextResponse } from "next/server";

const CATEGORY_IDS = [
  "functional", "blog", "ecommerce", "sales-funnel", "landing", "dropship",
  "course", "membership", "agency", "marketplace", "ads", "local", "mobile-app",
];

const SYSTEM_PROMPT = `You are a website planning assistant. The user will describe their business or what kind of website they need. Extract the following information and return ONLY valid JSON (no markdown, no explanation):

{
  "businessName": "the business name if mentioned, otherwise create a short professional one based on what they described",
  "category": "one of: functional, blog, ecommerce, sales-funnel, landing, dropship, course, membership, agency, marketplace, ads, local, mobile-app",
  "description": "a 1-2 sentence description of the business based on what the user said",
  "email": "if an email was mentioned, include it, otherwise empty string",
  "suggestedTone": "one of: bold, clean, warm, dark, elegant - pick what fits the business type best"
}

Category guide:
- functional: general business/corporate websites
- blog: content/writing/news focused
- ecommerce: online stores selling products
- sales-funnel: single product/service sales pages
- landing: lead generation, signups
- dropship: dropshipping stores
- course: online courses/education
- membership: subscription/membership platforms
- agency: creative/digital agency portfolios
- marketplace: platforms where others sell
- ads: advertisement/promo landing pages
- local: local businesses (restaurants, salons, etc.)
- mobile-app: app landing pages

Return ONLY the JSON object. No other text.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json(
        { error: "Please describe your business or website needs." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    const apiHost = process.env.RAPIDAPI_HOST;

    if (!apiKey || !apiHost) {
      return fallbackAnalysis(prompt);
    }

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
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error("RapidAPI error:", response.status);
      return fallbackAnalysis(prompt);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content
      || data?.result
      || data?.response
      || (typeof data === "string" ? data : JSON.stringify(data));

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return fallbackAnalysis(prompt);
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!CATEGORY_IDS.includes(parsed.category)) {
      parsed.category = "functional";
    }

    return NextResponse.json({
      businessName: parsed.businessName || "My Business",
      category: parsed.category || "functional",
      description: parsed.description || prompt.slice(0, 200),
      email: parsed.email || "",
      suggestedTone: parsed.suggestedTone || "bold",
    });
  } catch (error) {
    console.error("Analyze prompt error:", error);
    return fallbackAnalysis("");
  }
}

function fallbackAnalysis(prompt: string): NextResponse {
  const lower = prompt.toLowerCase();

  const categoryMap: Record<string, string[]> = {
    local: ["restaurant", "cafe", "salon", "barber", "gym", "dentist", "clinic", "bakery", "pizza", "plumber", "mechanic"],
    ecommerce: ["store", "shop", "sell products", "ecommerce", "e-commerce", "clothing", "jewelry", "merch"],
    blog: ["blog", "writer", "content", "news", "journal", "magazine", "articles"],
    agency: ["agency", "studio", "creative", "design agency", "marketing agency", "freelanc"],
    course: ["course", "teach", "tutor", "academy", "training", "learn", "education"],
    membership: ["membership", "subscribe", "community", "exclusive", "members"],
    "sales-funnel": ["funnel", "launch", "webinar", "convert", "sales page"],
    landing: ["landing page", "lead", "signup", "waitlist", "coming soon"],
    dropship: ["dropship", "drop ship", "aliexpress", "trending products"],
    marketplace: ["marketplace", "platform", "vendor", "sellers"],
    "mobile-app": ["app", "mobile", "ios", "android", "download"],
    ads: ["ad ", "ads", "promo", "campaign", "advertis"],
  };

  let category = "functional";
  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      category = cat;
      break;
    }
  }

  const words = prompt.split(/\s+/).filter((w) => w.length > 2);
  const capitalized = words.filter((w) => /^[A-Z]/.test(w) && !/^(I|I'm|I've|My|The|A|An|We|Our)$/.test(w));
  const businessName = capitalized.length >= 2
    ? capitalized.slice(0, 3).join(" ")
    : capitalized.length === 1
      ? capitalized[0]
      : "My Business";

  return NextResponse.json({
    businessName,
    category,
    description: prompt.slice(0, 200),
    email: "",
    suggestedTone: category === "agency" ? "dark" : category === "local" ? "warm" : "bold",
  });
}
