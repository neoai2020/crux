"use client";
import { useRef, useState, useEffect } from "react";
import { getRemainingImageGenerations } from "@/lib/images";

interface ImageEditorProps {
  value: string;
  onChange: (dataUrl: string) => void;
  userId: string;
  autoPrompt: string;
  gradient: string;
  radius: string;
  aspectRatio?: string;
  height?: number;
}

export default function ImageEditor({
  value,
  onChange,
  userId,
  autoPrompt,
  gradient,
  radius,
  aspectRatio = "4/3",
  height,
}: ImageEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [generating, setGenerating] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [prompt, setPrompt] = useState(autoPrompt);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPrompt(autoPrompt);
  }, [autoPrompt]);

  useEffect(() => {
    let cancelled = false;
    getRemainingImageGenerations(userId).then((r) => {
      if (!cancelled) setRemaining(r);
    });
    return () => { cancelled = true; };
  }, [userId]);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), userId }),
      });
      if (res.status === 429) {
        setError("Daily limit reached (5/day)");
        setGenerating(false);
        return;
      }
      if (!res.ok) {
        setError("Generation failed. Try again.");
        setGenerating(false);
        return;
      }
      const data = await res.json();
      onChange(data.image);
      if (data.remaining !== undefined) setRemaining(data.remaining);
    } catch {
      setError("Connection error. Try again.");
    }
    setGenerating(false);
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleRemove() {
    onChange("");
  }

  const containerStyle: React.CSSProperties = {
    borderRadius: radius,
    overflow: "hidden",
    position: "relative",
    ...(height ? { height } : { aspectRatio }),
  };

  return (
    <div>
      <div style={containerStyle} className="group">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 28, opacity: 0.5 }}>📷</span>
          </div>
        )}

        {generating && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span style={{ color: "white", fontSize: 12, fontWeight: 500 }}>
              Generating...
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <button
          type="button"
          onClick={() => setShowPrompt(!showPrompt)}
          disabled={generating}
          className="text-xs px-3 py-1.5 rounded-lg bg-crux-500/20 text-crux-300 hover:bg-crux-500/30 transition disabled:opacity-50 flex items-center gap-1"
        >
          ✨ Generate
          {remaining !== null && (
            <span className="opacity-60">({remaining}/5)</span>
          )}
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={generating}
          className="text-xs px-3 py-1.5 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition disabled:opacity-50"
        >
          📁 Upload
        </button>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={generating}
            className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition disabled:opacity-50"
          >
            ✕ Remove
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {showPrompt && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input-field text-xs flex-1"
            placeholder="Describe the image you want..."
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating || !prompt.trim() || remaining === 0}
            className="text-xs px-4 py-1.5 rounded-lg bg-crux-500 text-white hover:bg-crux-600 transition disabled:opacity-50 whitespace-nowrap"
          >
            {generating ? "..." : "Go"}
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
