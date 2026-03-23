import { NextResponse } from "next/server";
import { canGenerateImage, recordImageGeneration, getRemainingImageGenerations } from "@/lib/images";

export const maxDuration = 60;

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

    const imagePrompt = `${prompt}, professional high quality photo, clean modern`;
    const seed = Math.floor(Math.random() * 999999);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=640&height=480&nologo=true&seed=${seed}`;

    let response: Response | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        response = await fetch(url, {
          redirect: "follow",
          signal: AbortSignal.timeout(45000),
        });
        if (response.ok) break;
      } catch {
        if (attempt === 2) throw new Error("All attempts failed");
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json({ error: "Image generation failed" }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid response from image service" }, { status: 502 });
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 1000) {
      return NextResponse.json({ error: "Image too small, generation may have failed" }, { status: 502 });
    }

    const base64 = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    await recordImageGeneration(userId);
    const remaining = await getRemainingImageGenerations(userId);

    return NextResponse.json({ image: dataUrl, remaining });
  } catch (err) {
    console.error("Image generation error:", err);
    return NextResponse.json({ error: "Image generation timed out. Try again." }, { status: 500 });
  }
}
