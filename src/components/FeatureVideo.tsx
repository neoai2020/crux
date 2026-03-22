"use client";
import { useEffect, useRef } from "react";

interface FeatureVideoProps {
  title?: string;
  subtitle?: string;
}

export default function FeatureVideo({
  title = "See How It Works",
  subtitle = "Watch this quick overview to get the most out of Crux.",
}: FeatureVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.querySelector("vturb-smartplayer")) return;

    const player = document.createElement("vturb-smartplayer");
    player.id = "vid-69c04105d54d8d20f109e679";
    player.setAttribute(
      "style",
      "display:block;margin:0 auto;width:100%;max-width:800px;"
    );
    containerRef.current.appendChild(player);

    const existing = document.querySelector(
      'script[src*="69c04105d54d8d20f109e679"]'
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src =
        "https://scripts.converteai.net/e9cd97bc-7bc8-4a23-bb2f-224a56a84d6b/players/69c04105d54d8d20f109e679/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div className="card border-crux-500/20 overflow-hidden">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <div
        ref={containerRef}
        className="rounded-xl overflow-hidden bg-black/30"
      />
    </div>
  );
}
