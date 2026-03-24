"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { SavedWebsite } from "@/lib/websites";
import { getToneById } from "@/data/tones";
import SectionRenderer from "@/components/SectionRenderer";

function toCamel(row: any): SavedWebsite {
  return {
    id: row.id,
    userId: row.user_id,
    businessName: row.business_name,
    email: row.email,
    description: row.description,
    productLink: row.product_link,
    logo: row.logo,
    notes: row.notes,
    category: row.category,
    categoryName: row.category_name,
    blueprintId: row.blueprint_id,
    blueprintName: row.blueprint_name,
    toneId: row.tone_id,
    sections: row.sections,
    sectionContents: row.section_contents,
    slug: row.slug,
    language: row.language,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export default function SitePage() {
  const { slug } = useParams();
  const [website, setWebsite] = useState<SavedWebsite | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!slug) return;
    const url = id
      ? `/api/get-site?id=${encodeURIComponent(id)}`
      : `/api/get-site?slug=${encodeURIComponent(slug as string)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.website) setWebsite(toCamel(data.website));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crux-500"></div>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-black text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">This website doesn&apos;t exist or is still being generated.</p>
        <a href="/" className="btn-primary">Go Back Home</a>
      </div>
    );
  }

  const tone = getToneById(website.toneId);
  const rtlLanguages = ["Arabic", "Hebrew", "Persian", "Urdu"];
  const isRTL = rtlLanguages.includes(website.language || "");

  return (
    <div
      style={{ backgroundColor: tone.bg, color: tone.text, fontFamily: tone.bodyFont }}
      dir={isRTL ? "rtl" : "ltr"}
      lang={isRTL ? (website.language === "Arabic" ? "ar" : "he") : "en"}
    >
      <link rel="stylesheet" href={tone.fontImport} />
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary-gradient: ${tone.gradient};
          --radius: ${tone.radius};
        }
        body {
          background-color: ${tone.bg};
        }
      `}} />
      <div className="min-h-screen">
        {(website.sections || []).map((section, idx) => (
          <SectionRenderer
            key={`${section.type}-${section.variant}-${idx}`}
            sectionType={section.type}
            variant={section.variant}
            tone={tone}
            content={((website.sectionContents || {})[`${section.type}-${idx}`] || {}) as any}
            businessName={website.businessName}
          />
        ))}
      </div>
    </div>
  );
}
