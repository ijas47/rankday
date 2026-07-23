# Keyword ownership map (rankday)

**Purpose:** One primary URL owns each money keyword. Everything else supports it.  
**Review cadence:** Monthly in GSC — move ownership only if data proves cannibalization.  
**Last updated:** 2026-07-23

## Rules

1. **One owner URL per primary keyword.** Supporting pages link *to* the owner, not compete.
2. **Home owns brand + the category promise**, not every geo/industry query.
3. **Tools own tool queries.** Service pages own buy intent.
4. **Blog supports hubs** (definitions, how-tos). Blog never steals money keywords.
5. **Programmatic city pages** only for cities you will sell into; thin pages get no links from hubs.

---

## Priority 1 — Must win (commercial / wedge)

| # | Primary keyword | Intent | Owner URL | Supporting URLs | Status |
|---|---|---|---|---|---|
| 1 | rankday / rank day / rank-day | Brand | `/` | `/about`, `/pricing` | Own |
| 2 | 90 day seo / seo in 90 days | Commercial | `/how-it-works` | `/pricing`, `/results`, blog `how-long-does-seo-take` | Push |
| 3 | seo with ranking guarantee / top 3 seo guarantee | Commercial | `/pricing` | `/`, `/faq`, `/results` | Push |
| 4 | fixed price seo agency / seo package website included | Commercial | `/pricing` | `/how-it-works`, `/` | Push |
| 5 | aeo agency dubai | Commercial-local | `/best-aeo-agency-dubai` | `/what-is-aeo`, `/seo-agency-dubai`, `/results` | Push |
| 6 | geo agency dubai | Commercial-local | `/best-geo-agency-dubai` | `/blog/what-is-geo-…`, `/best-aeo-agency-dubai` | Push |
| 7 | ai seo dubai / ai search optimization dubai | Commercial-local | `/seo-agency-dubai` | `/get-cited-by-chatgpt`, `/best-aeo-agency-dubai` | Push |
| 8 | seo agency dubai | Commercial-local | `/seo-agency-dubai` | `/best-seo-agency-dubai` (secondary), `/locations` | Defend/push |
| 9 | best seo agency dubai | Commercial-local | `/best-seo-agency-dubai` | `/seo-agency-dubai`, `/results` | Push |
| 10 | get cited by chatgpt / how to get cited by chatgpt | Educ+comm | `/get-cited-by-chatgpt` | `/what-is-aeo`, `/tools/aeo-score`, blog AI Overviews | Push |

## Priority 2 — Hub definitions (AEO / AI)

| # | Primary keyword | Intent | Owner URL | Supporting URLs | Status |
|---|---|---|---|---|---|
| 11 | what is aeo / answer engine optimization | Educ | `/what-is-aeo` | `/blog/seo-vs-aeo-vs-geo`, `/tools/aeo-score` | Push |
| 12 | seo vs aeo vs geo | Educ | `/blog/seo-vs-aeo-vs-geo` | `/what-is-aeo`, GEO blog | Own/defend |
| 13 | what is geo generative engine optimization | Educ | `/blog/what-is-geo-generative-engine-optimization` | `/best-geo-agency-dubai` | Push |
| 14 | google ai overviews optimization | Educ | `/blog/how-to-optimise-for-google-ai-overviews` | `/get-cited-by-chatgpt` | Push |
| 15 | llms.txt generator / create llms.txt | Tool | `/tools/llms-txt` | `/ai-info-page`, `/what-is-aeo` | Own |
| 16 | aeo score / ai search readiness score | Tool | `/tools/aeo-score` | `/tools/ai-visibility-report` | Own |
| 17 | ai visibility report / brand mentioned in chatgpt | Tool+comm | `/tools/ai-visibility-report` | `/ai-visibility-tracker`, `/get-cited-by-chatgpt` | Own |

## Priority 3 — Industry + geo money (only if you sell them)

| # | Primary keyword | Intent | Owner URL | Supporting URLs | Status |
|---|---|---|---|---|---|
| 18 | seo for clinics / clinic seo | Industry | `/seo-for-clinics` | `/results` (clinic case), blog healthcare | Push if selling |
| 19 | seo for law firms | Industry | `/seo-for-law-firms` | `/results` | Push if selling |
| 20 | seo for saas / b2b saas seo | Industry | `/seo-for-saas` | blog `ai-search-optimisation-for-b2b-saas` | Push if selling |
| 21 | seo for plumbers / electrician seo | Industry | `/seo-for-plumbers` + `/seo-for-electricians` | local service cases | Push if selling |
| 22 | seo for fit out companies dubai | Industry-local | `/seo-for-fit-out-companies` | `/seo-agency-dubai` | Push if selling |
| 23 | seo agency uk / seo agency us | Geo | `/seo-agency-uk`, `/seo-agency-us` | `/pricing`, `/results` | Secondary markets |
| 24 | website seo audit free | Tool | `/tools/website-seo-audit` | `/tools`, `/pricing` | Own |
| 25 | how much does seo cost | Educ-comm | `/blog/how-much-does-seo-cost` | `/pricing` (must link hard) | Push CTR to pricing |

---

## Cannibalization watchlist

| Conflict | Keep as owner | Demote / differentiate |
|---|---|---|
| `seo agency dubai` vs `best seo agency dubai` | Service page vs comparison page | Best-of = criteria + shortlist; service = offer + CTA |
| `aeo` vs `geo` Dubai best-of | Separate intents | Cross-link; different H1 and FAQs |
| Pricing vs “how much does SEO cost” blog | Pricing owns buy; blog owns research | Blog CTA every section → `/pricing` |
| Industry pages vs generic home | Industry owns niche | Home links out; does not target “SEO for plumbers” |

---

## Internal linking defaults

From **any** supporting page:

```
Tool / Blog  →  Owner hub  →  /results  →  /pricing  →  WhatsApp
```

From **case studies**:

```
/results/[slug]  →  matching /seo-for-* or geo page  →  /pricing
```

---

## AI / AEO prompt set (monthly manual check)

Run these yourself or as a paid audit — not on free product APIs:

1. Best AEO agency in Dubai  
2. Best GEO agency UAE  
3. SEO agency with website rebuild included  
4. Fixed price SEO with ranking guarantee  
5. How to get a local business cited by ChatGPT  
6. Best 90-day SEO package for small business  
7. SEO vs AEO vs GEO explained  
8. rankday SEO review  
9. Best SEO for clinics in Dubai  
10. AI visibility tools for brands  

Log: mentioned? competitors? cited URLs? → content/action backlog.

---

## Next content bets (only if they support an owner above)

1. Live **case studies** on `/results` (this unlocks trust for #2–9).  
2. Comparison: rankday vs monthly SEO retainer (supports #3–4).  
3. “How much does AEO cost?” (supports #5, #11, `/pricing`).  
4. Listicle outreach: get onto third-party “best AEO agencies Dubai” posts (off-site for #5–7).
