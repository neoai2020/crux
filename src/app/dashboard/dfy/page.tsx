"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  getWebsitesForUser, 
  updateWebsite, 
  saveWebsite, 
  SavedWebsite 
} from "@/lib/websites";
import { 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  Briefcase, 
  Zap, 
  ArrowRight,
  Sparkles,
  Search,
  Layout,
  MousePointer2
} from "lucide-react";

interface DFYSite {
  id: number;
  name: string;
  niche: string;
  description: string;
  type: "E-commerce" | "Service" | "Portfolio" | "Landing Page" | "Blog" | "Education" | "Health/Medical" | "Personal Branding" | "Corporate";
  image: string;
}

const DFY_SITES: DFYSite[] = [
  {
    id: 1,
    name: "Luxe Watches",
    niche: "Luxury E-commerce",
    description: "High-end watch shop with premium product showcases and checkout flow.",
    type: "E-commerce",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: 2,
    name: "FitFocus",
    niche: "Fitness Coaching",
    description: "A professional service site for personal trainers with booking and lead gen.",
    type: "Service",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  },
  {
    id: 3,
    name: "Urban Roast",
    niche: "Coffee Shop",
    description: "Modern landing page for a local cafe or coffee brand with menu and location.",
    type: "Landing Page",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
  },
  {
    id: 4,
    name: "Pixel Perfect",
    niche: "Design Agency",
    description: "Clean portfolio for creative agencies to showcase work and client testimonials.",
    type: "Portfolio",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 5,
    name: "Pure Health",
    niche: "Health & Medical",
    description: "Professional medical template with appointment scheduling and service lists.",
    type: "Health/Medical",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
  },
  {
    id: 6,
    name: "Mindful Living",
    niche: "Lifestyle Blog",
    description: "Stunning blog layout with categorized articles and newsletter integration.",
    type: "Blog",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  },
  {
    id: 7,
    name: "Global Edu",
    niche: "Education Platform",
    description: "LMS-style website for online courses, schools, or tutoring services.",
    type: "Education",
    image: "https://images.unsplash.com/photo-1523050335456-c38447d0d960?w=800&q=80",
  },
  {
    id: 8,
    name: "Creative Pulse",
    niche: "Personal Brand",
    description: "Sleek personal branding site for speakers, influencers, and consultants.",
    type: "Personal Branding",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
  },
  {
    id: 9,
    name: "Apex Corp",
    niche: "Corporate Business",
    description: "High-level corporate portal with multi-page support and investor relations.",
    type: "Corporate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
];

const TYPE_COLORS = {
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
      // Logic for claiming a DFY site: create a new SavedWebsite entry based on the DFY template
      const updates: any = {
        userId: user.id, // required for saveWebsite
        businessName: site.name,
        description: site.description,
        category: site.niche,
        categoryName: site.niche,
        original_dfy_id: site.id,
        status: "published",
        blueprintId: "dfy-standard",
        blueprintName: "DFY Template",
        toneId: "modern", // Default tone
        sections: [], // Empty or default sections
        sectionContents: {}, // Empty or default contents
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

  const types = ["All", "E-commerce", "Service", "Portfolio", "Landing Page", "Blog", "Education", "Health/Medical", "Personal Branding", "Corporate"];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text uppercase tracking-tight">Done-For-You Library</span>
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="border-l-2 border-accent-pink pl-4 py-1">
            <p className="text-gray-300 font-bold">180 websites already generated across the 9 website types + 200 posts per website.</p>
            <p className="text-gray-500 text-sm mt-1">Claim your professionally designed assets with one click.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-10 pb-4 overflow-x-auto no-scrollbar mask-fade-right">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${
              activeType === t 
                ? "bg-accent-pink text-white border-accent-pink shadow-xl shadow-accent-pink/20 scale-105" 
                : "bg-gray-900/60 text-gray-500 border-gray-800/80 hover:border-gray-700 hover:bg-gray-800/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSites.map((site) => {
          const isClaimed = claimedIds.has(site.id);
          const isClaiming = claimingId === site.id;
          const dbSite = websiteMap[site.id];

          return (
            <div key={site.id} className="card group p-0 overflow-hidden bg-gray-900/40 border-gray-800/50 hover:border-crux-500/30 transition-all shadow-xl hover:shadow-2xl">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={site.image} 
                  alt={site.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border backdrop-blur-md ${TYPE_COLORS[site.type]}`}>
                    {site.type}
                  </span>
                </div>
                {isClaimed && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center animate-fade-in">
                    <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                      <CheckCircle2 size={16} /> Already Claimed
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-accent-pink transition-colors">
                  {site.name}
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                  {site.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-accent-pink/30 group-hover:bg-accent-pink/5 transition-all text-gray-500 group-hover:text-accent-pink">
                      <Layout size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-tighter">Niche</p>
                      <p className="text-xs font-bold text-gray-400">{site.niche}</p>
                    </div>
                  </div>

                  {isClaimed && dbSite ? (
                    <a
                      href={`/site/${dbSite.slug}?id=${dbSite.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-crux-400 hover:text-crux-300 transition-all group/link"
                    >
                      View Live <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleClaim(site)}
                      disabled={isClaiming || isClaimed}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
                        isClaiming 
                          ? "bg-gray-800 text-gray-500 cursor-wait" 
                          : "bg-accent-pink text-white hover:bg-accent-pink/80 shadow-accent-pink/20 hover:scale-105 active:scale-95"
                      }`}
                    >
                      {isClaiming ? "Cloning..." : <>Claim Site <ArrowRight size={14} /></>}
                    </button>
                  )}
                </div>
              </div>
              
              {/* Bottom Decorative Bar */}
              <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${
                site.type === "E-commerce" ? "from-accent-pink via-accent-orange to-accent-pink" :
                site.type === "Service" ? "from-accent-green via-accent-cyan to-accent-green" :
                site.type === "Portfolio" ? "from-accent-cyan via-accent-pink to-accent-cyan" :
                "from-accent-orange via-yellow-400 to-accent-orange"
              }`} />
            </div>
          );
        })}
      </div>

      {/* Feature Section */}
      <div className="mt-20 card p-10 border-gray-800/50 bg-gradient-to-br from-gray-900/60 via-gray-900/40 to-transparent relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-pink/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-crux-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl group-hover:border-accent-pink/30 transition-all">
              <Sparkles className="text-accent-pink" size={28} />
            </div>
            <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tight">AI Optimized</h4>
            <p className="text-sm text-gray-500">Every template is pre-tuned for maximum conversion and lightning fast load times.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl group-hover:border-accent-green/30 transition-all">
              <Zap className="text-accent-green" size={28} />
            </div>
            <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Instant Deploy</h4>
            <p className="text-sm text-gray-500">Claim, clone, and launch in under 60 seconds. No hosting or configuration needed.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl group-hover:border-accent-cyan/30 transition-all">
              <MousePointer2 className="text-accent-cyan" size={28} />
            </div>
            <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Full Control</h4>
            <p className="text-sm text-gray-500">Once claimed, you have full access to edit content, products, and styles at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
