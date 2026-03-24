"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { 
  Globe, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Wand2, 
  Zap, 
  GraduationCap, 
  Settings,
  Plus
} from "lucide-react";
import { getWebsitesForUser, getRemainingGenerations, SavedWebsite } from "@/lib/websites";
import { getToneById } from "@/data/tones";
import FeatureVideo from "@/components/FeatureVideo";

const EARNINGS_FEED = [
  { name: "Sarah M.", amount: "$2,450", type: "eCom Store", time: "2 min ago", avatar: "S" },
  { name: "James K.", amount: "$890", type: "Sales Funnel", time: "5 min ago", avatar: "J" },
  { name: "Maria G.", amount: "$5,200", type: "Course Site", time: "8 min ago", avatar: "M" },
  { name: "David L.", amount: "$1,120", type: "Landing Page", time: "12 min ago", avatar: "D" },
  { name: "Emily R.", amount: "$3,780", type: "Membership", time: "15 min ago", avatar: "E" },
  { name: "Michael T.", amount: "$670", type: "Blog", time: "18 min ago", avatar: "M" },
  { name: "Ashley W.", amount: "$4,100", type: "Agency Site", time: "22 min ago", avatar: "A" },
  { name: "Chris P.", amount: "$1,950", type: "Dropship", time: "25 min ago", avatar: "C" },
  { name: "Nina S.", amount: "$8,300", type: "Marketplace", time: "28 min ago", avatar: "N" },
  { name: "Robert H.", amount: "$2,100", type: "Website", time: "31 min ago", avatar: "R" },
  { name: "Lisa T.", amount: "$3,400", type: "Course Site", time: "34 min ago", avatar: "L" },
  { name: "Kevin B.", amount: "$920", type: "Landing Page", time: "37 min ago", avatar: "K" },
  { name: "Amanda F.", amount: "$6,500", type: "eCom Store", time: "40 min ago", avatar: "A" },
  { name: "Tom W.", amount: "$1,750", type: "Sales Funnel", time: "43 min ago", avatar: "T" },
  { name: "Rachel D.", amount: "$4,800", type: "Agency Site", time: "46 min ago", avatar: "R" },
];

const STATS = [
  { label: "Sites Created", value: "12,847", change: "+24%", icon: <Globe size={24} />, color: "from-crux-500 to-crux-400" },
  { label: "Total Revenue", value: "$2.4M", change: "+18%", icon: <DollarSign size={24} />, color: "from-accent-green to-accent-cyan" },
  { label: "Active Users", value: "3,291", change: "+32%", icon: <Users size={24} />, color: "from-accent-pink to-accent-orange" },
  { label: "Avg. Earnings", value: "$1,840", change: "+15%", icon: <TrendingUp size={24} />, color: "from-accent-orange to-yellow-400" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [feedItems, setFeedItems] = useState(EARNINGS_FEED.slice(0, 5));
  const [feedKey, setFeedKey] = useState(0);
  const [savedWebsites, setSavedWebsites] = useState<SavedWebsite[]>([]);
  const [remaining, setRemaining] = useState(5);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const [sites, rem] = await Promise.all([
        getWebsitesForUser(user.id),
        getRemainingGenerations(user.id),
      ]);
      if (!cancelled) {
        setSavedWebsites(sites);
        setRemaining(rem);
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedItems((prev) => {
        const nextIdx = (EARNINGS_FEED.indexOf(prev[0]) + 1) % EARNINGS_FEED.length;
        const newItems = [];
        for (let i = 0; i < 5; i++) {
          newItems.push(EARNINGS_FEED[(nextIdx + i) % EARNINGS_FEED.length]);
        }
        return newItems;
      });
      setFeedKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-black">
          Welcome back, <span className="gradient-text">{user?.name?.split(" ")[0] || "User"}</span>
        </h1>
        <p className="text-gray-400 mt-1">Here&apos;s what&apos;s happening with your websites today.</p>
      </div>

      {/* Feature Video */}
      <FeatureVideo
        title="Welcome to Crux"
        subtitle="Watch this quick intro to start building websites that make money."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="card group hover:border-crux-500/30 transition-all relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] -mr-8 -mt-8 rounded-full`} />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/dashboard/wizard" className="card-hover flex items-center gap-4 group p-5 border border-gray-800/50 hover:border-crux-500/30 bg-gray-900/40 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-crux-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg shadow-crux-500/20 group-hover:scale-110 transition-all duration-500 relative z-10">
                <Wand2 size={24} className="text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg text-white">Create New Website</h3>
                <p className="text-sm text-gray-400">Launch the Web Wizard</p>
              </div>
            </Link>
            <Link href="/dashboard/marketing" className="card-hover flex items-center gap-4 group p-5 border border-gray-800/50 hover:border-accent-green/30 bg-gray-900/40 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-green to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-green/20 group-hover:scale-110 transition-all duration-500 relative z-10">
                <Zap size={24} className="text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg text-white">Generate Marketing</h3>
                <p className="text-sm text-gray-400">Create posts & messages</p>
              </div>
            </Link>
            <Link href="/dashboard/training" className="card-hover flex items-center gap-4 group p-5 border border-gray-800/50 hover:border-accent-orange/30 bg-gray-900/40 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-orange to-yellow-400 flex items-center justify-center shadow-lg shadow-accent-orange/20 group-hover:scale-110 transition-all duration-500 relative z-10">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg text-white">Training Hub</h3>
                <p className="text-sm text-gray-400">Learn to maximize revenue</p>
              </div>
            </Link>
            <Link href="/dashboard/websites" className="card-hover flex items-center gap-4 group p-5 border border-gray-800/50 hover:border-blue-500/30 bg-gray-900/40 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-500 relative z-10">
                <Settings size={24} className="text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg text-white">My Websites</h3>
                <p className="text-sm text-gray-400">
                  {savedWebsites.length > 0 ? `${savedWebsites.length} site${savedWebsites.length > 1 ? "s" : ""} · ${remaining}/5 left` : "View & edit your websites"}
                </p>
              </div>
            </Link>
          </div>

          {/* Recent Websites */}
          <div className="flex items-center justify-between mt-6">
            <h2 className="text-xl font-bold">Your Websites</h2>
            {savedWebsites.length > 0 && (
              <Link href="/dashboard/websites" className="text-sm text-crux-400 hover:text-crux-300 transition">
                View all →
              </Link>
            )}
          </div>
          {savedWebsites.length === 0 ? (
            <div className="card bg-gray-900/40 border-gray-800/50">
              <div className="text-center py-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-crux-500/5 to-transparent" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4 border border-gray-700 shadow-xl">
                    <Globe size={32} className="text-gray-500" />
                  </div>
                  <p className="font-bold text-lg text-white">No websites yet</p>
                  <p className="text-sm text-gray-400 mt-1 mb-6">Launch the Web Wizard to create your first site!</p>
                  <Link href="/dashboard/wizard" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-black uppercase tracking-widest">
                    <Plus size={16} /> Create Your First Website
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {savedWebsites.slice(0, 3).map((site) => {
                const siteTone = getToneById(site.toneId);
                return (
                  <Link key={site.id} href="/dashboard/websites" className="card-hover flex items-center gap-4 group">
                    <div
                      className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden"
                      style={{ background: siteTone.gradient }}
                    >
                      <span className="text-xs font-black text-white relative z-10">
                        {site.businessName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">{site.businessName}</h3>
                      <p className="text-xs text-gray-500">{site.categoryName} · crux.site/{site.slug}</p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {new Date(site.updatedAt).toLocaleDateString()}
                    </span>
                  </Link>
                );
              })}
              {savedWebsites.length > 3 && (
                <Link href="/dashboard/websites" className="block text-center text-sm text-crux-400 hover:text-crux-300 py-2 transition">
                  +{savedWebsites.length - 3} more website{savedWebsites.length - 3 > 1 ? "s" : ""}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Live Earnings Feed */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Live Earnings</h2>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div className="card space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Real-time user earnings</p>
            <div className="space-y-3" key={feedKey}>
              {feedItems.map((item, idx) => (
                <div
                  key={`${item.name}-${feedKey}`}
                  className="flex items-center gap-3 animate-ticker"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center text-xs font-bold shrink-0">
                    {item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.type} · {item.time}</p>
                  </div>
                  <span className="text-sm font-bold text-green-400 shrink-0">{item.amount}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800/50 pt-3 mt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Community total today</span>
                <span className="font-bold text-green-400">$47,230</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
