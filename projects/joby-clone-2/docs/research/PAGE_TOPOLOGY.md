# Joby Aviation Page Topology

## Overview
Marketing landing page for Joby Aviation electric air taxi.
Scroll height: ~28,653px. Smooth scroll via Lenis (html.lenis class).

## Color Palette
- `--color-white: #f5f4df` — warm cream, body bg, primary text on dark
- `--color-black: #0e1620` — near-black navy, body text
- `--color-blue: #007ae5` — primary brand blue, hero bottom band, CTA sections
- `--color-dark-blue: #1c3f99` — footer gradient layer
- `--color-orange: #eb6110` — footer wave accent
- `--color-grey: #c7c6b6` — muted text, borders
- `--color-pink: #ffd9c9` — footer wave accent

## Fonts
- Custom: `jobyText`, `jobyDisplay` → substitute: **Plus Jakarta Sans** (Google Font, variable weight 200–800)

## Sections (top to bottom)

| # | ID | Title | Bg | Notes |
|---|----|-------|----|----|
| 1 | hero | "Skip traffic. Time to fly." | Full-screen video/photo | Fixed nav overlay, blue rounded bottom band |
| 2 | experience-highlights | "Nowhere to go but Up" | Blue → cream | Scroll-driven, 3 portrait image cards |
| 3 | app | App section | Cream | Seamless travel app content |
| 4 | technology | "Technology that makes the dream possible" | Dark photo | Aircraft wing close-up, spec bullets right |
| 5 | news | "News from above" | Cream | 3 news article cards horizontal |
| 6 | section-partners | "With partners like this…" | Cream | Tabbed: Car Service/Airlines/Infrastructure/R&D/Technology |
| 7 | story | "The sky was never the limit." | Dark sky photo | Aircraft in flight, 2 buttons |
| 8 | illustration | "Dream of Flight" | Blue illustrated | 3 scroll-driven "Future Vision" panels with Joby aircraft |
| 9 | footer | Footer | Blue gradient | Joby logo, nav links, email signup, decorative wave |

## Fixed Overlays
- **Nav**: Fixed top, transparent on hero, gets dark bg on scroll. Hamburger left, Joby logo center, "Investors ↗" right.

## Key Assets
- Hero video: `https://pub-c3f399360b0b4437b233f8cc0505582a.r2.dev/videos/compressed-home-intro-desktop-r3.mp4`
- Logo webp: `/images/logo-animated.webp`
- Experience imgs: `/images/experience-1.webp`, `experience-2.webp`, `experience-3.webp`
- Technology: `/images/technology-bg.webp`
- News: `/images/news-1.webp`, `news-2.webp`, `news-3.webp`
- Partners center image (Uber/Car Service): `/images/experience-1.webp` (placeholder)

## Interaction Models
- **Nav**: scroll-driven (transparent → dark at ~60px scroll)
- **Hero**: static (video background, text overlay)
- **Experience**: scroll-driven cards (IntersectionObserver reveals)
- **Technology**: static with scroll-reveal
- **Partners**: click-driven tab switcher (Car Service / Airlines / etc.)
- **Illustration**: scroll-driven parallax text panels
- **Footer**: static with email input

## Nav Content
- Left: hamburger menu (≡ icon)
- Center: Joby logo (SVG + wordmark)
- Right: "Investors ↗" link
- Menu items: Discover, Experience, Technology, Company, News, Careers, Investors, Connect
