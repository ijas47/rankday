type SupabaseConfig = {
  url: string;
  anonKey: string;
  serviceKey: string;
};

function readConfig(): SupabaseConfig {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  };
}

export function hasSupabaseServerConfig(): boolean {
  const cfg = readConfig();
  return Boolean(cfg.url && cfg.serviceKey);
}

export function missingSupabaseMessage(): string {
  return "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.";
}

function cleanBase(url: string): string {
  return url.replace(/\/$/, "");
}

async function supabaseFetch(path: string, init: RequestInit = {}, useServiceRole = true): Promise<Response> {
  const cfg = readConfig();
  const key = useServiceRole ? cfg.serviceKey : cfg.anonKey;
  if (!cfg.url || !key) {
    throw new Error(useServiceRole ? missingSupabaseMessage() : "Supabase auth is not configured.");
  }

  return fetch(`${cleanBase(cfg.url)}${path}`, {
    ...init,
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      ...(init.headers || {}),
    },
  });
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const detail = typeof data?.message === "string" ? data.message : response.statusText;
    throw new Error(detail || "Supabase request failed.");
  }
  return data as T;
}

export async function selectRows<T>(table: string, query = "select=*"): Promise<T[]> {
  const response = await supabaseFetch(`/rest/v1/${table}?${query}`, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  return parseJson<T[]>(response);
}

export async function insertRows<T>(table: string, rows: unknown[]): Promise<T[]> {
  const response = await supabaseFetch(`/rest/v1/${table}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(rows),
  });
  return parseJson<T[]>(response);
}

export async function updateRows<T>(table: string, query: string, values: Record<string, unknown>): Promise<T[]> {
  const response = await supabaseFetch(`/rest/v1/${table}?${query}`, {
    method: "PATCH",
    headers: {
      accept: "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(values),
  });
  return parseJson<T[]>(response);
}

export async function passwordLogin(email: string, password: string) {
  const cfg = readConfig();
  if (!cfg.url || !cfg.anonKey) throw new Error("Supabase auth is not configured.");
  const response = await fetch(`${cleanBase(cfg.url)}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: cfg.anonKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return parseJson<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: { id: string; email?: string };
  }>(response);
}

export async function getAuthUser(accessToken: string) {
  const cfg = readConfig();
  if (!cfg.url || !cfg.anonKey) throw new Error("Supabase auth is not configured.");
  const response = await fetch(`${cleanBase(cfg.url)}/auth/v1/user`, {
    method: "GET",
    headers: {
      apikey: cfg.anonKey,
      authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  return parseJson<{ id: string; email?: string }>(response);
}
