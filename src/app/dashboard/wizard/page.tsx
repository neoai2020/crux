"use client";
import { useState } from "react";
import { CATEGORIES, findBestTemplates, Template } from "@/data/templates";

type Step = "category" | "details" | "generating" | "templates" | "content" | "done";

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

export default function WizardPage() {
  const [step, setStep] = useState<Step>("category");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [content, setContent] = useState({
    headline: "",
    subheadline: "",
    aboutText: "",
    ctaText: "",
    features: "",
  });

  const handleCategorySelect = (catId: string, catName: string) => {
    setForm({ ...form, category: catId, categoryName: catName });
    setStep("details");
  };

  const handleGenerate = () => {
    setStep("generating");
    setTimeout(() => {
      const matched = findBestTemplates(form.category);
      setTemplates(matched);
      setStep("templates");
    }, 3000);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setContent({
      headline: form.businessName || "Your Business Name",
      subheadline: form.description || `Professional ${form.categoryName} for your business`,
      aboutText: form.notes || `Welcome to ${form.businessName}. We provide the best solutions for your needs.`,
      ctaText: "Get Started Today",
      features: template.features.join(", "),
    });
    setStep("content");
  };

  const handlePublish = () => {
    setStep("done");
  };

  const handleStartOver = () => {
    setStep("category");
    setForm(INITIAL_FORM);
    setTemplates([]);
    setSelectedTemplate(null);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-black">
            <span className="gradient-text">Web Wizard</span>
          </h1>
          <span className="text-sm text-gray-500">
            {step === "category" && "Step 1 of 5"}
            {step === "details" && "Step 2 of 5"}
            {step === "generating" && "Generating..."}
            {step === "templates" && "Step 3 of 5"}
            {step === "content" && "Step 4 of 5"}
            {step === "done" && "Complete!"}
          </span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-crux-500 to-accent-pink rounded-full transition-all duration-700"
            style={{
              width:
                step === "category" ? "20%" :
                step === "details" ? "40%" :
                step === "generating" ? "55%" :
                step === "templates" ? "60%" :
                step === "content" ? "80%" :
                "100%",
            }}
          />
        </div>
      </div>

      {/* Step 1: Category Selection */}
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

      {/* Step 2: Business Details */}
      {step === "details" && (
        <div className="animate-fade-in">
          <button onClick={() => setStep("category")} className="text-sm text-crux-400 hover:text-crux-300 mb-4 flex items-center gap-1">
            ← Back to categories
          </button>
          <h2 className="text-xl font-bold mb-2">Tell us about your {form.categoryName}</h2>
          <p className="text-gray-400 mb-6">Add your business details so we can tailor the perfect website for you.</p>

          <div className="card space-y-5 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Business Name *</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                className="input-field"
                placeholder="e.g. Awesome Digital Co."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="contact@yourbusiness.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Business Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="input-field min-h-[80px] resize-none"
                placeholder="Briefly describe what your business does..."
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Product / Service Link</label>
              <input
                type="url"
                value={form.productLink}
                onChange={(e) => setForm({ ...form, productLink: e.target.value })}
                className="input-field"
                placeholder="https://your-product-link.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Logo URL</label>
              <input
                type="url"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
                className="input-field"
                placeholder="https://your-logo-url.com/logo.png"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Additional Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="input-field min-h-[80px] resize-none"
                placeholder="Any special requirements, color preferences, target audience, or details you want included..."
                rows={3}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!form.businessName || !form.email}
              className="btn-primary w-full text-lg disabled:opacity-50"
            >
              Generate My Website →
            </button>
          </div>
        </div>
      )}

      {/* Generating Animation */}
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
            Analyzing your requirements and matching the best templates for{" "}
            <span className="text-white font-medium">{form.businessName}</span>
          </p>
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p className="animate-fade-in">✓ Analyzing business type...</p>
            <p className="animate-fade-in" style={{ animationDelay: "0.8s" }}>✓ Selecting optimal templates...</p>
            <p className="animate-fade-in" style={{ animationDelay: "1.6s" }}>✓ Customizing for your brand...</p>
          </div>
        </div>
      )}

      {/* Step 3: Template Selection */}
      {step === "templates" && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold mb-2">Choose Your Template</h2>
          <p className="text-gray-400 mb-6">
            We found 2 perfect templates for <span className="text-white font-medium">{form.businessName}</span>. Pick your favorite!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="card-hover text-left group"
              >
                <div
                  className="h-48 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden"
                  style={{ background: template.thumbnail }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                    <h3 className="text-2xl font-black text-white">{form.businessName || "Your Site"}</h3>
                    <p className="text-white/70 text-sm mt-1">{form.categoryName}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1">{template.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.sections.map((s) => (
                    <span key={s} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {template.features.map((f) => (
                    <span key={f} className="text-xs bg-crux-500/10 text-crux-300 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep("details")} className="text-sm text-gray-500 hover:text-gray-300 mt-4">
            ← Go back and edit details
          </button>
        </div>
      )}

      {/* Step 4: Content Editor */}
      {step === "content" && (
        <div className="animate-fade-in">
          <button onClick={() => setStep("templates")} className="text-sm text-crux-400 hover:text-crux-300 mb-4 flex items-center gap-1">
            ← Back to templates
          </button>
          <h2 className="text-xl font-bold mb-2">Add Your Content</h2>
          <p className="text-gray-400 mb-6">
            Customize the content for your <span className="text-white font-medium">{selectedTemplate?.name}</span> template.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="card space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Main Headline</label>
                <input
                  type="text"
                  value={content.headline}
                  onChange={(e) => setContent({ ...content, headline: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Sub-headline</label>
                <input
                  type="text"
                  value={content.subheadline}
                  onChange={(e) => setContent({ ...content, subheadline: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">About / Description</label>
                <textarea
                  value={content.aboutText}
                  onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
                  className="input-field min-h-[120px] resize-none"
                  rows={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Call to Action Text</label>
                <input
                  type="text"
                  value={content.ctaText}
                  onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                  className="input-field"
                />
              </div>
              <button onClick={handlePublish} className="btn-primary w-full text-lg">
                Publish Website →
              </button>
            </div>

            {/* Live Preview */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg px-3 py-1 text-xs text-gray-500 truncate">
                  crux.site/{form.businessName?.toLowerCase().replace(/\s+/g, "-") || "your-site"}
                </div>
              </div>
              <div
                className="rounded-xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center"
                style={{ background: selectedTemplate?.thumbnail || "linear-gradient(135deg, #667eea, #764ba2)" }}
              >
                {form.logo && (
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-4">
                    <span className="text-2xl font-black">
                      {form.businessName?.charAt(0) || "C"}
                    </span>
                  </div>
                )}
                <h3 className="text-3xl font-black text-white mb-2">{content.headline}</h3>
                <p className="text-white/80 mb-6 max-w-sm">{content.subheadline}</p>
                <div className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm">
                  {content.ctaText}
                </div>
                <div className="mt-8 text-white/60 text-sm max-w-md">
                  {content.aboutText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Done */}
      {step === "done" && (
        <div className="animate-fade-in text-center py-16">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-3xl font-black mb-2">Your Website is Live!</h2>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            <span className="text-white font-medium">{form.businessName}</span> has been published and is now hosted on our domain.
          </p>
          <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-xl px-5 py-3 mb-8">
            <span className="text-green-400">🔗</span>
            <span className="text-crux-300 font-mono">
              crux.site/{form.businessName?.toLowerCase().replace(/\s+/g, "-") || "your-site"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/dashboard/marketing" className="btn-primary">
              Generate Marketing Messages →
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
