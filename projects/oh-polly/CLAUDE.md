# Oh Polly — Project Context

## What This Is
A US brand landing page for Oh Polly, a UK-born occasion and going-out wear brand for women 18-30, designed to make a US shopper who has never heard of the brand want the dress within 10 seconds.

## Tech Stack

**Framework:** Next.js 15 + React 19 + TypeScript
**CSS:** Tailwind CSS v4 + CSS Custom Properties for design tokens
**Animation:** GSAP 3 + ScrollTrigger + SplitText + Lenis smooth scroll
**Component animation:** Motion (Framer Motion) for React component-level interactions
**Icons:** Phosphor Icons
**Email:** Klaviyo (all signup forms POST to Klaviyo list)
**Commerce:** No embedded shop — all "Shop" CTAs link to us.ohpolly.com
**State:** Zustand (if cart/UI state needed)

**Install commands:**
```bash
npx create-next-app@latest oh-polly-us --typescript --tailwind --app --src-dir
cd oh-polly-us
npm install gsap lenis
npm install motion
npm install @phosphor-icons/react
npm install zustand
```

**Font loading (in layout.tsx):**
```tsx
import { Playfair_Display, Raleway, Cormorant } from 'next/font/google';
```

## Active Skill
fashion-apparel — loaded from `.claude/skills/fashion-apparel/SKILL.md`

This is a brand landing page variant (no Shopify Storefront API integration). All shopping links route to the existing live Shopify store at us.ohpolly.com. The fashion-apparel skill's component specifications, animation choreography, and premium checklist apply in full, minus the Shopify integration layer.

## Design System
Full spec in `docs/design-system.md`. Summary:
- **Visual style:** Luxury Minimal
- **Heading font:** Playfair Display (Google Fonts) — italic, weight 300 for display
- **Body font:** Raleway (Google Fonts) — weights 300-600
- **Label/caption font:** Cormorant Italic (Google Fonts)
- **Accent color:** #c4967a (champagne rose)
- **Dark background:** #0a0a0a
- **Light background:** #faf8f5 (warm cream)
- **Motion principle:** "Everything moves like a slow exhale before stepping out — deliberate, unhurried, confident."

## File Conventions
- Components: PascalCase (.tsx)
- CSS files: kebab-case
- Images: webp format, named descriptively (hero-campaign-video.mp4, wedding-edit-01.webp, not img001.webp)
- All spacing: use CSS custom properties from the design system — no raw px in layout
- Design tokens: defined in `src/styles/tokens.css`, imported in `globals.css`
- Section components: `src/components/sections/[SectionName].tsx`

## File Structure
```
src/
  app/
    page.tsx                  <- homepage (all 11 sections)
    layout.tsx                <- nav + footer wrapper, font loading
  components/
    AnnouncementBar.tsx
    Nav.tsx
    Footer.tsx
    sections/
      HeroSection.tsx
      NewArrivals.tsx
      EditorialCollections.tsx
      Bestsellers.tsx
      LookbookSection.tsx
      UgcFeed.tsx
      PressBar.tsx
      EmailCapture.tsx
    ProductCard.tsx
  lib/
    format.ts                 <- USD price formatting
  styles/
    tokens.css                <- all CSS custom properties
    globals.css               <- reset + base styles
```

## Section Build Order

Build sections in this exact order. Each section must be complete and responsive before starting the next.

1. **Announcement Bar** — "Free US shipping over $80 · Duties paid · Shop Now" — sticky, dismissible
2. **Navigation** — transparent over hero, solid on scroll, centered oh Polly logo, max 5 links
3. **Hero** — full-viewport campaign video (autoplay, muted, loop), headline, primary CTA to us.ohpolly.com
4. **New Arrivals** — 6-8 product cards with lifestyle imagery, hover cross-fade, "Shop New In" CTA
5. **Editorial Collections** — The Wedding Edit, Going Out, Holiday — alternating image/copy layout
6. **Bestsellers** — 4-6 signature pieces grid, curated editorial images
7. **Lookbook** — full-bleed editorial image sequence, "RSVP: The Wedding Edit" campaign
8. **UGC Feed** — 6-8 customer/creator photos with @handles, "Worn by you"
9. **Press / Stockist Strip** — as-seen-in logos (ASOS, Revolve, etc.), grayscale
10. **Email Capture** — Klaviyo signup, dark section, "Be first for new drops."
11. **Footer** — links, US signals (shipping, returns, sizing), social icons, legal

## Accessibility Requirements

- All images must have descriptive alt text (no empty alt on content images)
- Decorative lookbook images may use `alt=""`
- All interactive elements must be keyboard accessible
- Focus states must be visible: 2px solid --color-accent, 2px offset
- `prefers-reduced-motion`: disable all GSAP animations, parallax, entrance transforms, Lenis smooth scroll — show content statically
- Color contrast: all text passes WCAG AA minimum (4.5:1 for body, 3:1 for large text)
- Announcement bar dismiss button must have aria-label
- Navigation mobile menu must trap focus when open
- Video hero must have poster image fallback
- Skip-to-content link as first focusable element

## Performance Requirements

- Hero video: poster image loads first, video lazy-streams
- All below-fold images: `loading="lazy"`
- Hero image/video: `priority` / eager loading
- Fonts: loaded via next/font with `display: 'swap'`
- Images: webp format, responsive srcset via Next.js Image component
- GSAP: import only needed plugins, not the entire library
- Lighthouse target: 90+ Performance, 100 Accessibility
- No CLS: all images have explicit dimensions or aspect-ratio in CSS
- No render-blocking resources below the fold

## Do Not

- Use Inter or Roboto as display font — Playfair Display is the only heading font
- Use inline styles for any property expressible as a CSS variable
- Center body paragraphs or product descriptions
- Use flat solid-color section backgrounds without texture, gradient, or photography
- Write animation without prefers-reduced-motion fallback
- Use placeholder lorem ipsum text anywhere
- Use white studio-background product photography on the homepage
- Put SALE or promotional banners in the hero section
- Build a mega-menu or use more than 5 top-level nav items
- Use colorful backgrounds that compete with garment photography
- Show pricing in GBP — USD only, always
- Use exclamation marks in headlines
- Use "Hey girl" energy, "obsessed", or "slay" in body copy
- Use stock photography or AI-generated images
- Use identical entrance animations on two consecutive sections
- Use translateY hover lift on product cards — image cross-fade is the hover state
- Use `display: none` on elements that animate — use `opacity: 0` or `visibility: hidden`
- Skip US market signals (shipping, sizing, returns, duties paid)
- Build a custom checkout — all shop links go to us.ohpolly.com

## Brand Brief
Located at `docs/brand-brief.md` — read before making any content decision.

## Build Status
See `docs/build-log.md` for section-by-section progress.
