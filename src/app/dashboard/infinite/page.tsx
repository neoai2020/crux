"use client";
import FeatureVideo from "@/components/FeatureVideo";

export default function InfinitePage() {
<<<<<<< Updated upstream
=======
  const { user } = useAuth();
  const [websites, setWebsites] = useState<SavedWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getWebsitesForUser(user.id).then((sites) => {
        setWebsites(sites);
        setLoading(false);
      });
    }
  }, [user]);

  async function handleTranslate(website: SavedWebsite, targetLang: string) {
    if (!user) return;
    setTranslatingId(website.id);

    try {
      const resp = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: website.sectionContents,
          targetLanguage: targetLang,
        }),
      });

      if (resp.ok) {
        const body = await resp.json();
        const translatedContent = body.translatedContent;
        if (!translatedContent) throw new Error("No translated content returned");

        await updateWebsite(website.id, user.id, {
          sectionContents: translatedContent,
          language: targetLang,
        });

        setWebsites((prev) =>
          prev.map((s) =>
            s.id === website.id
              ? { ...s, sectionContents: translatedContent, language: targetLang }
              : s
          )
        );
      } else {
        throw new Error(`Translate API error: ${resp.status}`);
      }
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setTranslatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-crux-500"></div>
      </div>
    );
  }

>>>>>>> Stashed changes
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">♾️</span>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">Infinite</span>
        </h1>
      </div>
      <p className="text-gray-400 mb-8">
        No limits. Unlimited generations, unlimited websites, unlimited growth.
      </p>

<<<<<<< Updated upstream
      <div className="mb-6">
        <FeatureVideo
          title="Go Infinite"
          subtitle="See what unlimited access looks like."
        />
      </div>
=======
      {websites.length === 0 ? (
        <div className="card text-center py-20">
          <p className="text-gray-400">You haven&apos;t created any websites yet.</p>
          <a href="/dashboard/wizard" className="btn-primary mt-4 inline-block">
            Create Your First Site
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {websites.map((site) => (
            <div
              key={site.id}
              className="card flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-1">{site.businessName}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  {site.categoryName} &bull; Current:{" "}
                  <span className="text-crux-400 font-bold">{site.language || "English"}</span>
                </p>
                <div className="flex gap-2">
                  <a
                    href={`/site/${site.slug}?id=${site.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-crux-300 hover:underline"
                  >
                    Preview Site &rarr;
                  </a>
                </div>
              </div>
>>>>>>> Stashed changes

      <div className="card border-crux-500/20 bg-gradient-to-br from-crux-500/5 to-transparent mb-6">
        <div className="text-center py-10">
          <span className="text-6xl block mb-4">🔒</span>
          <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Infinite plan removes all daily limits. Generate as many websites as you want, whenever you want.
          </p>
          <button className="btn-primary">
            Upgrade to Premium →
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-black gradient-text mb-1">∞</p>
          <p className="text-sm text-gray-400">Daily Generations</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black gradient-text mb-1">∞</p>
          <p className="text-sm text-gray-400">Active Websites</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black gradient-text mb-1">∞</p>
          <p className="text-sm text-gray-400">Marketing Messages</p>
        </div>
      </div>
    </div>
  );
}
