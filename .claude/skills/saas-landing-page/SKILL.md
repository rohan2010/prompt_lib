---
name: saas-landing-page
description: Build a high-converting SaaS or startup landing page with a product-forward hero, social proof bar, feature showcase using real screenshots, pricing table with billing toggle, testimonials, FAQ, and a final CTA. Eliminates generic AI-slop patterns — no icon grids, no blue gradient + white card layouts, no stock photo teams. Activates on requests for SaaS sites, startup landing pages, product pages, or any software product that needs a conversion-focused marketing site.
version: 1.0.0
trigger_keywords:
  - saas
  - startup landing page
  - product landing page
  - software landing page
  - app landing page
  - pricing page
  - feature page
  - signup page
  - waitlist page
  - marketing site
---

# SaaS / Startup Landing Page

Build a sharp, conversion-focused landing page that leads with the product — not a description of it. Every section answers one question a visitor has. The design is clean and technical without being cold. The product is always visible.

---

## Asset Request (Ask the User First)

Before writing a single line of code, ask the user for the following. Frame it as a quick checklist — not a form:

```
Before I build this, I need a few things from you. Drop them in or
describe what you have and I'll work around anything missing:

REQUIRED
□ Product name + one-sentence value proposition
  (e.g. "Orbit — open infrastructure for commerce operations")
□ Primary CTA text + destination
  (e.g. "Start free trial" → /signup, or "Join waitlist" → email form)
□ Brand accent color (or I'll choose one that fits the product category)

STRONGLY RECOMMENDED
□ Product screenshots or screen recordings
  — the hero needs to show the actual product, not just describe it
  — 3–5 screenshots for the feature sections (one per major feature)
□ Logo SVG (or wordmark)
□ Customer / user count or key metric
  (e.g. "10,000+ teams", "$2M saved", "99.97% uptime")
□ 2–3 customer testimonials — name, title, company, photo (optional)
□ Pricing structure — tiers, prices, what's included per tier
□ 3–5 key features (name + 1-sentence description each)

OPTIONAL BUT IMPACTFUL
□ Customer company logos (SVG preferred) for the social proof bar
□ A short product demo video (used in hero or feature section)
□ FAQ items (5–8 questions)
□ "How it works" steps (3–4 steps, numbered)
□ Integration logos (tools your product connects to)
□ Founding team bios (name, title, photo)

Missing assets? Tell me what you have and I'll generate placeholder
structures and note exactly where each asset slots in.
```

---

## Site Architecture

The complete page structure, in scroll order:

```
Fixed Navigation (transparent → frosted glass on scroll)
↓
Hero Section (headline + subheadline + CTA + product screenshot/video)
↓
Social Proof Bar (customer logos + key metric)
↓
Problem / Narrative Section (the pain, written as a story)
↓
How It Works (numbered steps, visual, not bullet points)
↓
Feature Showcase (3–5 features, each with real screenshot)
↓
Metrics / Numbers Section (3–4 big numbers with context)
↓
Testimonials (2–3 quotes, full attribution, varied card sizes)
↓
Integrations Strip (logos of tools the product connects to)
↓
Pricing Section (2–3 tiers, monthly/annual toggle)
↓
FAQ (5–8 questions, accordion)
↓
Final CTA Section (single action, high contrast)
↓
Footer (nav + social + legal)
```

---

## Premium Checklist (Non-Negotiable)

1. **Hero shows the product** — the hero must contain a real screenshot, UI preview, or demo video. A headline alone is not a hero. The visitor must see what they are signing up for before they scroll.
2. **Social proof bar is always above the fold on scroll** — logos of recognisable customers (even 3–4 small ones) immediately below the hero fold. If no logos are available, use a single large metric instead.
3. **Features use screenshots, not icons** — each major feature is shown with an actual product screenshot, not a 48px icon. The screenshot is the primary element; the text is the caption.
4. **Pricing is always present** — if exact pricing cannot be shared, use a "Contact us for pricing" tier or a "Request a demo" CTA. Hiding pricing is a conversion killer. Never omit the section.
5. **Testimonials have full attribution** — name, title, company name. Anonymous testimonials are worthless. If no testimonials exist yet, ask the user for them explicitly rather than fabricating.
6. **FAQ section is real** — questions must reflect actual objections a visitor has (pricing, security, integrations, cancellation). Never populate with generic puffery.
7. **Billing toggle on pricing** — monthly / annual toggle that shows annual savings (e.g. "Save 20%"). Toggle state updates prices without a page reload.
8. **Lenis smooth scroll** — mandatory. Sets the baseline motion quality.
9. **GSAP ScrollTrigger for all section entrances** — no CSS animation for scroll effects.
10. **CountUp.js for metrics** — numbers in the metrics section animate from 0 to their final value on scroll-enter.
11. **prefers-reduced-motion fallback** — disable all entrance animations, CountUp, and parallax. Show content statically. Non-optional.
12. **Mobile-first layout** — every section must work at 375px. No horizontal overflow. Touch targets minimum 44px.

---

## Design Token System

```css
:root {
  /* Colors — replace with brand values */
  --bg:              #0a0a0f;       /* near-black — use for dark mode; swap to #ffffff for light */
  --bg-surface:      #111118;       /* card and section surface */
  --bg-raised:       #1a1a24;       /* elevated cards, dropdowns */
  --accent:          #6366f1;       /* brand accent — REPLACE with brand color */
  --accent-dark:     #4f52d0;       /* hover / active state for accent */
  --accent-light:    rgba(99,102,241,0.12); /* tinted bg for accent elements */
  --text:            #f4f4f6;       /* primary text */
  --text-muted:      #71717a;       /* secondary text, captions, labels */
  --text-dim:        #3f3f46;       /* placeholder, disabled */
  --text-on-accent:  #ffffff;       /* text placed on accent background */
  --border:          rgba(244,244,246,0.08); /* subtle dividers */
  --border-active:   rgba(99,102,241,0.3);   /* focused / highlighted borders */

  /* RGB channel tokens for rgba() composition */
  --accent-rgb:      99,102,241;
  --bg-rgb:          10,10,15;

  /* Typography — REPLACE with brand fonts */
  --font-heading: 'Syne', 'Space Grotesk', sans-serif;   /* hero, section titles */
  --font-body:    'DM Sans', 'Inter', sans-serif;         /* body, labels, nav */
  --font-mono:    'JetBrains Mono', monospace;            /* code, data labels */

  /* Spacing — 8pt scale */
  --space-1:  8px;
  --space-2:  16px;
  --space-3:  24px;
  --space-4:  32px;
  --space-6:  48px;
  --space-8:  64px;
  --space-12: 96px;
  --space-16: 128px;

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-sm:    0 1px 3px rgba(0,0,0,0.4);
  --shadow-md:    0 4px 16px rgba(0,0,0,0.5);
  --shadow-glow:  0 0 32px rgba(var(--accent-rgb), 0.15);

  /* Motion */
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-micro:  150ms;
  --dur-enter:  500ms;
  --dur-slow:   900ms;

  /* Layout */
  --grid-max:   1200px;
  --grid-pad:   clamp(1.25rem, 5vw, 3rem);
  --nav-h:      68px;

  /* Type scale */
  --text-display:  clamp(3rem, 7vw, 6.5rem);
  --text-section:  clamp(2rem, 4vw, 3.5rem);
  --text-subhead:  clamp(1.1rem, 1.8vw, 1.4rem);
  --text-body:     clamp(0.95rem, 1.1vw, 1.05rem);
  --text-sm:       0.875rem;
  --text-label:    0.72rem;
}
```

---

## Component Specifications

### 1. Fixed Navigation

**Purpose:** Wayfinding + primary CTA always visible.

**Structure:**
```html
<nav class="nav" id="site-nav">
  <div class="nav__inner wrap">
    <a class="nav__logo" href="/">
      <img src="[LOGO SVG]" alt="[Product Name]" height="28">
    </a>
    <ul class="nav__links" role="list">
      <li><a class="nav__link" href="#features">Features</a></li>
      <li><a class="nav__link" href="#pricing">Pricing</a></li>
      <li><a class="nav__link" href="#faq">FAQ</a></li>
    </ul>
    <div class="nav__actions">
      <a class="nav__signin" href="/login">Sign in</a>
      <a class="btn btn--primary nav__cta" href="/signup">[PRIMARY CTA]</a>
    </div>
    <button class="nav__toggle" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile menu -->
<div class="nav__mob" id="nav-mob" aria-hidden="true">
  <button class="nav__mob-close" aria-label="Close menu">✕</button>
  <ul class="nav__mob-links" role="list">
    <li><a href="#features">Features</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#faq">FAQ</a></li>
  </ul>
  <a class="btn btn--primary" href="/signup">[PRIMARY CTA]</a>
</div>
```

**Behavior:**
- Default: transparent background
- After 60px scroll: `background: rgba(var(--bg-rgb), 0.88)`, `backdrop-filter: blur(16px)`, `border-bottom: 1px solid var(--border)`
- Transition: 300ms `var(--ease-out)`

---

### 2. Hero Section

**Purpose:** Immediately communicate the value proposition and show the product. No visitor should need to scroll to understand what the product does.

**Structure:**
```html
<section class="hero" id="hero">
  <div class="hero__inner wrap">
    <!-- Left: copy -->
    <div class="hero__copy">
      <div class="hero__badge">
        <span class="badge-dot"></span>
        [ANNOUNCEMENT OR CATEGORY — e.g. "Now in public beta"]
      </div>
      <h1 class="hero__h1">[HEADLINE — the transformation, not the feature list]</h1>
      <p class="hero__sub">[SUBHEADLINE — one sentence on how it works and for whom]</p>
      <div class="hero__actions">
        <a class="btn btn--primary btn--lg" href="/signup">[PRIMARY CTA]</a>
        <a class="btn btn--ghost" href="#demo">
          <svg><!-- play icon --></svg>
          Watch demo
        </a>
      </div>
      <p class="hero__footnote">
        [Trust signal — e.g. "No credit card required · Free 14-day trial"]
      </p>
    </div>

    <!-- Right: product screenshot -->
    <div class="hero__visual">
      <div class="hero__screenshot-wrap">
        <img
          class="hero__screenshot"
          src="[PRODUCT SCREENSHOT]"
          alt="[Product Name] dashboard"
          width="1200" height="750"
          loading="eager"
        >
        <!-- Optional: floating stat cards on top of screenshot -->
        <div class="hero__stat hero__stat--1">
          <span class="stat-value">[NUMBER]</span>
          <span class="stat-label">[LABEL]</span>
        </div>
        <div class="hero__stat hero__stat--2">
          <span class="stat-value">[NUMBER]</span>
          <span class="stat-label">[LABEL]</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Background grid texture -->
  <div class="hero__grid" aria-hidden="true"></div>
  <!-- Radial glow behind screenshot -->
  <div class="hero__glow" aria-hidden="true"></div>
</section>
```

**Typography:**
- `.hero__h1`: `var(--text-display)`, `var(--font-heading)`, `font-weight: 800`, `line-height: 1.0`
- `.hero__sub`: `var(--text-subhead)`, `var(--font-body)`, `color: var(--text-muted)`, `max-width: 48ch`
- `.hero__badge`: `var(--text-label)`, `var(--font-mono)`, uppercase, `letter-spacing: 0.1em`, accent-tinted pill

**Screenshot frame:**
```css
.hero__screenshot-wrap {
  position: relative;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: var(--shadow-md), var(--shadow-glow);
}
.hero__screenshot {
  display: block;
  width: 100%;
  height: auto;
}
```

**GSAP entrance** (fires on page load, not scroll):
```js
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.from(".hero__badge",    { y: 20, opacity: 0, duration: 0.6 })
  .from(".hero__h1",       { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
  .from(".hero__sub",      { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
  .from(".hero__actions",  { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
  .from(".hero__footnote", { y: 10, opacity: 0, duration: 0.4 }, "-=0.3")
  .from(".hero__screenshot-wrap", {
    y: 40, opacity: 0, scale: 0.97, duration: 1.0
  }, "-=0.7")
  .from(".hero__stat", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.5");
```

---

### 3. Social Proof Bar

**Purpose:** Immediately borrow credibility. The single most high-leverage section on the page.

**Structure:**
```html
<section class="proof-bar">
  <div class="wrap">
    <p class="proof-bar__label">Trusted by teams at</p>
    <div class="proof-bar__logos">
      <img src="[LOGO 1]" alt="[Company 1]" height="24" class="proof-logo">
      <img src="[LOGO 2]" alt="[Company 2]" height="24" class="proof-logo">
      <!-- 4–7 logos. More than 7 gets cluttered. -->
    </div>
  </div>
</section>
```

**CSS:**
```css
.proof-bar {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: var(--space-4) 0;
  background: var(--bg-surface);
}
.proof-bar__label {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  text-align: center;
  margin-bottom: var(--space-3);
}
.proof-bar__logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}
.proof-logo {
  filter: grayscale(1) brightness(0.5);
  transition: filter var(--dur-micro) var(--ease-out);
}
.proof-logo:hover { filter: grayscale(0) brightness(1); }
```

---

### 4. Problem / Narrative Section

**Purpose:** Makes the visitor feel understood before pitching the solution.

**Structure:**
```html
<section class="problem-section" id="problem">
  <div class="wrap">
    <div class="problem__inner">
      <div class="problem__copy">
        <span class="section-label">The problem</span>
        <h2 class="problem__h2">
          [RELATABLE PAIN STATEMENT — e.g. "Your tools don't talk to each other. Your team pays the price."]
        </h2>
        <p class="problem__body">
          [2–3 sentence expansion of the pain. Write from the customer's perspective, not the product's.
          End with a transition toward the solution.]
        </p>
      </div>
      <div class="problem__visual">
        <!-- Option A: a "chaos" diagram showing disconnected tools -->
        <!-- Option B: a short GIF of the painful workflow -->
        <!-- Option C: a styled quote from a customer about the problem -->
        <blockquote class="problem__quote">
          <p>"[REAL CUSTOMER PAIN QUOTE]"</p>
          <cite>
            <strong>[Name]</strong>, [Title] at [Company]
          </cite>
        </blockquote>
      </div>
    </div>
  </div>
</section>
```

**GSAP entrance:** Left column slides in from `x: -50, opacity: 0`, right column from `x: 50, opacity: 0`, staggered 0.15s.

---

### 5. How It Works

**Purpose:** Removes the "but how?" objection. Short, numbered, visual.

**Structure:**
```html
<section class="how-section" id="how-it-works">
  <div class="wrap">
    <div class="how__header">
      <span class="section-label">How it works</span>
      <h2 class="how__h2">Up and running in [timeframe]</h2>
    </div>
    <div class="how__steps">
      <div class="how__step">
        <div class="step__number">01</div>
        <div class="step__content">
          <h3 class="step__title">[STEP TITLE]</h3>
          <p class="step__desc">[1–2 sentences. What the user does, not what the software does.]</p>
        </div>
        <div class="step__visual">
          <img src="[STEP SCREENSHOT]" alt="[Step description]" loading="lazy">
        </div>
      </div>
      <!-- repeat for 3–4 steps -->
    </div>
  </div>
</section>
```

**Layout:** Alternating — step 1: text left, visual right. Step 2: visual left, text right. Step 3: text left, visual right.

**GSAP entrance:** Each step fades up `y: 40, opacity: 0` as it enters viewport, staggered 0.1s between number → title → description → visual.

---

### 6. Feature Showcase

**Purpose:** Shows what the product does with real evidence — screenshots, not promises.

**Structure:**
```html
<section class="features-section" id="features">
  <div class="wrap">
    <div class="features__header">
      <span class="section-label">Features</span>
      <h2 class="features__h2">[FEATURES HEADLINE — e.g. "Everything you need. Nothing you don't."]</h2>
    </div>

    <!-- Feature tabs nav -->
    <div class="features__tabs" role="tablist">
      <button class="feature-tab active" role="tab" data-feature="0">[Feature 1 Name]</button>
      <button class="feature-tab" role="tab" data-feature="1">[Feature 2 Name]</button>
      <button class="feature-tab" role="tab" data-feature="2">[Feature 3 Name]</button>
      <!-- 3–5 tabs -->
    </div>

    <!-- Feature panels -->
    <div class="features__panels">
      <div class="feature-panel active" data-panel="0">
        <div class="feature-panel__copy">
          <h3 class="feature-panel__title">[Feature 1 Name]</h3>
          <p class="feature-panel__desc">[2–3 sentences on this feature. Lead with the outcome, not the mechanism.]</p>
          <ul class="feature-panel__bullets">
            <li>[Specific capability 1]</li>
            <li>[Specific capability 2]</li>
            <li>[Specific capability 3]</li>
          </ul>
        </div>
        <div class="feature-panel__visual">
          <img
            src="[FEATURE 1 SCREENSHOT]"
            alt="[Feature 1] in [Product Name]"
            loading="lazy"
            width="800" height="500"
          >
        </div>
      </div>
      <!-- repeat per feature tab -->
    </div>
  </div>
</section>
```

**Tab interaction (vanilla JS):**
```js
const tabs = document.querySelectorAll(".feature-tab");
const panels = document.querySelectorAll(".feature-panel");

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
    panels.forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    panels[i].classList.add("active");
    gsap.from(panels[i].querySelector(".feature-panel__visual img"), {
      y: 12, opacity: 0, duration: 0.4, ease: "power2.out"
    });
  });
});
```

---

### 7. Metrics / Numbers Section

**Purpose:** Social proof through scale. Forces specificity — real numbers only.

**Structure:**
```html
<section class="metrics-section">
  <div class="wrap">
    <div class="metrics__grid">
      <div class="metric-item">
        <span class="metric-value" data-target="[NUMBER]" data-suffix="[+/%/x]">0</span>
        <span class="metric-label">[WHAT THIS NUMBER MEANS IN PLAIN ENGLISH]</span>
      </div>
      <!-- 3–4 metrics max. More than 4 dilutes impact. -->
    </div>
  </div>
</section>
```

**CountUp on scroll:**
```js
import CountUp from "countup.js"; // or via CDN

const metricItems = document.querySelectorAll(".metric-value");

metricItems.forEach(el => {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const countUp = new CountUp(el, target, { suffix, duration: 2.0, separator: "," });

  ScrollTrigger.create({
    trigger: el,
    start: "top 80%",
    once: true,
    onEnter: () => countUp.start()
  });
});
```

---

### 8. Testimonials

**Purpose:** Let existing customers sell for you. Full attribution mandatory.

**Structure:**
```html
<section class="testimonials-section" id="testimonials">
  <div class="wrap">
    <span class="section-label">What customers say</span>
    <div class="testimonials__grid">
      <!-- Card 1: large, spans 2 columns -->
      <div class="testimonial-card testimonial-card--featured">
        <blockquote>
          <p class="testimonial-quote">"[FULL QUOTE — 2–3 sentences. Specific outcome, not generic praise.]"</p>
        </blockquote>
        <div class="testimonial-author">
          <img src="[AUTHOR PHOTO]" alt="[Author Name]" class="author-photo" loading="lazy">
          <div class="author-info">
            <strong class="author-name">[Name]</strong>
            <span class="author-title">[Title], [Company]</span>
          </div>
        </div>
      </div>
      <!-- Cards 2–3: single column -->
      <div class="testimonial-card">
        <!-- same inner structure -->
      </div>
      <div class="testimonial-card">
        <!-- same inner structure -->
      </div>
    </div>
  </div>
</section>
```

**Grid layout:**
```css
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
.testimonial-card--featured {
  grid-column: span 2;
}
@media (max-width: 768px) {
  .testimonials__grid { grid-template-columns: 1fr; }
  .testimonial-card--featured { grid-column: span 1; }
}
```

---

### 9. Integrations Strip

**Purpose:** Reduces "will it work with what I have?" friction.

**Structure:**
```html
<section class="integrations-section">
  <div class="wrap">
    <p class="integrations__label">Works with the tools you already use</p>
    <div class="integrations__logos">
      <div class="integration-logo" title="[Tool Name]">
        <img src="[TOOL LOGO]" alt="[Tool Name]" height="32" loading="lazy">
      </div>
      <!-- 8–12 integration logos -->
    </div>
    <a class="integrations__link" href="/integrations">View all integrations →</a>
  </div>
</section>
```

---

### 10. Pricing Section

**Purpose:** Removes the pricing objection and drives the conversion decision.

**Structure:**
```html
<section class="pricing-section" id="pricing">
  <div class="wrap">
    <div class="pricing__header">
      <span class="section-label">Pricing</span>
      <h2 class="pricing__h2">Simple, transparent pricing</h2>
      <!-- Billing toggle -->
      <div class="pricing__toggle" role="group" aria-label="Billing period">
        <button class="toggle-btn active" data-period="monthly">Monthly</button>
        <button class="toggle-btn" data-period="annual">
          Annual
          <span class="toggle-badge">Save 20%</span>
        </button>
      </div>
    </div>

    <div class="pricing__grid">
      <!-- Tier 1: Starter -->
      <div class="pricing-card">
        <div class="pricing-card__header">
          <span class="tier-name">Starter</span>
          <div class="tier-price">
            <span class="price-amount" data-monthly="[PRICE]" data-annual="[PRICE]">$[PRICE]</span>
            <span class="price-period">/month</span>
          </div>
          <p class="tier-desc">[Who this tier is for, in one sentence]</p>
        </div>
        <a class="btn btn--outline" href="/signup?plan=starter">[CTA TEXT]</a>
        <ul class="tier-features">
          <li class="feature-item feature-item--included">[Feature]</li>
          <li class="feature-item feature-item--included">[Feature]</li>
          <li class="feature-item feature-item--excluded">[Feature not included]</li>
        </ul>
      </div>

      <!-- Tier 2: Pro — highlighted -->
      <div class="pricing-card pricing-card--featured">
        <div class="pricing-card__badge">Most popular</div>
        <!-- same inner structure, btn--primary -->
      </div>

      <!-- Tier 3: Enterprise -->
      <div class="pricing-card">
        <!-- Enterprise often has "Contact us" instead of a price -->
      </div>
    </div>
  </div>
</section>
```

**Billing toggle JS:**
```js
const toggleBtns = document.querySelectorAll(".toggle-btn");
const prices = document.querySelectorAll(".price-amount");

toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    toggleBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const period = btn.dataset.period;
    prices.forEach(el => {
      gsap.from(el, { y: -8, opacity: 0, duration: 0.25, ease: "power2.out" });
      el.textContent = "$" + el.dataset[period];
    });
  });
});
```

---

### 11. FAQ

**Purpose:** Clears the last objections before the CTA.

**Structure:**
```html
<section class="faq-section" id="faq">
  <div class="wrap">
    <span class="section-label">FAQ</span>
    <h2 class="faq__h2">Questions we actually get asked</h2>
    <div class="faq__list">
      <details class="faq-item">
        <summary class="faq-question">
          [QUESTION]
          <span class="faq-icon" aria-hidden="true">+</span>
        </summary>
        <div class="faq-answer">
          <p>[ANSWER — specific, honest, no fluff]</p>
        </div>
      </details>
      <!-- 5–8 items -->
    </div>
  </div>
</section>
```

**CSS for animated accordion:**
```css
.faq-item { border-bottom: 1px solid var(--border); }
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) 0;
  cursor: pointer;
  list-style: none;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--text-body);
}
.faq-answer {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s var(--ease-out), padding 0.35s var(--ease-out);
}
.faq-item[open] .faq-answer { max-height: 500px; padding-bottom: var(--space-4); }
.faq-item[open] .faq-icon { transform: rotate(45deg); }
.faq-icon { transition: transform var(--dur-micro) var(--ease-out); }
```

---

### 12. Final CTA Section

**Purpose:** One last ask. High contrast. Single action.

**Structure:**
```html
<section class="cta-section">
  <div class="wrap">
    <div class="cta__inner">
      <h2 class="cta__h2">[ACTION-ORIENTED HEADLINE — not "Get started", but "Ship faster starting today"]</h2>
      <p class="cta__sub">[ONE SENTENCE removing the last hesitation]</p>
      <div class="cta__actions">
        <a class="btn btn--primary btn--lg" href="/signup">[PRIMARY CTA]</a>
        <span class="cta__trust">[Trust signal — e.g. "No credit card · Cancel anytime"]</span>
      </div>
    </div>
    <!-- Background: subtle radial glow in accent color -->
    <div class="cta__glow" aria-hidden="true"></div>
  </div>
</section>
```

**GSAP entrance:** Heading splits into words, each word clips in from `inset(0 100% 0 0)` sequentially.

---

### 13. Footer

**Structure:**
```html
<footer class="site-footer">
  <div class="footer__inner wrap">
    <!-- Brand column -->
    <div class="footer__brand">
      <a href="/"><img src="[LOGO]" alt="[Product]" height="24"></a>
      <p class="footer__tagline">[ONE-LINE PRODUCT DESCRIPTION]</p>
      <div class="footer__socials">
        <a href="[TWITTER]" aria-label="Twitter"><!-- SVG icon --></a>
        <a href="[LINKEDIN]" aria-label="LinkedIn"><!-- SVG icon --></a>
        <a href="[GITHUB]" aria-label="GitHub"><!-- SVG icon --></a>
      </div>
    </div>
    <!-- Nav columns -->
    <div class="footer__nav">
      <div class="footer__col">
        <span class="footer__col-label">Product</span>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="/changelog">Changelog</a>
      </div>
      <div class="footer__col">
        <span class="footer__col-label">Company</span>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/careers">Careers</a>
      </div>
      <div class="footer__col">
        <span class="footer__col-label">Legal</span>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>
    </div>
  </div>
  <div class="footer__bottom wrap">
    <span>© [YEAR] [Product Name]. All rights reserved.</span>
  </div>
</footer>
```

---

## Section Animation Choreography

No two consecutive sections share the same animation type.

| Section | Animation Type | Trigger | Notes |
|---|---|---|---|
| Hero copy | Stagger fade-up | Page load | On DOMContentLoaded, no ScrollTrigger |
| Hero visual | Scale + fade | Page load | Slightly delayed, scale from 0.97 |
| Social proof bar | Fade-in | `top 85%` | Simple, not distracting |
| Problem section | Slide left + slide right | `top 75%` | Two-column split enters from opposite sides |
| How it works | Stagger fade-up per step | `top 80%` | Each step triggers independently |
| Features | Tab content: fade + slight y | Tab click | Not scroll-triggered — interaction-triggered |
| Metrics | CountUp from 0 | `top 80%` | Once only |
| Testimonials | Stagger scale-up | `top 75%` | Cards come up at 0.12s stagger |
| Integrations | Stagger opacity | `top 85%` | Logos fade in left-to-right |
| Pricing | Slide up, stagger | `top 75%` | Cards stagger 0.1s apart |
| FAQ | Fade-in as group | `top 85%` | Items not individually staggered |
| Final CTA | Word-split clip-reveal | `top 80%` | Heading characters reveal one by one |

---

## Shared Button System

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  min-height: 44px;
  padding: 10px var(--space-4);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.01em;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--dur-micro) var(--ease-out);
  white-space: nowrap;
}
.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.btn--primary {
  background: var(--accent);
  color: var(--text-on-accent);
  border-color: var(--accent);
}
.btn--primary:hover {
  background: var(--accent-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow);
}
.btn--outline {
  background: transparent;
  color: var(--text);
  border-color: var(--border-active);
}
.btn--outline:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-light);
}
.btn--ghost {
  background: transparent;
  color: var(--text-muted);
  border-color: transparent;
}
.btn--ghost:hover { color: var(--text); }
.btn--lg { min-height: 52px; padding: 14px var(--space-6); font-size: var(--text-body); }
```

---

## Section Label Pattern

Every section uses a consistent label above the heading:

```css
.section-label {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: var(--space-3);
}
```

---

## Mobile Rules

- Every section works at 375px — test this before marking a section complete
- Nav collapses to hamburger at ≤768px
- Hero becomes single-column stacked: copy on top, screenshot below
- Feature tabs become a scrollable horizontal strip
- Pricing cards stack vertically
- Testimonial grid becomes single column
- Touch targets: minimum 44×44px on all interactive elements
- No horizontal overflow on any section

```css
@media (max-width: 768px) {
  .hero__inner        { flex-direction: column; gap: var(--space-8); }
  .hero__visual       { width: 100%; }
  .features__tabs     { overflow-x: auto; white-space: nowrap; padding-bottom: var(--space-2); }
  .pricing__grid      { grid-template-columns: 1fr; }
  .testimonials__grid { grid-template-columns: 1fr; }
  .testimonial-card--featured { grid-column: span 1; }
}
```

---

## File Structure

```
project-root/
  index.html
  css/
    tokens.css       ← all CSS custom properties
    main.css         ← layout, components, sections
  js/
    app.js           ← Lenis + GSAP init + ScrollTrigger orchestration
    nav.js           ← mobile menu + scroll state
    features.js      ← feature tab interaction
    pricing.js       ← billing toggle
    faq.js           ← accordion (or use native <details>)
    metrics.js       ← CountUp on scroll
  images/
    logo.svg
    hero-screenshot.webp
    feature-01.webp … feature-05.webp
    step-01.webp … step-04.webp
    testimonial-01.webp … testimonial-03.webp
    logos/           ← customer logos (SVG preferred)
    integrations/    ← integration logos (SVG preferred)
```

---

## Prohibition List

Claude must **NEVER** do the following on this project:

- Use a 3- or 4-column icon grid as the primary feature showcase — features must be shown with real product screenshots
- Use a blue gradient hero background with white floating cards — this is the canonical AI-slop SaaS pattern
- Center body paragraphs or feature descriptions — left-align always
- Use stock photography anywhere — product screenshots or nothing
- Use anonymous testimonials — every quote needs name, title, and company
- Use fake or placeholder metrics (e.g. "99.9% uptime", "10x faster") — ask for real numbers or leave the section blank with a placeholder note
- Use Inter or Roboto as the display/heading font
- Omit the pricing section — if pricing cannot be shared, use a "Contact for pricing" CTA but the section must exist
- Use identical card heights in the testimonials grid — the featured card must span more columns
- Populate FAQ with questions nobody actually asks ("Is your product good?" "Do you care about customers?")
- Use the same entrance animation on two consecutive sections
- Write `display: none` on elements that need to animate in — use `opacity: 0` or `visibility: hidden`
- Skip `prefers-reduced-motion` fallback on any animation
- Use lorem ipsum anywhere in the final output — ask for real copy or write placeholder copy in the product's voice

---

## CDN Stack

```html
<!-- End of <body>, in this order -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/countup.js@2/dist/countUp.umd.js"></script>
<script src="js/nav.js"></script>
<script src="js/features.js"></script>
<script src="js/pricing.js"></script>
<script src="js/metrics.js"></script>
<script src="js/app.js"></script>
```

---

## Troubleshooting

- **Hero screenshot looks too large on mobile**: Set `max-width: 100%` on `.hero__visual` and ensure `overflow-x: hidden` on the hero container
- **Feature tab content jumps on switch**: Set an explicit `min-height` on `.features__panels` equal to the tallest panel to prevent layout shift on tab change
- **Billing toggle price doesn't animate**: Ensure `data-monthly` and `data-annual` attributes are on `.price-amount` elements and that the values are plain numbers (no `$` sign in the data attribute)
- **CountUp fires before element is visible**: Check that `once: true` is set on the ScrollTrigger — without it, the count restarts every time the element re-enters the viewport
- **FAQ accordion doesn't animate height**: `max-height` transitions require a specific `max-height` value on the open state — `max-height: auto` does not animate. Use a value large enough to accommodate the longest answer (e.g. `500px`)
- **Testimonial grid breaks on tablet**: Add a `grid-template-columns: 1fr 1fr` breakpoint at ~900px so the 3-column layout transitions cleanly before collapsing to 1 column at mobile
- **Pricing card featured border glows wrong color**: Ensure `--accent-rgb` channel token is defined in tokens.css and the glow uses `rgba(var(--accent-rgb), 0.2)` — not a hardcoded hex
