import type { SectionProps } from "@/data/sections";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  highlighted: boolean;
}

export function PricingCards({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Pricing";
  const subtitle = (content.subtitle as string) || "";
  const highlightLabel = (content.highlightLabel as string) || "Popular";
  const plans = (content.plans as PricingPlan[]) || [];

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
            <p style={{ color: tone.muted, fontSize: 18 }}>{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="flex flex-col"
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: 36,
                border: plan.highlighted
                  ? `2px solid ${tone.primary}`
                  : `1px solid ${tone.border}`,
                position: "relative",
              }}
            >
              {plan.highlighted && (
                <span
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: tone.primary,
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 16px",
                    borderRadius: 999,
                  }}
                >
                  {highlightLabel}
                </span>
              )}
              <h3
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 20,
                  color: tone.text,
                  marginBottom: 8,
                }}
              >
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  style={{
                    fontSize: 42,
                    fontWeight: 800,
                    color: tone.text,
                    fontFamily: tone.headingFont,
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ color: tone.muted, fontSize: 15 }}>
                  {plan.period}
                </span>
              </div>
              <ul className="flex flex-col gap-3 mb-8" style={{ listStyle: "none", padding: 0 }}>
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2" style={{ fontSize: 15 }}>
                    <span style={{ color: tone.primary, fontWeight: 700 }}>✓</span>
                    <span style={{ color: tone.text }}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <button
                  style={{
                    width: "100%",
                    background: plan.highlighted ? tone.gradient : "transparent",
                    color: plan.highlighted ? "#fff" : tone.primary,
                    borderRadius: tone.radius,
                    fontFamily: tone.bodyFont,
                    fontWeight: 600,
                    fontSize: 15,
                    border: plan.highlighted ? "none" : `2px solid ${tone.primary}`,
                    padding: "12px 24px",
                    cursor: "pointer",
                  }}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingComparison({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Pricing";
  const subtitle = (content.subtitle as string) || "";
  const plans = (content.plans as PricingPlan[]) || [];

  const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features)));

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
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px 16px", color: tone.muted, fontSize: 14 }}>
                  Features
                </th>
                {plans.map((plan, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      fontFamily: tone.headingFont,
                      fontWeight: 700,
                      fontSize: 18,
                      color: tone.text,
                      backgroundColor: plan.highlighted ? tone.surface : "transparent",
                      borderRadius: plan.highlighted ? `${tone.radius} ${tone.radius} 0 0` : undefined,
                    }}
                  >
                    {plan.name}
                    <div style={{ fontSize: 14, fontWeight: 400, color: tone.muted, marginTop: 4 }}>
                      {plan.price}{plan.period}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, fi) => (
                <tr key={fi} style={{ borderTop: `1px solid ${tone.border}` }}>
                  <td style={{ padding: "12px 16px", fontSize: 15, color: tone.text }}>
                    {feature}
                  </td>
                  {plans.map((plan, pi) => (
                    <td
                      key={pi}
                      style={{
                        textAlign: "center",
                        padding: "12px 16px",
                        fontSize: 18,
                        backgroundColor: plan.highlighted ? tone.surface : "transparent",
                      }}
                    >
                      {plan.features.includes(feature) ? (
                        <span style={{ color: tone.primary }}>✓</span>
                      ) : (
                        <span style={{ color: tone.border }}>—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function PricingHighlight({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Pricing";
  const subtitle = (content.subtitle as string) || "";
  const plans = (content.plans as PricingPlan[]) || [];

  const highlighted = plans.find((p) => p.highlighted) || plans[1] || plans[0];
  const others = plans.filter((p) => p !== highlighted);

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
            <p style={{ color: tone.muted, fontSize: 18 }}>{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {others[0] && (
            <div
              className="flex flex-col"
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: 32,
                border: `1px solid ${tone.border}`,
              }}
            >
              <h3 style={{ fontFamily: tone.headingFont, fontWeight: 700, fontSize: 18, color: tone.text, marginBottom: 6 }}>
                {others[0].name}
              </h3>
              <div className="flex items-baseline gap-1 mb-5">
                <span style={{ fontSize: 34, fontWeight: 800, color: tone.text, fontFamily: tone.headingFont }}>
                  {others[0].price}
                </span>
                <span style={{ color: tone.muted, fontSize: 14 }}>{others[0].period}</span>
              </div>
              <ul className="flex flex-col gap-2 mb-6" style={{ listStyle: "none", padding: 0 }}>
                {others[0].features.map((f, fi) => (
                  <li key={fi} style={{ fontSize: 14, color: tone.muted }}>✓ {f}</li>
                ))}
              </ul>
              <button
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: tone.primary,
                  borderRadius: tone.radius,
                  fontWeight: 600,
                  fontSize: 14,
                  border: `2px solid ${tone.primary}`,
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                {others[0].ctaText}
              </button>
            </div>
          )}
          {highlighted && (
            <div
              className="flex flex-col"
              style={{
                background: tone.gradient,
                borderRadius: tone.radius,
                padding: 40,
              }}
            >
              <h3 style={{ fontFamily: tone.headingFont, fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 6 }}>
                {highlighted.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", fontFamily: tone.headingFont }}>
                  {highlighted.price}
                </span>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>{highlighted.period}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8" style={{ listStyle: "none", padding: 0 }}>
                {highlighted.features.map((f, fi) => (
                  <li key={fi} style={{ fontSize: 15, color: "rgba(255,255,255,0.9)" }}>✓ {f}</li>
                ))}
              </ul>
              <button
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  color: tone.primary,
                  borderRadius: tone.radius,
                  fontWeight: 700,
                  fontSize: 16,
                  border: "none",
                  padding: "14px 24px",
                  cursor: "pointer",
                }}
              >
                {highlighted.ctaText}
              </button>
            </div>
          )}
          {others[1] && (
            <div
              className="flex flex-col"
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: 32,
                border: `1px solid ${tone.border}`,
              }}
            >
              <h3 style={{ fontFamily: tone.headingFont, fontWeight: 700, fontSize: 18, color: tone.text, marginBottom: 6 }}>
                {others[1].name}
              </h3>
              <div className="flex items-baseline gap-1 mb-5">
                <span style={{ fontSize: 34, fontWeight: 800, color: tone.text, fontFamily: tone.headingFont }}>
                  {others[1].price}
                </span>
                <span style={{ color: tone.muted, fontSize: 14 }}>{others[1].period}</span>
              </div>
              <ul className="flex flex-col gap-2 mb-6" style={{ listStyle: "none", padding: 0 }}>
                {others[1].features.map((f, fi) => (
                  <li key={fi} style={{ fontSize: 14, color: tone.muted }}>✓ {f}</li>
                ))}
              </ul>
              <button
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: tone.primary,
                  borderRadius: tone.radius,
                  fontWeight: 600,
                  fontSize: 14,
                  border: `2px solid ${tone.primary}`,
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                {others[1].ctaText}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
