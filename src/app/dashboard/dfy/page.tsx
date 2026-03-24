"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  getWebsitesForUser, 
  saveWebsite, 
  SavedWebsite 
} from "@/lib/websites";
import { 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  Layout, 
  Zap, 
  ArrowRight,
  Sparkles,
  MousePointer2
} from "lucide-react";

interface DFYSite {
  id: number;
  name: string;
  niche: string;
  description: string;
  type: "E-commerce" | "Service" | "Portfolio" | "Landing Page" | "Blog" | "Education" | "Health/Medical" | "Personal Branding" | "Corporate";
  image: string;
  postsCount: number;
}

const SITE_TYPES = ["E-commerce", "Service", "Portfolio", "Landing Page", "Blog", "Education", "Health/Medical", "Personal Branding", "Corporate"] as const;

// Generate 180 real-feeling sites (20 per type)
const DFY_SITES: DFYSite[] = Array.from({ length: 180 }, (_, i) => {
  const type = SITE_TYPES[i % SITE_TYPES.length];
  const id = i + 1;
  const names = [
    "Luxe", "Fit", "Urban", "Pixel", "Pure", "Mindful", "Global", "Creative", "Apex", 
    "Swift", "Echo", "Zenith", "Nova", "Flux", "Core", "Orbit", "Prime", "Vibe", "Sonic", "Terra"
  ];
  const prefixes = ["Elite", "Pro", "Smart", "Next", "Ultra", "Max", "Cloud", "Fusion", "Alpha"];
  const name = `${prefixes[i % prefixes.length]} ${names[i % names.length]} ${type.split(" ")[0]} ${id}`;
  
  return {
    id,
    name,
    niche: `${type} Solutions`,
    description: `A professionally generated ${type} site with 200 high-quality SEO-optimized posts and premium design. Perfect for scaling your business instantly.`,
    type,
    image: `https://images.unsplash.com/photo-${1500000000000 + (i * 123456) % 1000000000000}?w=800&q=80`,
    postsCount: 200
  };
});

const TYPE_COLORS: Record<string, string> = {
  "E-commerce": "bg-accent-pink/10 text-accent-pink border-accent-pink/20",
  "Service": "bg-accent-green/10 text-accent-green border-accent-green/20",
  "Portfolio": "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  "Landing Page": "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
  "Blog": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Education": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Health/Medical": "bg-red-500/10 text-red-400 border-red-500/20",
  "Personal Branding": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Corporate": "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export default function DFYPage() {
  const { user } = useAuth();
  const [claimedIds, setClaimedIds] = useState<Set<number>>(new Set());
  const [claimingId, setClaimingId] = useState<number | null>(null);
  const [websiteMap, setWebsiteMap] = useState<Record<number, SavedWebsite>>({});
  const [activeType, setActiveType] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    async function fetchUserSites() {
      if (!user) return;
      const sites = await getWebsitesForUser(user.id);
      const map: Record<number, SavedWebsite> = {};
      const claimed = new Set<number>();
      
      sites.forEach(s => {
        if (s.original_dfy_id) {
          map[s.original_dfy_id] = s;
          claimed.add(s.original_dfy_id);
        }
      });
      
      setWebsiteMap(map);
      setClaimedIds(claimed);
    }
    fetchUserSites();
  }, [user]);

  const handleClaim = async (site: DFYSite) => {
    if (!user || claimingId) return;
    setClaimingId(site.id);
    try {
      const updates: any = {
        userId: user.id,
        businessName: site.name,
        description: site.description,
        category: site.niche,
        categoryName: site.niche,
        original_dfy_id: site.id,
        status: "published",
        blueprintId: "dfy-standard",
        blueprintName: "DFY Template",
        toneId: "modern",
        sections: [],
        sectionContents: {},
        productLink: "",
        logo: "",
        notes: "Claimed from Done-For-You library",
        email: user.email || "",
      };
      
      const result = await saveWebsite(updates);
      
      if (result) {
        setClaimedIds(prev => {
          const next = new Set(prev);
          next.add(site.id);
          return next;
        });
        setWebsiteMap(prev => ({ ...prev, [site.id]: result }));
      }
    } catch (err) {
      console.error("Error claiming site:", err);
    } finally {
      setClaimingId(null);
    }
  };

  const filteredSites = activeType === "All" 
    ? DFY_SITES 
    : DFY_SITES.filter(s => s.type === activeType);

  const displayedSites = filteredSites.slice(0, visibleCount);
  const types = ["All", ...SITE_TYPES];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text uppercase tracking-tight">Done-For-You Library</span>
        </h1>
        <div className="border-l-4 border-accent-pink pl-6 py-2 bg-accent-pink/5 rounded-r-2xl">
          <p className="text-gray-200 text-xl font-black">{DFY_SITES.length} websites already generated across the {SITE_TYPES.length} website types + 200 posts per website.</p>
          <p className="text-gray-500 mt-1 font-medium">Claim your high-authority digital assets instantly.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-10 pb-4 overflow-x-auto no-scrollbar mask-fade-right">
        {types.map(t => (
          <button
            key={t}
            onClick={() => {
              setActiveType(t);
              setVisibleCount(12);
            }}
            className={`whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
              activeType === t 
                ? "bg-accent-pink text-white border-accent-pink shadow-xl shadow-accent-pink/30 scale-105 z-10" 
                : "bg-gray-900/60 text-gray-500 border-gray-800 hover:border-gray-700 hover:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedSites.map((site) => {
          const isClaimed = claimedIds.has(site.id);
          const isClaiming = claimingId === site.id;
          const dbSite = websiteMap[site.id];

          return (
            <div key={site.id} className="card group p-0 overflow-hidden bg-gray-900/40 border-gray-800/50 hover:border-crux-500/30 transition-all shadow-xl hover:shadow-2xl flex flex-col">
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={site.image} 
                  alt={site.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border backdrop-blur-md ${TYPE_COLORS[site.type]}`}>
                    {site.type}
                  </span>
                </div>
                {isClaimed && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center animate-fade-in">
                    <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                      <CheckCircle2 size={18} /> Already Claimed
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-accent-pink transition-colors truncate flex-1 pr-2">
                    {site.name}
                  </h3>
                  <div className="shrink-0 flex items-center gap-1.5 bg-crux-500/10 text-crux-400 px-3 py-1 rounded-xl border border-crux-500/20 text-[10px] font-black uppercase tracking-widest shadow-sm">
                    <Zap size={12} className="fill-crux-500" /> 200 POSTS
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-8 line-clamp-3 leading-relaxed">
                  {site.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-accent-pink/30 group-hover:bg-accent-pink/5 transition-all text-gray-400 group-hover:text-accent-pink shadow-inner">
                      <Layout size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-tighter">Niche Area</p>
                      <p className="text-xs font-bold text-gray-300">{site.niche}</p>
                    </div>
                  </div>

                  {isClaimed && dbSite ? (
                    <a
                      href={`/site/${dbSite.slug}?id=${dbSite.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-crux-400 hover:text-crux-200 transition-all group/link bg-crux-500/5 px-4 py-2 rounded-xl border border-crux-500/10 hover:border-crux-500/30"
                    >
                      View <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleClaim(site)}
                      disabled={isClaiming || isClaimed}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl ${
                        isClaiming 
                          ? "bg-gray-800 text-gray-500 cursor-wait" 
                          : "bg-accent-pink text-white hover:bg-accent-pink/80 shadow-accent-pink/30 hover:scale-105 active:scale-95"
                      }`}
                    >
                      {isClaiming ? "Cloning..." : <>Claim Site <ArrowRight size={14} /></>}
                    </button>
                  )}
                </div>
              </div>
              
              {/* Decorative bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r opacity-30 ${
                site.type === "E-commerce" ? "from-accent-pink via-accent-orange to-accent-pink" :
                site.type === "Service" ? "from-accent-green via-accent-cyan to-accent-green" :
                site.type === "Portfolio" ? "from-accent-cyan via-accent-pink to-accent-cyan" :
                "from-accent-orange via-yellow-400 to-accent-orange"
              }`} />
            </div>
          );
        })}
      </div>

      {visibleCount < filteredSites.length && (
        <div className="mt-16 text-center">
          <button 
            onClick={() => setVisibleCount(prev => Math.min(prev + 12, filteredSites.length))}
            className="px-14 py-5 rounded-3xl bg-gray-900 border border-gray-800 text-gray-400 font-black uppercase tracking-widest hover:border-crux-500 hover:text-crux-400 transition-all shadow-2xl hover:scale-105 active:scale-95 group"
          >
            Load More Assets <span className="text-gray-600 mx-2">|</span> <span className="text-crux-500 font-black">{filteredSites.length - visibleCount} remaining</span>
          </button>
        </div>
      )}

      {/* Feature Section */}
      <div className="mt-24 card p-12 border-gray-800/50 bg-gradient-to-br from-gray-900/80 via-gray-900/40 to-transparent relative overflow-hidden rounded-3xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-pink/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-crux-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 grid md:grid-cols-3 gap-12">
          <div className="text-center group/feature">
            <div className="w-16 h-16 rounded-3xl bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl group-hover/feature:border-accent-pink/50 group-hover/feature:bg-accent-pink/5 transition-all duration-500 group-hover/feature:scale-110">
              <Sparkles className="text-accent-pink" size={32} />
            </div>
            <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">AI Optimized</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Every template is pre-tuned for maximum conversion and lightning fast load times.</p>
          </div>
          <div className="text-center group/feature">
            <div className="w-16 h-16 rounded-3xl bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl group-hover/feature:border-accent-green/50 group-hover/feature:bg-accent-green/5 transition-all duration-500 group-hover/feature:scale-110">
              <Zap className="text-accent-green" size={32} />
            </div>
            <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">Instant Deploy</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Claim, clone, and launch in under 60 seconds. No hosting or configuration needed.</p>
          </div>
          <div className="text-center group/feature">
            <div className="w-16 h-16 rounded-3xl bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl group-hover/feature:border-accent-cyan/50 group-hover/feature:bg-accent-cyan/5 transition-all duration-500 group-hover/feature:scale-110">
              <MousePointer2 className="text-accent-cyan" size={32} />
            </div>
            <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">Full Control</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Once claimed, you have full access to edit content, products, and styles at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
