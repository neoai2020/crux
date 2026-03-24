"use client";
import FeatureVideo from "@/components/FeatureVideo";
import { Rocket, Lock, Monitor, BarChart3, Layout, Globe } from "lucide-react";

export default function TenXPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg shadow-crux-500/20">
          <Rocket size={20} className="text-white" />
        </div>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">10x</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-8">
        Multiply your output by 10. Premium tools to scale your business faster than ever.
      </p>

      <div className="mb-6">
        <FeatureVideo
          title="10x Your Business"
          subtitle="See how 10x tools can multiply your output overnight."
        />
      </div>

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="text-center py-10 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4 border border-gray-700 shadow-xl">
            <Lock size={32} className="text-crux-400" />
          </div>
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
        <div className="card border-gray-800/50 hover:border-crux-500/30 transition-all bg-gray-900/40 p-5 group">
          <div className="w-10 h-10 rounded-lg bg-crux-500/10 flex items-center justify-center mb-4 text-crux-400 group-hover:bg-crux-500/20 transition-colors">
            <Monitor size={20} />
          </div>
          <h3 className="font-bold mb-1 text-white">Bulk Website Generation</h3>
          <p className="text-sm text-gray-400">Generate up to 50 websites in a single batch.</p>
        </div>
        <div className="card border-gray-800/50 hover:border-crux-500/30 transition-all bg-gray-900/40 p-5 group">
          <div className="w-10 h-10 rounded-lg bg-accent-pink/10 flex items-center justify-center mb-4 text-accent-pink group-hover:bg-accent-pink/20 transition-colors">
            <BarChart3 size={20} />
          </div>
          <h3 className="font-bold mb-1 text-white">Advanced Analytics</h3>
          <p className="text-sm text-gray-400">Deep insights into traffic, conversions, and revenue.</p>
        </div>
        <div className="card border-gray-800/50 hover:border-crux-500/30 transition-all bg-gray-900/40 p-5 group">
          <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center mb-4 text-accent-green group-hover:bg-accent-green/20 transition-colors">
            <Layout size={20} />
          </div>
          <h3 className="font-bold mb-1 text-white">Priority Templates</h3>
          <p className="text-sm text-gray-400">Access exclusive high-converting template designs.</p>
        </div>
        <div className="card border-gray-800/50 hover:border-crux-500/30 transition-all bg-gray-900/40 p-5 group">
          <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4 text-accent-cyan group-hover:bg-accent-cyan/20 transition-colors">
            <Globe size={20} />
          </div>
          <h3 className="font-bold mb-1 text-white">Custom Domains</h3>
          <p className="text-sm text-gray-400">Connect your own domain to any generated website.</p>
        </div>
      </div>
    </div>
  );
}
