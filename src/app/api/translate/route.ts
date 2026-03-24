import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const apiKey = "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316";
const apiHost = "chatgpt-42.p.rapidapi.com";

export async function POST(req: NextRequest) {
  try {
    const { content, targetLanguage } = await req.json();

    if (!content || !targetLanguage) {
      return NextResponse.json({ error: "Missing content or targetLanguage" }, { status: 400 });
    }

    // No-op for English
    if (targetLanguage === "English") {
      return NextResponse.json({ translatedContent: content });
    }

    // Send entire sectionContents as one JSON string to the AI
    const prompt = `You are a professional website translator.
Translate ALL text values in the following JSON object to ${targetLanguage}.
Rules:
- Keep ALL JSON keys exactly the same (do not translate keys)
- Only translate string values
- Keep URLs, numbers, and technical terms unchanged
- Return ONLY the translated JSON object, no explanation, no markdown

JSON to translate:
${JSON.stringify(content)}`;

    const response = await fetch(`https://${apiHost}/conversationgpt4`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        system_prompt: "You are a professional translator. Return ONLY valid JSON, no markdown, no extra text.",
        temperature: 0.1,
        max_tokens: 4000,
        web_access: false,
      }),
    });

    if (!response.ok) {
      console.error("Translate API HTTP error:", response.status);
      return NextResponse.json({ translatedContent: content });
    }

    const result = await response.json();
    const text = result?.result || result?.response || result?.choices?.[0]?.message?.content || "";
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let translatedContent: Record<string, unknown>;
    try {
      // Try to find a JSON object in the response
      const match = jsonStr.match(/\{[\s\S]*\}/);
      translatedContent = JSON.parse(match ? match[0] : jsonStr);
    } catch {
      // If parsing fails return original — never crash the site
      console.error("Failed to parse translated JSON, returning original");
      return NextResponse.json({ translatedContent: content });
    }

    return NextResponse.json({ translatedContent });
  } catch (error) {
    console.error("Translation error:", error);
    // Always return something valid — never break the site
    return NextResponse.json({ translatedContent: {} });
  }
}
