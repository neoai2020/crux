"use client";

export default function TenXPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🚀</span>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">10x</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-8">
        Multiply your output by 10. Premium tools to scale your business faster than ever.
      </p>

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-6">
        <div className="text-center py-10">
          <span className="text-6xl block mb-4">🔒</span>
          <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            10x tools are available on the Premium plan. Upgrade to unlock AI-powered scaling, bulk generation, and advanced analytics.
          </p>
          <button className="btn-primary">
            Upgrade to Premium →
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-1">Bulk Website Generation</h3>
          <p className="text-sm text-gray-400">Generate up to 50 websites in a single batch.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Advanced Analytics</h3>
          <p className="text-sm text-gray-400">Deep insights into traffic, conversions, and revenue.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Priority Templates</h3>
          <p className="text-sm text-gray-400">Access exclusive high-converting template designs.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Custom Domains</h3>
          <p className="text-sm text-gray-400">Connect your own domain to any generated website.</p>
        </div>
      </div>
    </div>
  );
}
