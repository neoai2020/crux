import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a creative branding expert. Given a business description, generate 1 catchy, memorable, and professional business name. The name should be:
- Short (1-3 words max)
- Brandable and unique
- Easy to remember and spell
- Relevant to the business type
- Modern and appealing

Return ONLY a JSON object like: {"name": "TheName"}
No explanation, no markdown, just the JSON.`;

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json({ name: "My Business" });
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    const apiHost = process.env.RAPIDAPI_HOST;

    if (!apiKey || !apiHost) {
      return NextResponse.json({ name: generateFallbackName(description) });
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
          { role: "user", content: `Business description: ${description}` },
        ],
        temperature: 0.9,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return NextResponse.json({ name: generateFallbackName(description) });
    }

    const data = await response.json();
    const text =
      data?.choices?.[0]?.message?.content ||
      data?.result ||
      data?.response ||
      "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.name && typeof parsed.name === "string") {
        return NextResponse.json({ name: parsed.name.trim() });
      }
    }

    const cleaned = text.replace(/["`]/g, "").trim();
    if (cleaned.length > 0 && cleaned.length < 40) {
      return NextResponse.json({ name: cleaned });
    }

    return NextResponse.json({ name: generateFallbackName(description) });
  } catch {
    return NextResponse.json({ name: "My Business" });
  }
}

function generateFallbackName(description: string): string {
  const prefixes = [
    "Nova", "Apex", "Bloom", "Spark", "Drift", "Pulse", "Flux",
    "Peak", "Sage", "Vibe", "Core", "Luma", "Crest", "Hive", "Aura",
  ];
  const suffixes = [
    "Co", "Lab", "Hub", "Pro", "Works", "Studio", "Craft",
    "Edge", "Flow", "Base", "Point", "Space", "Zone", "Forge",
  ];
  const lower = description.toLowerCase();

  const niches: Record<string, string[]> = {
    photo: ["LensCraft", "SnapForge", "ShutterPeak", "FrameFlow", "PixelEdge"],
    food: ["FlavorPeak", "TasteCraft", "BiteBridge", "FreshPlate", "SpiceNova"],
    fitness: ["FitPulse", "BodyForge", "CorePeak", "ActiveEdge", "VitalFlow"],
    tech: ["TechNova", "CodePulse", "ByteForge", "DevCraft", "PixelLab"],
    design: ["DesignPulse", "ArtForge", "CreativeEdge", "StudioNova", "CanvasCraft"],
    market: ["GrowthHub", "BrandPeak", "ReachNova", "CampaignForge", "AdPulse"],
    health: ["WellPath", "VitalCare", "HealthPeak", "CureNova", "MedFlow"],
    education: ["LearnPeak", "SkillForge", "MindCraft", "EduNova", "BrightPath"],
    beauty: ["GlowCraft", "BeautyPulse", "BloomStudio", "LuxeEdge", "RadiantNova"],
    real: ["HomeNova", "NestPeak", "PropertyEdge", "KeyCraft", "SpacePulse"],
  };

  for (const [key, names] of Object.entries(niches)) {
    if (lower.includes(key)) {
      return names[Math.floor(Math.random() * names.length)];
    }
  }

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix}${suffix}`;
}
