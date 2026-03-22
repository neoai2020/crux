import type { SectionProps } from "@/data/sections";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "FAQ";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as FaqItem[]) || [];

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
            <p style={{ color: tone.muted, fontSize: 17 }}>{subtitle}</p>
          )}
        </div>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: 1, backgroundColor: tone.border }} />
              )}
              <div
                style={{
                  backgroundColor: tone.surface,
                  borderRadius: tone.radius,
                  padding: "20px 24px",
                }}
              >
                <div className="flex items-center justify-between">
                  <h3
                    style={{
                      fontFamily: tone.headingFont,
                      fontWeight: 700,
                      fontSize: 16,
                      color: tone.text,
                    }}
                  >
                    {item.question}
                  </h3>
                  <span
                    style={{
                      color: tone.muted,
                      fontSize: 22,
                      fontWeight: 300,
                      flexShrink: 0,
                      marginLeft: 16,
                    }}
                  >
                    +
                  </span>
                </div>
                <p
                  style={{
                    color: tone.muted,
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginTop: 10,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqTwoColumn({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "FAQ";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as FaqItem[]) || [];

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
            <p style={{ color: tone.muted, fontSize: 17 }}>{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
          {items.map((item, i) => (
            <div key={i}>
              <h3
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 17,
                  color: tone.text,
                  marginBottom: 8,
                }}
              >
                {item.question}
              </h3>
              <p
                style={{
                  color: tone.muted,
                  fontSize: 15,
                  lineHeight: 1.6,
                  fontFamily: tone.bodyFont,
                }}
              >
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
