"use client";
import FeatureVideo from "@/components/FeatureVideo";

export default function AutomationPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">⚡</span>
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

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-6">
        <div className="text-center py-10">
          <span className="text-6xl block mb-4">🔒</span>
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
        <div className="card">
          <h3 className="font-bold mb-1">Auto Social Posting</h3>
          <p className="text-sm text-gray-400">Schedule and auto-publish to all your social channels.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Email Sequences</h3>
          <p className="text-sm text-gray-400">Automated drip campaigns that nurture leads on autopilot.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Content Refresh</h3>
          <p className="text-sm text-gray-400">AI auto-updates your site content to stay fresh and relevant.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Lead Capture Flows</h3>
          <p className="text-sm text-gray-400">Smart popups and forms that trigger based on visitor behavior.</p>
        </div>
      </div>
    </div>
  );
}
