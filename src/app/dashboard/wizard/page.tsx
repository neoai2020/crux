"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/templates";
import { TONES, ToneDefinition, getToneById } from "@/data/tones";
import { SectionType, generateDefaultContent } from "@/data/sections";
import { Blueprint, BlueprintSection, pickTwoBlueprintsForUser, getBlueprintById } from "@/data/blueprints";
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

type Step = "category" | "details" | "generating" | "templates" | "tone" | "content" | "done";

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

function WizardInner() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [step, setStep] = useState<Step>("category");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [blueprintPair, setBlueprintPair] = useState<Blueprint[]>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [selectedTone, setSelectedTone] = useState<ToneDefinition>(TONES[0]);
  const [sectionContents, setSectionContents] = useState<Record<string, Record<string, unknown>>>({});
  const [editingWebsite, setEditingWebsite] = useState<SavedWebsite | null>(null);
  const [remaining, setRemaining] = useState(5);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    if (!user) return;
    setRemaining(getRemainingGenerations(user.id));
    setLimitReached(!canGenerate(user.id));

    if (editId) {
      const sites = getWebsitesForUser(user.id);
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
        setStep("details");
      }
    }
  }, [user, editId]);

  function buildDefaultContents(sections: BlueprintSection[]): Record<string, Record<string, unknown>> {
    const result: Record<string, Record<string, unknown>> = {};
    sections.forEach((sec, idx) => {
      const key = `${sec.type}-${idx}`;
      result[key] = generateDefaultContent(sec.type, form.businessName, form.description, form.category);
    });
    return result;
  }

  const handleCategorySelect = (catId: string, catName: string) => {
    setForm({ ...form, category: catId, categoryName: catName });
    setStep("details");
  };

  const handleGenerate = () => {
    if (!user || !canGenerate(user.id)) {
      setLimitReached(true);
      return;
    }
    setStep("generating");
    setTimeout(() => {
      const pair = pickTwoBlueprintsForUser(form.category, form.businessName);
      setBlueprintPair(pair);
      setStep("templates");
    }, 3500);
  };

  const handleBlueprintSelect = (bp: Blueprint) => {
    setSelectedBlueprint(bp);
    if (!(editingWebsite && Object.keys(sectionContents).length > 0)) {
      setSectionContents(buildDefaultContents(bp.sections));
    }
    setStep("tone");
  };

  const handleToneSelect = (tone: ToneDefinition) => {
    setSelectedTone(tone);
  };

  const handleToneConfirm = () => {
    setStep("content");
  };

  const handlePublish = () => {
    if (!user || !selectedBlueprint) return;

    if (editingWebsite) {
      updateWebsite(editingWebsite.id, user.id, {
        businessName: form.businessName,
        email: form.email,
        description: form.description,
        productLink: form.productLink,
        logo: form.logo,
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
      saveWebsite({
        userId: user.id,
        businessName: form.businessName,
        email: form.email,
        description: form.description,
        productLink: form.productLink,
        logo: form.logo,
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

    setRemaining(getRemainingGenerations(user.id));
    setStep("done");
  };

  const handleStartOver = () => {
    setStep("category");
    setForm(INITIAL_FORM);
    setBlueprintPair([]);
    setSelectedBlueprint(null);
    setSelectedTone(TONES[0]);
    setSectionContents({});
    setEditingWebsite(null);
    router.replace("/dashboard/wizard");
  };

  function updateSectionContent(key: string, field: string, value: unknown) {
    setSectionContents((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  }

  const stepProgress: Record<Step, number> = {
    category: 14,
    details: 28,
    generating: 42,
    templates: 50,
    tone: 64,
    content: 80,
    done: 100,
  };

  const stepLabels: Record<Step, string> = {
    category: "Step 1 of 7",
    details: "Step 2 of 7",
    generating: "Generating...",
    templates: "Step 3 of 7",
    tone: "Step 4 of 7",
    content: "Step 5 of 7",
    done: "Complete!",
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {limitReached && step !== "done" && (
        <div className="mb-6 card border-red-500/30 bg-red-500/5 text-center py-6">
          <span className="text-3xl block mb-2">⚠️</span>
          <h3 className="text-lg font-bold text-red-400 mb-1">Daily Limit Reached</h3>
          <p className="text-gray-400 text-sm">You&apos;ve used all 5 generations for today. Come back tomorrow!</p>
          <a href="/dashboard/websites" className="btn-secondary inline-block mt-4 text-sm">View My Websites →</a>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-black">
            <span className="gradient-text">{editingWebsite ? "Edit Website" : "Web Wizard"}</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">{remaining}/5 generations left</span>
            <span className="text-sm text-gray-500">{stepLabels[step]}</span>
          </div>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-crux-500 to-accent-pink rounded-full transition-all duration-700"
            style={{ width: `${stepProgress[step]}%` }}
          />
        </div>
      </div>

      {/* Step 1: Category */}
      {step === "category" && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold mb-2">What would you like to build?</h2>
          <p className="text-gray-400 mb-6">Choose the type of website or app you want to create.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id, cat.name)}
                className="card-hover text-center text-left group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="font-bold text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === "details" && (
        <div className="animate-fade-in">
          <button onClick={() => { if (!editingWebsite) setStep("category"); }} className="text-sm text-crux-400 hover:text-crux-300 mb-4 flex items-center gap-1">
            ← {editingWebsite ? "Editing " + editingWebsite.businessName : "Back to categories"}
          </button>
          <h2 className="text-xl font-bold mb-2">Tell us about your {form.categoryName}</h2>
          <p className="text-gray-400 mb-6">Add your business details so we can tailor the perfect website for you.</p>
          <div className="card space-y-5 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Business Name *</label>
              <input type="text" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className="input-field" placeholder="e.g. Awesome Digital Co." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="contact@yourbusiness.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Business Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field min-h-[80px] resize-none" placeholder="Briefly describe what your business does..." rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Product / Service Link</label>
              <input type="url" value={form.productLink} onChange={(e) => setForm({ ...form, productLink: e.target.value })} className="input-field" placeholder="https://your-product-link.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Logo URL</label>
              <input type="url" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} className="input-field" placeholder="https://your-logo-url.com/logo.png" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Additional Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field min-h-[80px] resize-none" placeholder="Any special requirements, color preferences, target audience..." rows={3} />
            </div>
            <button onClick={handleGenerate} disabled={!form.businessName || !form.email} className="btn-primary w-full text-lg disabled:opacity-50">
              {editingWebsite ? "Regenerate Website →" : "Generate My Website →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Generating */}
      {step === "generating" && (
        <div className="animate-fade-in flex flex-col items-center justify-center py-20">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-crux-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-crux-500 animate-spin" />
            <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-accent-pink animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
            <div className="absolute inset-0 flex items-center justify-center text-3xl">🧙</div>
          </div>
          <h2 className="text-2xl font-black mb-2">AI is building your website...</h2>
          <p className="text-gray-400 text-center max-w-md">
            Analyzing your requirements and assembling the best sections for{" "}
            <span className="text-white font-medium">{form.businessName}</span>
          </p>
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p className="animate-fade-in">✓ Analyzing business type...</p>
            <p className="animate-fade-in" style={{ animationDelay: "0.8s" }}>✓ Selecting optimal sections...</p>
            <p className="animate-fade-in" style={{ animationDelay: "1.6s" }}>✓ Assembling 2 unique templates...</p>
            <p className="animate-fade-in" style={{ animationDelay: "2.4s" }}>✓ Customizing for your brand...</p>
          </div>
        </div>
      )}

      {/* Step 4: Template Selection */}
      {step === "templates" && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold mb-2">Choose Your Template</h2>
          <p className="text-gray-400 mb-6">
            We built 2 unique templates for <span className="text-white font-medium">{form.businessName}</span>. Pick your favorite!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {blueprintPair.map((bp) => (
              <button key={bp.id} onClick={() => handleBlueprintSelect(bp)} className="text-left group">
                <div className="card-hover">
                  <WebsitePreview
                    sections={bp.sections}
                    tone={TONES[0]}
                    businessName={form.businessName}
                    category={form.category}
                    description={form.description}
                    scale={0.4}
                    maxHeight="380px"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{bp.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{bp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {bp.sections.filter((s) => s.type !== "navbar" && s.type !== "footer").map((s, i) => (
                        <span key={i} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full capitalize">{s.type}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep("details")} className="text-sm text-gray-500 hover:text-gray-300 mt-4">← Go back and edit details</button>
        </div>
      )}

      {/* Step 5: Tone Selection */}
      {step === "tone" && selectedBlueprint && (
        <div className="animate-fade-in">
          <button onClick={() => setStep("templates")} className="text-sm text-crux-400 hover:text-crux-300 mb-4 flex items-center gap-1">← Back to templates</button>
          <h2 className="text-xl font-bold mb-2">Choose Your Style</h2>
          <p className="text-gray-400 mb-6">Select a tone that matches your brand. This changes all colors, fonts, and styling.</p>

          <ToneSelector selectedToneId={selectedTone.id} onSelect={handleToneSelect} />

          <div className="mt-6">
            <WebsitePreview
              sections={selectedBlueprint.sections}
              tone={selectedTone}
              businessName={form.businessName}
              category={form.category}
              description={form.description}
              sectionContents={sectionContents}
              scale={0.5}
              maxHeight="500px"
            />
          </div>

          <button onClick={handleToneConfirm} className="btn-primary w-full text-lg mt-6">
            Continue with {selectedTone.name} →
          </button>
        </div>
      )}

      {/* Step 6: Content Editor */}
      {step === "content" && selectedBlueprint && (
        <div className="animate-fade-in">
          <button onClick={() => setStep("tone")} className="text-sm text-crux-400 hover:text-crux-300 mb-4 flex items-center gap-1">← Back to tones</button>
          <h2 className="text-xl font-bold mb-2">Customize Your Content</h2>
          <p className="text-gray-400 mb-6">Edit text for each section. Changes update the preview in real time.</p>

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
                  />
                );
              })}
              <button onClick={handlePublish} className="btn-primary w-full text-lg">
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
                scale={0.45}
                maxHeight="700px"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 7: Done */}
      {step === "done" && (
        <div className="animate-fade-in text-center py-16">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-3xl font-black mb-2">{editingWebsite ? "Website Updated!" : "Your Website is Live!"}</h2>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            <span className="text-white font-medium">{form.businessName}</span>{" "}
            {editingWebsite ? "has been updated successfully." : "has been published and is now hosted on our domain."}
          </p>
          <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-xl px-5 py-3 mb-8">
            <span className="text-green-400">🔗</span>
            <span className="text-crux-300 font-mono">crux.site/{form.businessName?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "your-site"}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/dashboard/websites" className="btn-primary">View My Websites →</a>
            <a href="/dashboard/marketing" className="btn-secondary">Generate Marketing Messages</a>
            <button onClick={handleStartOver} className="btn-secondary">Create Another Website</button>
          </div>
        </div>
      )}
    </div>
  );
}

const SECTION_LABELS: Record<string, string> = {
  navbar: "Navigation", hero: "Hero", features: "Features", about: "About",
  testimonials: "Testimonials", cta: "Call to Action", pricing: "Pricing",
  faq: "FAQ", contact: "Contact", gallery: "Gallery", stats: "Statistics",
  howItWorks: "How It Works", contentGrid: "Content Grid", team: "Team",
  logoBar: "Logo Bar", newsletter: "Newsletter", benefits: "Benefits",
  video: "Video", countdown: "Countdown", footer: "Footer",
};

const EDITABLE_FIELDS: Record<string, { key: string; label: string; type: "text" | "textarea" }[]> = {
  navbar: [{ key: "ctaText", label: "CTA Button", type: "text" }],
  hero: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "subheadline", label: "Subheadline", type: "text" },
    { key: "ctaText", label: "CTA Button", type: "text" },
  ],
  features: [{ key: "sectionTitle", label: "Section Title", type: "text" }],
  about: [
    { key: "heading", label: "Heading", type: "text" },
    { key: "text", label: "About Text", type: "textarea" },
  ],
  testimonials: [{ key: "sectionTitle", label: "Section Title", type: "text" }],
  cta: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "buttonText", label: "Button Text", type: "text" },
  ],
  pricing: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
  ],
  faq: [{ key: "sectionTitle", label: "Section Title", type: "text" }],
  contact: [
    { key: "heading", label: "Heading", type: "text" },
    { key: "description", label: "Description", type: "text" },
  ],
  gallery: [{ key: "sectionTitle", label: "Section Title", type: "text" }],
  stats: [],
  howItWorks: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
  ],
  contentGrid: [
    { key: "sectionTitle", label: "Section Title", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
  ],
  team: [{ key: "sectionTitle", label: "Section Title", type: "text" }],
  logoBar: [{ key: "title", label: "Title", type: "text" }],
  newsletter: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "text" },
  ],
  benefits: [{ key: "sectionTitle", label: "Section Title", type: "text" }],
  video: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "text" },
  ],
  countdown: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "text" },
  ],
  footer: [],
};

function ContentEditorBlock({
  sectionType,
  sectionKey,
  content,
  onUpdate,
}: {
  sectionType: SectionType;
  sectionKey: string;
  content: Record<string, unknown>;
  onUpdate: (key: string, field: string, value: unknown) => void;
}) {
  const fields = EDITABLE_FIELDS[sectionType] || [];
  if (fields.length === 0) return null;

  return (
    <div className="card">
      <h3 className="text-sm font-bold text-crux-300 uppercase tracking-wide mb-3">
        {SECTION_LABELS[sectionType] || sectionType}
      </h3>
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-gray-400 mb-1">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                value={(content[field.key] as string) || ""}
                onChange={(e) => onUpdate(sectionKey, field.key, e.target.value)}
                className="input-field min-h-[80px] resize-none text-sm"
                rows={3}
              />
            ) : (
              <input
                type="text"
                value={(content[field.key] as string) || ""}
                onChange={(e) => onUpdate(sectionKey, field.key, e.target.value)}
                className="input-field text-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-crux-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <WizardInner />
    </Suspense>
  );
}
