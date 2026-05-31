import { NextRequest, NextResponse } from "next/server";

const COOKIE_DAYS = 90;

function cleanCode(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 48);
}

export function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const code = cleanCode(params.code || "");
  const url = new URL(req.url);

  if (!code) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  const destination = new URL("/", url.origin);
  destination.searchParams.set("rd_ref", code);
  destination.searchParams.set("utm_source", "referral");
  destination.searchParams.set("utm_medium", "partner");
  destination.searchParams.set("utm_campaign", `partner_${code}`);

  const response = NextResponse.redirect(destination);
  response.cookies.set("rd_ref", code, {
    path: "/",
    maxAge: COOKIE_DAYS * 24 * 60 * 60,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
