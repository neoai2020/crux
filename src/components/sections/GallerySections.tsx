import type { SectionProps } from "@/data/sections";

const ROTATIONS = [135, 180, 225, 90, 315, 45];

export function GalleryGrid({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Gallery";
  const subtitle = (content.subtitle as string) || "";
  const itemCount = (content.itemCount as number) || 6;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
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
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: itemCount }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                background: `linear-gradient(${ROTATIONS[i % ROTATIONS.length]}deg, ${tone.primary}, ${tone.secondary})`,
                borderRadius: tone.radius,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryFeatured({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Gallery";

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center mb-12"
          style={{
            fontFamily: tone.headingFont,
            color: tone.text,
            fontWeight: 700,
            fontSize: 36,
          }}
        >
          {sectionTitle}
        </h2>
        <div
          className="h-64 w-full mb-6"
          style={{
            background: `linear-gradient(135deg, ${tone.primary}, ${tone.secondary})`,
            borderRadius: tone.radius,
          }}
        />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "4/3",
                background: `linear-gradient(${ROTATIONS[i + 1]}deg, ${tone.primary}, ${tone.accent})`,
                borderRadius: tone.radius,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
