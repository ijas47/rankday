import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Server-side fallback for lead capture. Web3Forms is handled client-side (its
// free plan rejects server IPs), so this route is only used when no
// NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is set. Destination, in priority order:
//   1. LEAD_WEBHOOK_URL -> raw JSON POST to a Zapier/Make/CRM hook
//   2. none             -> logged to the function output
export async function POST(req: Request) {
  let body: { email?: string; url?: string; score?: number; isOwnSite?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const lead = {
    email,
    scannedUrl: body.url || "",
    score: typeof body.score === "number" ? body.score : null,
    isOwnSite: !!body.isOwnSite,
    source: "aeo-score-tool",
    at: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  try {
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
    } else {
      console.log("[aeo-lead]", JSON.stringify(lead));
    }
  } catch {
    // Don't fail the user's request if the destination is down — we still unlock.
  }

  return NextResponse.json({ ok: true });
}
