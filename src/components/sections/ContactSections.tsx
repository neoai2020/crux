import type { SectionProps } from "@/data/sections";

export function ContactSplit({ tone, content }: SectionProps) {
  const heading = (content.heading as string) || "Get in Touch";
  const description = (content.description as string) || "";
  const email = (content.email as string) || "";
  const phone = (content.phone as string) || "";
  const address = (content.address as string) || "";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: tone.surface,
    border: `1px solid ${tone.border}`,
    borderRadius: tone.radius,
    fontFamily: tone.bodyFont,
    fontSize: 14,
    color: tone.text,
    outline: "none",
  };

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-start">
        <div>
          <h2
            style={{
              fontFamily: tone.headingFont,
              fontWeight: 700,
              fontSize: 36,
              color: tone.text,
              marginBottom: 14,
            }}
          >
            {heading}
          </h2>
          {description && (
            <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              {description}
            </p>
          )}
          <div className="flex flex-col gap-5">
            {email && (
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 20 }}>📧</span>
                <span style={{ color: tone.text, fontSize: 15 }}>{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 20 }}>📞</span>
                <span style={{ color: tone.text, fontSize: 15 }}>{phone}</span>
              </div>
            )}
            {address && (
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 20 }}>📍</span>
                <span style={{ color: tone.text, fontSize: 15 }}>{address}</span>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            backgroundColor: tone.surface,
            borderRadius: tone.radius,
            padding: 32,
            border: `1px solid ${tone.border}`,
          }}
        >
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" style={inputStyle} />
            <input type="email" placeholder="Your Email" style={inputStyle} />
            <textarea
              placeholder="Your Message"
              rows={5}
              style={{ ...inputStyle, resize: "none" }}
            />
            <button
              style={{
                backgroundColor: tone.primary,
                color: "#fff",
                border: "none",
                borderRadius: tone.radius,
                fontFamily: tone.bodyFont,
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 28px",
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactCentered({ tone, content }: SectionProps) {
  const heading = (content.heading as string) || "Get in Touch";
  const description = (content.description as string) || "";
  const email = (content.email as string) || "";
  const phone = (content.phone as string) || "";
  const address = (content.address as string) || "";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: tone.bg,
    border: `1px solid ${tone.border}`,
    borderRadius: tone.radius,
    fontFamily: tone.bodyFont,
    fontSize: 14,
    color: tone.text,
    outline: "none",
  };

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div className="max-w-lg mx-auto text-center">
        <h2
          style={{
            fontFamily: tone.headingFont,
            fontWeight: 700,
            fontSize: 36,
            color: tone.text,
            marginBottom: 12,
          }}
        >
          {heading}
        </h2>
        {description && (
          <p style={{ color: tone.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            {description}
          </p>
        )}
        <div className="flex flex-col gap-4" style={{ textAlign: "left" }}>
          <input type="text" placeholder="Your Name" style={inputStyle} />
          <input type="email" placeholder="Your Email" style={inputStyle} />
          <textarea
            placeholder="Your Message"
            rows={5}
            style={{ ...inputStyle, resize: "none" }}
          />
          <button
            style={{
              backgroundColor: tone.primary,
              color: "#fff",
              border: "none",
              borderRadius: tone.radius,
              fontFamily: tone.bodyFont,
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 28px",
              cursor: "pointer",
              width: "100%",
              marginTop: 4,
            }}
          >
            Send Message
          </button>
        </div>
        <div
          className="flex items-center justify-center gap-8 flex-wrap"
          style={{ marginTop: 32 }}
        >
          {email && (
            <span style={{ color: tone.muted, fontSize: 14 }}>📧 {email}</span>
          )}
          {phone && (
            <span style={{ color: tone.muted, fontSize: 14 }}>📞 {phone}</span>
          )}
          {address && (
            <span style={{ color: tone.muted, fontSize: 14 }}>📍 {address}</span>
          )}
        </div>
      </div>
    </section>
  );
}
