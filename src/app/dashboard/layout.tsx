"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

import { 
  Wand2, 
  Globe, 
  Zap, 
  GraduationCap, 
  MessageCircle, 
  Rocket, 
  Infinity, 
  Hammer,
  LayoutDashboard,
  LogOut,
  Lock,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/dashboard/wizard", label: "Web Wizard", icon: <Wand2 size={18} /> },
  { href: "/dashboard/websites", label: "My Websites", icon: <Globe size={18} /> },
  { href: "/dashboard/marketing", label: "Traffic Magnet", icon: <Zap size={18} /> },
  { href: "/dashboard/training", label: "Training", icon: <GraduationCap size={18} /> },
  { href: "/dashboard/support", label: "Support", icon: <MessageCircle size={18} /> },
];

const PREMIUM_ITEMS = [
  { href: "/dashboard/10x", label: "10x", icon: <Rocket size={18} />, feature: "10x" },
  { href: "/dashboard/automation", label: "Automation", icon: <Zap size={18} />, feature: "automation" },
  { href: "/dashboard/infinite", label: "Infinite", icon: <Infinity size={18} />, feature: "infinite" },
  { href: "/dashboard/dfy", label: "DFY", icon: <Hammer size={18} />, feature: "dfy" },
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
            <Image src="/logo.png" alt="Crux" width={100} height={34} priority />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? "bg-crux-500/15 text-crux-300 border border-crux-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <span className={`transition-transform group-hover:scale-110 ${isActive ? "text-crux-400" : "text-gray-500 group-hover:text-crux-400"}`}>
                  {item.icon}
                </span>
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
              const isLocked = !user.features?.includes(item.feature);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-crux-500/20 to-accent-pink/5 text-white border border-crux-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <span className={`transition-all duration-300 ${isActive ? "text-accent-pink scale-110 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" : "text-gray-500 group-hover:text-accent-pink group-hover:scale-110"}`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isLocked && (
                    <Lock size={12} className="ml-auto text-gray-600" />
                  )}
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
            className="w-full text-left text-sm text-gray-500 hover:text-red-400 transition-all flex items-center gap-2 px-2 py-1 group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
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
