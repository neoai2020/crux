"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const urlParams = new URLSearchParams(window.location.search);

      const urlError = urlParams.get("error");
      if (urlError) {
        setError(urlError);
        setChecking(false);
        return;
      }

      const tokenHash = urlParams.get("token_hash");
      const type = urlParams.get("type");
      if (tokenHash && type === "recovery") {
        try {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "recovery",
          });
          if (verifyError) {
            setError(verifyError.message);
          } else {
            setReady(true);
          }
        } catch {
          setError("Failed to verify reset link. Please request a new one.");
        }
        setChecking(false);
        return;
      }

      const code = urlParams.get("code");
      if (code) {
        try {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setError(exchangeError.message);
          } else {
            setReady(true);
          }
        } catch {
          setError("Failed to verify reset code. Please request a new link.");
        }
        setChecking(false);
        return;
      }

      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      const hashError = hashParams.get("error_description");
      if (hashError) {
        setError(hashError.replace(/\+/g, " "));
        setChecking(false);
        return;
      }
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      if (accessToken && refreshToken) {
        try {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (sessionError) {
            setError(sessionError.message);
          } else {
            setReady(true);
          }
        } catch {
          setError("Failed to verify reset link. Please request a new one.");
        }
        setChecking(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setReady(true);
      } else {
        setError(
          "No active reset session. Please request a new password reset link."
        );
      }
      setChecking(false);
    };

    init();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-2 border-crux-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Verifying your reset link...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Password Updated!</h3>
        <p className="text-gray-400 text-sm mb-6">
          Your password has been changed successfully.
        </p>
        <Link href="/auth/signin" className="btn-primary inline-block">
          Back to Sign In
        </Link>
      </div>
    );
  }

  if (!ready && error) {
    return (
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Reset Failed</h3>
        <p className="text-red-400 text-sm mb-6">{error}</p>
        <Link
          href="/auth/forgot-password"
          className="btn-primary inline-block"
        >
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="new-password"
          className="block text-sm font-medium text-gray-300 mb-1.5"
        >
          New Password
        </label>
        <input
          id="new-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          placeholder="Min. 6 characters"
          required
          minLength={6}
        />
      </div>
      <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-300 mb-1.5"
        >
          Confirm New Password
        </label>
        <input
          id="confirm-password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="input-field"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-grid relative">
      <div className="glow-orb w-96 h-96 bg-crux-600 top-1/3 left-1/3" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 mb-6"
          >
            <Image
              src="/logo.png"
              alt="Crux"
              width={140}
              height={48}
              priority
            />
          </Link>
          <h1 className="text-3xl font-black mb-2">Set New Password</h1>
          <p className="text-gray-400">
            Choose a new password for your account
          </p>
        </div>

        <div className="card">
          <Suspense
            fallback={
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-crux-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
          <p className="text-center text-sm text-gray-400 mt-6">
            Remember your password?{" "}
            <Link
              href="/auth/signin"
              className="text-crux-400 hover:text-crux-300 font-medium transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
