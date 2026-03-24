"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Check, ExternalLink, Loader2 } from "lucide-react";

type SiteType =
  | "functional"
  | "blog"
  | "sales-funnel"
  | "landing"
  | "dropship"
  | "agency"
  | "ads"
  | "local"
  | "portfolio";

interface DFYSite {
  id: number;
  name: string;
  niche: string;
  type: SiteType;
  desc: string;
}

const TYPE_LABELS: Record<SiteType, string> = {
  functional: "Functional",
  blog: "Blog",
  "sales-funnel": "Sales Funnel",
  landing: "Landing Page",
  dropship: "Dropship",
  agency: "Agency",
  ads: "Ad Site",
  local: "Local Business",
  portfolio: "Portfolio",
};

const TYPE_COLORS: Record<SiteType, string> = {
  functional: "bg-crux-500/20 text-crux-400 border-crux-500/30",
  blog: "bg-green-500/20 text-green-400 border-green-500/30",
  "sales-funnel": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  landing: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  dropship: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  agency: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  ads: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  local: "bg-red-500/20 text-red-400 border-red-500/30",
  portfolio: "bg-teal-500/20 text-teal-400 border-teal-500/30",
};

function makeSites(
  type: SiteType,
  items: { name: string; niche: string; desc: string }[],
  startId: number
): DFYSite[] {
  return items.map((item, i) => ({ id: startId + i, type, ...item }));
}

const DFY_SITES: DFYSite[] = [
  // Functional (20)
  ...makeSites("functional", [
    { name: "CalorieTrack Pro", niche: "Health", desc: "Calorie and macro calculator tool" },
    { name: "BudgetBoss", niche: "Finance", desc: "Monthly budget planner tool" },
    { name: "FitnessPlanr", niche: "Fitness", desc: "Custom workout plan generator" },
    { name: "SleepScore App", niche: "Wellness", desc: "Sleep quality tracker and tips" },
    { name: "MindfulMoments", niche: "Mental Health", desc: "Daily meditation and breathwork tool" },
    { name: "CareerPath AI", niche: "Career", desc: "Resume builder and job match tool" },
    { name: "InvestCalc", niche: "Investing", desc: "Compound interest and ROI calculator" },
    { name: "RecipeMaster", niche: "Food", desc: "Smart recipe finder by ingredients" },
    { name: "VocabBoost", niche: "Education", desc: "Language learning flashcard tool" },
    { name: "TravelPlannr", niche: "Travel", desc: "AI-powered trip itinerary builder" },
    { name: "GreenHome Guide", niche: "Eco Living", desc: "Home energy savings calculator" },
    { name: "PetHealth Checker", niche: "Pets", desc: "Pet symptom checker and vet finder" },
    { name: "HomeValue Estimator", niche: "Real Estate", desc: "Property value estimator tool" },
    { name: "LoanCompare", niche: "Finance", desc: "Loan rate comparison calculator" },
    { name: "ParentingTracker", niche: "Parenting", desc: "Child development milestone tracker" },
    { name: "StudyBuddy", niche: "Education", desc: "Pomodoro study timer and notes" },
    { name: "GardenPlanner", niche: "Gardening", desc: "Plant spacing and growth planner" },
    { name: "HabitStack", niche: "Productivity", desc: "Daily habit builder and streak tracker" },
    { name: "MoodMap", niche: "Mental Health", desc: "Emotion journal and mood tracker" },
    { name: "PhotoEdit Online", niche: "Creative", desc: "One-click photo enhancement tool" },
  ], 1),
  // Blog (20)
  ...makeSites("blog", [
    { name: "LeanLife Blog", niche: "Weight Loss", desc: "Tips for sustainable fat loss" },
    { name: "WealthWeekly", niche: "Finance", desc: "Personal finance and investing news" },
    { name: "TechTrends Daily", niche: "Technology", desc: "Latest gadgets and software reviews" },
    { name: "ParentingWin", niche: "Parenting", desc: "Real parenting advice that works" },
    { name: "FoodieFinds", niche: "Food", desc: "Restaurant reviews and recipes" },
    { name: "GlowUp Journal", niche: "Beauty", desc: "Skincare routines and product reviews" },
    { name: "WanderLog", niche: "Travel", desc: "Budget travel tips and itineraries" },
    { name: "HomeHacks Blog", niche: "Home", desc: "DIY home improvement ideas" },
    { name: "FurBaby World", niche: "Pets", desc: "Pet care, training and health tips" },
    { name: "ActiveMind Blog", niche: "Fitness", desc: "Workout plans and nutrition guides" },
    { name: "SideHustle Hub", niche: "Make Money", desc: "Proven side income ideas" },
    { name: "DigitalNomad Diary", niche: "Remote Work", desc: "Work from anywhere tips" },
    { name: "GreenLiving Blog", niche: "Eco", desc: "Sustainable living inspiration" },
    { name: "SeniorLife Tips", niche: "Seniors", desc: "Health and lifestyle for 60+" },
    { name: "KidsCraft Corner", niche: "Kids", desc: "DIY crafts and activities for children" },
    { name: "MarketingMind", niche: "Business", desc: "Digital marketing strategies" },
    { name: "SpiritualPath Blog", niche: "Spirituality", desc: "Meditation and mindfulness" },
    { name: "GardenGuru", niche: "Gardening", desc: "Growing tips for every season" },
    { name: "GamersZone", niche: "Gaming", desc: "Game reviews and pro strategies" },
    { name: "CryptoCorner", niche: "Crypto", desc: "Beginner-friendly crypto education" },
  ], 21),
  // Sales Funnel (20)
  ...makeSites("sales-funnel", [
    { name: "SlimDown System", niche: "Weight Loss", desc: "VSL funnel for weight loss offer" },
    { name: "WealthCode Funnel", niche: "Make Money", desc: "High-ticket coaching funnel" },
    { name: "KetoDiet Blueprint", niche: "Diet", desc: "Keto guide plus upsell stack" },
    { name: "TrafficSecrets Funnel", niche: "Marketing", desc: "Lead gen plus tripwire funnel" },
    { name: "SkinGlow System", niche: "Beauty", desc: "Skincare product bundle funnel" },
    { name: "MuscleMass Formula", niche: "Fitness", desc: "Supplement and program funnel" },
    { name: "PassiveIncome Path", niche: "Finance", desc: "Course enrollment funnel" },
    { name: "AnxietyFree Now", niche: "Mental Health", desc: "Meditation program funnel" },
    { name: "RelationshipRevive", niche: "Dating", desc: "Couples guide funnel" },
    { name: "DogTrainer Pro", niche: "Pets", desc: "Dog training video course funnel" },
    { name: "HairGrowth System", niche: "Health", desc: "Hair loss solution funnel" },
    { name: "SugarFreeLife", niche: "Diabetes", desc: "Blood sugar control funnel" },
    { name: "CryptoLaunch Pad", niche: "Crypto", desc: "Crypto course and community funnel" },
    { name: "HomeFlip Formula", niche: "Real Estate", desc: "Property flipping course funnel" },
    { name: "ChildGenius Program", niche: "Parenting", desc: "Kids learning system funnel" },
    { name: "YogaForever", niche: "Wellness", desc: "Online yoga program funnel" },
    { name: "FreelanceRocket", niche: "Career", desc: "Freelance business launch funnel" },
    { name: "SolarSave System", niche: "Eco", desc: "Home solar savings funnel" },
    { name: "MemoryBoost Pro", niche: "Health", desc: "Memory supplement funnel" },
    { name: "SleepDeep Formula", niche: "Sleep", desc: "Sleep aid product funnel" },
  ], 41),
  // Landing Page (20)
  ...makeSites("landing", [
    { name: "FreeReport Grab", niche: "Marketing", desc: "Lead magnet landing page" },
    { name: "WebinarSignup Pro", niche: "Education", desc: "Webinar registration page" },
    { name: "AppLaunch Waitlist", niche: "Tech", desc: "Product launch waitlist page" },
    { name: "EbookDownload Hub", niche: "Finance", desc: "Free ebook opt-in page" },
    { name: "ChallengePage", niche: "Fitness", desc: "30-day challenge signup page" },
    { name: "QuizFunnel Page", niche: "Health", desc: "Quiz-based lead capture page" },
    { name: "DietPlan Download", niche: "Weight Loss", desc: "Free meal plan opt-in" },
    { name: "MasterclassPage", niche: "Business", desc: "Free training registration page" },
    { name: "DiscountPage", niche: "eCommerce", desc: "Limited offer discount landing page" },
    { name: "ConsultBook Page", niche: "Services", desc: "Free consultation booking page" },
    { name: "CouponClaim Page", niche: "Retail", desc: "Coupon code delivery page" },
    { name: "SurveyResults Page", niche: "Research", desc: "Survey lead capture page" },
    { name: "TrialStart Page", niche: "SaaS", desc: "Free trial sign-up page" },
    { name: "CommunityJoin Page", niche: "Community", desc: "Group membership opt-in page" },
    { name: "NewsletterPro Page", niche: "Media", desc: "Newsletter sign-up landing page" },
    { name: "FreeCourse Page", niche: "Education", desc: "Free mini-course enrollment" },
    { name: "GiftCard Page", niche: "Retail", desc: "Gift card purchase landing page" },
    { name: "PortfolioReview Page", niche: "Investing", desc: "Free portfolio review opt-in" },
    { name: "AuditOffer Page", niche: "Marketing", desc: "Free audit offer page" },
    { name: "DemoRequest Page", niche: "B2B", desc: "Software demo request page" },
  ], 61),
  // Dropship (20)
  ...makeSites("dropship", [
    { name: "FitGear Shop", niche: "Fitness", desc: "Home gym equipment store" },
    { name: "SkinGlow Store", niche: "Beauty", desc: "Skincare and beauty products" },
    { name: "PawsFirst Shop", niche: "Pets", desc: "Premium pet accessories store" },
    { name: "TechGadgets Hub", niche: "Tech", desc: "Trending tech gadgets store" },
    { name: "HomeEssentials Shop", niche: "Home", desc: "Smart home products store" },
    { name: "KidsJoy Store", niche: "Kids", desc: "Educational toys and games" },
    { name: "NatureCare Shop", niche: "Eco", desc: "Organic and natural products" },
    { name: "SportsPro Store", niche: "Sports", desc: "Sports gear and accessories" },
    { name: "TravelGear Shop", niche: "Travel", desc: "Travel accessories store" },
    { name: "GardenPro Store", niche: "Gardening", desc: "Gardening tools and seeds" },
    { name: "OfficeDesk Shop", niche: "Productivity", desc: "Home office accessories" },
    { name: "AutoCare Store", niche: "Automotive", desc: "Car accessories and tools" },
    { name: "FashionForward", niche: "Fashion", desc: "Trending clothing and accessories" },
    { name: "YogaZen Shop", niche: "Wellness", desc: "Yoga and meditation products" },
    { name: "BabyNest Store", niche: "Baby", desc: "Baby care and safety products" },
    { name: "CampLife Shop", niche: "Outdoor", desc: "Camping and hiking gear" },
    { name: "CookMaster Store", niche: "Cooking", desc: "Kitchen gadgets and tools" },
    { name: "PhoneCase Hub", niche: "Tech", desc: "Premium phone cases and covers" },
    { name: "SleepWell Shop", niche: "Sleep", desc: "Sleep improvement products" },
    { name: "SnackBox Store", niche: "Food", desc: "Healthy snacks subscription" },
  ], 81),
  // Agency (20)
  ...makeSites("agency", [
    { name: "PixelForge Agency", niche: "Web Design", desc: "Web design agency website" },
    { name: "RankBoost SEO", niche: "SEO", desc: "SEO agency service page" },
    { name: "SocialSpark Agency", niche: "Social Media", desc: "Social media management agency" },
    { name: "AdBlaze PPC", niche: "Paid Ads", desc: "Google/Meta ads agency site" },
    { name: "ContentKing Agency", niche: "Content", desc: "Content marketing agency" },
    { name: "EmailPulse Agency", niche: "Email", desc: "Email marketing agency site" },
    { name: "AppCraft Studio", niche: "App Dev", desc: "Mobile app development agency" },
    { name: "BrandLab Agency", niche: "Branding", desc: "Brand identity design agency" },
    { name: "VideoStory Agency", niche: "Video", desc: "Video production agency site" },
    { name: "CRO Experts Agency", niche: "Conversion", desc: "Conversion rate optimization agency" },
    { name: "LocalLead Agency", niche: "Local SEO", desc: "Local business marketing agency" },
    { name: "eCommerce Agency", niche: "eCommerce", desc: "Shopify and eCommerce agency" },
    { name: "PR Launch Agency", niche: "PR", desc: "Public relations and media agency" },
    { name: "ChatBot Agency", niche: "Automation", desc: "AI chatbot development agency" },
    { name: "DataSight Agency", niche: "Analytics", desc: "Data analytics and BI agency" },
    { name: "GrowthHack Agency", niche: "Growth", desc: "Startup growth marketing agency" },
    { name: "InfoSec Agency", niche: "Security", desc: "Cybersecurity consulting agency" },
    { name: "TechStack Agency", niche: "Dev", desc: "Full-stack development agency" },
    { name: "HR Talent Agency", niche: "Recruiting", desc: "Talent acquisition agency site" },
    { name: "Translation Hub Agency", niche: "Language", desc: "Professional translation services" },
  ], 101),
  // Ad Site (20)
  ...makeSites("ads", [
    { name: "WeightLoss Ads", niche: "Weight Loss", desc: "Advertorial for weight loss supplement" },
    { name: "Income Proof Ads", niche: "Make Money", desc: "Make money native ad page" },
    { name: "SkinFix Advertorial", niche: "Beauty", desc: "Skincare solution ad page" },
    { name: "JointPain Ads", niche: "Health", desc: "Joint pain relief advertorial" },
    { name: "Crypto Signal Ads", niche: "Crypto", desc: "Crypto trading signals ad page" },
    { name: "BackPain Relief Ads", niche: "Health", desc: "Back pain solution ad page" },
    { name: "HairLoss Ads", niche: "Health", desc: "Hair regrowth advertorial" },
    { name: "DiabetesControl Ads", niche: "Health", desc: "Blood sugar control ad page" },
    { name: "Forex Signals Ads", niche: "Trading", desc: "Forex trading signals ad page" },
    { name: "EnergyBoost Ads", niche: "Health", desc: "Natural energy supplement ad" },
    { name: "SleepAid Ads", niche: "Sleep", desc: "Sleep supplement advertorial" },
    { name: "MemoryFix Ads", niche: "Health", desc: "Memory supplement ad page" },
    { name: "ProstateCare Ads", niche: "Men Health", desc: "Prostate health supplement ad" },
    { name: "TestoBoost Ads", niche: "Men Health", desc: "Testosterone booster advertorial" },
    { name: "VisionClear Ads", niche: "Health", desc: "Eye health supplement ad page" },
    { name: "LiverDetox Ads", niche: "Health", desc: "Liver cleanse advertorial" },
    { name: "ImmuneShield Ads", niche: "Health", desc: "Immune support supplement ad" },
    { name: "CollagenPlus Ads", niche: "Beauty", desc: "Collagen supplement ad page" },
    { name: "ProbioticBoost Ads", niche: "Gut Health", desc: "Probiotic supplement advertorial" },
    { name: "CBD Relief Ads", niche: "Wellness", desc: "CBD product advertorial page" },
  ], 121),
  // Local Business (20)
  ...makeSites("local", [
    { name: "CleanHome Services", niche: "Cleaning", desc: "Local house cleaning service" },
    { name: "FastFix Plumbing", niche: "Plumbing", desc: "Local plumbing service site" },
    { name: "GreenLawn Care", niche: "Landscaping", desc: "Lawn care and gardening service" },
    { name: "QuickFix Electrician", niche: "Electrical", desc: "Local electrician service" },
    { name: "PetSit Local", niche: "Pets", desc: "Local pet sitting service" },
    { name: "FreshPaint Pro", niche: "Painting", desc: "Local painting contractor site" },
    { name: "MoveEasy Movers", niche: "Moving", desc: "Local moving company site" },
    { name: "CarCare Detailing", niche: "Auto", desc: "Local auto detailing service" },
    { name: "TaxTime Local", niche: "Finance", desc: "Local tax preparation service" },
    { name: "FitLocal Gym", niche: "Fitness", desc: "Local gym and personal training" },
    { name: "BiteLocal Restaurant", niche: "Food", desc: "Local restaurant website" },
    { name: "CutRight Barber", niche: "Beauty", desc: "Local barber shop site" },
    { name: "PrimePest Control", niche: "Pest", desc: "Local pest control service" },
    { name: "RoofRight Roofers", niche: "Construction", desc: "Local roofing contractor" },
    { name: "FenceKing Fencing", niche: "Construction", desc: "Local fence installation service" },
    { name: "TileTime Flooring", niche: "Flooring", desc: "Local flooring installation service" },
    { name: "HeatCool HVAC", niche: "HVAC", desc: "Local HVAC service and repair" },
    { name: "WindowPro Installation", niche: "Construction", desc: "Window installation service" },
    { name: "DrainClear Drain", niche: "Plumbing", desc: "Local drain cleaning service" },
    { name: "ChildCare Stars", niche: "Childcare", desc: "Local daycare and childcare" },
  ], 141),
  // Portfolio (20)
  ...makeSites("portfolio", [
    { name: "Alex Designs Portfolio", niche: "Graphic Design", desc: "Creative designer portfolio" },
    { name: "DevMaster Portfolio", niche: "Web Dev", desc: "Full-stack developer portfolio" },
    { name: "LensWork Photography", niche: "Photography", desc: "Professional photographer portfolio" },
    { name: "WordSmith Writer", niche: "Copywriting", desc: "Freelance writer portfolio" },
    { name: "UX Studio Portfolio", niche: "UX Design", desc: "UX/UI designer portfolio" },
    { name: "MotionArt Portfolio", niche: "Animation", desc: "Motion graphics artist portfolio" },
    { name: "Studio3D Portfolio", niche: "3D Art", desc: "3D artist and modeler portfolio" },
    { name: "IllustratePro", niche: "Illustration", desc: "Digital illustrator portfolio" },
    { name: "VideoEdge Portfolio", niche: "Video", desc: "Video editor portfolio" },
    { name: "BrandMark Portfolio", niche: "Branding", desc: "Brand designer portfolio" },
    { name: "MusicMaestro Portfolio", niche: "Music", desc: "Music producer portfolio" },
    { name: "VoiceOver Pro", niche: "Voice", desc: "Voice actor portfolio" },
    { name: "ArchVisual Portfolio", niche: "Architecture", desc: "Architect portfolio" },
    { name: "DataViz Portfolio", niche: "Data", desc: "Data scientist portfolio" },
    { name: "TranslatePro Portfolio", niche: "Language", desc: "Translator portfolio" },
    { name: "ConsultEdge Portfolio", niche: "Consulting", desc: "Business consultant portfolio" },
    { name: "SocialGrow Portfolio", niche: "Social Media", desc: "Social media manager portfolio" },
    { name: "SEOMaster Portfolio", niche: "SEO", desc: "SEO specialist portfolio" },
    { name: "CoachLife Portfolio", niche: "Coaching", desc: "Life coach portfolio" },
    { name: "MarketPro Portfolio", niche: "Marketing", desc: "Marketing strategist portfolio" },
  ], 161),
];

const ALL_TYPES: (SiteType | "all")[] = [
  "all", "functional", "blog", "sales-funnel", "landing",
  "dropship", "agency", "ads", "local", "portfolio",
];

export default function DFYPage() {
  const { user } = useAuth();
  const [activeType, setActiveType] = useState<SiteType | "all">("all");
  const [claimingId, setClaimingId] = useState<number | null>(null);
  const [claimedIds, setClaimedIds] = useState<Set<number>>(new Set());
  const [claimedSlugs, setClaimedSlugs] = useState<Record<number, string>>({});
  const [claimedDbIds, setClaimedDbIds] = useState<Record<number, string>>({});
  const [error, setError] = useState<string>("");

  const filtered = activeType === "all" ? DFY_SITES : DFY_SITES.filter((s) => s.type === activeType);

  async function handleClaim(site: DFYSite) {
    if (!user) {
      setError("Please sign in to claim a site.");
      return;
    }
    setClaimingId(site.id);
    setError("");

    try {
      const resp = await fetch("/api/dfy/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          siteName: site.name,
          niche: site.niche,
          type: site.type,
          description: site.desc,
        }),
      });
      const data = await resp.json();
      if (data.slug) {
        setClaimedIds((prev) => {
          const next = new Set(prev);
          next.add(site.id);
          return next;
        });
        setClaimedSlugs((prev) => ({ ...prev, [site.id]: data.slug }));
        if (data.siteId) setClaimedDbIds((prev) => ({ ...prev, [site.id]: data.siteId }));
      } else {
        setError(data.error || "Failed to claim site.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setClaimingId(null);
    }
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center text-xl">
            &#x1F3AF;
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black">DFY Websites</h1>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-crux-500/20 text-crux-400 border border-crux-500/30 px-2 py-0.5 rounded-full">
              Done For You
            </span>
          </div>
        </div>
        <p className="text-gray-400">
          180 pre-built websites ready to claim. Each site includes 200 AI-generated articles. One click to make it yours.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: "180", label: "Pre-Built Sites" },
          { value: "9", label: "Categories" },
          { value: "200", label: "Articles Each" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-5 text-center">
            <p className="text-4xl font-black gradient-text mb-1">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {ALL_TYPES.map((t) => {
          const count = t === "all" ? DFY_SITES.length : DFY_SITES.filter((s) => s.type === t).length;
          return (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeType === t
                  ? "bg-crux-600 border-crux-600 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {t === "all" ? "All" : TYPE_LABELS[t as SiteType]}{" "}
              <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Sites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((site) => {
          const isClaimed = claimedIds.has(site.id);
          const isClaiming = claimingId === site.id;
          const slug = claimedSlugs[site.id];
          const dbId = claimedDbIds[site.id];

          return (
            <div
              key={site.id}
              className={`bg-gray-900/60 border rounded-2xl p-5 flex flex-col gap-3 transition-all ${
                isClaimed ? "border-green-500/30" : "border-gray-800/50 hover:border-crux-500/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-sm mb-1">{site.name}</p>
                  <p className="text-xs text-gray-500">{site.desc}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase border px-1.5 py-0.5 rounded shrink-0 ${TYPE_COLORS[site.type]}`}>
                  {TYPE_LABELS[site.type]}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-gray-400 font-medium">
                  {site.niche}
                </span>
                <span className="text-[10px] bg-crux-500/10 border border-crux-500/20 px-2 py-0.5 rounded text-crux-400 font-medium">
                  200 articles
                </span>
              </div>

              <div className="flex gap-2 mt-auto">
                {isClaimed ? (
                  <>
                    <div className="flex-1 flex items-center gap-1.5 justify-center py-2 rounded-xl text-xs font-bold bg-green-500/20 border border-green-500/30 text-green-400">
                      <Check size={12} /> Claimed
                    </div>
                    {slug && (
                      <a
                        href={`/site/${slug}${dbId ? `?id=${dbId}` : ""}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-all"
                      >
                        <ExternalLink size={11} /> View
                      </a>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleClaim(site)}
                    disabled={isClaiming}
                    className="btn-primary flex-1 py-2 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isClaiming ? (
                      <>
                        <Loader2 size={12} className="animate-spin" /> Claiming...
                      </>
                    ) : (
                      "Claim This Site"
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
