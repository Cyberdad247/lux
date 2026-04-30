# LUXORA DNA — Swarm Bootstrap Protocol
**Schema:** HiveIDE Bootstrap v1.0 | **Source:** luxora-prestige | **Date:** 2026-04-30

## Scaffold a New Luxora-DNA Site in 5 Commands

```bash
# 1. Scaffold Next.js 14 App Router with Tailwind v4
npx create-next-app@14 my-site --typescript --tailwind --app --src-dir no --import-alias "@/*"

# 2. Install DNA dependencies
cd my-site && npm install framer-motion @typeform/embed @typeform/embed-react @supabase/supabase-js

# 3. Transplant Success Genes (Hero, MagicButton, GlassPanel)
cp ../luxora-prestige/components/Hero.tsx ./components/
cp ../luxora-prestige/components/MagicButton.tsx ./components/
cp ../luxora-prestige/components/GlassPanel.tsx ./components/
cp ../luxora-prestige/components/SectionReveal.tsx ./components/
cp ../luxora-prestige/lib/typeformPopup.ts ./lib/

# 4. Transplant design system (tokens + animations)
cp ../luxora-prestige/app/globals.css ./app/globals.css

# 5. Deploy
vercel --prod
```

## DNA-Breaking Changes (Require Iron Gate HITL)

Any PR that modifies the following MUST get explicit approval before merge:

| Item | Why |
|------|-----|
| `--color-gold` value in globals.css | Cascade mutation — affects every component |
| `--color-obsidian` value | Background contract — breaks vignette math |
| `MagicButton` animation duration < 1.0s | Decrypt ritual under-delivers brand promise |
| `Hero` Ken Burns timing | Visual DNA of the brand |
| Removing `SectionReveal` viewport margin | Breaks scroll choreography |

## PROVENANCE_LEDGER Protocol

Every knight making file changes MUST append to `CAMELOT_OS/PROVENANCE_LEDGER.md`:

```
[YYYY-MM-DD HH:MM] | [KNIGHT] | [FILE] | [ACTION] | [RISK_SCORE]
```

Risk Score = `(lines_changed × 0.5) + (security_flags × 10) + complexity_score`
- Low risk (< 15): auto-apply
- High risk (≥ 15): Iron Gate HITL

## Typeform Swap

To target a different Typeform for a new site, update one line:

```ts
// lib/typeformPopup.ts
instance = createPopup('YOUR_FORM_ID', { hideHeaders: true, hideFooter: true, size: 80 });
```

The form ID is the last path segment of the Typeform URL.

## Vercel Env Vars Required

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
VERCEL_ORG_ID=<from vercel link>
VERCEL_PROJECT_ID=<from vercel link>
```

## Component Dependency Graph

```
page.tsx (server)
├── TickerBar        ← CoinGecko ISR
├── TrustBanner
├── Hero
│   └── MagicButton  ← openTypeform()
├── FeaturesGrid
│   └── GlassPanel   (pending IL-08)
├── UrgencyCTA       ← openTypeform()
└── ContactFooter
```
