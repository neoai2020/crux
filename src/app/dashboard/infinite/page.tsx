"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Infinity,
  Sparkles,
  Globe,
  Languages,
  ExternalLink,
  Copy,
  Check,
  X,
  Loader2,
} from "lucide-react";
import WebsiteWizard from "@/components/WebsiteWizard";
import SharedPremiumGate from "@/components/PremiumGate";
import { getWebsitesForUser, saveWebsite, SavedWebsite } from "@/lib/websites";
import { getToneById } from "@/data/tones";
import WebsitePreview from "@/components/WebsitePreview";

const LANGUAGES = [
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
  { code: "cs", name: "Czech", flag: "🇨🇿" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
];


function TranslateSection({ userId }: { userId: string }) {
  const [websites, setWebsites] = useState<SavedWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState<SavedWebsite | null>(null);
  const [selectedLang, setSelectedLang] = useState("");
  const [translating, setTranslating] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadSites = useCallback(async () => {
    setLoading(true);
    const sites = await getWebsitesForUser(userId);
    setWebsites(sites);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    loadSites();
  }, [loadSites]);

  async function handleTranslate() {
    if (!selectedSite || !selectedLang) return;
    setTranslating(true);
    setError("");
    setSuccess(null);

    const lang = LANGUAGES.find((l) => l.code === selectedLang);
    if (!lang) return;

    try {
      const resp = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: selectedSite.sectionContents,
          targetLanguage: lang.name,
        }),
      });

      if (!resp.ok) {
        setError("Translation failed. Please try again.");
        setTranslating(false);
        return;
      }

      const { translatedContent } = await resp.json();
      if (!translatedContent || Object.keys(translatedContent).length === 0) {
        setError("Translation returned empty. Please try again.");
        setTranslating(false);
        return;
      }

      const cloneName = `${selectedSite.businessName} (${lang.name})`;
      const result = await saveWebsite({
        userId,
        businessName: cloneName,
        email: selectedSite.email,
        description: selectedSite.description,
        productLink: selectedSite.productLink,
        logo: selectedSite.logo,
        notes: `[Translated from ${selectedSite.id}] language: ${lang.name}`,
        category: selectedSite.category,
        categoryName: selectedSite.categoryName,
        blueprintId: selectedSite.blueprintId,
        blueprintName: selectedSite.blueprintName,
        toneId: selectedSite.toneId,
        sections: selectedSite.sections,
        sectionContents: translatedContent,
        language: lang.name,
      });

      if (result) {
        setSuccess(`Created "${cloneName}" successfully!`);
        setSelectedSite(null);
        setSelectedLang("");
        await loadSites();
      } else {
        setError("Failed to save translated website.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setTranslating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-crux-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-2">
          <span className="gradient-text">Clone &amp; Translate</span>
        </h2>
        <p className="text-gray-400">
          Pick any of your websites and create a translated copy in any language. You can create as many translations as you want.
        </p>
      </div>

      {success && (
        <div className="mb-6 card border-green-500/30 bg-green-500/5 flex items-center gap-3 py-4">
          <Check size={20} className="text-green-400 shrink-0" />
          <p className="text-green-300 text-sm font-medium">{success}</p>
          <button onClick={() => setSuccess(null)} className="ml-auto text-gray-500 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {websites.length === 0 ? (
        <div className="card text-center py-16">
          <Globe size={40} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No websites yet.</p>
          <p className="text-gray-500 text-sm">Create a website first using the Create tab, then come back to translate it.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((site) => {
            const tone = getToneById(site.toneId);
            return (
              <div
                key={site.id}
                className="card p-0 overflow-hidden bg-gray-900/40 border-gray-800/50 hover:border-crux-500/30 transition-all shadow-xl flex flex-col group"
              >
                <div className="h-40 overflow-hidden relative">
                  <WebsitePreview
                    sections={site.sections || []}
                    tone={tone}
                    businessName={site.businessName}
                    category={site.category}
                    description={site.description}
                    sectionContents={site.sectionContents || {}}
                    scale={0.25}
                    maxHeight="160px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-black text-white mb-1 truncate">
                    {site.businessName}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">{site.categoryName}</span>
                    {site.language && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 px-2 py-0.5 rounded-full">
                        {site.language}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-800/50">
                    <button
                      onClick={() => { setSelectedSite(site); setSelectedLang(""); setError(""); setSuccess(null); }}
                      className="flex items-center gap-1.5 flex-1 justify-center px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-accent-pink/10 text-accent-pink border border-accent-pink/20 hover:bg-accent-pink/20 hover:border-accent-pink/40 transition-all"
                    >
                      <Languages size={14} /> Translate
                    </button>
                    <a
                      href={`/site/${site.slug}?id=${site.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-crux-400 bg-crux-500/5 border border-crux-500/10 hover:border-crux-500/30 transition-all"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
                <div className="h-1 w-full" style={{ background: tone.gradient, opacity: 0.4 }} />
              </div>
            );
          })}
        </div>
      )}

      {/* Translate Modal */}
      {selectedSite && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => { if (!translating) { setSelectedSite(null); setError(""); } }} />
          <div className="relative z-10 w-full max-w-lg animate-scale-in">
            <div className="card border-gray-700/50 p-0 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Languages size={20} className="text-accent-pink" />
                    Clone &amp; Translate
                  </h3>
                  <button
                    onClick={() => { if (!translating) { setSelectedSite(null); setError(""); } }}
                    className="text-gray-400 hover:text-white p-1 hover:bg-gray-800 rounded-lg transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  Create a translated copy of <span className="text-white font-semibold">{selectedSite.businessName}</span>
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Source Website
                  </label>
                  <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-700/50">
                    <Copy size={16} className="text-crux-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{selectedSite.businessName}</p>
                      <p className="text-xs text-gray-500">{selectedSite.categoryName} · {selectedSite.language || "English"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Translate To
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-[240px] overflow-y-auto pr-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLang(lang.code)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                          selectedLang === lang.code
                            ? "bg-accent-pink/10 border-accent-pink/40 text-accent-pink"
                            : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600 hover:text-white"
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="truncate">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedLang && (
                  <div className="bg-crux-500/5 border border-crux-500/20 rounded-xl px-4 py-3">
                    <p className="text-sm text-gray-300">
                      This will create a new website called{" "}
                      <span className="text-white font-bold">
                        {selectedSite.businessName} ({LANGUAGES.find((l) => l.code === selectedLang)?.name})
                      </span>{" "}
                      with all content translated. The design, images, and layout stay the same.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-800 flex items-center gap-3">
                <button
                  onClick={() => { if (!translating) { setSelectedSite(null); setError(""); } }}
                  disabled={translating}
                  className="px-5 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-gray-400 bg-gray-800 hover:bg-gray-700 transition-all border border-gray-700 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTranslate}
                  disabled={!selectedLang || translating}
                  className="flex-1 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white bg-accent-pink hover:bg-accent-pink/80 transition-all shadow-xl shadow-accent-pink/20 disabled:opacity-50 disabled:hover:bg-accent-pink flex items-center justify-center gap-2"
                >
                  {translating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Languages size={16} />
                      Create Translation
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type InfiniteTab = "create" | "translate";

function InfiniteInner() {
  const { user } = useAuth();
  const [tab, setTab] = useState<InfiniteTab>("create");

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-crux-500" />
      </div>
    );
  }

  const hasAccess = user.features?.includes("infinite");

  if (!hasAccess) {
    return <SharedPremiumGate feature="infinite" />;
  }

  return (
    <div>
      {/* Tab Switcher */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crux-500 to-accent-pink flex items-center justify-center shadow-lg shadow-crux-500/20">
            <Infinity size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black">
              <span className="gradient-text">Infinite</span>
            </h1>
            <p className="text-xs text-gray-500">Unlimited generations &middot; Unlimited translations</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-900/60 p-1.5 rounded-2xl border border-gray-800/50 w-fit">
          <button
            onClick={() => setTab("create")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              tab === "create"
                ? "bg-crux-500 text-white shadow-lg shadow-crux-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <Sparkles size={14} /> Create
          </button>
          <button
            onClick={() => setTab("translate")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              tab === "translate"
                ? "bg-accent-pink text-white shadow-lg shadow-accent-pink/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <Languages size={14} /> Translate
          </button>
        </div>
      </div>

      {tab === "create" && (
        <WebsiteWizard
          unlimited
          brandTitle="Infinite"
          brandDescription="No limits — create unlimited websites with AI-powered generation."
          basePath="/dashboard/infinite"
        />
      )}

      {tab === "translate" && (
        <TranslateSection userId={user.id} />
      )}
    </div>
  );
}

export default function InfinitePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-crux-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <InfiniteInner />
    </Suspense>
  );
}
