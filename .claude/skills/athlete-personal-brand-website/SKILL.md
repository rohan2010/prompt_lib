---
name: athlete-personal-brand-website
description: Build a premium athlete or celebrity personal brand website with cinematic scroll choreography, editorial photography, horizontal scroll galleries, dual-state hover cards, partner logo marquees, and a landscape-forced mobile experience. Activates on requests for athlete sites, personal brand pages, sports portfolio websites, celebrity homepages, or any high-end personal brand with on/off-track or professional/personal split content.
version: 1.0.0
trigger_keywords:
  - athlete website
  - personal brand
  - celebrity site
  - sports portfolio
  - player homepage
  - personal homepage
  - fan site
  - brand identity site
---

# Athlete / Celebrity Personal Brand Website

Build a cinematic, editorial personal brand website inspired by the design language of elite athlete sites — dark palette, massive typography, horizontal scroll galleries, dual-state image cards, and a loader experience that makes the first impression unforgettable.

---

## Asset Request (Ask the User First)

Before writing a single line of code, ask the user for the following. Frame it as a quick checklist — not a form:

```
Before I build this, I need a few assets from you. Drop them in or
describe what you have and I'll work around anything missing:

REQUIRED
□ Hero image — full-bleed portrait or action shot, ideally 1920×1080 or taller
□ Profile name + tagline (e.g. "2025 McLaren Formula 1 Driver")
□ Brand accent color (or I'll choose one that fits the vibe)

STRONGLY RECOMMENDED
□ 6–12 editorial photos for the horizontal scroll gallery
  (mix of "professional" and "personal" shots works best)
□ Signature SVG or PNG (hand-written signature, logo mark, or both)
□ Partner / sponsor logos (SVG preferred, PNG acceptable)
□ Social handles (Instagram, TikTok, YouTube, Twitter/X, Twitch, etc.)

OPTIONAL BUT IMPACTFUL
□ 2–3 helmet, product, or collectible images with a base + hover variant each
  (used for the Hall of Fame / showcase card grid)
□ A short looping video or cinemagraph for the hero background
□ Headshot for the nav menu overlay images (3–5 editorial photos)
□ A quote or short manifesto (1–3 sentences, used in the bio section)
□ Store or external link URL
□ Upcoming event / next match / next race info (name + date + link)

Missing assets? Tell me what you have and I'll generate placeholder
structures and note exactly where each asset slots in.
```

---

## Site Architecture

The complete page structure, in scroll order:

```
Loader Screen
↓
Fixed Navigation (transparent → opaque on scroll)
  └── Full-screen Menu Overlay (with editorial photo grid)
↓
Hero Section (full viewport, landscape-forced on mobile)
↓
Bio / Manifesto Section (bold statement, signature)
↓
Horizontal Photo Scroll Gallery (breaks vertical flow)
↓
Content Split Section ("On Track / Off Track" or equivalent)
↓
Showcase Card Grid (helmets / products / collectibles — dual-state hover)
↓
Store / Product Promotion Section (dark CTA)
↓
Partners & Campaigns Section (logo marquee + Rive/animation placeholder)
↓
Social Feed Grid
↓
Footer (tagline + sponsor logos + nav + social + copyright)
```

---

## Premium Checklist (Non-Negotiable)

1. **Loader with branded button** — not a spinner. A full-screen dark overlay with the person's name/logo and a single large CTA button ("Load [Name]") that the user clicks to enter. Feels like a gate, not a wait.
2. **Landscape-only mobile** — athlete sites live in widescreen. On portrait mobile, show a rotate-device screen. On landscape mobile, show the full site.
3. **Full-screen nav overlay** — clicking the menu opens a full-viewport dark overlay with editorial photos in a grid alongside the nav links. Photos animate in with staggered clip-path reveals.
4. **Massive display typography** — hero name at 14vw–18vw. Section headings at 10vw+. Scale contrast between display text and body copy is what makes it feel premium, not a font choice.
5. **Horizontal scroll gallery** — a dedicated section that scrolls horizontally via `gsap.to(x)` tied to vertical scroll. Each image has a location/event caption. At least one quote overlaid mid-gallery. Breaks the vertical monotony.
6. **Dual-state hover cards** — every item in the showcase grid has a `base` image and a `hover` image. On hover, the hover image cross-fades over the base. Labels appear from below.
7. **Partner logo marquee** — two infinite-scroll rows of logos at slightly different speeds (one left, one right). On hover, logos animate from grayscale to full color.
8. **Signature SVG used as a divider** — the handwritten signature (or logo mark) appears between sections as a decorative break, not just in the header.
9. **Next event widget** — a small fixed or inline widget showing the upcoming race/match/event name and a link to the calendar page. Updates feel live.
10. **Social grid** — a masonry or uniform grid of social imagery with platform labels. Not an embed — static images with links out to platforms.
11. **Blob / organic SVG decoratives** — no sharp geometric decoratives. Use flowing organic blob SVGs as background texture elements in the footer and hero.
12. **Lenis smooth scroll** — mandatory. Native scroll breaks the horizontal gallery timing and the cinematic feel.
13. **GSAP ScrollTrigger for all section entrances** — no CSS animation for scroll effects. Everything is ScrollTrigger-driven so timing is precise.
14. **prefers-reduced-motion fallback** — disable all parallax, marquee motion, and entrance animations. Show content statically. Non-optional.

---

## Design Token System

```css
:root {
  /* Colors — replace with brand values */
  --bg:           #0d0d0d;       /* near-black page background */
  --bg-surface:   #141414;       /* card and section surface */
  --accent:       #c5f82a;       /* brand lime / primary accent — REPLACE */
  --accent-dark:  #8fb81a;       /* darker accent for hover states */
  --text:         #f0ede8;       /* primary text on dark */
  --text-muted:   #666560;       /* secondary text, captions, labels */
  --text-on-accent: #0d0d0d;     /* text placed on accent color */
  --border:       rgba(240,237,232,0.08); /* subtle dividers */

  /* Typography — REPLACE with brand fonts */
  --font-display: 'Editorial New', 'Playfair Display', serif; /* hero, section titles */
  --font-sans:    'Aktiv Grotesk', 'Inter', sans-serif;        /* body, labels, nav */
  --font-mono:    'IBM Plex Mono', monospace;                  /* captions, data labels */

  /* Spacing — 8pt scale */
  --space-1: 8px;   --space-2: 16px;  --space-3: 24px;
  --space-4: 32px;  --space-6: 48px;  --space-8: 64px;
  --space-12: 96px; --space-16: 128px;

  /* Radius */
  --radius-sm: 2px;
  --radius-md: 8px;
  --radius-pill: 999px;

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 200ms;
  --duration-mid: 500ms;
  --duration-slow: 900ms;
}
```

---

## Component Specifications

### 1. Loader Screen

**Purpose:** Gates entry. Builds anticipation. Establishes brand tone before any content is seen.

**Structure:**
```html
<div id="loader">
  <div class="loader-inner">
    <span class="loader-eyebrow">[SPORT] since [YEAR]</span>
    <h1 class="loader-name">[FULL NAME]</h1>
    <button id="loader-enter">[ENTER / "Load [Name]"]</button>
  </div>
  <div class="loader-bg-text" aria-hidden="true">[LAST NAME]</div>
</div>
```

**Behavior:**
- Full viewport, `position: fixed`, `z-index: 9999`
- Background: `var(--bg)`
- Loader background text: oversized (20vw+), low opacity (0.04), accent color — visible but subliminal
- Enter button: outlined, uppercase, letter-spaced, accent border
- On click: `gsap.to("#loader", { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power4.inOut" })` — wipes up and off screen

---

### 2. Fixed Navigation

**Structure:**
```html
<header class="site-header">
  <a class="logo" href="/">[LOGO SVG or TEXT]</a>
  <button class="menu-toggle" aria-label="Open menu">
    <span></span><span></span>  <!-- two-line hamburger → X -->
  </button>
  <a class="header-store-link" href="[STORE URL]">Store</a>
</header>
```

**Behavior:**
- Default: transparent background, light text
- After 80px scroll: `background: rgba(13,13,13,0.92)`, `backdrop-filter: blur(12px)`, subtle bottom border
- Smooth 300ms transition between states
- On mobile landscape: same. On portrait: show rotate screen instead.

---

### 3. Full-Screen Menu Overlay

**Purpose:** The most visually distinct component. Half nav links, half editorial photo gallery. Communicates personality immediately.

**Structure:**
```html
<nav class="menu-overlay" aria-hidden="true">
  <div class="menu-grid">
    <!-- Left: navigation links -->
    <div class="menu-links">
      <a class="menu-link" href="/[page]" data-index="01">[Page Name]</a>
      <!-- repeat for all pages -->
      <div class="menu-meta">
        <a href="mailto:[EMAIL]">business enquiries</a>
        <div class="menu-socials">
          <!-- social links -->
        </div>
      </div>
    </div>
    <!-- Right: editorial photo grid (3–5 images) -->
    <div class="menu-photos">
      <div class="menu-photo-item">
        <img src="[EDITORIAL PHOTO 1]" alt="" loading="eager">
      </div>
      <!-- repeat, stagger sizes: 2 tall + 1 wide or 3 portrait -->
    </div>
  </div>
</nav>
```

**Behavior:**
- Overlay: `position: fixed`, full viewport, `var(--bg)`, `z-index: 9000`
- Open: `clipPath: "inset(0 0 100% 0)"` → `"inset(0 0 0% 0)"`, 0.8s `power4.inOut`
- Links stagger in: `y: 30, opacity: 0` → `y: 0, opacity: 1`, 0.06s stagger
- Photos stagger in via clip-path: `inset(100% 0 0 0)` → `inset(0% 0 0 0)`, 0.9s, staggered 0.1s

**Image prompt for user:**
> "For the menu overlay, I need 3–5 editorial portrait photos of [person]. Mix of action and casual — vertical orientation preferred. Drop them in a `/images/menu/` folder."

---

### 4. Hero Section

**Purpose:** Immediate brand establishment. Name, role, next event. Landscape composition.

**Structure:**
```html
<section class="hero" id="hero">
  <div class="hero-bg">
    <img src="[HERO IMAGE]" alt="[NAME]" class="hero-img">
    <!-- OR: <video autoplay muted loop playsinline class="hero-video"> -->
  </div>
  <div class="hero-content">
    <span class="hero-eyebrow">[SPORT/TEAM] since [YEAR]</span>
    <h1 class="hero-name">
      <span class="hero-name-first">[FIRST NAME]</span>
      <span class="hero-name-last">[LAST NAME]</span>
    </h1>
    <p class="hero-subtitle">[YEAR] [TEAM] [SPORT] [ROLE]</p>
  </div>
  <div class="hero-next-event">
    <span class="next-label">Next</span>
    <a href="/calendar" class="next-event-name">[EVENT NAME]</a>
  </div>
  <div class="hero-signature">
    <img src="[SIGNATURE SVG]" alt="[Name] signature">
  </div>
  <div class="hero-scroll-hint" aria-hidden="true">
    scroll ↓
  </div>
</section>
```

**Typography:**
- `.hero-name`: `font-size: clamp(8rem, 15vw, 18rem)`, display font, uppercase or natural case
- `.hero-subtitle`: `font-size: 1rem`, mono font, letter-spacing 0.2em, muted color
- `.hero-eyebrow`: `font-size: 0.75rem`, all-caps, accent color

**Image prompt for user:**
> "Hero needs a full-bleed image of [person] — ideally landscape orientation, subject positioned left or right (not dead center) so the name text can live on the opposite side. 1920×1080 minimum."

---

### 5. Bio / Manifesto Section

**Purpose:** Emotional hook. Short, punchy, bold. Tells the story in 2–3 sentences.

**Structure:**
```html
<section class="bio-section">
  <div class="bio-inner">
    <p class="bio-statement">
      [WORD 1] <strong>[IMPACTFUL WORD]</strong>, [word] for 
      <strong>[IMPACTFUL WORD]</strong>, [continuation]. 
      Defining a <strong>[IMPACTFUL WORD]</strong> [conclusion].
    </p>
    <div class="bio-signature">
      <img src="[SIGNATURE SVG]" alt="signature">
    </div>
  </div>
</section>
```

**Typography:**
- Statement: `font-size: clamp(1.4rem, 2.8vw, 3.2rem)`, line-height 1.3
- Bold `<strong>` words: `color: var(--accent)` — creates a visual rhythm through the text
- Max width: 900px, left-aligned

**GSAP entrance:** Words split and stagger in from `y: 40, opacity: 0` as section enters viewport.

---

### 6. Horizontal Photo Scroll Gallery

**Purpose:** Breaks vertical scroll monotony. Showcases a large photo library in an immersive ribbon format.

**Structure:**
```html
<section class="gallery-section">
  <div class="gallery-track" id="gallery-track">
    <div class="gallery-item" data-caption="[Location, Year]">
      <img src="[PHOTO]" alt="[Caption]">
      <span class="gallery-caption">[Location, Year]</span>
    </div>
    <!-- repeat 8–12 items -->
    <div class="gallery-quote">
      <blockquote>"[MID-GALLERY QUOTE]"</blockquote>
      <img src="[SIGNATURE SVG]" alt="signature">
    </div>
    <!-- continue photo items -->
  </div>
</section>
```

**GSAP horizontal scroll:**
```js
const track = document.getElementById("gallery-track");
const trackWidth = track.scrollWidth;

gsap.to(track, {
  x: () => -(trackWidth - window.innerWidth) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: ".gallery-section",
    start: "top top",
    end: () => `+=${trackWidth - window.innerWidth}`,
    scrub: 1.2,
    pin: true,
    anticipatePin: 1
  }
});
```

**Image prompt for user:**
> "Gallery needs 8–12 photos. Mix of:
> - 4–5 professional/action shots (on track, in uniform, at events)
> - 4–5 personal/lifestyle shots (casual, travel, hobbies)
> - Landscape orientation preferred but portrait works fine
> For each image add a short caption: Location, Year (e.g. 'Miami GP, 2024')
> Drop them in `/images/gallery/` numbered in the order you want them to appear."

---

### 7. Content Split Section ("On / Off Track")

**Purpose:** Directs visitors to the two main content categories. Large, confident, minimal.

**Structure:**
```html
<section class="content-split">
  <a class="split-item split-item--left" href="/[category-1]">
    <div class="split-label">
      <span class="split-word-1">[CATEGORY 1]</span>
      <span class="split-word-2">[CATEGORY 1 SUBTITLE]</span>
    </div>
    <p class="split-desc">
      [Short description with one <strong>bold highlighted word</strong>]
    </p>
  </a>
  <a class="split-item split-item--right" href="/[category-2]">
    <div class="split-label">
      <span class="split-word-1">[CATEGORY 2]</span>
      <span class="split-word-2">[CATEGORY 2 SUBTITLE]</span>
    </div>
    <p class="split-desc">
      [Short description with one <strong>bold highlighted word</strong>]
    </p>
  </a>
</section>
```

**Typography:**
- `.split-word-1`: `font-size: clamp(4rem, 10vw, 12rem)`, display font
- `.split-word-2` stacked below on the same visual block
- On hover: accent color bleeds in on the text

---

### 8. Showcase Card Grid (Dual-State Hover)

**Purpose:** Gallery of key items (helmets, trophies, products, campaigns). Each card has two image states that cross-fade on hover.

**Structure:**
```html
<section class="showcase-section">
  <div class="showcase-header">
    <span class="showcase-eyebrow">[COLLECTION NAME]</span>
    <h2 class="showcase-title">[Title]<br><em>[Title Line 2]</em></h2>
    <p class="showcase-desc">[Short collection description]</p>
  </div>
  <div class="showcase-grid">
    <div class="showcase-card">
      <div class="card-images">
        <img class="card-base"  src="[BASE IMAGE]"  alt="[Item name]">
        <img class="card-hover" src="[HOVER IMAGE]" alt="[Item name] — alternate view">
        <!-- Gradient mask for label legibility -->
        <div class="card-mask card-mask--grey"></div>
        <div class="card-mask card-mask--accent"></div>
      </div>
      <div class="card-meta">
        <span class="card-name">[Item Name]</span>
        <span class="card-year">[Year]</span>
      </div>
    </div>
    <!-- repeat per item -->
  </div>
  <a class="showcase-cta" href="/[section]">View all [items]</a>
</section>
```

**CSS — dual-state cross-fade:**
```css
.card-images { position: relative; overflow: hidden; }
.card-base, .card-hover {
  width: 100%; display: block;
  transition: opacity var(--duration-mid) var(--ease-out);
}
.card-hover {
  position: absolute; inset: 0;
  opacity: 0;
}
.showcase-card:hover .card-hover { opacity: 1; }
.showcase-card:hover .card-base  { opacity: 0; }

/* Gradient mask — bottom fade for label legibility */
.card-mask {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
}
.card-mask--accent {
  background: linear-gradient(to top, color-mix(in srgb, var(--accent) 40%, transparent) 0%, transparent 40%);
  opacity: 0;
  transition: opacity var(--duration-mid) var(--ease-out);
}
.showcase-card:hover .card-mask--accent { opacity: 1; }
```

**Image prompt for user:**
> "Showcase section needs image pairs — one base image and one alternate for each item:
> - base: standard front-facing view (clean, centered)
> - hover: different angle, color, or emotional moment
> Ideal dimensions: square (1:1) or portrait (3:4). Drop in `/images/showcase/` as:
>   item-01-base.webp, item-01-hover.webp
>   item-02-base.webp, item-02-hover.webp
>   etc."

---

### 9. Store / Promotion Section

**Purpose:** Commercial CTA. Dark, high-contrast, product-forward.

**Structure:**
```html
<section class="store-section">
  <div class="store-content">
    <span class="store-eyebrow">[STORE NAME]</span>
    <h2 class="store-headline">[Campaign Headline]</h2>
    <p class="store-desc">[1–2 sentence description of the collection/reason to buy]</p>
    <a class="store-cta" href="[STORE URL]">Visit the store</a>
  </div>
  <div class="store-images">
    <div class="store-img store-img--1"><img src="[PRODUCT IMG 1]" alt=""></div>
    <div class="store-img store-img--2"><img src="[PRODUCT IMG 2]" alt=""></div>
    <div class="store-img store-img--3"><img src="[PRODUCT IMG 3]" alt=""></div>
    <!-- offset grid — not a uniform row -->
  </div>
</section>
```

**Layout:** The three product images sit in an offset grid where each image is at a different vertical position — not aligned to a baseline. Creates a stacked, editorial feel.

---

### 10. Partners & Campaigns Section

**Purpose:** Credibility. Shows brand associations. The marquee keeps it dynamic without being loud.

**Structure:**
```html
<section class="partners-section">
  <div class="partners-header">
    <h2 class="partners-title">partners<br><em>&amp; campaigns</em></h2>
    <p class="partners-desc">[1-sentence description of partnership philosophy]</p>
    <a class="partners-cta" href="/partnerships">view partnerships</a>
  </div>
  <div class="partners-marquee-wrap">
    <!-- Row 1: scrolls left -->
    <div class="marquee-row marquee-row--left">
      <div class="marquee-track">
        [LOGO ITEMS × 2 for seamless loop]
      </div>
    </div>
    <!-- Row 2: scrolls right at different speed -->
    <div class="marquee-row marquee-row--right">
      <div class="marquee-track">
        [LOGO ITEMS × 2 for seamless loop]
      </div>
    </div>
  </div>
</section>
```

**Logo item:**
```html
<div class="logo-item">
  <img src="[LOGO SVG]" alt="[Partner Name]" class="partner-logo">
</div>
```

**CSS — grayscale to color on hover:**
```css
.partner-logo {
  filter: grayscale(1) brightness(0.6);
  transition: filter var(--duration-fast) var(--ease-out);
  height: 32px; width: auto;
}
.logo-item:hover .partner-logo {
  filter: grayscale(0) brightness(1);
}
```

**GSAP marquee:**
```js
// Row 1 — scrolls left
gsap.to(".marquee-row--left .marquee-track", {
  xPercent: -50,
  ease: "none",
  duration: 28,
  repeat: -1
});
// Row 2 — scrolls right, slower
gsap.to(".marquee-row--right .marquee-track", {
  xPercent: 50,
  ease: "none",
  duration: 36,
  repeat: -1
});
```

**Image prompt for user:**
> "Partners section needs logo SVGs for each partner/sponsor. SVG strongly preferred over PNG — logos need to be clean on dark backgrounds. Drop them in `/images/logos/`. If you have both light and dark variants, label them: partner-name-light.svg and partner-name-dark.svg."

---

### 11. Social Feed Grid

**Purpose:** Connects visitors to active social platforms. Shows personality — a mix of professional and candid.

**Structure:**
```html
<section class="social-section">
  <h2 class="social-title">what's up<br><em>on socials</em></h2>
  <div class="social-grid">
    <div class="social-item social-item--tall">
      <img src="[SOCIAL IMG]" alt="">
      <span class="social-platform">[PLATFORM]</span>
    </div>
    <!-- 6–8 items, mix of tall and square -->
  </div>
  <div class="social-links">
    <a href="[PLATFORM URL]">[Platform]</a>
    <!-- repeat per platform -->
  </div>
</section>
```

**Grid layout:** CSS Grid with `grid-auto-rows` and selective `grid-row: span 2` on certain items to create varied heights without a JS masonry library.

**Image prompt for user:**
> "Social grid needs 6–8 recent photos — the kind you'd post on Instagram or TikTok. Mix of action shots and casual/behind-the-scenes. Square or portrait. Drop in `/images/social/`."

---

### 12. Footer

**Structure:**
```html
<footer class="site-footer">
  <!-- Top zone: tagline + big hero element -->
  <div class="footer-hero">
    <h2 class="footer-tagline">[MEMORABLE TAGLINE]</h2>
    <div class="footer-hero-img">
      <img src="[HERO PRODUCT / SIGNATURE ITEM]" alt="[Description]">
    </div>
    <a class="footer-business" href="mailto:[EMAIL]">business enquiries</a>
  </div>

  <!-- Sponsor bar -->
  <div class="footer-sponsors">
    <img src="[SPONSOR LOGO]" alt="[Sponsor]" class="sponsor-logo">
    <!-- repeat per major sponsor -->
  </div>

  <!-- Nav zone -->
  <div class="footer-nav">
    <div class="footer-nav-col">
      <span class="footer-col-label">pages</span>
      <a href="/[page]">[Page]</a>
      <!-- repeat -->
    </div>
    <div class="footer-nav-col">
      <span class="footer-col-label">follow on</span>
      <a href="[SOCIAL]">[Platform]</a>
      <!-- repeat -->
    </div>
    <div class="footer-logo">
      <img src="[FOOTER LOGO SVG]" alt="[Name] logo">
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="footer-bottom">
    <span class="footer-copy">© [YEAR] [NAME]. All rights reserved.</span>
    <div class="footer-legal">
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms">Terms</a>
    </div>
  </div>

  <!-- Decorative blob -->
  <div class="footer-blob" aria-hidden="true"></div>
</footer>
```

**Footer blob — CSS organic shape:**
```css
.footer-blob {
  position: absolute;
  bottom: -10%;
  right: -5%;
  width: 40vw;
  height: 40vw;
  background: var(--accent);
  opacity: 0.04;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  filter: blur(60px);
  pointer-events: none;
}
```

---

## Section Animation Choreography

Map each section to its entrance animation. No two consecutive sections share the same type.

| Section | Animation Type | Trigger | Stagger |
|---|---|---|---|
| Loader → Hero | clip-path wipe up | Button click | — |
| Bio statement | Word split fade-up | `top 80%` | 0.02s per word |
| Gallery | Horizontal translate (pinned) | Pin scroll | Scrub |
| Content split | Scale + opacity from 0.85 | `top 70%` | 0.15s per side |
| Showcase cards | Stagger from `y: 60, opacity: 0` | `top 75%` | 0.08s per card |
| Store images | Offset stagger: each image different Y delay | `top 70%` | 0.15s |
| Partners header | Slide from left `x: -60, opacity: 0` | `top 75%` | 0.1s |
| Social grid | Scale from 0.9 + opacity | `top 80%` | 0.06s per item |
| Footer tagline | Character split, clip-path reveal | `top 85%` | 0.04s per char |

---

## Mobile (Landscape-Forced) Rules

```css
/* Portrait: show rotate screen */
@media (orientation: portrait) {
  .rotate-prompt { display: flex; }
  body > *:not(.rotate-prompt) { display: none; }
}

/* Landscape mobile: show full site, scaled down */
@media (orientation: landscape) and (max-height: 500px) {
  .hero-name { font-size: clamp(5rem, 12vw, 10rem); }
  .split-word-1 { font-size: clamp(3rem, 8vw, 8rem); }
  .gallery-item { height: 80vh; }
}
```

**Rotate prompt:**
```html
<div class="rotate-prompt">
  <div class="rotate-icon">↻</div>
  <p>Please rotate your device.<br>This is a horizontal experience.</p>
</div>
```

---

## File Structure

```
project-root/
  index.html
  css/
    style.css
  js/
    app.js          ← Lenis, GSAP init, scroll orchestration
    menu.js         ← Menu overlay open/close + photo stagger
    gallery.js      ← Horizontal scroll pin
    marquee.js      ← Partner logo marquee
    loader.js       ← Loader gate + entrance sequence
  images/
    hero/           ← hero.webp (or hero.mp4 for video bg)
    menu/           ← menu-01.webp … menu-05.webp
    gallery/        ← gallery-01.webp … gallery-12.webp (with captions in HTML)
    showcase/       ← item-01-base.webp, item-01-hover.webp …
    social/         ← social-01.webp … social-08.webp
    logos/          ← partner logos (SVG preferred)
    signature.svg   ← handwritten signature
    logo.svg        ← main logo mark
    footer-logo.svg ← footer variant of logo
```

---

## Typography Rules

- **Never center body copy.** All paragraph text is left-aligned. Center alignment only for display headings in specific contexts (section titles that span full width).
- **Display headings**: always use `font-size: clamp(min, vw, max)` — never fixed px for headings.
- **Accent color on bold words**: `<strong>` inside body copy renders in `var(--accent)`. Establishes visual rhythm.
- **Small labels**: `font-family: var(--font-mono)`, `font-size: 0.7rem`, `letter-spacing: 0.2em`, `text-transform: uppercase`.
- **Never use Inter as the display font.** It's fine for small body copy but kills the premium feel at large sizes.

---

## Prohibition List

Claude must **NEVER** do the following on this project:

- Use a standard CSS spinner or skeleton loader — the loader is a branded gate, not a waiting indicator
- Center-align body paragraphs or section descriptions
- Use a 3-column equal-height card grid — the showcase cards must have visual hierarchy and offset
- Animate with CSS `@keyframes` where GSAP ScrollTrigger should be used
- Use `<video autoplay>` without `muted`, `playsinline`, and `loop` attributes
- Use placeholder lorem ipsum in any final component — ask for real copy or draft believable placeholder content in the brand voice
- Use `box-shadow` as the only depth indicator — combine with scale transforms for card hover states
- Skip the dual-state image setup — if the user provides only one image per showcase card, ask for the second state
- Use flat solid backgrounds for any full-width section — every section break should have a subtle gradient, texture, or tone shift
- Deploy any scroll animation without a `prefers-reduced-motion` check

---

## CDN Stack

```html
<!-- End of body, in this order -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
<script src="js/loader.js"></script>
<script src="js/menu.js"></script>
<script src="js/gallery.js"></script>
<script src="js/marquee.js"></script>
<script src="js/app.js"></script>
```

---

## Troubleshooting

- **Horizontal gallery jumps on pin**: Set `anticipatePin: 1` on the ScrollTrigger and ensure the `.gallery-section` has an explicit height set to `100vh`
- **Menu overlay flashes on page load**: Set `visibility: hidden` in CSS, not `display: none` — GSAP can't animate `display` reliably
- **Dual-state card flickers on first hover**: Preload the hover image by adding `<link rel="preload" as="image" href="...">` in `<head>` for each hover image
- **Marquee jumps when looping**: The track must contain two full copies of all logos (`×2`) for a seamless seamless crossover. Verify the track width is exactly double the visual set width
- **Loader clip-path not hiding cleanly**: Use `clipPath: "inset(0 0 100% 0)"` with `overwrite: true` to prevent conflicts with any initial CSS state
- **Signature SVG appears too large**: Constrain with `max-width: 160px` and `height: auto`; SVGs default to intrinsic size which is often massive
- **Portrait mobile shows site content**: Confirm the `orientation: portrait` media query is targeting the `body > *:not(.rotate-prompt)` selector and not just a wrapper div