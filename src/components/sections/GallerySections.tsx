import type { SectionProps } from "@/data/sections";

const ROTATIONS = [135, 180, 225, 90, 315, 45];

function GalleryImage({ src, gradient, radius, rotation }: { src?: string; gradient: string; radius: string; rotation: number }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: radius, display: "block" }} />
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(${rotation}deg, ${gradient.includes(",") ? gradient.replace("linear-gradient(135deg, ", "").replace(")", "") : gradient})`,
        borderRadius: radius,
      }}
    />
  );
}

export function GalleryGrid({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Gallery";
  const subtitle = (content.subtitle as string) || "";
  const itemCount = (content.itemCount as number) || 6;

  return (
    <section className="py-20 px-6" style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 12 }}>
            {sectionTitle}
          </h2>
          {subtitle && (
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: itemCount }).map((_, i) => {
            const img = content[`image${i}`] as string | undefined;
            return (
              <div key={i} style={{ aspectRatio: "1", overflow: "hidden", borderRadius: tone.radius }}>
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(${ROTATIONS[i % ROTATIONS.length]}deg, ${tone.primary}, ${tone.secondary})`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function GalleryFeatured({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Gallery";
  const subtitle = (content.subtitle as string) || "";
  const mainImage = content.image0 as string | undefined;

  return (
    <section className="py-20 px-6" style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 12 }}>
            {sectionTitle}
          </h2>
          {subtitle && <p style={{ color: tone.muted, fontSize: 18 }}>{subtitle}</p>}
        </div>
        <div className="h-64 w-full mb-6 overflow-hidden" style={{ borderRadius: tone.radius }}>
          <GalleryImage src={mainImage} gradient={tone.gradient} radius={tone.radius} rotation={135} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const img = content[`image${i + 1}`] as string | undefined;
            return (
              <div key={i} style={{ aspectRatio: "4/3", overflow: "hidden", borderRadius: tone.radius }}>
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(${ROTATIONS[i + 1]}deg, ${tone.primary}, ${tone.accent})`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
