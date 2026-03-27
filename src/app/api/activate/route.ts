import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const VALID_FEATURES = ["10x", "automation", "infinite", "dfy"] as const;

/** listUsers is paginated; walk pages until we find the email or run out. */
async function findUserByEmail(
  listUsers: (opts: { page: number; perPage: number }) => Promise<{
    data: { users: User[] } | null;
    error: Error | null;
  }>,
  email: string
): Promise<User | null> {
  const want = email.toLowerCase();
  let page = 1;
  const perPage = 1000;
  for (;;) {
    const { data, error } = await listUsers({ page, perPage });
    if (error || !data?.users?.length) return null;
    const match = data.users.find((u) => u.email?.toLowerCase() === want);
    if (match) return match;
    if (data.users.length < perPage) return null;
    page += 1;
    if (page > 50) return null;
  }
}

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

    const match = await findUserByEmail(
      (opts) => supabaseAdmin.auth.admin.listUsers(opts),
      email
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
