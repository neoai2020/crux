"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("crux_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, _password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("crux_users") || "[]");
    const found = users.find((u: User & { password: string }) => u.email === email);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("crux_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("crux_users") || "[]");
    if (users.find((u: User) => u.email === email)) return false;
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      plan: "Starter",
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("crux_users", JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem("crux_user", JSON.stringify(userData));
    return true;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("crux_user");
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("crux_users") || "[]");
    return users.some((u: User) => u.email === email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
