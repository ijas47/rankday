import { NextResponse } from "next/server";
import { clearSessionCookies } from "@/lib/ai-visibility/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  clearSessionCookies();
  return NextResponse.json({ ok: true });
}
