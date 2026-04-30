# LUXORA SITE 1: PRODUCTION REQUIREMENTS
**Protocol:** Ω_HIVE_AUDIT_&_FORGE v1.0 | **Agent:** SIR_BORIS + LUKAS_OMEGA + MERLIN_OMEGA
**Repo:** https://github.com/Cyberdad247/lux.git | **Date:** 2026-04-30
**Status:** Phase 2 COMPLETE → Phase 3 PRODUCTION TARGET

---

## CRITICAL DEFECTS (BLOCK SHIP)

| ID | Defect | File | Severity |
|----|--------|------|----------|
| D-01 | Gold token split — `#C9A84C` (Phase 2 components) vs `#D4AF37` (Hero/MagicButton/globals.css) | FeaturesGrid, UrgencyCTA, ContactFooter, TrustBanner | 🔴 CRITICAL |
| D-02 | `shield.png` missing from `/public/assets/` — triggers `onError` on every page load | MagicButton.tsx | 🔴 CRITICAL |
| D-03 | `lucide-react` installed, never imported — dead dep, pollutes bundle | package.json | 🟡 HIGH |
| D-04 | `--color-emerald` token defined, never referenced | globals.css | 🟡 LOW |
| D-05 | `GlassPanel` imported nowhere after page.tsx refactor — orphaned component | components/ | 🟡 LOW |
| D-06 | `FeaturesGrid` uses `whileFocus={{ borderColor }}` — invalid framer-motion prop, silently fails | FeaturesGrid.tsx | 🟡 HIGH |
| D-07 | `next.config.mjs` is empty — no security headers, no image domains, no bundle optimization | next.config.mjs | 🟡 HIGH |
| D-08 | `layout.tsx` metadata title "The Sovereign Standard" misaligned with B2B merchant pivot copy | layout.tsx | 🟡 MEDIUM |
| D-09 | Hero has zero mobile-specific padding/font adjustments below `sm:` breakpoint | Hero.tsx | 🟡 HIGH |
| D-10 | `@theme` CSS tokens defined but all components hardcode hex — zero design-system leverage | globals.css + all .tsx | 🟡 MEDIUM |

---

## VISUAL PERFORMANCE

> Enforces the Obsidian Flow (#0A0A0B / #D4AF37) and Liquid Power aesthetic.

- [ ] **VP-01** — Unify gold token: replace all `#C9A84C` instances with `#D4AF37`; add `--color-gold` CSS var usage to all Phase 2 components (`TrustBanner`, `FeaturesGrid`, `UrgencyCTA`, `ContactFooter`). Single source of truth: `globals.css @theme`.
- [ ] **VP-02** — Add `shield.png` to `/public/assets/` (reference issue #3539). Until resolved, replace `<Image>` with the inline SVG fallback as primary render path (no flash of broken img).
- [ ] **VP-03** — Fix `FeaturesGrid` hover glow: replace `whileFocus={{ borderColor }}` with CSS `group-hover:border-[var(--color-gold)]` + `group-hover:shadow-[0_0_24px_rgba(212,175,55,0.3)]`.
- [ ] **VP-04** — Implement Tailwind v4 custom shimmer hook: add `@keyframes shimmer` (diagonal gradient sweep 0→100% in 1.4s) to `globals.css`; add `.shimmer` utility class; apply to FeaturesGrid card top-edge on hover.
- [ ] **VP-05** — Hero mobile hardening: add `px-4 sm:px-6` to Hero content wrapper; add `text-3xl` base (below `sm:text-4xl sm:text-6xl`) to H1; add `min-h-[85vh] sm:min-h-screen` to Hero section.
- [ ] **VP-06** — Add radial-gradient ambient to FeaturesGrid section: `bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.07),transparent)]` on section wrapper.
- [ ] **VP-07** — Decryption page transition: wrap page sections in Framer Motion `<AnimatePresence>` with `mode="wait"`; stagger children `0.12s` per section on mount.
- [ ] **VP-08** — Live crypto ticker bar: add `TickerBar.tsx` component — horizontal marquee of BTC/ETH/SOL prices (fetched server-side via `/api/ticker` route using CoinGecko free tier). Refresh interval: 60s. Display: `BTC $XX,XXX ▲ 2.3%` in gold, monospace font.
- [ ] **VP-09** — Update `layout.tsx` metadata: title → `"Luxora Payments — Close High-Value Buyers Using Crypto"`, description → B2B merchant pitch copy from CloudBrain spec.
- [ ] **VP-10** — Add `<meta name="viewport">` explicit config in `layout.tsx` via Next.js 14 `viewport` export.

---

## INSTITUTIONAL LOGIC

> Enforces Stripe-grade infrastructure feel: trust signals, auth skeleton, data persistence.

- [ ] **IL-01** — Remove `lucide-react` from `package.json` + `package-lock.json` (unused dep). Run `npm install` to reseal lock.
- [ ] **IL-02** — Harden `next.config.mjs`: add security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`); add `images.remotePatterns` for any future CDN; enable `compress: true`.
- [ ] **IL-03** — `ref/[code]` persistence: replace `console.log` stub with Supabase insert (or edge-function call to `CAMELOT_OS/kinetic_edge` :3001). Schema: `{id, code, ts, ua, ref_ip_hash}`. Keep `force-dynamic`.
- [ ] **IL-04** — Biometric Gate skeleton: add `/apply` route with a `MerchantApplyForm.tsx` — fields: `Business Name`, `Business Type` (dropdown: Exotic Cars / Jewelry / Hotels / Furniture), `Email`, `Monthly Volume Estimate`. On submit: POST to `/api/apply`, write to Supabase `merchants_pending` table. Add `[PROCESSING]` decrypt animation using existing `MagicButton` decryption pattern.
- [ ] **IL-05** — Merchant Command Portal stub: add `/portal` route (auth-gated via Next.js middleware). Skeleton: `PortalLayout.tsx` with `GlassPanel` cards for `Active Transactions`, `Settlement Status`, `Referral Code`. Auth: JWT-based, stateless, secret in Vercel env.
- [ ] **IL-06** — Wire `?ref=` query param from Hero landing: read `useSearchParams()` in `page.tsx`, store ref code in `sessionStorage`, auto-populate hidden field in `MerchantApplyForm`.
- [ ] **IL-07** — Add `/api/ticker` Next.js Route Handler: server-side CoinGecko fetch (`/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true`), cache 60s via `next: { revalidate: 60 }`.
- [ ] **IL-08** — `GlassPanel` resurrection: deploy `GlassPanel` inside `FeaturesGrid` cards — replace raw `motion.div` with `<GlassPanel>` to enforce design-system consistency.

---

## SWARM READINESS

> Makes the repo agent-readable for Bio-Kinetic Swarm replication to Sites 2 & 3.

- [ ] **SR-01** — Create `.hive/engineer/openclaw.json`: agent-readable component manifest listing all Success Gene components (`Hero`, `MagicButton`, `GlassPanel`, `TrustBanner`, `FeaturesGrid`, `UrgencyCTA`, `ContactFooter`), their props interface, reuse rating (1-5), and transplant dependencies.
- [ ] **SR-02** — Create `.hive/engineer/instructions.md`: swarm bootstrap doc — how to scaffold a new site from Luxora DNA in < 5 commands. Include `npx create-next-app`, component copy commands, globals.css transplant, and Vercel deploy one-liner.
- [ ] **SR-03** — Create `COMPONENT_DNA.md` at repo root: catalog each component with: visual role, color tokens used, animation primitives, CloudBrain source notebook reference.
- [ ] **SR-04** — Add `.aiexclude` to repo root: exclude `node_modules/`, `.next/`, `public/assets/`, `*.lock`, `*.woff`, `*.png` from agent RAG indexing to enforce Titanium Token Shield Law #6.
- [ ] **SR-05** — Add `CONTRIBUTING.md` stub with Agent Protocol: how knights must log changes to PROVENANCE_LEDGER, what constitutes a DNA-breaking change (color token mutation, removing animation primitives), and how to submit via Iron Gate HITL for high-risk patches.
- [ ] **SR-06** — Move all hardcoded hex values to `globals.css @theme` vars; update all `.tsx` files to use `text-[var(--color-gold)]` / `bg-[var(--color-obsidian)]` pattern for full Tailwind v4 design-system compliance.
- [ ] **SR-07** — Tag `GlassPanel`, `MagicButton`, `Hero` with JSDoc `@gene` annotation marking them as transplantable to Sites 2/3 with zero modification.
- [ ] **SR-08** — GitHub Actions: add `bundle-size` job — post bundle delta as PR comment using `@next/bundle-analyzer`; fail CI if First Load JS exceeds `160 kB`.

---

## EXECUTION ORDER (Double-Time Sequence)

```
Sprint 1 (BLOCK SHIP fixes):  D-01 → VP-01, D-02 → VP-02, D-06 → VP-03, D-07 → IL-02
Sprint 2 (Institutional):     IL-01, IL-03, IL-04, VP-08 (ticker), VP-05 (mobile)
Sprint 3 (Swarm DNA):         SR-01, SR-02, SR-04, SR-06, VP-07 (transitions)
Sprint 4 (Portal + Auth):     IL-05, IL-06, IL-08, VP-04 (shimmer), SR-08 (bundle CI)
```

**KINETIC_PURITY_SCORE target:** 97 | **CURRENT:** 78
