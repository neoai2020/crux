"use client";

import { useState } from "react";
import type { SectionProps } from "@/data/sections";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "FAQ";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as FaqItem[]) || [];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
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
              color: tone.text,
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 12,
            }}
          >
            {sectionTitle}
          </h2>
          {subtitle && (
            <p style={{ color: tone.muted, fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: tone.surface,
                  borderRadius: tone.radius,
                  border: isOpen ? `1px solid ${tone.primary}40` : `1px solid ${tone.border}`,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: tone.headingFont,
                      fontWeight: 700,
                      fontSize: 16,
                      color: isOpen ? tone.primary : tone.text,
                      transition: "color 0.2s",
                      margin: 0,
                    }}
                  >
                    {item.question}
                  </h3>
                  <span
                    style={{
                      color: isOpen ? tone.primary : tone.muted,
                      fontSize: 22,
                      fontWeight: 300,
                      flexShrink: 0,
                      marginLeft: 16,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.25s, color 0.2s",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 300 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      color: tone.muted,
                      fontSize: 15,
                      lineHeight: 1.7,
                      padding: "0 24px 20px",
                      margin: 0,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FaqTwoColumn({ tone, content }: SectionProps) {
  const sectionTitle = (content.sectionTitle as string) || "FAQ";
  const subtitle = (content.subtitle as string) || "";
  const items = (content.items as FaqItem[]) || [];

  return (
    <section
      style={{ backgroundColor: tone.bg, fontFamily: tone.bodyFont }}
      className="py-20 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
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
              color: tone.text,
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 12,
            }}
          >
            {sectionTitle}
          </h2>
          {subtitle && (
            <p style={{ color: tone.muted, fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tone.surface,
                borderRadius: tone.radius,
                padding: "24px 28px",
                border: `1px solid ${tone.border}`,
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  style={{
                    background: tone.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 800,
                    fontSize: 18,
                    flexShrink: 0,
                    fontFamily: tone.headingFont,
                  }}
                >
                  Q
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: tone.headingFont,
                      fontWeight: 700,
                      fontSize: 16,
                      color: tone.text,
                      marginBottom: 8,
                    }}
                  >
                    {item.question}
                  </h3>
                  <p
                    style={{
                      color: tone.muted,
                      fontSize: 15,
                      lineHeight: 1.7,
                      fontFamily: tone.bodyFont,
                      margin: 0,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
