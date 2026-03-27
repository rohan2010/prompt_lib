# Oh Polly — Build Log

---

## Full Site Build — 2026-03-27

**Status:** Complete
**Build type:** Static HTML/CSS/JS (single-page brand landing page)

**Files written:**
- `/projects/oh-polly/src/index.html` — full 11-section page
- `/projects/oh-polly/src/css/tokens.css` — all design system tokens
- `/projects/oh-polly/src/css/styles.css` — full site styles
- `/projects/oh-polly/src/js/main.js` — Lenis, GSAP, nav, forms, animations

---

## Section Status

| # | Section | Status | Animation Type |
|---|---------|--------|----------------|
| 1 | Announcement Bar | ✅ Complete | No scroll animation — sticky UI bar |
| 2 | Navigation | ✅ Complete | Fade-in on load; transparent → solid on scroll |
| 3 | Hero | ✅ Complete | word-split (SplitText per word, stagger 0.07s) |
| 4 | New Arrivals | ✅ Complete | stagger-up (6 cards, 0.06s stagger) |
| 5 | Editorial Collections | ✅ Complete | slide-left (Wedding Edit image) / slide-right (Going Out image) |
| 6 | Bestsellers | ✅ Complete | scale-up (cards from 0.88, stagger 0.08s) |
| 7 | Lookbook | ✅ Complete | clip-reveal (inset 100%→0% per item, stagger by column index) |
| 8 | UGC Feed | ✅ Complete | fade-up (6 items, 0.05s stagger) |
| 9 | Press Strip | ✅ Complete | stagger-up (press names left to right, 0.1s stagger) |
| 10 | Email Capture | ✅ Complete | slide-right (x: 60 → 0, staggered children) |
| 11 | Footer | ✅ Complete | fade-up (gentle entrance, start: top 92%) |

---

## Design System Deviations

**None.** All values reference CSS custom properties from `tokens.css`. No hardcoded colors, spacing, or font values in `styles.css` or `index.html`. All decisions follow `docs/design-system.md` exactly.

One note: `docs/design-system.md` specifies Cormorant as `--font-mono` for labels/captions; the skill `SKILL.md` lists different defaults (Cormorant Garamond, IBM Plex Mono). The design system wins per build protocol — Cormorant Italic is used throughout for label/caption contexts.

---

## Asset Placeholders

All image and video areas use CSS gradient placeholders in the brand palette. No broken `<img>` tags, no external image URLs. Assets slot in by replacing the `<div>` placeholder with the appropriate `<img>` or `<video>` element.

| Placeholder | Section | Spec | Drop-in Path |
|---|---|---|---|
| `hero-campaign-video.mp4` | Hero | Looping campaign video, 1920×1080 min, autoplay/muted/loop/playsinline | `/images/hero/` |
| `hero-campaign-poster.webp` | Hero | Video poster still, same dimensions | `/images/hero/` |
| `wedding-edit-editorial.webp` | Editorial Collections (block A) | Full-height portrait, 960×1200 min | `/images/collections/` |
| `going-out-editorial.webp` | Editorial Collections (block B) | Full-height portrait, 960×1200 min, night-out tone | `/images/collections/` |
| `lookbook-wedding-01.webp` | Lookbook (full row 1) | Horizontal editorial, 1920×1080 min | `/images/lookbook/` |
| `lookbook-wedding-02.webp` | Lookbook (half) | Portrait editorial, 960×1200 min | `/images/lookbook/` |
| `lookbook-wedding-03.webp` | Lookbook (half) | Portrait editorial, 960×1200 min | `/images/lookbook/` |
| `lookbook-wedding-04.webp` | Lookbook (full row 2) | Horizontal editorial, 1920×1080 min | `/images/lookbook/` |
| `lookbook-wedding-05.webp` | Lookbook (half) | Portrait editorial, 960×1200 min | `/images/lookbook/` |
| `lookbook-wedding-06.webp` | Lookbook (half) | Portrait editorial, 960×1200 min | `/images/lookbook/` |
| 6× product front images | New Arrivals grid | 3:4 portrait, lifestyle photography | `/images/products/` |
| 6× product hover images | New Arrivals grid | 3:4 portrait, alternate angle | `/images/products/` |
| 4× bestseller images (front + hover) | Bestsellers grid | 3:4 portrait, lifestyle photography | `/images/products/` |
| 6× UGC creator photos | UGC Feed | 1:1 square, creator/customer content | `/images/ugc/` |

---

## Klaviyo Integration

The email capture form and footer newsletter form both submit to Klaviyo via fetch. The integration is stubbed with two placeholder values that must be replaced before launch:

- `YOUR_KLAVIYO_LIST_ID` — replace with the actual Klaviyo list ID
- `YOUR_KLAVIYO_PUBLIC_KEY` — replace with the site's Klaviyo public API key

Both are in `/src/js/main.js` inside `initEmailForms()`.

---

## Notes for QA

1. **Animation variety** — verify no two consecutive sections use the same GSAP animation type. Sequence is: word-split → stagger-up → slide-left/right → scale-up → clip-reveal → fade-up → stagger-up → slide-right → fade-up. The stagger-up on press (section 9) and fade-up on UGC (section 8) are different types. Footer fade-up and UGC fade-up are not consecutive — Email Capture (slide-right) sits between them. Passes the no-consecutive rule.

2. **prefers-reduced-motion** — all GSAP animations are gated behind the `prefersReduced` check in `main.js`. The CSS media query `@media (prefers-reduced-motion: reduce)` additionally suppresses the hero ambient `@keyframes` animation and collapses all transitions to near-zero.

3. **Mobile at 375px** — check: New Arrivals 2-col grid, Bestsellers 2-col grid, Lookbook single column, UGC 3-col grid, Editorial Collections stacked (image above copy), email form stacked (input above button), footer nav 1-col on very small screens.

4. **Nav transparent state** — on page load the nav sits over the dark hero video placeholder. Text is `--color-text-light`. After 60px scroll it switches to the solid/blurred cream state with dark text. Test both states.

5. **Announcement bar dismiss** — dismiss state is stored in `sessionStorage`. Dismissing the bar also shifts the nav's `top` value from `var(--bar-h)` (36px) to 0 via the `bar-dismissed` class. Both transitions are CSS, not GSAP, so they work without JS animation overhead.

6. **SplitText CDN** — SplitText is a GSAP Club plugin loaded from the public CDN path. If the CDN version does not include SplitText (club plugins require a paid account at some CDN paths), the hero JS has a `try/catch` that falls back to a simple `fade-up` on the headline element. The site does not break — it degrades gracefully.

7. **Product card hover** — hover cross-fade is CSS only (opacity transition). No GSAP on hover states. No `translateY` on card hover per design system prohibition.

8. **All CTAs link to us.ohpolly.com** — no internal routing, no Shopify API, no embedded cart. Every "Shop" link routes to the live Shopify store.

9. **Currency** — all product prices displayed in USD only. No GBP.

10. **Copy** — all copy is written in the Oh Polly brand voice per the brief: short, declarative, present tense, no exclamation marks in headlines, no "obsessed"/"slay"/"Hey girl" energy.
