import type { SectionProps } from "@/data/sections";

export function ContactSplit({ tone, content }: SectionProps) {
  const heading = (content.heading as string) || "Get in Touch";
  const description = (content.description as string) || "";
  const email = (content.email as string) || "";
  const phone = (content.phone as string) || "";
  const address = (content.address as string) || "";
  const buttonText = (content.buttonText as string) || "Send Message";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    backgroundColor: tone.surface,
    border: `1px solid ${tone.border}`,
    borderRadius: tone.radius,
    fontFamily: tone.bodyFont,
    fontSize: 14,
    color: tone.text,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: tone.gradient,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 300,
          height: 300,
          background: `${tone.primary}08`,
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start relative">
        <div>
          <div
            style={{
              width: 48,
              height: 4,
              background: tone.gradient,
              borderRadius: 2,
              marginBottom: 20,
            }}
          />
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
              <div
                className="flex items-center gap-4"
                style={{
                  backgroundColor: tone.surface,
                  borderRadius: tone.radius,
                  padding: "16px 20px",
                  border: `1px solid ${tone.border}`,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `${tone.primary}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  📧
                </div>
                <div>
                  <div style={{ fontSize: 11, color: tone.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Email</div>
                  <span style={{ color: tone.text, fontSize: 15, fontWeight: 500 }}>{email}</span>
                </div>
              </div>
            )}
            {phone && (
              <div
                className="flex items-center gap-4"
                style={{
                  backgroundColor: tone.surface,
                  borderRadius: tone.radius,
                  padding: "16px 20px",
                  border: `1px solid ${tone.border}`,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `${tone.primary}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  📞
                </div>
                <div>
                  <div style={{ fontSize: 11, color: tone.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Phone</div>
                  <span style={{ color: tone.text, fontSize: 15, fontWeight: 500 }}>{phone}</span>
                </div>
              </div>
            )}
            {address && (
              <div
                className="flex items-center gap-4"
                style={{
                  backgroundColor: tone.surface,
                  borderRadius: tone.radius,
                  padding: "16px 20px",
                  border: `1px solid ${tone.border}`,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `${tone.primary}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  📍
                </div>
                <div>
                  <div style={{ fontSize: 11, color: tone.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Address</div>
                  <span style={{ color: tone.text, fontSize: 15, fontWeight: 500 }}>{address}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            backgroundColor: tone.surface,
            borderRadius: tone.radius,
            padding: 36,
            border: `1px solid ${tone.border}`,
            boxShadow: `0 20px 60px ${tone.primary}08`,
          }}
        >
          <h3
            style={{
              fontFamily: tone.headingFont,
              fontWeight: 700,
              fontSize: 18,
              color: tone.text,
              marginBottom: 20,
            }}
          >
            Send a Message
          </h3>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" style={inputStyle} />
              <input type="text" placeholder="Last Name" style={inputStyle} />
            </div>
            <input type="email" placeholder="Email Address" style={inputStyle} />
            <textarea
              placeholder="Your Message"
              rows={5}
              style={{ ...inputStyle, resize: "none" }}
            />
            <button
              style={{
                background: tone.gradient,
                color: "#fff",
                border: "none",
                borderRadius: tone.radius,
                fontFamily: tone.bodyFont,
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 28px",
                cursor: "pointer",
                marginTop: 4,
                boxShadow: `0 4px 20px ${tone.primary}30`,
              }}
            >
              {buttonText} →
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
  const buttonText = (content.buttonText as string) || "Send Message";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    backgroundColor: tone.bg,
    border: `1px solid ${tone.border}`,
    borderRadius: tone.radius,
    fontFamily: tone.bodyFont,
    fontSize: 14,
    color: tone.text,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: tone.surface, fontFamily: tone.bodyFont }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 400,
          height: 400,
          background: `${tone.primary}06`,
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
      <div className="max-w-lg mx-auto text-center relative">
        <div
          style={{
            width: 48,
            height: 4,
            background: tone.gradient,
            borderRadius: 2,
            margin: "0 auto 20px",
          }}
        />
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
        <div
          style={{
            backgroundColor: tone.bg,
            borderRadius: tone.radius,
            padding: 32,
            border: `1px solid ${tone.border}`,
            boxShadow: `0 20px 60px ${tone.primary}08`,
          }}
        >
          <div className="flex flex-col gap-4" style={{ textAlign: "left" }}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" style={inputStyle} />
              <input type="text" placeholder="Last Name" style={inputStyle} />
            </div>
            <input type="email" placeholder="Email Address" style={inputStyle} />
            <textarea
              placeholder="Your Message"
              rows={5}
              style={{ ...inputStyle, resize: "none" }}
            />
            <button
              style={{
                background: tone.gradient,
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
                boxShadow: `0 4px 20px ${tone.primary}30`,
              }}
            >
              {buttonText} →
            </button>
          </div>
        </div>
        <div
          className="flex items-center justify-center gap-8 flex-wrap"
          style={{ marginTop: 28 }}
        >
          {email && (
            <span style={{ color: tone.muted, fontSize: 14, fontWeight: 500 }}>📧 {email}</span>
          )}
          {phone && (
            <span style={{ color: tone.muted, fontSize: 14, fontWeight: 500 }}>📞 {phone}</span>
          )}
          {address && (
            <span style={{ color: tone.muted, fontSize: 14, fontWeight: 500 }}>📍 {address}</span>
          )}
        </div>
      </div>
    </section>
  );
}
