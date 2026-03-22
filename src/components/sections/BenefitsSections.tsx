import type { SectionProps } from "@/data/sections";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export function BenefitsIconList({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Benefits";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as BenefitItem[]) || [];

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
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
            <p style={{ color: tone.muted, fontSize: 18 }}>{subtitle}</p>
          )}
        </div>
        <div className="flex flex-col gap-10">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-6">
              <span style={{ fontSize: 40, lineHeight: 1, flexShrink: 0 }}>
                {item.icon}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: tone.headingFont,
                    fontWeight: 700,
                    fontSize: 20,
                    color: tone.text,
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: tone.muted, fontSize: 15, lineHeight: 1.6 }}>
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

export function BenefitsCards({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Benefits";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as BenefitItem[]) || [];

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-5xl mx-auto">
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
            <p style={{ color: tone.muted, fontSize: 18 }}>{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: 32,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 36, display: "block", marginBottom: 14 }}>
                {item.icon}
              </span>
              <h3
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 19,
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
