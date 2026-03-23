"use client";

interface FeatureVideoProps {
  title?: string;
  subtitle?: string;
}

export default function FeatureVideo({
  title = "See How It Works",
  subtitle = "Watch this quick overview to get the most out of Crux.",
}: FeatureVideoProps) {
  return (
    <div className="card border-crux-500/20 overflow-hidden p-4">
      <div className="flex items-center gap-4">
        <div className="w-28 h-16 shrink-0 rounded-lg overflow-hidden bg-black/30 border border-gray-800/50 flex items-center justify-center">
          <span className="text-2xl">🎬</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold truncate">{title}</h3>
          <p className="text-xs text-gray-400 truncate">{subtitle}</p>
          <span className="text-[10px] text-gray-600 mt-0.5 block">Video coming soon</span>
        </div>
      </div>
    </div>
  );
}
