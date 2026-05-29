import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Captures a lead from the AEO Score tool. Destination, in priority order:
//   1. WEB3FORMS_ACCESS_KEY  -> emailed via Web3Forms (no backend needed)
//   2. LEAD_WEBHOOK_URL      -> raw JSON POST to a Zapier/Make/CRM hook
//   3. neither               -> logged to the function output
// Set one of these in your environment before launch.
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

  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
  const webhook = process.env.LEAD_WEBHOOK_URL;

  try {
    if (web3formsKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New AEO Score lead: ${lead.email} (${lead.score ?? "?"}/100)`,
          from_name: "Rankday AEO Score tool",
          email: lead.email,
          replyto: lead.email,
          message: `Email: ${lead.email}\nScanned: ${lead.scannedUrl}\nScore: ${lead.score}\nClient site: ${lead.isOwnSite ? "no (own site)" : "yes"}\nWhen: ${lead.at}`,
          // mirror raw fields too, in case you pipe Web3Forms into a sheet/CRM
          scanned_url: lead.scannedUrl,
          score: lead.score,
          is_own_site: lead.isOwnSite,
        }),
      });
    } else if (webhook) {
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
