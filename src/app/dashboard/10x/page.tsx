"use client";
import { useState } from "react";
import { Rocket, Monitor, BarChart3, Layout, Globe, Zap, TrendingUp, Target, Layers, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const TOOLS = [
  {
    icon: Monitor,
    title: "Bulk Website Generation",
    desc: "Generate up to 50 websites in a single batch with AI-powered content.",
    color: "crux",
    stats: { label: "Sites Generated", value: "0", max: "50" },
    features: ["AI-generated unique content per site", "Auto-assign niches and templates", "Batch export and publish", "Smart keyword targeting per site"],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "Deep insights into traffic, conversions, and revenue across all your sites.",
    color: "pink",
    stats: { label: "Total Views", value: "0", max: "∞" },
    features: ["Real-time visitor tracking", "Conversion rate optimization", "Revenue per site breakdown", "Traffic source analytics"],
  },
  {
    icon: Layout,
    title: "Priority Templates",
    desc: "Access exclusive high-converting template designs built for maximum ROI.",
    color: "green",
    stats: { label: "Templates Available", value: "25", max: "25" },
    features: ["Conversion-optimized layouts", "Industry-specific designs", "A/B tested for performance", "Mobile-first responsive"],
  },
  {
    icon: Globe,
    title: "Custom Domains",
    desc: "Connect your own domain to any generated website for a professional look.",
    color: "cyan",
    stats: { label: "Domains Connected", value: "0", max: "∞" },
    features: ["One-click domain connection", "Free SSL certificates", "DNS auto-configuration", "Subdomain support"],
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  crux: { bg: "bg-crux-500/10", text: "text-crux-400", border: "border-crux-500/30", glow: "shadow-crux-500/20" },
  pink: { bg: "bg-accent-pink/10", text: "text-accent-pink", border: "border-accent-pink/30", glow: "shadow-accent-pink/20" },
  green: { bg: "bg-accent-green/10", text: "text-accent-green", border: "border-accent-green/30", glow: "shadow-accent-green/20" },
  cyan: { bg: "bg-accent-cyan/10", text: "text-accent-cyan", border: "border-accent-cyan/30", glow: "shadow-accent-cyan/20" },
};

export default function TenXPage() {
  const [activeTool, setActiveTool] = useState(0);
  const tool = TOOLS[activeTool];
  const colors = COLOR_MAP[tool.color];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg shadow-crux-500/20">
          <Rocket size={20} className="text-white" />
        </div>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">10x</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-8">
        Multiply your output by 10. Powerful tools to scale your business faster than ever.
      </p>

      {/* stats overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: TrendingUp, label: "Growth Rate", value: "10x", color: "text-crux-400" },
          { icon: Target, label: "Active Tools", value: "4", color: "text-accent-pink" },
          { icon: Layers, label: "Sites Capacity", value: "50", color: "text-accent-green" },
          { icon: Sparkles, label: "AI Powered", value: "100%", color: "text-accent-cyan" },
        ].map((stat, i) => (
          <div key={i} className="card border-gray-800/50 text-center">
            <stat.icon size={18} className={`${stat.color} mx-auto mb-2`} />
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* tool selector tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {TOOLS.map((t, i) => {
          const c = COLOR_MAP[t.color];
          const active = i === activeTool;
          return (
            <button
              key={i}
              onClick={() => setActiveTool(i)}
              className={`p-4 rounded-xl border transition-all text-left ${
                active
                  ? `${c.bg} ${c.border} border shadow-lg ${c.glow}`
                  : "bg-gray-900/40 border-gray-800/50 hover:border-gray-700"
              }`}
            >
              <t.icon size={20} className={active ? c.text : "text-gray-500"} />
              <div className={`text-sm font-bold mt-2 ${active ? "text-white" : "text-gray-400"}`}>
                {t.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* active tool detail */}
      <div className={`card ${colors.border} border bg-gradient-to-br from-gray-900/80 to-gray-900/40 relative overflow-hidden mb-6`}>
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <tool.icon size={24} className={colors.text} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{tool.title}</h2>
                  <p className="text-sm text-gray-400">{tool.desc}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 border border-gray-700/50 rounded-xl px-4 py-2 text-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">{tool.stats.label}</span>
              <div className="text-lg font-bold text-white">
                {tool.stats.value} <span className="text-gray-500 text-sm">/ {tool.stats.max}</span>
              </div>
            </div>
          </div>

          {/* features list */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {tool.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-800/30 rounded-xl px-4 py-3">
                <CheckCircle2 size={16} className={colors.text} />
                <span className="text-sm text-gray-300">{f}</span>
              </div>
            ))}
          </div>

          {/* action button */}
          <button className="btn-primary flex items-center gap-2">
            Launch {tool.title} <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* quick access grid */}
      <h3 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
        All 10x Tools
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {TOOLS.map((t, i) => {
          const c = COLOR_MAP[t.color];
          return (
            <button
              key={i}
              onClick={() => setActiveTool(i)}
              className="card border-gray-800/50 hover:border-crux-500/30 transition-all bg-gray-900/40 p-5 group text-left"
            >
              <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mb-4 ${c.text} group-hover:scale-110 transition-transform`}>
                <t.icon size={20} />
              </div>
              <h3 className="font-bold mb-1 text-white">{t.title}</h3>
              <p className="text-sm text-gray-400">{t.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
