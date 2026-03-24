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

function generateMessages(businessName: string, websiteUrl: string, description: string, platforms: string[]): MarketingMessage[] {
  const messages: MarketingMessage[] = [];
  const name = businessName || "My Website";
  const url = websiteUrl || "crux.site/my-site";
  const desc = description || "an amazing new platform";

  if (platforms.includes("reddit")) {
    messages.push({
      platform: "Reddit",
      icon: "🔴",
      title: `Check out ${name} - ${desc}`,
      subreddit: "r/Entrepreneur",
      message: `Hey everyone! I just launched ${name} and wanted to share it with this community. ${desc}.\n\nI've been working on this for a while and would love your feedback. It's completely free to check out.\n\n👉 ${url}\n\nWould love to hear your thoughts! What features would you find most useful?`,
    });
    messages.push({
      platform: "Reddit",
      icon: "🔴",
      title: `I built ${name} to solve a common problem`,
      subreddit: "r/SideProject",
      message: `After noticing how many people struggle with this, I decided to build ${name}.\n\nHere's what it does:\n- ${desc}\n- Easy to use interface\n- Free to get started\n\nCheck it out: ${url}\n\nI'm the creator so happy to answer any questions! 🚀`,
    });
  }

  if (platforms.includes("forum")) {
    messages.push({
      platform: "Forums",
      icon: "💬",
      title: `New Resource: ${name}`,
      message: `Hi everyone,\n\nI wanted to share a resource I recently created that I think this community would find valuable.\n\n${name} - ${desc}\n\nIt's designed to help people like us get more done with less effort. I'd really appreciate if you could check it out and share your honest feedback.\n\nLink: ${url}\n\nThanks in advance! Looking forward to hearing what you all think.`,
    });
  }

  if (platforms.includes("facebook")) {
    messages.push({
      platform: "Facebook Groups",
      icon: "📘",
      title: `Excited to share ${name}!`,
      message: `🚀 Exciting news! I just launched ${name}!\n\n${desc}\n\nIf you've been looking for a solution like this, I'd love for you to check it out:\n👉 ${url}\n\nDrop a comment if you have any questions - I'm here to help! 💪`,
    });
  }

  if (platforms.includes("twitter")) {
    messages.push({
      platform: "X / Twitter",
      icon: "🐦",
      title: "Launch Tweet",
      message: `🚀 Just launched ${name}!\n\n${desc}\n\nCheck it out 👇\n${url}\n\n#launch #startup #entrepreneur`,
    });
    messages.push({
      platform: "X / Twitter",
      icon: "🐦",
      title: "Thread Starter",
      message: `I spent weeks building ${name} and it's finally live! 🎉\n\nHere's what it does and why you should care:\n\n🧵 Thread 👇\n\n1/ ${desc}\n\n2/ The best part? It's super easy to get started.\n\n3/ Check it out: ${url}`,
    });
  }

  if (platforms.includes("linkedin")) {
    messages.push({
      platform: "LinkedIn",
      icon: "💼",
      title: "Professional Announcement",
      message: `I'm thrilled to announce the launch of ${name}! 🎉\n\n${desc}\n\nThis project has been a labor of love, and I'm excited to share it with my professional network.\n\nKey highlights:\n✅ Professional quality\n✅ Easy to use\n✅ Designed for results\n\nI'd love your feedback: ${url}\n\n#NewLaunch #Innovation #Entrepreneurship`,
    });
  }

  if (platforms.includes("quora")) {
    messages.push({
      platform: "Quora",
      icon: "❓",
      title: "Helpful Answer Format",
      message: `Great question! Based on my experience, here's what I'd recommend:\n\n${desc}\n\nI actually built a tool called ${name} that addresses exactly this. It's helped a lot of people already and I think you'd find it useful too.\n\nYou can check it out here: ${url}\n\nHope this helps! Let me know if you have any follow-up questions.`,
    });
  }

  return messages;
}

export default function MarketingPage() {
  const { user } = useAuth();
  const [websites, setWebsites] = useState<SavedWebsite[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [messages, setMessages] = useState<MarketingMessage[]>([]);
  const [generated, setGenerated] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [loadingSites, setLoadingSites] = useState(true);

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
        const sites = await getWebsitesForUser(user.id);
        if (!cancelled) {
          setWebsites(sites);
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

  const handleGenerate = () => {
    if (!selectedSite || selectedPlatforms.length === 0) return;
    const url = `crux.site/${selectedSite.slug}`;
    const result = generateMessages(selectedSite.businessName, url, selectedSite.description, selectedPlatforms);
    setMessages(result);
    setGenerated(true);
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
        <p className="text-gray-400">Generate ready-to-post marketing messages for your websites.</p>
      </div>

      {!generated ? (
        <div className="card max-w-2xl w-full space-y-5">
          {/* Website selector */}
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
                disabled={selectedPlatforms.length === 0}
                className="btn-primary w-full text-lg disabled:opacity-50"
              >
                Generate Messages →
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              Generated <span className="text-white font-medium">{messages.length} messages</span> for{" "}
              <span className="text-white font-medium">{selectedSite?.businessName}</span>
            </p>
            <button onClick={() => setGenerated(false)} className="btn-secondary text-sm">
              ← Edit & Regenerate
            </button>
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
