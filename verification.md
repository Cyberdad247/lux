# VERIFICATION PROTOCOL — LUXORA SITE 1
**Warden:** MERLIN_OMEGA (L3 System 2 Archwizard) | **Tier:** Elder Titan
**Protocol:** Trinity Validation Gate | **Version:** v1.0
**Mandate:** Ship nothing that does not pass every gate below.

---

## GATE 1 — LIQUID POWER VISUAL STANDARD

*Pass/Fail criteria for the Obsidian Flow aesthetic.*

| Check | Test | Pass Condition | Fail Action |
|-------|------|----------------|-------------|
| V-01 | Gold token unity | `grep -rn "#C9A84C" --include="*.tsx" --include="*.css"` returns 0 results | BLOCK — run VP-01 |
| V-02 | Obsidian base | Body background computed color = `rgb(10, 10, 11)` in browser devtools | BLOCK |
| V-03 | No pure black | `grep -rn "#000000" --include="*.tsx" --include="*.css"` returns 0 results | WARN — replace with `#0A0A0B` |
| V-04 | Gold pulse active | MagicButton outer ring animates on idle (no interaction required) | BLOCK |
| V-05 | Lens flare fires | On cold load, diagonal flare sweeps Hero within 8s, repeats every ~9s | FAIL → check Hero animation loop |
| V-06 | Scan line active | Gold horizontal scan line traverses Hero viewport every ~10s | FAIL → check Hero scan-line keyframe |
| V-07 | Mouse parallax | Moving cursor over Hero shifts `carRef` position noticeably (±18px X) | FAIL → check `springX/Y` binding |
| V-08 | FeaturesGrid glow | Hovering any feature card shows gold border glow (`box-shadow` with gold rgba) | FAIL → run VP-03 |
| V-09 | UrgencyCTA reveal | Scrolling to UrgencyCTA fires fade-in (opacity 0→1, y 48→0) | FAIL → check `useInView` margin |
| V-10 | No layout overflow | `document.body.scrollWidth === window.innerWidth` at 375px viewport | FAIL → audit `overflow-x: hidden` |
| V-11 | Shield renders | MagicButton shows SVG shield (or image) — no broken img icon visible | FAIL → run VP-02 |
| V-12 | Typography hierarchy | H1 > H2 > body contrast ratio ≥ 4.5:1 (WCAG AA) against `#0A0A0B` | FAIL — adjust opacity |

---

## GATE 2 — PERFORMANCE BENCHMARKS

*Bundle limits and runtime constraints. Non-negotiable under 8GB RAM Law.*

| Metric | Limit | Measurement Method | Action if Breach |
|--------|-------|--------------------|------------------|
| P-01 First Load JS (`/`) | ≤ 160 kB | `npm run build` output | Remove unused deps, lazy-load non-critical sections |
| P-02 First Load JS (`/ref/[code]`) | ≤ 100 kB | `npm run build` output | Route is already minimal — investigate if breach |
| P-03 Largest Contentful Paint | ≤ 2.5s (3G throttle) | Lighthouse mobile audit | Add `priority` to hero-bg image, lazy-load below-fold |
| P-04 Cumulative Layout Shift | ≤ 0.1 | Lighthouse | Fix any img without explicit `width`/`height` |
| P-05 Time to Interactive | ≤ 3.8s (mobile) | Lighthouse mobile | Code-split FeaturesGrid + UrgencyCTA with `dynamic()` |
| P-06 Build time | ≤ 45s | `time npm run build` | Investigate if exceeded |
| P-07 `node_modules` size | ≤ 350 MB | `du -sh node_modules` | Audit & remove dead deps (start: `lucide-react`) |
| P-08 Hero bg image (`hero-bg.png`) | ≤ 400 KB | `ls -lh public/assets/hero-bg.png` | Convert to `.webp`, add `sizes` prop to Next/Image |
| P-09 Framer Motion tree-shake | No full FM import | `grep "from 'framer-motion'" --include="*.tsx"` — ensure named imports only | Replace `import * as motion` if found |
| P-10 Token density (CloudBrain alignment) | All copy sourced from Luxora Payments notebook | Manual review vs `PRD_task.md` CloudBrain citations | Flag any text not cross-referenced to notebook |

---

## GATE 3 — INSTITUTIONAL LOGIC CHECKS

*Functional correctness for the B2B merchant infrastructure.*

| Check | Method | Pass Condition |
|-------|--------|----------------|
| L-01 | Referral route injection guard | `curl "http://localhost:3000/ref/<script>alert(1)</script>"` → 302 to `/` | Redirect fires, no script executed |
| L-02 | Referral route cache | Response headers for `/ref/test` include `no-store` or equivalent | `force-dynamic` confirmed active |
| L-03 | Metadata B2B alignment | `<title>` tag contains "Close High-Value Buyers" or "Luxora Payments" | Pass after VP-09 |
| L-04 | JSON-LD validity | Paste `<script type="application/ld+json">` content into Google Rich Results Test | No errors |
| L-05 | CTA link target | "Start Accepting Today" and "Request Concierge Access" both resolve to non-404 routes | `/apply` route must exist before ship |
| L-06 | Email link | `partners@luxorapayments.com` `href` is `mailto:` not bare text | Pass |
| L-07 | MagicButton auth flow | Click → 1.4s decryption animation → redirect to `/ref/merchant` | Pass |
| L-08 | `ref` param preservation | Landing at `/?ref=TEST123` → click CTA → form pre-populates ref field | Pass after IL-06 |

---

## GATE 4 — SWARM READINESS (Agent-Readable Checks)

*Verifies the repo is Bio-Kinetic Swarm transplant-ready for Sites 2 and 3.*

| Check | Command | Pass Condition |
|-------|---------|----------------|
| S-01 | `.aiexclude` present | `cat .aiexclude` — file exists with `node_modules/`, `.next/`, `*.lock` entries | BLOCK if missing — SR-04 |
| S-02 | `openclaw.json` present | `cat .hive/engineer/openclaw.json` — valid JSON with component manifest | WARN if missing — SR-01 |
| S-03 | `instructions.md` present | `cat .hive/engineer/instructions.md` — contains scaffold commands | WARN if missing — SR-02 |
| S-04 | Zero hardcoded hex (post SR-06) | `grep -rn "#D4AF37\|#0A0A0B" --include="*.tsx"` returns 0 results | WARN until SR-06 complete |
| S-05 | CI passes | GitHub Actions `quality` + `production` jobs green on `main` | BLOCK if red |
| S-06 | Bundle CI gate | `bundle-size` job reports delta vs previous commit | BLOCK if +15 kB unexplained |
| S-07 | TypeScript strict | `npx tsc --noEmit` exits 0 | BLOCK |
| S-08 | Lint clean | `npm run lint` exits 0 | BLOCK |

---

## GATE 5 — ELDER TITAN FINAL APPROVAL SEQUENCE

Run in this order. All must PASS before Vercel production deploy is confirmed.

```bash
# 1. Type safety
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Production build
npm run build

# 4. Visual audit (manual)
# Open http://localhost:3000 at 375px, 768px, 1440px viewport
# Verify all V-01 through V-12 checks above

# 5. Lighthouse (mobile)
# Target: Performance ≥ 85, Accessibility ≥ 90, Best Practices ≥ 95, SEO ≥ 90

# 6. Color token audit
grep -rn "#C9A84C" --include="*.tsx" --include="*.css" .
# Must return: 0 matches

# 7. Dead dependency audit
npm ls lucide-react
# Must return: (empty) after IL-01

# 8. Swarm file check
[ -f .aiexclude ] && echo "PASS" || echo "FAIL: create .aiexclude"
[ -f .hive/engineer/openclaw.json ] && echo "PASS" || echo "WARN: create openclaw.json"

# 9. Security headers (post IL-02)
curl -I http://localhost:3000 | grep -E "X-Frame|X-Content|Referrer"
# Must show all 3 headers
```

**SHIP GATE:** All BLOCK items resolved + Lighthouse Performance ≥ 85 + `#C9A84C` count = 0
**CURRENT STATE:** 3 BLOCK items open (D-01, D-02, D-06) | Ship blocked until Sprint 1 complete

---

## SUCCESS GENE REGISTER — DNA FOR SITES 2 & 3

| Gene | Component | Transplant Rating | Dependencies | Notes |
|------|-----------|------------------|--------------|-------|
| G-01 | `Hero.tsx` | ⭐⭐⭐⭐⭐ | framer-motion, hero-bg asset | Self-contained parallax + cinematic layer system |
| G-02 | `MagicButton.tsx` | ⭐⭐⭐⭐⭐ | framer-motion, shield asset | Decryption CTA — core brand primitive |
| G-03 | `GlassPanel.tsx` | ⭐⭐⭐⭐⭐ | framer-motion, cn util | Zero-config glass morphism card |
| G-04 | `globals.css` | ⭐⭐⭐⭐⭐ | Tailwind v4 | `--ease-rolex`, `gold-pulse`, `mask-reveal`, `fade-up` — full animation library |
| G-05 | `FeaturesGrid.tsx` | ⭐⭐⭐⭐ | framer-motion | Bento grid — swap copy only |
| G-06 | `/ref/[code]` route | ⭐⭐⭐⭐ | None | Anti-injection referral stub — transplant to any Next.js site |
| G-07 | `UrgencyCTA.tsx` | ⭐⭐⭐ | framer-motion, useInView | Scroll-triggered conversion section |
| G-08 | CI/CD workflow | ⭐⭐⭐⭐⭐ | Vercel CLI, gh secrets | Full quality→preview→production pipeline |
