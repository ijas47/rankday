# rankday design system

**Mode:** Persuade (marketing / conversion)  
**Reading:** B2B SEO agency marketing for local and professional buyers. Premium conversion craft, brand purple retained.  
**Dials:** variance 7 · motion 7 · density 4

## Type
- **Display / UI headings:** Outfit (`--font-outfit` → `--display`)
- **Body / UI:** DM Sans (`--font-dm-sans` → `--sans`)
- **Labels / stats:** JetBrains Mono (`--font-mono`)
- Emphasis: italic of the same family (no Instrument Serif mix)

## Color
- Brand accent: `#4a2bf0` (locked site-wide)
- Ink: `#14111f` · Muted: `#5f5873`
- Surfaces: soft lilac wash, white cards, pastel utility chips (pink/peach/mint/lilac)
- One accent; no competing neon gradients

## Shape
- Cards: 20px radius
- Controls / nav: pill (`9999px`)
- Shadows: purple-tinted, soft (`--shadow-sm` / `--shadow-md`)

## Motion (Framer Motion)
- Curves: ease-out `cubic-bezier(0.23, 1, 0.32, 1)`
- UI under 300ms; section reveals ~0.45–0.55s
- Active press: `scale(0.97)`
- Site-wide: `ScrollReveal` on `data-reveal*` attributes
- Progress: `useScroll` + spring
- Marquee: linear infinite, one per page max
- `prefers-reduced-motion` always honored

## Stack
- Next.js App Router, custom CSS tokens (no Tailwind)
- Framer Motion 11 for UI motion
- GSAP may remain as a dependency for legacy scripts; marketing motion prefers Framer Motion
