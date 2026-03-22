import type { SectionProps } from "@/data/sections";

export function NewsletterInline({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "Stay Updated";
  const placeholder = (content.placeholder as string) || "Enter your email";
  const buttonText = (content.buttonText as string) || "Subscribe";

  return (
    <section
      className="py-10 px-6"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-8 flex-wrap">
        <h3
          style={{
            fontFamily: tone.headingFont,
            fontWeight: 700,
            fontSize: 22,
            color: tone.text,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {headline}
        </h3>
        <div className="flex items-center gap-3 flex-1" style={{ maxWidth: 440, minWidth: 280 }}>
          <input
            type="email"
            placeholder={placeholder}
            style={{
              flex: 1,
              padding: "12px 16px",
              backgroundColor: tone.bg,
              border: `1px solid ${tone.border}`,
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontSize: 14,
              color: tone.text,
              outline: "none",
            }}
          />
          <button
            style={{
              backgroundColor: tone.primary,
              color: "#fff",
              border: "none",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 14,
              padding: "12px 24px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "Stay Updated";
  const description = (content.description as string) || "";
  const placeholder = (content.placeholder as string) || "Enter your email";
  const buttonText = (content.buttonText as string) || "Subscribe";

  return (
    <section
      className="py-20 px-6"
      style={{
        backgroundColor: tone.surface,
        fontFamily: tone.bodyFont,
        backgroundImage: `radial-gradient(${tone.border} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-xl mx-auto text-center">
        <h2
          style={{
            fontFamily: tone.headingFont,
            fontWeight: 700,
            fontSize: 32,
            color: tone.text,
            marginBottom: 12,
          }}
        >
          {headline}
        </h2>
        {description && (
          <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.6, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
            {description}
          </p>
        )}
        <div className="flex items-center gap-3 justify-center">
          <input
            type="email"
            placeholder={placeholder}
            style={{
              flex: 1,
              maxWidth: 320,
              padding: "14px 18px",
              backgroundColor: tone.bg,
              border: `1px solid ${tone.border}`,
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontSize: 15,
              color: tone.text,
              outline: "none",
            }}
          />
          <button
            style={{
              backgroundColor: tone.primary,
              color: "#fff",
              border: "none",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 28px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
