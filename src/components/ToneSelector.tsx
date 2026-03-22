"use client";
import { TONES, ToneDefinition } from "@/data/tones";

interface ToneSelectorProps {
  selectedToneId: string;
  onSelect: (tone: ToneDefinition) => void;
}

export default function ToneSelector({ selectedToneId, onSelect }: ToneSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {TONES.map((tone) => {
        const isActive = tone.id === selectedToneId;
        return (
          <button
            key={tone.id}
            onClick={() => onSelect(tone)}
            className="text-left transition-all duration-200"
            style={{
              border: isActive ? `2px solid ${tone.primary}` : "2px solid transparent",
              borderRadius: "16px",
              padding: "12px",
              backgroundColor: isActive ? "rgba(124, 58, 237, 0.08)" : "rgba(255,255,255,0.03)",
            }}
          >
            {/* Color swatches */}
            <div className="flex gap-1.5 mb-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: tone.primary }} />
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: tone.secondary }} />
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: tone.bg, border: `1px solid ${tone.border}` }} />
            </div>
            {/* Mini preview */}
            <div
              className="rounded-lg overflow-hidden mb-2.5"
              style={{ backgroundColor: tone.bg, border: `1px solid ${tone.border}`, height: 48 }}
            >
              <div className="h-2" style={{ background: tone.gradient }} />
              <div className="px-2 pt-1.5">
                <div className="h-1.5 rounded-full w-3/4 mb-1" style={{ backgroundColor: tone.text, opacity: 0.2 }} />
                <div className="h-1 rounded-full w-1/2" style={{ backgroundColor: tone.muted, opacity: 0.15 }} />
              </div>
            </div>
            {/* Name */}
            <p className="text-sm font-bold text-white">{tone.name}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{tone.description}</p>
            {/* Active indicator */}
            {isActive && (
              <div className="mt-2 text-xs font-medium" style={{ color: tone.primary }}>
                Selected
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
