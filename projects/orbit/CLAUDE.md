# ORBIT — Project Context

## What This Is
A pre-launch landing page for Orbit, an open infrastructure marketplace for commerce operations ("vibe-commerce rails") targeting DTC merchants and operational specialists. The site is merchant-primary, specialist-secondary, and must feel like mission control for the future of commerce — not like another SaaS landing page.

## Tech Stack
- **Framework:** Next.js 15 + React 19 (App Router)
- **CSS:** Tailwind CSS v4 + CSS Custom Properties for the full design token system
- **Components:** shadcn/ui as base component library, customized to the dark design system
- **Animation:** GSAP 3 + ScrollTrigger + Lenis smooth scroll
- **Orbital Diagram:** HTML Canvas 2D (primary), Three.js/React Three Fiber (only if 3D perspective is required)
- **Icons:** Lucide React
- **Fonts:** Google Fonts — Space Grotesk, DM Sans, Space Mono
- **Package manager:** npm

### Install Commands
```bash
npx create-next-app@latest orbit --typescript --tailwind --eslint --app --src-dir
npx shadcn@latest init
npm i gsap lenis lucide-react
npm i three @react-three/fiber @react-three/drei  # only if 3D orbital approach is chosen
```

## Active Skill
product-landing-page — loaded from `.claude/skills/` (or closest equivalent)

## Design System
Full spec in `docs/design-system.md`. Summary:

- **Visual style:** Dark Mode First + Retro-Futuristic hybrid
- **Heading font:** Space Grotesk (ExtraBold for display, Bold for sections)
- **Body font:** DM Sans (Regular 400, Medium 500)
- **Mono font:** Space Mono (data labels, layer codes, captions)
- **Primary accent:** #4a9eff (electric blue)
- **Secondary accent:** #8b5cf6 (violet)
- **Background:** #060a14 (deep space black)
- **Motion principle:** "Everything moves like orbital mechanics — deliberate, continuous, gravitational. Elements drift into position. Nothing bounces, nothing snaps, nothing is playful."

## File Conventions
- **Components:** PascalCase (e.g., `OrbitalDiagram.tsx`, `HeroSection.tsx`)
- **CSS files:** kebab-case (e.g., `orbital-diagram.css`)
- **Page sections:** Each of the 9 sections is its own component in `src/components/sections/`
- **Design tokens:** All CSS custom properties defined in `src/styles/tokens.css` and imported globally
- **Canvas/WebGL:** Orbital diagram logic in `src/components/orbital/` directory
- **Images:** WebP format, named descriptively (e.g., `orbit-og-image.webp`)
- **All spacing:** Use CSS custom properties from the design system — no raw px in layout

## Sections (Build Order)
1. **Navigation** — Fixed, transparent-to-solid, minimal
2. **Hero** — Full viewport, animated orbital background, headline + CTA
3. **The Problem** — Two-column Traditional vs Orbit comparison
4. **The Vibe-Commerce Model** — 80/20 split visualization (the "aha" moment)
5. **The 7 Layers** — Interactive orbital diagram (most complex component)
6. **For Specialists** — Recruitment-tone value props, card grid
7. **Why It Works** — Three-column: Merchants / Specialists / Flywheel
8. **Early Access CTA** — Email capture form with faded orbital background
9. **Footer** — Minimal, dark, confident

## How To Implement the Orbital Diagram

The orbital diagram is the most complex component. It appears in 3 contexts with different configurations:

### Context 1 — Hero Background (Section 2)
- Ambient, no interaction, 40% node opacity, 5% ring opacity
- Renders behind text with a radial gradient overlay for legibility
- Shares animation state with the main diagram

### Context 2 — Interactive Centerpiece (Section 5)
- Full interaction: hover to highlight, click/tap to expand detail panel
- 7 nodes orbit 3 concentric elliptical rings around a central MERCHANT node
- Each node has a unique color from the 7-layer color system (see design-system.md)
- OPS node is visually distinct: brighter, innermost orbit, near-white color
- Keyboard navigable: Tab through nodes, Enter/Space to expand
- Detail panel shows: Agent name, Specialist role, Merchant benefit

### Context 3 — CTA Background (Section 8)
- Faded (30% opacity), zoomed in (120% scale), no interaction, no labels
- Visual bookend with the hero

### Technical Implementation
- Use **HTML Canvas 2D** with `requestAnimationFrame`
- Drive orbital rotation via GSAP ticker or manual rAF loop
- 3 elliptical orbits: inner (25% radius), middle (42% radius), outer (58% radius)
- Angular velocities: inner 0.0003 rad/frame, middle 0.0005, outer 0.0008
- Cap `devicePixelRatio` at 2 for canvas resolution
- Use Intersection Observer to pause animation when off-screen
- Node hit detection: distance from pointer to node center
- On click: pause rotation, animate selected node to expanded position, show detail panel
- Mobile (<768px): replace canvas with scroll-driven sequential card reveal or static SVG

### Accessibility for Orbital Diagram
- Container: `role="img"` with `aria-label` describing the 7-layer model
- Interactive version (Section 5): `role="application"` with `aria-roledescription="interactive diagram"`
- Each node: rendered as an off-screen button with `aria-label` (e.g., "MIA — Market Intelligence Agent")
- When expanded: detail panel gets `aria-live="polite"` to announce content
- Reduced motion: render static SVG with all nodes visible, no animation

## Accessibility Requirements
- WCAG 2.1 AA minimum across all sections
- All text on dark backgrounds must pass contrast: 4.5:1 for body text, 3:1 for large text
- All interactive elements: visible focus outlines (2px --color-accent, 2px offset)
- Touch targets: minimum 44x44px
- Form inputs: proper `<label>` elements, not just placeholders
- `prefers-reduced-motion`: disable all GSAP animations, Three.js/canvas motion, parallax. Show content statically.
- Orbital diagram: provide static fallback + screen reader alternative content
- Skip-to-content link at the top of the page

## Performance Requirements
- Critical path (HTML + CSS + fonts) renders before animation libraries load
- GSAP and Three.js/canvas: loaded asynchronously, not blocking first paint
- Orbital diagram: 30fps minimum on mid-range devices
- Lenis smooth scroll: zero jank tolerance — any scroll stutter is a failure
- Images: WebP, lazy-loaded below the fold
- Fonts: preloaded via `<link rel="preload">` for Space Grotesk (primary heading font)
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

## Do Not
- Use Inter or Roboto as display font
- Use inline styles for anything expressible as a CSS variable
- Center body paragraphs — left-align always
- Use flat solid-color section backgrounds without gradient or visual depth
- Write animation without `prefers-reduced-motion` fallback
- Use placeholder lorem ipsum text
- Use light or white backgrounds anywhere — dark mode is the only mode
- Use generic SaaS illustration style (blob people, undraw, flat vectors)
- Use a dashboard screenshot as any visual
- Use blue gradient + white card visual pattern
- Render the 7-layer diagram as a static table, list, or image
- Use bounce or spring easing — all motion is gravitational
- Show pricing — this is early access only
- Use casual startup tone ("Hey there!", "We're so excited!", exclamation-heavy copy)
- Use the same entrance animation on two consecutive sections
- Mix component library sources — shadcn/ui is the only base; do not add MUI, Chakra, etc.

## Brand Brief
Located at `docs/brand-brief.md` — read before making any content decision. Key points:
- Brand archetype: Sage + Ruler hybrid
- Emotional direction: inevitable, intelligent, calm confidence
- The site IS the proof of concept for "vibe-commerce" — if it feels like generic SaaS, the concept fails
- Merchant-primary narrative flow, specialist-secondary
- The orbital diagram is the hero visual — there is no photography

## Build Status
See `docs/build-log.md` for section-by-section progress.
