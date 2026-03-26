import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

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

    const { error: upsertErr } = await supabaseAdmin
      .from("feature_access")
      .upsert(
        { user_id: match.id, feature },
        { onConflict: "user_id,feature" }
      );

    if (upsertErr) {
      console.error("Feature access upsert error:", upsertErr);
      return NextResponse.json(
        { error: "Failed to grant access. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Activate error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
