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

function toAppUser(su: SupabaseUser, profile?: Record<string, string>): User {
  return {
    id: su.id,
    name:
      profile?.name ||
      su.user_metadata?.name ||
      su.email?.split("@")[0] ||
      "User",
    email: su.email || "",
    plan: profile?.plan || "Starter",
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
          setUser(toAppUser(session.user));
          const profile = await fetchProfile(session.user.id);
          if (mounted && profile) setUser(toAppUser(session.user, profile));
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
        setUser(toAppUser(session.user));
        const profile = await fetchProfile(session.user.id);
        if (mounted && profile) setUser(toAppUser(session.user, profile));
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
      setUser(toAppUser(data.user));
      fetchProfile(data.user.id).then((profile) => {
        if (profile) setUser(toAppUser(data.user, profile));
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
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/signin`,
      });
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
