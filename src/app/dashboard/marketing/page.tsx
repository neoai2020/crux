"use client";
import { useState } from "react";

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
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [messages, setMessages] = useState<MarketingMessage[]>([]);
  const [generated, setGenerated] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (!businessName || selectedPlatforms.length === 0) return;
    const result = generateMessages(businessName, websiteUrl, description, selectedPlatforms);
    setMessages(result);
    setGenerated(true);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-black mb-1">
        <span className="gradient-text">Marketing Message Generator</span>
      </h1>
      <p className="text-gray-400 mb-8">Generate ready-to-post messages for Reddit, forums, social media, and more.</p>

      {!generated ? (
        <div className="card max-w-2xl space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Website / Business Name *</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="input-field"
              placeholder="e.g. Awesome Digital Co."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Website URL</label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="input-field"
              placeholder="crux.site/your-site"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description of your product / service</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field min-h-[80px] resize-none"
              placeholder="Briefly describe what your website offers..."
              rows={3}
            />
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
            disabled={!businessName || selectedPlatforms.length === 0}
            className="btn-primary w-full text-lg disabled:opacity-50"
          >
            Generate Messages →
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              Generated <span className="text-white font-medium">{messages.length} messages</span> for{" "}
              <span className="text-white font-medium">{businessName}</span>
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
