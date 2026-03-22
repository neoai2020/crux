"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getWebsitesForUser, deleteWebsite, getRemainingGenerations, SavedWebsite } from "@/lib/websites";
import { getToneById } from "@/data/tones";
import WebsitePreview from "@/components/WebsitePreview";

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
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black">
            <span className="gradient-text">My Websites</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage, edit, or remove your generated websites.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Generations left today</p>
            <p className="text-2xl font-black">
              <span className={remaining > 0 ? "text-accent-green" : "text-red-400"}>{remaining}</span>
              <span className="text-gray-600 text-lg">/5</span>
            </p>
          </div>
          <Link
            href="/dashboard/wizard"
            className={`btn-primary text-sm ${remaining <= 0 ? "opacity-50 pointer-events-none" : ""}`}
          >
            + New Website
          </Link>
        </div>
      </div>

      {websites.length === 0 ? (
        <div className="card text-center py-16">
          <span className="text-6xl block mb-4">🌐</span>
          <h2 className="text-2xl font-bold mb-2">No websites yet</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Create your first website with the Web Wizard. You get 5 generations per day!
          </p>
          <Link href="/dashboard/wizard" className="btn-primary inline-block">
            Create Your First Website →
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {websites.map((website) => {
            const tone = getToneById(website.toneId);
            return (
              <div key={website.id} className="card group hover:border-crux-500/30 transition-all">
                <div className="flex gap-5">
                  {/* Mini Preview */}
                  <div className="w-56 shrink-0 cursor-pointer" onClick={() => setPreviewTarget(website)}>
                    {website.sections && website.sections.length > 0 ? (
                      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${tone.border || "#333"}` }}>
                        <div className="overflow-hidden" style={{ maxHeight: 140 }}>
                          <div style={{ transform: "scale(0.25)", transformOrigin: "top left", width: "400%", pointerEvents: "none" }}>
                            <div style={{ fontFamily: tone.bodyFont }}>
                              {/* eslint-disable-next-line @next/next/no-css-tags */}
                              <link rel="stylesheet" href={tone.fontImport} />
                              {website.sections.slice(0, 3).map((sec, idx) => (
                                <div key={idx}>
                                  <WebsitePreview
                                    sections={[sec]}
                                    tone={tone}
                                    businessName={website.businessName}
                                    category={website.category}
                                    description={website.description}
                                    sectionContents={website.sectionContents}
                                    showChrome={false}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-32 rounded-xl flex items-center justify-center"
                        style={{ background: tone.gradient }}
                      >
                        <span className="text-white font-black text-lg">{website.businessName.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold truncate">{website.businessName}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {website.categoryName} · {website.blueprintName || "Custom"}
                          <span className="ml-2 inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: tone.primary }} />
                            <span className="text-xs text-gray-500">{tone.name}</span>
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setPreviewTarget(website)}
                          className="text-sm px-4 py-2 rounded-xl border border-gray-700/50 text-gray-300 hover:bg-gray-800/50 transition-all"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => handleEdit(website)}
                          className={`text-sm px-4 py-2 rounded-xl border border-crux-500/30 text-crux-300 hover:bg-crux-500/10 transition-all ${remaining <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={remaining <= 0}
                          title={remaining <= 0 ? "No generations remaining today" : "Edit this website"}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(website)}
                          className="text-sm px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {(website.sectionContents?.["hero-1"] as Record<string, unknown>)?.headline as string ||
                       website.businessName} —{" "}
                      {(website.sectionContents?.["hero-1"] as Record<string, unknown>)?.subheadline as string ||
                       website.description || ""}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>🔗 crux.site/{website.slug}</span>
                      <span>Created {new Date(website.createdAt).toLocaleDateString()}</span>
                      {website.updatedAt !== website.createdAt && (
                        <span>Updated {new Date(website.updatedAt).toLocaleDateString()}</span>
                      )}
                      {website.sections && (
                        <span>{website.sections.length} sections</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="card relative z-10 max-w-md w-full text-center">
            <span className="text-4xl block mb-3">🗑️</span>
            <h3 className="text-xl font-bold mb-2">Delete Website?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{deleteTarget.businessName}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 px-6 py-3 rounded-xl font-semibold hover:bg-red-500/30 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setPreviewTarget(null)} />
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">{previewTarget.businessName}</h3>
              <button onClick={() => setPreviewTarget(null)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="flex-1 overflow-hidden rounded-xl">
              <WebsitePreview
                sections={previewTarget.sections || []}
                tone={getToneById(previewTarget.toneId)}
                businessName={previewTarget.businessName}
                category={previewTarget.category}
                description={previewTarget.description}
                sectionContents={previewTarget.sectionContents}
                maxHeight="80vh"
                scale={0.6}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
