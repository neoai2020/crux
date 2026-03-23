import type { SectionProps } from "@/data/sections";

function ImageOrGradient({
  src,
  gradient,
  radius,
  style,
}: {
  src?: string;
  gradient: string;
  radius: string;
  style?: React.CSSProperties;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: radius,
          display: "block",
          ...style,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: gradient,
        borderRadius: radius,
        ...style,
      }}
    />
  );
}

const ctaStyle = (tone: SectionProps["tone"]): React.CSSProperties => ({
  background: tone.gradient,
  color: "#fff",
  borderRadius: tone.radius,
  fontFamily: tone.bodyFont,
  fontWeight: 600,
  fontSize: 16,
  border: "none",
  padding: "14px 32px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
});

const secondaryStyle = (tone: SectionProps["tone"]): React.CSSProperties => ({
  background: "transparent",
  color: tone.primary,
  borderRadius: tone.radius,
  fontFamily: tone.bodyFont,
  fontWeight: 600,
  fontSize: 16,
  border: `2px solid ${tone.primary}`,
  padding: "12px 30px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
});

export function HeroCentered({ tone, content, businessName }: SectionProps) {
  const headline = (content.headline as string) || businessName;
  const subheadline = (content.subheadline as string) || "";
  const ctaText = (content.ctaText as string) || "Get Started";
  const secondaryCtaText = (content.secondaryCtaText as string) || "Learn More";
  const socialProof = (content.socialProof as string) || "Trusted by 10,000+ customers";

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1
          style={{
            fontFamily: tone.headingFont,
            fontWeight: 800,
            fontSize: 48,
            lineHeight: 1.15,
            color: tone.text,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {headline}
        </h1>
        {subheadline && (
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              color: tone.muted,
              marginTop: 20,
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {subheadline}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ marginTop: 36 }}>
          <a href="#section-contact" style={ctaStyle(tone)}>{ctaText}</a>
          <a href="#section-about" style={secondaryStyle(tone)}>{secondaryCtaText}</a>
        </div>
        {socialProof && (
          <div
            className="flex items-center justify-center gap-2"
            style={{ marginTop: 40 }}
          >
            <div className="flex items-center -space-x-2">
              {[tone.primary, tone.secondary, tone.accent, tone.primaryLight].map(
                (color, i) => (
                  <div
                    key={i}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: `2px solid ${tone.surface}`,
                    }}
                  />
                )
              )}
            </div>
            <span style={{ fontSize: 14, color: tone.muted, marginLeft: 8 }}>
              {socialProof}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export function HeroSplit({ tone, content, businessName }: SectionProps) {
  const headline = (content.headline as string) || businessName;
  const subheadline = (content.subheadline as string) || "";
  const ctaText = (content.ctaText as string) || "Get Started";
  const secondaryCtaText = (content.secondaryCtaText as string) || "Learn More";
  const heroImage = content.heroImage as string | undefined;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1
            style={{
              fontFamily: tone.headingFont,
              fontWeight: 800,
              fontSize: 48,
              lineHeight: 1.15,
              color: tone.text,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {headline}
          </h1>
          {subheadline && (
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: tone.muted,
                marginTop: 20,
              }}
            >
              {subheadline}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-start gap-4" style={{ marginTop: 32 }}>
            <a href="#section-contact" style={ctaStyle(tone)}>{ctaText}</a>
            <a href="#section-about" style={secondaryStyle(tone)}>{secondaryCtaText}</a>
          </div>
        </div>
        <div style={{ aspectRatio: "4/3", width: "100%", overflow: "hidden", borderRadius: tone.radius }}>
          <ImageOrGradient src={heroImage} gradient={tone.gradient} radius={tone.radius} />
        </div>
      </div>
    </section>
  );
}

export function HeroSplitReverse({ tone, content, businessName }: SectionProps) {
  const headline = (content.headline as string) || businessName;
  const subheadline = (content.subheadline as string) || "";
  const ctaText = (content.ctaText as string) || "Get Started";
  const secondaryCtaText = (content.secondaryCtaText as string) || "Learn More";
  const heroImage = content.heroImage as string | undefined;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1" style={{ aspectRatio: "4/3", width: "100%", overflow: "hidden", borderRadius: tone.radius }}>
          <ImageOrGradient src={heroImage} gradient={tone.gradient} radius={tone.radius} />
        </div>
        <div className="order-1 md:order-2">
          <h1
            style={{
              fontFamily: tone.headingFont,
              fontWeight: 800,
              fontSize: 48,
              lineHeight: 1.15,
              color: tone.text,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {headline}
          </h1>
          {subheadline && (
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: tone.muted,
                marginTop: 20,
              }}
            >
              {subheadline}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-start gap-4" style={{ marginTop: 32 }}>
            <a href="#section-contact" style={ctaStyle(tone)}>{ctaText}</a>
            <a href="#section-about" style={secondaryStyle(tone)}>{secondaryCtaText}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroMinimal({ tone, content, businessName }: SectionProps) {
  const headline = (content.headline as string) || businessName;
  const subheadline = (content.subheadline as string) || "";
  const ctaText = (content.ctaText as string) || "Get Started";

  return (
    <section
      className="py-32 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1
          style={{
            fontFamily: tone.headingFont,
            fontWeight: 800,
            fontSize: 60,
            lineHeight: 1.1,
            color: tone.text,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          {headline}
        </h1>
        {subheadline && (
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.7,
              color: tone.muted,
              marginTop: 24,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {subheadline}
          </p>
        )}
        <div style={{ marginTop: 40 }}>
          <a href="#section-contact" style={{ ...ctaStyle(tone), fontSize: 17, padding: "16px 40px" }}>{ctaText}</a>
        </div>
      </div>
    </section>
  );
}
