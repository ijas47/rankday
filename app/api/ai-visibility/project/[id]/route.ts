import { NextResponse } from "next/server";
import { requireProjectAccess } from "@/lib/ai-visibility/auth";
import { loadDashboardSummary } from "@/lib/ai-visibility/data";
import { hasSupabaseServerConfig, missingSupabaseMessage } from "@/lib/ai-visibility/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!hasSupabaseServerConfig()) {
    return NextResponse.json({ error: missingSupabaseMessage() }, { status: 503 });
  }

  const access = await requireProjectAccess(params.id);
  if (!access) return NextResponse.json({ error: "Not authorized for this project." }, { status: 401 });

  try {
    const summary = await loadDashboardSummary(params.id);
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load dashboard." }, { status: 500 });
  }
}
