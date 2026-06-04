import { NextResponse } from "next/server";
import { isValidCronSecret } from "@/lib/ai-visibility/auth";
import { loadActiveProjects, runProject } from "@/lib/ai-visibility/data";
import { hasSupabaseServerConfig, missingSupabaseMessage } from "@/lib/ai-visibility/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!isValidCronSecret(req)) return NextResponse.json({ error: "Invalid cron secret." }, { status: 401 });
  if (!hasSupabaseServerConfig()) return NextResponse.json({ error: missingSupabaseMessage() }, { status: 503 });

  try {
    const projects = await loadActiveProjects();
    const results = [];
    for (const project of projects) {
      results.push({ projectId: project.id, ...(await runProject(project.id)) });
    }
    return NextResponse.json({ ok: true, projects: projects.length, results });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Scheduled run failed." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
