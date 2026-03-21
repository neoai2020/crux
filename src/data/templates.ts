export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  color: string;
  sections: string[];
  features: string[];
}

export const CATEGORIES = [
  { id: "functional", name: "Functional Website", icon: "🌐", description: "Full-featured business websites" },
  { id: "blog", name: "Blog", icon: "📝", description: "Content-driven blog platforms" },
  { id: "ecommerce", name: "eCom Store", icon: "🛒", description: "Online stores with checkout" },
  { id: "sales-funnel", name: "Sales Funnel", icon: "🎯", description: "High-converting sales funnels" },
  { id: "landing", name: "Landing Page", icon: "🚀", description: "Single-page lead generators" },
  { id: "dropship", name: "Dropship Site", icon: "📦", description: "Dropshipping storefronts" },
  { id: "course", name: "Course Site", icon: "🎓", description: "Online learning platforms" },
  { id: "membership", name: "Membership Site", icon: "🔑", description: "Subscription-based platforms" },
  { id: "agency", name: "Agency Website", icon: "💼", description: "Professional agency portfolios" },
  { id: "marketplace", name: "Digital Marketplace", icon: "🏪", description: "Buy & sell digital products" },
  { id: "ads", name: "Ad Site", icon: "📢", description: "Advertisement landing pages" },
  { id: "local", name: "Local Business", icon: "📍", description: "Local business websites" },
  { id: "mobile-app", name: "Mobile App", icon: "📱", description: "Mobile app landing pages" },
];

export const TEMPLATES: Template[] = [
  // Functional Websites
  {
    id: "func-1",
    name: "Corporate Edge",
    category: "functional",
    description: "Sleek corporate website with hero section, services grid, team showcase, testimonials, and contact form.",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#667eea",
    sections: ["Hero", "Services", "About", "Team", "Testimonials", "Contact", "Footer"],
    features: ["Responsive", "SEO Ready", "Contact Form", "Analytics"],
  },
  {
    id: "func-2",
    name: "StartUp Pro",
    category: "functional",
    description: "Modern startup website with animated hero, feature highlights, pricing table, and newsletter signup.",
    thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "#f093fb",
    sections: ["Hero", "Features", "How It Works", "Pricing", "FAQ", "Newsletter", "Footer"],
    features: ["Animations", "Dark Mode", "Newsletter", "Pricing Table"],
  },
  // Blogs
  {
    id: "blog-1",
    name: "Content Canvas",
    category: "blog",
    description: "Clean, readable blog with featured posts, category navigation, sidebar widgets, and comment system.",
    thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "#4facfe",
    sections: ["Header", "Featured Post", "Post Grid", "Categories", "Sidebar", "Newsletter", "Footer"],
    features: ["Search", "Categories", "Comments", "RSS Feed"],
  },
  {
    id: "blog-2",
    name: "Minimal Journal",
    category: "blog",
    description: "Minimalist blog focused on typography and reading experience with dark/light theme toggle.",
    thumbnail: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    color: "#a8edea",
    sections: ["Nav", "Hero Article", "Recent Posts", "Archive", "About Author", "Footer"],
    features: ["Theme Toggle", "Reading Time", "Share Buttons", "Archive"],
  },
  // eCom Stores
  {
    id: "ecom-1",
    name: "ShopFront Pro",
    category: "ecommerce",
    description: "Full ecommerce store with product grid, filters, cart, wishlist, and checkout flow.",
    thumbnail: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    color: "#fa709a",
    sections: ["Header/Cart", "Hero Banner", "Categories", "Products Grid", "Deals", "Reviews", "Footer"],
    features: ["Cart", "Wishlist", "Filters", "Checkout"],
  },
  {
    id: "ecom-2",
    name: "Boutique Store",
    category: "ecommerce",
    description: "Elegant boutique-style store with lookbook layout, quick view, and size guides.",
    thumbnail: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    color: "#a18cd1",
    sections: ["Sticky Nav", "Lookbook Hero", "New Arrivals", "Collections", "Bestsellers", "Instagram Feed", "Footer"],
    features: ["Quick View", "Size Guide", "Lookbook", "Social Feed"],
  },
  // Sales Funnels
  {
    id: "funnel-1",
    name: "Conversion Machine",
    category: "sales-funnel",
    description: "High-converting sales funnel with urgency timers, social proof, and multi-step opt-in.",
    thumbnail: "linear-gradient(135deg, #f5576c 0%, #ff6a00 100%)",
    color: "#f5576c",
    sections: ["Headline", "Video/Demo", "Benefits", "Social Proof", "Pricing", "Urgency Timer", "CTA"],
    features: ["Countdown Timer", "Social Proof", "A/B Ready", "Exit Intent"],
  },
  {
    id: "funnel-2",
    name: "Webinar Funnel",
    category: "sales-funnel",
    description: "Webinar registration funnel with countdown, speaker bio, agenda, and limited spots indicator.",
    thumbnail: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    color: "#ff9a9e",
    sections: ["Registration", "Countdown", "Speaker Bio", "Agenda", "Bonuses", "Testimonials", "Spots Left"],
    features: ["Live Counter", "Email Capture", "Calendar Sync", "Replay Access"],
  },
  // Landing Pages
  {
    id: "landing-1",
    name: "Lead Magnet",
    category: "landing",
    description: "Lead capture landing page with bold headline, benefit bullets, email form, and trust badges.",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#764ba2",
    sections: ["Headline", "Sub-headline", "Benefits", "Email Capture", "Trust Badges", "Testimonial"],
    features: ["A/B Testing", "Analytics", "Mobile First", "Fast Load"],
  },
  {
    id: "landing-2",
    name: "Product Launch",
    category: "landing",
    description: "Product launch page with 3D product showcase, feature comparisons, and early bird pricing.",
    thumbnail: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    color: "#11998e",
    sections: ["Product Hero", "Features", "Comparison", "Early Bird Pricing", "FAQ", "Pre-order CTA"],
    features: ["3D Showcase", "Comparison Table", "Waitlist", "Referral System"],
  },
  // Dropship Sites
  {
    id: "drop-1",
    name: "DropShip Express",
    category: "dropship",
    description: "Fast-loading dropship store with trending products, flash sales, and order tracking.",
    thumbnail: "linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)",
    color: "#fc5c7d",
    sections: ["Top Bar", "Hero", "Trending", "Flash Sales", "Categories", "Reviews", "Trust Section"],
    features: ["Order Tracking", "Flash Sales", "Reviews Import", "Multi-Currency"],
  },
  {
    id: "drop-2",
    name: "Niche Drop",
    category: "dropship",
    description: "Niche-focused dropship store with storytelling layout, bundles, and upsell features.",
    thumbnail: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
    color: "#c471f5",
    sections: ["Brand Story", "Hero Product", "Bundles", "Customer Photos", "FAQ", "Upsells", "Footer"],
    features: ["Bundles", "Upsells", "Customer Photos", "Story Section"],
  },
  // Course Sites
  {
    id: "course-1",
    name: "Academy Pro",
    category: "course",
    description: "Online course platform with curriculum overview, instructor profiles, and student progress tracking.",
    thumbnail: "linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)",
    color: "#0c3483",
    sections: ["Hero", "Curriculum", "Instructor", "Student Results", "Pricing", "FAQ", "Enrollment CTA"],
    features: ["Progress Tracking", "Video Hosting", "Certificates", "Community"],
  },
  {
    id: "course-2",
    name: "MasterClass",
    category: "course",
    description: "Premium course landing page with video previews, module breakdown, and money-back guarantee.",
    thumbnail: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    color: "#fcb69f",
    sections: ["Video Hero", "What You'll Learn", "Modules", "Bonuses", "Guarantee", "Enrollment", "Testimonials"],
    features: ["Video Preview", "Module Drip", "Guarantee Badge", "Bonuses"],
  },
  // Membership Sites
  {
    id: "member-1",
    name: "Inner Circle",
    category: "membership",
    description: "Membership portal with tiered access, community forums, and exclusive content library.",
    thumbnail: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
    color: "#b490ca",
    sections: ["Hero", "Membership Tiers", "What's Inside", "Community", "Success Stories", "Join CTA"],
    features: ["Tiered Access", "Community", "Content Library", "Member Directory"],
  },
  {
    id: "member-2",
    name: "VIP Vault",
    category: "membership",
    description: "Premium membership site with resource vault, live events calendar, and member dashboard.",
    thumbnail: "linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)",
    color: "#c1dfc4",
    sections: ["Welcome", "Resource Vault", "Live Events", "Member Spotlight", "Pricing", "FAQ"],
    features: ["Resource Vault", "Live Events", "Member Dashboard", "Certificates"],
  },
  // Agency Websites
  {
    id: "agency-1",
    name: "Creative Studio",
    category: "agency",
    description: "Bold agency portfolio with case studies, team section, process timeline, and contact form.",
    thumbnail: "linear-gradient(135deg, #9795f0 0%, #fbc8d4 100%)",
    color: "#9795f0",
    sections: ["Hero Reel", "Services", "Case Studies", "Process", "Team", "Contact"],
    features: ["Portfolio Grid", "Case Studies", "Process Timeline", "Video Reel"],
  },
  {
    id: "agency-2",
    name: "Digital Agency",
    category: "agency",
    description: "Modern digital agency site with client logos, metrics counter, portfolio carousel, and blog.",
    thumbnail: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    color: "#8ec5fc",
    sections: ["Hero", "Client Logos", "Metrics", "Portfolio", "Services", "Blog", "Contact"],
    features: ["Client Carousel", "Counter Animation", "Portfolio Filter", "Blog"],
  },
  // Digital Marketplace
  {
    id: "market-1",
    name: "Digital Bazaar",
    category: "marketplace",
    description: "Digital product marketplace with categories, seller profiles, ratings, and instant download.",
    thumbnail: "linear-gradient(135deg, #f83600 0%, #f9d423 100%)",
    color: "#f9d423",
    sections: ["Search Bar", "Categories", "Featured Products", "Top Sellers", "New Arrivals", "Seller CTA"],
    features: ["Search", "Ratings", "Instant Download", "Seller Profiles"],
  },
  {
    id: "market-2",
    name: "Template Hub",
    category: "marketplace",
    description: "Template marketplace with live previews, compatibility filters, and bundle deals.",
    thumbnail: "linear-gradient(135deg, #16a085 0%, #f4d03f 100%)",
    color: "#16a085",
    sections: ["Hero", "Browse Templates", "Live Preview", "Bundles", "Seller Dashboard", "Footer"],
    features: ["Live Preview", "Bundles", "Compatibility Check", "Seller Tools"],
  },
];

export function getTemplatesForCategory(category: string): Template[] {
  return TEMPLATES.filter((t) => t.category === category);
}

export function findBestTemplates(category: string): Template[] {
  const catTemplates = getTemplatesForCategory(category);
  if (catTemplates.length >= 2) return catTemplates.slice(0, 2);
  return TEMPLATES.slice(0, 2);
}
