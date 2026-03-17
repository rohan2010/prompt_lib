# prompt_lib

A personal library of AI-generated frontend experiments, personalized portfolio sites, and reusable Claude Code skills for building premium websites.

---

## What's in here

### Sites & Demos

| File / Folder | Description |
|---|---|
| `index.html` | Keshida Layone — BreatheArt visual artist portfolio (dark editorial style) |
| `pulinp.github.io-main/` | Pulin Prabhu — Product Manager portfolio (Apple-inspired light style) |
| `bayangrom.html` | Bayangrom site |
| `emsworth.html` | Emsworth site |
| `orbit.html` | Orbit site |

### Assets

| Folder | Contents |
|---|---|
| `keshida_asset/` | Artwork images, studio photos, BreatheArt branding for Keshida Layone |
| `videos/` | Source video assets (T-shirt generation, etc.) |
| `frames/` | Extracted video frames for parallax/3D sites |
| `css/` | Shared stylesheets |
| `js/` | Shared scripts |

### Skills

Claude Code skills live in `.claude/skills/`. Each skill is a complete blueprint that tells Claude *exactly* how to build a specific type of site — design tokens, component specs, animation choreography, and a prohibition list.

| Skill | Trigger phrase | What it builds |
|---|---|---|
| `athlete-personal-brand-website` | "build a personal brand site" | Cinematic dark portfolio — loader gate, horizontal gallery, dual-state cards, GSAP scroll |
| `company-frontend-design` | "build a landing page / UI component" | Production-grade marketing pages with company design tokens |
| `video-to-3d-parallax-website` | "3D scroll / parallax / video-to-web" | Depth-layered parallax sites driven by video frames |

---

## How Skills Work

A skill is a `.md` file that encodes taste + spec. When invoked, Claude reads it as a strict brief before writing a single line of code.

### Creating a skill

```bash
mkdir -p .claude/skills/my-skill
touch .claude/skills/my-skill/SKILL.md
```

Structure your skill with these sections:

```
# Skill Name
Trigger description — what user phrases activate this skill.

## Asset Request       ← what to ask the user for first
## Site Architecture   ← full page structure in scroll order
## Premium Checklist   ← non-negotiable features
## Design Token System ← CSS custom properties
## Component Specs     ← HTML + CSS + JS per section
## Prohibition List    ← what Claude must never do
## CDN Stack           ← exact script tags in order
```

### Using a skill

```
/skill-name [describe what you want] [point to assets]
```

Examples from this repo:

```
/athlete-personal-brand-website use files in keshida_asset
```

```
/athlete-personal-brand-website make changes in pulinp.github.io-main,
portfolio for Pulin Prabhu, Product Manager, Apple-inspired design
```

### The personalisation pattern

The same skill (`athlete-personal-brand-website`) produced two completely different sites:

| Output | Person | Design Override |
|---|---|---|
| `index.html` | Keshida Layone, Visual Artist | Dark bg, warm copper accent, Cormorant serif |
| `pulinp.github.io-main/` | Pulin Prabhu, Product Manager | White bg, Apple blue `#0071E3`, Inter rounded |

**Same architecture. Different tokens. Different assets. Entirely different feel.**

This is the core idea: skills define the *structure and quality floor*, assets and overrides define the *personality*.

---

## Tech stack used across sites

| Layer | Tech |
|---|---|
| Smooth scroll | Lenis |
| Scroll animations | GSAP + ScrollTrigger + SplitText |
| Fonts | Google Fonts (Cormorant, Inter, IBM Plex Mono) |
| Build | Zero bundler — plain HTML/CSS/JS |
