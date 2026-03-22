import type { SectionProps } from "@/data/sections";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

export function HowItWorksSteps({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "How It Works";
  const subtitle = (content.subtitle as string) || "";
  const steps = (content.steps as StepItem[]) || [];

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
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
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: tone.primary,
                  color: "#fff",
                  fontFamily: tone.headingFont,
                  fontWeight: 800,
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 18,
                  color: tone.text,
                  marginTop: 20,
                  marginBottom: 8,
                }}
              >
                {step.title}
              </h3>
              <p style={{ color: tone.muted, fontSize: 14, lineHeight: 1.6, maxWidth: 220 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksTimeline({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "How It Works";
  const subtitle = (content.subtitle as string) || "";
  const steps = (content.steps as StepItem[]) || [];

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
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
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-6"
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: tone.primary,
                  color: "#fff",
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {step.number}
              </div>
              <div
                style={{
                  backgroundColor: i % 2 === 0 ? tone.surface : tone.bg,
                  borderRadius: tone.radius,
                  padding: 24,
                  border: `1px solid ${tone.border}`,
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontFamily: tone.headingFont,
                    fontWeight: 700,
                    fontSize: 18,
                    color: tone.text,
                    marginBottom: 6,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: tone.muted, fontSize: 14, lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
