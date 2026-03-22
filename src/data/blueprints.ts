import { SectionType, getVariantsForSection } from "./sections";

export interface BlueprintSection {
  type: SectionType;
  variant: string;
}

export interface Blueprint {
  id: string;
  name: string;
  description: string;
  sections: BlueprintSection[];
}

interface CategoryConfig {
  id: string;
  required: SectionType[];
  optional: SectionType[];
  names: string[];
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    id: "functional",
    required: ["navbar", "hero", "features", "about", "footer"],
    optional: ["testimonials", "stats", "team", "contact", "cta", "faq", "newsletter"],
    names: ["Corporate Edge", "Business Pro", "Enterprise Suite", "Professional Hub", "Modern Corp", "Tech Forward", "Command Center", "Venture Prime", "Executive Suite", "Growth Engine"],
  },
  {
    id: "blog",
    required: ["navbar", "hero", "contentGrid", "footer"],
    optional: ["about", "newsletter", "faq", "testimonials", "gallery", "stats", "cta", "benefits"],
    names: ["Content Canvas", "Story Hub", "Article Stream", "Writer's Desk", "Pulse Blog", "Chronicle", "Insight Journal", "Open Page", "Daily Brief", "Editorial Pro"],
  },
  {
    id: "ecommerce",
    required: ["navbar", "hero", "contentGrid", "cta", "footer"],
    optional: ["features", "testimonials", "logoBar", "gallery", "stats", "faq", "benefits"],
    names: ["ShopFront Pro", "Boutique Store", "Market Street", "CartFlow", "QuickShelf", "PrimeMart", "Commerce Hub", "RetailEdge", "Digital Shelf", "StoreWave"],
  },
  {
    id: "sales-funnel",
    required: ["navbar", "hero", "benefits", "cta", "footer"],
    optional: ["video", "testimonials", "pricing", "faq", "stats", "countdown", "howItWorks"],
    names: ["Conversion Machine", "Funnel Pro", "Lead Surge", "Sales Pipeline", "Revenue Flow", "Growth Funnel", "Profit Path", "ClickConvert", "Deal Closer", "Momentum Funnel"],
  },
  {
    id: "landing",
    required: ["navbar", "hero", "features", "cta", "footer"],
    optional: ["benefits", "testimonials", "faq", "stats", "newsletter", "pricing", "logoBar"],
    names: ["Lead Magnet", "Launch Pad", "Capture Pro", "Impact Page", "First Touch", "Beacon", "PageOne", "ConvertPoint", "SparkPage", "GrowthPage"],
  },
  {
    id: "dropship",
    required: ["navbar", "hero", "contentGrid", "cta", "footer"],
    optional: ["features", "testimonials", "faq", "gallery", "stats", "countdown", "logoBar", "benefits"],
    names: ["DropShip Express", "Niche Drop", "TrendShop", "FastShip", "GlobalDrop", "SmartShip", "PrimeDrop", "QuickTrend", "ShipFlow", "DropEdge"],
  },
  {
    id: "course",
    required: ["navbar", "hero", "contentGrid", "pricing", "footer"],
    optional: ["testimonials", "faq", "team", "howItWorks", "cta", "video", "benefits"],
    names: ["Academy Pro", "MasterClass", "CourseForge", "LearnHub", "SkillPath", "EduPrime", "Knowledge Lab", "ClassFlow", "TrainUp", "StudyVault"],
  },
  {
    id: "membership",
    required: ["navbar", "hero", "pricing", "cta", "footer"],
    optional: ["benefits", "features", "testimonials", "faq", "stats", "contentGrid", "howItWorks"],
    names: ["Inner Circle", "VIP Vault", "Members Club", "Access Pass", "Elite Hub", "Prime Circle", "Insider Pro", "Guild Hub", "Keystone", "MemberFlow"],
  },
  {
    id: "agency",
    required: ["navbar", "hero", "gallery", "features", "footer"],
    optional: ["about", "team", "stats", "testimonials", "cta", "contact", "howItWorks", "logoBar"],
    names: ["Creative Studio", "Digital Agency", "PixelCraft", "Studiowerk", "AgencyPro", "BoldStudio", "Catalyst", "VisionLab", "Stratosphere", "NexGen Agency"],
  },
  {
    id: "marketplace",
    required: ["navbar", "hero", "contentGrid", "cta", "footer"],
    optional: ["features", "faq", "stats", "testimonials", "howItWorks", "benefits", "logoBar"],
    names: ["Digital Bazaar", "Template Hub", "MarketPlace Pro", "TradeFlow", "ListingPro", "OpenMarket", "Exchange Hub", "VendorVault", "ShopNet", "MerchGrid"],
  },
  {
    id: "ads",
    required: ["navbar", "hero", "benefits", "cta", "footer"],
    optional: ["video", "testimonials", "stats", "countdown", "faq", "pricing", "newsletter"],
    names: ["Ad Blitz", "ClickMax", "Promo Engine", "AdSurge", "Campaign Pro", "Reach Out", "AdVantage", "HotLead", "TrafficPro", "Amplify"],
  },
  {
    id: "local",
    required: ["navbar", "hero", "features", "contact", "footer"],
    optional: ["about", "gallery", "testimonials", "stats", "faq", "logoBar", "newsletter"],
    names: ["Main Street", "Local Hero", "Neighborhood Pro", "CityBiz", "TownSquare", "Corner Shop", "Community Hub", "LocalEdge", "StreetFront", "NearbyPro"],
  },
  {
    id: "mobile-app",
    required: ["navbar", "hero", "features", "howItWorks", "footer"],
    optional: ["gallery", "testimonials", "stats", "cta", "faq", "video", "benefits", "newsletter"],
    names: ["AppLaunch", "MobileFirst", "AppVista", "LaunchPad App", "AppForge", "ScreenFlow", "TapReady", "AppSphere", "MobiPro", "PixelApp"],
  },
];

function pickVariant(type: SectionType, seed: number): string {
  const variants = getVariantsForSection(type);
  if (variants.length === 0) return "default";
  return variants[seed % variants.length].id;
}

function generateBlueprintsForCategory(config: CategoryConfig): Blueprint[] {
  const blueprints: Blueprint[] = [];
  const descriptions = [
    "A bold, conversion-focused layout with strong visual hierarchy.",
    "Clean and professional design emphasizing trust and clarity.",
    "Content-rich layout designed to inform and engage visitors.",
    "Minimalist structure that lets your brand speak for itself.",
    "Feature-heavy design that showcases everything you offer.",
    "Social-proof focused layout that builds credibility fast.",
    "Balanced layout combining visual impact with detailed information.",
    "Action-oriented design with multiple conversion touchpoints.",
    "Storytelling layout that guides visitors through your journey.",
    "Data-driven design that highlights results and achievements.",
  ];

  for (let i = 0; i < 10; i++) {
    const sections: BlueprintSection[] = [];

    for (const req of config.required) {
      sections.push({ type: req, variant: pickVariant(req, i) });
    }

    const numOptional = 3 + (i % 3);
    const offset = i * 2;
    const picked = new Set<SectionType>();
    for (let j = 0; j < numOptional && j < config.optional.length; j++) {
      const opt = config.optional[(offset + j) % config.optional.length];
      if (!picked.has(opt)) {
        picked.add(opt);
        sections.push({ type: opt, variant: pickVariant(opt, i + j) });
      }
    }

    const ordered = sortSections(sections);

    blueprints.push({
      id: `${config.id}-${i + 1}`,
      name: config.names[i],
      description: descriptions[i],
      sections: ordered,
    });
  }

  return blueprints;
}

const SECTION_ORDER: SectionType[] = [
  "navbar", "hero", "logoBar", "features", "benefits", "about", "howItWorks",
  "stats", "contentGrid", "gallery", "video", "team", "testimonials",
  "pricing", "countdown", "cta", "faq", "contact", "newsletter", "footer",
];

function sortSections(sections: BlueprintSection[]): BlueprintSection[] {
  return [...sections].sort(
    (a, b) => SECTION_ORDER.indexOf(a.type) - SECTION_ORDER.indexOf(b.type)
  );
}

const _blueprintCache: Record<string, Blueprint[]> = {};

export function getBlueprintsForCategory(categoryId: string): Blueprint[] {
  if (_blueprintCache[categoryId]) return _blueprintCache[categoryId];
  const config = CATEGORY_CONFIGS.find((c) => c.id === categoryId);
  if (!config) return [];
  const result = generateBlueprintsForCategory(config);
  _blueprintCache[categoryId] = result;
  return result;
}

export function pickTwoBlueprintsForUser(categoryId: string, businessName: string): Blueprint[] {
  const all = getBlueprintsForCategory(categoryId);
  if (all.length <= 2) return all;
  let hash = 0;
  for (let i = 0; i < businessName.length; i++) {
    hash = ((hash << 5) - hash + businessName.charCodeAt(i)) | 0;
  }
  const idx1 = Math.abs(hash) % all.length;
  let idx2 = (idx1 + 1 + (Math.abs(hash >> 4) % (all.length - 1))) % all.length;
  if (idx2 === idx1) idx2 = (idx1 + 1) % all.length;
  return [all[idx1], all[idx2]];
}

export function getBlueprintById(categoryId: string, blueprintId: string): Blueprint | undefined {
  return getBlueprintsForCategory(categoryId).find((b) => b.id === blueprintId);
}

export { CATEGORY_CONFIGS };
