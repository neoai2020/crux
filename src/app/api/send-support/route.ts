import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { from, subject, message } = await req.json();

    if (!from || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const freshdeskDomain = "curxai";
    const freshdeskKey = process.env.FRESHDESK_API_KEY;

    if (freshdeskKey) {
      const res = await fetch(`https://${freshdeskDomain}.freshdesk.com/api/v2/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${freshdeskKey}:X`).toString("base64")}`,
        },
        body: JSON.stringify({
          email: from,
          subject,
          description: message,
          priority: 1,
          status: 2,
        }),
      });

      if (res.ok) {
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ fallback: true }, { status: 202 });
  } catch {
    return NextResponse.json({ fallback: true }, { status: 202 });
  }
}
