import { cookies } from "next/headers";
import { getAuthUser, selectRows } from "./supabase-rest";

const ACCESS_COOKIE = "rd_ai_access";
const REFRESH_COOKIE = "rd_ai_refresh";

export function setSessionCookies(accessToken: string, refreshToken: string, maxAge: number) {
  const jar = cookies();
  jar.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  jar.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearSessionCookies() {
  const jar = cookies();
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
}

export async function getCurrentUser() {
  const token = cookies().get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  try {
    return await getAuthUser(token);
  } catch {
    return null;
  }
}

export async function requireProjectAccess(projectId: string): Promise<{ userId: string; organizationIds: string[] } | null> {
  const user = await getCurrentUser();
  if (!user?.id) return null;
  const memberships = await selectRows<{ organization_id: string }>(
    "organization_members",
    `select=organization_id&user_id=eq.${encodeURIComponent(user.id)}`,
  );
  const organizationIds = memberships.map((item) => item.organization_id);
  if (!organizationIds.length) return null;
  const projects = await selectRows<{ id: string }>(
    "projects",
    `select=id&id=eq.${encodeURIComponent(projectId)}&organization_id=in.(${organizationIds.map(encodeURIComponent).join(",")})`,
  );
  return projects.length ? { userId: user.id, organizationIds } : null;
}

export function isValidCronSecret(req: Request): boolean {
  const secret = process.env.CRON_SECRET || "";
  if (!secret) return false;
  const header = req.headers.get("x-cron-secret") || "";
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  return header === secret || bearer === secret;
}

export function isValidAdminKey(req: Request): boolean {
  const key = process.env.RANKDAY_ADMIN_KEY || process.env.CRON_SECRET || "";
  if (!key) return false;
  const header = req.headers.get("x-rankday-admin-key") || "";
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  return header === key || bearer === key;
}
