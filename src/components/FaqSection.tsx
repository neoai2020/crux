"use client";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  hasAnyPremiumFeature,
  PREMIUM_FEATURE_KEYS,
} from "@/lib/premium-features";

export { PREMIUM_FEATURE_KEYS, hasAnyPremiumFeature } from "@/lib/premium-features";

interface FaqItem {
  q: string;
  a: string;
  /** If set, item is shown only when user has this feature (e.g. "infinite", "dfy"). */
  requiresFeature?: string;
}

interface FaqCategory {
  title: string;
  icon: string;
  items: FaqItem[];
  /** Entire category hidden unless user has this feature. */
  requiresFeature?: string;
  /** Entire category hidden unless user has at least one premium feature. */
  requiresAnyPremium?: boolean;
}

export const FAQ_DATA: FaqCategory[] = [
  {
    title: "Getting Started",
    icon: "🚀",
    items: [
      {
        q: "What is Crux?",
        a: "Crux is an AI-powered website builder that lets you create professional, high-converting websites in minutes. You describe your business, pick a style, and our AI generates a fully-designed site — complete with copy, images, sections, and CTAs. No coding or design skills required.",
      },
      {
        q: "How do I create my first website?",
        a: "Head to the Web Wizard from your dashboard sidebar. You'll walk through a simple step-by-step process: enter your business name (or let AI generate a catchy one), describe what you do, choose a niche, pick a color palette and style, then customize sections and images. Your site is generated instantly.",
      },
      {
        q: "Do I need any technical skills?",
        a: "None at all. Crux handles everything — design, copy, images, layout, and hosting. You just answer a few questions about your business and the AI does the rest. If you want to fine-tune things, every section is editable with a visual customizer.",
      },
      {
        q: "How do I access my dashboard?",
        a: "After signing in at the login page, you're taken directly to your dashboard. From there you can access all features via the left sidebar: Web Wizard, My Websites, Traffic Magnet, DFY sites, Training, and more.",
      },
      {
        q: "Is there a limit on how many websites I can create?",
        a: "The standard Web Wizard has a generous generation allowance. For unlimited website creation with no caps, upgrade to the Infinite feature — which also includes website translation into any language.",
        requiresFeature: "infinite",
      },
    ],
  },
  {
    title: "Web Wizard",
    icon: "🧙",
    items: [
      {
        q: "How does the Web Wizard work?",
        a: "The Web Wizard is a multi-step guided builder. Step 1: Enter your business details (name, description, niche). Step 2: Choose your design preferences (color palette, font style, layout). Step 3: Customize individual sections — edit text, swap images, adjust CTAs. Step 4: Preview and publish your finished website.",
      },
      {
        q: "Can AI generate a business name for me?",
        a: "Yes! In the first step of the Web Wizard, click the sparkle/generate button next to the business name field. The AI will create a catchy, relevant business name based on your niche and description.",
      },
      {
        q: "How do I add images to my website?",
        a: "During the customization step, each section with an image has a \"Generate Image\" button. The AI creates context-aware images based on your business type, section purpose, and design style. You can also upload your own images directly.",
      },
      {
        q: "Can I change the CTA buttons and links?",
        a: "Absolutely. In the design step, there's a \"Your Link\" field where you set a universal CTA link (your product URL, landing page, etc.). This link is applied to all buttons across your site. You can also override individual button links in the customization step for specific sections.",
      },
      {
        q: "What sections can my website have?",
        a: "Crux supports a wide range of sections: Hero, About, Features, Pricing, Testimonials, FAQ, Contact, CTA, Video, Countdown, Newsletter, Gallery, and more. You choose which sections to include and can reorder them during the wizard.",
      },
      {
        q: "Can I edit the content after the site is generated?",
        a: "Yes. Every piece of text, every image, every link, and every color can be customized in the wizard's customization step before you publish. If you change the business name or description, the content automatically regenerates to match.",
      },
    ],
  },
  {
    title: "My Websites",
    icon: "🌐",
    items: [
      {
        q: "Where do I find my created websites?",
        a: "All your websites — both wizard-created and claimed DFY sites — appear in the \"My Websites\" section accessible from the dashboard sidebar. Each site has a card showing its name, preview, and a live link.",
      },
      {
        q: "Can I have multiple websites?",
        a: "Yes. You can create as many websites as your plan allows. Each one gets its own unique URL and appears as a separate card in My Websites.",
      },
      {
        q: "How do translated websites appear?",
        a: "If you've translated a website using the Infinite feature, the translations appear grouped under the original site's card. Each translation shows a language flag badge and has its own unique live link.",
        requiresFeature: "infinite",
      },
      {
        q: "Can I preview a website before publishing?",
        a: "Yes. During the wizard, you get a full live preview before saving. In the DFY section, every site card has a \"Preview\" button so you can see the complete website before claiming it.",
        requiresFeature: "dfy",
      },
    ],
  },
  {
    title: "Done-For-You (DFY) Websites",
    icon: "🎁",
    requiresFeature: "dfy",
    items: [
      {
        q: "What are DFY websites?",
        a: "DFY (Done-For-You) websites are professionally designed, pre-built websites across popular niches — fitness, finance, real estate, restaurants, SaaS, e-commerce, and more. They're ready to go with high-quality copy, images, and design, built to the standard of premium Squarespace templates.",
      },
      {
        q: "How do I claim a DFY website?",
        a: "Browse the DFY section, click \"Preview\" on any site to see it in full, then click \"Claim Site\" (or \"Add to My Websites\"). The site is instantly added to your My Websites collection with its own live URL.",
      },
      {
        q: "Can I edit a DFY website after claiming it?",
        a: "DFY websites are saved as-is when you claim them. They come fully polished and ready to use — just add your own links and you're set.",
      },
      {
        q: "Are DFY websites a premium feature?",
        a: "Yes. DFY is a premium feature. If you don't have access yet, you'll see a locked screen with instructions to contact support. Once your access is activated, you can browse and claim unlimited DFY sites.",
      },
    ],
  },
  {
    title: "Traffic Magnet",
    icon: "🧲",
    items: [
      {
        q: "What is Traffic Magnet?",
        a: "Traffic Magnet is an AI-powered marketing message generator. It creates ready-to-post promotional content for platforms like Reddit, forums, Facebook groups, Twitter, and more — tailored to your website and niche.",
      },
      {
        q: "How many messages can I generate per day?",
        a: "You get 15 AI-generated marketing messages per day. The counter resets every 24 hours at midnight. Your remaining count is displayed at the top of the Traffic Magnet page.",
      },
      {
        q: "Can I regenerate a message if I don't like it?",
        a: "Yes. Just click the regenerate button to get a fresh message. Each regeneration uses one of your 15 daily generations.",
      },
      {
        q: "What platforms does Traffic Magnet target?",
        a: "The generated messages are optimized for multiple platforms including Reddit, online forums, Facebook groups, Twitter/X, LinkedIn, and general social media. Each message is crafted to feel natural and non-spammy.",
      },
    ],
  },
  {
    title: "Premium Features",
    icon: "👑",
    requiresAnyPremium: true,
    items: [
      {
        q: "What premium features does Crux offer?",
        a: "Crux has four premium features: 10x (supercharge your output), Automation (automated workflows and systems), Infinite (unlimited website generation + multi-language translation), and DFY (Done-For-You pre-built premium websites).",
      },
      {
        q: "How do I unlock a premium feature?",
        a: "Each premium feature is unlocked individually. After purchase, you'll receive a unique access link. Visit that link, enter the email address you signed up with, and the feature is instantly activated on your account — permanently.",
      },
      {
        q: "Do I need to use the access link every time I log in?",
        a: "No. You only use the access link once. After activation, the feature is permanently unlocked on your account. Every time you log in, your premium features are automatically available.",
      },
      {
        q: "Can I unlock multiple premium features?",
        a: "Yes. Each feature has its own separate access link. You can unlock one, some, or all four — each is independent.",
      },
      {
        q: "What does the Infinite feature include?",
        a: "Infinite removes all website generation limits — create as many sites as you want with no cap. It also includes a powerful translation feature: clone any website into any language with one click, generating a fully translated version with its own unique URL.",
        requiresFeature: "infinite",
      },
      {
        q: "What is the 10x feature?",
        a: "10x is designed to supercharge your output and results. It provides advanced tools and strategies to multiply your website creation and marketing efforts tenfold.",
        requiresFeature: "10x",
      },
      {
        q: "What does Automation do?",
        a: "Automation gives you access to pre-built workflow systems and content templates across platforms like LinkedIn, Medium, Quora, and Reddit. It streamlines repetitive tasks so you can focus on growing your business.",
        requiresFeature: "automation",
      },
      {
        q: "I purchased a feature but it still shows as locked. What do I do?",
        a: "Make sure you used the access link and entered the exact email address you used to create your Crux account. If it's still locked, contact support at crux@neoai.freshdesk.com with your email and the feature you purchased.",
      },
    ],
  },
  {
    title: "Website Design & Customization",
    icon: "🎨",
    items: [
      {
        q: "What design quality can I expect?",
        a: "Crux websites are built to the standard of premium Squarespace templates — modern, clean, and professional. Every site includes proper typography, color harmony, spacing, and responsive design.",
      },
      {
        q: "Can I choose my own color palette?",
        a: "Yes. The Web Wizard offers multiple curated color palettes to choose from. The selected palette is applied consistently across your entire website — headers, buttons, backgrounds, accents, and more.",
      },
      {
        q: "Are the websites mobile-responsive?",
        a: "Yes. Every website generated by Crux is fully responsive and looks great on desktop, tablet, and mobile devices.",
      },
      {
        q: "Can I add my own images?",
        a: "Yes. During the customization step, you can either generate AI images or upload your own. Uploaded images are embedded directly into your site.",
      },
      {
        q: "Do the navigation links work on generated websites?",
        a: "Yes. All internal navigation links (like scrolling to the Contact, Pricing, or FAQ sections) use smooth scrolling and work correctly on the live site.",
      },
    ],
  },
  {
    title: "Translation & Languages",
    icon: "🌍",
    requiresFeature: "infinite",
    items: [
      {
        q: "Can I create a website in another language?",
        a: "Yes! With the Infinite feature, you can take any existing website and translate it into any language. The system creates a fully translated clone with its own unique URL.",
      },
      {
        q: "How does the translation feature work?",
        a: "In the Infinite section, select one of your existing websites, choose a target language, and click translate. The AI translates all text content — headings, descriptions, CTAs, FAQ answers, testimonials, and more — while preserving the original design and layout.",
      },
      {
        q: "Can I translate into multiple languages?",
        a: "Absolutely. You can create as many translated versions as you want. Each translation appears as a language badge on the original website's card in My Websites.",
      },
      {
        q: "Does translation affect the original website?",
        a: "No. Translation creates a separate copy. Your original website remains completely untouched.",
      },
    ],
  },
  {
    title: "Account & Security",
    icon: "🔐",
    items: [
      {
        q: "How do I reset my password?",
        a: "Click \"Forgot Password?\" on the sign-in page, enter your email, and you'll receive a reset link. Click the link in the email, set a new password, and you're back in. Check your spam folder if you don't see the email within a few minutes.",
      },
      {
        q: "Can I change my email address?",
        a: "Currently, the email address is tied to your account and premium feature activations. Contact support at crux@neoai.freshdesk.com if you need to update it.",
      },
      {
        q: "Is my data secure?",
        a: "Yes. Crux uses Supabase for authentication and database management with row-level security policies. Your account is protected by industry-standard encryption and secure session management.",
      },
      {
        q: "How do I contact support?",
        a: "You can reach support by emailing crux@neoai.freshdesk.com, using the contact form on the Support page, or visiting the Support Portal at curxai.freshdesk.com to browse articles and submit tickets.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    icon: "🔧",
    items: [
      {
        q: "My website isn't loading. What should I do?",
        a: "Try refreshing the page. If the issue persists, check your internet connection and try clearing your browser cache. If the problem continues, contact support with your website URL and we'll investigate.",
      },
      {
        q: "Image generation failed. What now?",
        a: "Image generation depends on an external AI service. If it fails, try again after a few seconds. If repeated attempts fail, you can upload your own image instead. The system automatically retries on the next attempt.",
      },
      {
        q: "The dashboard seems slow or frozen.",
        a: "Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R). If the issue persists, log out and log back in. Make sure you have a stable internet connection. Contact support if the problem continues.",
      },
      {
        q: "I can't see my translated websites.",
        a: "Translated websites appear grouped under the original site's card in My Websites. Look for language flag badges on the card. If they're missing, try refreshing the page or logging out and back in.",
        requiresFeature: "infinite",
      },
      {
        q: "The access link isn't working.",
        a: "Make sure you're entering the exact email address you used to create your Crux account (case-sensitive). The access link is specific to one feature — check that you're using the correct link for the feature you purchased. If issues persist, contact support.",
      },
    ],
  },
];

function filterFaqByFeatures(
  data: FaqCategory[],
  features: string[] | undefined
): FaqCategory[] {
  // Undefined = caller did not pass access info — show full FAQ (e.g. loading or public view).
  if (features === undefined) {
    return data;
  }

  const feats = features;

  return data
    .filter((cat) => {
      if (cat.requiresFeature && !feats.includes(cat.requiresFeature)) {
        return false;
      }
      if (cat.requiresAnyPremium && !hasAnyPremiumFeature(feats)) {
        return false;
      }
      return true;
    })
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        if (!item.requiresFeature) return true;
        return feats.includes(item.requiresFeature);
      }),
    }))
    .filter((cat) => cat.items.length > 0);
}

interface FaqSectionProps {
  compact?: boolean;
  maxCategories?: number;
  /** When set, FAQ categories and items for premium features the user lacks are omitted. */
  userFeatures?: string[];
}

export default function FaqSection({ compact = false, maxCategories, userFeatures }: FaqSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const scopedData = filterFaqByFeatures(FAQ_DATA, userFeatures);

  const filteredData = scopedData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const displayData =
    activeCategory
      ? filteredData.filter((c) => c.title === activeCategory)
      : maxCategories
        ? filteredData.slice(0, maxCategories)
        : filteredData;

  return (
    <div className="w-full">
      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search FAQ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-crux-500 focus:ring-1 focus:ring-crux-500/50 transition-all"
        />
      </div>

      {/* Category Pills */}
      {!compact && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
              activeCategory === null
                ? "bg-crux-500/20 border-crux-500/40 text-crux-300"
                : "bg-gray-800/40 border-gray-700/50 text-gray-400 hover:border-gray-600 hover:text-gray-300"
            }`}
          >
            All
          </button>
          {scopedData.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                activeCategory === cat.title
                  ? "bg-crux-500/20 border-crux-500/40 text-crux-300"
                  : "bg-gray-800/40 border-gray-700/50 text-gray-400 hover:border-gray-600 hover:text-gray-300"
              }`}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>
      )}

      {/* FAQ Items */}
      {displayData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No results found for &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayData.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                <span>{cat.icon}</span> {cat.title}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item, idx) => {
                  const key = `${cat.title}:${idx}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div
                      key={key}
                      className={`rounded-xl border transition-all overflow-hidden ${
                        isOpen
                          ? "border-crux-500/30 bg-gray-800/30 shadow-lg shadow-crux-500/5"
                          : "border-gray-800/50 bg-gray-900/30 hover:border-gray-700"
                      }`}
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center gap-3 px-5 py-4 text-left group"
                      >
                        <div className="flex-1">
                          <p className={`text-sm font-bold transition-colors ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                            {item.q}
                          </p>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`text-gray-600 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-crux-400" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-0">
                          <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
