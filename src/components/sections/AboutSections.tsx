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
    <section style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div style={{ minHeight: 340, overflow: "hidden", borderRadius: tone.radius }}>
          <ImageOrGradient src={aboutImage} gradient={tone.gradient} radius={tone.radius} />
        </div>
        <div>
          <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 16 }}>
            {heading}
          </h2>
          <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.7, fontFamily: tone.bodyFont, marginBottom: 20 }}>
            {text}
          </p>
          {highlight && (
            <div style={{ backgroundColor: tone.primaryLight, borderRadius: tone.radius, padding: "14px 20px", color: tone.text, fontSize: 15, fontWeight: 600 }}>
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
    <section style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 16 }}>
            {heading}
          </h2>
          <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.7, fontFamily: tone.bodyFont, marginBottom: 20 }}>
            {text}
          </p>
          {highlight && (
            <div style={{ backgroundColor: tone.primaryLight, borderRadius: tone.radius, padding: "14px 20px", color: tone.text, fontSize: 15, fontWeight: 600 }}>
              {highlight}
            </div>
          )}
        </div>
        <div style={{ minHeight: 340, overflow: "hidden", borderRadius: tone.radius }}>
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
    <section style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }} className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 40, marginBottom: 20 }}>
          {heading}
        </h2>
        <p style={{ color: tone.muted, fontSize: 17, lineHeight: 1.8, fontFamily: tone.bodyFont, marginBottom: 24 }}>
          {text}
        </p>
        {highlight && (
          <span style={{ display: "inline-block", backgroundColor: tone.primary, color: "#fff", borderRadius: tone.radius, padding: "8px 24px", fontSize: 14, fontWeight: 600 }}>
            {highlight}
          </span>
        )}
      </div>
    </section>
  );
}
