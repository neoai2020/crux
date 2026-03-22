import type { SectionProps } from "@/data/sections";

export function VideoCentered({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "See It in Action";
  const description = (content.description as string) || "";
  const ctaText = (content.ctaText as string) || "Watch Now";

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            style={{
              fontFamily: tone.headingFont,
              fontWeight: 700,
              fontSize: 36,
              color: tone.text,
              marginBottom: 12,
            }}
          >
            {headline}
          </h2>
          {description && (
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
              {description}
            </p>
          )}
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            position: "relative",
            aspectRatio: "16/9",
            backgroundColor: tone.surface,
            border: `1px solid ${tone.border}`,
            borderRadius: tone.radius,
            overflow: "hidden",
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: tone.primary,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "14px solid transparent",
                borderBottom: "14px solid transparent",
                borderLeft: "22px solid #fff",
                marginLeft: 4,
              }}
            />
          </div>
        </div>
        {ctaText && (
          <div className="text-center" style={{ marginTop: 20 }}>
            <button
              style={{
                backgroundColor: tone.primary,
                color: "#fff",
                border: "none",
                borderRadius: tone.radius,
                fontFamily: tone.bodyFont,
                fontWeight: 600,
                fontSize: 15,
                padding: "12px 28px",
                cursor: "pointer",
              }}
            >
              {ctaText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function VideoSplit({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "See It in Action";
  const description = (content.description as string) || "";
  const ctaText = (content.ctaText as string) || "Watch Now";

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <h2
            style={{
              fontFamily: tone.headingFont,
              fontWeight: 700,
              fontSize: 36,
              color: tone.text,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            {headline}
          </h2>
          {description && (
            <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
              {description}
            </p>
          )}
          <button
            style={{
              backgroundColor: tone.primary,
              color: "#fff",
              border: "none",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 32px",
              cursor: "pointer",
            }}
          >
            {ctaText}
          </button>
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            position: "relative",
            aspectRatio: "16/9",
            backgroundColor: tone.bg,
            border: `1px solid ${tone.border}`,
            borderRadius: tone.radius,
            overflow: "hidden",
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: tone.primary,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                borderLeft: "20px solid #fff",
                marginLeft: 4,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
