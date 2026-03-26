import type { SectionProps } from "@/data/sections";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialsCards({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Testimonials";
  const items = (content.items as TestimonialItem[]) || [];

  return (
    <section
      style={{ background: `linear-gradient(180deg, ${tone.surface} 0%, ${tone.bg} 100%)`, fontFamily: tone.bodyFont }}
      className="py-20 px-6 relative overflow-hidden"
    >
      <div style={{ position: "absolute", bottom: -100, right: -100, width: 350, height: 350, borderRadius: "50%", background: tone.secondary, opacity: 0.03, pointerEvents: "none" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, margin: "0 auto 20px" }} />
          <h2
            style={{
              fontFamily: tone.headingFont,
              color: tone.text,
              fontWeight: 700,
              fontSize: 36,
            }}
          >
            {sectionTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: 32,
                border: `1px solid ${tone.border}`,
                boxShadow: `0 4px 24px -4px ${tone.primary}08`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 20,
                  fontFamily: tone.headingFont,
                  fontSize: 64,
                  lineHeight: 1,
                  color: tone.primary,
                  opacity: 0.08,
                }}
              >
                &ldquo;
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} style={{ color: tone.primary, fontSize: 18 }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  color: tone.text,
                  fontStyle: "italic",
                  fontSize: 15,
                  lineHeight: 1.7,
                  marginBottom: 20,
                  position: "relative",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: tone.gradient,
                    color: "#fff",
                    fontFamily: tone.headingFont,
                    fontWeight: 700,
                    fontSize: 16,
                    boxShadow: `0 4px 12px ${tone.primary}30`,
                  }}
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: tone.text, fontFamily: tone.headingFont }}>
                    {item.name}
                  </div>
                  <div style={{ color: tone.muted, fontSize: 13 }}>
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSpotlight({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Testimonials";
  const items = (content.items as TestimonialItem[]) || [];
  const item = items[0];
  if (!item) return null;

  return (
    <section
      style={{ background: `linear-gradient(180deg, ${tone.surface} 0%, ${tone.bg} 100%)`, fontFamily: tone.bodyFont }}
      className="py-24 px-6 relative overflow-hidden"
    >
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, height: 500, borderRadius: "50%", background: tone.gradient, opacity: 0.03, pointerEvents: "none" }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {sectionTitle && (
          <h2
            style={{
              fontFamily: tone.headingFont,
              color: tone.text,
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 32,
            }}
          >
            {sectionTitle}
          </h2>
        )}
        <div
          style={{
            background: `linear-gradient(135deg, ${tone.primary}10, ${tone.secondary}08)`,
            borderRadius: tone.radius,
            padding: "48px 40px",
            border: `1px solid ${tone.primary}15`,
          }}
        >
          <span
            style={{
              color: tone.primary,
              fontSize: 72,
              lineHeight: 1,
              fontFamily: tone.headingFont,
              opacity: 0.3,
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              color: tone.text,
              fontStyle: "italic",
              fontSize: 24,
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            {item.quote}
          </p>
          <div
            className="flex items-center justify-center gap-3"
          >
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: tone.gradient,
                color: "#fff",
                fontFamily: tone.headingFont,
                fontWeight: 700,
                fontSize: 18,
                boxShadow: `0 4px 12px ${tone.primary}30`,
              }}
            >
              {item.name.charAt(0)}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: tone.text, fontFamily: tone.headingFont }}>
                {item.name}
              </div>
              <div style={{ color: tone.muted, fontSize: 15, marginTop: 2 }}>
                {item.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsMinimal({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Testimonials";
  const items = (content.items as TestimonialItem[]) || [];

  return (
    <section
      style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div style={{ width: 48, height: 3, background: tone.gradient, borderRadius: 2, marginBottom: 20 }} />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                borderLeft: `3px solid ${tone.primary}`,
                paddingLeft: 20,
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              <p
                style={{
                  color: tone.text,
                  fontSize: 15,
                  lineHeight: 1.6,
                  marginBottom: 12,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              <div style={{ fontWeight: 700, fontSize: 14, color: tone.text, fontFamily: tone.headingFont }}>
                {item.name}
              </div>
              <div style={{ color: tone.muted, fontSize: 12, marginTop: 2 }}>
                {item.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
