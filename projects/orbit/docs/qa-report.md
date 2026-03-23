# QA Report — ORBIT
Reviewed by: qa-reviewer
Date: 2026-03-18
Build log reviewed: docs/build-log.md

---

## Score

| Dimension | Score | Max |
|---|---|---|
| Brand Alignment | 18 | 20 |
| Design Fidelity | 16 | 20 |
| Animation Quality | 18 | 20 |
| Content Completeness | 18 | 20 |
| Code Quality | 15 | 20 |
| **TOTAL** | **85** | **100** |

**Status: PASS (85/100)**

---

## Prohibition List — Explicit Checks

| Check | Status |
|---|---|
| No dashboard screenshot as hero | PASS — orbital canvas is the hero visual, no screenshots anywhere |
| No blue gradient + white card SaaS look | PASS — fully dark, no white surfaces |
| No feature grids with icons + 3-word labels | PASS — specialists section uses numbered cards with full prose, not icon grids |
| No generic SaaS illustration style | PASS — no illustrations of any kind; geometric canvas diagram only |
| Orbital diagram animated, not static | PASS — Canvas 2D with requestAnimationFrame loop, three contexts implemented |

---

## Sections Audited

1. Navigation — `<nav class="nav">` in index.html
2. Hero — `<section class="hero">` — canvas background, stagger entrance
3. The Problem — `<section class="problem">` — two-column narrative comparison
4. The Vibe-Commerce Model — `<section class="model">` — 80/20 bar + vibe-commerce term
5. The 7 Layers — `<section class="layers">` — interactive orbital canvas
6. For Specialists — `<section class="specialists">` — 5-card recruitment pitch
7. Why It Works — `<section class="why">` — three-column flywheel
8. Early Access CTA — `<section class="cta-section">` — form + faded orbital background
9. Footer — `<footer class="footer">` — minimal, single-row desktop

---

## Findings

### Critical (must fix before shipping)

None. No zero-tolerance violations detected.

---

### High (fix before human review)

- [ ] **Hardcoded rgba() values proliferating in main.css** — `css/main.css:201, 252, 419-420, 536, 540, 607, 611, 739-740, 750, 787-788, 792-793, 960-961, 1144, 1177, 1282-1283, 1287-1288, 1292-1293, 1391` — The design system defines token values for accent, violet, bg, and destructive. Most of these rgba() calls are derivations of token hex values (e.g., `rgba(74, 158, 255, 0.02)` is `--color-accent` at 2% opacity). CSS does not natively support `rgba(var(--color-accent), 0.02)` for hex tokens, but the standard workaround is to define channel tokens (e.g., `--color-accent-rgb: 74, 158, 255`) in tokens.css and write `rgba(var(--color-accent-rgb), 0.02)`. Without this pattern, every tint value is a manual hardcode and is brittle to a future accent color change. There are approximately 25 instances. Fix: Add `--color-accent-rgb`, `--color-violet-rgb`, `--color-bg-rgb`, and `--color-destructive-rgb` channel variables to tokens.css and refactor all rgba() calls in main.css to use them.

- [ ] **Inline style attributes used for layout and color in index.html** — `index.html:77-79, 158, 316, 369, 379, 384, 400, 404, 523, 612, 637` — Thirteen elements carry layout or color inline styles. Several use token references (e.g., `style="color:var(--layer-ops)"`) which is better than hardcoded values but still violates design-system.md prohibition #8 ("Never use inline styles for any property expressible as a CSS custom property"). The most egregious are structural: `style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;"` (line 400), `style="width:580px;height:580px;"` (lines 379, 384), and the mobile nav close button (line 77). Fix: Create named CSS classes for each of these layout patterns and move them out of the HTML.

- [ ] **Type scale tokens deviate from design-system.md spec** — `css/tokens.css:20-28` — The tokens.css clamp ranges are smaller than specified. Design-system.md specifies `--text-display: clamp(4rem, 10vw, 9rem)` but tokens.css defines `clamp(3.5rem, 9vw, 8rem)`. Design-system.md specifies `--text-section: clamp(2.5rem, 5.5vw, 5rem)` but tokens.css defines `clamp(2.25rem, 5vw, 4.5rem)`. Design-system.md specifies `--text-subheading: clamp(1.25rem, 2vw, 2rem)` but tokens.css defines `clamp(1.15rem, 1.8vw, 1.75rem)`. This reduces display impact, particularly the hero headline. Fix: Update tokens.css to match design-system.md exactly for `--text-display`, `--text-section`, and `--text-subheading`.

---

### Medium (fix in next iteration)

- [ ] **`--leading-snug` token value differs from spec** — `css/tokens.css:39` — Design-system.md defines `--leading-snug: 1.0` but tokens.css defines `1.05`. Minor but affects section title line height calculation. Fix: Update to `1.0` per spec.

- [ ] **Mobile nav close button uses dense inline styles** — `index.html:77` — The close button has a 12-property inline style block. This is the most complex inline style in the file and the hardest to maintain. Fix: Extract to a `.nav__mobile-close` CSS class.

- [ ] **`layers__canvas-wrap` has hardcoded dimensions in HTML** — `index.html:379, 384` — `style="width:580px;height:580px;"` on both the wrapper div and the canvas element. The CSS already correctly handles `.layers__canvas-wrap { flex: 0 0 580px; max-width: 580px }` and the JS resizes dynamically. The inline values are redundant and create a maintenance sync risk. Fix: Remove the inline width/height from the HTML; let CSS and JS own sizing.

- [ ] **`layers__detail-code` uses hardcoded font size** — `css/main.css:916` — `font-size: 2.5rem` is not a token. This should be `--text-section` or a named token. Fix: Add `--text-layer-code: 2.5rem` to tokens.css (or use `--text-section`) and reference the token.

- [ ] **Specialist section uses 3-column grid for 5 cards** — This is borderline — not a prohibition violation, but the fifth card spanning 2 columns at tablet breakpoint (lines 1252-1256) creates an orphaned last card. This is handled with `grid-column: span 2; max-width: 50%` which partially works but looks unbalanced. Consider a 2+3 or 1+2+2 layout at that breakpoint.

- [ ] **`model__bar-merchant` starts at `width:0%` via inline style** — `index.html:316` — This is a JS-triggered animation initial state set in HTML. The design system pattern for animation initial states is the `.gsap-*` utility classes (defined at the bottom of main.css). While functionally correct (the JS sets it to 20% on scroll enter), the initial state should be in CSS, not HTML. Fix: Set `width: 0%` in `.model__bar-merchant` CSS rule and remove the inline style from HTML.

---

### Low (polish)

- [ ] **Scroll hint uses CSS `@keyframes scroll-pulse`** — `css/main.css:505-508` — Build log acknowledges this is intentional ("decorative only, not scroll-driven"). Design-system.md prohibition #10 is about scroll-driven section animations, not decorative elements. This is technically compliant, but using a CSS keyframe on a dark site with Lenis running can cause subtle jank if the browser does not compositor-optimize the animation. Monitor on low-end devices.

- [ ] **Footer mobile layout centers text** — `css/main.css:1604` — `text-align: center` in the mobile footer. Design-system.md states "Never center body copy — left-align always." The footer text is labels/wordmark, not body copy, so this is a borderline call, but aligning it left on mobile is more consistent with the mission-control aesthetic.

- [ ] **OG image placeholder** — `index.html:13` — `orbit-og.jpg` does not exist per build log. Not blocking for development but blocking for any real deployment. Noted here as a deployment gate item.

- [ ] **`font-size: 1.5rem` inline in mobile nav close button** — `index.html:77` — `1.5rem` is not a token. Should use a token or be extracted to CSS.

---

## Dimension-by-Dimension Scoring

### Dimension 1 — Brand Alignment: 18/20

**What passes:**
The site absolutely does not feel like generic SaaS. The deep space black background, the orbital canvas as the hero visual, the mission-control cadence of the copy, and the three-font system working in concert (Space Grotesk for authority, DM Sans for readability, Space Mono for system identifiers) all read as intentional and disciplined. The Sage + Ruler archetype comes through clearly — the copy is declarative, not pitchy. "The infrastructure is ready. Are you?" is exactly the right register: calm authority, not startup excitement. "vibe-commerce" rendered as a gradient display word is the right visual treatment for the conceptual hinge.

The orbital diagram as hero visual is the key brand proof point and it works — a visitor sees motion, system, and cosmos, not a dashboard or a marketing illustration.

**Deductions (2 pts):**
- (-1) The hero headline "Your brand deserves your full attention." is not uppercase in the HTML or CSS. Design-system.md is explicit: "Hero display text: `--weight-extrabold`, `--leading-tight`, uppercase." The CSS class `.hero__headline` does correctly set `text-transform: uppercase`, so this is likely fine in rendering — but the tokens.css type scale reduction (smaller display clamp range than spec) means the visual impact is slightly undersized vs. the reference intent.
- (-1) The "feels like" test — applying "inevitable, intelligent, calm confidence" to the site: the first two qualities land solidly. "Calm" is 90% there. The hero has two CTAs ("Get Early Access" and "See How It Works"), which introduces a minor decision point that slightly dilutes the singular momentum the brand brief calls for. The brief specifies one CTA. A second ghost CTA in the hero is not prohibited but nudges slightly away from the calm certainty of a one-path site.

---

### Dimension 2 — Design Fidelity: 16/20

**What passes:**
- All 9 sections are present in correct order.
- Space Grotesk / DM Sans / Space Mono three-font system is correctly implemented throughout.
- Section backgrounds alternate correctly: hero (bg), problem (surface), model (bg), layers (bg), specialists (surface), why (bg), cta (bg), footer (bg). The design-system.md rule about no two consecutive identical backgrounds holds — surface sections (problem, specialists) are separated by bg sections.
- The 7-layer color system is fully tokenized in tokens.css and applied correctly: MIA teal, CIA blue, OPS near-white, ECOM violet, MKT pink, LOG orange, WHS light violet.
- Section labels use `--font-mono`, uppercase, `--color-text-muted` as specified.
- The `vibe-commerce` gradient text treatment is implemented correctly.
- OPS node is visually distinct (radius 26 vs 20, near-white color, inner orbit).

**Deductions (4 pts):**
- (-2) Type scale tokens in tokens.css do not match design-system.md spec for `--text-display`, `--text-section`, and `--text-subheading` (all are smaller). This is a fidelity failure against the design system's explicit token values.
- (-1) `--leading-snug` is 1.05 in tokens.css, not 1.0 as specified in design-system.md. Affects section title rendering.
- (-1) Multiple rgba() values in main.css are not traceable to tokens because the RGB channel tokens (`--color-accent-rgb` etc.) were not created. The system cannot be updated by changing a single token. This is a system compliance failure.

---

### Dimension 3 — Animation Quality: 18/20

**What passes:**
- Animation sequence across all 9 sections: nav (fade-in-y), hero (stagger-reveal), problem (slide-left + slide-right), model (scale-up + bar-build), layers (scale-up canvas), specialists (stagger-up), why (rotate-in), cta (clip-reveal), footer (fade-in). No two consecutive sections use the same type. Confirmed.
- Lenis is connected to ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` at `main.js:26`. Correct.
- All GSAP animations are gated behind `prefersReduced` check. Static fallbacks are provided.
- The orbital diagram has perpetual motion independent of scroll — Intersection Observer pauses the rAF loop when off-screen, not during scroll.
- Stagger is applied to specialists cards (0.1s), why columns (0.12s), and split details (0.15s). Multi-element groups are not all-at-once.
- The scroll-pulse CSS animation on the hero scroll hint is noted as intentionally non-GSAP (decorative only). Acceptable.
- `power3.out` easing is used throughout — no bounce, no spring. Gravitational feel is maintained.

**Deductions (2 pts):**
- (-1) The layers section and model section both use `scale-up` as their core animation pattern (model: `scale: 0.95, opacity: 0` on concept; layers: `scale: 0.9, opacity: 0` on canvas). The build log acknowledges this and argues they are "different enough" because the scale target differs. Under strict reading of the design-system.md rule ("Never animate two consecutive sections with the same entrance pattern"), this is borderline. The model section's primary animated element is the bar build (width expansion) which is distinctly different, so the violation is partial, not clear-cut. Deducting 1 point for the ambiguity rather than 2.
- (-1) The `--duration-*` tokens are defined in tokens.css but all GSAP animations use raw second values (0.5, 0.7, 0.8, 0.9) rather than referencing CSS variable values. GSAP does not read CSS custom properties natively without a parsing step, so this is technically correct behavior, but the design system's motion tokens are not being used for GSAP duration values. The durations are within the design system's specified ranges (0.5–1.0s matches `--duration-enter` at 500ms and `--duration-slow` at 1000ms), so no animation is out of spec — but the tokens are disconnected from the JS implementation.

---

### Dimension 4 — Content Completeness: 18/20

**What passes:**
All 9 sections present. All 7 layers detailed with agent role, specialist role, and merchant benefit — the `LAYERS` data object in orbital.js contains fully-written content for all three fields per layer. The 80/20 split is visualized as a bar that animates from 0% to 20% on scroll. Both audience pitches are present and separated: merchant-first narrative (sections 2-5), specialist-dedicated section (6). The flywheel model is present in section 7. The single conversion action ("Get Early Access" / "Request Access") is consistent throughout.

The problem section maps precisely to the brief's six pain points (Traditional) and six benefits (Orbit). Copy tone throughout is calm authority — no exclamation marks, no "excited," no startup register.

**Deductions (2 pts):**
- (-1) The brand brief specifies the primary CTA button text as "Get Early Access" consistently. The CTA section uses "Request Access" on the submit button, which is different. This is a minor copy inconsistency — "Request Access" is contextually fine for a form submit, but brand brief consistency would prefer the single term used everywhere. Not a hard failure.
- (-1) The hero has a second CTA ("See How It Works") which the brand brief does not call for. The brief explicitly specifies "CTA: 'Get Early Access'" as the singular action. A secondary ghost CTA is a reasonable UX addition, but it diverges from the brief's singular conversion focus.

---

### Dimension 5 — Code Quality: 15/20

**What passes:**
- Semantic HTML structure is well-formed: `<nav>`, `<main>`, `<section>` with `aria-labelledby`, `<footer role="contentinfo">`. Section ids match anchor targets. Skip-to-content link present.
- No `console.log` statements anywhere in JS files.
- `prefers-reduced-motion` is checked in both main.js and orbital.js. Full fallback paths exist for all animated sections.
- Canvas DPR handling: `this.dpr = Math.min(window.devicePixelRatio || 1, 2)` — correctly capped at 2.
- Intersection Observer pauses rAF loop when canvas is off-screen — performance optimization correctly implemented.
- GSAP and Lenis loaded in correct order: Lenis first, then GSAP core, then ScrollTrigger, then ScrollTrigger registered, then site scripts.
- `orbital.js` is well-structured as a class with clear separation of setup, lifecycle, drawing, and interaction methods.
- Keyboard navigation in the orbital diagram: Tab cycles nodes, Enter/Space selects, Escape deselects. aria-live on detail panel. Off-screen accessible buttons provided.
- Mobile fallback for Section 5: canvas hidden at <640px, sequential cards shown.

**Deductions (5 pts):**
- (-2) Significant inline style attribute usage in index.html (13+ instances as documented). This directly violates design-system.md prohibition #8. The most critical instances are structural layout properties on non-element-specific divs (lines 77-79, 400).
- (-1) No explicit `width` and `height` attributes on `<canvas>` elements for the hero and CTA contexts. The layers canvas has `width="580" height="580"` but `#hero-canvas` and `#cta-canvas` have no dimensions in HTML — they are sized entirely by JS. This creates a brief layout shift risk before JS executes.
- (-1) The `detail-code` element's color is set via `element.style.color = layer.color` in main.js:367. This sets a raw hex value as an inline style at runtime. While the values come from the design system's layer color definitions, it bypasses the CSS token system for a visible decorative property.
- (-1) Several hardcoded small values remain in CSS that are not token-referenced: `gap: 5px` (nav toggle, line 312), `padding: 6px 0` (split items, line 823), `padding: 1px` (flywheel pseudo-element, line 1303), `padding: 10px 0` (why list items, line 1350), `padding: 4px 8px` (hint nodes, line 1011), `margin: -1px` (visually-hidden label, line 1484). Most of these are micro-spacing values below `--space-0` (4px) or are intentional CSS reset values. `margin: -1px` and `padding: 0` on the visually hidden element are standard accessibility patterns. Only `6px`, `10px`, and `5px` are genuinely off-grid. Minor but count.

---

## Notes for Human Reviewer

**Primary thing to evaluate:** The orbital diagram interaction in Section 5. This is the most technically complex component and the one the client will demo first. Specifically:
1. Does the animation feel smooth and "gravitational" rather than jittery? The three angular velocity rates (0.0003 / 0.0005 / 0.0008 rad/frame) create differentiated speeds — verify visually that the outer ring feels appropriately faster without looking chaotic.
2. Does clicking a node and seeing the detail panel feel like the product is intelligent and revealing information, or does it feel like a tooltip? The panel content (agent role, specialist role, merchant benefit) is comprehensive — evaluate whether the panel layout reads hierarchically.
3. On the hero: does the orbital diagram recede behind the text naturally, or does it compete? The radial gradient + vignette overlay should subordinate the diagram without making it invisible.

**Second thing to evaluate:** The 80/20 bar in Section 4. The animation (merchant bar expanding from 0% to 20% on scroll) is the conceptual hinge of the entire pitch. Evaluate whether this feels like an "aha moment" or whether it reads as a small bar growing a small amount (since 20% is visually minor). The design system spec says "the 80% expands from the 20%, reinforcing the feeling of expansion/relief" — but the implemented approach shows only the merchant segment animating, with the orbit segment already present at full width. This may be inverted from the intended effect.

**Third thing to evaluate:** The copy tone throughout. The brand brief is emphatic that no casual startup register should appear. Read the problem section, the specialists section, and the CTA section copy cold — does it feel like a system presenting itself (Ruler archetype) or like a startup pitching?

**Performance note:** This build cannot be assessed for runtime performance through static code review. The three simultaneous canvas instances (hero, layers, CTA) each running independent rAF loops (paused by IntersectionObserver when off-screen, but potentially two could be visible on tall viewports) should be profiled on a mid-range mobile device before launch. The Intersection Observer threshold is 0.01 — very aggressive. A canvas just barely off-screen will immediately pause; verify no flicker at the threshold.

---

## What Passed Well

**The tone of the copy is exactly right.** Every section reads as calm, authoritative infrastructure presenting itself. The problem section's phrase "the merchant becomes the connective tissue between every specialist" is sharp brand-voice copy. The CTA headline "The infrastructure is ready. Are you?" closes the loop effectively.

**The three-font system is applied with discipline.** Space Grotesk for authority (headings, wordmark), DM Sans for readability (body copy), Space Mono for system identifiers (3-letter layer codes, section labels, data rows). The layer codes (OPS, MIA, CIA, ECOM, MKT, LOG, WHS) read as system identifiers, not marketing labels — this is exactly what the design system calls for.

**The orbital diagram data model is complete and correct.** All 7 layers have full agent role, specialist role, and merchant benefit copy. The color assignments match the 7-layer color system from design-system.md exactly. The OPS node is correctly differentiated (larger radius, near-white color, inner orbit, slowest angular velocity).

**The background alternation strategy is correctly implemented.** Problem (surface), Model (bg), Layers (bg), Specialists (surface), Why (bg) — the two bg-bg transitions (Model/Layers, Why/CTA) are visually distinct because Model has the split bar visualization and CTA has the faded orbital diagram as background texture.

**Lenis + ScrollTrigger integration is correct.** The `lenis.on('scroll', ScrollTrigger.update)` connection is present, the gsap.ticker drives the Lenis raf loop, and lagSmoothing is disabled. This is the pattern most builds get wrong.

**Accessibility baseline is solid.** Skip link, aria-labelledby on every section, role="application" on interactive canvas, off-screen keyboard-navigable node buttons, aria-live on the detail panel, focus outlines on all interactive elements, prefers-reduced-motion fallbacks at every animation site.

---

## Remediation Tasks for frontend-builder

No FAIL status — remediation tasks below are for the HIGH findings that should be resolved before human sign-off.

1. **Add RGB channel tokens and refactor rgba() calls**
   - File: `src/css/tokens.css`
   - Problem: ~25 `rgba()` calls in main.css hardcode numeric channel values (e.g., `rgba(74, 158, 255, 0.02)`) that are not traceable to tokens.
   - Fix: Add to tokens.css — `--color-accent-rgb: 74, 158, 255; --color-violet-rgb: 139, 92, 246; --color-bg-rgb: 6, 10, 20; --color-destructive-rgb: 239, 68, 68;` — then update all rgba() calls in main.css to `rgba(var(--color-accent-rgb), 0.02)` pattern.

2. **Fix type scale tokens to match design-system.md spec**
   - File: `src/css/tokens.css`
   - Problem: `--text-display`, `--text-section`, `--text-subheading` clamp ranges are all smaller than specified.
   - Fix: Update to exactly: `--text-display: clamp(4rem, 10vw, 9rem)`, `--text-section: clamp(2.5rem, 5.5vw, 5rem)`, `--text-subheading: clamp(1.25rem, 2vw, 2rem)`. Also fix `--leading-snug: 1.0` (currently 1.05).

3. **Extract inline styles from index.html into CSS classes**
   - File: `src/index.html` and `src/css/main.css`
   - Problem: 13+ inline style attributes violate design-system.md prohibition #8.
   - Fix (in order of severity):
     - Line 77: Create `.nav__mobile-close` class for the close button layout.
     - Line 79: Create `.nav__mobile-list` class for the flex list.
     - Line 400: Create `.layers__panel-wrap` class for the flex panel container.
     - Lines 379, 384: Remove `style="width:580px;height:580px;"` — CSS and JS already handle sizing.
     - Lines 158, 369, 637: Move `font-size`, `color`, `max-width`, `line-height` to named modifier classes or section-specific paragraph rules.
     - Lines 410-416: Move layer code button colors from `style="color:var(--layer-ops)"` to data-attribute CSS selectors (e.g., `[data-code="OPS"] { color: var(--layer-ops); }`).
     - Lines 449-499: Move `border-color` from inline style to data-attribute CSS selectors on `.layers__mobile-card`.

4. **Add HTML dimensions to hero and CTA canvas elements**
   - File: `src/index.html`
   - Problem: `#hero-canvas` and `#cta-canvas` have no `width`/`height` HTML attributes, risking layout shift before JS executes.
   - Fix: Add `width="1" height="1"` as placeholder dimensions (JS will override them on init). This prevents the browser from reserving zero space before the canvas JS runs.

