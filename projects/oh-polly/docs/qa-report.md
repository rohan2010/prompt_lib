# QA Report — Oh Polly
Reviewed by: qa-reviewer
Date: 2026-03-27
Build log reviewed: docs/build-log.md

---

## Score

| Dimension | Score | Max |
|---|---|---|
| Brand Fidelity | 17 | 20 |
| Design Distinctiveness | 18 | 20 |
| System Compliance | 12 | 20 |
| Technical Correctness | 16 | 20 |
| Animation Quality | 19 | 20 |
| **TOTAL** | **82** | **100** |

**Status: PASS (82/100)**

---

## Sections Audited

1. Announcement Bar
2. Navigation (transparent + scrolled states)
3. Hero (video placeholder + headline + CTA)
4. New Arrivals (6 product cards)
5. Editorial Collections (Wedding Edit block A, Going Out block B)
6. Bestsellers (4 signature cards)
7. Lookbook (6-image grid, full-width + half-width)
8. UGC Feed (6 creator items)
9. Press Strip (5 press names)
10. Email Capture (Klaviyo form)
11. Footer (brand col + nav cols + legal bar)

---

## Findings

### Critical (must fix before shipping)

- [ ] **Inline style attributes used for layout on hero content div** — `index.html:203` — The `<div class="hero__content">` carries `style="max-width: var(--grid-max); margin-inline: auto; width: 100%;"`. These are layout properties that should live in `styles.css` under `.hero__content`. The CSS block at line 516 already defines `max-width`, `margin-inline`, and `width: 100%` on `.hero__content`, making this inline declaration a redundant violation of Prohibition #8 (no inline styles for layout).

- [ ] **Inline `style="background-color: var(--color-surface);"` on `.collection-block__copy`** — `index.html:452` — The Going Out copy column has an inline `style` applying `background-color`. The CSS class `.collection-block--surface .collection-block__copy` at `styles.css:733` already handles this via the modifier class. The inline attribute is redundant and violates the no-inline-style rule. Remove the inline style; the modifier class is sufficient.

- [ ] **Inline `style="color: var(--color-accent); text-decoration: underline;"` on Privacy Policy link** — `index.html:906` — A `<style>` attribute is applied to an `<a>` tag for color and text-decoration. These should be a CSS class (e.g., `.email-capture__legal a`). This is a direct violation of the inline style prohibition.

- [ ] **Klaviyo integration is not connected** — `main.js:422,426` — Both `YOUR_KLAVIYO_LIST_ID` and `YOUR_KLAVIYO_PUBLIC_KEY` are literal placeholder strings. The brand brief marks Klaviyo integration as mandatory. This is a launch blocker, not a design issue, but it must be flagged as Critical because the form silently appears to submit while posting to a dead endpoint.

### High (fix before human review)

- [ ] **Extensive use of hardcoded hex values in inline `style` attributes across all placeholder image divs** — `index.html:246–820` (product cards, editorial placeholders, lookbook items, UGC items) — Every placeholder `<div>` uses `style="background: linear-gradient(160deg, #d4b5a4 ..."`. These are hardcoded hex values in HTML attributes. While these are acknowledged as asset placeholders in the build log, they represent 30+ violations of the system compliance rule against hardcoded colors outside `tokens.css`. The remedy is to move placeholder gradient definitions into CSS classes in `styles.css` and reference those classes in HTML rather than writing gradients inline. This costs 5 points in System Compliance.

- [ ] **Hardcoded hex colors in `styles.css` hero placeholder gradient** — `styles.css:475–479` — The `.hero__video-placeholder` gradient uses five raw hex values (`#0a0a0a`, `#1a1210`, `#2a1a14`, `#1a100c`, `#0a0a0a`). `#0a0a0a` maps to `--color-bg-dark` and should use `var(--color-bg-dark)`. The others are interpolation values with no token equivalent — these are acceptable for a placeholder gradient but the `--color-bg-dark` occurrences must be tokenized.

- [ ] **`rgba(255, 255, 255, ...)` hardcoded in footer CSS** — `styles.css:1093, 1103, 1185, 1198` — Four uses of raw `rgba(255,255,255,...)` for border and border-focus states on footer elements. These should use `rgba(var(--color-text-light-rgb), 0.06)` or a dedicated `--color-border-inverse` token. There is no `--color-text-light-rgb` token in `tokens.css` — either add one or use `rgba(250, 248, 245, ...)` via a new RGB channel token.

- [ ] **`rgba(250, 248, 245, 0.6)` hardcoded in footer link color** — `styles.css:1248` — The `.footer__link` color is a raw RGBA value that should use `rgba(var(--color-text-light-rgb), 0.6)` once the RGB channel token is added. Currently a hardcoded color.

- [ ] **GSAP animation durations are raw seconds, not CSS duration tokens** — `main.js:95, 183, 190, 195, 199, 208, 244, 275, etc.` — All GSAP `duration:` values are raw numbers (0.5, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2). The design system defines `--duration-enter: 600ms` and `--duration-slow: 1000ms`. While CSS tokens cannot be read directly in JS, the build should document the mapping or derive values from the tokens (e.g., `parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-enter')) / 1000`). The durations used (0.7–1.1s) are within the correct spirit of the token range, so this is a medium-weight compliance issue rather than a critical error. Costs 1 point in Animation Quality.

### Medium (fix in next iteration)

- [ ] **`gap: 4px` and `gap: 5px` in CSS without token reference** — `styles.css:354, 383` — The nav cart link uses `gap: 4px` and the hamburger uses `gap: 5px`. The design system explicitly permits 4px for micro-spacing hairlines, so the 4px instance is within spec. The 5px gap on the hamburger has no token justification — it should be `gap: var(--space-1)` (8px) or left as 4px if the design calls for tighter spacing. Low severity but technically non-compliant.

- [ ] **`gap: 6px` in CSS (line 1289)** — `styles.css:1289` — A `gap: 6px` value appears with no token backing. This is not a permitted spacing value on the 8-point grid. Needs to become `var(--space-1)` (8px) or 4px.

- [ ] **"Built for your best nights." headline appears in both Bestsellers and Editorial Collections (Going Out block)** — `index.html:455, 484` — The Going Out collection block (`collection-block__title`) and the Bestsellers section title both use exactly the same headline text. The design system lists "Built for your best nights." as the approved Bestsellers headline but Going Out should have its own distinct headline per brand brief guidelines around declarative, present-tense copy.

- [ ] **The `@keyframes heroAmbient` animation has no `prefers-reduced-motion` check at the CSS level beyond the blanket suppression** — `styles.css:433–451` — The `@media (prefers-reduced-motion: reduce)` block at line 1433 does correctly disable `.hero__video-placeholder::before` animation via `animation-duration: 0.01ms`. This is technically covered. However, the blanket `*` selector suppression approach is not specific enough — it will suppress all transitions site-wide including button and nav transitions, making the interaction dead to reduced-motion users. Consider a more surgical approach: suppress only `transform`-based animations, not all `transition-duration`.

- [ ] **Mobile menu does not trap focus — code comment claims it does but focus trap is not implemented** — `main.js:88–100` — The comment says "// Trap focus" but no actual focus trap loop is implemented. The spec in CLAUDE.md states "Navigation mobile menu must trap focus when open." Tab key will escape the overlay to background content.

- [ ] **`SplitText` is loaded from a public CDN path** — `index.html:1076` — SplitText is a GSAP Club plugin that is not publicly available on the free CDN. The path `https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js` will return a 404 or an empty module in production. The `try/catch` fallback in `main.js:178–191` means the hero degrades gracefully to a simple fade-up, but this is a known issue flagged in the build log and must be resolved before launch either via a licensed GSAP account or by replacing SplitText with a custom word-split implementation.

### Low (polish)

- [ ] **The `<style>` block for `.visually-hidden` is embedded in the HTML body** — `index.html:1058–1070` — This utility class should be in `styles.css`, not as a `<style>` tag immediately before the closing `</body>`. It works, but it is architecturally inconsistent.

- [ ] **Press strip uses text names rather than SVG logos** — `index.html:846–851` — The design system spec calls for logos "displayed in grayscale (`filter: grayscale(1)`, `opacity 0.5`)". The build uses typeset press names styled with Playfair Display italic, opacity 0.5, and grayscale filter applied. This is a reasonable placeholder approach but should be noted for the human reviewer: the press names will not look like real press logos and may read as placeholder content to visitors.

- [ ] **UGC heading carries a trailing period: "Worn by you."** — `index.html:703` — The brand brief copy direction is "Worn by you" without a period as a heading. The period is not a copywriting error per se, but the approved sample headlines in the brief do not use trailing periods on short headings. Minor voice consistency item.

- [ ] **Hero content div has a redundant inline max-width alongside CSS class definition** — As noted under Critical — also causes a specificity conflict: the inline style wins over the CSS class, making future class-based overrides harder.

---

## Remediation Tasks for frontend-builder

The build PASSED (82/100) so these remediation tasks are recommended for the next iteration to close compliance gaps before the human design review, not as blockers.

1. **Remove all three inline `style` attributes that handle layout or color**
   - File: `src/index.html`
   - Problem: Lines 203, 452, and 906 use `style=""` attributes for max-width/margin (203), background-color (452), and link color/decoration (906).
   - Fix:
     - Line 203: Remove the entire `style` attribute from `.hero__content` div — the CSS class already defines these rules.
     - Line 452: Remove `style="background-color: var(--color-surface);"` from `.collection-block__copy` div — the `.collection-block--surface .collection-block__copy` rule in CSS already handles this.
     - Line 906: Add a CSS rule `.email-capture__legal a { color: var(--color-accent); text-decoration: underline; }` to `styles.css` and remove the inline style.

2. **Move all placeholder gradient backgrounds from inline HTML to CSS classes**
   - File: `src/index.html` (all product-card and lookbook placeholder divs), `src/css/styles.css`
   - Problem: 30+ `<div>` elements use `style="background: linear-gradient(..."` inline. This is a system compliance violation.
   - Fix: Create named CSS classes for each placeholder (e.g., `.placeholder--rose`, `.placeholder--midnight`, `.placeholder--cream`, `.placeholder--plum`, etc.) in `styles.css` and apply those class names to the HTML divs. Remove all inline `style` gradient attributes.

3. **Tokenize `rgba(255, 255, 255, ...)` occurrences in footer CSS**
   - File: `src/css/tokens.css`, `src/css/styles.css`
   - Problem: Four raw `rgba(255,255,255,...)` values at styles.css lines 1093, 1103, 1185, 1198 and one raw `rgba(250, 248, 245, 0.6)` at line 1248.
   - Fix: Add `--color-text-light-rgb: 250, 248, 245;` to `tokens.css` (mirroring the existing `--color-bg-rgb` pattern). Then replace all `rgba(255,255,255,...)` with `rgba(var(--color-text-light-rgb), [opacity])` and the footer link color with `rgba(var(--color-text-light-rgb), 0.6)`.

4. **Tokenize `#0a0a0a` in the hero placeholder gradient**
   - File: `src/css/styles.css:475–479`
   - Problem: The hero `.hero__video-placeholder` gradient uses `#0a0a0a` which has a token (`--color-bg-dark`). The two remaining interpolation hex values have no token — that is acceptable.
   - Fix: Replace the two instances of `#0a0a0a` in the gradient with `var(--color-bg-dark)`.

5. **Fix the `gap: 5px` and `gap: 6px` values with no token**
   - File: `src/css/styles.css:383` (hamburger gap) and the line near 1289 (gap: 6px)
   - Problem: 5px and 6px are not on the 8-point spacing grid and have no design token.
   - Fix: Change `gap: 5px` on the hamburger to `gap: 4px` (permitted micro-spacing) and the 6px gap to `gap: var(--space-1)` (8px) or 4px depending on visual intent.

6. **Replace duplicate headline copy in Going Out vs Bestsellers**
   - File: `src/index.html:455`
   - Problem: The Going Out editorial block (`collection-block__title`) reads "Built for your best nights." — the same text as the Bestsellers title.
   - Fix: Change the Going Out headline to a distinct line in the approved brand voice, for example: "The night is yours." or "Made for the occasions that live in your camera roll."

7. **Replace `YOUR_KLAVIYO_LIST_ID` and `YOUR_KLAVIYO_PUBLIC_KEY` before launch**
   - File: `src/js/main.js:422, 426`
   - Problem: Klaviyo form submits to a stub endpoint. The email capture functionality does not work.
   - Fix: Replace both placeholder strings with the actual Klaviyo list ID and public API key from the Oh Polly Klaviyo account.

8. **Implement a real focus trap in the mobile menu**
   - File: `src/js/main.js` — inside `openMenu()`
   - Problem: The comment says "Trap focus" but no trap logic is implemented. Tab key escapes the overlay.
   - Fix: On `openMenu()`, get all focusable elements inside `#mobile-menu`, add a `keydown` listener that redirects Tab and Shift+Tab to cycle within the menu only. Remove the listener on `closeMenu()`.

---

## Notes for Human Reviewer

**What to evaluate first:** The "feels like" test. Open the page in a browser and ask: does it feel like "getting ready for a night out with your best friend — desire, anticipation, confidence"? With placeholder gradients instead of real campaign photography, the honest answer at this stage is: structurally yes, emotionally not yet. The typography, spacing, and animation choreography all support the luxury minimal editorial feel the brief demands. The gradient placeholders are the single biggest blocker to making a final emotional judgment — they are visible as placeholders and will not convey desire or body confidence until real Oh Polly campaign imagery is dropped in.

**What to look at next:** The hero section. With no video, the page opens to an animated dark gradient — which actually reads well as a Jacquemus-inspired moody dark opener. The word-split headline animation and bottom-left Jacquemus layout are exactly right. The moment campaign video replaces the gradient placeholder, this will land very close to the brief.

**The press strip is a judgment call.** The design spec says "logos in grayscale" — the build uses typeset Playfair Display italic press names instead. This is arguably more editorial and less generic than SVG logo strips. However, it does not match the spec literally. The human brand manager should decide whether to source and replace with actual logo SVGs or approve the typographic treatment as a deliberate stylistic choice.

**Mobile focus trap is an accessibility gap.** This is not cosmetic — keyboard and screen reader users who open the mobile nav will have focus escape to the background page. This must be fixed before any accessibility review or public launch.

**Klaviyo is not wired.** The email capture form appears to work but silently fails or silently "succeeds" (due to the catch block showing "Joined." even on network failure). This is a conversion-critical feature per the brief and must be connected before human review.

---

## What Passed Well

**Token compliance in CSS is exemplary.** Every structural spacing, color, typography, radius, shadow, and motion value in `styles.css` uses `var()` references to `tokens.css`. The token file itself is a faithful, complete transcription of `design-system.md`. The only hardcoded values in CSS are the four `rgba(255,255,255,...)` footer instances and the hero placeholder gradient — localized and fixable.

**Animation choreography is excellent.** The sequence — word-split, stagger-up, slide-left/right, scale-up, clip-reveal, fade-up, stagger-up, slide-right, fade-up — is genuinely varied across all 11 sections with no two consecutive sections sharing the same type. The lookbook `clipPath: 'inset(100% 0 0 0)'` reveal is the correct editorial treatment. Stagger is applied thoughtfully to every multi-element group.

**Lenis + ScrollTrigger integration is correct.** `lenis.on('scroll', ScrollTrigger.update)` at line 145 wires the two libraries correctly. `gsap.ticker.add()` drives Lenis via GSAP's RAF. `prefersReduced` gates Lenis completely so native scroll takes over for reduced-motion users.

**Semantic HTML structure is thorough and well-considered.** Every section uses appropriate landmark elements (`<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`), all interactive elements have `aria-label` attributes, all non-decorative images have descriptive alt text, the skip-to-content link is the first focusable element, and the mobile menu has correct `aria-expanded` and `aria-hidden` management.

**Brand voice in copy is on brief throughout.** No lorem ipsum anywhere. No exclamation marks in headlines. No "Hey girl" energy. Headlines like "New in. Worn tonight.", "The table is booked. The reservation is yours.", and "Be first for new drops." are tight, declarative, and match the Lover + Explorer archetype exactly.

**Prohibition list compliance is strong.** No Inter or Roboto, no translateY hover lift on product cards (image cross-fade only, CSS-only), no SALE language in hero, no dropdown mega-menu (4 nav items), no GBP pricing, no centered body copy — every item on the prohibition list has been honored in both CSS and HTML.

**US market signals are present and prominent** in the announcement bar, footer brand column, and footer Help nav column. Size Guide link appears in both the main nav and footer. Duties paid language is in the announcement bar text exactly as specified.
