import type { SectionProps } from "@/data/sections";

interface StatItem {
  value: string;
  label: string;
}

export function StatsCounters({ tone, content }: SectionProps) {
  const items = (content.items as StatItem[]) || [];

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: tone.gradient, fontFamily: tone.bodyFont }}
    >
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <div className="max-w-5xl mx-auto relative z-10">
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
                  textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 15,
                  marginTop: 8,
                  fontWeight: 500,
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
      style={{ background: `linear-gradient(180deg, ${tone.bg} 0%, ${tone.surface} 100%)`, fontFamily: tone.bodyFont }}
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
                border: `1px solid ${tone.border}`,
                boxShadow: `0 4px 16px -4px ${tone.primary}08`,
              }}
            >
              <div
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 800,
                  fontSize: 36,
                  background: tone.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                }}
              >
                {item.value}
              </div>
              <div style={{ color: tone.muted, fontSize: 14, marginTop: 8, fontWeight: 500 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
