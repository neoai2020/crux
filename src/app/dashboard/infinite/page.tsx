"use client";

export default function InfinitePage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">♾️</span>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">Infinite</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-8">
        No limits. Unlimited generations, unlimited websites, unlimited growth.
      </p>

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-6">
        <div className="text-center py-10">
          <span className="text-6xl block mb-4">🔒</span>
          <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Infinite plan removes all daily limits. Generate as many websites as you want, whenever you want.
          </p>
          <button className="btn-primary">
            Upgrade to Premium →
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-black gradient-text mb-1">∞</p>
          <p className="text-sm text-gray-400">Daily Generations</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black gradient-text mb-1">∞</p>
          <p className="text-sm text-gray-400">Active Websites</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black gradient-text mb-1">∞</p>
          <p className="text-sm text-gray-400">Marketing Messages</p>
        </div>
      </div>
    </div>
  );
}
