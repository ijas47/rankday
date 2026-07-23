import { NextResponse } from "next/server";
import { AUDIT_PRICE_USD } from "@/lib/ai-visibility-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  email?: string;
  brandName?: string;
  domain?: string;
  industry?: string;
  market?: string;
  competitors?: string;
  visibility?: number;
  grade?: string;
  intent?: "unlock-sample" | "request-full-audit" | "request-90-day";
  notes?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const intent = body.intent || "unlock-sample";
  const lead = {
    email,
    brandName: (body.brandName || "").trim(),
    domain: (body.domain || "").trim(),
    industry: (body.industry || "").trim(),
    market: (body.market || "").trim(),
    competitors: (body.competitors || "").trim(),
    visibility: typeof body.visibility === "number" ? body.visibility : null,
    grade: body.grade || null,
    intent,
    notes: (body.notes || "").trim(),
    auditPriceUsd: AUDIT_PRICE_USD,
    source: "ai-visibility-report",
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
      console.log("[ai-visibility-report-lead]", JSON.stringify(lead));
    }
  } catch {
    // Never block the user for a webhook failure.
  }

  return NextResponse.json({ ok: true });
}
