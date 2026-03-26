import type { SectionProps } from "@/data/sections";

function PlayButton({ tone, size = 72 }: { tone: SectionProps["tone"]; size?: number }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: tone.primary,
        cursor: "pointer",
        boxShadow: `0 8px 32px ${tone.primary}40`,
        transition: "transform 0.2s",
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: `${size * 0.19}px solid transparent`,
          borderBottom: `${size * 0.19}px solid transparent`,
          borderLeft: `${size * 0.31}px solid #fff`,
          marginLeft: size * 0.06,
        }}
      />
    </div>
  );
}

export function VideoCentered({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "See It in Action";
  const description = (content.description as string) || "";
  const ctaText = (content.ctaText as string) || "Watch Now";
  const ctaLink = (content.ctaLink as string) || "#section-contact";
  const thumbnailImage = content.thumbnailImage as string | undefined;

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
          {thumbnailImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailImage}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          {thumbnailImage && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
          )}
          <div style={{ position: "relative", zIndex: 1 }}>
            <PlayButton tone={tone} />
          </div>
        </div>
        {ctaText && (
          <div className="text-center" style={{ marginTop: 20 }}>
            <a
              href={ctaLink}
              target={ctaLink.startsWith("http") ? "_blank" : undefined}
              rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
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
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {ctaText}
            </a>
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
  const ctaLink = (content.ctaLink as string) || "#section-contact";
  const thumbnailImage = content.thumbnailImage as string | undefined;

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
          <a
            href={ctaLink}
            target={ctaLink.startsWith("http") ? "_blank" : undefined}
            rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
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
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {ctaText}
          </a>
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
          {thumbnailImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailImage}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          {thumbnailImage && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
          )}
          <div style={{ position: "relative", zIndex: 1 }}>
            <PlayButton tone={tone} size={64} />
          </div>
        </div>
      </div>
    </section>
  );
}
