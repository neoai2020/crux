"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CATEGORIES } from "@/data/templates";

const LIVE_FEEDBACK = [
  { name: "Sarah M.", amount: "$2,450", type: "eCom Store" },
  { name: "James K.", amount: "$890", type: "Sales Funnel" },
  { name: "Maria G.", amount: "$5,200", type: "Course Site" },
  { name: "David L.", amount: "$1,120", type: "Landing Page" },
  { name: "Emily R.", amount: "$3,780", type: "Membership Site" },
  { name: "Michael T.", amount: "$670", type: "Blog" },
  { name: "Ashley W.", amount: "$4,100", type: "Agency Website" },
  { name: "Chris P.", amount: "$1,950", type: "Dropship Site" },
  { name: "Nina S.", amount: "$8,300", type: "Digital Marketplace" },
  { name: "Robert H.", amount: "$2,100", type: "Functional Website" },
];

export default function LandingPage() {
  const [feedbackIdx, setFeedbackIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setFeedbackIdx((i) => (i + 1) % LIVE_FEEDBACK.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = LIVE_FEEDBACK[feedbackIdx];

  return (
    <div className="min-h-screen bg-grid relative overflow-hidden">
      <div className="glow-orb w-96 h-96 bg-crux-500 top-20 -left-48" />
      <div className="glow-orb w-96 h-96 bg-accent-pink top-40 right-0" />
      <div className="glow-orb w-64 h-64 bg-accent-cyan bottom-20 left-1/3" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-20 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center font-black text-lg">
            C
          </div>
          <span className="text-2xl font-black gradient-text">Crux</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#categories" className="hover:text-white transition">What You Can Build</a>
          <a href="#how" className="hover:text-white transition">How It Works</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/signin" className="btn-secondary text-sm">Sign In</Link>
          <Link href="/auth/signup" className="btn-primary text-sm">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        {mounted && (
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">{current.name}</span> just made{" "}
            <span className="font-bold text-green-300">{current.amount}</span> with their {current.type}
          </div>
        )}
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
          <span className="gradient-text">AI Super Engineer</span> Turns Your
          <br />
          Text Into Fully Functional
          <br />
          <span className="gradient-text">Websites & Apps</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          From a single prompt, Crux generates ready-to-launch websites, blogs, eCom stores, sales funnels,
          landing pages, and more — complete with content, hosting, and marketing tools.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/auth/signup" className="btn-primary text-lg px-10 py-4">
            Start Building for Free →
          </Link>
          <a href="#how" className="btn-secondary text-lg px-10 py-4">
            See How It Works
          </a>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">✓ No coding required</span>
          <span className="flex items-center gap-1">✓ Hosted on our domain</span>
          <span className="flex items-center gap-1">✓ 20+ ready templates</span>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          Build <span className="gradient-text">Anything</span> You Can Imagine
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Choose from 13 categories, each with professionally designed templates ready to customize.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="card-hover text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="font-bold text-sm mb-1">{cat.name}</h3>
              <p className="text-xs text-gray-500">{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          How <span className="gradient-text">Crux</span> Works
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Three simple steps to go from idea to a live, money-making website.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Choose & Describe",
              desc: "Pick your website type, add your business name, email, and any relevant details. Or just describe what you need.",
              gradient: "from-crux-500 to-crux-400",
            },
            {
              step: "02",
              title: "AI Generates 2 Options",
              desc: "Crux instantly creates 2 professional templates tailored to your business. Pick the one you love.",
              gradient: "from-accent-pink to-accent-orange",
            },
            {
              step: "03",
              title: "Launch & Market",
              desc: "Add your content, get AI-generated marketing messages for Reddit, forums and social media, and go live!",
              gradient: "from-accent-cyan to-accent-green",
            },
          ].map((item) => (
            <div key={item.step} className="card text-center">
              <div
                className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} items-center justify-center text-xl font-black mb-4`}
              >
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
          Everything You Need to <span className="gradient-text">Succeed</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "20+ Pro Templates", desc: "Handcrafted, conversion-optimized templates for every business type.", icon: "🎨" },
            { title: "AI Content Writer", desc: "Generate compelling copy, product descriptions, and blog posts instantly.", icon: "✍️" },
            { title: "Marketing Generator", desc: "Auto-create posts for Reddit, forums, and social media with your link embedded.", icon: "📣" },
            { title: "Instant Hosting", desc: "Your site goes live on our domain immediately — no DNS or server setup.", icon: "⚡" },
            { title: "Training Hub", desc: "Step-by-step video guides to maximize your website's earning potential.", icon: "🎬" },
            { title: "Live Dashboard", desc: "Track visitors, conversions, and revenue in real-time from your dashboard.", icon: "📊" },
          ].map((f) => (
            <div key={f.title} className="card-hover">
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="card bg-gradient-to-br from-crux-900/80 to-gray-900/80 border-crux-500/30 p-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Build Your <span className="gradient-text">Empire</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of entrepreneurs who are building profitable websites with Crux in minutes, not months.
          </p>
          <Link href="/auth/signup" className="btn-primary text-lg px-10 py-4 inline-block">
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-8 px-6 text-center text-sm text-gray-500">
        <p>© 2026 Crux. All rights reserved. | AI Super Engineer</p>
      </footer>
    </div>
  );
}
