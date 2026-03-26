import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

const VALID_FEATURES = ["10x", "automation", "infinite", "dfy"] as const;

export async function POST(req: NextRequest) {
  try {
    const { email, feature } = await req.json();

    if (!email || !feature) {
      return NextResponse.json(
        { error: "Email and feature are required." },
        { status: 400 }
      );
    }

    if (!VALID_FEATURES.includes(feature)) {
      return NextResponse.json(
        { error: "Invalid feature." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createServiceClient();

    const { data: users, error: listErr } =
      await supabaseAdmin.auth.admin.listUsers();

    if (listErr || !users) {
      return NextResponse.json(
        { error: "Unable to verify account. Please try again." },
        { status: 500 }
      );
    }

    const match = users.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!match) {
      return NextResponse.json(
        { error: "No account found with this email. Please sign up first." },
        { status: 404 }
      );
    }

    // Write to feature_access table for record keeping
    await supabaseAdmin
      .from("feature_access")
      .upsert(
        { user_id: match.id, feature },
        { onConflict: "user_id,feature" }
      );

    // Read current features from user_metadata, add the new one, deduplicate
    const existingFeatures: string[] =
      Array.isArray(match.user_metadata?.features)
        ? match.user_metadata.features
        : [];

    const updatedFeatures = [...new Set([...existingFeatures, feature])];

    // Persist features directly on the auth user's metadata
    const { error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(
      match.id,
      { user_metadata: { ...match.user_metadata, features: updatedFeatures } }
    );

    if (updateErr) {
      console.error("Failed to update user_metadata:", updateErr);
      return NextResponse.json(
        { error: "Failed to grant access. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, features: updatedFeatures });
  } catch (err) {
    console.error("Activate error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
