import type { SectionProps } from "@/data/sections";

interface StatItem {
  value: string;
  label: string;
}

export function StatsCounters({ tone, content }: SectionProps) {
  const items = (content.items as StatItem[]) || [];

  return (
    <section
      style={{ background: tone.gradient, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 800,
                  fontSize: 48,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 15,
                  marginTop: 6,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsCards({ tone, content }: SectionProps) {
  const items = (content.items as StatItem[]) || [];

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="text-center"
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: "32px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 800,
                  fontSize: 36,
                  color: tone.primary,
                  lineHeight: 1.1,
                }}
              >
                {item.value}
              </div>
              <div
                style={{ color: tone.muted, fontSize: 14, marginTop: 8 }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
