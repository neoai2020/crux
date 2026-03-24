"use client";
import FeatureVideo from "@/components/FeatureVideo";
import { Zap, Lock, Share2, Mail, RefreshCcw, MousePointerClick } from "lucide-react";

export default function AutomationPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-green to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-green/20">
          <Zap size={20} className="text-white" />
        </div>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">Automation</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-8">
        Set it and forget it. Automate your marketing, content updates, and lead capture.
      </p>

      <div className="mb-6">
        <FeatureVideo
          title="Automation in Action"
          subtitle="Watch how automation puts your business on autopilot."
        />
      </div>

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="text-center py-10 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4 border border-gray-700 shadow-xl">
            <Lock size={32} className="text-accent-green" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Automation workflows are available on the Premium plan. Upgrade to set up auto-posting, scheduled updates, and lead funnels.
          </p>
          <button className="btn-primary">
            Upgrade to Premium →
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card border-gray-800/50 hover:border-accent-green/30 transition-all bg-gray-900/40 p-5 group">
          <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center mb-4 text-accent-green group-hover:bg-accent-green/20 transition-colors">
            <Share2 size={20} />
          </div>
          <h3 className="font-bold mb-1 text-white">Auto Social Posting</h3>
          <p className="text-sm text-gray-400">Schedule and auto-publish to all your social channels.</p>
        </div>
        <div className="card border-gray-800/50 hover:border-accent-green/30 transition-all bg-gray-900/40 p-5 group">
          <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4 text-accent-cyan group-hover:bg-accent-cyan/20 transition-colors">
            <Mail size={20} />
          </div>
          <h3 className="font-bold mb-1 text-white">Email Sequences</h3>
          <p className="text-sm text-gray-400">Automated drip campaigns that nurture leads on autopilot.</p>
        </div>
        <div className="card border-gray-800/50 hover:border-accent-green/30 transition-all bg-gray-900/40 p-5 group">
          <div className="w-10 h-10 rounded-lg bg-crux-500/10 flex items-center justify-center mb-4 text-crux-400 group-hover:bg-crux-500/20 transition-colors">
            <RefreshCcw size={20} />
          </div>
          <h3 className="font-bold mb-1 text-white">Content Refresh</h3>
          <p className="text-sm text-gray-400">AI auto-updates your site content to stay fresh and relevant.</p>
        </div>
        <div className="card border-gray-800/50 hover:border-accent-green/30 transition-all bg-gray-900/40 p-5 group">
          <div className="w-10 h-10 rounded-lg bg-accent-pink/10 flex items-center justify-center mb-4 text-accent-pink group-hover:bg-accent-pink/20 transition-colors">
            <MousePointerClick size={20} />
          </div>
          <h3 className="font-bold mb-1 text-white">Lead Capture Flows</h3>
          <p className="text-sm text-gray-400">Smart popups and forms that trigger based on visitor behavior.</p>
        </div>
      </div>
    </div>
  );
}
