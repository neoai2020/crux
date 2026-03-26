import { NextResponse } from "next/server";
import { canGenerateImage, recordImageGeneration, getRemainingImageGenerations } from "@/lib/images";

export const maxDuration = 60;

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";

async function fetchImageAsDataUrl(imageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 1000) return null;
    const ct = res.headers.get("content-type") || "image/png";
    const mime = ct.startsWith("image/") ? ct.split(";")[0] : "image/png";
    return `data:${mime};base64,${Buffer.from(buf).toString("base64")}`;
  } catch {
    return null;
  }
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

    // --- Method 1: ChatGPT-42 text-to-image (primary — proven working) ---
    try {
      const res = await fetch("https://chatgpt-42.p.rapidapi.com/texttoimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        },
        body: JSON.stringify({ text: imagePrompt }),
        signal: AbortSignal.timeout(55000),
      });

      if (res.ok) {
        const json = await res.json();
        const imgUrl = json.generated_image || json.image || json.url || json.result;
        if (typeof imgUrl === "string" && imgUrl.startsWith("http")) {
          dataUrl = await fetchImageAsDataUrl(imgUrl);
        }
      } else {
        console.error("ChatGPT-42 texttoimage status:", res.status);
      }
    } catch (e) {
      console.error("ChatGPT-42 texttoimage failed:", e);
    }

    // --- Method 2: RapidAPI Google Nano Banana (secondary) ---
    if (!dataUrl) {
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
              dataUrl = `data:${contentType.split(";")[0]};base64,${Buffer.from(buf).toString("base64")}`;
            }
          } else {
            const text = await rapidRes.text();
            try {
              const json = JSON.parse(text) as Record<string, unknown>;
              if (json.status === "error") {
                console.error("Nano Banana error:", json.message);
              } else {
                const val =
                  (typeof json.image === "string" && json.image) ||
                  (typeof json.image_base64 === "string" && json.image_base64) ||
                  (typeof json.result === "string" && json.result) ||
                  (Array.isArray(json.data) && json.data[0] &&
                    ((json.data[0] as Record<string, unknown>).b64_json ||
                     (json.data[0] as Record<string, unknown>).url)) ||
                  null;

                if (typeof val === "string" && val.length > 100) {
                  if (val.startsWith("http")) {
                    dataUrl = await fetchImageAsDataUrl(val);
                  } else if (val.startsWith("data:")) {
                    dataUrl = val;
                  } else {
                    dataUrl = `data:image/png;base64,${val}`;
                  }
                }
              }
            } catch {
              if (text.length > 1000 && /^[A-Za-z0-9+/=\s]+$/.test(text.trim())) {
                dataUrl = `data:image/png;base64,${text.trim()}`;
              }
            }
          }
        }
      } catch (e) {
        console.error("Nano Banana failed:", e);
      }
    }

    if (!dataUrl) {
      return NextResponse.json({ error: "Image generation failed. Please try again." }, { status: 502 });
    }

    await recordImageGeneration(userId);
    const remaining = await getRemainingImageGenerations(userId);

    return NextResponse.json({ image: dataUrl, remaining });
  } catch (err) {
    console.error("Image generation error:", err);
    return NextResponse.json({ error: "Image generation failed. Please try again." }, { status: 500 });
  }
}
