import type { SectionProps } from "@/data/sections";

export function NavbarCentered({ tone, content, businessName }: SectionProps) {
  const navLinks = (content.navLinks as string[]) || [];
  const ctaText = (content.ctaText as string) || "Get Started";
  const initial = businessName?.charAt(0) || "B";

  return (
    <section
      style={{
        backgroundColor: tone.bg,
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-between w-full">
            <div style={{ width: 120 }} />
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: tone.gradient,
                  color: "#fff",
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {initial}
              </div>
              <span
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 18,
                  color: tone.text,
                }}
              >
                {businessName}
              </span>
            </div>
            <div style={{ width: 120 }} className="flex justify-end">
              <button
                style={{
                  background: tone.gradient,
                  color: "#fff",
                  borderRadius: tone.radius,
                  fontFamily: tone.bodyFont,
                  fontWeight: 600,
                  fontSize: 14,
                  border: "none",
                  padding: "8px 20px",
                  cursor: "pointer",
                }}
              >
                {ctaText}
              </button>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: tone.muted,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = tone.primary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = tone.muted)
                }
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export function NavbarLeftAligned({ tone, content, businessName }: SectionProps) {
  const navLinks = (content.navLinks as string[]) || [];
  const ctaText = (content.ctaText as string) || "Get Started";
  const initial = businessName?.charAt(0) || "B";

  return (
    <section
      style={{
        backgroundColor: tone.bg,
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex items-center justify-between"
          style={{ height: 64 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: tone.gradient,
                color: "#fff",
                fontFamily: tone.headingFont,
                fontWeight: 700,
                fontSize: 17,
              }}
            >
              {initial}
            </div>
            <span
              style={{
                fontFamily: tone.headingFont,
                fontWeight: 700,
                fontSize: 18,
                color: tone.text,
              }}
            >
              {businessName}
            </span>
          </div>
          <nav className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: tone.muted,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = tone.primary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = tone.muted)
                }
              >
                {link}
              </a>
            ))}
          </nav>
          <button
            style={{
              background: tone.gradient,
              color: "#fff",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              padding: "8px 22px",
              cursor: "pointer",
            }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}

export function NavbarMinimal({ tone, content, businessName }: SectionProps) {
  const ctaText = (content.ctaText as string) || "Get Started";
  const initial = businessName?.charAt(0) || "B";

  return (
    <section
      style={{
        backgroundColor: tone.bg,
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex items-center justify-between"
          style={{ height: 60 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: tone.gradient,
                color: "#fff",
                fontFamily: tone.headingFont,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {initial}
            </div>
            <span
              style={{
                fontFamily: tone.headingFont,
                fontWeight: 700,
                fontSize: 17,
                color: tone.text,
              }}
            >
              {businessName}
            </span>
          </div>
          <button
            style={{
              background: tone.gradient,
              color: "#fff",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              padding: "8px 20px",
              cursor: "pointer",
            }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
