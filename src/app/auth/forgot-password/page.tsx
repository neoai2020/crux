"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setError(error.message);
      } else {
        setSent(true);
      }
    } catch {
      setError("Connection error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-grid relative">
      <div className="glow-orb w-96 h-96 bg-crux-600 top-1/3 left-1/3" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/auth/signin" className="inline-flex items-center gap-2 mb-6">
            <Image src="/logo.png" alt="Crux" width={140} height={48} priority />
          </Link>
          <h1 className="text-3xl font-black mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your email and we&apos;ll send you a reset link</p>
        </div>

        <div className="card">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✉️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
              <p className="text-gray-400 text-sm mb-6">
                We&apos;ve sent a password reset link to <span className="text-white font-medium">{email}</span>
              </p>
              <p className="text-gray-500 text-xs mb-6">Don&apos;t see it? Check your spam folder.</p>
              <Link href="/auth/signin" className="btn-primary inline-block">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
          <p className="text-center text-sm text-gray-400 mt-6">
            Remember your password?{" "}
            <Link href="/auth/signin" className="text-crux-400 hover:text-crux-300 font-medium transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
