import type { SectionProps } from "@/data/sections";
import type { ToneDefinition } from "@/data/tones";

function footerBg(tone: ToneDefinition): string {
  return tone.id === "dark" ? tone.surface : "#111827";
}

const SOCIAL_ICONS = [
  { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.73 5.35 4.1 3.55 1.67.83a4.5 4.5 0 001.4 6.03A4.5 4.5 0 01.88 6.3v.06a4.52 4.52 0 003.63 4.43 4.5 4.5 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.06 9.06 0 010 15.54a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.01-.58A9.17 9.17 0 0023 3z" },
  { label: "LinkedIn", path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM6.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" },
  { label: "GitHub", path: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" },
];

function SocialIcon({ d, color }: { d: string; color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={color}
      style={{ opacity: 0.7 }}
    >
      <path d={d} />
    </svg>
  );
}

export function FooterColumns({ tone, content, businessName }: SectionProps) {
  const bg = footerBg(tone);
  const links = (content.links as { group: string; items: string[] }[]) || [];
  const copyright =
    (content.copyright as string) ||
    `\u00A9 ${new Date().getFullYear()} ${businessName}. All rights reserved.`;

  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor: bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
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
                {businessName?.charAt(0) || "B"}
              </div>
              <span
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#F9FAFB",
                }}
              >
                {businessName}
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#9CA3AF", maxWidth: 240 }}>
              Building exceptional experiences that help businesses grow and
              succeed in the digital world.
            </p>
          </div>
          {links.map((group, gi) => (
            <div key={gi}>
              <h4
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#F9FAFB",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                {group.group}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {group.items.map((item, ii) => (
                  <li key={ii} style={{ marginBottom: 10 }}>
                    <a
                      href="#"
                      style={{
                        color: "#9CA3AF",
                        fontSize: 14,
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#F9FAFB")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#9CA3AF")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="flex items-center justify-between"
          style={{
            borderTop: "1px solid #1F2937",
            marginTop: 48,
            paddingTop: 24,
          }}
        >
          <div className="flex items-center gap-5">
            {SOCIAL_ICONS.map((icon, i) => (
              <a key={i} href="#" aria-label={icon.label}>
                <SocialIcon d={icon.path} color="#9CA3AF" />
              </a>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "#6B7280" }}>{copyright}</span>
        </div>
      </div>
    </section>
  );
}

export function FooterMinimal({ tone, content, businessName }: SectionProps) {
  const bg = footerBg(tone);
  const links = (content.links as { group: string; items: string[] }[]) || [];
  const flatLinks = links.flatMap((g) => g.items).slice(0, 5);
  const copyright =
    (content.copyright as string) ||
    `\u00A9 ${new Date().getFullYear()} ${businessName}. All rights reserved.`;

  return (
    <section
      className="py-8 px-6"
      style={{ backgroundColor: bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: tone.gradient,
                color: "#fff",
                fontFamily: tone.headingFont,
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {businessName?.charAt(0) || "B"}
            </div>
            <span
              style={{
                fontFamily: tone.headingFont,
                fontWeight: 700,
                fontSize: 16,
                color: "#F9FAFB",
              }}
            >
              {businessName}
            </span>
          </div>
          <nav className="flex items-center gap-6">
            {flatLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: "#9CA3AF",
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#F9FAFB")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#9CA3AF")
                }
              >
                {link}
              </a>
            ))}
          </nav>
          <span style={{ fontSize: 13, color: "#6B7280" }}>{copyright}</span>
        </div>
      </div>
    </section>
  );
}

export function FooterCentered({ tone, content, businessName }: SectionProps) {
  const bg = footerBg(tone);
  const links = (content.links as { group: string; items: string[] }[]) || [];
  const copyright =
    (content.copyright as string) ||
    `\u00A9 ${new Date().getFullYear()} ${businessName}. All rights reserved.`;

  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor: bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="flex items-center justify-center gap-3"
          style={{ marginBottom: 32 }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: tone.gradient,
              color: "#fff",
              fontFamily: tone.headingFont,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {businessName?.charAt(0) || "B"}
          </div>
          <span
            style={{
              fontFamily: tone.headingFont,
              fontWeight: 700,
              fontSize: 22,
              color: "#F9FAFB",
            }}
          >
            {businessName}
          </span>
        </div>
        <div
          className="flex flex-wrap justify-center gap-x-8 gap-y-4"
          style={{ marginBottom: 32 }}
        >
          {links.map((group) =>
            group.items.map((item, ii) => (
              <a
                key={`${group.group}-${ii}`}
                href="#"
                style={{
                  color: "#9CA3AF",
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#F9FAFB")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#9CA3AF")
                }
              >
                {item}
              </a>
            ))
          )}
        </div>
        <div
          className="flex items-center justify-center gap-5"
          style={{ marginBottom: 28 }}
        >
          {SOCIAL_ICONS.map((icon, i) => (
            <a key={i} href="#" aria-label={icon.label}>
              <SocialIcon d={icon.path} color="#9CA3AF" />
            </a>
          ))}
        </div>
        <span style={{ fontSize: 13, color: "#6B7280" }}>{copyright}</span>
      </div>
    </section>
  );
}
