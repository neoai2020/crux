import type { SectionProps } from "@/data/sections";

export function CtaGradientBanner({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "Ready to Get Started?";
  const description = (content.description as string) || "";
  const buttonText = (content.buttonText as string) || "Start Now";
  const secondaryButtonText = (content.secondaryButtonText as string) || "Contact Us";
  const disclaimer = (content.disclaimer as string) || "";

  return (
    <section
      style={{ fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div
        className="max-w-5xl mx-auto relative overflow-hidden"
        style={{
          background: tone.gradient,
          borderRadius: tone.radius,
          padding: "64px 48px",
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div className="relative z-10 text-center">
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
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, marginBottom: 32, lineHeight: 1.6, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
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
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
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
                border: "2px solid rgba(255,255,255,0.5)",
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
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 16 }}>
              {disclaimer}
            </p>
          )}
        </div>
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
      style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div
        className="max-w-2xl mx-auto text-center relative overflow-hidden"
        style={{
          backgroundColor: tone.surface,
          border: `1px solid ${tone.border}`,
          borderRadius: tone.radius,
          padding: 48,
          boxShadow: `0 8px 32px -4px ${tone.primary}0A`,
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: tone.gradient }} />
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
            boxShadow: `0 8px 24px -4px ${tone.primary}30`,
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
      style={{ background: `linear-gradient(180deg, ${tone.surface} 0%, ${tone.bg} 100%)`, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        style={{
          backgroundColor: tone.surface,
          borderRadius: tone.radius,
          padding: "48px 40px",
          border: `1px solid ${tone.border}`,
          boxShadow: `0 4px 24px -4px ${tone.primary}08`,
        }}
      >
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
              boxShadow: `0 8px 24px -4px ${tone.primary}30`,
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
