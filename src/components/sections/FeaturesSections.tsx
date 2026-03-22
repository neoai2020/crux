import type { SectionProps } from "@/data/sections";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export function FeaturesIconGrid({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Features";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as FeatureItem[]) || [];

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
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
        <div className="grid grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: 32,
              }}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: tone.primaryLight,
                  fontSize: 26,
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
  const items = ((content.items as FeatureItem[]) || []).slice(0, 3);

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center mb-16"
          style={{
            fontFamily: tone.headingFont,
            color: tone.text,
            fontWeight: 700,
            fontSize: 36,
          }}
        >
          {sectionTitle}
        </h2>
        <div className="flex flex-col gap-16">
          {items.map((item, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className="grid grid-cols-2 gap-12 items-center"
                style={{ direction: isEven ? "rtl" : "ltr" }}
              >
                <div style={{ direction: "ltr" }}>
                  <span style={{ fontSize: 40, marginBottom: 12, display: "block" }}>
                    {item.icon}
                  </span>
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
                  style={{
                    background: tone.gradient,
                    borderRadius: tone.radius,
                    minHeight: 240,
                    direction: "ltr",
                  }}
                />
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
  const items = (content.items as FeatureItem[]) || [];

  return (
    <section
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="mb-10"
          style={{
            fontFamily: tone.headingFont,
            color: tone.text,
            fontWeight: 700,
            fontSize: 32,
          }}
        >
          {sectionTitle}
        </h2>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: 1, backgroundColor: tone.border }} />
              )}
              <div className="flex items-center gap-4 py-5">
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
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
