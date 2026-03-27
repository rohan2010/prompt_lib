---
name: fashion-apparel
description: Build a premium fashion and apparel e-commerce site for non-US brands entering the US market. Editorial-first, narrative-led, product photography as the primary design language. Inspired by Reformation, SKIMS, Jacquemus, COS, Rouje — restraint as luxury. Built on Next.js + Shopify Storefront API headless stack. Activates on requests for fashion brand sites, apparel e-commerce, clothing stores, or any style-forward retail brand building US presence.
version: 1.0.0
trigger_keywords:
  - fashion website
  - apparel site
  - clothing brand
  - fashion e-commerce
  - apparel store
  - fashion brand
  - clothing store
  - style brand
  - fashion retail
---

# Fashion & Apparel — Premium E-Commerce

Build a site where the brand narrative comes before the product catalog. Every section should feel like a fashion editorial — not an inventory system. The design is invisible; the clothes are everything.

**Target brand profile:** Non-US fashion brands ($1M–20M revenue) entering the US market. Brands like Oh Polly, Urbanic, Pomelo, The Souled Store. They are already successful at home and need a US-credible digital presence that competes with Reformation, SKIMS, and Aritzia.

---

## Tech Stack

**Default: Next.js 15 + Shopify Storefront API (headless)**

```bash
npx create-next-app@latest [brand]-store --typescript --tailwind --app --src-dir
npm install @shopify/storefront-api-client
npm install gsap lenis
```

Shopify handles: product catalog, inventory, variants (size/color), cart, checkout, payments, orders.
Next.js handles: every pixel of the visual design.

**When to switch stacks:**
- Plain HTML only if the site is a brand landing page with no shop (rare)
- Add Contentful or Sanity if the brand has editorial/blog content to maintain
- Add Algolia if the catalog exceeds 500 SKUs and search quality matters

---

## Shopify Setup (Ask the User First)

Before writing any code, ask the user to provide:

```
To connect the Shopify store, I need:

REQUIRED
□ Shopify store domain (e.g. yourbrand.myshopify.com)
□ Storefront API access token
  → Shopify Admin → Settings → Apps → Develop apps
  → Create app → Storefront API scopes:
    ✓ unauthenticated_read_product_listings
    ✓ unauthenticated_read_product_inventory
    ✓ unauthenticated_write_checkouts
    ✓ unauthenticated_read_checkouts
  → Install → copy Storefront API access token

ALSO NEEDED
□ Brand name + one-line positioning
  (e.g. "Pomelo — Bangkok-born fashion for the modern woman")
□ Hero campaign image or video (1920×1080 min, landscape)
□ Brand accent color (or I'll derive it from the photography)
□ Logo SVG or wordmark

STRONGLY RECOMMENDED
□ 12–20 product lifestyle photos (not studio white-bg shots)
□ 3–5 editorial campaign images (lookbook quality)
□ Brand story — founding, ethos, what makes it different (2–3 paragraphs)
□ 2–3 collection names the brand wants to feature
□ Any press coverage or stockist names (builds US credibility)

OPTIONAL
□ Short ambient brand video (15–30 seconds, looping)
□ Founder/creative director name and portrait
□ Instagram handle
□ US-specific messaging (e.g. "Free US shipping over $150")
```

---

## Shopify Integration Layer

Set up these files before building any UI. The builder must not skip this.

```ts
// src/lib/shopify.ts
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopify = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2025-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});
```

```ts
// src/lib/queries.ts — standard queries, copy these exactly

// Fetch products for a collection
export const COLLECTION_QUERY = `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      title
      description
      products(first: $first) {
        nodes {
          id handle title
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 2) { nodes { url altText width height } }
          variants(first: 10) {
            nodes { id title availableForSale selectedOptions { name value } }
          }
        }
      }
    }
  }
`;

// Fetch single product
export const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id title descriptionHtml vendor
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 8) { nodes { url altText width height } }
      variants(first: 30) {
        nodes {
          id title availableForSale price { amount currencyCode }
          selectedOptions { name value }
        }
      }
      options { name values }
    }
  }
`;

// Create cart + get checkout URL
export const CREATE_CART_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;
```

```
// .env.local
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=yourbrand.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token_here
```

---

## Site Architecture

```
Fixed Navigation (transparent → opaque, centered logo)
↓
Hero — Campaign (full-bleed image or video, collection name, single CTA)
↓
Editorial Strip (3–4 atmosphere/lifestyle images, edge-to-edge, no gaps)
↓
Featured Collections (2–3 thematic blocks with editorial copy + shop link)
↓
Product Grid — New Arrivals (6–12 products, hover reveals second image)
↓
Brand Story / Values (founder narrative or ethos, text + image split)
↓
Lookbook Section (editorial campaign images, full-bleed, minimal text)
↓
Press / Stockists Bar (logos or quotes from press — US credibility signal)
↓
Instagram / Social Feed (6–8 lifestyle images, platform handle)
↓
Footer (nav + newsletter signup + legal + US shipping note)
```

---

## Premium Checklist (Non-Negotiable)

1. **Hero is a campaign, not a product listing** — the hero communicates brand feeling through a single strong image or video. No product grid on first scroll. No promotional banners. No "SALE" anywhere in the hero.
2. **Photography is lifestyle, never studio white-bg** — every product shown must be worn in context: a real setting, natural light or considered artificial light, a body in motion or at rest. White background product shots belong only on the product detail page.
3. **Neutral palette, product colors are the palette** — the site background is off-white, near-black, or warm grey. The clothing provides all the color. Never let the UI compete with the garments.
4. **Nav is minimal and centered** — logo centered, links flanking left, cart/account flanking right (or all minimal left-aligned). Never a mega-menu. Never more than 5 top-level nav items.
5. **Two images per product card** — every product card shows a lifestyle front image. On hover, it cross-fades to a second lifestyle image (different angle, same model or a complementary shot). Never a white-bg hover state.
6. **Shopify checkout, never custom** — cart is managed in Next.js state. On "Checkout", redirect to Shopify's hosted checkout URL. Never attempt to build a custom checkout flow.
7. **US market signals are subtle but present** — "Free US shipping over $X", US sizing guide, USD pricing. These signals build trust for a non-US brand without shouting about it.
8. **Brand story is mandatory** — non-US brands need to explain themselves to a US audience. Where are they from? What do they believe about clothes? This section is not optional.
9. **Lenis smooth scroll** — mandatory. The pace of scroll is part of the brand experience.
10. **GSAP ScrollTrigger for all section entrances** — no CSS animation for scroll effects.
11. **prefers-reduced-motion fallback** — disable all parallax, entrance animations, and video autoplay transitions. Show content statically. Non-optional.
12. **Mobile is primary** — fashion is browsed on phones. Every section must be perfect at 375px. Product grid is 2 columns on mobile. Hero is full viewport height.

---

## Design Token System

```css
:root {
  /* Colors — neutral foundation, product photography provides color */
  --bg:              #faf9f7;       /* warm off-white — never pure #ffffff */
  --bg-surface:      #f2f0ed;       /* slightly warmer surface for cards */
  --bg-dark:         #111110;       /* near-black for dark sections */
  --accent:          #1a1a18;       /* near-black as default accent — REPLACE with brand color */
  --accent-warm:     #c8a882;       /* warm tone for hover/detail — REPLACE */
  --text:            #111110;       /* primary text — near-black, not pure black */
  --text-muted:      #7a7870;       /* secondary text, labels, prices */
  --text-light:      #faf9f7;       /* text on dark backgrounds */
  --border:          rgba(17,17,16,0.10);
  --border-strong:   rgba(17,17,16,0.20);

  /* RGB channel tokens */
  --bg-rgb:          250,249,247;
  --accent-rgb:      26,26,24;

  /* Typography — editorial serif display + clean humanist body */
  --font-display: 'Cormorant', 'Cormorant Garamond', Georgia, serif; /* hero, collection titles */
  --font-sans:    'Jost', 'DM Sans', sans-serif;                     /* body, nav, price, labels */
  --font-mono:    'IBM Plex Mono', monospace;                        /* SKUs, size labels, data */

  /* Spacing — 8pt scale */
  --space-1:  8px;
  --space-2:  16px;
  --space-3:  24px;
  --space-4:  32px;
  --space-6:  48px;
  --space-8:  64px;
  --space-12: 96px;
  --space-16: 128px;

  /* Radius — fashion leans minimal */
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-pill: 999px;

  /* Motion — unhurried, considered */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --dur-micro:   200ms;
  --dur-enter:   600ms;
  --dur-slow:    1000ms;

  /* Layout */
  --grid-max:  1440px;
  --grid-pad:  clamp(1.25rem, 5vw, 5rem);
  --nav-h:     64px;

  /* Type scale */
  --text-display:    clamp(3.5rem, 9vw, 9rem);
  --text-section:    clamp(2rem, 5vw, 5.5rem);
  --text-subhead:    clamp(1rem, 1.6vw, 1.3rem);
  --text-body:       clamp(0.875rem, 1vw, 0.95rem);
  --text-sm:         0.8125rem;
  --text-label:      0.6875rem;
  --text-price:      clamp(0.875rem, 1vw, 1rem);
}
```

---

## Component Specifications

### 1. Navigation

**Structure:**
```tsx
// src/components/Nav.tsx
<nav className="nav" id="site-nav">
  <div className="nav__inner">
    {/* Left links */}
    <ul className="nav__links nav__links--left">
      <li><a href="/collections/new">New</a></li>
      <li><a href="/collections/clothing">Clothing</a></li>
      <li><a href="/collections/sale">Sale</a></li>
    </ul>

    {/* Centered logo */}
    <a className="nav__logo" href="/">
      {/* SVG wordmark — keep it small, max 120px wide */}
      [LOGO SVG]
    </a>

    {/* Right actions */}
    <div className="nav__actions">
      <a href="/search" aria-label="Search"><!-- search icon --></a>
      <a href="/account" aria-label="Account"><!-- person icon --></a>
      <button className="nav__cart" aria-label={`Cart (${cartCount})`}>
        <!-- bag icon --> {cartCount > 0 && <span>{cartCount}</span>}
      </button>
    </div>
  </div>
</nav>
```

**Behavior:**
- Default: transparent background, dark text (on light hero) or light text (on dark/video hero)
- After 60px scroll: `background: rgba(var(--bg-rgb), 0.95)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid var(--border)`
- Never a dropdown mega-menu — max 5 top-level links
- Mobile: hamburger, full-screen overlay with large link text

---

### 2. Hero — Campaign

**Purpose:** Brand feeling before product. One image, one message, one action.

```tsx
// src/components/sections/HeroSection.tsx
<section className="hero">
  {/* Background */}
  <div className="hero__bg">
    <video autoPlay muted loop playsInline poster="[STILL IMAGE]">
      <source src="[CAMPAIGN VIDEO].mp4" type="video/mp4" />
    </video>
    {/* Fallback: <Image src="[HERO IMAGE]" fill alt="" priority /> */}
    <div className="hero__overlay" />
  </div>

  {/* Content — minimal */}
  <div className="hero__content">
    <span className="hero__eyebrow">[COLLECTION NAME or SEASON]</span>
    <h1 className="hero__headline">[BRAND TAGLINE or CAMPAIGN NAME]</h1>
    <a className="btn btn--hero" href="/collections/[COLLECTION]">
      Shop the Collection
    </a>
  </div>
</section>
```

**Typography:**
- `.hero__headline`: `var(--text-display)`, `var(--font-display)`, italic, `font-weight: 300`, `letter-spacing: -0.02em`
- `.hero__eyebrow`: `var(--text-label)`, `var(--font-mono)`, uppercase, `letter-spacing: 0.18em`

**CSS:**
```css
.hero {
  position: relative;
  height: 100svh;
  display: flex;
  align-items: flex-end;        /* content sits near bottom — Jacquemus pattern */
  padding-bottom: var(--space-12);
}
.hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.45) 0%,
    transparent 55%
  );
}
.hero__content {
  position: relative; z-index: 1;
  padding-inline: var(--grid-pad);
  color: var(--text-light);
}
.hero__headline {
  font-size: var(--text-display);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-6);
}
```

---

### 3. Editorial Strip

**Purpose:** Immediate atmospheric immersion. 3–4 images bled edge to edge.

```tsx
<div className="editorial-strip">
  {[img1, img2, img3, img4].map((src, i) => (
    <div key={i} className="editorial-strip__item">
      <Image src={src} fill alt="" sizes="25vw" loading="lazy" />
    </div>
  ))}
</div>
```

```css
.editorial-strip {
  display: grid;
  grid-template-columns: 1.3fr 0.9fr 0.9fr 1.3fr;
  height: 65vh;
  gap: 2px;                     /* hairline gap — not zero, not large */
}
.editorial-strip__item {
  position: relative;
  overflow: hidden;
}
.editorial-strip__item img {
  transition: transform var(--dur-slow) var(--ease-gentle);
}
.editorial-strip__item:hover img { transform: scale(1.04); }

@media (max-width: 768px) {
  .editorial-strip { grid-template-columns: 1fr 1fr; height: auto; }
  .editorial-strip__item { aspect-ratio: 3/4; }
}
```

---

### 4. Featured Collections

**Purpose:** Editorial storytelling per collection. Not a product grid — a thematic invitation.

```tsx
<section className="collections-section">
  {collections.map((col, i) => (
    <div
      key={col.handle}
      className={`collection-block ${i % 2 === 0 ? 'collection-block--left' : 'collection-block--right'}`}
    >
      <div className="collection-block__image">
        <Image src={col.image} fill alt={col.title} sizes="50vw" loading="lazy" />
      </div>
      <div className="collection-block__copy">
        <span className="section-label">{col.category}</span>
        <h2 className="collection-block__title">{col.title}</h2>
        <p className="collection-block__desc">{col.editorialCopy}</p>
        <a className="btn btn--text" href={`/collections/${col.handle}`}>
          Explore {col.title} →
        </a>
      </div>
    </div>
  ))}
</section>
```

```css
.collection-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
}
.collection-block--right { direction: rtl; }
.collection-block--right > * { direction: ltr; }
.collection-block__image { position: relative; overflow: hidden; }
.collection-block__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-16) var(--grid-pad);
}
@media (max-width: 768px) {
  .collection-block { grid-template-columns: 1fr; direction: ltr; }
  .collection-block__image { aspect-ratio: 4/5; }
}
```

---

### 5. Product Grid — New Arrivals

**Purpose:** The catalog. Lifestyle photography, hover cross-fade, quick size select.

```tsx
// src/components/ProductGrid.tsx
<section className="product-grid-section">
  <div className="product-grid-header wrap">
    <span className="section-label">New Arrivals</span>
    <h2 className="product-grid__title">Just In</h2>
  </div>
  <div className="product-grid wrap">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>

// src/components/ProductCard.tsx
<article className="product-card">
  <a href={`/products/${product.handle}`} className="product-card__link">
    <div className="product-card__images">
      {/* Image 1: default lifestyle */}
      <Image
        className="product-card__img product-card__img--base"
        src={product.images[0].url}
        alt={product.images[0].altText || product.title}
        fill sizes="(max-width: 768px) 50vw, 25vw"
        loading="lazy"
      />
      {/* Image 2: hover — second lifestyle shot */}
      {product.images[1] && (
        <Image
          className="product-card__img product-card__img--hover"
          src={product.images[1].url}
          alt=""
          fill sizes="(max-width: 768px) 50vw, 25vw"
          loading="lazy"
        />
      )}
    </div>
    <div className="product-card__info">
      <span className="product-card__name">{product.title}</span>
      <span className="product-card__price">
        {formatPrice(product.priceRange.minVariantPrice)}
      </span>
    </div>
  </a>
</article>
```

**CSS — dual-image cross-fade:**
```css
.product-card__images {
  position: relative;
  aspect-ratio: 3/4;             /* portrait — standard for fashion */
  overflow: hidden;
  background: var(--bg-surface);
}
.product-card__img {
  object-fit: cover;
  transition: opacity var(--dur-enter) var(--ease-gentle);
}
.product-card__img--hover { opacity: 0; }
.product-card:hover .product-card__img--hover { opacity: 1; }
.product-card:hover .product-card__img--base  { opacity: 0; }

.product-card__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2);
}
@media (max-width: 1024px) { .product-card__grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .product-card__grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-1); } }

.product-card__name {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  color: var(--text);
  margin-top: var(--space-2);
}
.product-card__price {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
```

**Shopify data fetch:**
```ts
// src/app/page.tsx
const { data } = await shopify.request(COLLECTION_QUERY, {
  variables: { handle: 'new-arrivals', first: 12 }
});
const products = data.collection.products.nodes;
```

---

### 6. Brand Story / Values

**Purpose:** Non-US brands need to introduce themselves to the US market. Origin, ethos, why it matters here.

```tsx
<section className="story-section" id="story">
  <div className="story__inner">
    <div className="story__copy wrap">
      <span className="section-label">Our Story</span>
      <h2 className="story__headline">
        [ORIGIN CITY / COUNTRY]-born.<br />
        <em>Made for everywhere.</em>
      </h2>
      <p className="story__body">
        [PARAGRAPH 1: Where the brand came from and why it was started.]
      </p>
      <p className="story__body">
        [PARAGRAPH 2: What the brand believes about clothes — the ethos.]
      </p>
      <a className="btn btn--outline" href="/about">Read our full story</a>
    </div>
    <div className="story__image">
      <Image
        src="[EDITORIAL BRAND IMAGE — atelier, founder, craft detail]"
        fill alt="[Brand name] story"
        sizes="50vw" loading="lazy"
      />
    </div>
  </div>
</section>
```

```css
.story__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
}
.story__copy {
  display: flex; flex-direction: column; justify-content: center;
  padding: var(--space-16) var(--grid-pad);
}
.story__image { position: relative; overflow: hidden; }
.story__headline {
  font-family: var(--font-display);
  font-size: var(--text-section);
  font-style: italic;
  font-weight: 300;
  line-height: 1.05;
  margin-bottom: var(--space-6);
}
@media (max-width: 768px) {
  .story__inner { grid-template-columns: 1fr; }
  .story__image { aspect-ratio: 4/3; }
}
```

---

### 7. Lookbook Section

**Purpose:** Full-bleed editorial sequence. Shows the collection as a fashion shoot, not a catalog.

```tsx
<section className="lookbook-section">
  <div className="lookbook__header wrap">
    <span className="section-label">[SEASON / COLLECTION NAME]</span>
    <h2 className="lookbook__title">[LOOKBOOK CAMPAIGN NAME]</h2>
  </div>
  <div className="lookbook__grid">
    {/* Alternating full-width and two-column images */}
    <div className="lookbook__item lookbook__item--full">
      <Image src={look1} fill alt="" sizes="100vw" loading="lazy" />
    </div>
    <div className="lookbook__item lookbook__item--half">
      <Image src={look2} fill alt="" sizes="50vw" loading="lazy" />
    </div>
    <div className="lookbook__item lookbook__item--half">
      <Image src={look3} fill alt="" sizes="50vw" loading="lazy" />
    </div>
    {/* Continue alternating pattern */}
  </div>
</section>
```

```css
.lookbook__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
.lookbook__item { position: relative; overflow: hidden; }
.lookbook__item--full { grid-column: span 2; aspect-ratio: 16/9; }
.lookbook__item--half { aspect-ratio: 4/5; }
@media (max-width: 768px) {
  .lookbook__grid { grid-template-columns: 1fr; }
  .lookbook__item--full { grid-column: span 1; }
}
```

**GSAP entrance:** Each lookbook image reveals via `clipPath: "inset(100% 0 0 0)"` → `inset(0% 0 0 0)` as it enters the viewport. 0.6s, staggered 0.1s.

---

### 8. Press / Stockists Bar

**Purpose:** US market credibility for a non-US brand. Even 2–3 recognisable names change perception.

```tsx
<section className="press-bar">
  <div className="wrap">
    <p className="press-bar__label">As seen in</p>
    <div className="press-bar__logos">
      {pressItems.map(item => (
        item.type === 'logo'
          ? <img key={item.name} src={item.src} alt={item.name} height="20" className="press-logo" />
          : <blockquote key={item.name} className="press-quote">
              <p>"{item.quote}"</p>
              <cite>— {item.publication}</cite>
            </blockquote>
      ))}
    </div>
  </div>
</section>
```

```css
.press-bar {
  padding: var(--space-8) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.press-bar__label {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: var(--space-4);
}
.press-bar__logos {
  display: flex; align-items: center; justify-content: center;
  gap: var(--space-12); flex-wrap: wrap;
}
.press-logo { filter: grayscale(1); opacity: 0.5; transition: opacity var(--dur-micro); }
.press-logo:hover { opacity: 1; }
```

---

### 9. Instagram / Social Feed

**Purpose:** Shows the brand lives beyond the site. Real-world proof of lifestyle alignment.

```tsx
<section className="social-section">
  <div className="social__header wrap">
    <p className="social__handle">@[INSTAGRAM_HANDLE]</p>
    <h2 className="social__title">Worn in the wild</h2>
  </div>
  <div className="social__grid">
    {socialImages.map((img, i) => (
      <a key={i} href={img.link} target="_blank" rel="noopener" className="social__item">
        <Image src={img.src} fill alt="" sizes="(max-width: 768px) 50vw, 16vw" loading="lazy" />
      </a>
    ))}
  </div>
</section>
```

```css
.social__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
}
.social__item { position: relative; aspect-ratio: 1; overflow: hidden; }
.social__item img { transition: transform var(--dur-enter) var(--ease-gentle); }
.social__item:hover img { transform: scale(1.05); }
@media (max-width: 768px) { .social__grid { grid-template-columns: repeat(3, 1fr); } }
```

---

### 10. Footer

```tsx
<footer className="site-footer">
  <div className="footer__top wrap">
    <div className="footer__brand">
      <a href="/"><img src="/logo.svg" alt="[Brand]" height="24" /></a>
      <p className="footer__origin">[CITY OF ORIGIN] · Est. [YEAR]</p>
      {/* Newsletter signup */}
      <form className="footer__newsletter">
        <input type="email" placeholder="Your email" required />
        <button type="submit">Join</button>
      </form>
    </div>
    <div className="footer__nav">
      <div className="footer__col">
        <span className="footer__col-label">Shop</span>
        <a href="/collections/new">New Arrivals</a>
        <a href="/collections/clothing">Clothing</a>
        <a href="/collections/sale">Sale</a>
      </div>
      <div className="footer__col">
        <span className="footer__col-label">Info</span>
        <a href="/about">Our Story</a>
        <a href="/sustainability">Sustainability</a>
        <a href="/careers">Careers</a>
      </div>
      <div className="footer__col">
        <span className="footer__col-label">Help</span>
        <a href="/shipping">Shipping to the US</a>
        <a href="/returns">Returns</a>
        <a href="/sizing">Size Guide</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </div>
  <div className="footer__bottom wrap">
    <span>© [YEAR] [Brand]. All rights reserved.</span>
    <div className="footer__legal">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </div>
    <p className="footer__us-note">Free shipping on US orders over $[THRESHOLD]</p>
  </div>
</footer>
```

---

## Section Animation Choreography

| Section | Animation Type | Trigger | Notes |
|---|---|---|---|
| Nav | Fade-in on load | DOMContentLoaded | Simple, no drama |
| Hero copy | Word-split stagger (SplitText) | Page load | eyebrow → headline → CTA, with data-depth parallax |
| Hero bg | Three.js particle field | Continuous rAF | Pause via IntersectionObserver when off-screen |
| Editorial strip | Scale hover only | Hover | No scroll entrance |
| Collections | Slide left + slide right | `top 75%` | Alternating per block |
| Product grid | Stagger fade-up | `top 80%` | Cards at 0.06s stagger |
| Brand story | Clip-path reveal image | `top 65%` | Image wipes in; copy fades |
| Lookbook | Clip-path reveal per image | `top 80%` per item | Sequential reveals |
| Press bar | Fade-in stagger | `top 85%` | Logos left to right |
| Social grid | Scale + fade | `top 85%` | Group entrance |
| Footer | Fade-in | `top 92%` | Gentle, final |

---

## 3D Effects (Mandatory on Every Build)

Three 3D effects must be implemented on every fashion build. All three are gated behind `prefers-reduced-motion`.

### 0. Three.js Hero Particle Field

When no campaign video is available (or while waiting for assets), the hero background is a Three.js particle field — not a CSS gradient. This is the default state for any build without a real video.

**The visual:** Three depth layers of particles create a bokeh-like night atmosphere — fine dust grain in the back, branded champagne/rose/white points in the mid, and large out-of-focus blobs in the foreground. Layers rotate at different speeds. Camera tilts toward the cursor. Exponential fog fades everything into the background color.

**Setup:**
```html
<!-- In <head> -->
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js" defer></script>

<!-- In hero section -->
<canvas id="hero-canvas" class="hero__canvas" aria-hidden="true"></canvas>
```

```css
.hero__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
```

**Three layers (build all three — single layer looks cheap):**
```js
// Dust — background grain, high count, tiny size, lower opacity
buildLayer(2200, spread:140, ySpread:80, zSpread:80, size:0.12, opacity:0.55)

// Mid — main visible particles, full brand colors, medium size
buildLayer(900, spread:90, ySpread:55, zSpread:55, size:0.32, opacity:0.80)

// Bokeh — large out-of-focus blobs, very transparent, in front
buildLayer(130, spread:60, ySpread:40, zSpread:25, size:1.80, opacity:0.18)
```

**Key settings:**
```js
renderer.setClearColor(0x[brand-bg-dark], 1);          // match --color-bg-dark exactly
scene.fog = new THREE.FogExp2(0x[brand-bg-dark], 0.014); // depth fade
material.blending = THREE.AdditiveBlending;              // glow effect
material.depthWrite = false;                             // no depth artifacts
material.sizeAttenuation = true;                         // 3D size perspective

// Layer rotation speeds (different per layer = depth illusion)
dust.rotation.y  =  t * 0.025;
mid.rotation.y   = -t * 0.018;  // counter-rotate for depth
bokeh.rotation.y =  t * 0.008;  // slowest = furthest-feeling
```

**Camera mouse-tracking:**
```js
camX += (mouseX * 4  - camX) * 0.04;  // lag factor 0.04 = unhurried
camY += (-mouseY * 3 - camY) * 0.04;
camera.position.x = camX;
camera.position.y = camY;
camera.lookAt(scene.position);
```

**Always:** wrap in `IntersectionObserver` — stop the rAF loop when hero is off-screen.

**When real campaign video is available:** replace the canvas with a `<video autoplay muted loop playsinline>` element and remove the Three.js init. Keep the comment in the HTML so the swap is documented.

**Brand color palette for particles:**
```js
// Use the brand's accent, gold variant, near-white, deeper tone, and pure white
// The palette should derive from the approved design system tokens
// Example for Oh Polly (champagne rose):
[0xc4967a, 0xe8c4a0, 0xfaf8f5, 0xa87858, 0xf0dcc0, 0xffffff]
```

---

### 1. Hero Content Mouse Parallax

Text layers float at different depths as the cursor moves — the canvas handles camera tilt, this handles the 2D text layer depth on top of it.

**How it works:**
- Assign `data-depth="[0.03–0.10]"` to each hero content element. Higher = moves more = appears closer.
- On `mousemove`, normalise cursor position to `-0.5 → 0.5` relative to the hero bounds.
- Use a `requestAnimationFrame` loop with `lerp(current, target, 0.07)` for smooth lag.
- Move each layer: `x = normX * depth * 80`, `y = normY * depth * 80` via `gsap.set`.
- Use `IntersectionObserver` to start/stop the rAF loop.

**Depth assignments:**
```
eyebrow label:    data-depth="0.04"   (subtle float)
headline:         data-depth="0.08"   (most movement — foreground)
CTA button:       data-depth="0.03"   (barely moves — feels grounded)
```

Note: with a Three.js canvas behind it, do NOT counter-move the background via CSS — the canvas handles its own camera tilt. Remove the background counter-move from the parallax function.

**Hero copy rules (critical — 3D effects amplify bad copy):**
- Headline must be **4–6 words maximum**. Long tagline copy kills the cinematic effect.
- Never use the brand tagline verbatim as the hero headline — it reads like a flyer.
- Declarative, present-tense: "The night starts here." not "Dressed for the moment you've been waiting for."
- Eyebrow: season code or collection name — never "New Collection 2026". Use "SS26", "The Wedding Edit", "New In".

```
✓ "The night starts here."    4 words, direct
✓ "Wear the night."           3 words
✓ "New in. On tonight."       5 words, dual meaning
✗ "Dressed for the moment you've been waiting for."   tagline
✗ "Summer 2026"               lazy, generic
```

---

### 2. Product Card 3D Tilt

Magnetic perspective tilt on each product card — the card rotates toward the cursor like a physical object being picked up.

**CSS setup:**
```css
.product-grid,
.bestsellers__grid {
  perspective: 900px;
}

.product-card {
  will-change: transform;
  transform-style: preserve-3d;
}

.product-card__images {
  transform: translateZ(0);  /* keep images composited */
}
```

**JS:**
```js
card.addEventListener('mousemove', function (e) {
  const rect = card.getBoundingClientRect();
  gsap.to(card, {
    rotateX: -((e.clientY - rect.top)  / rect.height - 0.5) * 10,
    rotateY:  ((e.clientX - rect.left) / rect.width  - 0.5) * 10,
    transformPerspective: 900,
    duration: 0.35,
    ease: 'power2.out',
    overwrite: 'auto',
  });
});

card.addEventListener('mouseleave', function () {
  gsap.to(card, {
    rotateX: 0, rotateY: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)',  // spring-back is non-negotiable
    overwrite: 'auto',
  });
});
```

**Rules:**
- Max 10–12 degrees. More feels broken.
- Elastic spring-back on `mouseleave` is mandatory — makes the card feel physical.
- Whole card tilts as one unit — never tilt image and info separately.
- Disable on `@media (hover: none)` (touch devices).

---

## US Market Signals (Apply Throughout)

Non-US brands entering the US need these trust signals embedded naturally — not as a banner or callout, but woven into the UI:

- **Pricing in USD** — always. Never show local currency as default.
- **Shipping note** — "Free US shipping over $[X]" in footer and cart drawer
- **Returns policy** — "Free US returns" if applicable, linked from footer
- **Size guide** — US sizing (XS/S/M/L/XL and numerical) in product pages. Non-US brands often size differently — this is a critical conversion detail.
- **Duty/import note** — if the brand ships from outside the US, be transparent: "Ships from [Country]. No additional duties on US orders." Hidden surprises destroy trust.
- **Contact in US timezone** — even if support is overseas, list US hours.

---

## File Structure

```
src/
  app/
    page.tsx               ← homepage
    products/[handle]/
      page.tsx             ← product detail page
    collections/[handle]/
      page.tsx             ← collection/PLP page
    layout.tsx             ← nav + footer wrapper
  components/
    Nav.tsx
    Footer.tsx
    sections/
      HeroSection.tsx
      EditorialStrip.tsx
      FeaturedCollections.tsx
      ProductGrid.tsx
      BrandStory.tsx
      LookbookSection.tsx
      PressBar.tsx
      SocialFeed.tsx
    ProductCard.tsx
    CartDrawer.tsx
  lib/
    shopify.ts             ← Shopify client
    queries.ts             ← GraphQL queries
    cart.ts                ← cart state (Zustand or React context)
    format.ts              ← price formatting, size utils
  styles/
    tokens.css             ← all CSS custom properties
    globals.css            ← reset + base styles
```

---

## Prohibition List

Claude must **NEVER** do the following on this project:

- Use white studio-background product photography as the primary image style — lifestyle photography only on all homepage and collection surfaces
- Put a "SALE" or promotional banner in the hero — the hero is a campaign, not a promotion
- Use more than 5 top-level nav items or build a mega-menu
- Use a colorful or branded background that competes with the garment photography — the site palette is neutral
- Use Inter, Roboto, or any generic sans-serif as the display/heading font
- Center body paragraphs or product descriptions — left-align always
- Build a custom checkout flow — always redirect to Shopify's hosted checkout URL
- Show pricing in any currency other than USD as the default
- Skip the brand story section — non-US brands require this to establish US credibility
- Use identical aspect ratios for every product card — the grid should feel considered, not templated
- Use the same entrance animation on two consecutive sections
- Skip US market signals (shipping, sizing, returns) — they are conversion-critical for non-US brands
- Use `display: none` on elements that need to animate — use `opacity: 0` or `visibility: hidden`
- Skip `prefers-reduced-motion` fallback on any animation
- Use lorem ipsum anywhere — ask for real brand copy or write specific placeholder copy in the brand's voice
- Omit a favicon — every build must include `<link rel="icon">` and `<link rel="apple-touch-icon">`. If no brand favicon asset is available, generate an inline SVG favicon using the brand's dark background + accent color with the brand initials in an italic serif. Never ship a page with no favicon.
- Use a CSS gradient as the hero background — when no video is available, use the Three.js particle field. A gradient hero looks like a placeholder; the particle field looks intentional.
- Use a long tagline as the hero headline — hero copy must be 4–6 words, declarative, present tense. The 3D effects amplify bad copy; terse copy makes the effects land.
- Add placeholder/random Unsplash images to production builds — Unsplash is for prototypes only. All image slots must reference real brand photography before launch. Document missing assets clearly with `<!-- ASSET NEEDED: filename.webp — spec -->` comments.

---

## CDN / Package Stack

```bash
# Core
npm install next@15 react@19 react-dom@19
npm install @shopify/storefront-api-client

# Animation
npm install gsap lenis

# 3D hero (when no campaign video is available)
npm install three
# OR load via CDN in plain HTML builds:
# <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js" defer></script>

# State (cart)
npm install zustand

# Image optimization
# Next.js Image component handles this natively

# Fonts — load via next/font
import { Cormorant, Jost } from 'next/font/google';
```

---

## Troubleshooting

- **Shopify products not loading**: Check `.env.local` has both `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`. Ensure Storefront API scopes include `unauthenticated_read_product_listings`.
- **Hero video not autoplaying on mobile**: All four attributes required — `autoPlay muted loop playsInline` (note React camelCase). Missing `playsInline` is the most common mobile failure.
- **Product card hover state doesn't work on touch**: Add a touch handler that toggles the hover state on first tap, navigates on second tap — or disable the hover cross-fade on touch devices with `@media (hover: none)`.
- **Shopify checkout URL returns 404**: The `checkoutUrl` from the cart mutation is a fully-formed URL on `[store].myshopify.com` — use `window.location.href = checkoutUrl` not Next.js router.
- **Images CLS (layout shift)**: Always provide `width` and `height` or `fill` + parent with explicit dimensions on Next.js `<Image>`. Product cards must have explicit `aspect-ratio` set in CSS.
- **USD pricing not showing**: The `amount` field from Shopify Storefront API is a string (e.g. `"89.00"`). Format it: `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(amount))`.
- **Non-US brand sizes confusing US shoppers**: Add a size conversion guide component on every product page. Map local sizing (UK, EU, Asian) to US sizing explicitly — this is the single most common conversion blocker for non-US fashion brands.
