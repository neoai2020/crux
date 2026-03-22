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
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: 32,
              }}
            >
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
                    backgroundColor: tone.primary,
                    color: "#fff",
                    fontFamily: tone.headingFont,
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: tone.text,
                      fontFamily: tone.headingFont,
                    }}
                  >
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
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        {sectionTitle && (
          <h2
            style={{
              fontFamily: tone.headingFont,
              color: tone.text,
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 24,
            }}
          >
            {sectionTitle}
          </h2>
        )}
        <span
          style={{
            color: tone.primaryLight,
            fontSize: 72,
            lineHeight: 1,
            fontFamily: tone.headingFont,
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
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: tone.text,
              fontFamily: tone.headingFont,
            }}
          >
            {item.name}
          </div>
          <div style={{ color: tone.muted, fontSize: 15, marginTop: 4 }}>
            {item.role}
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
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
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
              }}
            >
              <p
                style={{
                  color: tone.text,
                  fontSize: 15,
                  lineHeight: 1.6,
                  marginBottom: 12,
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: tone.text,
                  fontFamily: tone.headingFont,
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
