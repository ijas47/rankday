import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Captures a lead from the AEO Score tool. MVP behaviour: if LEAD_WEBHOOK_URL is
// set (e.g. a Zapier/Make hook, a CRM endpoint, or a Resend-backed function), the
// lead is forwarded there. Otherwise it's logged. Wire a provider before launch.
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
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      // Don't fail the user's request if the webhook is down — we still unlock.
    }
  } else {
    console.log("[aeo-lead]", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
