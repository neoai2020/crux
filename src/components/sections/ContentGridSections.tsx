import type { SectionProps } from "@/data/sections";

interface ContentItem {
  title: string;
  description: string;
  tag: string;
}

export function ContentGridCards({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Featured";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as ContentItem[]) || [];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                overflow: "hidden",
                border: `1px solid ${tone.border}`,
              }}
            >
              <div
                className="h-40 w-full"
                style={{ background: tone.gradient }}
              />
              <div style={{ padding: 24 }}>
                <h3
                  style={{
                    fontFamily: tone.headingFont,
                    fontWeight: 700,
                    fontSize: 18,
                    color: tone.text,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: tone.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>
                  {item.description}
                </p>
                <span
                  style={{
                    backgroundColor: tone.primary,
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: 999,
                    display: "inline-block",
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContentGridList({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Featured";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as ContentItem[]) || [];

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          style={{
            fontFamily: tone.headingFont,
            color: tone.text,
            fontWeight: 700,
            fontSize: 36,
            marginBottom: subtitle ? 12 : 32,
          }}
        >
          {sectionTitle}
        </h2>
        {subtitle && (
          <p style={{ color: tone.muted, fontSize: 16, marginBottom: 32 }}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: 1, backgroundColor: tone.border }} />
              )}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6">
                <div
                  className="flex-shrink-0"
                  style={{
                    width: 80,
                    height: 80,
                    background: tone.gradient,
                    borderRadius: tone.radius,
                  }}
                />
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: tone.headingFont,
                      fontWeight: 700,
                      fontSize: 18,
                      color: tone.text,
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: tone.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
                    {item.description}
                  </p>
                  <span
                    style={{
                      backgroundColor: tone.primary,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 999,
                      display: "inline-block",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContentGridFeatured({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Featured";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as ContentItem[]) || [];
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-6xl mx-auto">
        {sectionTitle && (
          <div className="text-center mb-12">
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
        )}
        {featured && (
          <div
            style={{
              position: "relative",
              borderRadius: tone.radius,
              overflow: "hidden",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                background: tone.gradient,
                height: 320,
                width: "100%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "32px 28px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              }}
            >
              <span
                style={{
                  backgroundColor: tone.primary,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: 999,
                  display: "inline-block",
                  marginBottom: 10,
                }}
              >
                {featured.tag}
              </span>
              <h2
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 800,
                  fontSize: 28,
                  color: "#fff",
                  margin: 0,
                }}
              >
                {featured.title}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginTop: 6 }}>
                {featured.description}
              </p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.bg,
                borderRadius: tone.radius,
                overflow: "hidden",
                border: `1px solid ${tone.border}`,
              }}
            >
              <div
                style={{
                  background: tone.gradient,
                  height: 140,
                  width: "100%",
                }}
              />
              <div style={{ padding: 20 }}>
                <span
                  style={{
                    backgroundColor: tone.primary,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 999,
                    display: "inline-block",
                    marginBottom: 10,
                  }}
                >
                  {item.tag}
                </span>
                <h3
                  style={{
                    fontFamily: tone.headingFont,
                    fontWeight: 700,
                    fontSize: 17,
                    color: tone.text,
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: tone.muted, fontSize: 13, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
