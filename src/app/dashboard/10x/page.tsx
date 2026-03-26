"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PremiumGate from "@/components/PremiumGate";
import {
  Zap,
  Share2,
  Target,
  BarChart3,
  Link2,
  Sparkles,
  Copy,
  CheckCircle2,
  Info,
  Users,
  Clock,
  MessageSquare,
} from "lucide-react";

/* ─── 10 angle templates ─── */
const ANGLES = [
  { label: "Curiosity Hook", tone: "curiosity" },
  { label: "Storytelling", tone: "story" },
  { label: "Problem-Solution", tone: "problem" },
  { label: "Social Proof", tone: "proof" },
  { label: "Direct CTA", tone: "cta" },
  { label: "Question Opener", tone: "question" },
  { label: "Controversial Take", tone: "controversial" },
  { label: "Personal Journey", tone: "personal" },
  { label: "Listicle / Tips", tone: "listicle" },
  { label: "Urgency / FOMO", tone: "urgency" },
];

function generatePosts(linkName: string, promoLink: string): string[] {
  const name = linkName || "this product";
  const link = promoLink || "https://example.com";

  return [
    // 1 - Curiosity Hook
    `🤔 What if I told you there's a way to completely change how you approach ${name}?\n\nMost people have no idea this exists — but once you see it, you can't unsee it.\n\nI stumbled across this and my results have been night and day different.\n\n👉 ${link}\n\nDrop a "🔥" if you want me to break it down in the comments!`,

    // 2 - Storytelling
    `📖 6 months ago, I was stuck in the same place most of you are right now.\n\nI'd tried everything — nothing seemed to move the needle. Then I found ${name} and decided to give it one more shot.\n\nFast forward to today? The difference is unreal.\n\nHere's what I used: ${link}\n\nSometimes one decision changes everything. This was mine.`,

    // 3 - Problem-Solution
    `❌ Tired of wasting time on things that don't work?\n\nI was too. Spent months going in circles until I found a system that actually delivers.\n\n✅ ${name} solved the exact problem I was struggling with — and it can work for you too.\n\nCheck it out here: ${link}\n\nYour future self will thank you. 💪`,

    // 4 - Social Proof
    `🏆 Over 10,000+ people have already discovered ${name} — and the results speak for themselves.\n\nI'm not the only one saying this. The reviews, the testimonials, the transformations… they're all real.\n\nIf you've been on the fence, now's the time.\n\n🔗 ${link}\n\nJoin the movement. 🚀`,

    // 5 - Direct CTA
    `⚡ Stop scrolling and pay attention.\n\nIf you've been looking for ${name}, this is it.\n\nNo fluff. No gimmicks. Just results.\n\n👉 ${link}\n\nClick the link, see for yourself, and thank me later. 🙌`,

    // 6 - Question Opener
    `💭 Quick question for this group:\n\nHave you ever felt like you're doing everything right but still not seeing results?\n\nI felt the exact same way — until I discovered ${name}.\n\nIt changed my approach completely, and I think it could help a lot of you too.\n\nHere's the link if you're curious: ${link}\n\nWho else has experienced this? Let's talk about it 👇`,

    // 7 - Controversial Take
    `🔥 Unpopular opinion: Most of the advice you're getting about this topic is outdated.\n\nI know that's a bold claim, but hear me out.\n\nAfter testing dozens of approaches, ${name} was the ONLY thing that actually moved the needle for me.\n\nSee what I mean: ${link}\n\nAgree or disagree? Let me know below 👇`,

    // 8 - Personal Journey
    `🙋 Real talk for a second…\n\nA year ago, I almost gave up. Nothing was working. I felt like I was the only one struggling.\n\nThen someone recommended ${name} to me, and honestly? It was a turning point.\n\nI'm sharing this because I know some of you are in that same place right now.\n\n${link}\n\nIf this helps even one person, it's worth posting. ❤️`,

    // 9 - Listicle / Tips
    `📋 3 things I wish I knew sooner:\n\n1️⃣ You don't need to do everything manually\n2️⃣ The right tool makes ALL the difference\n3️⃣ ${name} exists and it's a game-changer\n\nSeriously — if you haven't checked this out yet, you're leaving results on the table.\n\n🔗 ${link}\n\nSave this post for later. You'll need it. 📌`,

    // 10 - Urgency / FOMO
    `⏰ This won't be available forever…\n\nI just got access to ${name} and I'm genuinely impressed. The results are better than expected.\n\nBut here's the thing — opportunities like this don't stick around long.\n\n🔗 ${link}\n\nDon't wait until everyone's already using it. Get in now. 🚀\n\nWho's in? Drop a ✋ below!`,
  ];
}

/* ─── pro tips data ─── */
const WHERE_TO_SHARE = [
  {
    title: "Niche Facebook Groups",
    desc: "Find groups with 10K–100K members related to your product. Avoid spammy mega-groups.",
  },
  {
    title: "Your Profile & Stories",
    desc: "Post on your personal profile too. Facebook's algorithm favors personal accounts.",
  },
  {
    title: "Facebook Pages You Manage",
    desc: "If you have a page, post there and boost the best-performing posts.",
  },
  {
    title: "Comment Sections",
    desc: "Reply to relevant viral posts with your take and a subtle link. High-traffic comments = free visibility.",
  },
];

const WHEN_HOW = [
  {
    title: "Best times",
    desc: "9–11 AM and 7–9 PM in your audience's timezone. Tuesday–Thursday perform best.",
  },
  {
    title: "Space them out",
    desc: "Post 1–2 per day across different groups. Never spam the same group twice in a day.",
  },
  {
    title: "Engage immediately",
    desc: "Reply to every comment within the first hour. Facebook rewards fast engagement with more reach.",
  },
  {
    title: "Use all 10 angles",
    desc: "Different posts resonate with different people. The curiosity angle might flop where storytelling goes viral.",
  },
];

export default function TenXPage() {
  const { user } = useAuth();
  const hasAccess = user?.features?.includes("10x");

  const [linkName, setLinkName] = useState("");
  const [promoLink, setPromoLink] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!hasAccess) return <PremiumGate feature="10x" />;

  const handleGenerate = () => {
    const result = generatePosts(linkName, promoLink);
    setPosts(result);
    setGenerated(true);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* ── header ── */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg shadow-crux-500/20">
          <Zap size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black">
            <span className="gradient-text">10X Facebook Post Generator</span>
          </h1>
          <span className="text-[10px] font-bold tracking-widest uppercase bg-accent-green/20 text-accent-green px-2 py-0.5 rounded-md">
            10X Mode Active
          </span>
        </div>
      </div>
      <p className="text-gray-400 mb-8 mt-3">
        Generate 10 unique, high-converting Facebook posts from a single link
        — each with a different angle to maximize reach and clicks.
      </p>

      {/* ── 3 feature highlights ── */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Share2, title: "10 Unique Posts", desc: "10 different hooks & angles per link" },
          { icon: Target, title: "High-Converting Copy", desc: "Optimized for clicks & engagement" },
          { icon: BarChart3, title: "Ready to Post", desc: "Copy-paste directly into Facebook" },
        ].map((f, i) => (
          <div key={i} className="card border-gray-800/50 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-crux-500/10 flex items-center justify-center text-crux-400 flex-shrink-0">
              <f.icon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{f.title}</h3>
              <p className="text-xs text-gray-400">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── generator form ── */}
      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-crux-500/20 flex items-center justify-center">
                <Sparkles size={16} className="text-crux-400" />
              </div>
              Generate 10 Facebook Posts
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
                Link Name
              </label>
              <input
                type="text"
                placeholder="e.g. My Fitness eBook, Water Filter System, etc."
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
                Promotional Link
              </label>
              <div className="relative">
                <Link2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="https://example.com/product?ref=your-id"
                  value={promoLink}
                  onChange={(e) => setPromoLink(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="btn-primary w-full text-sm tracking-widest uppercase flex items-center justify-center gap-2 py-4"
          >
            <Sparkles size={16} />
            Generate 10 Intelligent Posts
          </button>
        </div>
      </div>

      {/* ── generated posts ── */}
      {generated && (
        <div className="space-y-4 mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white">
              Your 10 Posts
              <span className="text-sm text-gray-400 font-normal ml-2">
                for &ldquo;{linkName || "your product"}&rdquo;
              </span>
            </h2>
            <button
              onClick={() => setGenerated(false)}
              className="btn-secondary text-xs"
            >
              Regenerate
            </button>
          </div>

          {posts.map((post, idx) => (
            <div
              key={idx}
              className="card border-gray-800/50 hover:border-crux-500/20 transition-all animate-slide-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center text-[11px] font-black text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-bold text-crux-300">
                    {ANGLES[idx].label}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(post, idx)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
                    copiedIdx === idx
                      ? "bg-accent-green/10 text-accent-green"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {copiedIdx === idx ? (
                    <>
                      <CheckCircle2 size={12} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed bg-gray-800/30 rounded-xl p-4">
                {post}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* ── pro tips ── */}
      <div className="card border-gray-800/50 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-crux-500/10 flex items-center justify-center">
            <Info size={16} className="text-crux-400" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Pro Tips: How to Go Viral on Facebook
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* where to share */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-crux-400 uppercase mb-4 flex items-center gap-2">
              <Users size={14} />
              Where to Share
            </h3>
            <div className="space-y-4">
              {WHERE_TO_SHARE.map((tip, i) => (
                <div key={i} className="border-l-2 border-gray-700/50 pl-4">
                  <h4 className="font-bold text-white text-sm">{tip.title}</h4>
                  <p className="text-sm text-gray-400 mt-0.5">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* when & how to post */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-accent-pink uppercase mb-4 flex items-center gap-2">
              <Clock size={14} />
              When & How to Post
            </h3>
            <div className="space-y-4">
              {WHEN_HOW.map((tip, i) => (
                <div key={i} className="border-l-2 border-gray-700/50 pl-4">
                  <h4 className="font-bold text-white text-sm">{tip.title}</h4>
                  <p className="text-sm text-gray-400 mt-0.5">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── golden rule banner ── */}
      <div className="card border-crux-500/30 bg-gradient-to-br from-crux-500/10 to-accent-pink/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-crux-500/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={24} className="text-crux-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white mb-2">
              The Golden Rule of Facebook Groups
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Contribute value to the group FIRST. Comment on other people&apos;s posts, answer questions, and be helpful for a few days before sharing your own link posts. Group admins are more likely to approve your posts, and members are more likely to engage with someone they recognize. A warm audience converts{" "}
              <span className="gradient-text font-bold italic">5–10x better</span>{" "}
              than cold posting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
