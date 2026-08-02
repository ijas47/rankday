# rankday design system

**Mode:** Persuade (marketing / conversion)
**Reading:** B2B SEO/AEO/GEO agency. Editorial-light redesign — a 90-day ranking agency proven like a scoreboard, not sold like a SaaS.
**Direction seed:** editorial-ledger-01 (contract lives as the first HTML comment in `app/layout.tsx` body)

## Type
- **Display + accent italic:** Fraunces (`--font-fraunces` → `--display` / `--serif`) — variable, optical-size + SOFT/WONK axes. Used for h-display / h1 / h2 and all `.it` / `.serif` italic accents (purple).
- **Body / UI:** Hanken Grotesk (`--font-hanken` → `--sans`) — also carries h3 / h4 for UI-scale clarity.
- **Data / labels only:** JetBrains Mono (`--font-mono`). Not a "technical" costume — reserved for numbers, ranks, and mono labels.
- Display tracking floor ~-0.028em; serif accents ~-0.005em. `text-wrap: balance` on headings.

## Color
- Ground: warm paper `--paper #f6f2ea` (+ `--paper-2` lifted, `--paper-3` recessed). No pastel-radial background.
- Ink: `--ink #191521` · Muted body `--muted #5b556a` (≥4.5:1 on paper) · Tertiary `--muted-2`.
- Accent: **one** purple `#4a2bf0` (locked, brand). Deep `--purple-deep`, tint `--purple-tint`, ghost `--purple-ghost`.
- Utility tints (`--pink/peach/yellow/mint/lilac`) desaturated to quiet warm paper tints — no candy.
- Hairlines warm: `--hairline #e6e0d5` / `--hairline-2`.

## Shape & depth
- Cards 16px (`--r-card`), large 24px (`--r-card-lg`), pills 9999px.
- Real shadows: offset + soft blur, neutral warm (`--shadow-sm/md/lg`). No zero-offset purple halos, no glass-blur as decoration.
- Cards: white/paper + 1px hairline. Buttons: pill, clean inline arrow (no filled icon chip), active `scale(0.98)`.

## Signature moments
- **Home hero:** Fraunces headline + ranking artifact (`.rankboard`) that climbs 9→1 on scroll, "Top 3" badge pop, AI-citation row. One authored motion moment.
- **Editorial ledgers:** home offer (`.offer-ledger`), About beliefs (`.belief-list`) — numbered mono keys + hairline-separated statements, replacing same-size stat-card grids.

## Motion (Framer Motion 11)
- Ease-out `cubic-bezier(0.22, 1, 0.36, 1)`. UI <300ms; section reveals ~0.5s; hero blur-up ~0.7–0.85s.
- Site-wide `ScrollReveal` on `data-reveal*`; `useScroll` progress; one marquee/page. `prefers-reduced-motion` honored.

## Refusals (kept out)
- No eyebrow/kicker chip above a heading as decoration (neutralized to a quiet mono label where legacy pages use it).
- No hero-metric 4-identical-card template. No gradient text. No glass/halo decoration. No emoji-as-icon.

## Stack
- Next.js 14 App Router, custom CSS tokens (no Tailwind), Framer Motion 11. Fonts via `next/font/google`.
