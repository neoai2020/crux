"use client";
import FeatureVideo from "@/components/FeatureVideo";

export default function DFYPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🔧</span>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">Done For You</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-8">
        Sit back and relax. Our team builds, launches, and optimizes everything for you.
      </p>

      <div className="mb-6">
        <FeatureVideo
          title="Done For You"
          subtitle="Watch how we handle everything from start to finish."
        />
      </div>

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-6">
        <div className="text-center py-10">
          <span className="text-6xl block mb-4">🔒</span>
          <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Our DFY service handles everything end-to-end — website setup, copy, design, SEO, and launch. Upgrade to get started.
          </p>
          <button className="btn-primary">
            Upgrade to Premium →
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-1">Full Website Build</h3>
          <p className="text-sm text-gray-400">We design, write, and launch your entire website for you.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Copywriting</h3>
          <p className="text-sm text-gray-400">Professional conversion-focused copy written by experts.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">SEO Setup</h3>
          <p className="text-sm text-gray-400">On-page SEO, meta tags, sitemap, and speed optimization.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Launch & Handoff</h3>
          <p className="text-sm text-gray-400">We deploy, test, and hand you the keys to a live site.</p>
        </div>
      </div>
    </div>
  );
}
