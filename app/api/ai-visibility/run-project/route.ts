import { NextResponse } from "next/server";
import { isValidAdminKey } from "@/lib/ai-visibility/auth";
import { runProject } from "@/lib/ai-visibility/data";
import { hasSupabaseServerConfig, missingSupabaseMessage } from "@/lib/ai-visibility/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isValidAdminKey(req)) return NextResponse.json({ error: "Invalid admin key." }, { status: 401 });
  if (!hasSupabaseServerConfig()) return NextResponse.json({ error: missingSupabaseMessage() }, { status: 503 });

  let body: { projectId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.projectId) return NextResponse.json({ error: "projectId is required." }, { status: 400 });

  try {
    const result = await runProject(body.projectId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Run failed." }, { status: 500 });
  }
}
