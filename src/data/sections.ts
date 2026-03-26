import { ToneDefinition } from "./tones";

export type SectionType =
  | "navbar"
  | "hero"
  | "features"
  | "about"
  | "testimonials"
  | "cta"
  | "pricing"
  | "faq"
  | "contact"
  | "gallery"
  | "stats"
  | "howItWorks"
  | "contentGrid"
  | "team"
  | "logoBar"
  | "newsletter"
  | "benefits"
  | "video"
  | "countdown"
  | "footer";

export interface SectionVariant {
  id: string;
  name: string;
}

export interface SectionDefinition {
  type: SectionType;
  name: string;
  variants: SectionVariant[];
}

export interface SectionProps {
  tone: ToneDefinition;
  content: Record<string, unknown>;
  businessName: string;
}

export const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    type: "navbar",
    name: "Navigation Bar",
    variants: [
      { id: "centered", name: "Centered" },
      { id: "leftAligned", name: "Left Aligned" },
      { id: "minimal", name: "Minimal" },
    ],
  },
  {
    type: "hero",
    name: "Hero",
    variants: [
      { id: "centered", name: "Centered" },
      { id: "split", name: "Split" },
      { id: "splitReverse", name: "Split Reverse" },
      { id: "minimal", name: "Minimal" },
      { id: "fullBleed", name: "Full Bleed" },
    ],
  },
  {
    type: "features",
    name: "Features",
    variants: [
      { id: "iconGrid", name: "Icon Grid" },
      { id: "alternating", name: "Alternating Rows" },
      { id: "compact", name: "Compact List" },
    ],
  },
  {
    type: "about",
    name: "About",
    variants: [
      { id: "imageLeft", name: "Image Left" },
      { id: "imageRight", name: "Image Right" },
      { id: "centered", name: "Centered" },
    ],
  },
  {
    type: "testimonials",
    name: "Testimonials",
    variants: [
      { id: "cards", name: "Cards" },
      { id: "spotlight", name: "Spotlight" },
      { id: "minimal", name: "Minimal" },
    ],
  },
  {
    type: "cta",
    name: "Call to Action",
    variants: [
      { id: "gradientBanner", name: "Gradient Banner" },
      { id: "boxed", name: "Boxed" },
      { id: "split", name: "Split" },
    ],
  },
  {
    type: "pricing",
    name: "Pricing",
    variants: [
      { id: "cards", name: "Cards" },
      { id: "comparison", name: "Comparison" },
      { id: "highlight", name: "Highlight" },
    ],
  },
  {
    type: "faq",
    name: "FAQ",
    variants: [
      { id: "accordion", name: "Accordion" },
      { id: "twoColumn", name: "Two Column" },
    ],
  },
  {
    type: "contact",
    name: "Contact",
    variants: [
      { id: "split", name: "Split" },
      { id: "centered", name: "Centered" },
    ],
  },
  {
    type: "gallery",
    name: "Gallery",
    variants: [
      { id: "grid", name: "Grid" },
      { id: "featured", name: "Featured" },
    ],
  },
  {
    type: "stats",
    name: "Statistics",
    variants: [
      { id: "counters", name: "Counters" },
      { id: "cards", name: "Cards" },
    ],
  },
  {
    type: "howItWorks",
    name: "How It Works",
    variants: [
      { id: "steps", name: "Steps" },
      { id: "timeline", name: "Timeline" },
    ],
  },
  {
    type: "contentGrid",
    name: "Content Grid",
    variants: [
      { id: "cards", name: "Cards" },
      { id: "list", name: "List" },
      { id: "featured", name: "Featured" },
    ],
  },
  {
    type: "team",
    name: "Team",
    variants: [
      { id: "grid", name: "Grid" },
      { id: "compact", name: "Compact" },
    ],
  },
  {
    type: "logoBar",
    name: "Logo Bar",
    variants: [
      { id: "scroll", name: "Scroll" },
      { id: "grid", name: "Grid" },
    ],
  },
  {
    type: "newsletter",
    name: "Newsletter",
    variants: [
      { id: "inline", name: "Inline" },
      { id: "section", name: "Full Section" },
    ],
  },
  {
    type: "benefits",
    name: "Benefits",
    variants: [
      { id: "iconList", name: "Icon List" },
      { id: "cards", name: "Cards" },
    ],
  },
  {
    type: "video",
    name: "Video",
    variants: [
      { id: "centered", name: "Centered" },
      { id: "split", name: "Split" },
    ],
  },
  {
    type: "countdown",
    name: "Countdown",
    variants: [
      { id: "banner", name: "Banner" },
      { id: "card", name: "Card" },
    ],
  },
  {
    type: "footer",
    name: "Footer",
    variants: [
      { id: "columns", name: "Columns" },
      { id: "minimal", name: "Minimal" },
      { id: "centered", name: "Centered" },
    ],
  },
];

export function getSectionDefinition(type: SectionType): SectionDefinition | undefined {
  return SECTION_DEFINITIONS.find((d) => d.type === type);
}

export function getVariantsForSection(type: SectionType): SectionVariant[] {
  return getSectionDefinition(type)?.variants || [];
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  functional: { features: "Our Services", contentGrid: "Latest Updates", benefits: "Why Choose Us" },
  blog: { features: "What We Cover", contentGrid: "Latest Posts", benefits: "Why Read Us" },
  ecommerce: { features: "Why Shop With Us", contentGrid: "Featured Products", benefits: "Shopping Benefits" },
  "sales-funnel": { features: "What You Get", contentGrid: "Success Stories", benefits: "Transform Your Results" },
  landing: { features: "Key Features", contentGrid: "What's Included", benefits: "Why This Works" },
  dropship: { features: "Why Shop Here", contentGrid: "Trending Now", benefits: "Customer Benefits" },
  course: { features: "What You'll Learn", contentGrid: "Course Modules", benefits: "Student Outcomes" },
  membership: { features: "Member Benefits", contentGrid: "What's Inside", benefits: "Why Join" },
  agency: { features: "Our Services", contentGrid: "Our Work", benefits: "Why Work With Us" },
  marketplace: { features: "Platform Features", contentGrid: "Top Products", benefits: "Seller Benefits" },
  ads: { features: "What We Offer", contentGrid: "Results", benefits: "Your Advantages" },
  local: { features: "Our Services", contentGrid: "Gallery", benefits: "Why Choose Us" },
  "mobile-app": { features: "App Features", contentGrid: "Screenshots", benefits: "Why Download" },
};

function label(category: string, section: string, fallback: string): string {
  return CATEGORY_LABELS[category]?.[section] || fallback;
}

export function generateDefaultContent(
  sectionType: SectionType,
  businessName: string,
  description: string,
  category: string
): Record<string, unknown> {
  const desc = description || `Premium ${category} solutions for your needs`;
  switch (sectionType) {
    case "navbar":
      return { businessName, navLinks: ["Home", "Features", "About", "Pricing", "Contact"], ctaText: "Get Started" };
    case "hero":
      return {
        headline: businessName,
        subheadline: desc,
        ctaText: "Get Started Today",
        secondaryCtaText: "Learn More",
        socialProof: "Trusted by 10,000+ customers",
      };
    case "features":
      return {
        sectionTitle: label(category, "features", "Features"),
        subtitle: `Everything you need from ${businessName}`,
        items: [
          { icon: "⚡", title: "Lightning Fast", description: "Optimized for speed and performance at every level." },
          { icon: "🛡️", title: "Secure & Reliable", description: "Enterprise-grade security to protect what matters." },
          { icon: "🎨", title: "Beautiful Design", description: "Stunning visuals that capture attention instantly." },
          { icon: "📱", title: "Mobile Ready", description: "Perfect experience on every screen size." },
          { icon: "🔧", title: "Easy Setup", description: "Get started in minutes with zero complexity." },
          { icon: "📈", title: "Growth Focused", description: "Built to scale with your ambitions." },
        ],
      };
    case "about":
      return {
        heading: `About ${businessName}`,
        text: `${businessName} was founded with a simple mission: to deliver exceptional ${category} solutions that make a real difference. We combine innovation with reliability to help our clients succeed. Our team brings years of experience and a passion for excellence to everything we do.`,
        highlight: "Trusted by thousands of satisfied customers worldwide.",
      };
    case "testimonials":
      return {
        sectionTitle: "What Our Customers Say",
        items: [
          { quote: `${businessName} completely transformed our business. The results exceeded all expectations.`, name: "Sarah Mitchell", role: "CEO, TechVentures" },
          { quote: "Outstanding quality and service. I couldn't recommend them more highly to anyone.", name: "James Cooper", role: "Founder, GrowthLab" },
          { quote: "The best decision we made this year. Professional, fast, and incredibly effective.", name: "Emily Zhang", role: "Director, BrightPath" },
        ],
      };
    case "cta":
      return {
        headline: "Ready to Get Started?",
        description: `Join thousands who already trust ${businessName}. Take the first step today.`,
        buttonText: "Start Now",
        secondaryButtonText: "Contact Us",
        disclaimer: "No credit card required",
      };
    case "pricing":
      return {
        sectionTitle: "Simple, Transparent Pricing",
        subtitle: "Choose the plan that fits your needs",
        highlightLabel: "Popular",
        plans: [
          { name: "Starter", price: "$29", period: "/month", features: ["Core features", "Email support", "1 user", "Basic analytics"], ctaText: "Get Started", highlighted: false },
          { name: "Professional", price: "$79", period: "/month", features: ["All Starter features", "Priority support", "5 users", "Advanced analytics", "Custom integrations"], ctaText: "Go Pro", highlighted: true },
          { name: "Enterprise", price: "$199", period: "/month", features: ["All Pro features", "Dedicated support", "Unlimited users", "Full API access", "White labeling", "SLA guarantee"], ctaText: "Contact Sales", highlighted: false },
        ],
      };
    case "faq":
      return {
        sectionTitle: "Frequently Asked Questions",
        subtitle: `Everything you need to know about ${businessName}`,
        items: [
          { question: "How do I get started?", answer: "Getting started is easy! Simply sign up for an account, choose your plan, and you'll be up and running in minutes." },
          { question: "Can I cancel anytime?", answer: "Yes, absolutely. There are no long-term contracts. You can cancel or change your plan at any time." },
          { question: "Do you offer support?", answer: "We offer comprehensive support including email, live chat, and phone support depending on your plan." },
          { question: "Is there a free trial?", answer: "Yes! We offer a 14-day free trial so you can experience the full platform before committing." },
          { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans." },
        ],
      };
    case "contact":
      return {
        heading: "Get in Touch",
        description: `Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.`,
        email: `hello@${businessName.toLowerCase().replace(/\s+/g, "")}.com`,
        phone: "+1 (555) 123-4567",
        address: "123 Business Ave, Suite 100",
        buttonText: "Send Message",
      };
    case "gallery":
      return {
        sectionTitle: label(category, "contentGrid", "Our Work"),
        subtitle: "A showcase of what we do best",
        itemCount: 6,
      };
    case "stats":
      return {
        items: [
          { value: "10K+", label: "Happy Customers" },
          { value: "99.9%", label: "Uptime" },
          { value: "24/7", label: "Support" },
          { value: "150+", label: "Countries" },
        ],
      };
    case "howItWorks":
      return {
        sectionTitle: "How It Works",
        subtitle: "Get started in three simple steps",
        steps: [
          { number: "01", title: "Sign Up", description: "Create your free account in under a minute. No credit card required." },
          { number: "02", title: "Configure", description: "Customize your setup to match your exact needs and preferences." },
          { number: "03", title: "Launch", description: "Go live and start seeing results immediately." },
        ],
      };
    case "contentGrid":
      return {
        sectionTitle: label(category, "contentGrid", "Featured"),
        subtitle: `Explore what ${businessName} has to offer`,
        items: [
          { title: "Getting Started Guide", description: "Everything you need to know to hit the ground running.", tag: "Guide" },
          { title: "Best Practices", description: "Proven strategies from our most successful users.", tag: "Tips" },
          { title: "Success Story", description: "How one customer 10x'd their results in 90 days.", tag: "Case Study" },
          { title: "Product Update", description: "Exciting new features just launched this month.", tag: "News" },
          { title: "Expert Interview", description: "Industry leaders share their insights and predictions.", tag: "Interview" },
          { title: "Deep Dive Tutorial", description: "Master advanced techniques with this step-by-step guide.", tag: "Tutorial" },
        ],
      };
    case "team":
      return {
        sectionTitle: "Meet the Team",
        subtitle: `The people behind ${businessName}`,
        members: [
          { name: "Alex Johnson", role: "CEO & Founder", initials: "AJ" },
          { name: "Maria Garcia", role: "Head of Design", initials: "MG" },
          { name: "David Kim", role: "Lead Developer", initials: "DK" },
          { name: "Sarah Thompson", role: "Marketing Director", initials: "ST" },
        ],
      };
    case "logoBar":
      return {
        title: "Trusted by Industry Leaders",
        logos: ["Acme Corp", "TechFlow", "DataPrime", "CloudBase", "Synergy", "Quantum"],
      };
    case "newsletter":
      return {
        headline: "Stay in the Loop",
        description: "Get the latest updates, tips, and exclusive content delivered straight to your inbox.",
        placeholder: "Enter your email",
        buttonText: "Subscribe",
      };
    case "benefits":
      return {
        sectionTitle: label(category, "benefits", "Benefits"),
        subtitle: `Why ${businessName} is the right choice`,
        items: [
          { icon: "🚀", title: "Boost Your Revenue", description: "Our proven methods help increase your bottom line from day one." },
          { icon: "⏱️", title: "Save Precious Time", description: "Automate repetitive tasks and focus on what truly matters." },
          { icon: "🏆", title: "Stay Ahead of Competition", description: "Get access to cutting-edge tools your competitors wish they had." },
          { icon: "💡", title: "Smarter Decisions", description: "Data-driven insights that guide you to better outcomes." },
        ],
      };
    case "video":
      return {
        headline: "See It in Action",
        description: `Watch how ${businessName} can transform your workflow in just a few minutes.`,
        ctaText: "Watch Now",
      };
    case "countdown":
      return {
        headline: "Limited Time Offer",
        description: "Don't miss out — this special deal ends soon!",
        ctaText: "Claim Your Spot",
        timeBlocks: [
          { value: "07", label: "Days" },
          { value: "23", label: "Hours" },
          { value: "45", label: "Min" },
          { value: "12", label: "Sec" },
        ],
      };
    case "footer":
      return {
        businessName,
        tagline: `Building exceptional experiences that help businesses grow and succeed in the digital world.`,
        links: [
          { group: "Product", items: ["Features", "Pricing", "FAQ"] },
          { group: "Company", items: ["About", "Team", "Careers"] },
          { group: "Support", items: ["Help Center", "Contact", "Status"] },
        ],
        copyright: `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`,
      };
    default:
      return {};
  }
}
