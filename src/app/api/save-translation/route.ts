import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      businessName,
      email,
      description,
      productLink,
      logo,
      notes,
      category,
      categoryName,
      blueprintId,
      blueprintName,
      toneId,
      sections,
      sectionContents,
      language,
    } = body;

    if (!userId || !businessName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const svc = createServiceClient();

    const row: Record<string, unknown> = {
      user_id: userId,
      business_name: businessName,
      email: email || "",
      description: description || "",
      product_link: productLink || "",
      logo: logo || "",
      notes: notes || "",
      category: category || "",
      category_name: categoryName || "",
      blueprint_id: blueprintId || "",
      blueprint_name: blueprintName || "",
      tone_id: toneId || "midnight",
      sections: sections || [],
      section_contents: sectionContents || {},
      slug: makeSlug(businessName),
    };

    if (language) {
      row.language = language;
    }

    const { data, error } = await svc
      .from("websites")
      .insert(row)
      .select()
      .single();

    if (error) {
      console.error("Save translation error:", error);

      if (error.message?.includes("language") || error.code === "42703") {
        try {
          await svc.rpc("exec_sql", {
            sql: "ALTER TABLE public.websites ADD COLUMN IF NOT EXISTS language text;",
          });
        } catch {
          // column add might fail, try without language
        }

        delete row.language;
        const { data: retry, error: retryErr } = await svc
          .from("websites")
          .insert(row)
          .select()
          .single();

        if (retryErr || !retry) {
          return NextResponse.json(
            { error: "Failed to save. Please try again." },
            { status: 500 }
          );
        }

        return NextResponse.json({ website: retry });
      }

      return NextResponse.json(
        { error: error.message || "Failed to save." },
        { status: 500 }
      );
    }

    return NextResponse.json({ website: data });
  } catch (err) {
    console.error("Translation save error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
