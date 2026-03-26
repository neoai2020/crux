import type { SectionProps } from "@/data/sections";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export function FeaturesIconGrid({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Features";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as FeatureItem[]) || [];

  return (
    <section
      style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}
      className="py-20 px-6 relative overflow-hidden"
    >
      <div style={{ position: "absolute", top: -100, right: -100, width: 350, height: 350, borderRadius: "50%", background: tone.primary, opacity: 0.03, pointerEvents: "none" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, margin: "0 auto 20px" }} />
          <h2
            style={{
              fontFamily: tone.headingFont,
              color: tone.text,
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 12,
            }}
          >
            {sectionTitle}
          </h2>
          {subtitle && (
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: 32,
                border: `1px solid ${tone.border}`,
                boxShadow: `0 4px 24px -4px ${tone.primary}0A, 0 1px 3px rgba(0,0,0,0.04)`,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: tone.radius,
                  background: `linear-gradient(135deg, ${tone.primary}15, ${tone.secondary}15)`,
                  fontSize: 26,
                  border: `1px solid ${tone.primary}20`,
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 20,
                  color: tone.text,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: tone.muted, fontSize: 15, lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesAlternating({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Features";
  const subtitle = (content.subtitle as string) || "";
  const items = ((content.items as FeatureItem[]) || []).slice(0, 3);

  return (
    <section
      style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, margin: "0 auto 20px" }} />
          <h2
            style={{
              fontFamily: tone.headingFont,
              color: tone.text,
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 12,
            }}
          >
            {sectionTitle}
          </h2>
          {subtitle && (
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-16">
          {items.map((item, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}
              >
                <div className={isEven ? "md:order-2" : ""}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 64,
                      height: 64,
                      borderRadius: tone.radius,
                      background: `linear-gradient(135deg, ${tone.primary}15, ${tone.secondary}15)`,
                      border: `1px solid ${tone.primary}20`,
                      fontSize: 32,
                      marginBottom: 16,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: tone.headingFont,
                      fontWeight: 700,
                      fontSize: 24,
                      color: tone.text,
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
                <div
                  className={isEven ? "md:order-1" : ""}
                  style={{
                    borderRadius: tone.radius,
                    minHeight: 280,
                    overflow: "hidden",
                    boxShadow: `0 16px 40px -8px ${tone.primary}20`,
                  }}
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 280 }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", minHeight: 280, background: tone.gradient }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturesCompact({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Features";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as FeatureItem[]) || [];

  return (
    <section
      style={{ background: `linear-gradient(180deg, ${tone.surface} 0%, ${tone.bg} 100%)`, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, marginBottom: 20 }} />
        <h2
          className="mb-2"
          style={{
            fontFamily: tone.headingFont,
            color: tone.text,
            fontWeight: 700,
            fontSize: 32,
          }}
        >
          {sectionTitle}
        </h2>
        {subtitle && (
          <p style={{ color: tone.muted, fontSize: 16, marginBottom: 24 }}>
            {subtitle}
          </p>
        )}
        {!subtitle && <div style={{ marginBottom: 24 }} />}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: 1, backgroundColor: tone.border }} />
              )}
              <div className="flex items-center gap-4 py-5">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: tone.radius,
                    background: `linear-gradient(135deg, ${tone.primary}10, ${tone.secondary}10)`,
                    border: `1px solid ${tone.primary}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <p style={{ color: tone.text, fontSize: 15, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700, fontFamily: tone.headingFont }}>
                    {item.title}
                  </span>
                  {" — "}
                  <span style={{ color: tone.muted }}>{item.description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
