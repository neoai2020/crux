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

    const urls = [
      `https://gen.pollinations.ai/image/${encodeURIComponent(imagePrompt)}?width=640&height=480&nologo=true&seed=${seed}&model=flux`,
      `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=640&height=480&nologo=true&seed=${seed}&model=flux`,
    ];

    let imageBuffer: ArrayBuffer | null = null;
    let contentType = "image/jpeg";

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          redirect: "follow",
          signal: AbortSignal.timeout(50000),
        });
        if (response.ok) {
          const ct = response.headers.get("content-type") || "";
          if (ct.startsWith("image/")) {
            const buf = await response.arrayBuffer();
            if (buf.byteLength > 1000) {
              imageBuffer = buf;
              contentType = ct;
              break;
            }
          }
        }
      } catch (e) {
        console.error("Image fetch attempt failed:", e);
      }
    }

    if (!imageBuffer) {
      return NextResponse.json({ error: "Image generation timed out. Please try again." }, { status: 502 });
    }

    const base64 = Buffer.from(imageBuffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    await recordImageGeneration(userId);
    const remaining = await getRemainingImageGenerations(userId);

    return NextResponse.json({ image: dataUrl, remaining });
  } catch (err) {
    console.error("Image generation error:", err);
    return NextResponse.json({ error: "Image generation failed. Please try again." }, { status: 500 });
  }
}
