import { NextResponse } from "next/server";
import { canGenerateImage, recordImageGeneration, getRemainingImageGenerations } from "@/lib/images";

export const maxDuration = 60;

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316";

function extractBase64FromResponse(json: Record<string, unknown>): string | null {
  if (typeof json.image === "string" && json.image.length > 100) return json.image;
  if (typeof json.image_base64 === "string") return json.image_base64;
  if (typeof json.result === "string" && json.result.length > 100) return json.result;
  if (typeof json.output === "string" && json.output.length > 100) return json.output;
  if (typeof json.b64_json === "string") return json.b64_json;

  if (Array.isArray(json.data) && json.data.length > 0) {
    const first = json.data[0] as Record<string, unknown>;
    if (typeof first.b64_json === "string") return first.b64_json;
    if (typeof first.url === "string") return first.url;
    if (typeof first.image === "string") return first.image;
  }

  if (Array.isArray(json.images) && json.images.length > 0) {
    const first = json.images[0];
    if (typeof first === "string") return first;
    if (typeof first === "object" && first !== null) {
      const img = first as Record<string, unknown>;
      if (typeof img.url === "string") return img.url;
      if (typeof img.b64_json === "string") return img.b64_json;
    }
  }

  return null;
}

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

    let dataUrl: string | null = null;

    // --- Method 1: RapidAPI Google Nano Banana ---
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
        const contentType = rapidRes.headers.get("content-type") || "";

        if (contentType.startsWith("image/")) {
          const buf = await rapidRes.arrayBuffer();
          if (buf.byteLength > 1000) {
            const base64 = Buffer.from(buf).toString("base64");
            dataUrl = `data:${contentType.split(";")[0]};base64,${base64}`;
          }
        } else {
          const text = await rapidRes.text();

          try {
            const json = JSON.parse(text) as Record<string, unknown>;
            const extracted = extractBase64FromResponse(json);

            if (extracted) {
              if (extracted.startsWith("http")) {
                const imgRes = await fetch(extracted, { signal: AbortSignal.timeout(30000) });
                if (imgRes.ok) {
                  const ct = imgRes.headers.get("content-type") || "image/png";
                  const buf = await imgRes.arrayBuffer();
                  if (buf.byteLength > 1000) {
                    dataUrl = `data:${ct.split(";")[0]};base64,${Buffer.from(buf).toString("base64")}`;
                  }
                }
              } else if (extracted.startsWith("data:")) {
                dataUrl = extracted;
              } else {
                dataUrl = `data:image/png;base64,${extracted}`;
              }
            }
          } catch {
            if (text.length > 1000 && /^[A-Za-z0-9+/=\s]+$/.test(text.trim())) {
              dataUrl = `data:image/png;base64,${text.trim()}`;
            }
          }
        }
      } else {
        console.error("RapidAPI returned status:", rapidRes.status);
      }
    } catch (e) {
      console.error("RapidAPI image generation failed:", e);
    }

    // --- Method 2: Pollinations fallback ---
    if (!dataUrl) {
      const seed = Math.floor(Math.random() * 999999);
      const urls = [
        `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=640&height=480&nologo=true&seed=${seed}&model=flux`,
        `https://gen.pollinations.ai/image/${encodeURIComponent(imagePrompt)}?width=640&height=480&nologo=true&seed=${seed}&model=flux`,
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
                dataUrl = `data:${ct.split(";")[0]};base64,${base64}`;
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
