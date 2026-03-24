import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Uses service role key to bypass RLS - allows public site viewing
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");

  if (!slug && !id) {
    return NextResponse.json({ error: "Missing slug or id" }, { status: 400 });
  }

  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // If id is provided, fetch by id directly (most accurate)
    // Otherwise fall back to slug (takes most recently updated if duplicates exist)
    let query = supabaseAdmin.from("websites").select("*");
    if (id) {
      query = query.eq("id", id) as typeof query;
    } else {
      query = query.eq("slug", slug!).order("updated_at", { ascending: false }).limit(1) as typeof query;
    }

    const { data, error } = await query.maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ website: data });
  } catch (err) {
    console.error("get-site error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
