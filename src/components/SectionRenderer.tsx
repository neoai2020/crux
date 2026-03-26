import { SectionProps, SectionType } from "@/data/sections";
import { NavbarCentered, NavbarLeftAligned, NavbarMinimal } from "./sections/NavbarSections";
import { HeroCentered, HeroSplit, HeroSplitReverse, HeroMinimal, HeroFullBleed } from "./sections/HeroSections";
import { FeaturesIconGrid, FeaturesAlternating, FeaturesCompact } from "./sections/FeaturesSections";
import { AboutImageLeft, AboutImageRight, AboutCentered } from "./sections/AboutSections";
import { TestimonialsCards, TestimonialsSpotlight, TestimonialsMinimal } from "./sections/TestimonialsSections";
import { CtaGradientBanner, CtaBoxed, CtaSplit } from "./sections/CtaSections";
import { PricingCards, PricingComparison, PricingHighlight } from "./sections/PricingSections";
import { FaqAccordion, FaqTwoColumn } from "./sections/FaqSections";
import { StatsCounters, StatsCards } from "./sections/StatsSections";
import { BenefitsIconList, BenefitsCards } from "./sections/BenefitsSections";
import { ContentGridCards, ContentGridList, ContentGridFeatured } from "./sections/ContentGridSections";
import { HowItWorksSteps, HowItWorksTimeline } from "./sections/HowItWorksSections";
import { GalleryGrid, GalleryFeatured } from "./sections/GallerySections";
import { TeamGrid, TeamCompact } from "./sections/TeamSections";
import { ContactSplit, ContactCentered } from "./sections/ContactSections";
import { LogoBarScroll, LogoBarGrid } from "./sections/LogoBarSections";
import { NewsletterInline, NewsletterSection } from "./sections/NewsletterSections";
import { VideoCentered, VideoSplit } from "./sections/VideoSections";
import { CountdownBanner, CountdownCard } from "./sections/CountdownSections";
import { FooterColumns, FooterMinimal, FooterCentered } from "./sections/FooterSections";

type SectionComponent = (props: SectionProps) => React.JSX.Element | null;

const SECTION_MAP: Record<string, Record<string, SectionComponent>> = {
  navbar: { centered: NavbarCentered, leftAligned: NavbarLeftAligned, minimal: NavbarMinimal },
  hero: { centered: HeroCentered, split: HeroSplit, splitReverse: HeroSplitReverse, minimal: HeroMinimal, fullBleed: HeroFullBleed },
  features: { iconGrid: FeaturesIconGrid, alternating: FeaturesAlternating, compact: FeaturesCompact },
  about: { imageLeft: AboutImageLeft, imageRight: AboutImageRight, centered: AboutCentered },
  testimonials: { cards: TestimonialsCards, spotlight: TestimonialsSpotlight, minimal: TestimonialsMinimal },
  cta: { gradientBanner: CtaGradientBanner, boxed: CtaBoxed, split: CtaSplit },
  pricing: { cards: PricingCards, comparison: PricingComparison, highlight: PricingHighlight },
  faq: { accordion: FaqAccordion, twoColumn: FaqTwoColumn },
  stats: { counters: StatsCounters, cards: StatsCards },
  benefits: { iconList: BenefitsIconList, cards: BenefitsCards },
  contentGrid: { cards: ContentGridCards, list: ContentGridList, featured: ContentGridFeatured },
  howItWorks: { steps: HowItWorksSteps, timeline: HowItWorksTimeline },
  gallery: { grid: GalleryGrid, featured: GalleryFeatured },
  team: { grid: TeamGrid, compact: TeamCompact },
  contact: { split: ContactSplit, centered: ContactCentered },
  logoBar: { scroll: LogoBarScroll, grid: LogoBarGrid },
  newsletter: { inline: NewsletterInline, section: NewsletterSection },
  video: { centered: VideoCentered, split: VideoSplit },
  countdown: { banner: CountdownBanner, card: CountdownCard },
  footer: { columns: FooterColumns, minimal: FooterMinimal, centered: FooterCentered },
};

const SECTION_ANCHOR_MAP: Record<string, string> = {
  hero: "home",
  features: "features",
  about: "about",
  testimonials: "testimonials",
  cta: "cta",
  pricing: "pricing",
  faq: "faq",
  contact: "contact",
  gallery: "gallery",
  stats: "stats",
  howItWorks: "how-it-works",
  contentGrid: "content",
  team: "team",
  logoBar: "partners",
  newsletter: "newsletter",
  benefits: "benefits",
  video: "video",
  countdown: "countdown",
};

interface SectionRendererProps extends SectionProps {
  sectionType: SectionType;
  variant: string;
}

export default function SectionRenderer({ sectionType, variant, tone, content, businessName }: SectionRendererProps) {
  const variants = SECTION_MAP[sectionType];
  if (!variants) return null;
  const Component = variants[variant] || Object.values(variants)[0];
  if (!Component) return null;
  const anchorId = SECTION_ANCHOR_MAP[sectionType];
  return (
    <div id={anchorId ? `section-${anchorId}` : undefined}>
      <Component tone={tone} content={content} businessName={businessName} />
    </div>
  );
}
