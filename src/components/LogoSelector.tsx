"use client";
import { useRef, useState, useEffect } from "react";
import { ToneDefinition } from "@/data/tones";

interface LogoSelectorProps {
  businessName: string;
  tone: ToneDefinition;
  selectedLogo: string;
  onSelect: (logoData: string) => void;
}

function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function hex2rgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function shiftHue(hex: string, degrees: number): string {
  const [r, g, b] = hex2rgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  if (max !== min) {
    const d = max - min;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  h = ((h * 360 + degrees) % 360) / 360;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const rr = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const gg = Math.round(hue2rgb(p, q, h) * 255);
  const bb = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  return `#${[rr, gg, bb].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/* ─── Logo style 1: Shield badge with initial ─── */
function logoShield(name: string, t: ToneDefinition): string {
  const ch = (name?.charAt(0) || "B").toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.primary}"/>
      <stop offset="100%" stop-color="${t.secondary}"/>
    </linearGradient>
  </defs>
  <path d="M60 8 L104 28 L104 60 Q104 96 60 114 Q16 96 16 60 L16 28 Z" fill="url(#sg)"/>
  <path d="M60 18 L94 34 L94 60 Q94 88 60 104 Q26 88 26 60 L26 34 Z" fill="white" opacity="0.15"/>
  <text x="60" y="66" text-anchor="middle" dominant-baseline="central"
    font-family="system-ui,sans-serif" font-weight="800" font-size="48" fill="white">${ch}</text>
</svg>`;
}

/* ─── Logo style 2: Overlapping circles with initial ─── */
function logoCircles(name: string, t: ToneDefinition): string {
  const ch = (name?.charAt(0) || "B").toUpperCase();
  const c2 = shiftHue(t.primary, 40);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <circle cx="48" cy="52" r="36" fill="${t.primary}" opacity="0.9"/>
  <circle cx="72" cy="52" r="36" fill="${c2}" opacity="0.7"/>
  <circle cx="60" cy="72" r="28" fill="${t.secondary}" opacity="0.6"/>
  <text x="60" y="60" text-anchor="middle" dominant-baseline="central"
    font-family="system-ui,sans-serif" font-weight="800" font-size="36" fill="white">${ch}</text>
</svg>`;
}

/* ─── Logo style 3: Hexagon with accent ring ─── */
function logoHexagon(name: string, t: ToneDefinition): string {
  const ch = (name?.charAt(0) || "B").toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.primary}"/>
      <stop offset="100%" stop-color="${t.secondary}"/>
    </linearGradient>
  </defs>
  <polygon points="60,6 108,30 108,78 60,102 12,78 12,30" fill="url(#hg)" stroke="${t.secondary}" stroke-width="3"/>
  <polygon points="60,18 96,36 96,72 60,90 24,72 24,36" fill="none" stroke="white" stroke-width="1.5" opacity="0.3"/>
  <text x="60" y="56" text-anchor="middle" dominant-baseline="central"
    font-family="system-ui,sans-serif" font-weight="800" font-size="40" fill="white">${ch}</text>
</svg>`;
}

/* ─── Logo style 4: Stacked bars wordmark ─── */
function logoModernMark(name: string, t: ToneDefinition): string {
  const text = name || "Brand";
  const w = Math.max(text.length * 20 + 80, 200);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 60" width="${w}" height="60">
  <defs>
    <linearGradient id="mg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.primary}"/>
      <stop offset="100%" stop-color="${t.secondary}"/>
    </linearGradient>
  </defs>
  <rect x="0" y="10" width="6" height="40" rx="3" fill="url(#mg)"/>
  <rect x="10" y="18" width="4" height="24" rx="2" fill="${t.secondary}" opacity="0.5"/>
  <text x="24" y="36" dominant-baseline="central"
    font-family="system-ui,sans-serif" font-weight="800" font-size="26" fill="${t.primary}">${text}</text>
  <circle cx="${w - 14}" cy="36" r="5" fill="${t.secondary}"/>
</svg>`;
}

/* ─── Logo style 5: Diamond with glow ─── */
function logoDiamond(name: string, t: ToneDefinition): string {
  const ch = (name?.charAt(0) || "B").toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.primary}"/>
      <stop offset="100%" stop-color="${t.secondary}"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect x="25" y="25" width="70" height="70" rx="8" fill="url(#dg)" transform="rotate(45 60 60)" filter="url(#glow)"/>
  <rect x="33" y="33" width="54" height="54" rx="6" fill="none" stroke="white" stroke-width="1.5" opacity="0.25" transform="rotate(45 60 60)"/>
  <text x="60" y="64" text-anchor="middle" dominant-baseline="central"
    font-family="system-ui,sans-serif" font-weight="800" font-size="38" fill="white">${ch}</text>
</svg>`;
}

/* ─── Logo style 6: Lettermark with circle backdrop ─── */
function logoLetterCircle(name: string, t: ToneDefinition): string {
  const ch = (name?.charAt(0) || "B").toUpperCase();
  const c2 = shiftHue(t.primary, -30);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="lcg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${t.primary}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="54" fill="url(#lcg)"/>
  <circle cx="60" cy="60" r="44" fill="none" stroke="white" stroke-width="2" opacity="0.2"/>
  <circle cx="60" cy="60" r="34" fill="none" stroke="white" stroke-width="1" opacity="0.1"/>
  <text x="60" y="64" text-anchor="middle" dominant-baseline="central"
    font-family="system-ui,sans-serif" font-weight="900" font-size="50" fill="white" letter-spacing="-2">${ch}</text>
</svg>`;
}

type LogoGenerator = (name: string, tone: ToneDefinition) => string;

const LOGO_GENERATORS: { id: string; label: string; fn: LogoGenerator }[] = [
  { id: "shield", label: "Shield", fn: logoShield },
  { id: "circles", label: "Fusion", fn: logoCircles },
  { id: "hexagon", label: "Hexagon", fn: logoHexagon },
  { id: "modern", label: "Modern", fn: logoModernMark },
  { id: "diamond", label: "Diamond", fn: logoDiamond },
  { id: "letter", label: "Classic", fn: logoLetterCircle },
];

export default function LogoSelector({ businessName, tone, selectedLogo, onSelect }: LogoSelectorProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const logos = LOGO_GENERATORS.map((g) => ({
    ...g,
    svg: g.fn(businessName, tone),
  })).map((g) => ({
    ...g,
    url: svgToDataUrl(g.svg),
  }));

  useEffect(() => {
    if (!selectedLogo && logos.length > 0) {
      onSelect(logos[0].url);
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {logos.map((opt) => {
          const isActive = selectedLogo === opt.url;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.url)}
              className="flex flex-col items-center gap-2 p-3 transition-all"
              style={{
                border: isActive ? `2px solid ${tone.primary}` : `2px solid transparent`,
                borderRadius: tone.radius,
                backgroundColor: isActive ? tone.surface : "rgba(255,255,255,0.03)",
                cursor: "pointer",
              }}
            >
              <div className="flex items-center justify-center" style={{ height: 64, width: "100%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={opt.url} alt={opt.label} style={{ maxHeight: 64, maxWidth: "100%" }} />
              </div>
              <span style={{ fontSize: 11, color: tone.muted, fontWeight: 500 }}>
                {opt.label}
              </span>
            </button>
          );
        })}
        <button
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center gap-2 p-3 transition-all"
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
              height: 64,
              width: "100%",
              border: `2px dashed ${tone.border}`,
              borderRadius: tone.radius,
            }}
          >
            {uploadPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={uploadPreview} alt="Uploaded" style={{ maxHeight: 60, maxWidth: "100%" }} />
            ) : (
              <span style={{ fontSize: 24, color: tone.muted }}>+</span>
            )}
          </div>
          <span style={{ fontSize: 11, color: tone.muted, fontWeight: 500 }}>
            Upload
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
