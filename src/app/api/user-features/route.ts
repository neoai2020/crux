import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ features: [] });
  }

  try {
    const svc = createServiceClient();
    const { data, error } = await svc
      .from("feature_access")
      .select("feature")
      .eq("user_id", userId);

    if (error) {
      console.error("Fetch features error:", error);
      return NextResponse.json({ features: [] });
    }

    const features = (data || []).map((r: { feature: string }) => r.feature);
    return NextResponse.json({ features });
  } catch (err) {
    console.error("User features error:", err);
    return NextResponse.json({ features: [] });
  }
}
