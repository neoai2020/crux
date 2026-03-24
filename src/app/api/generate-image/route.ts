import { NextResponse } from "next/server";
import { canGenerateImage, recordImageGeneration, getRemainingImageGenerations } from "@/lib/images";

export const maxDuration = 60;

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316";

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

    // Try RapidAPI (Google Nano) first, then Pollinations as fallback
    let dataUrl: string | null = null;

    // --- Method 1: RapidAPI Google Nano ---
    try {
      const body = new URLSearchParams({
        prompt: imagePrompt,
        negative_prompt: "blurry, bad quality, distorted, ugly, watermark, text",
        width: "640",
        height: "480",
      });

      const rapidRes = await fetch("https://google-nano-banana4.p.rapidapi.com/index.php", {
        method: "POST",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "google-nano-banana4.p.rapidapi.com",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
        signal: AbortSignal.timeout(50000),
      });

      if (rapidRes.ok) {
        const json = await rapidRes.json();
        if (json.status === "success" && json.image_base64) {
          dataUrl = `data:image/png;base64,${json.image_base64}`;
        }
      }
    } catch (e) {
      console.error("RapidAPI image generation failed:", e);
    }

    // --- Method 2: Pollinations fallback ---
    if (!dataUrl) {
      const seed = Math.floor(Math.random() * 999999);
      const urls = [
        `https://gen.pollinations.ai/image/${encodeURIComponent(imagePrompt)}?width=640&height=480&nologo=true&seed=${seed}&model=flux`,
        `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=640&height=480&nologo=true&seed=${seed}&model=flux`,
      ];

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
                const base64 = Buffer.from(buf).toString("base64");
                dataUrl = `data:${ct};base64,${base64}`;
                break;
              }
            }
          }
        } catch (e) {
          console.error("Pollinations fallback failed:", e);
        }
      }
    }

    if (!dataUrl) {
      return NextResponse.json({ error: "Image generation timed out. Please try again." }, { status: 502 });
    }

    await recordImageGeneration(userId);
    const remaining = await getRemainingImageGenerations(userId);

    return NextResponse.json({ image: dataUrl, remaining });
  } catch (err) {
    console.error("Image generation error:", err);
    return NextResponse.json({ error: "Image generation failed. Please try again." }, { status: 500 });
  }
}
