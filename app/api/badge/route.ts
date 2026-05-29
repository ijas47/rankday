export const runtime = "edge";

// Embeddable "AEO Score" badge as SVG. Usage:
//   /api/badge?domain=example.com&score=82&grade=B
// Wrapped in a link back to the tool, every embed is a dofollow backlink.
const COLORS: Record<string, string> = {
  A: "#16a34a",
  B: "#65a30d",
  C: "#d97706",
  D: "#ea580c",
  F: "#dc2626",
};

function esc(s: string): string {
  return s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] || c));
}

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = esc((searchParams.get("domain") || "your site").slice(0, 40));
  const scoreRaw = parseInt(searchParams.get("score") || "", 10);
  const score = Number.isFinite(scoreRaw) ? Math.max(0, Math.min(100, scoreRaw)) : 0;
  const grade = (searchParams.get("grade") || "F").toUpperCase().slice(0, 1);
  const color = COLORS[grade] || COLORS.F;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="56" role="img" aria-label="AEO Score ${score} out of 100 for ${domain}">
  <rect width="220" height="56" rx="8" fill="#0b0b0f"/>
  <text x="16" y="22" fill="#b8a9ff" font-family="system-ui,sans-serif" font-size="11" font-weight="700" letter-spacing="0.06em">AEO SCORE · RANKDAY</text>
  <text x="16" y="44" fill="#fff" font-family="system-ui,sans-serif" font-size="20" font-weight="800">${score}/100</text>
  <circle cx="188" cy="28" r="18" fill="${color}"/>
  <text x="188" y="35" fill="#fff" font-family="system-ui,sans-serif" font-size="20" font-weight="800" text-anchor="middle">${esc(grade)}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=86400",
    },
  });
}
