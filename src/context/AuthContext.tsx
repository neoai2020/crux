"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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

function mapSupabaseUser(
  su: SupabaseUser,
  profile?: { name?: string; plan?: string; created_at?: string }
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
    createdAt: profile?.created_at || su.created_at,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (su: SupabaseUser) => {
    const { data } = await supabase
      .from("profiles")
      .select("name, plan, created_at")
      .eq("id", su.id)
      .single();
    return data;
  }, []);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          const profile = await fetchProfile(session.user);
          setUser(mapSupabaseUser(session.user, profile ?? undefined));
        }
      } catch (err) {
        console.error("Auth init error:", err);
      }
      if (mounted) setLoading(false);
    }

    init();

    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const { data } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            try {
              const profile = await fetchProfile(session.user);
              if (mounted)
                setUser(mapSupabaseUser(session.user, profile ?? undefined));
            } catch {
              if (mounted)
                setUser(mapSupabaseUser(session.user));
            }
          } else {
            if (mounted) setUser(null);
          }
        }
      );
      subscription = data.subscription;
    } catch (err) {
      console.error("Auth listener error:", err);
    }

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchProfile]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return !error;
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    return !error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/signin`,
    });
    return !error;
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
