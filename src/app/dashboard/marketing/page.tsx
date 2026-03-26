"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getWebsitesForUser, SavedWebsite } from "@/lib/websites";

interface MarketingMessage {
  platform: string;
  icon: string;
  title: string;
  message: string;
  subreddit?: string;
}

const PLATFORMS = [
  { id: "reddit", name: "Reddit", icon: "🔴", color: "from-orange-500 to-red-500" },
  { id: "forum", name: "Forums", icon: "💬", color: "from-blue-500 to-cyan-500" },
  { id: "facebook", name: "Facebook Groups", icon: "📘", color: "from-blue-600 to-blue-400" },
  { id: "twitter", name: "X / Twitter", icon: "🐦", color: "from-gray-600 to-gray-400" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "from-blue-700 to-blue-500" },
  { id: "quora", name: "Quora", icon: "❓", color: "from-red-600 to-red-400" },
];

export default function MarketingPage() {
  const { user } = useAuth();
  const [websites, setWebsites] = useState<SavedWebsite[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [messages, setMessages] = useState<MarketingMessage[]>([]);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [loadingSites, setLoadingSites] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoadingSites(false);
      return;
    }
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) setLoadingSites(false);
    }, 6000);

    (async () => {
      try {
        const [sites, remRes] = await Promise.all([
          getWebsitesForUser(user.id),
          fetch(`/api/generate-marketing?userId=${user.id}`).then((r) => r.json()),
        ]);
        if (!cancelled) {
          setWebsites(sites);
          setRemaining(remRes.remaining ?? 15);
          if (sites.length > 0) setSelectedSiteId(sites[0].id);
        }
      } catch {
        // ignore
      }
      if (!cancelled) {
        setLoadingSites(false);
        clearTimeout(timeout);
      }
    })();
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [user]);

  const selectedSite = websites.find((w) => w.id === selectedSiteId);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (!selectedSite || selectedPlatforms.length === 0 || !user) return;
    if (remaining !== null && remaining <= 0) {
      setError("You've reached your daily limit of 15 generations. Resets tomorrow!");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/generate-marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: selectedSite.businessName,
          url: `crux.site/${selectedSite.slug}`,
          description: selectedSite.description,
          platforms: selectedPlatforms,
          userId: user.id,
        }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setError(data.error || "Daily limit reached (15/day).");
        if (data.remaining !== undefined) setRemaining(data.remaining);
        setGenerating(false);
        return;
      }

      if (!res.ok) {
        setError("Generation failed. Please try again.");
        setGenerating(false);
        return;
      }

      const data = await res.json();
      setMessages(data.messages);
      if (data.remaining !== undefined) setRemaining(data.remaining);
      setGenerated(true);
    } catch {
      setError("Connection error. Please try again.");
    }
    setGenerating(false);
  };

  const handleRegenerate = async () => {
    setGenerated(false);
    setMessages([]);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h1 className="text-2xl font-black mb-1">
          <span className="gradient-text">Traffic Magnet</span>
        </h1>
        <p className="text-gray-400">
          AI-powered marketing messages for your websites.
        </p>
        {remaining !== null && (
          <div className="mt-3 inline-flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 rounded-full px-4 py-1.5 text-sm">
            <span className="text-gray-400">Daily generations:</span>
            <span className={`font-bold ${remaining > 5 ? "text-accent-green" : remaining > 0 ? "text-yellow-400" : "text-red-400"}`}>
              {remaining}/15
            </span>
            <span className="text-gray-500 text-xs">remaining</span>
          </div>
        )}
      </div>

      {error && (
        <div className="w-full max-w-2xl mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400 text-center">
          {error}
        </div>
      )}

      {!generated ? (
        <div className="card max-w-2xl w-full space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Select a Website *</label>
            {loadingSites ? (
              <div className="input-field flex items-center justify-center text-gray-500 text-sm py-3">Loading websites...</div>
            ) : websites.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-3">You haven&apos;t created any websites yet.</p>
                <a href="/dashboard/wizard" className="btn-primary text-sm">Create Your First Website →</a>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {websites.map((site) => {
                  const isActive = selectedSiteId === site.id;
                  return (
                    <button
                      key={site.id}
                      onClick={() => setSelectedSiteId(site.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                        isActive
                          ? "border-crux-500/50 bg-crux-500/10"
                          : "border-gray-700/50 hover:border-gray-600"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {site.businessName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-gray-300"}`}>
                          {site.businessName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">crux.site/{site.slug}</p>
                      </div>
                      {isActive && <span className="ml-auto text-crux-400 text-xs shrink-0">Selected</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {selectedSite && (
            <>
              <div className="bg-gray-800/30 rounded-xl p-3 text-sm">
                <p className="text-gray-300"><span className="text-gray-500">Business:</span> {selectedSite.businessName}</p>
                <p className="text-gray-300 mt-1"><span className="text-gray-500">Description:</span> {selectedSite.description}</p>
                <p className="text-gray-300 mt-1"><span className="text-gray-500">URL:</span> crux.site/{selectedSite.slug}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Select Platforms *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedPlatforms.includes(p.id)
                          ? "border-crux-500/50 bg-crux-500/10 text-white"
                          : "border-gray-700/50 text-gray-400 hover:border-gray-600"
                      }`}
                    >
                      <span className="text-lg">{p.icon}</span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={selectedPlatforms.length === 0 || generating || (remaining !== null && remaining <= 0)}
                className="btn-primary w-full text-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating with AI...
                  </>
                ) : remaining !== null && remaining <= 0 ? (
                  "Daily Limit Reached — Resets Tomorrow"
                ) : (
                  "Generate Messages →"
                )}
              </button>

              {remaining !== null && remaining > 0 && remaining <= 5 && (
                <p className="text-xs text-center text-yellow-400/80">
                  {remaining} generation{remaining !== 1 ? "s" : ""} remaining today
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="w-full space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-gray-400">
              Generated <span className="text-white font-medium">{messages.length} messages</span> for{" "}
              <span className="text-white font-medium">{selectedSite?.businessName}</span>
            </p>
            <div className="flex items-center gap-3">
              {remaining !== null && (
                <span className="text-xs text-gray-500">{remaining}/15 left today</span>
              )}
              <button
                onClick={handleGenerate}
                disabled={generating || (remaining !== null && remaining <= 0)}
                className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  "🔄 Regenerate"
                )}
              </button>
              <button onClick={handleRegenerate} className="btn-secondary text-sm">
                ← Edit Settings
              </button>
            </div>
          </div>

          {messages.map((msg, idx) => (
            <div key={idx} className="card animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{msg.icon}</span>
                  <span className="font-bold">{msg.platform}</span>
                  {msg.subreddit && (
                    <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full">
                      {msg.subreddit}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleCopy(msg.message, idx)}
                  className={`text-sm px-3 py-1 rounded-lg transition-all ${
                    copiedIdx === idx
                      ? "bg-green-500/10 text-green-400"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {copiedIdx === idx ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <h3 className="font-medium text-sm text-crux-300 mb-2">{msg.title}</h3>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed bg-gray-800/30 rounded-xl p-4">
                {msg.message}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
