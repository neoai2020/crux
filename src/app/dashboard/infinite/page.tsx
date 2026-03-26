"use client";

import { Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { Infinity, Lock, Sparkles, Zap } from "lucide-react";
import WebsiteWizard from "@/components/WebsiteWizard";

function PremiumGate() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg shadow-crux-500/20">
          <Infinity size={22} className="text-white" />
        </div>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">Infinite</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-10">
        No limits. Unlimited generations, unlimited websites, unlimited growth.
      </p>

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-10 relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-pink/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-crux-500/5 rounded-full blur-3xl" />
        <div className="text-center py-14 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl">
            <Lock size={36} className="text-crux-400" />
          </div>
          <h2 className="text-3xl font-black mb-3 text-white">
            Unlock <span className="gradient-text">Infinite</span> Mode
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
            Upgrade to a premium plan to remove all daily limits. Generate as many websites as you want, whenever you want — with no restrictions on AI image generation.
          </p>
          <button className="btn-primary text-lg px-10 py-4 shadow-xl shadow-crux-500/20">
            Upgrade to Premium →
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {[
          { icon: <Infinity size={28} className="text-accent-pink" />, title: "Unlimited Generations", desc: "Create as many websites as you want every day — no caps, no cooldowns." },
          { icon: <Sparkles size={28} className="text-accent-cyan" />, title: "Unlimited AI Images", desc: "Generate and customize images with AI without hitting daily limits." },
          { icon: <Zap size={28} className="text-accent-green" />, title: "Priority Processing", desc: "Your AI requests are processed first for the fastest experience." },
        ].map((f) => (
          <div key={f.title} className="card text-center group">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4 border border-gray-700 shadow-lg group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h4 className="text-base font-black text-white mb-2">{f.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
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
          <p className="text-sm text-gray-400">AI Image Generations</p>
        </div>
      </div>
    </div>
  );
}

function InfiniteInner() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-crux-500" />
      </div>
    );
  }

  const isPremium = user.plan !== "Starter";

  if (!isPremium) {
    return <PremiumGate />;
  }

  return (
    <WebsiteWizard
      unlimited
      brandTitle="Infinite"
      brandDescription="No limits — create unlimited websites with AI-powered generation."
      basePath="/dashboard/infinite"
    />
  );
}

export default function InfinitePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-crux-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <InfiniteInner />
    </Suspense>
  );
}
