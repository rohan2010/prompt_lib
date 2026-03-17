---
name: company-frontend-design
description: >
  Activates a design-first workflow for building production-grade frontend
  interfaces. Use when building landing pages, UI components, hero sections,
  navbars, feature sections, pricing sections, testimonials, FAQ blocks,
  footers, or any frontend UI. Enforces company design tokens, eliminates
  AI-slop aesthetics, and requires a visual direction commitment before any
  code is written. Outputs are indistinguishable from senior frontend engineers
  with strong design sensibility.
version: 1.0.0
license: Proprietary. See LICENSE.txt for complete terms.
trigger_keywords:
  - component
  - landing page
  - hero
  - navbar
  - feature section
  - pricing section
  - frontend
  - UI
  - page
  - layout
  - web
---

# Company Frontend Design Skill

## ⚠️ MANDATORY: BEFORE WRITING ANY CODE

You must complete the **5-Step Design Philosophy Directive** in full before producing any HTML, JSX, CSS, or markup. This gate is non-negotiable — even for short or imperative prompts like "build me a pricing section."

---

## 1. Design Philosophy Directive

### 5-Step Pre-Code Sequence

Execute and explicitly state each step before writing code:

**Step 1 — Style Commitment**
Choose one named visual style from the approved list. State it by name.
- Editorial — refined typographic hierarchy, generous whitespace, restrained palette
- Neobrutalist — high-contrast borders, raw structure, deliberate roughness
- Japandi — minimal, warm neutrals, organic shapes, negative space as content
- Dark Mode First — deep backgrounds, luminous accents, layered depth
- Retro-futuristic — grid systems, technical monospace accents, neon-on-dark
- Bento — modular card grids with varied sizing, product screenshot-forward

**Step 2 — Emotional Brief**
Two sentences: what emotion the page should evoke and how that feeling should evolve from first scroll to final CTA.

**Step 3 — Font Pairing**
Select a heading font and body font. Neither may be Inter, Roboto, or system-ui unless the user explicitly requests it. Choose from approved pairings (Section 2) or propose an alternative with rationale.

**Step 4 — Color System Declaration**
Define: one dominant color, one secondary color, one sharp accent. Express all three as CSS custom properties before any component code begins.

**Step 5 — Motion Principle**
One sentence. Example: "Everything arrives from below; nothing slides horizontally." or "Interactions feel like turning weighted pages."

---

## 2. Design Token System

> These are company defaults. Claude must use these values unless the user explicitly overrides them.

### Approved Font Pairings

**Pairing A — Editorial (default)**
- Heading: `'Fraunces', serif` — expressive, high-contrast, editorial
- Body: `'DM Sans', sans-serif` — geometric, neutral, highly legible

**Pairing B — Technical**
- Heading: `'Space Grotesk', sans-serif` — geometric, structured, modern
- Body: `'Lora', serif` — warm, readable, humanist

> ⚠️ OPEN Q2: Final approved pairings require sign-off from design team. Replace above with brand-approved fonts before v1.0 release.

### Full Token System

```css
:root {
  /* ─── Typography ──────────────────────────────────────── */
  --font-heading: 'Fraunces', serif;       /* Display headings, hero text */
  --font-body: 'DM Sans', sans-serif;      /* Body copy, UI labels */
  --font-mono: 'JetBrains Mono', monospace; /* Code, technical labels */

  /* ─── Brand Hue (for shadow calculations) ────────────── */
  --brand-hue: 245;                        /* ⚠️ UPDATE: match brand primary hue */

  /* ─── Color — Semantic ───────────────────────────────── */
  --color-brand: #4F46E5;      /* Primary brand interactions — ⚠️ UPDATE */
  --color-surface: #F8F7F4;    /* Card and section backgrounds */
  --color-text: #111010;       /* Primary body text */
  --color-muted: #6B6A6A;      /* Secondary text, placeholders */
  --color-accent: #E8FF47;     /* Sharp highlight, CTAs */
  --color-destructive: #DC2626; /* Errors, warnings */

  /* ─── Color — Extended ───────────────────────────────── */
  --color-bg: #FAFAF8;         /* Page background */
  --color-border: #E4E2DD;     /* Subtle dividers */
  --color-brand-subtle: #EEF2FF; /* Tinted brand backgrounds */

  /* ─── Spacing — 8-point scale ────────────────────────── */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-12: 96px;
  --space-16: 128px;

  /* ─── Border Radius ──────────────────────────────────── */
  --radius-sm: 2px;            /* Sharp UI elements, tags */
  --radius-md: 8px;            /* Cards, inputs, buttons */
  --radius-pill: 999px;        /* Badges, toggles, pills */

  /* ─── Shadows (brand-hue tinted) ─────────────────────── */
  --shadow-sm: 0 1px 3px hsl(var(--brand-hue) 40% 10% / 0.08);
  --shadow-md: 0 4px 16px hsl(var(--brand-hue) 40% 10% / 0.12);
  --shadow-lg: 0 16px 48px hsl(var(--brand-hue) 40% 10% / 0.18);

  /* ─── Animation ──────────────────────────────────────── */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-micro: 200ms;     /* Hover states, focus rings */
  --duration-enter: 350ms;     /* Entrance animations */
  --duration-page: 500ms;      /* Page-level transitions */
}
```

---

## 3. Landing Page Section Templates

Each section must be built in isolation, one at a time. Provide visual references with every prompt.

### Navbar Prompt Template

**Trigger**: Any request for a site header, navigation bar, or top nav.

**Prompt**:
```
Build a navbar for [PRODUCT NAME] with the following:
- Logo left, nav links center, CTA button right
- Transparent background on load → solid `--color-bg` with `--shadow-sm` on scroll (IntersectionObserver on hero)
- Mobile: hamburger icon → full-height drawer with slide-in animation (`--ease-out-quart`, `--duration-enter`)
- Active link state: `--color-brand` underline, 2px, `--radius-pill`
- CTA button: `--color-brand` background, `--color-accent` text on hover, `transform: translateY(-1px)` on hover
- Links: [LINK_1], [LINK_2], [LINK_3], [CTA_LABEL]
- Style commitment: [YOUR STYLE FROM STEP 1]
```

**Required Variables**: `[PRODUCT NAME]`, `[LINK_1–3]`, `[CTA_LABEL]`, `[YOUR STYLE FROM STEP 1]`

**Design Notes**: No sticky behavior without scroll-triggered class change. Drawer must trap focus and close on Escape.

---

### Hero Prompt Template

**Trigger**: Any request for a hero section, above-the-fold, or page header.

**Prompt**:
```
Build a hero section for [PRODUCT NAME] with this value proposition: [ONE-LINE VALUE PROP]

Layout:
- Desktop: two-column (60/40 text/visual split)
- Mobile: stacked, text first, visual scaled to 90vw
- Background: noise texture overlay (SVG) on `--color-bg`, with a soft radial gradient centered behind the headline using `--color-brand` at 8% opacity

Typography:
- H1: `--font-heading`, 72px desktop / 40px mobile, line-height 1.05
- Apply gradient text to the key phrase "[KEY PHRASE]" using `--color-brand` → `--color-accent`
- Subhead: `--font-body`, 20px, `--color-muted`, max-width 540px

Animation (staggered entrance, 100ms delay per element):
- H1 enters: translateY(24px) → 0, opacity 0 → 1, `--duration-enter`, `--ease-out-quart`
- Subhead: same, 100ms delay
- CTA buttons: same, 200ms delay
- Visual: scale(0.96) → 1, opacity 0 → 1, 300ms delay

Visual element: [PRODUCT SCREENSHOT / 3D MOCKUP / ABSTRACT SHAPE]
Primary CTA: [CTA_PRIMARY_LABEL] | Secondary CTA: [CTA_SECONDARY_LABEL]
```

**Required Variables**: `[PRODUCT NAME]`, `[ONE-LINE VALUE PROP]`, `[KEY PHRASE]`, `[PRODUCT SCREENSHOT / ...]`, `[CTA_PRIMARY_LABEL]`, `[CTA_SECONDARY_LABEL]`

---

### Problem Section Prompt Template

**Trigger**: Any request for a pain point, problem, or "why this matters" section.

**Prompt**:
```
Build a problem section that surfaces the frustrations [TARGET AUDIENCE] experiences with [PROBLEM DOMAIN].

Layout:
- Full-width background tonal shift: `--color-text` at 95% lightness (near-black, distinct from hero)
- 3-column card grid — frustration cards with amber/red friction accents (`#F59E0B` border-left: 3px)
- Below cards: a single bridge sentence transitioning to the solution (bold, centered, `--font-heading`)

Content:
- Section eyebrow: [EYEBROW LABEL]
- 3 frustration cards: [PAIN_1], [PAIN_2], [PAIN_3]
- Bridge sentence: [BRIDGE_SENTENCE]

Animation: Cards enter on scroll via IntersectionObserver, 80ms stagger, translateY(16px) → 0.
```

**Required Variables**: `[TARGET AUDIENCE]`, `[PROBLEM DOMAIN]`, `[EYEBROW LABEL]`, `[PAIN_1–3]`, `[BRIDGE_SENTENCE]`

---

### Solution Section Prompt Template

**Trigger**: Any request for a product reveal, solution, or "how it works" section.

**Prompt**:
```
Build a solution section showing [PRODUCT NAME] as the answer to the problem above.

Layout:
- Light background return (`--color-bg`)
- Browser chrome mockup (CSS-only, with dot controls in `--color-muted`) containing [PRODUCT SCREENSHOT]
- Glow effect behind frame: `--shadow-lg` with `--color-brand` tint
- Mockup scales from 0.94 → 1.0 on scroll entry (`--ease-out-quart`, `--duration-enter`)

Copy focus: After-state language only. No "you'll be able to..." — only "you now have..."
- Headline: [SOLUTION_HEADLINE]
- 3 benefit bullets: [BENEFIT_1], [BENEFIT_2], [BENEFIT_3]
```

**Required Variables**: `[PRODUCT NAME]`, `[PRODUCT SCREENSHOT]`, `[SOLUTION_HEADLINE]`, `[BENEFIT_1–3]`

---

### Features Section Prompt Template

**Trigger**: Any request for a features, capabilities, or product details section.

**Prompt**:
```
Build a features section using a Bento Box grid layout for [PRODUCT NAME].

Grid structure (CSS Grid):
- 1 hero card (full-width or 2-col span): [HERO_FEATURE]
- 3 standard cards: [FEATURE_1], [FEATURE_2], [FEATURE_3]
- 1 wide card (2-col span): [WIDE_FEATURE]

Card treatment:
- Backgrounds: gradient or noise texture (no flat solid fills)
- Border: 1px `--color-border`, `--radius-md`
- Hover: `--shadow-md`, `translateY(-4px)`, border-color shifts to `--color-brand`, `--duration-micro`, `--ease-spring`

Each card must include: icon/visual, title, 1-sentence description.
```

**Required Variables**: `[PRODUCT NAME]`, `[HERO_FEATURE]`, `[FEATURE_1–3]`, `[WIDE_FEATURE]`

---

### Social Proof Prompt Template

**Trigger**: Any request for testimonials, logos, reviews, or social proof.

**Prompt**:
```
Build a social proof section for [PRODUCT NAME] with two sub-sections:

1. Logo bar
- Grayscale by default, full-color on hover (`--duration-micro`)
- Mobile: infinite CSS marquee animation, pause on hover
- Logos: [LOGO_1], [LOGO_2], [LOGO_3], [LOGO_4], [LOGO_5]

2. Testimonial grid
- Masonry layout (CSS columns: 3 on desktop, 1 on mobile)
- 1 featured card (col-span-2 equivalent): include customer photo, full name, title, company, metric highlight ("[METRIC]")
- Remaining cards: name, title, quote (2–3 sentences max)
- Card: `--color-surface`, `--shadow-sm`, `--radius-md`, `--space-4` padding

Testimonials: [TESTIMONIALS_DATA]
```

**Required Variables**: `[PRODUCT NAME]`, `[LOGO_1–5]`, `[METRIC]`, `[TESTIMONIALS_DATA]`

---

### Pricing Section Prompt Template

**Trigger**: Any request for a pricing table, plans, or tier comparison.

**Prompt**:
```
Build a pricing section for [PRODUCT NAME] with three tiers: [TIER_1], [TIER_2 — Pro], [TIER_3].

Layout:
- Monthly/Annual toggle: pill-style, animated price number transition (CSS `@keyframes` count-up or crossfade)
- 3-column card grid on desktop, stacked on mobile
- Pro tier ([TIER_2]) visually elevated: `--color-brand` border (2px), `--shadow-lg`, slightly larger scale (1.02) on desktop

Pro CTA:
- Background: `--color-brand`
- Pulsing glow animation: `box-shadow` keyframe with `--color-brand` at varying opacity, 2s loop
- Label: [PRO_CTA_LABEL]

Below grid: satisfaction guarantee badge — icon + "[GUARANTEE_COPY]" in `--color-muted`, centered.
```

**Required Variables**: `[PRODUCT NAME]`, `[TIER_1–3]`, `[PRO_CTA_LABEL]`, `[GUARANTEE_COPY]`; add pricing data per tier.

---

### FAQ Prompt Template

**Trigger**: Any request for an FAQ, accordion, or frequently asked questions section.

**Prompt**:
```
Build an FAQ accordion for [PRODUCT NAME].

Structure:
- Max-width: 720px, centered
- One item open at a time (JS toggle, aria-expanded)
- Item: question row (full-width button) + answer panel
- Open/close: `max-height` CSS transition (`--duration-enter`, `--ease-out-quart`)
- Icon: `+` → `×` rotation (45deg, `--duration-micro`)
- Separator: 1px `--color-border` between items, none on last

Questions: [FAQ_ITEMS — array of {q, a}]
```

**Required Variables**: `[PRODUCT NAME]`, `[FAQ_ITEMS]`

**Design Notes**: Must be keyboard navigable. Use `<details>`/`<summary>` or ARIA-compliant button pattern. No CSS-only accordions that break screen readers.

---

### Footer Prompt Template

**Trigger**: Any request for a footer, site footer, or page bottom.

**Prompt**:
```
Build a footer for [PRODUCT NAME].

Structure (top to bottom):
1. Newsletter CTA zone — dark gradient background (`--color-text` to `#1a1a2e`), centered headline + email input + submit button
2. 4-column link grid: [COL_1_LABEL] / [COL_2_LABEL] / [COL_3_LABEL] / [COL_4_LABEL] with respective links
3. Bottom bar: copyright, legal links, social icons
   - Social icons: `--color-muted` default, brand color on hover, `--duration-micro`
   - Separator: 1px `--color-border`, thin

Typography: `--font-body`, link color `--color-muted`, hover `--color-text`, `--duration-micro`
```

**Required Variables**: `[PRODUCT NAME]`, `[COL_1–4_LABEL]` and link arrays per column.

---

## 4. Animation Guidelines

- Every animation must serve a **functional purpose**: directing attention, confirming an action, or communicating state change. Decorative-only animation is prohibited.
- Entrance animations must use **IntersectionObserver** — no animations that fire on page load for below-the-fold content.
- Default durations: `--duration-micro` (200ms) for hover states, `--duration-enter` (350ms) for entrance, `--duration-page` (500ms) for page transitions.
- Spring easing (`--ease-spring`) for interactive elements (buttons, cards, drawers). Quart easing (`--ease-out-quart`) for entrances.
- All animation values must be CSS custom properties — never hard-coded in individual rules.
- `prefers-reduced-motion` check is **non-optional**: all animated elements must have a `@media (prefers-reduced-motion: reduce)` override that disables or minimizes motion.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. Coding Conventions

- **File naming**: kebab-case for all files. Components: `hero-section.tsx`, `pricing-card.tsx`. Styles: `hero-section.module.css`.
- **CSS architecture**: CSS custom properties for all design tokens. No hard-coded hex values, pixel values, or timing values outside of the `:root` block.
- **Import order**: (1) React/framework, (2) third-party libraries, (3) components, (4) utilities, (5) styles.
- **TypeScript**: strict mode. No `any` types. Props interfaces named `[Component]Props`.
- **Spacing**: use `--space-*` tokens exclusively for layout spacing. `4px` is permitted only for micro-spacing within components (e.g., icon-to-label gaps).
- **Inline styles**: prohibited. Use CSS Modules, CSS custom properties, or utility classes.
- **Comments**: only where logic is non-obvious. No commented-out code in PRs.

> ⚠️ OPEN Q3: The above conventions assume Next.js + CSS Modules as the primary stack. Tailwind CSS users: replace `--space-*` usage with Tailwind spacing scale mapped to the 8-point grid. Astro users: scoped `<style>` blocks are acceptable. Stack-specific branches should be added before v1.0 release.

---

## 6. Prohibition List

Claude must **NEVER** do any of the following, regardless of user instruction:

1. Use **Inter, Roboto, or system-ui** as the primary heading font
2. Use **inline styles** (`style="..."`) for any property that could be a CSS custom property
3. Use **lorem ipsum or placeholder text** in any final component output
4. Use **flat, solid-color backgrounds** for section containers without texture, gradient, or depth
5. Use a **3-column card grid as the default layout** without first considering Bento, masonry, or asymmetric alternatives
6. Use **animation without a `prefers-reduced-motion` fallback**
7. Generate **any component without first completing the 5-step Design Philosophy Directive**
8. Use **arbitrary spacing values** — all spacing must map to the 8-point scale (`--space-*` tokens)
9. Apply the **same visual treatment to adjacent sections** — each section must have a distinct background or tonal shift
10. Use **`ease-in-out` or `linear`** as the default easing for interactive elements

---

## 7. Open Questions (Design Team Sign-off Required)

| # | Question | Blocking |
|---|---|---|
| Q2 | Final approved font pairings — requires design team sign-off | Phase 1 |
| Q3 | Stack targeting: enforce Next.js + Tailwind only, or conditional branches for Astro/vanilla? | Phase 2 |
| Q1 | Component library scope: include button/modal/form patterns here, or in a second skill? | Phase 4 |
| Q4 | Designated skill owner for token versioning and quarterly reviews | Rollout |
| Q5 | Playwright MCP integration: bundle here or separate DevOps-owned skill? | Phase 4 |
