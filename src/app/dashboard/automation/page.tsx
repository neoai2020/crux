"use client";
import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import PremiumGate from "@/components/PremiumGate";
import {
  Zap,
  Search,
  Globe,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Copy,
  Share2,
  Sparkles,
} from "lucide-react";

/* ─── types ─── */
type SourceType = "FORUM" | "SOCIAL" | "Q&A" | "BLOG" | "VIDEO" | "DIRECTORY";
interface TrafficSource {
  id: number;
  name: string;
  type: SourceType;
  traffic: string;
  time: string;
  niche: string;
  steps: string[];
  snippet: string;
}

/* ─── niche config ─── */
const NICHES = [
  { label: "All", emoji: "" },
  { label: "Weight Loss", emoji: "\uD83D\uDD25" },
  { label: "Make Money Online", emoji: "\uD83D\uDCCA" },
  { label: "Health & Fitness", emoji: "\u2728" },
  { label: "Beauty & Skincare", emoji: "\uD83D\uDC84" },
  { label: "Pets", emoji: "\uD83D\uDC3E" },
  { label: "Home & Garden", emoji: "\uD83C\uDFE1" },
];

/* ─── 70 traffic sources (10 per niche) ─── */
const ALL_SOURCES: TrafficSource[] = [
  // ── Weight Loss (10) ──
  { id: 1, name: "MyFitnessPal Community", type: "FORUM", traffic: "200-500/mo", time: "10 min", niche: "Weight Loss", steps: ["Join the community and introduce yourself", "Research popular threads in this niche", "Write a value-driven response", "Add your synced affiliate link naturally"], snippet: "" },
  { id: 2, name: "LoseIt Reddit", type: "SOCIAL", traffic: "300-800/mo", time: "5 min", niche: "Weight Loss", steps: ["Find trending posts in r/loseit", "Write a helpful comment with personal insight", "Mention a resource that helped you", "Include your link in your profile or naturally in the reply"], snippet: "" },
  { id: 3, name: "Weight Loss Facebook Groups", type: "SOCIAL", traffic: "250-700/mo", time: "15 min", niche: "Weight Loss", steps: ["Join 3-5 active weight loss groups", "Engage with recent posts for a few days", "Share a value post with your journey or tips", "Add your link as a helpful resource"], snippet: "" },
  { id: 4, name: "Quora Weight Loss", type: "Q&A", traffic: "300-900/mo", time: "10 min", niche: "Weight Loss", steps: ["Search for popular weight loss questions", "Write a detailed, helpful answer", "Reference your experience or a system you use", "Place your affiliate link as a recommendation"], snippet: "" },
  { id: 5, name: "r/WeightLossAdvice", type: "SOCIAL", traffic: "200-600/mo", time: "5 min", niche: "Weight Loss", steps: ["Browse new posts asking for advice", "Give actionable, specific tips", "Share what worked for you or others", "Add your link in context"], snippet: "" },
  { id: 6, name: "SparkPeople Forums", type: "FORUM", traffic: "150-400/mo", time: "10 min", niche: "Weight Loss", steps: ["Create a profile and intro post", "Respond to threads about diet struggles", "Offer encouragement and real advice", "Link to your resource as a helpful tool"], snippet: "" },
  { id: 7, name: "Calorie Count Forum", type: "FORUM", traffic: "100-300/mo", time: "10 min", niche: "Weight Loss", steps: ["Sign up and browse active threads", "Reply to questions about calorie tracking", "Share a useful tip or hack", "Include your link naturally"], snippet: "" },
  { id: 8, name: "Diet & Weight Loss Tumblr", type: "BLOG", traffic: "200-500/mo", time: "8 min", niche: "Weight Loss", steps: ["Create a Tumblr blog around weight loss", "Reblog popular content and add your take", "Post original tips with your link", "Use relevant hashtags for discovery"], snippet: "" },
  { id: 9, name: "3 Fat Chicks Forum", type: "FORUM", traffic: "150-350/mo", time: "10 min", niche: "Weight Loss", steps: ["Register and introduce yourself", "Find threads about starting a weight loss journey", "Share empathetic and practical advice", "Include your link as a recommendation"], snippet: "" },
  { id: 10, name: "Weight Loss Pinterest Boards", type: "SOCIAL", traffic: "400-1k/mo", time: "12 min", niche: "Weight Loss", steps: ["Create pins with weight loss tips", "Link each pin to your affiliate content", "Join group boards in the weight loss niche", "Pin consistently 5-10 pins per day"], snippet: "" },

  // ── Make Money Online (10) ──
  { id: 11, name: "Warrior Forum", type: "FORUM", traffic: "500-1.5k/mo", time: "15 min", niche: "Make Money Online", steps: ["Create a Warrior Forum account", "Post value in the main discussion area", "Share a case study or success story", "Add your link in your signature or post"], snippet: "" },
  { id: 12, name: "BlackHatWorld", type: "FORUM", traffic: "1k-3k/mo", time: "20 min", niche: "Make Money Online", steps: ["Sign up and read the forum rules", "Contribute to threads in your sub-niche", "Share a unique strategy or tool", "Link to your resource in your signature"], snippet: "" },
  { id: 13, name: "r/PassiveIncome", type: "SOCIAL", traffic: "500-1k/mo", time: "10 min", niche: "Make Money Online", steps: ["Browse hot posts on r/PassiveIncome", "Reply with actionable income ideas", "Reference tools or systems you recommend", "Add your link as a helpful resource"], snippet: "" },
  { id: 14, name: "LinkedIn Marketing Groups", type: "SOCIAL", traffic: "300-800/mo", time: "15 min", niche: "Make Money Online", steps: ["Join marketing and entrepreneur groups", "Share thought-leadership posts", "Comment on trending discussions", "Include your link in posts or comments"], snippet: "" },
  { id: 15, name: "YouTube Comment Automation", type: "SOCIAL", traffic: "500-2k/mo", time: "15 min", niche: "Make Money Online", steps: ["Find trending make-money videos", "Leave insightful, value-adding comments", "Mention your resource naturally", "Include a link in your channel about section"], snippet: "" },
  { id: 16, name: "Facebook Ad Community", type: "SOCIAL", traffic: "400-1k/mo", time: "12 min", niche: "Make Money Online", steps: ["Join Facebook advertising groups", "Help others with ad optimization tips", "Share your results or a case study", "Link to your resource when relevant"], snippet: "" },
  { id: 17, name: "Quora Money Spaces", type: "Q&A", traffic: "400-1.2k/mo", time: "10 min", niche: "Make Money Online", steps: ["Find money-making questions on Quora", "Write detailed, experience-based answers", "Recommend tools and systems", "Add your affiliate link naturally"], snippet: "" },
  { id: 18, name: "Instagram Business Network", type: "SOCIAL", traffic: "300-800/mo", time: "10 min", niche: "Make Money Online", steps: ["Set up a business-focused Instagram profile", "Post tips and carousel content", "Engage with followers in DMs and comments", "Link in bio to your affiliate offer"], snippet: "" },
  { id: 19, name: "TikTok Side Hustle Community", type: "SOCIAL", traffic: "1k-10k/mo", time: "10 min", niche: "Make Money Online", steps: ["Create short-form money tips content", "Use trending sounds and hashtags", "Engage with other side hustle creators", "Drive traffic to your link in bio"], snippet: "" },
  { id: 20, name: "Indie Hackers", type: "FORUM", traffic: "200-500/mo", time: "15 min", niche: "Make Money Online", steps: ["Create a profile showcasing your project", "Share milestones and revenue updates", "Comment on other makers' posts", "Link to your product or affiliate offer"], snippet: "" },

  // ── Health & Fitness (10) ──
  { id: 21, name: "Bodybuilding.com Forums", type: "FORUM", traffic: "500-1.5k/mo", time: "15 min", niche: "Health & Fitness", steps: ["Create an account and fill out your profile", "Engage in supplement and workout threads", "Share your fitness routine or results", "Add your link as a resource recommendation"], snippet: "" },
  { id: 22, name: "r/Fitness", type: "SOCIAL", traffic: "800-2k/mo", time: "5 min", niche: "Health & Fitness", steps: ["Browse popular posts in r/Fitness", "Answer questions about routines or nutrition", "Share evidence-based advice", "Reference your resource in context"], snippet: "" },
  { id: 23, name: "Fitness Facebook Groups", type: "SOCIAL", traffic: "300-800/mo", time: "15 min", niche: "Health & Fitness", steps: ["Join 3-5 active fitness groups", "Post workout tips and motivation", "Engage with members' posts", "Share your link as a helpful tool"], snippet: "" },
  { id: 24, name: "Quora Fitness Topics", type: "Q&A", traffic: "400-1k/mo", time: "10 min", niche: "Health & Fitness", steps: ["Find popular fitness and health questions", "Write comprehensive, expert-level answers", "Cite your experience and results", "Include your link as a recommendation"], snippet: "" },
  { id: 25, name: "T-Nation Forums", type: "FORUM", traffic: "300-700/mo", time: "12 min", niche: "Health & Fitness", steps: ["Register and read community guidelines", "Contribute to training and nutrition threads", "Share your personal training insights", "Link to your resource when relevant"], snippet: "" },
  { id: 26, name: "Fitness Pinterest", type: "SOCIAL", traffic: "500-1.5k/mo", time: "10 min", niche: "Health & Fitness", steps: ["Create workout and health tip pins", "Join group boards in health & fitness", "Pin consistently with keyword-rich descriptions", "Link each pin to your affiliate content"], snippet: "" },
  { id: 27, name: "Nerd Fitness Community", type: "FORUM", traffic: "200-500/mo", time: "10 min", niche: "Health & Fitness", steps: ["Join the community and introduce yourself", "Participate in challenge threads", "Share beginner-friendly fitness tips", "Add your link as a helpful resource"], snippet: "" },
  { id: 28, name: "YouTube Fitness Comments", type: "VIDEO", traffic: "400-1.2k/mo", time: "10 min", niche: "Health & Fitness", steps: ["Find trending fitness and workout videos", "Leave thoughtful, value-adding comments", "Share additional tips in your comment", "Reference your resource naturally"], snippet: "" },
  { id: 29, name: "r/HealthyFood", type: "SOCIAL", traffic: "200-600/mo", time: "5 min", niche: "Health & Fitness", steps: ["Browse popular healthy eating posts", "Share recipes or meal prep tips", "Engage with comments on your posts", "Include your link when sharing advice"], snippet: "" },
  { id: 30, name: "Fitbit Community", type: "FORUM", traffic: "250-600/mo", time: "10 min", niche: "Health & Fitness", steps: ["Join the Fitbit community forums", "Help users with fitness tracking questions", "Share your fitness journey highlights", "Link to your resource naturally"], snippet: "" },

  // ── Beauty & Skincare (10) ──
  { id: 31, name: "r/SkincareAddiction", type: "SOCIAL", traffic: "800-2k/mo", time: "5 min", niche: "Beauty & Skincare", steps: ["Browse trending skincare questions", "Share evidence-based skincare advice", "Recommend products from experience", "Add your link in helpful context"], snippet: "" },
  { id: 32, name: "MakeupAlley Forums", type: "FORUM", traffic: "300-700/mo", time: "10 min", niche: "Beauty & Skincare", steps: ["Create an account and review products", "Engage in skincare routine discussions", "Share your personal routine", "Link to your resource as a recommendation"], snippet: "" },
  { id: 33, name: "Beauty Facebook Groups", type: "SOCIAL", traffic: "250-700/mo", time: "15 min", niche: "Beauty & Skincare", steps: ["Join active beauty and skincare groups", "Post before/after results or tips", "Engage with members' questions", "Share your link when it adds value"], snippet: "" },
  { id: 34, name: "Quora Beauty Topics", type: "Q&A", traffic: "300-800/mo", time: "10 min", niche: "Beauty & Skincare", steps: ["Search for popular beauty questions", "Write detailed, product-recommendation answers", "Share your personal skincare journey", "Include your affiliate link naturally"], snippet: "" },
  { id: 35, name: "r/MakeupAddiction", type: "SOCIAL", traffic: "500-1.2k/mo", time: "5 min", niche: "Beauty & Skincare", steps: ["Share makeup looks and tutorials", "Comment on trending posts with tips", "Recommend tools and products", "Add your link in context"], snippet: "" },
  { id: 36, name: "Beauty Pinterest Boards", type: "SOCIAL", traffic: "600-2k/mo", time: "10 min", niche: "Beauty & Skincare", steps: ["Create beauty and skincare tip pins", "Join group boards in the beauty niche", "Use keyword-rich pin descriptions", "Link each pin to your affiliate content"], snippet: "" },
  { id: 37, name: "Sephora Beauty Insider", type: "FORUM", traffic: "400-1k/mo", time: "12 min", niche: "Beauty & Skincare", steps: ["Join the Beauty Insider community", "Review products and share routines", "Help others pick the right products", "Mention your resource naturally"], snippet: "" },
  { id: 38, name: "TikTok Beauty Community", type: "SOCIAL", traffic: "1k-5k/mo", time: "10 min", niche: "Beauty & Skincare", steps: ["Create short beauty tips and routine videos", "Use trending sounds and beauty hashtags", "Engage with beauty creator comments", "Drive traffic to your bio link"], snippet: "" },
  { id: 39, name: "YouTube Beauty Comments", type: "VIDEO", traffic: "300-900/mo", time: "8 min", niche: "Beauty & Skincare", steps: ["Find popular beauty tutorial videos", "Leave helpful, detailed comments", "Share your additional product tips", "Reference your link naturally"], snippet: "" },
  { id: 40, name: "EssentialDay Spa Forum", type: "FORUM", traffic: "150-400/mo", time: "10 min", niche: "Beauty & Skincare", steps: ["Register and browse active discussions", "Share spa and skincare at-home tips", "Engage with other members' routines", "Include your link as a resource"], snippet: "" },

  // ── Pets (10) ──
  { id: 41, name: "r/Dogs", type: "SOCIAL", traffic: "500-1.5k/mo", time: "5 min", niche: "Pets", steps: ["Browse popular posts in r/Dogs", "Answer questions about dog care and training", "Share your experience as a pet owner", "Add your link when recommending resources"], snippet: "" },
  { id: 42, name: "DogForum.com", type: "FORUM", traffic: "200-500/mo", time: "10 min", niche: "Pets", steps: ["Create an account and intro post", "Contribute to health and training threads", "Share useful tips from experience", "Link to your resource naturally"], snippet: "" },
  { id: 43, name: "Pet Facebook Groups", type: "SOCIAL", traffic: "300-800/mo", time: "15 min", niche: "Pets", steps: ["Join 3-5 active pet owner groups", "Share helpful posts about pet care", "Engage with members' questions and photos", "Include your link when it adds value"], snippet: "" },
  { id: 44, name: "Quora Pet Topics", type: "Q&A", traffic: "300-900/mo", time: "10 min", niche: "Pets", steps: ["Find popular pet care questions", "Write detailed, helpful answers", "Share personal pet stories", "Add your affiliate link naturally"], snippet: "" },
  { id: 45, name: "r/Cats", type: "SOCIAL", traffic: "400-1k/mo", time: "5 min", niche: "Pets", steps: ["Browse trending cat care posts", "Share advice on cat behavior and health", "Engage with the community regularly", "Reference your resource in context"], snippet: "" },
  { id: 46, name: "Pet Pinterest Boards", type: "SOCIAL", traffic: "500-1.5k/mo", time: "10 min", niche: "Pets", steps: ["Create pet care and tips pins", "Join group boards in the pets niche", "Pin consistently with good descriptions", "Link pins to your affiliate content"], snippet: "" },
  { id: 47, name: "The Cat Site Forum", type: "FORUM", traffic: "200-600/mo", time: "10 min", niche: "Pets", steps: ["Register and browse cat care threads", "Help others with cat health questions", "Share your experience as a cat owner", "Add your link as a helpful resource"], snippet: "" },
  { id: 48, name: "YouTube Pet Videos Comments", type: "VIDEO", traffic: "400-1.2k/mo", time: "8 min", niche: "Pets", steps: ["Find trending pet care and training videos", "Leave insightful, helpful comments", "Share additional care tips", "Reference your resource naturally"], snippet: "" },
  { id: 49, name: "TikTok Pet Community", type: "SOCIAL", traffic: "800-5k/mo", time: "10 min", niche: "Pets", steps: ["Create short pet tips and cute content", "Use trending pet hashtags and sounds", "Engage with other pet creators", "Drive traffic to your bio link"], snippet: "" },
  { id: 50, name: "PetCoach Community", type: "FORUM", traffic: "150-400/mo", time: "10 min", niche: "Pets", steps: ["Join and browse pet health threads", "Provide helpful advice to pet owners", "Share your experience and knowledge", "Include your link when relevant"], snippet: "" },

  // ── Home & Garden (10) ──
  { id: 51, name: "GardenWeb Forums", type: "FORUM", traffic: "300-800/mo", time: "10 min", niche: "Home & Garden", steps: ["Register and explore active threads", "Share gardening tips and seasonal advice", "Help beginners with plant care questions", "Link to your resource naturally"], snippet: "" },
  { id: 52, name: "r/HomeImprovement", type: "SOCIAL", traffic: "500-1.5k/mo", time: "5 min", niche: "Home & Garden", steps: ["Browse popular home improvement posts", "Share DIY tips and project advice", "Comment with detailed, helpful responses", "Add your link in context"], snippet: "" },
  { id: 53, name: "Home & Garden Facebook Groups", type: "SOCIAL", traffic: "300-700/mo", time: "15 min", niche: "Home & Garden", steps: ["Join active home and garden groups", "Share project photos and tips", "Engage with members' questions", "Include your link as a helpful tool"], snippet: "" },
  { id: 54, name: "Quora Home & Garden", type: "Q&A", traffic: "300-900/mo", time: "10 min", niche: "Home & Garden", steps: ["Find popular home and garden questions", "Write comprehensive, practical answers", "Share your personal project experience", "Include your affiliate link naturally"], snippet: "" },
  { id: 55, name: "r/Gardening", type: "SOCIAL", traffic: "400-1k/mo", time: "5 min", niche: "Home & Garden", steps: ["Browse trending gardening posts", "Share seasonal tips and plant advice", "Engage with the community regularly", "Reference your resource in context"], snippet: "" },
  { id: 56, name: "Home & Garden Pinterest", type: "SOCIAL", traffic: "600-2k/mo", time: "10 min", niche: "Home & Garden", steps: ["Create DIY and garden inspiration pins", "Join group boards in home & garden", "Use keyword-rich descriptions", "Link each pin to your affiliate content"], snippet: "" },
  { id: 57, name: "Houzz Community", type: "FORUM", traffic: "400-1k/mo", time: "12 min", niche: "Home & Garden", steps: ["Create a Houzz profile", "Contribute to home design discussions", "Share remodel tips and inspiration", "Link to your resource when relevant"], snippet: "" },
  { id: 58, name: "YouTube DIY Comments", type: "VIDEO", traffic: "300-900/mo", time: "8 min", niche: "Home & Garden", steps: ["Find popular DIY and garden videos", "Leave detailed, helpful comments", "Share additional project tips", "Reference your link naturally"], snippet: "" },
  { id: 59, name: "TikTok Home & Garden", type: "SOCIAL", traffic: "800-5k/mo", time: "10 min", niche: "Home & Garden", steps: ["Create short home and garden tips content", "Use trending DIY hashtags", "Engage with home improvement creators", "Drive traffic to your bio link"], snippet: "" },
  { id: 60, name: "The Garden Helper Forum", type: "FORUM", traffic: "150-400/mo", time: "10 min", niche: "Home & Garden", steps: ["Join and browse gardening threads", "Help beginners with plant questions", "Share seasonal gardening schedules", "Include your link as a resource"], snippet: "" },
];

/* ─── helpers ─── */
function generateSnippet(source: TrafficSource, link: string): string {
  return `"Hey! Looking at the discussion, I found this system to be a game-changer for ${source.niche}. It really simplified my workflow. You can check it out here: ${link} \u2013 Hope it helps!"`;
}

const TYPE_COLORS: Record<SourceType, string> = {
  FORUM: "bg-crux-500/20 text-crux-300",
  SOCIAL: "bg-accent-pink/20 text-accent-pink",
  "Q&A": "bg-accent-cyan/20 text-accent-cyan",
  BLOG: "bg-accent-orange/20 text-accent-orange",
  VIDEO: "bg-red-500/20 text-red-400",
  DIRECTORY: "bg-accent-green/20 text-accent-green",
};

/* ─── source card ─── */
function SourceCard({
  source,
  affiliateLink,
  done,
  onToggleDone,
}: {
  source: TrafficSource;
  affiliateLink: string;
  done: boolean;
  onToggleDone: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(source, affiliateLink);

  const copySnippet = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`card border-gray-800/50 transition-all ${
        done ? "opacity-60 border-accent-green/30" : "hover:border-crux-500/30"
      }`}
    >
      {/* header row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 text-left"
      >
        {/* checkbox */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleDone();
          }}
          className={`w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
            done
              ? "bg-accent-green border-accent-green"
              : "border-gray-600 hover:border-crux-400"
          }`}
        >
          {done && <CheckCircle2 size={14} className="text-white" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white">{source.name}</span>
            <span
              className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md uppercase ${
                TYPE_COLORS[source.type]
              }`}
            >
              {source.type}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-crux-400" />
              {source.traffic}
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-accent-orange" />
              {source.time}
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1">
              <Globe size={12} className="text-gray-500" />
              {source.niche}
            </span>
          </div>
        </div>

        {open ? (
          <ChevronUp size={18} className="text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-500 flex-shrink-0" />
        )}
      </button>

      {/* expandable content */}
      {open && (
        <div className="mt-5 pt-5 border-t border-gray-800/50 grid md:grid-cols-2 gap-6 animate-fade-in">
          {/* execution steps */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3 flex items-center gap-2">
              <Zap size={14} className="text-accent-orange" />
              Execution Steps
            </h4>
            <ol className="space-y-2">
              {source.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-crux-400 font-bold">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* marketing snippet */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-accent-green" />
              Marketing Snippet
            </h4>
            <div className="relative bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-sm text-gray-300 font-mono leading-relaxed">
              {snippet}
              <button
                onClick={copySnippet}
                className="absolute top-3 right-3 text-gray-500 hover:text-crux-400 transition-colors"
                title="Copy snippet"
              >
                {copied ? (
                  <CheckCircle2 size={16} className="text-accent-green" />
                ) : (
                  <Share2 size={16} />
                )}
              </button>
            </div>
          </div>

          {/* action buttons */}
          <div className="md:col-span-2 flex gap-3 flex-wrap">
            <button
              onClick={onToggleDone}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                done
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "btn-primary"
              }`}
            >
              {done ? "UNDO" : "MARK AS DONE"}
            </button>
            <button
              onClick={copySnippet}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              <Copy size={14} />
              {copied ? "COPIED!" : "COPY SNIPPET"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── main page ─── */
export default function AutomationPage() {
  const { user } = useAuth();
  const hasAccess = user?.features?.includes("automation");

  const [activeNiche, setActiveNiche] = useState("All");
  const [search, setSearch] = useState("");
  const [affiliateLink, setAffiliateLink] = useState(
    "https://your-affiliate-link.com/ref=you"
  );
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  const filteredSources = useMemo(() => {
    let list = ALL_SOURCES;
    if (activeNiche !== "All") list = list.filter((s) => s.niche === activeNiche);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.niche.toLowerCase().includes(q) ||
          s.type.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeNiche, search]);

  const nicheCounts = useMemo(() => {
    const map: Record<string, number> = { All: ALL_SOURCES.length };
    ALL_SOURCES.forEach((s) => {
      map[s.niche] = (map[s.niche] || 0) + 1;
    });
    return map;
  }, []);

  if (!hasAccess) return <PremiumGate feature="automation" />;

  const totalSources = ALL_SOURCES.length;
  const completedCount = completedIds.size;
  const pct = Math.round((completedCount / totalSources) * 100);

  const toggleDone = (id: number) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* ── header ── */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg shadow-crux-500/20">
          <Zap size={20} className="text-white" />
        </div>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">Automation Traffic Machine</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-8 tracking-wide text-sm uppercase">
        Post once. Get traffic forever. {totalSources} free traffic sources with
        step-by-step instructions.
      </p>

      {/* ── hero stats card ── */}
      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={18} className="text-crux-400" />
                <h2 className="text-xl font-bold text-white">
                  Your Traffic Automation
                </h2>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Set up these {totalSources} sources and watch visitors flow in
                &mdash; forever.
              </p>
            </div>
            <div className="bg-gray-800/80 border border-gray-700/50 rounded-xl px-4 py-2 text-right">
              <span className="text-[10px] uppercase tracking-widest text-crux-400 font-bold">
                Status
              </span>
              <div className="text-sm font-bold text-white">
                {completedCount} of {totalSources} Sources Launched
              </div>
            </div>
          </div>

          {/* stat boxes */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-5 text-center">
              <div className="text-3xl font-black gradient-text">
                {totalSources}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                Free Traffic Sources
              </div>
            </div>
            <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-5 text-center">
              <div className="text-3xl font-black gradient-text">
                {NICHES.length - 1}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                Profitable Niches
              </div>
            </div>
            <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-5 text-center">
              <div className="text-3xl font-black gradient-text">200&ndash;1k</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                Visitors/Mo Per Source
              </div>
            </div>
          </div>

          {/* social proof */}
          <div className="bg-gradient-to-r from-crux-500/10 to-accent-pink/10 border border-crux-500/20 rounded-xl px-5 py-3 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-crux-400 to-accent-pink border-2 border-gray-900"
                />
              ))}
            </div>
            <span className="text-xs uppercase tracking-widest">
              <span className="text-crux-300">Members submitted to</span>{" "}
              <span className="font-bold text-white">847,290+</span>{" "}
              <span className="text-accent-pink">traffic sources this month</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── how it works ── */}
      <h2 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
        How It Works &mdash; 3 Simple Steps
      </h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            n: "01",
            title: "Pick a Source",
            desc: `Choose from ${totalSources} high-volume traffic sources in your niche.`,
          },
          {
            n: "02",
            title: "Follow Steps",
            desc: "Each source has clear, numbered instructions to follow.",
          },
          {
            n: "03",
            title: "Paste Snippet",
            desc: "Copy the synced marketing message and post it instantly.",
          },
        ].map((s) => (
          <div
            key={s.n}
            className="card border-gray-800/50 hover:border-crux-500/30 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center text-sm font-black text-white mb-4">
              {s.n}
            </div>
            <h3 className="font-bold text-white mb-1">{s.title}</h3>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── search & affiliate link ── */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search traffic sources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Globe
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="https://your-affiliate-link.com/ref=you"
            value={affiliateLink}
            onChange={(e) => setAffiliateLink(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* ── niche tabs ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {NICHES.map((n) => {
          const count = nicheCounts[n.label] || 0;
          const active = activeNiche === n.label;
          return (
            <button
              key={n.label}
              onClick={() => setActiveNiche(n.label)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active
                  ? "bg-gradient-to-r from-crux-500 to-accent-pink text-white shadow-lg shadow-crux-500/20"
                  : "bg-gray-800/60 text-gray-400 border border-gray-700/50 hover:border-crux-500/30 hover:text-white"
              }`}
            >
              {n.emoji && <span>{n.emoji}</span>}
              {n.label}
              <span
                className={`text-xs ${
                  active ? "text-white/80" : "text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── progress bar ── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Progress:{" "}
            <span className="font-bold text-white">{completedCount}</span> of{" "}
            {totalSources} Sources Completed
          </span>
          <span className="text-sm font-bold text-crux-400">{pct}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-crux-500 to-accent-pink rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* ── source list ── */}
      <div className="space-y-3">
        {filteredSources.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            affiliateLink={affiliateLink}
            done={completedIds.has(source.id)}
            onToggleDone={() => toggleDone(source.id)}
          />
        ))}
        {filteredSources.length === 0 && (
          <div className="card text-center py-12 text-gray-500">
            No traffic sources found. Try a different search or niche.
          </div>
        )}
      </div>
    </div>
  );
}
