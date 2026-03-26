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
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${tone.surface} 0%, ${tone.bg} 100%)`, fontFamily: tone.bodyFont }}
    >
      <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: tone.primary, opacity: 0.04, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: tone.secondary, opacity: 0.05, pointerEvents: "none" }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
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
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}
    >
      <div style={{ position: "absolute", top: "50%", right: -200, width: 500, height: 500, borderRadius: "50%", background: tone.primary, opacity: 0.03, transform: "translateY(-50%)", pointerEvents: "none" }} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
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
        <div style={{ aspectRatio: "4/3", width: "100%", overflow: "hidden", borderRadius: tone.radius, boxShadow: `0 24px 48px -12px ${tone.primary}22, 0 12px 24px -8px rgba(0,0,0,0.1)` }}>
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
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${tone.surface} 0%, ${tone.bg} 100%)`, fontFamily: tone.bodyFont }}
    >
      <div style={{ position: "absolute", top: "50%", left: -200, width: 500, height: 500, borderRadius: "50%", background: tone.secondary, opacity: 0.03, transform: "translateY(-50%)", pointerEvents: "none" }} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 md:order-1" style={{ aspectRatio: "4/3", width: "100%", overflow: "hidden", borderRadius: tone.radius, boxShadow: `0 24px 48px -12px ${tone.primary}22, 0 12px 24px -8px rgba(0,0,0,0.1)` }}>
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
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}
    >
      <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: tone.gradient, opacity: 0.04, pointerEvents: "none" }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div style={{ width: 64, height: 4, background: tone.gradient, borderRadius: 2, margin: "0 auto 32px" }} />
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

export function HeroFullBleed({ tone, content, businessName }: SectionProps) {
  const headline = (content.headline as string) || businessName;
  const subheadline = (content.subheadline as string) || "";
  const ctaText = (content.ctaText as string) || "Get Started";
  const secondaryCtaText = (content.secondaryCtaText as string) || "Learn More";
  const heroImage = content.heroImage as string | undefined;
  const socialProof = (content.socialProof as string) || "";

  return (
    <section
      className="relative overflow-hidden"
      style={{ fontFamily: tone.bodyFont, minHeight: 540 }}
    >
      {heroImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroImage}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: tone.gradient }} />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: `linear-gradient(180deg, transparent, ${tone.bg})`,
          opacity: 0.5,
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28" style={{ minHeight: 540 }}>
        <h1
          style={{
            fontFamily: tone.headingFont,
            fontWeight: 800,
            fontSize: 56,
            lineHeight: 1.1,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.03em",
            maxWidth: 800,
            textShadow: "0 2px 24px rgba(0,0,0,0.4)",
          }}
        >
          {headline}
        </h1>
        {subheadline && (
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.85)",
              marginTop: 20,
              maxWidth: 600,
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            {subheadline}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ marginTop: 36 }}>
          <a
            href="#section-contact"
            style={{
              ...ctaStyle(tone),
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {ctaText}
          </a>
          <a
            href="#section-about"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              color: "#FFFFFF",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 16,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "12px 30px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {secondaryCtaText}
          </a>
        </div>
        {socialProof && (
          <div className="flex items-center justify-center gap-2" style={{ marginTop: 40 }}>
            <div className="flex items-center -space-x-2">
              {[tone.primary, tone.secondary, tone.accent, tone.primaryLight].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginLeft: 8 }}>
              {socialProof}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
