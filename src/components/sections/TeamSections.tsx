import type { SectionProps } from "@/data/sections";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  photo?: string;
}

function Avatar({ member, tone, size }: { member: TeamMember; tone: SectionProps["tone"]; size: number }) {
  if (member.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={member.photo}
        alt={member.name}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: tone.gradient,
        color: "#fff",
        fontFamily: tone.headingFont,
        fontWeight: 700,
        fontSize: size * 0.3,
      }}
    >
      {member.initials}
    </div>
  );
}

export function TeamGrid({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "Our Team";
  const subtitle = (content.subtitle as string) || "";
  const members = (content.members as TeamMember[]) || [];

  return (
    <section className="py-20 px-6" style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 36, marginBottom: 12 }}>
            {sectionTitle}
          </h2>
          {subtitle && (
            <p style={{ color: tone.muted, fontSize: 18, maxWidth: 560, margin: "0 auto" }}>{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {members.map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div style={{ marginBottom: 16 }}>
                <Avatar member={member} tone={tone} size={96} />
              </div>
              <h3 style={{ fontFamily: tone.headingFont, fontWeight: 700, fontSize: 17, color: tone.text, marginBottom: 4 }}>
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
    <section className="py-16 px-6" style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}>
      <div className="max-w-5xl mx-auto">
        <h2 style={{ fontFamily: tone.headingFont, color: tone.text, fontWeight: 700, fontSize: 32, marginBottom: subtitle ? 12 : 28 }}>
          {sectionTitle}
        </h2>
        {subtitle && (
          <p style={{ color: tone.muted, fontSize: 16, marginBottom: 28 }}>{subtitle}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Avatar member={member} tone={tone} size={48} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: tone.text, lineHeight: 1.3 }}>
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
