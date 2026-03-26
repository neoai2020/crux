"use client";

import {
  Lock,
  Rocket,
  Zap,
  Infinity,
  Hammer,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const FEATURE_INFO: Record<
  string,
  {
    label: string;
    icon: React.ReactNode;
    description: string;
    highlights: string[];
  }
> = {
  "10x": {
    label: "10x Post Generator",
    icon: <Rocket size={28} className="text-accent-pink" />,
    description:
      "Generate 10 high-converting social media posts from a single link.",
    highlights: [
      "10 unique post angles per link",
      "Copy-paste ready for Facebook, Instagram & more",
      "Viral hooks, storytelling, and CTA templates",
    ],
  },
  automation: {
    label: "Automation Hub",
    icon: <Zap size={28} className="text-accent-cyan" />,
    description:
      "Access 70+ curated free-traffic sources with step-by-step guides.",
    highlights: [
      "70+ traffic sources across 7 niches",
      "Step-by-step posting instructions",
      "Engagement snippets ready to use",
    ],
  },
  infinite: {
    label: "Infinite Mode",
    icon: <Infinity size={28} className="text-crux-400" />,
    description:
      "Remove all daily limits — unlimited generations, images & translations.",
    highlights: [
      "Unlimited website generations",
      "Unlimited AI image generation",
      "Clone & translate to 25+ languages",
    ],
  },
  dfy: {
    label: "Done For You Websites",
    icon: <Hammer size={28} className="text-accent-green" />,
    description:
      "180 professionally designed websites ready to claim and go live.",
    highlights: [
      "180 unique websites across 9 niches",
      "Preview before claiming",
      "Go live instantly — no setup required",
    ],
  },
};

export default function PremiumGate({ feature }: { feature: string }) {
  const info = FEATURE_INFO[feature];
  if (!info) return null;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg shadow-crux-500/20">
          {info.icon}
        </div>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">{info.label}</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-10">{info.description}</p>

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-10 relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-pink/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-crux-500/5 rounded-full blur-3xl" />
        <div className="text-center py-14 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl">
            <Lock size={36} className="text-crux-400" />
          </div>
          <h2 className="text-3xl font-black mb-3 text-white">
            This Feature is <span className="gradient-text">Locked</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
            You don&apos;t have access to{" "}
            <span className="text-white font-bold">{info.label}</span> yet.
            Contact support to get your activation link and unlock this feature
            instantly.
          </p>
          <Link
            href="/dashboard/support"
            className="btn-primary text-lg px-10 py-4 shadow-xl shadow-crux-500/20 inline-flex items-center gap-2"
          >
            <MessageCircle size={20} /> Contact Support
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {info.highlights.map((h, i) => (
          <div key={i} className="card text-center group">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-3 border border-gray-700 text-lg font-black text-crux-400 group-hover:scale-110 transition-transform">
              {i + 1}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{h}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
