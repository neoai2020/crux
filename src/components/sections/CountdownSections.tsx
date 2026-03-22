import type { SectionProps } from "@/data/sections";

interface TimeBlock {
  value: string;
  label: string;
}

const DEFAULT_TIME_BLOCKS: TimeBlock[] = [
  { value: "07", label: "Days" },
  { value: "23", label: "Hours" },
  { value: "45", label: "Min" },
  { value: "12", label: "Sec" },
];

export function CountdownBanner({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "Limited Time Offer";
  const description = (content.description as string) || "";
  const ctaText = (content.ctaText as string) || "Claim Your Spot";
  const timeBlocks = (content.timeBlocks as TimeBlock[]) || DEFAULT_TIME_BLOCKS;

  return (
    <section
      className="py-16 px-6"
      style={{ background: tone.gradient, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          style={{
            fontFamily: tone.headingFont,
            fontWeight: 800,
            fontSize: 36,
            color: "#fff",
            marginBottom: description ? 12 : 28,
          }}
        >
          {headline}
        </h2>
        {description && (
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, marginBottom: 28, lineHeight: 1.6 }}>
            {description}
          </p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 max-w-md mx-auto">
          {timeBlocks.map((block) => (
            <div key={block.label} className="flex flex-col items-center">
              <span
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 800,
                  fontSize: 48,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {block.value}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 500,
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {block.label}
              </span>
            </div>
          ))}
        </div>
        <button
          style={{
            backgroundColor: "#fff",
            color: tone.primary,
            border: "none",
            borderRadius: tone.radius,
            fontFamily: tone.bodyFont,
            fontWeight: 700,
            fontSize: 16,
            padding: "16px 40px",
            cursor: "pointer",
          }}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}

export function CountdownCard({ tone, content }: SectionProps) {
  const headline = (content.headline as string) || "Limited Time Offer";
  const description = (content.description as string) || "";
  const ctaText = (content.ctaText as string) || "Claim Your Spot";
  const timeBlocks = (content.timeBlocks as TimeBlock[]) || DEFAULT_TIME_BLOCKS;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div
        className="max-w-2xl mx-auto text-center"
        style={{
          backgroundColor: tone.surface,
          border: `1px solid ${tone.border}`,
          borderRadius: tone.radius,
          padding: "48px 40px",
        }}
      >
        <h2
          style={{
            fontFamily: tone.headingFont,
            fontWeight: 700,
            fontSize: 30,
            color: tone.text,
            marginBottom: 24,
          }}
        >
          {headline}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-6 max-w-md mx-auto">
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="flex flex-col items-center"
              style={{
                backgroundColor: tone.bg,
                borderRadius: tone.radius,
                padding: "16px 12px",
                border: `1px solid ${tone.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 800,
                  fontSize: 32,
                  color: tone.primary,
                  lineHeight: 1,
                }}
              >
                {block.value}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: tone.muted,
                  fontWeight: 500,
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {block.label}
              </span>
            </div>
          ))}
        </div>
        {description && (
          <p style={{ color: tone.muted, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            {description}
          </p>
        )}
        <button
          style={{
            backgroundColor: tone.primary,
            color: "#fff",
            border: "none",
            borderRadius: tone.radius,
            fontFamily: tone.bodyFont,
            fontWeight: 600,
            fontSize: 15,
            padding: "14px 36px",
            cursor: "pointer",
          }}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}
