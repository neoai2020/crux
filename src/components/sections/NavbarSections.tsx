import type { SectionProps } from "@/data/sections";
import type { ToneDefinition } from "@/data/tones";

function NavLogo({ tone, logoData, businessName, size = 40 }: { tone: ToneDefinition; logoData?: string; businessName: string; size?: number }) {
  if (logoData) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logoData} alt={businessName} style={{ height: size, width: "auto", maxWidth: size * 3, objectFit: "contain" }} />
    );
  }
  const initial = businessName?.charAt(0) || "B";
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: tone.gradient,
        color: "#fff",
        fontFamily: tone.headingFont,
        fontWeight: 700,
        fontSize: size * 0.45,
      }}
    >
      {initial}
    </div>
  );
}

export function NavbarCentered({ tone, content, businessName }: SectionProps) {
  const navLinks = (content.navLinks as string[]) || [];
  const ctaText = (content.ctaText as string) || "Get Started";
  const logoData = content.logoData as string | undefined;

  return (
    <section
      style={{
        backgroundColor: tone.bg,
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NavLogo tone={tone} logoData={logoData} businessName={businessName} size={40} />
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
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: tone.muted,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
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

export function NavbarLeftAligned({ tone, content, businessName }: SectionProps) {
  const navLinks = (content.navLinks as string[]) || [];
  const ctaText = (content.ctaText as string) || "Get Started";
  const logoData = content.logoData as string | undefined;

  return (
    <section
      style={{
        backgroundColor: tone.bg,
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: 64 }}>
          <div className="flex items-center gap-3">
            <NavLogo tone={tone} logoData={logoData} businessName={businessName} size={38} />
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
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: tone.muted,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
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
  const logoData = content.logoData as string | undefined;

  return (
    <section
      style={{
        backgroundColor: tone.bg,
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: 60 }}>
          <div className="flex items-center gap-3">
            <NavLogo tone={tone} logoData={logoData} businessName={businessName} size={36} />
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
