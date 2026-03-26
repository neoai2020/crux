"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { getWebsitesForUser, SavedWebsite } from "@/lib/websites";
import { BlueprintSection } from "@/data/blueprints";
import { SectionType, generateDefaultContent, buildNavLinksForSections } from "@/data/sections";
import { getToneById, TONES, ToneDefinition } from "@/data/tones";
import { getFeatureImages, getTeamPhotos, getContentImages, getGalleryImages } from "@/data/images";
import WebsitePreview from "@/components/WebsitePreview";
import PremiumGate from "@/components/PremiumGate";
import {
  CheckCircle2,
  ExternalLink,
  Globe,
  Layout,
  Zap,
  ArrowRight,
  Sparkles,
  MousePointer2,
  X,
  FileText,
  Copy,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { getPostsForSite, SeoPost } from "@/data/seo-posts";

/* ------------------------------------------------------------------ */
/*  DATA: unique business names per type (20 each)                    */
/* ------------------------------------------------------------------ */

const NAMES: Record<string, string[]> = {
  "E-commerce": [
    "ShopNova", "CartFlow", "PrimeMart", "BuyBright", "RetailEdge",
    "VendorVault", "StoreSync", "QuickCart", "UrbanMart", "LuxeShop",
    "TrendBuy", "ShelfWave", "DealDrop", "MarketPeak", "GlowShop",
    "SnapBuy", "FluxStore", "NovaMart", "PureShop", "BloomCart",
  ],
  Service: [
    "ServeRight", "TaskPro", "FixItNow", "ServicePeak", "HelpBridge",
    "CarePlus", "ProAssist", "TrustFix", "SwiftServe", "CoreCare",
    "PrimeFix", "EliteAid", "ClearPath", "ProResolve", "ReliaCare",
    "ServeWell", "QuickHelp", "TrustPro", "SmartCare", "AidFlow",
  ],
  Portfolio: [
    "PixelCraft Studio", "VisualEdge", "CreativeArc", "Artisan Lab", "LensCraft",
    "DesignPulse", "Studio Noir", "Framework", "BoldCanvas", "CraftHouse",
    "Luminary Studio", "PixelPerfect", "The Design Co", "ArtVault", "StudioBloom",
    "CreativeNest", "VisualForge", "CanvasWorks", "InkFlow Studio", "MomentCraft",
  ],
  "Landing Page": [
    "LaunchPad Pro", "ConvertFlow", "LeadSurge", "ClickBoost", "FunnelForge",
    "GrowthPoint", "SparkLead", "PageOne Pro", "RapidLaunch", "ImpactPage",
    "BeaconLeads", "CaptureKit", "ConvertEdge", "LeadPrime", "BoostPage",
    "ClickPrime", "LaunchKit", "SurgePoint", "GrowthHub", "MomentumPage",
  ],
  Blog: [
    "The Daily Digest", "InkWell Journal", "ContentPulse", "The Open Page", "StoryForge",
    "ThoughtStream", "InsightHub", "The Chronicle", "WisdomWire", "PenCraft",
    "The Narrative", "WordSmith Daily", "PulseWrite", "EchoJournal", "MindScape",
    "The Brief", "DeepDive Blog", "ClearView", "LongRead Hub", "The Signal",
  ],
  Education: [
    "LearnPath Academy", "SkillForge", "MasterMind Ed", "BrightClass", "EduVault",
    "KnowledgeHub", "CourseFlow", "StudyPeak", "WisdomTree", "ClassBridge",
    "SkillTree Pro", "TeachUp", "AcademyPro", "LessonForge", "BrainCraft",
    "InsightAcademy", "LearnNova", "ClassPrime", "StudyBridge", "EduSpark",
  ],
  "Health/Medical": [
    "VitalCare Clinic", "WellPath Medical", "HealthBridge", "MedPrime", "CarePoint",
    "PulseHealth", "WellnessHub", "MedSync", "LifeVital", "CurePoint",
    "HealthPeak", "VitalSync", "CareNova", "MedBridge", "WellCore",
    "PulseClinic", "LifeWell", "CareFlow", "MedVault", "VitalEdge",
  ],
  "Personal Branding": [
    "Alex Morgan", "Jordan Rivera", "Taylor Chen", "Casey Brooks", "Morgan Blake",
    "Jamie Reeves", "Riley Sterling", "Sam Calloway", "Quinn Harper", "Drew Fontaine",
    "Avery Kim", "Skyler Grant", "Cameron Steele", "Dakota Lane", "Sage Emerson",
    "Parker Voss", "Reese Harding", "Finley Cross", "Rowan Pierce", "Blake Ashford",
  ],
  Corporate: [
    "Apex Industries", "Vertex Global", "Pinnacle Group", "NexGen Corp", "Summit Partners",
    "CoreBridge Inc", "Atlas Solutions", "Vanguard Systems", "Quantum Corp", "Meridian Group",
    "Horizon Enterprises", "Catalyst Corp", "Prism Holdings", "Elevate Inc", "Synergy Global",
    "Keystone Corp", "Pioneer Holdings", "Ascent Group", "Trident Solutions", "Helix Corp",
  ],
};

/* ------------------------------------------------------------------ */
/*  DATA: unique descriptions per type                                */
/* ------------------------------------------------------------------ */

const DESCS: Record<string, string[]> = {
  "E-commerce": [
    "Premium curated lifestyle products with same-day shipping and a 30-day guarantee.",
    "Handcrafted goods from independent artisans, delivered worldwide.",
    "Trending fashion and accessories at prices that make you smile.",
    "Organic beauty and wellness products for a healthier you.",
    "Tech gadgets and smart home essentials for the modern lifestyle.",
  ],
  Service: [
    "Expert home renovation and remodeling services you can trust.",
    "Professional cleaning services for homes and offices — spotless every time.",
    "IT consulting and managed services that keep your business running.",
    "Premium wedding planning and event coordination from start to finish.",
    "Legal consulting with transparent pricing and real results.",
  ],
  Portfolio: [
    "Award-winning photography capturing life's most meaningful moments.",
    "Brand identity and UI/UX design for startups that want to stand out.",
    "Full-stack web development with a focus on beautiful, fast experiences.",
    "Illustration and motion design that tells stories with impact.",
    "Architectural visualization and 3D rendering for dream spaces.",
  ],
  "Landing Page": [
    "AI-powered marketing automation that doubles your conversion rate.",
    "The all-in-one SaaS platform for managing remote teams effortlessly.",
    "Premium fitness coaching delivered through a personalized mobile app.",
    "Crypto portfolio tracker with real-time alerts and tax reporting.",
    "Next-gen email marketing with drag-and-drop templates and analytics.",
  ],
  Blog: [
    "In-depth analysis and breaking news on the tech industry.",
    "Recipes, restaurant reviews, and culinary adventures around the world.",
    "Personal finance tips and investment strategies for every stage of life.",
    "Travel guides, itineraries, and hidden gems from 50+ countries.",
    "Mindfulness, meditation, and mental wellness resources for daily life.",
  ],
  Education: [
    "Master data science and machine learning with hands-on projects.",
    "Language learning courses with native speakers and AI conversation practice.",
    "Professional photography courses from beginner to advanced.",
    "Business and entrepreneurship masterclasses taught by industry leaders.",
    "Music production and audio engineering for aspiring producers.",
  ],
  "Health/Medical": [
    "Comprehensive family medicine with telemedicine and same-day appointments.",
    "Specialized physical therapy and sports rehabilitation programs.",
    "Holistic wellness center offering acupuncture, massage, and nutrition counseling.",
    "Pediatric care with a gentle, family-first approach.",
    "Mental health counseling and therapy with licensed professionals.",
  ],
  "Personal Branding": [
    "Award-winning product designer helping brands create delightful user experiences.",
    "Full-stack developer and startup advisor with 15 years of experience.",
    "Keynote speaker and author on leadership, innovation, and company culture.",
    "Marketing strategist helping D2C brands scale from $1M to $50M.",
    "Executive coach and organizational psychologist for Fortune 500 leaders.",
  ],
  Corporate: [
    "Enterprise cloud infrastructure and digital transformation consulting.",
    "Global supply chain management and logistics optimization.",
    "Mergers & acquisitions advisory for mid-market technology companies.",
    "Sustainable energy solutions for commercial and industrial facilities.",
    "Cybersecurity and compliance solutions for regulated industries.",
  ],
};

/* ------------------------------------------------------------------ */
/*  DATA: hero images (Unsplash, 8 per type)                          */
/* ------------------------------------------------------------------ */

const HERO_IMGS: Record<string, string[]> = {
  "E-commerce": [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=900&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80",
  ],
  Service: [
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80",
    "https://images.unsplash.com/photo-1600439614353-174ad0ee3b25?w=900&q=80",
    "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=900&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
  ],
  Portfolio: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80",
    "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=900&q=80",
    "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?w=900&q=80",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80",
  ],
  "Landing Page": [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
  ],
  Blog: [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",
    "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=900&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=900&q=80",
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&q=80",
    "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=900&q=80",
    "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=900&q=80",
  ],
  Education: [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
    "https://images.unsplash.com/photo-1523050335456-c38447d0d960?w=900&q=80",
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=900&q=80",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80",
  ],
  "Health/Medical": [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80",
    "https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&q=80",
    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=900&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
  ],
  "Personal Branding": [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80",
  ],
  Corporate: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=900&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=900&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80",
  ],
};

/* ------------------------------------------------------------------ */
/*  DATA: hero taglines per type (rotate across sites)                */
/* ------------------------------------------------------------------ */

const HERO_TAGLINES: Record<string, string[]> = {
  "E-commerce": [
    "Shop the Future of Style", "Where Quality Meets Convenience", "Discover. Shop. Love.",
    "Your One-Stop Premium Store", "Curated Collections, Delivered Fast",
  ],
  Service: [
    "Excellence in Every Detail", "Professional Solutions, Personal Touch",
    "Your Trusted Partner in Success", "Where Expertise Meets Dedication",
    "Premium Service, Exceptional Results",
  ],
  Portfolio: [
    "Design That Speaks Volumes", "Crafted with Passion & Precision",
    "Where Ideas Become Visual Stories", "Creative Vision, Flawless Execution",
    "The Art of Digital Excellence",
  ],
  "Landing Page": [
    "The Future Starts Here", "Transform the Way You Work",
    "Built for Growth, Designed for You", "Unlock Your Full Potential",
    "Innovation at Your Fingertips",
  ],
  Blog: [
    "Stories Worth Your Time", "Insights That Move You Forward",
    "Where Ideas Come to Life", "Fresh Perspectives, Daily",
    "Read. Learn. Grow.",
  ],
  Education: [
    "Learn Without Limits", "Master New Skills, Your Way",
    "Knowledge That Transforms Careers", "Education Reimagined",
    "Your Journey to Expertise Starts Here",
  ],
  "Health/Medical": [
    "Your Health, Our Priority", "Compassionate Care, Modern Medicine",
    "Wellness Begins with Trust", "Where Science Meets Compassion",
    "Better Health Starts Today",
  ],
  "Personal Branding": [
    "Making an Impact That Lasts", "Ideas. Leadership. Results.",
    "Elevating Brands, Empowering People", "The Voice Behind the Vision",
    "Where Expertise Meets Influence",
  ],
  Corporate: [
    "Building Tomorrow's Solutions Today", "Innovation at Enterprise Scale",
    "Driving Growth Through Excellence", "Global Vision, Local Expertise",
    "Leading the Industry Forward",
  ],
};

/* ------------------------------------------------------------------ */
/*  DATA: feature icon sets (cycle through per site)                  */
/* ------------------------------------------------------------------ */

const NICHE_FEATURES: Record<string, { icon: string; title: string; description: string }[]> = {
  "E-commerce": [
    { icon: "🛒", title: "One-Click Checkout", description: "Frictionless purchasing experience that maximizes conversion rates and reduces cart abandonment." },
    { icon: "📦", title: "Real-Time Inventory", description: "Automated stock management synced across all channels with low-stock alerts." },
    { icon: "💳", title: "Secure Payments", description: "PCI-compliant payment processing with support for 40+ payment methods worldwide." },
    { icon: "🚚", title: "Smart Shipping", description: "Integrated shipping calculators with real-time tracking and automated fulfillment." },
    { icon: "📊", title: "Sales Analytics", description: "Revenue dashboards, customer lifetime value tracking, and predictive demand forecasting." },
    { icon: "🎁", title: "Loyalty Rewards", description: "Built-in points system and referral programs that turn buyers into brand advocates." },
  ],
  Service: [
    { icon: "📅", title: "Online Booking", description: "Let clients schedule appointments 24/7 with automated confirmations and reminders." },
    { icon: "⭐", title: "Client Reviews", description: "Verified review system that builds trust and showcases your best feedback." },
    { icon: "💬", title: "Live Chat Support", description: "Instant communication with visitors to answer questions and convert leads." },
    { icon: "📋", title: "Service Catalog", description: "Beautifully organized service packages with transparent pricing and comparison." },
    { icon: "🔔", title: "Instant Quotes", description: "Automated quote generation based on client requirements and project scope." },
    { icon: "🏆", title: "Certifications", description: "Prominently display your credentials, awards, and industry certifications." },
  ],
  Portfolio: [
    { icon: "🖼️", title: "Visual Gallery", description: "High-resolution image galleries with lightbox viewing, filtering, and project categories." },
    { icon: "🎬", title: "Case Studies", description: "In-depth project breakdowns showing process, challenges, and measurable results." },
    { icon: "✏️", title: "Creative Process", description: "Showcase your workflow from concept to delivery with interactive timelines." },
    { icon: "🎨", title: "Style Variety", description: "Multiple layout options to match your creative identity and body of work." },
    { icon: "📧", title: "Inquiry Forms", description: "Custom contact forms with project type selection and budget range options." },
    { icon: "🔗", title: "Social Integration", description: "Seamless links to Behance, Dribbble, Instagram, and other creative platforms." },
  ],
  "Landing Page": [
    { icon: "🎯", title: "Conversion Focused", description: "Every element is positioned and designed to maximize your signup and purchase rates." },
    { icon: "⚡", title: "Blazing Fast", description: "Sub-second load times with optimized assets — because every millisecond counts." },
    { icon: "📱", title: "Mobile-First", description: "Responsive design that looks stunning on every device, from phones to desktops." },
    { icon: "🧪", title: "A/B Ready", description: "Built-in structure for testing headlines, CTAs, and layouts to find what converts." },
    { icon: "📈", title: "Lead Capture", description: "Strategically placed opt-in forms with integrations for all major email platforms." },
    { icon: "🔒", title: "Trust Signals", description: "Social proof, security badges, and guarantees positioned where they matter most." },
  ],
  Blog: [
    { icon: "✍️", title: "Rich Editor", description: "Write beautiful posts with images, embeds, code blocks, and custom formatting." },
    { icon: "🏷️", title: "Smart Categories", description: "Organized content with tags, categories, and related post suggestions." },
    { icon: "🔍", title: "SEO Optimized", description: "Built-in meta tags, schema markup, and clean URLs for maximum search visibility." },
    { icon: "💌", title: "Newsletter", description: "Integrated email capture with automated digest emails to keep readers engaged." },
    { icon: "💬", title: "Comments", description: "Threaded discussion system that builds community around your content." },
    { icon: "📊", title: "Read Analytics", description: "Track engagement, reading time, and popular posts to guide your content strategy." },
  ],
  Education: [
    { icon: "🎓", title: "Course Builder", description: "Structured modules with lessons, quizzes, and progress tracking for every student." },
    { icon: "🎥", title: "Video Lessons", description: "HD video hosting with playback controls, chapters, and downloadable resources." },
    { icon: "📝", title: "Assessments", description: "Interactive quizzes and assignments with automated grading and feedback." },
    { icon: "🏅", title: "Certificates", description: "Branded completion certificates that students can share on LinkedIn." },
    { icon: "👥", title: "Student Community", description: "Discussion forums and group features that enhance the learning experience." },
    { icon: "📈", title: "Progress Tracking", description: "Visual dashboards showing student progress, completion rates, and engagement." },
  ],
  "Health/Medical": [
    { icon: "🩺", title: "Patient Portal", description: "Secure online access for appointment scheduling, records, and communication." },
    { icon: "💊", title: "Service Directory", description: "Comprehensive listing of treatments, specialties, and medical services offered." },
    { icon: "🏥", title: "Virtual Visits", description: "HIPAA-compliant telehealth integration for remote consultations." },
    { icon: "📋", title: "Health Resources", description: "Educational content library with condition guides, wellness tips, and FAQs." },
    { icon: "⭐", title: "Provider Profiles", description: "Detailed doctor and staff bios with credentials, specialties, and patient reviews." },
    { icon: "🔒", title: "HIPAA Compliant", description: "Enterprise-grade security ensuring patient data privacy and regulatory compliance." },
  ],
  "Personal Branding": [
    { icon: "🎤", title: "Speaking & Events", description: "Showcase upcoming talks, workshops, and events with easy booking integration." },
    { icon: "📚", title: "Published Work", description: "Highlight books, articles, and media appearances with links and excerpts." },
    { icon: "🎯", title: "Services & Coaching", description: "Clearly defined offerings with pricing, outcomes, and testimonials." },
    { icon: "📰", title: "Media Kit", description: "Downloadable press assets, bio, and hi-res photos for media inquiries." },
    { icon: "💌", title: "Newsletter Signup", description: "Grow your audience with a compelling email opt-in and lead magnet." },
    { icon: "🤝", title: "Social Proof", description: "Logos of companies you've worked with, press mentions, and endorsements." },
  ],
  Corporate: [
    { icon: "🏢", title: "Company Overview", description: "Compelling corporate story with mission, vision, and values front and center." },
    { icon: "📊", title: "Investor Relations", description: "Financial reports, press releases, and shareholder information hub." },
    { icon: "🌍", title: "Global Presence", description: "Interactive map showing offices, partners, and market coverage worldwide." },
    { icon: "👥", title: "Leadership Team", description: "Executive profiles with bios, achievements, and professional backgrounds." },
    { icon: "🏆", title: "Case Studies", description: "Detailed success stories demonstrating measurable impact and ROI." },
    { icon: "📞", title: "Enterprise Contact", description: "Department-specific contact forms with office locations and direct lines." },
  ],
};

const FEATURE_SETS = [
  NICHE_FEATURES["E-commerce"],
  NICHE_FEATURES["Service"],
  NICHE_FEATURES["Portfolio"],
  NICHE_FEATURES["Landing Page"],
  NICHE_FEATURES["Blog"],
  NICHE_FEATURES["Education"],
  NICHE_FEATURES["Health/Medical"],
  NICHE_FEATURES["Personal Branding"],
  NICHE_FEATURES["Corporate"],
];

const NICHE_TESTIMONIALS: Record<string, { quote: string; name: string; role: string }[]> = {
  "E-commerce": [
    { quote: "Our online sales increased 240% after launching. The checkout experience is flawless — customers love it.", name: "Sarah Mitchell", role: "Founder, ShopNova" },
    { quote: "We went from zero to $50K/month in revenue within our first quarter. The product pages convert like crazy.", name: "James Cooper", role: "CEO, TrendBuy" },
    { quote: "Cart abandonment dropped 60% overnight. The design builds so much trust with our buyers.", name: "Emily Zhang", role: "COO, LuxeShop" },
  ],
  Service: [
    { quote: "Booking requests tripled since we launched. Clients say our site feels more professional than competitors charging 5x more.", name: "Michael Torres", role: "Owner, ProAssist" },
    { quote: "The service catalog and review sections sold our packages for us. Best investment we've made.", name: "Lisa Park", role: "Director, CarePlus" },
    { quote: "We stopped cold-calling entirely. The website now generates 20+ qualified leads per week.", name: "David Chen", role: "Founder, TaskPro" },
  ],
  Portfolio: [
    { quote: "My portfolio finally matches the quality of my work. I've landed 3 major clients since launching.", name: "Rachel Kim", role: "Creative Director" },
    { quote: "Agencies started reaching out to me instead of the other way around. The case study layout is incredible.", name: "Tom Henderson", role: "Freelance Designer" },
    { quote: "Every photographer I know is jealous of my site. It loaded fast and looks like a gallery exhibition.", name: "Amanda Foster", role: "Photographer" },
  ],
  "Landing Page": [
    { quote: "Conversion rate went from 2% to 11% in the first week. The layout and copy flow is perfectly optimized.", name: "Chris Nakamura", role: "CMO, NovaTech" },
    { quote: "We collected 5,000 emails in our first month. The lead magnet placement is genius.", name: "Natalie Russo", role: "Founder, BrightLeaf" },
    { quote: "Our cost-per-acquisition dropped 65% after switching to this landing page. The ROI is insane.", name: "Marcus Williams", role: "VP Growth, Atlas" },
  ],
  Blog: [
    { quote: "Organic traffic grew 400% in 6 months. The SEO structure is baked right into every page.", name: "Jessica Lane", role: "Editor, The Daily Digest" },
    { quote: "Reader engagement doubled. The clean design and fast load times keep people reading longer.", name: "Robert Hayes", role: "Blogger, InsightHub" },
    { quote: "My newsletter signups went from 5/day to 50/day just from the blog redesign. Incredible results.", name: "Maria Santos", role: "Content Creator" },
  ],
  Education: [
    { quote: "Student enrollment increased 180% in our first semester. The course layout makes complex topics approachable.", name: "Dr. Alan Wright", role: "Dean, LearnPath Academy" },
    { quote: "Completion rates jumped from 30% to 78%. Students say the progress tracking keeps them motivated.", name: "Priya Sharma", role: "Founder, SkillForge" },
    { quote: "Parents love the professional look. It gives them confidence that their investment in education is well-placed.", name: "Carlos Mendez", role: "Director, BrightClass" },
  ],
  "Health/Medical": [
    { quote: "Patient satisfaction scores improved 35%. The online booking system alone saved us 15 hours per week.", name: "Dr. Elena Ross", role: "Director, VitalCare" },
    { quote: "New patient inquiries increased 200% after launching. The design conveys trust and professionalism instantly.", name: "Dr. Kevin Park", role: "Founder, WellPath" },
    { quote: "Our telehealth adoption went from 10% to 60% of visits. The site made virtual care feel natural and easy.", name: "Dr. Susan Okafor", role: "CTO, PulseHealth" },
  ],
  "Personal Branding": [
    { quote: "I went from unknown to booked solid for 6 months after launching my personal site. The design is a conversation starter.", name: "Jordan Rivera", role: "Keynote Speaker" },
    { quote: "Speaking engagements doubled. Event organizers say my site sold them before we even had a call.", name: "Taylor Chen", role: "Executive Coach" },
    { quote: "The media kit section alone landed me 3 podcast features and a magazine interview in the first month.", name: "Casey Brooks", role: "Author & Strategist" },
  ],
  Corporate: [
    { quote: "Investor confidence measurably improved. The IR section and case studies tell our story better than any pitch deck.", name: "Richard Okafor", role: "CFO, Apex Industries" },
    { quote: "Enterprise client acquisition increased 45%. The professional design immediately positions us as a market leader.", name: "Diane Cho", role: "VP Sales, Vertex Global" },
    { quote: "Recruitment quality improved dramatically. Top candidates say our careers page convinced them to apply.", name: "Mark Stevens", role: "CHRO, Pinnacle Group" },
  ],
};

const TESTIMONIAL_SETS = [
  NICHE_TESTIMONIALS["E-commerce"],
  NICHE_TESTIMONIALS["Service"],
  NICHE_TESTIMONIALS["Portfolio"],
  NICHE_TESTIMONIALS["Landing Page"],
  NICHE_TESTIMONIALS["Blog"],
  NICHE_TESTIMONIALS["Education"],
  NICHE_TESTIMONIALS["Health/Medical"],
  NICHE_TESTIMONIALS["Personal Branding"],
  NICHE_TESTIMONIALS["Corporate"],
];

/* ------------------------------------------------------------------ */
/*  SECTIONS & TONES per type                                         */
/* ------------------------------------------------------------------ */

const SITE_TYPES = [
  "E-commerce", "Service", "Portfolio", "Landing Page", "Blog",
  "Education", "Health/Medical", "Personal Branding", "Corporate",
] as const;

const DFY_SECTIONS_BASE: Record<string, BlueprintSection[]> = {
  "E-commerce": [
    { type: "navbar", variant: "leftAligned" }, { type: "hero", variant: "split" },
    { type: "features", variant: "iconGrid" }, { type: "contentGrid", variant: "cards" },
    { type: "testimonials", variant: "cards" }, { type: "cta", variant: "gradientBanner" },
    { type: "faq", variant: "accordion" }, { type: "footer", variant: "columns" },
  ],
  Service: [
    { type: "navbar", variant: "leftAligned" }, { type: "hero", variant: "centered" },
    { type: "features", variant: "iconGrid" }, { type: "about", variant: "imageRight" },
    { type: "testimonials", variant: "spotlight" }, { type: "pricing", variant: "cards" },
    { type: "contact", variant: "split" }, { type: "footer", variant: "columns" },
  ],
  Portfolio: [
    { type: "navbar", variant: "minimal" }, { type: "hero", variant: "minimal" },
    { type: "gallery", variant: "grid" }, { type: "about", variant: "centered" },
    { type: "stats", variant: "counters" }, { type: "testimonials", variant: "minimal" },
    { type: "contact", variant: "centered" }, { type: "footer", variant: "minimal" },
  ],
  "Landing Page": [
    { type: "navbar", variant: "centered" }, { type: "hero", variant: "centered" },
    { type: "benefits", variant: "iconList" }, { type: "features", variant: "alternating" },
    { type: "testimonials", variant: "cards" }, { type: "cta", variant: "gradientBanner" },
    { type: "faq", variant: "accordion" }, { type: "footer", variant: "minimal" },
  ],
  Blog: [
    { type: "navbar", variant: "leftAligned" }, { type: "hero", variant: "centered" },
    { type: "contentGrid", variant: "cards" }, { type: "about", variant: "imageLeft" },
    { type: "newsletter", variant: "section" }, { type: "testimonials", variant: "minimal" },
    { type: "footer", variant: "columns" },
  ],
  Education: [
    { type: "navbar", variant: "leftAligned" }, { type: "hero", variant: "split" },
    { type: "features", variant: "iconGrid" }, { type: "howItWorks", variant: "steps" },
    { type: "contentGrid", variant: "cards" }, { type: "pricing", variant: "cards" },
    { type: "testimonials", variant: "cards" }, { type: "faq", variant: "accordion" },
    { type: "footer", variant: "columns" },
  ],
  "Health/Medical": [
    { type: "navbar", variant: "leftAligned" }, { type: "hero", variant: "split" },
    { type: "features", variant: "iconGrid" }, { type: "about", variant: "imageRight" },
    { type: "stats", variant: "counters" }, { type: "testimonials", variant: "spotlight" },
    { type: "contact", variant: "split" }, { type: "footer", variant: "columns" },
  ],
  "Personal Branding": [
    { type: "navbar", variant: "minimal" }, { type: "hero", variant: "splitReverse" },
    { type: "about", variant: "imageLeft" }, { type: "stats", variant: "cards" },
    { type: "gallery", variant: "featured" }, { type: "testimonials", variant: "spotlight" },
    { type: "cta", variant: "boxed" }, { type: "footer", variant: "centered" },
  ],
  Corporate: [
    { type: "navbar", variant: "leftAligned" }, { type: "hero", variant: "centered" },
    { type: "features", variant: "iconGrid" }, { type: "about", variant: "imageRight" },
    { type: "team", variant: "grid" }, { type: "stats", variant: "counters" },
    { type: "testimonials", variant: "cards" }, { type: "contact", variant: "split" },
    { type: "footer", variant: "columns" },
  ],
};

const VARIANT_POOL: Record<string, string[]> = {
  hero: ["centered", "split", "splitReverse", "minimal", "fullBleed"],
  features: ["iconGrid", "alternating", "compact"],
  testimonials: ["cards", "spotlight", "minimal"],
  cta: ["gradientBanner", "boxed", "split"],
  about: ["imageLeft", "imageRight", "centered"],
  stats: ["counters", "cards"],
  footer: ["columns", "minimal", "centered"],
  navbar: ["leftAligned", "centered", "minimal"],
};

function getSectionsForSite(type: string, siteIndex: number): BlueprintSection[] {
  const base = DFY_SECTIONS_BASE[type] || DFY_SECTIONS_BASE["Service"];
  return base.map((sec) => {
    const pool = VARIANT_POOL[sec.type];
    if (!pool || pool.length <= 1) return sec;
    const rotatedVariant = pool[(siteIndex + pool.indexOf(sec.variant)) % pool.length];
    return { ...sec, variant: rotatedVariant };
  });
}

const TYPE_CATEGORY: Record<string, string> = {
  "E-commerce": "ecommerce", Service: "functional", Portfolio: "agency",
  "Landing Page": "landing", Blog: "blog", Education: "course",
  "Health/Medical": "functional", "Personal Branding": "agency", Corporate: "functional",
};

const TONE_CYCLE = [
  "bold", "clean", "warm", "dark", "elegant",
  "neon", "ocean", "sunset", "midnight", "forest",
  "rose", "slate", "royal", "arctic", "ember",
];

const TYPE_COLORS: Record<string, string> = {
  "E-commerce": "bg-accent-pink/10 text-accent-pink border-accent-pink/20",
  Service: "bg-accent-green/10 text-accent-green border-accent-green/20",
  Portfolio: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  "Landing Page": "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
  Blog: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Education: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Health/Medical": "bg-red-500/10 text-red-400 border-red-500/20",
  "Personal Branding": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Corporate: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

/* ------------------------------------------------------------------ */
/*  SITE GENERATION: 180 unique sites                                 */
/* ------------------------------------------------------------------ */

interface DFYSite {
  id: number;
  name: string;
  niche: string;
  description: string;
  type: string;
  image: string;
  toneId: string;
  categoryId: string;
  featureSetIdx: number;
  testimonialSetIdx: number;
  heroImage: string;
}

const DFY_SITES: DFYSite[] = (() => {
  const sites: DFYSite[] = [];
  let id = 1;
  for (let typeIdx = 0; typeIdx < SITE_TYPES.length; typeIdx++) {
    const type = SITE_TYPES[typeIdx];
    const names = NAMES[type];
    const descs = DESCS[type];
    const heroes = HERO_IMGS[type];
    for (let i = 0; i < 20; i++) {
      sites.push({
        id: id++,
        name: names[i],
        niche: `${type} Solutions`,
        description: descs[i % descs.length],
        type,
        image: heroes[i % heroes.length],
        toneId: TONE_CYCLE[(typeIdx * 3 + i) % TONE_CYCLE.length],
        categoryId: TYPE_CATEGORY[type],
        featureSetIdx: (typeIdx + i) % FEATURE_SETS.length,
        testimonialSetIdx: (typeIdx + i + 1) % TESTIMONIAL_SETS.length,
        heroImage: heroes[(i + 3) % heroes.length],
      });
    }
  }
  return sites;
})();

/* ------------------------------------------------------------------ */
/*  Build rich, unique section contents for a DFY site                */
/* ------------------------------------------------------------------ */

function buildRichContents(
  site: DFYSite,
  sections: BlueprintSection[]
): Record<string, Record<string, unknown>> {
  const result: Record<string, Record<string, unknown>> = {};
  const seed = site.id * 17 + site.name.length;

  sections.forEach((sec, idx) => {
    const key = `${sec.type}-${idx}`;
    const base = generateDefaultContent(sec.type as SectionType, site.name, site.description, site.categoryId);

    if (sec.type === "navbar") {
      base.navLinks = buildNavLinksForSections(sections.map((s) => s.type));
    }

    if (sec.type === "hero") {
      const taglines = HERO_TAGLINES[site.type] || [];
      const tagline = taglines[site.id % taglines.length] || site.name;
      base.headline = tagline;
      base.subheadline = site.description;
      base.heroImage = site.heroImage;
      const proofNum = (seed % 50 + 5) * 1000;
      const proofLabels = ["Trusted by", "Loved by", "Chosen by", "Used by", "Powering"];
      base.socialProof = `${proofLabels[site.id % proofLabels.length]} ${proofNum.toLocaleString()}+ ${site.type === "Education" ? "students" : site.type === "Health/Medical" ? "patients" : site.type === "Blog" ? "readers" : "customers"}`;
    }

    if (sec.type === "about") {
      base.aboutImage = HERO_IMGS[site.type]?.[(DFY_SITES.indexOf(site) + 5) % (HERO_IMGS[site.type]?.length || 1)] || site.image;
    }

    if (sec.type === "features") {
      const featureImgs = getFeatureImages(6, seed);
      const nicheFeatures = NICHE_FEATURES[site.type] || FEATURE_SETS[site.featureSetIdx];
      base.items = nicheFeatures.map((f, fi) => ({ ...f, image: featureImgs[fi % featureImgs.length] }));
      base.subtitle = `Everything you need from ${site.name}`;
    }

    if (sec.type === "testimonials") {
      const avatars = getTeamPhotos(3, seed + 200);
      const nicheTestimonials = NICHE_TESTIMONIALS[site.type] || TESTIMONIAL_SETS[site.testimonialSetIdx];
      base.items = nicheTestimonials.map((t, ti) => ({ ...t, avatar: avatars[ti % avatars.length] }));
    }

    if (sec.type === "contentGrid") {
      const contentImgs = getContentImages(6, seed + 50);
      const items = base.items as { title: string; description: string; tag: string; image?: string }[];
      if (items) {
        base.items = items.map((item, ci) => ({ ...item, image: item.image || contentImgs[ci % contentImgs.length] }));
      }
    }

    if (sec.type === "gallery") {
      const galleryImgs = getGalleryImages(6, seed + 100);
      galleryImgs.forEach((url, gi) => { base[`image${gi}`] = base[`image${gi}`] || url; });
    }

    if (sec.type === "team") {
      const teamPhotos = getTeamPhotos(4, seed + 150);
      const members = base.members as { name: string; role: string; initials: string; photo?: string }[];
      if (members) {
        base.members = members.map((m, mi) => ({ ...m, photo: m.photo || teamPhotos[mi % teamPhotos.length] }));
      }
    }

    result[key] = base;
  });

  return result;
}

/* ------------------------------------------------------------------ */
/*  HELPER: parse DFY ID from notes                                   */
/* ------------------------------------------------------------------ */

function parseDfyId(notes: string): number | null {
  const m = notes.match(/\[DFY:(\d+)\]/);
  return m ? parseInt(m[1], 10) : null;
}

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function DFYPage() {
  const { user } = useAuth();
  const hasAccess = user?.features?.includes("dfy");
  const [claimedIds, setClaimedIds] = useState<Set<number>>(new Set());
  const [claimingId, setClaimingId] = useState<number | null>(null);
  const [websiteMap, setWebsiteMap] = useState<Record<number, SavedWebsite>>({});
  const [activeType, setActiveType] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const [previewSite, setPreviewSite] = useState<DFYSite | null>(null);
  const [claimError, setClaimError] = useState("");
  const [postsSite, setPostsSite] = useState<DFYSite | null>(null);
  const [postsData, setPostsData] = useState<SeoPost[]>([]);
  const [postsPage, setPostsPage] = useState(0);
  const [postsSearch, setPostsSearch] = useState("");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [copiedPost, setCopiedPost] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUserSites() {
      if (!user) return;
      const sites = await getWebsitesForUser(user.id);
      const map: Record<number, SavedWebsite> = {};
      const claimed = new Set<number>();
      sites.forEach((s) => {
        const dfyId = parseDfyId(s.notes || "");
        if (dfyId) {
          map[dfyId] = s;
          claimed.add(dfyId);
        }
      });
      setWebsiteMap(map);
      setClaimedIds(claimed);
    }
    fetchUserSites();
  }, [user]);

  const previewSections = useMemo(() => {
    if (!previewSite) return [];
    return getSectionsForSite(previewSite.type, previewSite.id);
  }, [previewSite]);

  const previewTone: ToneDefinition = useMemo(() => {
    if (!previewSite) return TONES[0];
    return getToneById(previewSite.toneId);
  }, [previewSite]);

  const previewContents = useMemo(() => {
    if (!previewSite) return {};
    return buildRichContents(previewSite, previewSections);
  }, [previewSite, previewSections]);

  const handlePreview = (site: DFYSite) => {
    setClaimError("");
    setPreviewSite(site);
  };

  const handleViewPosts = (site: DFYSite) => {
    const posts = getPostsForSite(site.type, site.name, site.id);
    setPostsData(posts);
    setPostsSite(site);
    setPostsPage(0);
    setPostsSearch("");
    setExpandedPost(null);
  };

  const handleCopyPost = (post: SeoPost, idx: number) => {
    navigator.clipboard.writeText(`${post.title}\n\n${post.body}`);
    setCopiedPost(idx);
    setTimeout(() => setCopiedPost(null), 2000);
  };

  const handleConfirmClaim = async () => {
    if (!user || !previewSite || claimingId) return;
    setClaimingId(previewSite.id);
    setClaimError("");

    try {
      const sections = getSectionsForSite(previewSite.type, previewSite.id);
      const sectionContents = buildRichContents(previewSite, sections);

      const res = await fetch("/api/dfy/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          siteName: previewSite.name,
          niche: previewSite.niche,
          type: previewSite.type,
          description: previewSite.description,
          dfyId: previewSite.id,
          toneId: previewSite.toneId,
          categoryId: previewSite.categoryId,
          sections,
          sectionContents,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to claim" }));
        setClaimError(err.error || "Failed to claim website. Try again.");
        setClaimingId(null);
        return;
      }

      const data = await res.json();

      const claimed: SavedWebsite = {
        id: data.siteId,
        userId: user.id,
        businessName: previewSite.name,
        email: user.email || "",
        description: previewSite.description,
        productLink: "",
        logo: "",
        notes: `[DFY:${previewSite.id}] type: ${previewSite.type}`,
        category: previewSite.categoryId,
        categoryName: previewSite.type,
        blueprintId: "dfy",
        blueprintName: `DFY ${previewSite.type}`,
        toneId: previewSite.toneId,
        sections,
        sectionContents,
        slug: data.slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setClaimedIds((prev) => new Set([...prev, previewSite.id]));
      setWebsiteMap((prev) => ({ ...prev, [previewSite.id]: claimed }));
      setPreviewSite(null);
    } catch (err) {
      console.error("Error claiming site:", err);
      setClaimError("Connection error. Please try again.");
    } finally {
      setClaimingId(null);
    }
  };

  const filteredSites =
    activeType === "All" ? DFY_SITES : DFY_SITES.filter((s) => s.type === activeType);
  const displayedSites = filteredSites.slice(0, visibleCount);
  const types = ["All", ...SITE_TYPES];

  if (!hasAccess) return <PremiumGate feature="dfy" />;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text uppercase tracking-tight">Done-For-You Library</span>
        </h1>
        <div className="border-l-4 border-accent-pink pl-6 py-2 bg-accent-pink/5 rounded-r-2xl">
          <p className="text-gray-200 text-xl font-black">
            {DFY_SITES.length} unique websites across {SITE_TYPES.length} categories — each with
            200 SEO posts.
          </p>
          <p className="text-gray-500 mt-1 font-medium">
            Preview any site, then add it to your collection with one click.
          </p>
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-3 mb-10 pb-4 overflow-x-auto no-scrollbar mask-fade-right">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => { setActiveType(t); setVisibleCount(12); }}
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

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedSites.map((site) => {
          const isClaimed = claimedIds.has(site.id);
          const dbSite = websiteMap[site.id];
          const tone = getToneById(site.toneId);

          return (
            <div key={site.id} className="card group p-0 overflow-hidden bg-gray-900/40 border-gray-800/50 hover:border-crux-500/30 transition-all shadow-xl hover:shadow-2xl flex flex-col">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.image} alt={site.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border backdrop-blur-md" style={{ backgroundColor: tone.primary + "22", color: tone.primary, borderColor: tone.primary + "44" }}>
                    {tone.name} Theme
                  </span>
                </div>
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
                  <button
                    onClick={(e) => { e.stopPropagation(); handleViewPosts(site); }}
                    className="shrink-0 flex items-center gap-1.5 bg-crux-500/10 text-crux-400 px-3 py-1 rounded-xl border border-crux-500/20 text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-crux-500/20 hover:border-crux-500/40 transition-all cursor-pointer"
                  >
                    <Zap size={12} className="fill-crux-500" /> 200 POSTS
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-8 line-clamp-3 leading-relaxed">
                  {site.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner transition-all" style={{ backgroundColor: tone.primary + "11", borderColor: tone.primary + "33", color: tone.primary }}>
                      <Layout size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-tighter">Niche</p>
                      <p className="text-xs font-bold text-gray-300">{site.niche}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => handlePreview(site)}
                      className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-crux-400 hover:text-crux-200 transition-all group/link bg-crux-500/5 px-4 py-2.5 rounded-xl border border-crux-500/10 hover:border-crux-500/30">
                      Preview <ExternalLink size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </button>
                    {isClaimed && dbSite ? (
                      <a href={`/site/${dbSite.slug}?id=${dbSite.id}`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-green-500/10 text-green-400 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/20">
                        View Live <ExternalLink size={13} />
                      </a>
                    ) : (
                      <button onClick={() => handlePreview(site)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg bg-accent-pink text-white hover:bg-accent-pink/80 shadow-accent-pink/20 hover:scale-105 active:scale-95">
                        Claim <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tone accent bar */}
              <div className="h-1.5 w-full" style={{ background: tone.gradient, opacity: 0.5 }} />
            </div>
          );
        })}
      </div>

      {/* Load More */}
      {visibleCount < filteredSites.length && (
        <div className="mt-16 text-center">
          <button
            onClick={() => setVisibleCount((p) => Math.min(p + 12, filteredSites.length))}
            className="px-14 py-5 rounded-3xl bg-gray-900 border border-gray-800 text-gray-400 font-black uppercase tracking-widest hover:border-crux-500 hover:text-crux-400 transition-all shadow-2xl hover:scale-105 active:scale-95"
          >
            Load More <span className="text-gray-600 mx-2">|</span>
            <span className="text-crux-500 font-black">{filteredSites.length - visibleCount} remaining</span>
          </button>
        </div>
      )}

      {/* Feature Section */}
      <div className="mt-24 card p-12 border-gray-800/50 bg-gradient-to-br from-gray-900/80 via-gray-900/40 to-transparent relative overflow-hidden rounded-3xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-pink/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-crux-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 grid md:grid-cols-3 gap-12">
          {[
            { icon: <Sparkles className="text-accent-pink" size={32} />, title: "AI Optimized", desc: "Every template is pre-tuned for maximum conversion and lightning fast load times.", color: "accent-pink" },
            { icon: <Zap className="text-accent-green" size={32} />, title: "Instant Deploy", desc: "Claim, preview, and add to your collection in seconds. No configuration needed.", color: "accent-green" },
            { icon: <MousePointer2 className="text-accent-cyan" size={32} />, title: "Full Control", desc: "Once claimed, you have full access to edit content, products, and styles.", color: "accent-cyan" },
          ].map((f) => (
            <div key={f.title} className="text-center group/feature">
              <div className={`w-16 h-16 rounded-3xl bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-xl group-hover/feature:border-${f.color}/50 group-hover/feature:bg-${f.color}/5 transition-all duration-500 group-hover/feature:scale-110`}>
                {f.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{f.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PREVIEW & CLAIM MODAL ===== */}
      {previewSite && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => { if (!claimingId) setPreviewSite(null); }} />
          <div className="relative z-10 w-full max-w-5xl max-h-[95vh] flex flex-col animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between bg-gray-900/90 backdrop-blur-md p-5 rounded-t-2xl border-t border-x border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: previewTone.gradient }}>
                  <Globe size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">{previewSite.name}</h3>
                  <p className="text-xs text-gray-500">{previewSite.type} &middot; {previewTone.name} Theme</p>
                </div>
              </div>
              <button onClick={() => { if (!claimingId) setPreviewSite(null); }}
                className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Preview */}
            <div className="flex-1 overflow-hidden border-x border-gray-800 bg-gray-950">
              <WebsitePreview
                sections={previewSections}
                tone={previewTone}
                businessName={previewSite.name}
                category={previewSite.categoryId}
                description={previewSite.description}
                sectionContents={previewContents}
                maxHeight="60vh"
                scale={0.5}
                showChrome={false}
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-900/90 backdrop-blur-md p-5 rounded-b-2xl border-b border-x border-gray-800 flex flex-col sm:flex-row items-center gap-4">
              {claimError && <p className="text-sm text-red-400 font-medium flex-1">{claimError}</p>}
              <div className="flex items-center gap-3 ml-auto">
                <button onClick={() => { if (!claimingId) setPreviewSite(null); }} disabled={!!claimingId}
                  className="px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-gray-400 bg-gray-800 hover:bg-gray-700 transition-all border border-gray-700 disabled:opacity-50">
                  Cancel
                </button>
                {claimedIds.has(previewSite.id) && websiteMap[previewSite.id] ? (
                  <a href={`/site/${websiteMap[previewSite.id].slug}?id=${websiteMap[previewSite.id].id}`} target="_blank" rel="noreferrer"
                    className="px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white bg-green-600 hover:bg-green-500 transition-all shadow-xl shadow-green-600/30 hover:scale-105 active:scale-95 flex items-center gap-2">
                    <ExternalLink size={16} /> View Live Site
                  </a>
                ) : (
                  <button onClick={handleConfirmClaim} disabled={!!claimingId}
                    className="px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white bg-accent-pink hover:bg-accent-pink/80 transition-all shadow-xl shadow-accent-pink/30 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100 flex items-center gap-2">
                    {claimingId ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Adding...</>
                    ) : (
                      <><CheckCircle2 size={16} /> Add to My Websites</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ===== POSTS BROWSER MODAL ===== */}
      {postsSite && postsData.length > 0 && (() => {
        const POSTS_PER_PAGE = 20;
        const filtered = postsSearch.trim()
          ? postsData.filter((p) =>
              p.title.toLowerCase().includes(postsSearch.toLowerCase()) ||
              p.excerpt.toLowerCase().includes(postsSearch.toLowerCase())
            )
          : postsData;
        const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
        const pagePosts = filtered.slice(postsPage * POSTS_PER_PAGE, (postsPage + 1) * POSTS_PER_PAGE);

        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setPostsSite(null)} />
            <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col animate-scale-in">
              {/* Header */}
              <div className="flex items-center justify-between bg-gray-900/90 backdrop-blur-md p-5 rounded-t-2xl border-t border-x border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">{postsSite.name}</h3>
                    <p className="text-xs text-gray-500">{filtered.length} SEO Posts &middot; {postsSite.type}</p>
                  </div>
                </div>
                <button onClick={() => setPostsSite(null)}
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-all">
                  <X size={24} />
                </button>
              </div>

              {/* Search */}
              <div className="bg-gray-900/80 border-x border-gray-800 px-5 py-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={postsSearch}
                    onChange={(e) => { setPostsSearch(e.target.value); setPostsPage(0); }}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-crux-500 focus:ring-1 focus:ring-crux-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Posts List */}
              <div className="flex-1 overflow-y-auto border-x border-gray-800 bg-gray-950 p-5 space-y-3">
                {pagePosts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-sm">No posts match your search.</div>
                ) : (
                  pagePosts.map((post, idx) => {
                    const globalIdx = postsPage * POSTS_PER_PAGE + idx;
                    const isExpanded = expandedPost === globalIdx;
                    const isCopied = copiedPost === globalIdx;
                    return (
                      <div
                        key={globalIdx}
                        className={`rounded-xl border transition-all ${
                          isExpanded
                            ? "border-crux-500/30 bg-gray-800/40"
                            : "border-gray-800/50 bg-gray-900/40 hover:border-gray-700"
                        }`}
                      >
                        <button
                          onClick={() => setExpandedPost(isExpanded ? null : globalIdx)}
                          className="w-full text-left px-4 py-3 flex items-start gap-3"
                        >
                          <span className="text-[10px] font-black text-gray-600 bg-gray-800 rounded-md px-2 py-1 mt-0.5 shrink-0">
                            {globalIdx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold ${isExpanded ? "text-white" : "text-gray-300"}`}>
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>
                          </div>
                          <ChevronRight size={14} className={`text-gray-600 shrink-0 mt-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-0 border-t border-gray-800/50 mt-0">
                            <pre className="text-sm text-gray-400 whitespace-pre-wrap font-sans leading-relaxed mt-3">
                              {post.body}
                            </pre>
                            <div className="flex items-center gap-2 mt-3">
                              {post.tags.map((tag) => (
                                <span key={tag} className="text-[10px] font-bold bg-crux-500/10 text-crux-400 px-2 py-0.5 rounded-md border border-crux-500/20">
                                  #{tag}
                                </span>
                              ))}
                              <button
                                onClick={(e) => { e.stopPropagation(); handleCopyPost(post, globalIdx); }}
                                className={`ml-auto flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                                  isCopied
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600"
                                }`}
                              >
                                <Copy size={12} /> {isCopied ? "Copied!" : "Copy"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Pagination */}
              <div className="bg-gray-900/90 backdrop-blur-md p-4 rounded-b-2xl border-b border-x border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Page {postsPage + 1} of {totalPages} &middot; {filtered.length} posts
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPostsPage((p) => Math.max(0, p - 1))}
                    disabled={postsPage === 0}
                    className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = totalPages <= 5 ? i : Math.max(0, Math.min(postsPage - 2, totalPages - 5)) + i;
                    return (
                      <button
                        key={page}
                        onClick={() => setPostsPage(page)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          postsPage === page
                            ? "bg-crux-500/20 text-crux-300 border border-crux-500/30"
                            : "bg-gray-800 text-gray-500 border border-gray-700 hover:text-white"
                        }`}
                      >
                        {page + 1}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPostsPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={postsPage >= totalPages - 1}
                    className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
