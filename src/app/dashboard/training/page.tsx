"use client";
import { useState } from "react";
import {
  PlayCircle,
  MessageCircleQuestion,
  Crown,
  Play,
  X,
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
  const [playingId, setPlayingId] = useState<string | null>(null);

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
        <div className="w-full space-y-4">
          {/* Active player */}
          {playingId && (
            <div className="card p-0 overflow-hidden border-crux-500/30 mb-2">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  key={playingId}
                  src={`https://player.vimeo.com/video/${playingId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {TRAINING_VIDEOS.find((v) => v.vimeoId === playingId)?.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {TRAINING_VIDEOS.find((v) => v.vimeoId === playingId)?.description}
                  </p>
                </div>
                <button
                  onClick={() => setPlayingId(null)}
                  className="shrink-0 ml-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Video list */}
          <div className="grid gap-3">
            {TRAINING_VIDEOS.map((vid, idx) => {
              const isPlaying = playingId === vid.vimeoId;
              return (
                <button
                  key={vid.vimeoId}
                  onClick={() => setPlayingId(isPlaying ? null : vid.vimeoId)}
                  className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    isPlaying
                      ? "bg-crux-500/10 border-crux-500/30"
                      : "bg-gray-900/40 border-gray-800/50 hover:border-gray-700 hover:bg-gray-900/60"
                  }`}
                >
                  {/* Number + play icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isPlaying
                      ? "bg-crux-500/20 text-crux-400"
                      : "bg-gray-800/60 text-gray-500 group-hover:text-white"
                  }`}>
                    {isPlaying ? (
                      <div className="w-3 h-3 rounded-sm bg-crux-400" />
                    ) : (
                      <Play size={16} className="ml-0.5" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-gray-600">{String(idx + 1).padStart(2, "0")}</span>
                      <h3 className={`text-sm font-bold truncate ${isPlaying ? "text-crux-300" : "text-white"}`}>
                        {vid.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{vid.description}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 shrink-0">
                    {vid.premium && (
                      <span className="flex items-center gap-1 text-[9px] font-bold bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-wider">
                        <Crown size={9} className="fill-amber-400" /> Premium
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-gray-600 bg-gray-800/60 px-2 py-0.5 rounded-full">
                      {vid.duration}
                    </span>
                  </div>
                </button>
              );
            })}
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
