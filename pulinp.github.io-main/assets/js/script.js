'use strict';

/* ==========================================================
   PULIN PRABHU PORTFOLIO
   Lenis + GSAP + Menu + Gallery + Marquee + Loader
   ========================================================== */

// ── LOADER ────────────────────────────────────────────────
(function initLoader() {
  const loader = document.getElementById('loader');
  const btn    = document.getElementById('loader-enter');
  if (!loader || !btn) return;

  document.body.style.overflow = 'hidden';

  btn.addEventListener('click', function () {
    gsap.to(loader, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      overwrite: true,
      onComplete: function () {
        loader.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    // Animate hero in after loader exits
    gsap.fromTo(
      '.hero-name-first, .hero-name-last',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out', delay: 0.4 }
    );
    gsap.fromTo(
      '.hero-eyebrow, .hero-subtitle, .hero-next-event, .hero-scroll-hint',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.65 }
    );
    gsap.fromTo(
      '.hero-img',
      { scale: 0.94, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );
  });
})();

// ── LENIS SMOOTH SCROLL ───────────────────────────────────
var lenis;
(function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    direction: 'vertical',
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
})();

// ── HEADER SCROLL STATE ───────────────────────────────────
(function initHeader() {
  var header = document.getElementById('site-header');
  if (!header) return;
  ScrollTrigger.create({
    start: 'top+=80 top',
    onEnter:     function () { header.classList.add('scrolled'); },
    onLeaveBack: function () { header.classList.remove('scrolled'); }
  });
})();

// ── MENU OVERLAY ──────────────────────────────────────────
(function initMenu() {
  var overlay  = document.getElementById('menu-overlay');
  var toggle   = document.getElementById('menu-toggle');
  var closeBtn = document.getElementById('menu-close');
  var links    = document.querySelectorAll('.menu-link');
  var meta     = document.querySelector('.menu-meta');
  var photos   = document.querySelectorAll('.menu-photo-item');
  if (!overlay || !toggle) return;

  var isOpen = false;

  // Init hidden state
  gsap.set(links, { opacity: 0, y: 30 });
  gsap.set(photos, { clipPath: 'inset(100% 0 0 0)' });
  if (meta) gsap.set(meta, { opacity: 0, y: 20 });

  function openMenu() {
    isOpen = true;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(overlay,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power4.inOut', overwrite: true }
    );
    gsap.fromTo(links,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo(photos,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    );
    if (meta) gsap.fromTo(meta,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.55 }
    );
  }

  function closeMenu() {
    isOpen = false;
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    gsap.to(overlay, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.7,
      ease: 'power4.inOut',
      overwrite: true,
      onComplete: function () {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        gsap.set(links, { opacity: 0, y: 30 });
        gsap.set(photos, { clipPath: 'inset(100% 0 0 0)' });
        if (meta) gsap.set(meta, { opacity: 0, y: 20 });
      }
    });
  }

  toggle.addEventListener('click', function () { isOpen ? closeMenu() : openMenu(); });
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  links.forEach(function (link) { link.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) closeMenu(); });
})();

// ── HORIZONTAL GALLERY ────────────────────────────────────
(function initGallery() {
  var section = document.querySelector('.gallery-section');
  var track   = document.getElementById('gallery-track');
  if (!section || !track) return;

  function build() {
    var distance = track.scrollWidth - window.innerWidth;
    if (distance <= 0) return;

    gsap.to(track, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=' + distance,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }

  if (document.readyState === 'complete') { build(); }
  else { window.addEventListener('load', build); }
})();

// ── MARQUEE ───────────────────────────────────────────────
(function initMarquee() {
  var leftTrack  = document.getElementById('marquee-left');
  var rightTrack = document.getElementById('marquee-right');
  if (!leftTrack || !rightTrack) return;

  gsap.to(leftTrack,  { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
  gsap.to(rightTrack, { xPercent: 50,  ease: 'none', duration: 38, repeat: -1 });
})();

// ── SCROLL ENTRANCE ANIMATIONS ────────────────────────────
(function initScrollAnimations() {

  // Bio statement — word split
  var bioStatement = document.querySelector('.bio-statement');
  if (bioStatement) {
    if (typeof SplitText !== 'undefined') {
      var split = new SplitText(bioStatement, { type: 'words' });
      gsap.fromTo(split.words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.025, ease: 'power3.out',
          scrollTrigger: { trigger: bioStatement, start: 'top 80%' }
        }
      );
    } else {
      gsap.fromTo(bioStatement,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: bioStatement, start: 'top 80%' }
        }
      );
    }
  }

  // Bio stats
  gsap.fromTo('.bio-stat',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.bio-stats', start: 'top 80%' }
    }
  );

  // Content split
  gsap.fromTo('.split-item',
    { scale: 0.92, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.content-split', start: 'top 75%' }
    }
  );

  // Showcase header
  var showcaseHeader = document.querySelector('.showcase-header');
  if (showcaseHeader) {
    gsap.fromTo(showcaseHeader,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: showcaseHeader, start: 'top 80%' }
      }
    );
  }

  // Showcase cards
  gsap.fromTo('.showcase-card',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.showcase-grid', start: 'top 75%' }
    }
  );

  // Experience content
  gsap.fromTo('.experience-content',
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.experience-section', start: 'top 75%' }
    }
  );

  // Experience timeline items
  gsap.fromTo('.exp-item',
    { x: 40, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.experience-timeline', start: 'top 75%' }
    }
  );

  // Partners header
  var partnersHeader = document.querySelector('.partners-header');
  if (partnersHeader) {
    gsap.fromTo(Array.from(partnersHeader.children),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: partnersHeader, start: 'top 75%' }
      }
    );
  }

  // Skill cards
  gsap.fromTo('.skill-card',
    { y: 30, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }
    }
  );

  // Social grid
  gsap.fromTo('.social-item',
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.65, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: '.social-grid', start: 'top 80%' }
    }
  );

  // Footer tagline
  var footerTagline = document.querySelector('.footer-tagline');
  if (footerTagline) {
    if (typeof SplitText !== 'undefined') {
      var splitFt = new SplitText(footerTagline, { type: 'chars' });
      gsap.fromTo(splitFt.chars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power3.out',
          scrollTrigger: { trigger: footerTagline, start: 'top 85%' }
        }
      );
    } else {
      gsap.fromTo(footerTagline,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: footerTagline, start: 'top 85%' }
        }
      );
    }
  }

  // Hero avatar subtle parallax
  var heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // prefers-reduced-motion: kill everything
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
    if (lenis) lenis.destroy();
  }
})();
