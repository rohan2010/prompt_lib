# Frontend Resource Library
### For the Bespoke Web Agent System — Design Director & Frontend Builder Reference

This document is the master reference for all component libraries, animation libraries, design schemes, font pairings, color systems, and tooling available to the agent pipeline. The Design Director selects from this list when building a design system. The Frontend Builder loads the chosen stack from here.

---

## How To Use This Document

Each section is tagged for the relevant agent:
- `[DD]` — Design Director selects during design-system.md authoring
- `[FB]` — Frontend Builder loads and uses during build
- `[DD+FB]` — both agents reference this

---

## 1. Component Libraries `[FB]`

Grouped by philosophy. The Design Director picks a category in the design system. The Frontend Builder loads from that category only — do not mix categories without explicit instruction.

---

### 1A. Headless / Unstyled Primitives
*Use when: the brand has a strong visual identity and needs zero design opinions from the library. Maximum customisation. Pairs with the company design token system perfectly.*

| Library | Stack | Install | Best For |
|---|---|---|---|
| **Radix UI** | React | `npm i @radix-ui/react-*` | Accessible primitives — dialogs, dropdowns, tooltips. Zero styling. |
| **Headless UI** | React / Vue | `npm i @headlessui/react` | Tailwind projects. Disclosure, Menu, Combobox, Switch. |
| **Ark UI** | React / Vue / Solid | `npm i @ark-ui/react` | More primitives than Radix. Includes date picker, tags input, timer. |
| **React Aria** | React | `npm i react-aria-components` | Adobe's a11y-first primitives. Best in class for accessibility. |

**Agent instruction:** Use headless primitives when the visual style is Neobrutalist, Bauhaus, Swiss/International, or any style where default component aesthetics would conflict with the design system.

---

### 1B. Tailwind-Based Component Systems
*Use when: speed matters and the design system is Tailwind-first. These are copy-paste or install-and-customise.*

| Library | Stack | Install | Best For |
|---|---|---|---|
| **shadcn/ui** | React + Tailwind | `npx shadcn@latest init` | The standard. 50+ components, fully owned in your codebase. Best base for custom theming. |
| **DaisyUI** | Tailwind (framework agnostic) | `npm i daisyui` | Fastest setup. 80+ semantic component classes. 35 built-in themes. |
| **Flowbite** | React + Tailwind | `npm i flowbite-react` | Pre-built blocks. Good for marketing sections and dashboards. |
| **HyperUI** | Tailwind (HTML/React) | Copy-paste | Free Tailwind marketing components. No install. |
| **Tailwind UI** | React + Vue | Paid ($299 once) | Adam Wathan's official library. Highest quality marketing and app components. Worth it for agencies. |
| **Park UI** | React + Tailwind + Panda CSS | `npm i @park-ui/react` | Built on Ark UI. Has a theme editor. Supports Solid.js. |

**Agent instruction:** shadcn/ui is the default for new projects unless the brief specifies a different stack.

---

### 1C. Animated Component Libraries (Copy-Paste)
*Use when: the design system calls for motion-first sections, landing page hero components, or premium interactive elements. These ship with animations built in.*

| Library | Stack | URL | Best For |
|---|---|---|---|
| **Aceternity UI** | React + Tailwind + Framer Motion | aceternity.com | High-impact hero sections, bento grids, spotlight cards. Premium landing page feel. |
| **Magic UI** | React + Tailwind + Framer Motion | magicui.design | SaaS/startup landing pages. Animated backgrounds, marquees, shimmer effects. |
| **Motion Primitives** | React + Motion | motion-primitives.com | Smooth micro-interactions. Text effects, transitions, cursor animations. |
| **Eldora UI** | React + Tailwind + Framer Motion | eldoraui.site | Clean animated primitives. Mid-ground between Magic and Aceternity. |
| **Hover.dev** | React + Tailwind | hover.dev | Interactive card components, animated hero sections. Copy-paste ready. |
| **Cult UI** | React + shadcn + Framer Motion | cult-ui.com | shadcn extension with animated extras. Spicy additions to an existing shadcn project. |
| **UI Layout** | React + GSAP + Framer Motion | uilayout.framer.website | Scroll-driven, story-based layout components. |
| **Syntax UI** | React + Tailwind + Framer Motion | syntaxui.com | Marketing and SaaS sections. Polished animated primitives. |

**Agent instruction:** Aceternity and Magic UI are best for bespoke/premium brand sites. Do not use them for corporate or enterprise projects — they read as "startup template" in that context.

---

### 1D. Full Design System Libraries
*Use when: the brief calls for a comprehensive, opinionated visual system — enterprise, SaaS dashboards, data-heavy apps.*

| Library | Stack | Install | Best For |
|---|---|---|---|
| **Material UI (MUI)** | React | `npm i @mui/material` | Enterprise apps, dashboards, Google Material Design. Massive component set. |
| **Ant Design** | React | `npm i antd` | Data-heavy enterprise UIs, admin panels, complex forms and tables. |
| **Chakra UI** | React | `npm i @chakra-ui/react` | Accessibility-first. Good default aesthetics. Customisable theme. |
| **HeroUI** | React + Tailwind | `npm i @heroui/react` | Premium-feeling default components. Dark mode out of the box. |
| **PrimeReact** | React | `npm i primereact` | Largest component set available. Data grids, charts, specialised business components. |
| **Mantine** | React | `npm i @mantine/core` | 120+ components. Excellent form handling. Strong TypeScript support. |

**Agent instruction:** These are not bespoke — they impose visual opinions. Only use for projects where speed and comprehensiveness outweigh distinctiveness.

---

## 2. Animation Libraries `[DD+FB]`

The Design Director selects the animation stack in the design system. The Frontend Builder installs and uses only the chosen stack.

---

### 2A. Scroll + Timeline Animation (Cinematic Sites)

| Library | Install | When To Use |
|---|---|---|
| **GSAP + ScrollTrigger** | CDN or `npm i gsap` | Complex scroll choreography, horizontal scrolling, frame-to-scroll, pinned sections, timeline sequencing. The standard for premium/cinematic sites. |
| **Lenis** | `npm i lenis` | Smooth scroll — always pair with GSAP ScrollTrigger. Mandatory for horizontal galleries and parallax. |
| **GSAP SplitText** | Included with GSAP | Word/character split animations. Hero text reveals, staggered heading entrances. |
| **GSAP Draggable** | Included with GSAP | Drag-to-scroll carousels, interactive elements. |

**Note on GSAP licensing:** GSAP is owned by Webflow. The license prohibits use in tools that compete with Webflow. For client work and personal brand sites, this is not a concern. For SaaS products — evaluate whether your product competes with Webflow before using GSAP commercially.

---

### 2B. React-Native Animation (Component-Level)

| Library | Install | When To Use |
|---|---|---|
| **Motion (Framer Motion)** | `npm i motion` | React component animations, route transitions, gesture-based interactions, layout animations. MIT licensed. Growing faster than GSAP in React ecosystems. |
| **React Spring** | `npm i @react-spring/web` | Physics-based animations. Spring curves for natural, bouncy feel. Good for interactive UI elements. |
| **Auto Animate** | `npm i @formkit/auto-animate` | Zero-config automatic animations on list adds/removes. Good for dynamic content. |

---

### 2C. 3D + WebGL

| Library | Install | When To Use |
|---|---|---|
| **Three.js** | `npm i three` | WebGL 3D scenes, shader displacement, particle systems, 3D product viewers. |
| **React Three Fiber** | `npm i @react-three/fiber` | Three.js in React. Declarative 3D. Pairs with `@react-three/drei` for helpers. |
| **OGL** | `npm i ogl` | Lighter alternative to Three.js for simpler WebGL effects. |
| **PixiJS** | `npm i pixi.js` | 2D WebGL renderer. Canvas games, interactive illustrations, particle effects. |

---

### 2D. Lightweight / CSS-First Animation

| Library | Install | When To Use |
|---|---|---|
| **Tailwind CSS Motion** | `npm i tailwindcss-motion` | Pure CSS Tailwind animations. 5KB. Zero JS. Good for simple entrance effects. |
| **Anime.js** | `npm i animejs` | Lightweight JS animation engine. CSS, SVG, DOM attributes. Good for icon animations and micro-interactions. |
| **Mo.js** | `npm i mo-js` | Motion graphics, burst effects, playful decorative animations. |
| **AOS (Animate on Scroll)** | `npm i aos` | Quick scroll-triggered CSS class additions. Not as precise as GSAP but very fast to implement. |

---

### 2E. Specialised Animation

| Library | Install | When To Use |
|---|---|---|
| **Rive** | `npm i @rive-app/react-canvas` | Interactive vector animations with state machines. Replaces Lottie for interactive brand animations. |
| **Lottie** | `npm i lottie-react` | After Effects JSON animation playback. Good for loading screens and icon animations. |
| **Remotion** | `npm i remotion` | Programmatic video creation in React. For projects that generate video content. |
| **Theatre.js** | `npm i @theatre/core` | Visual timeline editor for complex web animations. Professional studio tool. |

---

## 3. Design Styles Reference `[DD]`

The Design Director selects one style per project and documents why. Each style has a recommended component approach and animation stack.

---

### 3A. Dark, Cinematic, Editorial
*Best for: athlete/celebrity sites, luxury brands, premium portfolios*

| Style Name | Visual Character | Component Approach | Animation Stack |
|---|---|---|---|
| **Cinematic Dark** | Near-black bg, film-quality photography, massive serif display type, minimal UI chrome | Headless primitives, custom CSS | GSAP + ScrollTrigger + Lenis |
| **Luxury Minimal** | Cream/off-white or jet black, generous whitespace, thin weight type, editorial photography | shadcn base, custom tokens | Motion + GSAP for scroll |
| **Metropolitan** | Sophisticated neutral palette, structured grid, confident typography, architecture-inspired | Radix + custom CSS | GSAP timeline |
| **Dark Mode First** | Deep bg (#0d0d0d – #1a1a1a), glowing accents, high contrast text | shadcn dark variant, custom tokens | GSAP + Lenis |

---

### 3B. Bold, Expressive, High-Energy
*Best for: sports brands, entertainment, streetwear, gen-Z products*

| Style Name | Visual Character | Component Approach | Animation Stack |
|---|---|---|---|
| **Neobrutalist** | Raw borders, flat or no shadows, primary colors, exposed structure, deliberate roughness | Headless/custom only — no component library | GSAP — hard cuts, no easing |
| **Kinetic** | Typography in motion, scroll-driven text, oversized display, active negative space | Custom CSS + GSAP SplitText | GSAP ScrollTrigger heavy |
| **Retro-Futuristic** | CRT effects, scanlines, neon accents on dark bg, space-age grid | Custom CSS only | GSAP + canvas effects |
| **Neo-Geo** | Hard geometric shapes, bold color blocks, asymmetric grids | Headless + custom shapes | Motion (snappy, no spring) |

---

### 3C. Clean, Modern, Accessible
*Best for: SaaS, fintech, health, productivity tools*

| Style Name | Visual Character | Component Approach | Animation Stack |
|---|---|---|---|
| **Swiss/International** | Grid-precise, neutral palette, Helvetica-era typography, no decoration | Radix + Headless UI | Motion (subtle) |
| **Scandinavian** | Muted naturals, extreme whitespace, functional minimalism | shadcn light theme, custom tokens | Auto Animate + Motion |
| **Japandi** | Wabi-sabi minimalism, organic textures, earth tones, stillness | Custom CSS — no library | Motion (very slow, deliberate) |
| **Corporate Professional** | Navy/grey/white, trustworthy, structured, clear hierarchy | MUI or shadcn standard | Tailwind CSS Motion |

---

### 3D. Creative, Playful, Experimental
*Best for: creative agencies, portfolios, art/music, youth brands*

| Style Name | Visual Character | Component Approach | Animation Stack |
|---|---|---|---|
| **Editorial** | Magazine-inspired layout, mixed font sizes, image cropping, asymmetry | Headless + custom grid | GSAP horizontal scroll |
| **Organic / Fluid** | Blob shapes, flowing curves, warm earth palette, no sharp corners | Custom CSS SVG shapes | Motion + React Spring |
| **Gradient Modern** | Rich gradients, glassmorphism accents, vibrant color, glow effects | Aceternity / Magic UI | GSAP + canvas |
| **Typography First** | Type is the layout, oversized letterforms, minimal imagery | Custom CSS only | GSAP SplitText |
| **Raw Industrial** | Exposed grid, monospace type, wire-frame aesthetics, industrial palette | Custom only | GSAP — mechanical timing |

---

### 3E. Archival, Heritage, Premium
*Best for: established brands, institutions, premium goods, cultural organisations*

| Style Name | Visual Character | Component Approach | Animation Stack |
|---|---|---|---|
| **Art Deco** | Geometric ornament, gold on black, symmetrical luxury, high contrast | Custom CSS + Radix | GSAP slow reveals |
| **Bauhaus** | Primary colors, geometric shapes, functional beauty, workshop aesthetic | Headless only | Motion precise |
| **Archival** | Sepia tones, newsprint texture, historical reference, serif type | Custom CSS only | AOS or minimal GSAP |
| **Modernist** | Clean rationalism, proportional grids, muted tones, purposeful layout | Radix + custom tokens | Motion subtle |

---

## 4. Font Pairings by Brand Archetype `[DD]`

Organised by the brand archetype identified in the brand brief. The Design Director selects a pairing that matches the archetype, then documents it in design-system.md.

**Rule:** Never use Inter or Roboto as a display/heading font. They are acceptable as body or mono fonts only.

---

### Hero / Warrior
*Athlete, military, performance, competitive*

| Heading | Body | Mono | Character |
|---|---|---|---|
| **Bebas Neue** | Barlow | IBM Plex Mono | Condensed power. Zero decoration. |
| **Oswald** | Source Sans Pro | Space Mono | Gothic strength meets legibility. |
| **Black Han Sans** | Noto Sans | Roboto Mono | Korean-influenced bold geometry. |
| **Syne ExtraBold** | Syne Regular | DM Mono | Variable weight — unified, expressive. |
| **Special Gothic Expanded One** | Inter | IBM Plex Mono | Industrial, brutalist, demanding. |

---

### Creator / Artist
*Musicians, photographers, designers, directors*

| Heading | Body | Mono | Character |
|---|---|---|---|
| **Cormorant Garamond** | Raleway | EB Garamond Italic | Literary elegance. Intellectual authority. |
| **Playfair Display** | Source Sans Pro | Courier Prime | Editorial drama. Sophisticated. |
| **DM Serif Display** | DM Sans | DM Mono | Contemporary serif. Confident calm. |
| **Fraunces** | Inter | Space Mono | Retro-modern. Warm + precise. |
| **Young Serif** | Nunito | IBM Plex Mono | Structured warmth. Creative but grounded. |

---

### Explorer / Adventurer
*Travel, outdoor, sports lifestyle, discovery brands*

| Heading | Body | Mono | Character |
|---|---|---|---|
| **Montserrat Black** | Open Sans | Roboto Mono | Geographic boldness. Map-room authority. |
| **Raleway ExtraBold** | Lato | Courier New | Art Deco travel poster energy. |
| **Space Grotesk** | Space Mono | — | Technical, forward-looking, spacefaring. |
| **Exo 2** | Nunito Sans | Share Tech Mono | Technological explorer. |
| **Michroma** | Rajdhani | Audiowide | Motorsport / aerospace geometry. |

---

### Ruler / Leader
*Executives, institutions, finance, government, luxury*

| Heading | Body | Mono | Character |
|---|---|---|---|
| **Libre Baskerville** | Libre Baskerville Light | Courier Prime | Constitutional authority. Timeless. |
| **Cinzel** | Fauna One | IBM Plex Mono | Classical Roman. Institutions and power. |
| **Spectral** | Source Sans Pro | Space Mono | Legal gravitas. Editorial intelligence. |
| **EB Garamond** | Josefin Sans | Inconsolata | Heritage meets modern structure. |
| **Cormorant** | Mulish | DM Mono | Luxury restraint. Old-money quiet. |

---

### Jester / Entertainer
*Gaming, entertainment, streaming, youth culture*

| Heading | Body | Mono | Character |
|---|---|---|---|
| **Boogaloo** | Nunito | Fira Code | Playful without being childish. |
| **Righteous** | Quicksand | Noto Sans Mono | Fun with confidence. |
| **Fredoka** | Poppins | IBM Plex Mono | Round, approachable, charming. |
| **Syne Bold** + *Syne Italic* | Syne Regular | — | Variable fun — single-family unity. |
| **Paytone One** | Barlow | Space Mono | Bold impact. Game-style energy. |

---

### Sage / Expert
*Technology, research, education, consulting, AI*

| Heading | Body | Mono | Character |
|---|---|---|---|
| **Space Grotesk** | Space Mono | Fira Code | Technical clarity. Precision-made. |
| **IBM Plex Sans** | IBM Plex Serif | IBM Plex Mono | Superfamily harmony. Enterprise intelligence. |
| **Manrope** | Inter | JetBrains Mono | Developer tools. Clean and capable. |
| **Plus Jakarta Sans** | DM Sans | Source Code Pro | Modern consultancy. Confident minimal. |
| **Savate** | Work Sans | Courier Prime | High-impact, retro-modern expert voice. |

---

### Lover / Aesthetic
*Fashion, beauty, lifestyle, wellness, hospitality*

| Heading | Body | Mono | Character |
|---|---|---|---|
| **Playfair Display** | Raleway Light | Cormorant Italic | Romantic elegance. High fashion. |
| **Yeseva One** | Josefin Sans | — | Decorative serif meets geometric sans. |
| **Gilda Display** | Raleway | — | Quiet luxury. Whisper-weight serif. |
| **Lora** | Nunito | — | Warm editorial. Personal and human. |
| **Ancizar Serif** | Ancizar Sans | — | Colombian superfamily. Versatile elegance. |

---

### Outlaw / Rebel
*Streetwear, subculture, independent brands, punk, underground*

| Heading | Body | Mono | Character |
|---|---|---|---|
| **Barlow Condensed Black** | Barlow | Martian Mono | Street-level impact. No decoration. |
| **Permanent Marker** | Karla | Courier Prime | Raw, handmade, countercultural. |
| **Big Shoulders Display** | Barlow | Share Tech Mono | Industrial rebel. Condensed aggression. |
| **Fira Sans ExtraCondensed Black** | Fira Sans | Fira Code | Technical underground. Zine energy. |
| **Parkinsans Bold** | Parkinsans Regular | — | Unusual shapes. Anti-corporate character. |

---

## 5. Color Systems by Brand Archetype `[DD]`

These are starting palettes. The Design Director customises these based on any existing brand assets from the brief. Every palette must be expressed as CSS custom properties.

---

### Dark / Cinematic
```css
:root {
  --color-bg:         #0a0a0a;
  --color-surface:    #141414;
  --color-text:       #f0ede8;
  --color-text-muted: #6b6660;
  --color-accent:     #c5f82a;   /* lime — replace with brand accent */
  --color-accent-dark:#8fb81a;
  --color-border:     rgba(240,237,232,0.07);
}
```

### Light / Editorial
```css
:root {
  --color-bg:         #f5f3f0;
  --color-surface:    #ede9e4;
  --color-text:       #1a1a1a;
  --color-text-muted: #706c67;
  --color-accent:     #d4450c;   /* terracotta — replace with brand accent */
  --color-accent-dark:#a83309;
  --color-border:     rgba(26,26,26,0.08);
}
```

### Luxury / Gold
```css
:root {
  --color-bg:         #0d0c0b;
  --color-surface:    #1a1815;
  --color-text:       #e8d5b0;
  --color-text-muted: #7a6e5a;
  --color-accent:     #c9a84c;   /* gold */
  --color-accent-dark:#a08238;
  --color-border:     rgba(201,168,76,0.12);
}
```

### Tech / Midnight Blue
```css
:root {
  --color-bg:         #060a14;
  --color-surface:    #0d1424;
  --color-text:       #e8edf5;
  --color-text-muted: #5a6a85;
  --color-accent:     #4a9eff;   /* electric blue */
  --color-accent-dark:#2d7be0;
  --color-border:     rgba(74,158,255,0.10);
}
```

### Warm Neutral / Wellness
```css
:root {
  --color-bg:         #faf7f2;
  --color-surface:    #f0ebe3;
  --color-text:       #2c2420;
  --color-text-muted: #8c7b70;
  --color-accent:     #8b6e4e;   /* warm brown */
  --color-accent-dark:#6b5038;
  --color-border:     rgba(44,36,32,0.08);
}
```

### Neobrutalist
```css
:root {
  --color-bg:         #ffffff;
  --color-surface:    #f0f0f0;
  --color-text:       #000000;
  --color-text-muted: #555555;
  --color-accent:     #ff3c00;   /* raw red-orange */
  --color-accent-dark:#cc3000;
  --color-border:     #000000;   /* hard black border — no opacity */
}
```

### Retro-Futuristic / Neon
```css
:root {
  --color-bg:         #03000f;
  --color-surface:    #0a0520;
  --color-text:       #e8f0ff;
  --color-text-muted: #5a5080;
  --color-accent:     #9b5cff;   /* electric violet */
  --color-accent-cold:#00e5ff;   /* cyan secondary */
  --color-accent-dark:#7040cc;
  --color-border:     rgba(155,92,255,0.15);
}
```

---

## 6. CSS Tooling & Architecture `[FB]`

| Tool | Install | When To Use |
|---|---|---|
| **Tailwind CSS v4** | `npm i tailwindcss` | Utility-first. Default for most projects. CSS-first config in v4. |
| **CSS Custom Properties (vanilla)** | None | Always use alongside any framework for the design token system. |
| **Panda CSS** | `npm i @pandacss/dev` | Type-safe design tokens. Alternative to Tailwind for component library projects. |
| **Vanilla Extract** | `npm i @vanilla-extract/css` | Zero-runtime CSS-in-TypeScript. Good for large-scale design systems. |
| **Open Props** | CDN or `npm i open-props` | Excellent pre-built CSS custom property system. Good starting point for token architecture. |

---

## 7. Icon Libraries `[FB]`

| Library | Install | Style |
|---|---|---|
| **Lucide** | `npm i lucide-react` | Clean geometric. Default for shadcn projects. |
| **Phosphor Icons** | `npm i @phosphor-icons/react` | Multiple weights (thin → bold). Best coverage. |
| **Tabler Icons** | `npm i @tabler/icons-react` | Consistent stroke. Excellent for dashboards. |
| **Heroicons** | `npm i @heroicons/react` | Tailwind team's library. Solid/outline variants. |
| **Remix Icons** | CDN | Neutral, versatile. Good for editorial sites. |
| **Font Awesome** | CDN / npm | Widest coverage. Use when specific industry icons are needed. |

---

## 8. Smooth Scroll Libraries `[FB]`

| Library | Install | Notes |
|---|---|---|
| **Lenis** | `npm i lenis` | Default. Must-have for GSAP ScrollTrigger projects. |
| **Locomotive Scroll** | `npm i locomotive-scroll` | Alternative to Lenis. Built-in parallax support. Slightly heavier. |
| **Native CSS scroll-behavior** | None | `scroll-behavior: smooth` — acceptable only for simple sites with no scroll choreography. |

---

## 9. Three.js / WebGL Helpers `[FB]`

| Library | Install | Purpose |
|---|---|---|
| **Three.js** | `npm i three` | Core WebGL/3D |
| **React Three Fiber** | `npm i @react-three/fiber` | Declarative Three.js in React |
| **Drei** | `npm i @react-three/drei` | Three.js helpers: environments, cameras, materials |
| **Postprocessing** | `npm i @react-three/postprocessing` | Bloom, depth of field, chromatic aberration |
| **Shader Park** | `npm i shader-park-core` | GLSL shader generation from JavaScript |
| **OGL** | `npm i ogl` | Minimal WebGL for simpler shader effects |

---

## 10. Agent Selection Matrix

Use this table to cross-reference brand archetype → recommended stack.

| Brand Archetype | Style | Component Lib | Animation Stack | Font Pairing Category |
|---|---|---|---|---|
| Hero / Athlete | Cinematic Dark or Neobrutalist | Headless (Radix) | GSAP + Lenis | Hero/Warrior |
| Creator / Artist | Editorial or Luxury Minimal | shadcn or custom | GSAP horizontal | Creator/Artist |
| Explorer | Metropolitan or Kinetic | shadcn or Radix | GSAP + Motion | Explorer |
| Ruler / Executive | Swiss or Corporate | MUI or shadcn | Motion subtle | Ruler/Leader |
| Jester / Entertainer | Gradient Modern or Retro-Futuristic | Aceternity / Magic UI | GSAP + Lenis | Jester |
| Sage / Tech | Tech Forward or Typography First | shadcn + Radix | Motion | Sage/Expert |
| Lover / Lifestyle | Japandi or Organic/Fluid | Custom CSS | Motion slow | Lover/Aesthetic |
| Outlaw / Rebel | Neobrutalist or Raw Industrial | Headless only | GSAP hard cuts | Outlaw |

---

## 11. Quick Stack Presets

Copy these into design-system.md as the `Tech Stack` block for common project types.

### Bespoke Athlete / Celebrity Site
```
Framework:  Vanilla HTML + CSS + JS (no framework overhead)
CSS:        CSS Custom Properties (no Tailwind — full design token control)
Components: Custom built — no library
Animation:  GSAP 3 + ScrollTrigger + SplitText + Lenis
3D:         Three.js (if video/shader section required)
Icons:      Phosphor Icons (CDN)
Fonts:      Google Fonts (preloaded)
```

### Premium SaaS Landing Page
```
Framework:  Next.js 15 + React 19
CSS:        Tailwind CSS v4
Components: shadcn/ui base + Aceternity UI for hero/feature sections
Animation:  Motion (Framer Motion) + Lenis
Icons:      Lucide React
Fonts:      Google Fonts variable fonts
```

### Creative Portfolio / Agency
```
Framework:  Astro 5 (static) or Next.js
CSS:        Tailwind CSS v4 + CSS Custom Properties for tokens
Components: Radix UI primitives + custom components
Animation:  GSAP + ScrollTrigger + Lenis + Motion for React components
3D:         React Three Fiber if needed
Icons:      Phosphor Icons
```

### Enterprise / Dashboard
```
Framework:  Next.js 15
CSS:        Tailwind CSS v4
Components: shadcn/ui + MUI X for data grids
Animation:  Motion (subtle only)
Icons:      Lucide React
Fonts:      IBM Plex Sans (superfamily)
```
