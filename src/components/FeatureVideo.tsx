"use client";

interface FeatureVideoProps {
  title?: string;
  subtitle?: string;
  vimeoId?: string;
}

export default function FeatureVideo({
  title = "See How It Works",
  subtitle = "Watch this quick overview to get the most out of Crux.",
  vimeoId,
}: FeatureVideoProps) {
  if (!vimeoId) {
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

  return (
    <div className="card border-crux-500/20 overflow-hidden p-0">
      <div className="p-4 pb-3">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=0&background=0&title=0&byline=0&portrait=0&dnt=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}
