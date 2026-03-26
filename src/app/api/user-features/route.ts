import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ features: [] });
  }

  try {
    const svc = createServiceClient();

    // Read features from feature_access table
    const { data, error } = await svc
      .from("feature_access")
      .select("feature")
      .eq("user_id", userId);

    if (error) {
      console.error("Fetch features error:", error);
      return NextResponse.json({ features: [] });
    }

    const dbFeatures = (data || []).map((r: { feature: string }) => r.feature);

    // Also sync them into user_metadata so they persist on the auth user
    if (dbFeatures.length > 0) {
      try {
        const { data: userData } = await svc.auth.admin.getUserById(userId);
        const existingMeta = userData?.user?.user_metadata || {};
        const existingFeatures: string[] = Array.isArray(existingMeta.features)
          ? existingMeta.features
          : [];

        const merged = [...new Set([...existingFeatures, ...dbFeatures])];

        if (merged.length !== existingFeatures.length || merged.some((f) => !existingFeatures.includes(f))) {
          await svc.auth.admin.updateUserById(userId, {
            user_metadata: { ...existingMeta, features: merged },
          });
        }
      } catch {
        // sync is best-effort, don't fail the request
      }
    }

    return NextResponse.json({ features: dbFeatures });
  } catch (err) {
    console.error("User features error:", err);
    return NextResponse.json({ features: [] });
  }
}
