import { NextResponse } from "next/server";
import { isValidAdminKey } from "@/lib/ai-visibility/auth";
import { createProject } from "@/lib/ai-visibility/data";
import { hasSupabaseServerConfig, missingSupabaseMessage } from "@/lib/ai-visibility/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AdminProjectBody = {
  organizationName?: string;
  brandName?: string;
  domain?: string;
  market?: string;
  aliases?: string[];
  memberUserIds?: string[];
  competitors?: { name: string; domain?: string; aliases?: string[] }[];
  prompts?: { promptText: string; topic?: string; market?: string; priority?: number }[];
};

export async function POST(req: Request) {
  if (!isValidAdminKey(req)) return NextResponse.json({ error: "Invalid admin key." }, { status: 401 });
  if (!hasSupabaseServerConfig()) return NextResponse.json({ error: missingSupabaseMessage() }, { status: 503 });

  let body: AdminProjectBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const organizationName = (body.organizationName || body.brandName || "").trim();
  const brandName = (body.brandName || "").trim();
  const domain = (body.domain || "").replace(/^https?:\/\//i, "").replace(/\/.*$/, "").trim();
  const market = (body.market || "Global").trim();
  if (!organizationName || !brandName || !domain) {
    return NextResponse.json({ error: "organizationName, brandName, and domain are required." }, { status: 400 });
  }
  const memberUserIds = (body.memberUserIds || []).map((item) => item.trim()).filter(Boolean);
  if (!memberUserIds.length) {
    return NextResponse.json({ error: "At least one Supabase user ID is required for dashboard access." }, { status: 400 });
  }

  try {
    const project = await createProject({
      organizationName,
      brandName,
      domain,
      market,
      aliases: body.aliases || [],
      memberUserIds,
      competitors: (body.competitors || []).filter((item) => item.name).map((item) => ({
        name: item.name.trim(),
        domain: item.domain?.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").trim(),
        aliases: item.aliases || [],
      })),
      prompts: (body.prompts || []).filter((item) => item.promptText).map((item, index) => ({
        promptText: item.promptText.trim(),
        topic: item.topic || "AI visibility",
        market: item.market || market,
        priority: Number(item.priority || Math.max(1, 10 - index)),
      })),
    });
    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not create project." }, { status: 500 });
  }
}
