import type { SectionProps } from "@/data/sections";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  ctaLink?: string;
  highlighted: boolean;
}

export function PricingCards({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Pricing";
  const subtitle = (content.subtitle as string) || "";
  const highlightLabel = (content.highlightLabel as string) || "Most Popular";
  const plans = (content.plans as PricingPlan[]) || [];

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div
            style={{
              width: 48,
              height: 4,
              background: tone.gradient,
              borderRadius: 2,
              margin: "0 auto 20px",
            }}
          />
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
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 500, margin: "0 auto" }}>{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="flex flex-col"
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: plan.highlighted ? "40px 36px" : "36px 36px",
                border: plan.highlighted
                  ? `2px solid ${tone.primary}`
                  : `1px solid ${tone.border}`,
                position: "relative",
                boxShadow: plan.highlighted
                  ? `0 20px 60px ${tone.primary}20`
                  : `0 4px 20px ${tone.primary}05`,
                transform: plan.highlighted ? "scale(1.04)" : "scale(1)",
                zIndex: plan.highlighted ? 2 : 1,
                transition: "box-shadow 0.3s, transform 0.3s",
              }}
            >
              {plan.highlighted && (
                <span
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: tone.gradient,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "5px 20px",
                    borderRadius: 999,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    boxShadow: `0 4px 12px ${tone.primary}40`,
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
                    fontSize: 44,
                    fontWeight: 800,
                    fontFamily: tone.headingFont,
                    background: plan.highlighted ? tone.gradient : "none",
                    WebkitBackgroundClip: plan.highlighted ? "text" : undefined,
                    WebkitTextFillColor: plan.highlighted ? "transparent" : tone.text,
                    color: tone.text,
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ color: tone.muted, fontSize: 15 }}>
                  {plan.period}
                </span>
              </div>
              <div
                style={{
                  height: 1,
                  backgroundColor: tone.border,
                  marginBottom: 20,
                }}
              />
              <ul className="flex flex-col gap-3 mb-8" style={{ listStyle: "none", padding: 0 }}>
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3" style={{ fontSize: 15 }}>
                    <span
                      style={{
                        color: tone.primary,
                        fontWeight: 700,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: `${tone.primary}15`,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: tone.text }}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <a
                  href={plan.ctaLink || "#section-contact"}
                  target={(plan.ctaLink || "").startsWith("http") ? "_blank" : undefined}
                  rel={(plan.ctaLink || "").startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    width: "100%",
                    background: plan.highlighted ? tone.gradient : "transparent",
                    color: plan.highlighted ? "#fff" : tone.primary,
                    borderRadius: tone.radius,
                    fontFamily: tone.bodyFont,
                    fontWeight: 700,
                    fontSize: 15,
                    border: plan.highlighted ? "none" : `2px solid ${tone.primary}`,
                    padding: "14px 24px",
                    cursor: "pointer",
                    boxShadow: plan.highlighted ? `0 4px 20px ${tone.primary}30` : "none",
                    transition: "box-shadow 0.3s",
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  {plan.ctaText}
                </a>
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
          <div
            style={{
              width: 48,
              height: 4,
              background: tone.gradient,
              borderRadius: 2,
              margin: "0 auto 20px",
            }}
          />
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
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 500, margin: "0 auto" }}>{subtitle}</p>
          )}
        </div>
        <div
          style={{
            overflowX: "auto",
            borderRadius: tone.radius,
            border: `1px solid ${tone.border}`,
            backgroundColor: tone.surface,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "16px 20px", color: tone.muted, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                  Features
                </th>
                {plans.map((plan, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: "center",
                      padding: "16px 20px",
                      fontFamily: tone.headingFont,
                      fontWeight: 700,
                      fontSize: 18,
                      color: plan.highlighted ? tone.primary : tone.text,
                      borderBottom: `2px solid ${plan.highlighted ? tone.primary : tone.border}`,
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
                  <td style={{ padding: "14px 20px", fontSize: 15, color: tone.text }}>
                    {feature}
                  </td>
                  {plans.map((plan, pi) => (
                    <td
                      key={pi}
                      style={{
                        textAlign: "center",
                        padding: "14px 20px",
                        fontSize: 18,
                      }}
                    >
                      {plan.features.includes(feature) ? (
                        <span style={{ color: tone.primary, fontWeight: 700 }}>✓</span>
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
          <div
            style={{
              width: 48,
              height: 4,
              background: tone.gradient,
              borderRadius: 2,
              margin: "0 auto 20px",
            }}
          />
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
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 500, margin: "0 auto" }}>{subtitle}</p>
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
                boxShadow: `0 4px 20px ${tone.primary}05`,
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
              <div style={{ height: 1, backgroundColor: tone.border, marginBottom: 16 }} />
              <ul className="flex flex-col gap-2 mb-6" style={{ listStyle: "none", padding: 0 }}>
                {others[0].features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2" style={{ fontSize: 14, color: tone.muted }}>
                    <span style={{ color: tone.primary, fontWeight: 700, fontSize: 12 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={others[0].ctaLink || "#section-contact"}
                target={(others[0].ctaLink || "").startsWith("http") ? "_blank" : undefined}
                rel={(others[0].ctaLink || "").startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: tone.primary,
                  borderRadius: tone.radius,
                  fontWeight: 600,
                  fontSize: 14,
                  border: `2px solid ${tone.primary}`,
                  padding: "12px 20px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {others[0].ctaText}
              </a>
            </div>
          )}
          {highlighted && (
            <div
              className="flex flex-col"
              style={{
                background: tone.gradient,
                borderRadius: tone.radius,
                padding: 40,
                boxShadow: `0 20px 60px ${tone.primary}30`,
                transform: "scale(1.05)",
                position: "relative",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#fff",
                  color: tone.primary,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 16px",
                  borderRadius: 999,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                Best Value
              </span>
              <h3 style={{ fontFamily: tone.headingFont, fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 6 }}>
                {highlighted.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", fontFamily: tone.headingFont }}>
                  {highlighted.price}
                </span>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>{highlighted.period}</span>
              </div>
              <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.2)", marginBottom: 20 }} />
              <ul className="flex flex-col gap-3 mb-8" style={{ listStyle: "none", padding: 0 }}>
                {highlighted.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2" style={{ fontSize: 15, color: "rgba(255,255,255,0.9)" }}>
                    <span style={{ fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={highlighted.ctaLink || "#section-contact"}
                target={(highlighted.ctaLink || "").startsWith("http") ? "_blank" : undefined}
                rel={(highlighted.ctaLink || "").startsWith("http") ? "noopener noreferrer" : undefined}
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
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {highlighted.ctaText}
              </a>
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
                boxShadow: `0 4px 20px ${tone.primary}05`,
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
              <div style={{ height: 1, backgroundColor: tone.border, marginBottom: 16 }} />
              <ul className="flex flex-col gap-2 mb-6" style={{ listStyle: "none", padding: 0 }}>
                {others[1].features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2" style={{ fontSize: 14, color: tone.muted }}>
                    <span style={{ color: tone.primary, fontWeight: 700, fontSize: 12 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={others[1].ctaLink || "#section-contact"}
                target={(others[1].ctaLink || "").startsWith("http") ? "_blank" : undefined}
                rel={(others[1].ctaLink || "").startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: tone.primary,
                  borderRadius: tone.radius,
                  fontWeight: 600,
                  fontSize: 14,
                  border: `2px solid ${tone.primary}`,
                  padding: "12px 20px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {others[1].ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
