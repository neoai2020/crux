"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/templates";
import { TONES, ToneDefinition, getToneById } from "@/data/tones";
import { SectionType, generateDefaultContent } from "@/data/sections";
import {
  Blueprint,
  BlueprintSection,
  pickTwoBlueprintsForUser,
  getBlueprintById,
} from "@/data/blueprints";
import { useAuth } from "@/context/AuthContext";
import {
  saveWebsite,
  updateWebsite,
  getWebsitesForUser,
  canGenerate,
  getRemainingGenerations,
  SavedWebsite,
} from "@/lib/websites";
import WebsitePreview from "@/components/WebsitePreview";
import ToneSelector from "@/components/ToneSelector";
import LogoSelector from "@/components/LogoSelector";
import ArrayEditor from "@/components/ArrayEditor";
import ImageEditor from "@/components/ImageEditor";

type Page = "prompt" | "design" | "content" | "done";

interface FormData {
  category: string;
  categoryName: string;
  businessName: string;
  email: string;
  description: string;
  productLink: string;
  logo: string;
  notes: string;
}

const INITIAL_FORM: FormData = {
  category: "",
  categoryName: "",
  businessName: "",
  email: "",
  description: "",
  productLink: "",
  logo: "",
  notes: "",
};

const EXAMPLE_PROMPTS = [
  "I run a pizza restaurant in Brooklyn",
  "I sell handmade jewelry online",
  "I'm a freelance photographer",
  "We're a digital marketing agency",
  "I teach online yoga classes",
];

const SECTION_LABELS: Record<string, string> = {
  navbar: "Navigation",
  hero: "Hero",
  features: "Features",
  about: "About",
  testimonials: "Testimonials",
  cta: "Call to Action",
  pricing: "Pricing",
  faq: "FAQ",
  contact: "Contact",
  gallery: "Gallery",
  stats: "Statistics",
  howItWorks: "How It Works",
  contentGrid: "Content Grid",
  team: "Team",
  logoBar: "Logo Bar",
  newsletter: "Newsletter",
  benefits: "Benefits",
  video: "Video",
  countdown: "Countdown",
  footer: "Footer",
};

const EDITABLE_FIELDS: Record<
  string,
  {
    key: string;
    label: string;
    type: "text" | "textarea" | "array" | "image";
    imageContext?: string;
    arrayFields?: { key: string; label: string; type: "text" | "textarea" | "image" }[];
    arrayLabel?: string;
    maxItems?: number;
  }[]
> = {
  navbar: [{ key: "ctaText", label: "CTA Button", type: "text" }],
  hero: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "subheadline", label: "Subheadline", type: "textarea" },
    { key: "ctaText", label: "CTA Button", type: "text" },
    { key: "secondaryCtaText", label: "Secondary CTA", type: "text" },
    { key: "socialProof", label: "Social Proof Text", type: "text" },
    { key: "heroImage", label: "Hero Image", type: "image", imageContext: "hero banner" },
  ],
  features: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    {
      key: "items",
      label: "Features",
      type: "array",
      arrayLabel: "Feature",
      maxItems: 8,
      arrayFields: [
        { key: "icon", label: "Icon (emoji)", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  ],
  about: [
    { key: "heading", label: "Heading", type: "text" },
    { key: "text", label: "About Text", type: "textarea" },
    { key: "highlight", label: "Highlight Text", type: "text" },
    { key: "aboutImage", label: "About Image", type: "image", imageContext: "about section, team or workspace" },
  ],
  testimonials: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    {
      key: "items",
      label: "Testimonials",
      type: "array",
      arrayLabel: "Testimonial",
      maxItems: 5,
      arrayFields: [
        { key: "quote", label: "Quote", type: "textarea" },
        { key: "name", label: "Name", type: "text" },
        { key: "role", label: "Role", type: "text" },
      ],
    },
  ],
  cta: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "buttonText", label: "Button Text", type: "text" },
    { key: "secondaryButtonText", label: "Secondary Button", type: "text" },
    { key: "disclaimer", label: "Disclaimer", type: "text" },
  ],
  pricing: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    { key: "highlightLabel", label: "Highlight Badge", type: "text" },
    {
      key: "plans",
      label: "Pricing Plans",
      type: "array",
      arrayLabel: "Plan",
      maxItems: 4,
      arrayFields: [
        { key: "name", label: "Plan Name", type: "text" },
        { key: "price", label: "Price", type: "text" },
        { key: "period", label: "Period", type: "text" },
        { key: "ctaText", label: "Button Text", type: "text" },
      ],
    },
  ],
  faq: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    {
      key: "items",
      label: "Questions",
      type: "array",
      arrayLabel: "FAQ",
      maxItems: 8,
      arrayFields: [
        { key: "question", label: "Question", type: "text" },
        { key: "answer", label: "Answer", type: "textarea" },
      ],
    },
  ],
  contact: [
    { key: "heading", label: "Heading", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "email", label: "Email", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "address", label: "Address", type: "text" },
    { key: "buttonText", label: "Button Text", type: "text" },
  ],
  gallery: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    { key: "image0", label: "Image 1", type: "image", imageContext: "gallery photo" },
    { key: "image1", label: "Image 2", type: "image", imageContext: "gallery photo" },
    { key: "image2", label: "Image 3", type: "image", imageContext: "gallery photo" },
    { key: "image3", label: "Image 4", type: "image", imageContext: "gallery photo" },
    { key: "image4", label: "Image 5", type: "image", imageContext: "gallery photo" },
    { key: "image5", label: "Image 6", type: "image", imageContext: "gallery photo" },
  ],
  stats: [
    {
      key: "items",
      label: "Statistics",
      type: "array",
      arrayLabel: "Stat",
      maxItems: 6,
      arrayFields: [
        { key: "value", label: "Value", type: "text" },
        { key: "label", label: "Label", type: "text" },
      ],
    },
  ],
  howItWorks: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    {
      key: "steps",
      label: "Steps",
      type: "array",
      arrayLabel: "Step",
      maxItems: 5,
      arrayFields: [
        { key: "number", label: "Number", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  ],
  contentGrid: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    {
      key: "items",
      label: "Items",
      type: "array",
      arrayLabel: "Item",
      maxItems: 8,
      arrayFields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "tag", label: "Tag", type: "text" },
        { key: "image", label: "Image", type: "image" },
      ],
    },
  ],
  team: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    {
      key: "members",
      label: "Team Members",
      type: "array",
      arrayLabel: "Member",
      maxItems: 8,
      arrayFields: [
        { key: "name", label: "Name", type: "text" },
        { key: "role", label: "Role", type: "text" },
        { key: "initials", label: "Initials", type: "text" },
        { key: "photo", label: "Photo", type: "image" },
      ],
    },
  ],
  logoBar: [{ key: "title", label: "Title", type: "text" }],
  newsletter: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "placeholder", label: "Placeholder", type: "text" },
    { key: "buttonText", label: "Button Text", type: "text" },
  ],
  benefits: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    {
      key: "items",
      label: "Benefits",
      type: "array",
      arrayLabel: "Benefit",
      maxItems: 6,
      arrayFields: [
        { key: "icon", label: "Icon (emoji)", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  ],
  video: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "ctaText", label: "CTA Text", type: "text" },
  ],
  countdown: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "ctaText", label: "CTA Text", type: "text" },
  ],
  footer: [
    { key: "tagline", label: "Tagline", type: "textarea" },
    { key: "copyright", label: "Copyright", type: "text" },
  ],
};

function ContentEditorBlock({
  sectionType,
  sectionKey,
  content,
  onUpdate,
  tone,
  userId,
  businessName,
  description,
}: {
  sectionType: SectionType;
  sectionKey: string;
  content: Record<string, unknown>;
  onUpdate: (key: string, field: string, value: unknown) => void;
  tone: ToneDefinition;
  userId: string;
  businessName: string;
  description: string;
}) {
  const [open, setOpen] = useState(true);
  const fields = EDITABLE_FIELDS[sectionType] || [];
  if (fields.length === 0) return null;

  function buildPrompt(context?: string): string {
    return `${context || sectionType} for ${businessName}. ${description}`;
  }

  return (
    <div className="card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="text-sm font-bold text-crux-300 uppercase tracking-wide">
          {SECTION_LABELS[sectionType] || sectionType}
        </h3>
        <span className="text-gray-500 text-xs">{open ? "▼" : "▶"}</span>
      </button>
      {open && (
        <div className="space-y-3 mt-3">
          {fields.map((field) => {
            if (field.type === "array" && field.arrayFields) {
              const items =
                (content[field.key] as Record<string, unknown>[]) || [];
              return (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    {field.label}
                  </label>
                  <ArrayEditor
                    items={items}
                    fields={field.arrayFields}
                    onUpdate={(newItems) =>
                      onUpdate(sectionKey, field.key, newItems)
                    }
                    tone={tone}
                    maxItems={field.maxItems}
                    itemLabel={field.arrayLabel}
                    userId={userId}
                    imagePromptBuilder={(itemData, fieldKey) =>
                      `${fieldKey} for ${(itemData.title as string) || businessName}. ${description}`
                    }
                  />
                </div>
              );
            }

            if (field.type === "image") {
              return (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    {field.label}
                  </label>
                  <ImageEditor
                    value={(content[field.key] as string) || ""}
                    onChange={(val) => onUpdate(sectionKey, field.key, val)}
                    userId={userId}
                    autoPrompt={buildPrompt(field.imageContext)}
                    gradient={tone.gradient}
                    radius={tone.radius}
                  />
                </div>
              );
            }

            return (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={(content[field.key] as string) || ""}
                    onChange={(e) =>
                      onUpdate(sectionKey, field.key, e.target.value)
                    }
                    className="input-field min-h-[80px] resize-none text-sm"
                    rows={3}
                  />
                ) : (
                  <input
                    type="text"
                    value={(content[field.key] as string) || ""}
                    onChange={(e) =>
                      onUpdate(sectionKey, field.key, e.target.value)
                    }
                    className="input-field text-sm"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WizardInner() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [page, setPage] = useState<Page>("prompt");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [prompt, setPrompt] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [generating] = useState(false);

  const [blueprintPair, setBlueprintPair] = useState<Blueprint[]>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(
    null
  );
  const [selectedTone, setSelectedTone] = useState<ToneDefinition>(TONES[0]);
  const [sectionContents, setSectionContents] = useState<
    Record<string, Record<string, unknown>>
  >({});
  const [logoData, setLogoData] = useState("");
  const [editingWebsite, setEditingWebsite] = useState<SavedWebsite | null>(
    null
  );
  const [remaining, setRemaining] = useState(5);
  const [limitReached, setLimitReached] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      const [rem, canGen] = await Promise.all([
        getRemainingGenerations(user.id),
        canGenerate(user.id),
      ]);
      if (cancelled) return;
      setRemaining(rem);
      setLimitReached(!canGen);

      if (editId) {
        const sites = await getWebsitesForUser(user.id);
        if (cancelled) return;
        const site = sites.find((s) => s.id === editId);
        if (site) {
          setEditingWebsite(site);
          setForm({
            category: site.category,
            categoryName: site.categoryName,
            businessName: site.businessName,
            email: site.email,
            description: site.description,
            productLink: site.productLink,
            logo: site.logo,
            notes: site.notes,
          });
          const bp = getBlueprintById(site.category, site.blueprintId);
          if (bp) {
            setSelectedBlueprint(bp);
            setBlueprintPair([bp]);
          }
          setSelectedTone(getToneById(site.toneId));
          setSectionContents(site.sectionContents || {});
          setPage("design");
        }
      }
    })();

    return () => { cancelled = true; };
  }, [user, editId]);

  function buildDefaultContentsFromArgs(
    sections: BlueprintSection[],
    businessName: string,
    description: string,
    category: string
  ): Record<string, Record<string, unknown>> {
    const result: Record<string, Record<string, unknown>> = {};
    sections.forEach((sec, idx) => {
      const key = `${sec.type}-${idx}`;
      result[key] = generateDefaultContent(
        sec.type,
        businessName,
        description,
        category
      );
    });
    return result;
  }

  function updateSectionContent(key: string, field: string, value: unknown) {
    setSectionContents((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  }

  async function handleAnalyzePrompt() {
    if (!prompt.trim()) return;
    if (!user) return;

    const canGen = await canGenerate(user.id);
    if (!canGen) {
      setLimitReached(true);
      return;
    }

    setAnalyzing(true);

    const minDelay = new Promise((r) => setTimeout(r, 3000));

    let result: {
      businessName: string;
      category: string;
      description: string;
      email: string;
      suggestedTone: string;
    } | null = null;

    try {
      const resp = await fetch("/api/analyze-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      if (resp.ok) {
        result = await resp.json();
      }
    } catch {
      // fall through to manual
    }

    await minDelay;

    if (result) {
      const cat = CATEGORIES.find((c) => c.id === result!.category);
      const newForm: FormData = {
        ...INITIAL_FORM,
        businessName: result.businessName || "My Business",
        category: result.category || "functional",
        categoryName: cat?.name || "Functional Website",
        description: result.description || prompt.trim(),
        email: result.email || "",
      };
      setForm(newForm);
      setSelectedTone(getToneById(result.suggestedTone || "bold"));

      const pair = pickTwoBlueprintsForUser(
        newForm.category,
        newForm.businessName
      );
      setBlueprintPair(pair);
      if (pair.length > 0) {
        setSelectedBlueprint(pair[0]);
        setSectionContents(
          buildDefaultContentsFromArgs(
            pair[0].sections,
            newForm.businessName,
            newForm.description,
            newForm.category
          )
        );
      }
      setAnalyzing(false);
      setPage("design");
    } else {
      setAnalyzing(false);
      setForm({ ...INITIAL_FORM, description: prompt.trim() });
      setPage("design");
    }
  }

  function handleCategorySelect(catId: string, catName: string) {
    const newForm = { ...form, category: catId, categoryName: catName };
    setForm(newForm);

    const pair = pickTwoBlueprintsForUser(
      catId,
      newForm.businessName || "My Business"
    );
    setBlueprintPair(pair);
    if (pair.length > 0) {
      setSelectedBlueprint(pair[0]);
      setSectionContents(
        buildDefaultContentsFromArgs(
          pair[0].sections,
          newForm.businessName || "My Business",
          newForm.description,
          catId
        )
      );
    }
  }

  function handleBlueprintSelect(bp: Blueprint) {
    setSelectedBlueprint(bp);
    if (!(editingWebsite && Object.keys(sectionContents).length > 0)) {
      setSectionContents(
        buildDefaultContentsFromArgs(
          bp.sections,
          form.businessName,
          form.description,
          form.category
        )
      );
    }
  }

  function handleToneSelect(tone: ToneDefinition) {
    setSelectedTone(tone);
  }

  async function handleQuickPublish() {
    if (!user || !selectedBlueprint) return;
    const canGen = await canGenerate(user.id);
    if (!canGen) {
      setLimitReached(true);
      return;
    }
    await doPublish();
  }

  function handleGoToContent() {
    setPage("content");
  }

  async function handlePublish() {
    if (!user || !selectedBlueprint) return;
    await doPublish();
  }

  async function doPublish() {
    if (!user || !selectedBlueprint) return;

    const logoValue = logoData || form.logo;

    if (editingWebsite) {
      await updateWebsite(editingWebsite.id, user.id, {
        businessName: form.businessName,
        email: form.email,
        description: form.description,
        productLink: form.productLink,
        logo: logoValue,
        notes: form.notes,
        category: form.category,
        categoryName: form.categoryName,
        blueprintId: selectedBlueprint.id,
        blueprintName: selectedBlueprint.name,
        toneId: selectedTone.id,
        sections: selectedBlueprint.sections,
        sectionContents,
      });
    } else {
      await saveWebsite({
        userId: user.id,
        businessName: form.businessName,
        email: form.email,
        description: form.description,
        productLink: form.productLink,
        logo: logoValue,
        notes: form.notes,
        category: form.category,
        categoryName: form.categoryName,
        blueprintId: selectedBlueprint.id,
        blueprintName: selectedBlueprint.name,
        toneId: selectedTone.id,
        sections: selectedBlueprint.sections,
        sectionContents,
      });
    }

    const rem = await getRemainingGenerations(user.id);
    setRemaining(rem);
    setPage("done");
  }

  function handleStartOver() {
    setPage("prompt");
    setPrompt("");
    setForm(INITIAL_FORM);
    setBlueprintPair([]);
    setSelectedBlueprint(null);
    setSelectedTone(TONES[0]);
    setSectionContents({});
    setLogoData("");
    setEditingWebsite(null);
    setDetailsOpen(false);
    router.replace("/dashboard/wizard");
  }

  const pageProgress: Record<Page, number> = {
    prompt: 10,
    design: 50,
    content: 80,
    done: 100,
  };

  const progressValue = analyzing || generating ? 33 : pageProgress[page];

  const pageLabels: Record<Page, string> = {
    prompt: "Step 1 of 3",
    design: "Step 2 of 3",
    content: "Step 3 of 3",
    done: "Complete!",
  };

  const progressLabel =
    analyzing || generating ? "Generating..." : pageLabels[page];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {limitReached && page !== "done" && (
        <div className="mb-6 card border-red-500/30 bg-red-500/5 text-center py-6">
          <span className="text-3xl block mb-2">⚠️</span>
          <h3 className="text-lg font-bold text-red-400 mb-1">
            Daily Limit Reached
          </h3>
          <p className="text-gray-400 text-sm">
            You&apos;ve used all 5 generations for today. Come back tomorrow!
          </p>
          <a
            href="/dashboard/websites"
            className="btn-secondary inline-block mt-4 text-sm"
          >
            View My Websites →
          </a>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-black">
            <span className="gradient-text">
              {editingWebsite ? "Edit Website" : "Web Wizard"}
            </span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
              {remaining}/5 generations left
            </span>
            <span className="text-sm text-gray-500">{progressLabel}</span>
          </div>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-crux-500 to-accent-pink rounded-full transition-all duration-700"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

      {/* PAGE 1: DESCRIBE YOUR BUSINESS */}
      {page === "prompt" && !analyzing && (
        <div className="animate-fade-in max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Describe Your Business
          </h2>
          <p className="text-gray-400 mb-8 text-center">
            Tell us about your business and what you need — our AI will build
            your website in seconds.
          </p>

          <div className="card space-y-5">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="input-field min-h-[140px] resize-none text-base"
              placeholder="Tell us about your business and what you need..."
              rows={5}
            />

            <div>
              <p className="text-xs text-gray-500 mb-2">
                Try one of these:
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setPrompt(ex)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-700 text-gray-400 hover:border-crux-500 hover:text-crux-300 transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAnalyzePrompt}
              disabled={!prompt.trim() || limitReached}
              className="btn-primary w-full text-lg disabled:opacity-50"
            >
              Create My Website →
            </button>
          </div>
        </div>
      )}

      {/* GENERATING ANIMATION */}
      {(analyzing || generating) && (
        <div className="animate-fade-in flex flex-col items-center justify-center py-20">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-crux-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-crux-500 animate-spin" />
            <div
              className="absolute inset-3 rounded-full border-4 border-transparent border-t-accent-pink animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "0.8s",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
              🧙
            </div>
          </div>
          <h2 className="text-2xl font-black mb-2">
            AI is building your website...
          </h2>
          <p className="text-gray-400 text-center max-w-md">
            Analyzing your requirements and assembling the best sections
            {form.businessName && (
              <>
                {" "}
                for{" "}
                <span className="text-white font-medium">
                  {form.businessName}
                </span>
              </>
            )}
          </p>
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p className="animate-fade-in">✓ Analyzing business type...</p>
            <p className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
              ✓ Selecting optimal sections...
            </p>
            <p className="animate-fade-in" style={{ animationDelay: "1.6s" }}>
              ✓ Assembling 2 unique templates...
            </p>
            <p className="animate-fade-in" style={{ animationDelay: "2.4s" }}>
              ✓ Customizing for your brand...
            </p>
          </div>
        </div>
      )}

      {/* PAGE 2: YOUR WEBSITE (Design + Details) */}
      {page === "design" && !analyzing && !generating && (
        <div className="animate-fade-in">
          <button
            onClick={() => {
              if (!editingWebsite) {
                setPage("prompt");
              }
            }}
            className="text-sm text-crux-400 hover:text-crux-300 mb-4 flex items-center gap-1"
          >
            ←{" "}
            {editingWebsite
              ? `Editing ${editingWebsite.businessName}`
              : "Back to prompt"}
          </button>
          <h2 className="text-xl font-bold mb-2">Your Website</h2>
          <p className="text-gray-400 mb-6">
            Review your design choices and customize your{" "}
            <span className="text-white font-medium">{form.businessName}</span>{" "}
            website.
          </p>

          {/* 1. Business Details (collapsible) */}
          <div className="card mb-6">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between"
            >
              <div className="text-left">
                <h3 className="text-sm font-bold text-crux-300 uppercase tracking-wide">
                  Business Details
                </h3>
                {!detailsOpen && (
                  <p className="text-xs text-gray-500 mt-1">
                    {form.businessName}
                    {form.email ? ` · ${form.email}` : ""}
                  </p>
                )}
              </div>
              <span className="text-gray-500 text-xs">
                {detailsOpen ? "▼" : "▶"}
              </span>
            </button>
            {detailsOpen && (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) =>
                      setForm({ ...form, businessName: e.target.value })
                    }
                    className="input-field"
                    placeholder="e.g. Awesome Digital Co."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="input-field"
                    placeholder="contact@yourbusiness.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Business Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="input-field min-h-[80px] resize-none"
                    placeholder="Briefly describe what your business does..."
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Category Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-crux-300 uppercase tracking-wide mb-3">
              Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => {
                const isActive = form.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id, cat.name)}
                    className={`card-hover text-left group ${
                      isActive
                        ? "ring-2 ring-crux-500 bg-crux-500/5"
                        : ""
                    }`}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <h3 className="font-bold text-xs mb-0.5">{cat.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {cat.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Two Template Previews */}
          {blueprintPair.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-crux-300 uppercase tracking-wide mb-3">
                Choose Your Template
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {blueprintPair.map((bp) => {
                  const isActive = selectedBlueprint?.id === bp.id;
                  return (
                    <button
                      key={bp.id}
                      onClick={() => handleBlueprintSelect(bp)}
                      className={`text-left group ${
                        isActive ? "ring-2 ring-crux-500 rounded-2xl" : ""
                      }`}
                    >
                      <div className="card-hover">
                        <WebsitePreview
                          sections={bp.sections}
                          tone={selectedTone}
                          businessName={form.businessName}
                          category={form.category}
                          description={form.description}
                          sectionContents={sectionContents}
                          logoData={logoData || undefined}
                          scale={0.35}
                          maxHeight="320px"
                        />
                        <div className="p-3">
                          <h3 className="text-base font-bold mb-0.5">
                            {bp.name}
                          </h3>
                          <p className="text-xs text-gray-400 mb-2">
                            {bp.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {bp.sections
                              .filter(
                                (s) =>
                                  s.type !== "navbar" && s.type !== "footer"
                              )
                              .map((s, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full capitalize"
                                >
                                  {s.type}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Tone Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-crux-300 uppercase tracking-wide mb-3">
              Style &amp; Tone
            </h3>
            <ToneSelector
              selectedToneId={selectedTone.id}
              onSelect={handleToneSelect}
            />
          </div>

          {/* 5. Logo Section */}
          <div className="card mb-6">
            <h3 className="text-sm font-bold text-crux-300 uppercase tracking-wide mb-3">
              Logo
            </h3>
            <LogoSelector
              businessName={form.businessName || "My Business"}
              tone={selectedTone}
              selectedLogo={logoData}
              onSelect={setLogoData}
            />
          </div>

          {/* Live Preview */}
          {selectedBlueprint && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-crux-300 uppercase tracking-wide mb-3">
                Preview
              </h3>
              <WebsitePreview
                sections={selectedBlueprint.sections}
                tone={selectedTone}
                businessName={form.businessName}
                category={form.category}
                description={form.description}
                sectionContents={sectionContents}
                logoData={logoData || undefined}
                scale={0.5}
                maxHeight="500px"
                showChrome
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGoToContent}
              disabled={!selectedBlueprint || !form.businessName}
              className="btn-primary flex-1 text-lg disabled:opacity-50"
            >
              Customize Content →
            </button>
            <button
              onClick={handleQuickPublish}
              disabled={!selectedBlueprint || !form.businessName || limitReached}
              className="btn-secondary flex-1 text-lg disabled:opacity-50"
            >
              {editingWebsite ? "Save Changes" : "Quick Publish"}
            </button>
          </div>
        </div>
      )}

      {/* PAGE 3: MAKE IT YOURS (Content Editor) */}
      {page === "content" && selectedBlueprint && (
        <div className="animate-fade-in">
          <button
            onClick={() => setPage("design")}
            className="text-sm text-crux-400 hover:text-crux-300 mb-4 flex items-center gap-1"
          >
            ← Back to design
          </button>
          <h2 className="text-xl font-bold mb-2">Make It Yours</h2>
          <p className="text-gray-400 mb-6">
            Edit every piece of content. Changes update the preview in real
            time.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {selectedBlueprint.sections.map((sec, idx) => {
                const key = `${sec.type}-${idx}`;
                const c = sectionContents[key] || {};
                return (
                  <ContentEditorBlock
                    key={key}
                    sectionType={sec.type}
                    sectionKey={key}
                    content={c}
                    onUpdate={updateSectionContent}
                    tone={selectedTone}
                    userId={user?.id || ""}
                    businessName={form.businessName}
                    description={form.description}
                  />
                );
              })}
              <button
                onClick={handlePublish}
                className="btn-primary w-full text-lg"
              >
                {editingWebsite ? "Save Changes" : "Publish Website"} →
              </button>
            </div>

            {/* Preview Panel */}
            <div className="sticky top-0">
              <WebsitePreview
                sections={selectedBlueprint.sections}
                tone={selectedTone}
                businessName={form.businessName}
                category={form.category}
                description={form.description}
                sectionContents={sectionContents}
                logoData={logoData || undefined}
                scale={0.45}
                maxHeight="700px"
                showChrome
              />
            </div>
          </div>
        </div>
      )}

      {/* DONE SCREEN */}
      {page === "done" && (
        <div className="animate-fade-in text-center py-16">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-3xl font-black mb-2">
            {editingWebsite ? "Website Updated!" : "Your Website is Live!"}
          </h2>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            <span className="text-white font-medium">{form.businessName}</span>{" "}
            {editingWebsite
              ? "has been updated successfully."
              : "has been published and is now hosted on our domain."}
          </p>
          <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-xl px-5 py-3 mb-8">
            <span className="text-green-400">🔗</span>
            <span className="text-crux-300 font-mono">
              crux.site/
              {form.businessName?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
                "your-site"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/dashboard/websites" className="btn-primary">
              View My Websites →
            </a>
            <a href="/dashboard/marketing" className="btn-secondary">
              Generate Marketing Messages
            </a>
            <button onClick={handleStartOver} className="btn-secondary">
              Create Another Website
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-crux-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <WizardInner />
    </Suspense>
  );
}
