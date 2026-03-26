"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  features: string[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toAppUser(
  su: SupabaseUser,
  profile?: Record<string, string>,
  features?: string[]
): User {
  return {
    id: su.id,
    name:
      profile?.name ||
      su.user_metadata?.name ||
      su.email?.split("@")[0] ||
      "User",
    email: su.email || "",
    plan: profile?.plan || "Starter",
    features: features || [],
    createdAt: profile?.created_at || su.created_at,
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

async function fetchProfile(userId: string) {
  try {
    const query = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("name, plan, created_at")
        .eq("id", userId)
        .maybeSingle();
      return data as Record<string, string> | null;
    };
    return await withTimeout(query(), 4000, null);
  } catch {
    return null;
  }
}

const FEATURES_CACHE_KEY = "crux_features";

function getCachedFeatures(userId: string): string[] {
  try {
    const raw = localStorage.getItem(FEATURES_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (parsed.userId === userId && Array.isArray(parsed.features)) {
      return parsed.features;
    }
    return [];
  } catch {
    return [];
  }
}

function setCachedFeatures(userId: string, features: string[]) {
  try {
    localStorage.setItem(
      FEATURES_CACHE_KEY,
      JSON.stringify({ userId, features })
    );
  } catch {
    // localStorage unavailable
  }
}

function clearCachedFeatures() {
  try {
    localStorage.removeItem(FEATURES_CACHE_KEY);
  } catch {}
}

async function fetchFeatures(userId: string): Promise<string[]> {
  try {
    const query = async () => {
      const res = await fetch(`/api/user-features?userId=${userId}`);
      if (!res.ok) return [];
      const data = await res.json();
      return (data.features as string[]) || [];
    };
    const features = await withTimeout(query(), 5000, []);
    if (features.length > 0) {
      setCachedFeatures(userId, features);
    }
    return features;
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const timeout = setTimeout(() => {
      if (mounted && loading) {
        setLoading(false);
      }
    }, 6000);

    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        if (!mounted) return;
        if (session?.user) {
          const cached = getCachedFeatures(session.user.id);
          setUser(toAppUser(session.user, undefined, cached));

          const [profile, freshFeatures] = await Promise.all([
            fetchProfile(session.user.id),
            fetchFeatures(session.user.id),
          ]);
          if (mounted) {
            const merged = [...new Set([...cached, ...freshFeatures])];
            if (merged.length > 0) setCachedFeatures(session.user.id, merged);
            setUser(toAppUser(session.user, profile || undefined, merged));
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
        clearTimeout(timeout);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        const cached = getCachedFeatures(session.user.id);
        setUser(toAppUser(session.user, undefined, cached));

        const [profile, freshFeatures] = await Promise.all([
          fetchProfile(session.user.id),
          fetchFeatures(session.user.id),
        ]);
        if (mounted) {
          const merged = [...new Set([...cached, ...freshFeatures])];
          if (merged.length > 0) setCachedFeatures(session.user.id, merged);
          setUser(toAppUser(session.user, profile || undefined, merged));
        }
      } else {
        clearCachedFeatures();
        if (mounted) setUser(null);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data.user) return false;
      const cached = getCachedFeatures(data.user.id);
      setUser(toAppUser(data.user, undefined, cached));
      Promise.all([
        fetchProfile(data.user.id),
        fetchFeatures(data.user.id),
      ]).then(([profile, freshFeatures]) => {
        const merged = [...new Set([...cached, ...freshFeatures])];
        if (merged.length > 0) setCachedFeatures(data.user.id, merged);
        setUser(toAppUser(data.user, profile || undefined, merged));
      }).catch(() => {});
      return true;
    } catch {
      return false;
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error || !data.user) return false;
      setUser(toAppUser(data.user));
      return true;
    } catch {
      return false;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    clearCachedFeatures();
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return !error;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
