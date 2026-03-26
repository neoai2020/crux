import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ websites: [] });
  }

  try {
    const svc = createServiceClient();
    const { data, error } = await svc
      .from("websites")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Fetch websites error:", error);
      return NextResponse.json({ websites: [] });
    }

    return NextResponse.json({ websites: data || [] });
  } catch (err) {
    console.error("User websites error:", err);
    return NextResponse.json({ websites: [] });
  }
}
