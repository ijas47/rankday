import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { email?: string; url?: string; score?: number; isClientSite?: boolean };
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
    isClientSite: !!body.isClientSite,
    source: "store-seo-audit-tool",
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
      console.log("[store-seo-lead]", JSON.stringify(lead));
    }
  } catch {
    // Unlock anyway. Lead routing should not punish the visitor.
  }

  return NextResponse.json({ ok: true });
}
