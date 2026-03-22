import { NextResponse } from "next/server";
import { canGenerateImage, recordImageGeneration, getRemainingImageGenerations } from "@/lib/images";

export async function POST(request: Request) {
  try {
    const { prompt, userId } = await request.json();

    if (!prompt || !userId) {
      return NextResponse.json({ error: "Missing prompt or userId" }, { status: 400 });
    }

    const allowed = await canGenerateImage(userId);
    if (!allowed) {
      return NextResponse.json({ error: "Daily image generation limit reached (5/day)" }, { status: 429 });
    }

    const imagePrompt = `${prompt}, professional high quality photo, clean modern style`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=640&height=480&nologo=true&seed=${Date.now()}`;

    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) {
      return NextResponse.json({ error: "Image generation failed" }, { status: 502 });
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const mime = response.headers.get("content-type") || "image/jpeg";
    const dataUrl = `data:${mime};base64,${base64}`;

    await recordImageGeneration(userId);
    const remaining = await getRemainingImageGenerations(userId);

    return NextResponse.json({ image: dataUrl, remaining });
  } catch (err) {
    console.error("Image generation error:", err);
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}
