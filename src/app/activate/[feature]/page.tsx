"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Rocket,
  Zap,
  Infinity,
  Hammer,
  CheckCircle2,
  Loader2,
  Mail,
  ArrowRight,
} from "lucide-react";

const FEATURE_META: Record<
  string,
  { label: string; icon: React.ReactNode; color: string; description: string }
> = {
  "10x": {
    label: "10x Post Generator",
    icon: <Rocket size={32} className="text-accent-pink" />,
    color: "accent-pink",
    description:
      "Generate 10 high-converting social media posts from a single link. Unlock multiple angles, copy-paste ready posts, and viral hooks.",
  },
  automation: {
    label: "Automation Hub",
    icon: <Zap size={32} className="text-accent-cyan" />,
    color: "accent-cyan",
    description:
      "Access 70+ curated traffic sources across every major niche. Step-by-step posting guides, engagement snippets, and growth strategies.",
  },
  infinite: {
    label: "Infinite Mode",
    icon: <Infinity size={32} className="text-crux-400" />,
    color: "crux-400",
    description:
      "Remove all daily limits. Unlimited website generations, unlimited AI images, and clone & translate your sites into 25+ languages.",
  },
  dfy: {
    label: "Done For You Websites",
    icon: <Hammer size={32} className="text-accent-green" />,
    color: "accent-green",
    description:
      "Browse 180 professionally designed, ready-to-claim websites across 9 niches. Preview, customize, and go live in seconds.",
  },
};

export default function ActivateFeaturePage() {
  const params = useParams();
  const feature = params.feature as string;
  const meta = FEATURE_META[feature];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-grid relative">
        <div className="text-center">
          <h1 className="text-2xl font-black text-white mb-2">Invalid Link</h1>
          <p className="text-gray-400 mb-6">
            This activation link is not valid.
          </p>
          <Link href="/auth/signin" className="btn-primary px-6 py-3">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), feature }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      // Admin API updated user_metadata; client JWT is stale until refresh (Supabase docs).
      const trimmed = email.trim().toLowerCase();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email?.toLowerCase() === trimmed) {
        await supabase.auth.refreshSession();
      }

      setSuccess(true);
    } catch {
      setError("Connection error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-grid relative">
      <div className="glow-orb w-96 h-96 bg-crux-500 top-20 left-1/4" />
      <div className="glow-orb w-64 h-64 bg-accent-pink bottom-20 right-1/4" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/auth/signin" className="inline-flex items-center gap-2 mb-6">
            <Image src="/logo.png" alt="Crux" width={140} height={48} priority />
          </Link>
        </div>

        <div className="card relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crux-500 to-accent-pink" />

          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={36} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                Access Granted!
              </h2>
              <p className="text-gray-400 mb-6">
                <span className="text-white font-bold">{meta.label}</span> is
                now unlocked on your account. Head to your dashboard to start
                using it.
              </p>
              <Link
                href="/dashboard"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3"
              >
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4 border border-gray-700 shadow-lg">
                  {meta.icon}
                </div>
                <h2 className="text-2xl font-black text-white mb-2">
                  Activate {meta.label}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {meta.description}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Your Account Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Crux account email"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-crux-500 focus:ring-1 focus:ring-crux-500/50 transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Use the same email you signed up with.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Activating...
                    </>
                  ) : (
                    <>
                      Activate Now <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-crux-400 hover:underline"
                >
                  Sign up first
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
