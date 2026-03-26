"use client";
import { useState } from "react";
import {
  PlayCircle,
  MessageCircleQuestion,
  Crown,
} from "lucide-react";
import FaqSection from "@/components/FaqSection";

interface TrainingVideo {
  title: string;
  description: string;
  vimeoId: string;
  duration: string;
  premium?: boolean;
}

const TRAINING_VIDEOS: TrainingVideo[] = [
  {
    title: "Getting Started with Crux",
    description: "A complete walkthrough of the Crux platform — from sign-in to your first published website.",
    vimeoId: "1177422137",
    duration: "5 min",
  },
  {
    title: "Web Wizard Masterclass",
    description: "Master the Web Wizard — learn how to create stunning, high-converting websites step by step.",
    vimeoId: "1177422984",
    duration: "8 min",
  },
  {
    title: "My Websites — Manage Your Empire",
    description: "Organize, preview, and manage all your generated websites from one powerful dashboard.",
    vimeoId: "1177423011",
    duration: "5 min",
  },
  {
    title: "Traffic Magnet — AI Marketing Engine",
    description: "Generate scroll-stopping marketing messages with AI to drive traffic to every site you build.",
    vimeoId: "1177433708",
    duration: "6 min",
  },
  {
    title: "10X Facebook Post Generator",
    description: "Turn one link into 10 high-converting Facebook posts, ready to copy and publish instantly.",
    vimeoId: "1177452332",
    duration: "5 min",
    premium: true,
  },
  {
    title: "Automation Hub — Your Free Traffic Empire",
    description: "Unlock 60+ free traffic sources across every profitable niche with step-by-step playbooks.",
    vimeoId: "1177452411",
    duration: "7 min",
    premium: true,
  },
  {
    title: "Infinite Mode — Unlimited Creation",
    description: "Build unlimited websites with no caps, plus clone and translate them into any language.",
    vimeoId: "1177462152",
    duration: "6 min",
    premium: true,
  },
  {
    title: "DFY — Done For You Websites",
    description: "Browse and claim from a library of premium, ready-made websites — each with 200 SEO posts.",
    vimeoId: "1177466083",
    duration: "7 min",
    premium: true,
  },
];

type Tab = "videos" | "faq";

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("videos");

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "videos", label: "Video Library", icon: <PlayCircle size={16} /> },
    { id: "faq", label: "FAQ", icon: <MessageCircleQuestion size={16} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20 flex flex-col items-center">
      <div className="w-full text-center mb-6">
        <h1 className="text-3xl font-black mb-2">
          <span className="gradient-text uppercase tracking-tight">Training Hub</span>
        </h1>
        <p className="text-gray-400 italic">
          Master the art of online business with our expert-led modules. From first site to five-figure months.
        </p>
      </div>

      {/* Tabs */}
      <div className="w-full flex items-center gap-1 p-1 bg-gray-900/60 rounded-xl border border-gray-800/50 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === tab.id
                ? "bg-crux-500/20 text-crux-300 border border-crux-500/30 shadow-lg shadow-crux-500/10"
                : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/40 border border-transparent"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========== VIDEO LIBRARY TAB ========== */}
      {activeTab === "videos" && (
        <div className="w-full space-y-6">
          {TRAINING_VIDEOS.length > 0 ? (
            <div className="grid gap-5">
              {TRAINING_VIDEOS.map((vid) => (
                <div
                  key={vid.vimeoId}
                  className="card p-0 overflow-hidden border-gray-800/50 hover:border-crux-500/30 transition-all"
                >
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={`https://player.vimeo.com/video/${vid.vimeoId}?autoplay=0&title=0&byline=0&portrait=0&dnt=1`}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      style={{ border: 0 }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-lg font-black text-white">{vid.title}</h3>
                      <span className="text-[10px] font-black bg-crux-500/20 text-crux-400 px-2 py-0.5 rounded-full border border-crux-500/30 uppercase tracking-widest">
                        {vid.duration}
                      </span>
                      {vid.premium && (
                        <span className="flex items-center gap-1 text-[10px] font-black bg-amber-500/15 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest">
                          <Crown size={10} className="fill-amber-400" /> Premium
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{vid.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card border-dashed border-gray-700 text-center py-16">
              <PlayCircle size={48} className="mx-auto text-gray-700 mb-4" />
              <h3 className="text-lg font-bold text-gray-400 mb-1">Video Library</h3>
              <p className="text-sm text-gray-600">Training videos will appear here as they become available.</p>
            </div>
          )}

          <div className="card border-dashed border-gray-700/50 text-center py-10">
            <p className="text-sm text-gray-600 font-medium">More training videos coming soon...</p>
          </div>
        </div>
      )}

      {/* ========== FAQ TAB ========== */}
      {activeTab === "faq" && (
        <div className="w-full">
          <FaqSection />
        </div>
      )}
    </div>
  );
}
