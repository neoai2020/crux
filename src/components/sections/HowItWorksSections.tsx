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
        <div className="flex items-start justify-center gap-0" style={{ position: "relative" }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center"
              style={{ flex: 1, position: "relative", padding: "0 16px" }}
            >
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 32,
                    left: "calc(50% + 32px)",
                    right: "calc(-50% + 32px)",
                    height: 2,
                    backgroundColor: tone.border,
                    zIndex: 0,
                  }}
                />
              )}
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
                  position: "relative",
                  zIndex: 1,
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
  const steps = (content.steps as StepItem[]) || [];

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-center mb-14"
          style={{
            fontFamily: tone.headingFont,
            color: tone.text,
            fontWeight: 700,
            fontSize: 36,
          }}
        >
          {sectionTitle}
        </h2>
        <div style={{ position: "relative", paddingLeft: 48 }}>
          <div
            style={{
              position: "absolute",
              left: 19,
              top: 0,
              bottom: 0,
              width: 3,
              backgroundColor: tone.primary,
              borderRadius: 2,
            }}
          />
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-6"
              style={{ marginBottom: i < steps.length - 1 ? 32 : 0, position: "relative" }}
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
                  position: "absolute",
                  left: -48,
                  top: 16,
                  zIndex: 1,
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
