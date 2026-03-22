"use client";
import { useRef, useState } from "react";
import { ToneDefinition } from "@/data/tones";

interface LogoSelectorProps {
  businessName: string;
  tone: ToneDefinition;
  selectedLogo: string;
  onSelect: (logoData: string) => void;
}

function generateInitialLogo(businessName: string, tone: ToneDefinition): string {
  const initial = (businessName?.charAt(0) || "B").toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${tone.primary}" />
        <stop offset="100%" style="stop-color:${tone.secondary}" />
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="24" fill="url(#grad1)" />
    <text x="60" y="60" text-anchor="middle" dominant-baseline="central"
      font-family="${tone.headingFont.replace(/'/g, "")}"
      font-weight="800" font-size="56" fill="white">${initial}</text>
  </svg>`;
}

function generateWordmarkLogo(businessName: string, tone: ToneDefinition): string {
  const name = businessName || "Brand";
  const charWidth = 24;
  const width = Math.max(name.length * charWidth + 40, 160);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="60" viewBox="0 0 ${width} 60">
    <rect width="${width}" height="60" rx="8" fill="${tone.bg}" stroke="${tone.border}" stroke-width="1"/>
    <text x="${width / 2}" y="32" text-anchor="middle" dominant-baseline="central"
      font-family="${tone.headingFont.replace(/'/g, "")}"
      font-weight="700" font-size="22" fill="${tone.primary}">${name}</text>
  </svg>`;
}

function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

export default function LogoSelector({ businessName, tone, selectedLogo, onSelect }: LogoSelectorProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const initialSvg = generateInitialLogo(businessName, tone);
  const wordmarkSvg = generateWordmarkLogo(businessName, tone);
  const initialUrl = svgToDataUrl(initialSvg);
  const wordmarkUrl = svgToDataUrl(wordmarkSvg);

  const options = [
    { id: "initial", label: "Icon Logo", url: initialUrl, svg: initialSvg },
    { id: "wordmark", label: "Wordmark", url: wordmarkUrl, svg: wordmarkSvg },
  ];

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadPreview(result);
      onSelect(result);
    };
    reader.readAsDataURL(file);
  }

  const isUploadSelected = selectedLogo === uploadPreview && uploadPreview !== null;

  return (
    <div>
      <p style={{ color: tone.text, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
        Choose a Logo
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isActive = selectedLogo === svgToDataUrl(opt.svg);
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(svgToDataUrl(opt.svg))}
              className="flex flex-col items-center gap-2 p-4 transition-all"
              style={{
                border: isActive ? `2px solid ${tone.primary}` : `2px solid transparent`,
                borderRadius: tone.radius,
                backgroundColor: isActive ? tone.surface : "rgba(255,255,255,0.03)",
                cursor: "pointer",
                background: isActive ? tone.surface : "transparent",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{ height: 60, width: "100%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={opt.url} alt={opt.label} style={{ maxHeight: 60, maxWidth: "100%" }} />
              </div>
              <span style={{ fontSize: 12, color: tone.muted, fontWeight: 500 }}>
                {opt.label}
              </span>
            </button>
          );
        })}
        <button
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center gap-2 p-4 transition-all"
          style={{
            border: isUploadSelected ? `2px solid ${tone.primary}` : `2px solid transparent`,
            borderRadius: tone.radius,
            backgroundColor: isUploadSelected ? tone.surface : "rgba(255,255,255,0.03)",
            cursor: "pointer",
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              height: 60,
              width: "100%",
              border: `2px dashed ${tone.border}`,
              borderRadius: tone.radius,
            }}
          >
            {uploadPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={uploadPreview} alt="Uploaded" style={{ maxHeight: 56, maxWidth: "100%" }} />
            ) : (
              <span style={{ fontSize: 24, color: tone.muted }}>+</span>
            )}
          </div>
          <span style={{ fontSize: 12, color: tone.muted, fontWeight: 500 }}>
            Upload Your Own
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </button>
      </div>
    </div>
  );
}
