import type { SectionProps } from "@/data/sections";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export function TeamGrid({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Our Team";
  const subtitle = (content.subtitle as string) || "";
  const members = (content.members as TeamMember[]) || [];

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-5xl mx-auto">
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
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {members.map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: tone.gradient,
                  color: "#fff",
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 28,
                  marginBottom: 16,
                }}
              >
                {member.initials}
              </div>
              <h3
                style={{
                  fontFamily: tone.headingFont,
                  fontWeight: 700,
                  fontSize: 17,
                  color: tone.text,
                  marginBottom: 4,
                }}
              >
                {member.name}
              </h3>
              <p style={{ color: tone.muted, fontSize: 14 }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamCompact({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Our Team";
  const subtitle = (content.subtitle as string) || "";
  const members = (content.members as TeamMember[]) || [];

  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          style={{
            fontFamily: tone.headingFont,
            color: tone.text,
            fontWeight: 700,
            fontSize: 32,
            marginBottom: subtitle ? 12 : 28,
          }}
        >
          {sectionTitle}
        </h2>
        {subtitle && (
          <p style={{ color: tone.muted, fontSize: 16, marginBottom: 28 }}>
            {subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: tone.primary,
                  color: "#fff",
                  fontFamily: tone.headingFont,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {member.initials}
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: tone.text,
                    lineHeight: 1.3,
                  }}
                >
                  {member.name}
                </p>
                <p style={{ color: tone.muted, fontSize: 13 }}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
