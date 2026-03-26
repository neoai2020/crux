import type { SectionProps } from "@/data/sections";

interface ContentItem {
  title: string;
  description: string;
  tag: string;
  image?: string;
}

function CardImage({ src, gradient, height }: { src?: string; gradient: string; height: number }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" style={{ width: "100%", height, objectFit: "cover", display: "block" }} />;
  }
  return <div style={{ width: "100%", height, background: gradient }} />;
}

export function ContentGridCards({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Featured";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as ContentItem[]) || [];

  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}>
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: tone.secondary, opacity: 0.03, pointerEvents: "none" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, margin: "0 auto 20px" }} />
          <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 12 }}>
            {sectionTitle}
          </h2>
          {subtitle && (
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                overflow: "hidden",
                border: `1px solid ${tone.border}`,
                boxShadow: `0 4px 24px -4px ${tone.primary}08`,
              }}
            >
              <div style={{ position: "relative", overflow: "hidden" }}>
                <CardImage src={item.image} gradient={tone.gradient} height={180} />
                <div style={{ position: "absolute", top: 12, left: 12 }}>
                  <span style={{ background: tone.gradient, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 999, display: "inline-block", letterSpacing: "0.02em" }}>
                    {item.tag}
                  </span>
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontFamily: tone.headingFont, fontWeight: 700, fontSize: 18, color: tone.text, marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ color: tone.muted, fontSize: 14, lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContentGridList({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Featured";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as ContentItem[]) || [];

  return (
    <section className="py-20 px-6" style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}>
      <div className="max-w-4xl mx-auto">
        <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, marginBottom: 20 }} />
        <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: subtitle ? 12 : 32 }}>
          {sectionTitle}
        </h2>
        {subtitle && (
          <p style={{ color: tone.muted, fontSize: 16, marginBottom: 32 }}>{subtitle}</p>
        )}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: 1, backgroundColor: tone.border }} />}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6">
                <div className="flex-shrink-0" style={{ width: 100, height: 100, borderRadius: tone.radius, overflow: "hidden", boxShadow: `0 4px 12px ${tone.primary}10` }}>
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt="" style={{ width: 100, height: 100, objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ width: 100, height: 100, background: tone.gradient, borderRadius: tone.radius }} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ fontFamily: tone.headingFont, fontWeight: 700, fontSize: 18, color: tone.text }}>
                      {item.title}
                    </h3>
                    <span style={{ background: `${tone.primary}12`, color: tone.primary, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, display: "inline-block" }}>
                      {item.tag}
                    </span>
                  </div>
                  <p style={{ color: tone.muted, fontSize: 14, lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContentGridFeatured({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Featured";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as ContentItem[]) || [];
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <section className="py-20 px-6" style={{ background: `linear-gradient(180deg, ${tone.surface} 0%, ${tone.bg} 100%)`, fontFamily: tone.bodyFont }}>
      <div className="max-w-6xl mx-auto">
        {sectionTitle && (
          <div className="text-center mb-12">
            <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, margin: "0 auto 20px" }} />
            <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 12 }}>
              {sectionTitle}
            </h2>
            {subtitle && <p style={{ color: tone.muted, fontSize: 18 }}>{subtitle}</p>}
          </div>
        )}
        {featured && (
          <div style={{ position: "relative", borderRadius: tone.radius, overflow: "hidden", marginBottom: 32, boxShadow: `0 16px 40px -8px ${tone.primary}15` }}>
            <CardImage src={featured.image} gradient={tone.gradient} height={360} />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "40px 32px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
              }}
            >
              <span style={{ background: tone.gradient, color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, display: "inline-block", marginBottom: 12 }}>
                {featured.tag}
              </span>
              <h2 style={{ fontFamily: tone.headingFont, fontWeight: 800, fontSize: 28, color: "#fff", margin: 0 }}>
                {featured.title}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginTop: 6 }}>
                {featured.description}
              </p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((item, i) => (
            <div key={i} style={{ backgroundColor: tone.bg, borderRadius: tone.radius, overflow: "hidden", border: `1px solid ${tone.border}`, boxShadow: `0 4px 16px -4px ${tone.primary}08` }}>
              <CardImage src={item.image} gradient={tone.gradient} height={160} />
              <div style={{ padding: 22 }}>
                <span style={{ background: `${tone.primary}12`, color: tone.primary, fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999, display: "inline-block", marginBottom: 10 }}>
                  {item.tag}
                </span>
                <h3 style={{ fontFamily: tone.headingFont, fontWeight: 700, fontSize: 17, color: tone.text, marginBottom: 4 }}>
                  {item.title}
                </h3>
                <p style={{ color: tone.muted, fontSize: 13, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
