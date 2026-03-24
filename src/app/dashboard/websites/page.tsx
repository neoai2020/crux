"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getWebsitesForUser, deleteWebsite, getRemainingGenerations, SavedWebsite } from "@/lib/websites";
import { getToneById } from "@/data/tones";
import WebsitePreview from "@/components/WebsitePreview";
import { ExternalLink, Globe, Trash2, Edit3, Plus, X } from "lucide-react";

export default function WebsitesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [websites, setWebsites] = useState<SavedWebsite[]>([]);
  const [remaining, setRemaining] = useState(5);
  const [deleteTarget, setDeleteTarget] = useState<SavedWebsite | null>(null);
  const [previewTarget, setPreviewTarget] = useState<SavedWebsite | null>(null);

  const loadData = useCallback(async () => {
    if (!user) return;
    const [sites, rem] = await Promise.all([
      getWebsitesForUser(user.id),
      getRemainingGenerations(user.id),
    ]);
    setWebsites(sites);
    setRemaining(rem);
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const confirmDelete = async () => {
    if (!deleteTarget || !user) return;
    await deleteWebsite(deleteTarget.id, user.id);
    setDeleteTarget(null);
    await loadData();
  };

  const handleEdit = (website: SavedWebsite) => {
    router.push(`/dashboard/wizard?edit=${website.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black">
            <span className="gradient-text">My Websites</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage, edit, or remove your generated websites.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Remaining</p>
            <p className="text-2xl font-black">
              <span className={remaining > 0 ? "text-accent-green" : "text-red-400"}>{remaining}</span>
              <span className="text-gray-600 text-lg">/5</span>
            </p>
          </div>
          <Link
            href="/dashboard/wizard"
            className={`btn-primary flex items-center gap-2 text-sm font-black uppercase tracking-widest ${remaining <= 0 ? "opacity-50 pointer-events-none" : ""}`}
          >
            <Plus size={16} /> New Website
          </Link>
        </div>
      </div>

      {websites.length === 0 ? (
        <div className="card text-center py-20 relative overflow-hidden bg-gray-900/40 border-gray-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-crux-500/5 to-transparent" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-2xl">
              <Globe size={40} className="text-gray-500" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">No websites yet</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Launch the Web Wizard to create your first high-converting website. You get 5 free generations every day!
            </p>
            <Link href="/dashboard/wizard" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm font-black uppercase tracking-widest">
              <Plus size={18} /> Create Your First Website
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {websites.map((website) => {
            const tone = getToneById(website.toneId);
            return (
              <div key={website.id} className="card group hover:border-crux-500/30 transition-all bg-gray-900/40 border-gray-800/50 p-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-crux-500/5 to-transparent -mr-32 -mt-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col lg:flex-row gap-6 lg:items-center relative z-10">
                  {/* Mini Preview */}
                  <div className="w-full lg:w-64 shrink-0 cursor-pointer group/preview" onClick={() => setPreviewTarget(website)}>
                    {website.sections && website.sections.length > 0 ? (
                      <div className="rounded-xl overflow-hidden border border-gray-800 group-hover/preview:border-crux-500/50 transition-all shadow-xl">
                        <div className="overflow-hidden" style={{ maxHeight: 160 }}>
                          <div style={{ transform: "scale(0.35)", transformOrigin: "top left", width: "285%", pointerEvents: "none" }}>
                            <div style={{ fontFamily: tone.bodyFont }}>
                              {/* eslint-disable-next-line @next/next/no-css-tags */}
                              <link rel="stylesheet" href={tone.fontImport} />
                              <WebsitePreview
                                sections={website.sections.slice(0, 2)}
                                tone={tone}
                                businessName={website.businessName}
                                category={website.category}
                                description={website.description}
                                sectionContents={website.sectionContents}
                                showChrome={false}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-md py-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter border-t border-gray-700 group-hover/preview:text-crux-400">
                          Click to Preview
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-40 rounded-xl flex items-center justify-center shadow-inner"
                        style={{ background: tone.gradient }}
                      >
                        <span className="text-white font-black text-3xl drop-shadow-lg">{website.businessName.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-black text-white truncate uppercase tracking-tight group-hover:text-crux-300 transition-colors">
                            {website.businessName}
                          </h3>
                          {website.status === "published" && (
                            <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-500/20 uppercase">
                              Published
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 flex items-center gap-2">
                          <span className="font-bold">{website.categoryName}</span>
                          <span className="text-gray-600">|</span>
                          <span>{website.blueprintName || "Custom Blueprint"}</span>
                          <span className="text-gray-600">|</span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tone.primary }} />
                            <span className="text-xs uppercase font-bold tracking-tighter text-gray-500">{tone.name}</span>
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleEdit(website)}
                          className={`p-2.5 rounded-xl border border-crux-500/30 text-crux-300 hover:bg-crux-500/20 transition-all ${remaining <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={remaining <= 0}
                          title="Edit Blueprint"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(website)}
                          className="p-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                          title="Delete Project"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 mt-3 leading-relaxed">
                      {(website.sectionContents?.["hero-1"] as Record<string, unknown>)?.headline as string ||
                       website.businessName} —{" "}
                      {(website.sectionContents?.["hero-1"] as Record<string, unknown>)?.subheadline as string ||
                       website.description || ""}
                    </p>

                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-800/50 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                      <a
                        href={`/site/${website.slug}?id=${website.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-crux-400 hover:text-crux-300 flex items-center gap-1.5 bg-crux-500/5 px-3 py-1.5 rounded-lg border border-crux-500/10 hover:border-crux-500/30 transition-all"
                      >
                        <ExternalLink size={14} /> Open Live Site
                      </a>
                      <span className="hidden sm:inline">Created {new Date(website.createdAt).toLocaleDateString()}</span>
                      {website.sections && (
                        <span className="hidden sm:inline font-black text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded-md">{website.sections.length} SECTIONS</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setDeleteTarget(null)} />
          <div className="card relative z-10 max-w-md w-full text-center p-10 border-red-500/20 bg-gray-900 shadow-2xl animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-lg shadow-red-500/10">
              <Trash2 size={40} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-tight">Delete Project?</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Are you sure you want to delete <span className="text-white font-black">{deleteTarget.businessName}</span>? All data and the live website will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1 py-3 font-bold uppercase tracking-widest text-xs">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-red-600/20">Delete Forever</button>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setPreviewTarget(null)} />
          <div className="relative z-10 w-full max-w-6xl max-h-[95vh] flex flex-col animate-scale-in">
            <div className="flex items-center justify-between mb-4 bg-gray-900/50 backdrop-blur-md p-4 rounded-t-2xl border-t border-x border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-crux-500 flex items-center justify-center">
                  <Globe size={16} className="text-white" />
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">{previewTarget.businessName}</h3>
              </div>
              <button onClick={() => setPreviewTarget(null)} className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden rounded-b-2xl border-b border-x border-gray-800 shadow-2xl">
              <WebsitePreview
                sections={previewTarget.sections || []}
                tone={getToneById(previewTarget.toneId)}
                businessName={previewTarget.businessName}
                category={previewTarget.category}
                description={previewTarget.description}
                sectionContents={previewTarget.sectionContents}
                maxHeight="80vh"
                scale={0.8}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
