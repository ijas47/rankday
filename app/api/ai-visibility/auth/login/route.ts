import { NextResponse } from "next/server";
import { setSessionCookies } from "@/lib/ai-visibility/auth";
import { passwordLogin } from "@/lib/ai-visibility/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });

  try {
    const session = await passwordLogin(email, password);
    setSessionCookies(session.access_token, session.refresh_token, session.expires_in || 60 * 60);
    return NextResponse.json({ ok: true, user: session.user });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Login failed." }, { status: 401 });
  }
}
