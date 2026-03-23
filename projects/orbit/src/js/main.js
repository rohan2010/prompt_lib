/**
 * ORBIT — Main Site JavaScript
 * Initializes: Lenis smooth scroll, GSAP ScrollTrigger animations,
 * orbital diagrams, nav scroll behavior, and all interactive components.
 */

'use strict';

/* ─── Wait for DOM ───────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Lenis smooth scroll ──────────────────────────────────────────────── */
  let lenis;
  if (!prefersReduced) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* ── Nav scroll solidification ────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ── Mobile nav ────────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const navMobileClose = document.getElementById('nav-mobile-close');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.contains('is-open');
      navMobile.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  if (navMobileClose) {
    navMobileClose.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav__mobile .nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ── Hero orbital diagram ─────────────────────────────────────────────── */
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const heroDiagram = new OrbitalDiagram(heroCanvas, 'hero');
    // Size canvas to fill hero
    const heroSection = document.querySelector('.hero');
    const resizeHeroCanvas = () => {
      heroCanvas.parentElement.style.width = heroSection.offsetWidth + 'px';
      heroCanvas.parentElement.style.height = heroSection.offsetHeight + 'px';
      heroDiagram._resize();
    };
    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);
  }

  /* ── Hero entrance animations ─────────────────────────────────────────── */
  if (!prefersReduced) {
    const heroTl = gsap.timeline({ delay: 0.2 });

    const heroEyebrow = document.querySelector('.hero__eyebrow');
    const heroHeadline = document.querySelector('.hero__headline');
    const heroSub = document.querySelector('.hero__subheadline');
    const heroActions = document.querySelector('.hero__actions');
    const heroScrollHint = document.querySelector('.hero__scroll-hint');

    if (heroEyebrow) {
      heroTl.to(heroEyebrow, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, 0);
    }

    if (heroHeadline) {
      heroTl.to(heroHeadline, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, 0.15);
    }

    if (heroSub) {
      heroTl.to(heroSub, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, 0.4);
    }

    if (heroActions) {
      heroTl.to(heroActions, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0.6);
    }

    if (heroScrollHint) {
      heroTl.to(heroScrollHint, {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, 1.1);
    }
  } else {
    // Show all hero elements immediately for reduced-motion
    document.querySelectorAll('.hero__eyebrow, .hero__headline, .hero__subheadline, .hero__actions, .hero__scroll-hint').forEach(el => {
      el.style.opacity = '1';
    });
  }

  /* ── Nav entrance ─────────────────────────────────────────────────────── */
  if (!prefersReduced) {
    gsap.from('.nav', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.1,
    });
  }

  /* ── Problem section — slide from sides ────────────────────────────────── */

  /*
    SECTION: The Problem
    ANIMATION TYPE: slide-left (old column) + slide-right (new column)
    Previous section: fade-up (hero entrance)
  */
  if (!prefersReduced) {
    const oldCol = document.querySelector('.problem__col--old');
    const newCol = document.querySelector('.problem__col--new');
    const problemHeader = document.querySelector('.problem__header');

    if (problemHeader) {
      gsap.from(problemHeader, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: problemHeader,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (oldCol) {
      gsap.from(oldCol, {
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: oldCol,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (newCol) {
      gsap.from(newCol, {
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: newCol,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  } else {
    document.querySelectorAll('.problem__col--old, .problem__col--new').forEach(el => {
      el.style.opacity = '1';
    });
  }

  /* ── Model section — 80/20 bar builds on scroll ─────────────────────────── */

  /*
    SECTION: The Vibe-Commerce Model
    ANIMATION TYPE: scale-up + progressive bar build
    Previous section: slide-left/right
  */
  const barMerchant = document.querySelector('.model__bar-merchant');
  const modelSection = document.querySelector('.model');

  if (!prefersReduced && modelSection) {
    // Model header fade-up
    gsap.from('.model__header', {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.model__header',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.model__concept', {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.model__concept',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Animate the 80/20 bar width
    if (barMerchant) {
      ScrollTrigger.create({
        trigger: '.model__bar-wrap',
        start: 'top 80%',
        onEnter: () => {
          barMerchant.style.width = '20%';
        },
      });
    }

    // Split details stagger
    gsap.from('.model__split-col', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.model__split-details',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

  } else {
    if (barMerchant) barMerchant.style.width = '20%';
    document.querySelectorAll('.model__split-col').forEach(el => {
      el.style.opacity = '1';
    });
  }

  /* ── 7 Layers — orbital diagram + interaction ────────────────────────────── */

  /*
    SECTION: The 7 Layers
    ANIMATION TYPE: scale-up (diagram fades in at 0.9 scale)
    Previous section: scale-up (model bar — different enough as the scale target is the bar, not a card grid)
  */
  const layersCanvas = document.getElementById('layers-canvas');
  let layersDiagram;

  if (layersCanvas) {
    // Set canvas size proportional
    const updateLayersCanvasSize = () => {
      const wrap = layersCanvas.parentElement;
      const w = Math.min(wrap.offsetWidth, 580);
      layersCanvas.style.width = w + 'px';
      layersCanvas.style.height = w + 'px';
    };
    updateLayersCanvasSize();
    window.addEventListener('resize', updateLayersCanvasSize);

    const detailPanel = document.getElementById('layers-detail-panel');
    const hintPanel = document.getElementById('layers-hint');

    layersDiagram = new OrbitalDiagram(layersCanvas, 'layers', {
      onHover: (layer, index) => {
        // Subtle highlight only — no panel on hover, only on click
        if (layer) {
          layersCanvas.title = layer.name;
        }
      },
      onSelect: (layer, index) => {
        if (layer) {
          showDetailPanel(layer, index);
        } else {
          hideDetailPanel();
        }
      },
    });

    // Scale in on scroll enter
    if (!prefersReduced) {
      gsap.from(layersCanvas.parentElement, {
        opacity: 0,
        scale: 0.9,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.layers',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.layers__header', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.layers__header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Show/hide detail panel
    function showDetailPanel(layer, index) {
      if (!detailPanel) return;

      if (hintPanel) hintPanel.style.display = 'none';

      document.getElementById('detail-code').textContent = layer.code;
      document.getElementById('detail-code').style.color = layer.color;
      document.getElementById('detail-name').textContent = layer.name;
      document.getElementById('detail-agent').textContent = layer.agentRole;
      document.getElementById('detail-specialist').textContent = layer.specialistRole;
      document.getElementById('detail-benefit').textContent = layer.merchantBenefit;

      const inner = detailPanel.querySelector('.layers__detail-inner');
      if (inner) {
        inner.style.borderColor = layer.color.replace(')', ', 0.2)').replace('rgb', 'rgba');
        // Use inline border override via a CSS variable trick
        inner.style.borderColor = `rgba(${hexToRgbArr(layer.color).join(',')}, 0.18)`;
      }

      detailPanel.classList.add('is-visible');
      detailPanel.setAttribute('aria-live', 'polite');
    }

    function hideDetailPanel() {
      if (!detailPanel) return;
      detailPanel.classList.remove('is-visible');
      if (hintPanel) hintPanel.style.display = '';
    }

    // Hint node buttons
    document.querySelectorAll('.layers__hint-node').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.dataset.code;
        const index = ORBIT_LAYERS.findIndex(l => l.code === code);
        if (index >= 0) {
          layersDiagram.selectNode(index);
          showDetailPanel(ORBIT_LAYERS[index], index);
        }
      });
    });
  }

  /* ── Specialists section — stagger-up cards ──────────────────────────── */

  /*
    SECTION: For Specialists
    ANIMATION TYPE: stagger-up (cards)
    Previous section: scale-up (layers diagram)
  */
  if (!prefersReduced) {
    gsap.from('.specialists__header', {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.specialists__header',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.specialists__card', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.specialists__grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.specialists__earnings', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.specialists__earnings',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  } else {
    document.querySelectorAll('.specialists__card, .specialists__earnings').forEach(el => {
      el.style.opacity = '1';
    });
  }

  /* ── Why It Works — three columns rotate-in ─────────────────────────── */

  /*
    SECTION: Why It Works
    ANIMATION TYPE: rotate-in (slight y + rotation per column)
    Previous section: stagger-up
  */
  if (!prefersReduced) {
    gsap.from('.why__header', {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why__header',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.why__col', {
      opacity: 0,
      y: 40,
      rotation: 1.5,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why__grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  } else {
    document.querySelectorAll('.why__col').forEach(el => {
      el.style.opacity = '1';
    });
  }

  /* ── CTA section — dramatic fade ─────────────────────────────────────── */

  /*
    SECTION: Early Access CTA
    ANIMATION TYPE: clip-reveal (headline), then fade-in (form)
    Previous section: rotate-in
  */

  // CTA orbital diagram
  const ctaCanvas = document.getElementById('cta-canvas');
  if (ctaCanvas) {
    const ctaSection = document.querySelector('.cta-section');
    const resizeCtaCanvas = () => {
      ctaCanvas.parentElement.style.width = ctaSection.offsetWidth + 'px';
      ctaCanvas.parentElement.style.height = ctaSection.offsetHeight + 'px';
      if (window._ctaDiagram) window._ctaDiagram._resize();
    };
    window._ctaDiagram = new OrbitalDiagram(ctaCanvas, 'cta');
    resizeCtaCanvas();
    window.addEventListener('resize', resizeCtaCanvas);
  }

  if (!prefersReduced) {
    gsap.from('.cta-section__eyebrow', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.cta-section__headline', {
      opacity: 0,
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-section__headline',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.cta-section__sub', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.cta-section__sub',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.cta-form', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.35,
      scrollTrigger: {
        trigger: '.cta-form',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  } else {
    document.querySelectorAll('.cta-section__eyebrow, .cta-section__headline, .cta-section__sub, .cta-form').forEach(el => {
      el.style.opacity = '1';
    });
  }

  /* ── Footer ────────────────────────────────────────────────────────────── */
  if (!prefersReduced) {
    gsap.from('.footer', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });
  }

  /* ── Smooth scroll for anchor links ─────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── CTA form submission ──────────────────────────────────────────────── */
  const ctaForm = document.getElementById('cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = ctaForm.querySelector('input[type="email"]').value;
      const role = ctaForm.querySelector('select').value;
      if (!email) return;

      const btn = ctaForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Request Received';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      }
    });
  }
});

/* ─── Utility: hex to RGB array ──────────────────────────────────────────── */
function hexToRgbArr(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}
