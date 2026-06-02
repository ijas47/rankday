// Fire a Meta "Lead" event when someone gives us their email (tool lead capture).
// Safe no-op if the pixel isn't loaded (e.g. NEXT_PUBLIC_META_PIXEL_ID unset).
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackLead(source?: string): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", source ? { content_name: source } : undefined);
  }
}
