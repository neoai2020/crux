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
    <div className="card border-crux-500/20 overflow-hidden">
      <div className="text-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{subtitle}</p>
      </div>
      <div className="rounded-xl overflow-hidden bg-black/30 aspect-video flex items-center justify-center border border-gray-800/50">
        <div className="text-center text-gray-500">
          <span className="text-4xl block mb-2">🎬</span>
          <p className="text-sm font-medium">Video coming soon</p>
        </div>
      </div>
    </div>
  );
}
