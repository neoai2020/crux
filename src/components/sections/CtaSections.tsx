import type { SectionProps } from "@/data/sections";

export function CtaGradientBanner({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "Ready to Get Started?";
  const description = (content.description as string) || "";
  const buttonText = (content.buttonText as string) || "Start Now";
  const secondaryButtonText = (content.secondaryButtonText as string) || "Contact Us";
  const disclaimer = (content.disclaimer as string) || "";

  return (
    <section
      style={{
        background: tone.gradient,
        fontFamily: tone.bodyFont,
        borderRadius: tone.radius,
      }}
      className="py-20 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          style={{
            fontFamily: tone.headingFont,
            color: "#fff",
            fontWeight: 700,
            fontSize: 40,
            marginBottom: 16,
          }}
        >
          {headline}
        </h2>
        {description && (
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, marginBottom: 32, lineHeight: 1.6 }}>
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#section-contact"
            style={{
              backgroundColor: "#fff",
              color: tone.primary,
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              padding: "14px 32px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {buttonText}
          </a>
          <a
            href="#section-contact"
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 16,
              border: "2px solid rgba(255,255,255,0.6)",
              padding: "12px 32px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {secondaryButtonText}
          </a>
        </div>
        {disclaimer && (
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 16 }}>
            {disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}

export function CtaBoxed({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "Ready to Get Started?";
  const description = (content.description as string) || "";
  const buttonText = (content.buttonText as string) || "Start Now";
  const disclaimer = (content.disclaimer as string) || "";

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div
        className="max-w-2xl mx-auto text-center"
        style={{
          backgroundColor: tone.surface,
          border: `1px solid ${tone.border}`,
          borderRadius: tone.radius,
          padding: 48,
        }}
      >
        <h2
          style={{
            fontFamily: tone.headingFont,
            color: tone.text,
            fontWeight: 700,
            fontSize: 32,
            marginBottom: 12,
          }}
        >
          {headline}
        </h2>
        {description && (
          <p style={{ color: tone.muted, fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
            {description}
          </p>
        )}
        <a
          href="#section-contact"
          style={{
            background: tone.gradient,
            color: "#fff",
            borderRadius: tone.radius,
            fontFamily: tone.bodyFont,
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            padding: "14px 36px",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          {buttonText}
        </a>
        {disclaimer && (
          <p style={{ color: tone.muted, fontSize: 13, marginTop: 12 }}>
            {disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}

export function CtaSplit({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "Ready to Get Started?";
  const description = (content.description as string) || "";
  const buttonText = (content.buttonText as string) || "Start Now";
  const disclaimer = (content.disclaimer as string) || "";

  return (
    <section
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2
            style={{
              fontFamily: tone.headingFont,
              color: tone.text,
              fontWeight: 700,
              fontSize: 34,
              marginBottom: 12,
            }}
          >
            {headline}
          </h2>
          {description && (
            <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.6 }}>
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <a
            href="#section-contact"
            style={{
              background: tone.gradient,
              color: "#fff",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              padding: "14px 36px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {buttonText}
          </a>
          {disclaimer && (
            <span style={{ color: tone.muted, fontSize: 13 }}>
              {disclaimer}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
