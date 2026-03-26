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
        boxShadow: `0 2px 8px ${tone.primary}30`,
      }}
    >
      {initial}
    </div>
  );
}

function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function NavbarCentered({ tone, content, businessName }: SectionProps) {
  const navLinks = (content.navLinks as string[]) || [];
  const ctaText = (content.ctaText as string) || "Get Started";
  const ctaLink = (content.ctaLink as string) || "#section-contact";
  const logoData = content.logoData as string | undefined;

  return (
    <section
      style={{
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        backgroundColor: `${tone.bg}ee`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NavLogo tone={tone} logoData={logoData} businessName={businessName} size={40} />
            {!logoData && (
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
            )}
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => {
              const href = `#section-${link.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <a
                  key={i}
                  href={href}
                  onClick={(e) => handleSmoothScroll(e, href)}
                  style={{
                    color: tone.muted,
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.2s",
                    padding: "4px 0",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = tone.text; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = tone.muted; }}
                >
                  {link}
                </a>
              );
            })}
          </nav>
          <a
            href={ctaLink}
            target={ctaLink.startsWith("http") ? "_blank" : undefined}
            rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
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
              boxShadow: `0 2px 8px ${tone.primary}25`,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}

export function NavbarLeftAligned({ tone, content, businessName }: SectionProps) {
  const navLinks = (content.navLinks as string[]) || [];
  const ctaText = (content.ctaText as string) || "Get Started";
  const ctaLink = (content.ctaLink as string) || "#section-contact";
  const logoData = content.logoData as string | undefined;

  return (
    <section
      style={{
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        backgroundColor: `${tone.bg}ee`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: 64 }}>
          <div className="flex items-center gap-3">
            <NavLogo tone={tone} logoData={logoData} businessName={businessName} size={38} />
            {!logoData && (
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
            )}
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => {
              const href = `#section-${link.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <a
                  key={i}
                  href={href}
                  onClick={(e) => handleSmoothScroll(e, href)}
                  style={{
                    color: tone.muted,
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.2s",
                    padding: "4px 0",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = tone.text; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = tone.muted; }}
                >
                  {link}
                </a>
              );
            })}
          </nav>
          <a
            href={ctaLink}
            target={ctaLink.startsWith("http") ? "_blank" : undefined}
            rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
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
              boxShadow: `0 2px 8px ${tone.primary}25`,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}

export function NavbarMinimal({ tone, content, businessName }: SectionProps) {
  const ctaText = (content.ctaText as string) || "Get Started";
  const ctaLink = (content.ctaLink as string) || "#section-contact";
  const logoData = content.logoData as string | undefined;

  return (
    <section
      style={{
        borderBottom: `1px solid ${tone.border}`,
        fontFamily: tone.bodyFont,
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        backgroundColor: `${tone.bg}ee`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: 60 }}>
          <div className="flex items-center gap-3">
            <NavLogo tone={tone} logoData={logoData} businessName={businessName} size={36} />
            {!logoData && (
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
            )}
          </div>
          <a
            href={ctaLink}
            target={ctaLink.startsWith("http") ? "_blank" : undefined}
            rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
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
              boxShadow: `0 2px 8px ${tone.primary}25`,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
