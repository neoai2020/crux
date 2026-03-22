"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/wizard", label: "Web Wizard", icon: "🧙" },
  { href: "/dashboard/websites", label: "My Websites", icon: "🌐" },
  { href: "/dashboard/marketing", label: "Traffic Magnet", icon: "📣" },
  { href: "/dashboard/training", label: "Training", icon: "🎓" },
  { href: "/dashboard/support", label: "Support", icon: "💬" },
];

const PREMIUM_ITEMS = [
  { href: "/dashboard/10x", label: "10x", icon: "🚀" },
  { href: "/dashboard/automation", label: "Automation", icon: "⚡" },
  { href: "/dashboard/infinite", label: "Infinite", icon: "♾️" },
  { href: "/dashboard/dfy", label: "DFY", icon: "🔧" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-crux-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800/50 flex flex-col fixed h-full">
        <div className="p-5 border-b border-gray-800/50">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center font-black">
              C
            </div>
            <span className="text-xl font-black gradient-text">Crux</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-crux-500/15 text-crux-300 border border-crux-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-gray-800/50">
            <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
              Premium Features
            </p>
            {PREMIUM_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-crux-500/15 text-crux-300 border border-crux-500/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center text-sm font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full text-left text-sm text-gray-500 hover:text-red-400 transition px-2 py-1"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen bg-grid relative">
        <div className="glow-orb w-64 h-64 bg-crux-500 top-0 right-0 opacity-5" />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
