import type { SectionProps } from "@/data/sections";

function ImageOrGradient({ src, gradient, radius }: { src?: string; gradient: string; radius: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: radius, display: "block" }} />
    );
  }
  return <div style={{ width: "100%", height: "100%", background: gradient, borderRadius: radius }} />;
}

export function AboutImageLeft({ tone, content }: SectionProps) {
  const heading = (content.heading as string) || "About Us";
  const text = (content.text as string) || "";
  const highlight = (content.highlight as string) || "";
  const aboutImage = content.aboutImage as string | undefined;

  return (
    <section style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div style={{ minHeight: 340, overflow: "hidden", borderRadius: tone.radius, boxShadow: `0 16px 40px -8px ${tone.primary}15` }}>
          <ImageOrGradient src={aboutImage} gradient={tone.gradient} radius={tone.radius} />
        </div>
        <div>
          <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, marginBottom: 20 }} />
          <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 16 }}>
            {heading}
          </h2>
          <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.7, fontFamily: tone.bodyFont, marginBottom: 20 }}>
            {text}
          </p>
          {highlight && (
            <div style={{ background: `linear-gradient(135deg, ${tone.primary}12, ${tone.secondary}08)`, borderRadius: tone.radius, padding: "14px 20px", color: tone.text, fontSize: 15, fontWeight: 600, borderLeft: `3px solid ${tone.primary}` }}>
              {highlight}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function AboutImageRight({ tone, content }: SectionProps) {
  const heading = (content.heading as string) || "About Us";
  const text = (content.text as string) || "";
  const highlight = (content.highlight as string) || "";
  const aboutImage = content.aboutImage as string | undefined;

  return (
    <section style={{ background: `linear-gradient(180deg, ${tone.surface} 0%, ${tone.bg} 100%)`, fontFamily: tone.bodyFont }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, marginBottom: 20 }} />
          <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 16 }}>
            {heading}
          </h2>
          <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.7, fontFamily: tone.bodyFont, marginBottom: 20 }}>
            {text}
          </p>
          {highlight && (
            <div style={{ background: `linear-gradient(135deg, ${tone.primary}12, ${tone.secondary}08)`, borderRadius: tone.radius, padding: "14px 20px", color: tone.text, fontSize: 15, fontWeight: 600, borderLeft: `3px solid ${tone.primary}` }}>
              {highlight}
            </div>
          )}
        </div>
        <div style={{ minHeight: 340, overflow: "hidden", borderRadius: tone.radius, boxShadow: `0 16px 40px -8px ${tone.primary}15` }}>
          <ImageOrGradient src={aboutImage} gradient={tone.gradient} radius={tone.radius} />
        </div>
      </div>
    </section>
  );
}

export function AboutCentered({ tone, content }: SectionProps) {
  const heading = (content.heading as string) || "About Us";
  const text = (content.text as string) || "";
  const highlight = (content.highlight as string) || "";

  return (
    <section style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }} className="py-24 px-6 relative overflow-hidden">
      <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: tone.primary, opacity: 0.02, pointerEvents: "none" }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, margin: "0 auto 24px" }} />
        <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 40, marginBottom: 20 }}>
          {heading}
        </h2>
        <p style={{ color: tone.muted, fontSize: 17, lineHeight: 1.8, fontFamily: tone.bodyFont, marginBottom: 24 }}>
          {text}
        </p>
        {highlight && (
          <span style={{ display: "inline-block", background: tone.gradient, color: "#fff", borderRadius: tone.radius, padding: "10px 28px", fontSize: 14, fontWeight: 600, boxShadow: `0 4px 16px ${tone.primary}25` }}>
            {highlight}
          </span>
        )}
      </div>
    </section>
  );
}
