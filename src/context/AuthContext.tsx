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

function extractFeatures(su: SupabaseUser): string[] {
  const meta = su.user_metadata;
  if (meta && Array.isArray(meta.features)) {
    return meta.features;
  }
  return [];
}

function toAppUser(
  su: SupabaseUser,
  profile?: Record<string, string>,
  featureOverride?: string[]
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
    features: featureOverride ?? extractFeatures(su),
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

/**
 * One-time background sync: ensures features stored in the feature_access DB
 * table are written to user_metadata. After this runs once, the user's auth
 * session carries the features permanently — no further API calls needed.
 */
async function syncFeaturesOnce(userId: string, currentFeatures: string[]): Promise<string[]> {
  try {
    const res = await fetch(`/api/user-features?userId=${userId}`);
    if (!res.ok) return currentFeatures;
    const data = await res.json();
    const dbFeatures: string[] = data.features || [];
    return [...new Set([...currentFeatures, ...dbFeatures])];
  } catch {
    return currentFeatures;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    let mounted = true;

    const timeout = setTimeout(() => {
      if (mounted && loading) setLoading(false);
    }, 6000);

    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        if (!mounted) return;
        if (session?.user) {
          const metaFeatures = extractFeatures(session.user);
          setUser(toAppUser(session.user, undefined, metaFeatures));

          const [profile, merged] = await Promise.all([
            fetchProfile(session.user.id),
            synced ? Promise.resolve(metaFeatures) : syncFeaturesOnce(session.user.id, metaFeatures),
          ]);

          if (mounted) {
            setSynced(true);
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
        const metaFeatures = extractFeatures(session.user);
        setUser(toAppUser(session.user, undefined, metaFeatures));

        const profile = await fetchProfile(session.user.id);
        if (mounted) setUser(toAppUser(session.user, profile || undefined, metaFeatures));
      } else {
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

      const metaFeatures = extractFeatures(data.user);
      setUser(toAppUser(data.user, undefined, metaFeatures));

      Promise.all([
        fetchProfile(data.user.id),
        syncFeaturesOnce(data.user.id, metaFeatures),
      ]).then(([profile, merged]) => {
        setSynced(true);
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
    setUser(null);
    setSynced(false);
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
