"use client";
import { ToneDefinition } from "@/data/tones";
import { SectionType, generateDefaultContent } from "@/data/sections";
import { BlueprintSection } from "@/data/blueprints";
import SectionRenderer from "./SectionRenderer";

interface WebsitePreviewProps {
  sections: BlueprintSection[];
  tone: ToneDefinition;
  businessName: string;
  category: string;
  description?: string;
  sectionContents?: Record<string, Record<string, unknown>>;
  scale?: number;
  maxHeight?: string;
  showChrome?: boolean;
}

export default function WebsitePreview({
  sections,
  tone,
  businessName,
  category,
  description = "",
  sectionContents,
  scale = 1,
  maxHeight = "600px",
  showChrome = true,
}: WebsitePreviewProps) {
  const slug = businessName?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "your-site";

  function getContent(sectionType: SectionType, index: number): Record<string, unknown> {
    const key = `${sectionType}-${index}`;
    if (sectionContents?.[key]) return sectionContents[key];
    return generateDefaultContent(sectionType, businessName, description, category);
  }

  const inner = (
    <div style={{ fontFamily: tone.bodyFont }}>
      {/* Load Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href={tone.fontImport} />
      {sections.map((section, idx) => (
        <SectionRenderer
          key={`${section.type}-${section.variant}-${idx}`}
          sectionType={section.type}
          variant={section.variant}
          tone={tone}
          content={getContent(section.type, idx)}
          businessName={businessName}
        />
      ))}
    </div>
  );

  if (!showChrome) {
    return (
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: scale !== 1 ? `${100 / scale}%` : "100%",
        }}
      >
        {inner}
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${tone.border || "#e5e7eb"}` }}>
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ backgroundColor: "#1e1e2e", borderBottom: "1px solid #2a2a3e" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 bg-[#2a2a3e] rounded-lg px-3 py-1 text-xs text-gray-400 truncate font-mono">
          crux.site/{slug}
        </div>
      </div>
      {/* Scrollable content */}
      <div
        className="overflow-y-auto overflow-x-hidden"
        style={{ maxHeight, backgroundColor: tone.bg }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: scale !== 1 ? `${100 / scale}%` : "100%",
          }}
        >
          {inner}
        </div>
      </div>
    </div>
  );
}
