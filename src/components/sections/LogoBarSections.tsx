import type { SectionProps } from "@/data/sections";

export function LogoBarScroll({ tone, content }: SectionProps) {
  const title = (content.title as string) || "";
  const logos = (content.logos as string[]) || [];

  return (
    <section
      className="py-10 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <p
            className="text-center mb-6"
            style={{ color: tone.muted, fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            {title}
          </p>
        )}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {logos.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                backgroundColor: tone.surface,
                border: `1px solid ${tone.border}`,
                borderRadius: tone.radius,
                padding: "12px 28px",
                minWidth: 120,
              }}
            >
              <span style={{ color: tone.muted, fontWeight: 500, fontSize: 15 }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LogoBarGrid({ tone, content }: SectionProps) {
  const title = (content.title as string) || "";
  const logos = (content.logos as string[]) || [];

  return (
    <section
      className="py-12 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <h3
            className="text-center mb-10"
            style={{
              fontFamily: tone.headingFont,
              color: tone.text,
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            {title}
          </h3>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {logos.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: "20px 16px",
              }}
            >
              <span style={{ color: tone.muted, fontWeight: 500, fontSize: 16 }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
