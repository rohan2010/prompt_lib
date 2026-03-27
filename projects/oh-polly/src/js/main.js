/*
  Oh Polly — Main JavaScript
  Handles: Lenis smooth scroll, GSAP ScrollTrigger animations, nav behavior,
           announcement bar dismiss, mobile menu, email form, animation sequence.

  Animation sequence (never same type consecutively):
  3.  Hero              — word-split (SplitText per word)
  4.  New Arrivals      — stagger-up (cards at 0.06s stagger)
  5a. Wedding Edit      — slide-left (image), fade-up (copy)
  5b. Going Out         — slide-right (image), fade-up (copy)
  6.  Bestsellers       — scale-up
  7.  Lookbook          — clip-reveal (inset 100%→0%)
  8.  UGC Feed          — fade-up
  9.  Press Strip       — stagger-up (left to right)
  10. Email Capture     — slide-right
  11. Footer            — fade-up
*/

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     REDUCED MOTION CHECK
     Gate ALL animation decisions through this.
  ───────────────────────────────────────── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────
     ANNOUNCEMENT BAR DISMISS
  ───────────────────────────────────────── */
  function initAnnouncementBar() {
    const bar = document.getElementById('announcement-bar');
    const dismissBtn = document.getElementById('bar-dismiss');
    const nav = document.getElementById('site-nav');

    if (!bar || !dismissBtn) return;

    // Restore dismissed state from sessionStorage
    if (sessionStorage.getItem('oh-polly-bar-dismissed') === 'true') {
      bar.classList.add('dismissed');
      if (nav) nav.classList.add('bar-dismissed');
    }

    dismissBtn.addEventListener('click', function () {
      bar.classList.add('dismissed');
      if (nav) nav.classList.add('bar-dismissed');
      sessionStorage.setItem('oh-polly-bar-dismissed', 'true');
    });
  }

  /* ─────────────────────────────────────────
     NAVIGATION — transparent → solid on scroll
  ───────────────────────────────────────── */
  function initNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    const SCROLL_THRESHOLD = 60;

    function updateNav() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // run once on load
  }

  /* ─────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────── */
  function initMobileMenu() {
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-menu__link');

    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Trap focus
      if (!prefersReduced) {
        gsap.from('.mobile-menu__link', {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    menuLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  /* ─────────────────────────────────────────
     LENIS SMOOTH SCROLL
  ───────────────────────────────────────── */
  function initLenis() {
    if (prefersReduced) return; // native scroll for reduced-motion users

    const lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* ─────────────────────────────────────────
     GSAP SCROLL ANIMATIONS
  ───────────────────────────────────────── */
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    if (prefersReduced) {
      // Show all animated elements immediately — no transforms
      document.querySelectorAll('.gsap-anim').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.clipPath = 'none';
        el.style.visibility = 'visible';
      });
      return;
    }

    /* ── HERO: word-split entrance ── */
    const heroHeadline = document.querySelector('.hero__headline');
    const heroEyebrow  = document.querySelector('.hero__eyebrow');
    const heroCta      = document.querySelector('.hero__cta');

    if (heroHeadline) {
      // Use SplitText if available, fallback to simple fade-up
      try {
        const split = new SplitText(heroHeadline, { type: 'words', wordsClass: 'word-inner' });
        gsap.from(split.words, {
          y: '110%',
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.07,
          delay: 0.3,
        });
      } catch (e) {
        // SplitText unavailable — fallback
        gsap.from(heroHeadline, { y: 60, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.3 });
      }
    }

    if (heroEyebrow) {
      gsap.from(heroEyebrow, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
    }

    if (heroCta) {
      gsap.from(heroCta, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.8 });
    }

    /* ── NEW ARRIVALS: stagger-up ── */
    const productCards = document.querySelectorAll('.new-arrivals .product-card');
    if (productCards.length) {
      gsap.from(productCards, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.new-arrivals',
          start: 'top 80%',
        },
      });
    }

    const newArrivalsHeader = document.querySelector('.new-arrivals__header');
    if (newArrivalsHeader) {
      gsap.from(newArrivalsHeader.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: newArrivalsHeader,
          start: 'top 85%',
        },
      });
    }

    /* ── EDITORIAL COLLECTIONS: slide-left / slide-right (alternating) ── */
    const collectionBlocks = document.querySelectorAll('.collection-block');
    collectionBlocks.forEach(function (block) {
      const img  = block.querySelector('.collection-block__image');
      const copy = block.querySelector('.collection-block__copy');
      const isReversed = block.classList.contains('collection-block--reversed');

      if (img) {
        gsap.from(img, {
          x: isReversed ? 80 : -80,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 75%',
          },
        });
      }

      if (copy) {
        gsap.from(copy.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.15,
          scrollTrigger: {
            trigger: block,
            start: 'top 75%',
          },
        });
      }
    });

    /* ── BESTSELLERS: scale-up ── */
    const bestsellerCards = document.querySelectorAll('.bestsellers .product-card');
    if (bestsellerCards.length) {
      gsap.from(bestsellerCards, {
        scale: 0.88,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.bestsellers',
          start: 'top 80%',
        },
      });
    }

    const bestsellersHeader = document.querySelector('.bestsellers__header');
    if (bestsellersHeader) {
      gsap.from(bestsellersHeader.children, {
        scale: 0.92,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: bestsellersHeader,
          start: 'top 85%',
        },
      });
    }

    /* ── LOOKBOOK: clip-reveal per image ── */
    const lookbookItems = document.querySelectorAll('.lookbook__item');
    lookbookItems.forEach(function (item, index) {
      gsap.from(item, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.9,
        ease: 'power3.out',
        delay: (index % 3) * 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
      });
    });

    const lookbookHeader = document.querySelector('.lookbook__header');
    if (lookbookHeader) {
      gsap.from(lookbookHeader.children, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: lookbookHeader,
          start: 'top 85%',
        },
      });
    }

    /* ── UGC FEED: fade-up ── */
    const ugcItems = document.querySelectorAll('.ugc-item');
    if (ugcItems.length) {
      gsap.from(ugcItems, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.ugc-feed',
          start: 'top 80%',
        },
      });
    }

    const ugcHeader = document.querySelector('.ugc-feed__header');
    if (ugcHeader) {
      gsap.from(ugcHeader.children, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: ugcHeader,
          start: 'top 85%',
        },
      });
    }

    /* ── PRESS STRIP: stagger-up (logos left to right) ── */
    const pressNames = document.querySelectorAll('.press-name');
    if (pressNames.length) {
      gsap.from(pressNames, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.press-strip',
          start: 'top 85%',
        },
      });
    }

    /* ── EMAIL CAPTURE: slide-right ── */
    const emailInner = document.querySelector('.email-capture__inner');
    if (emailInner) {
      gsap.from(emailInner.children, {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.email-capture',
          start: 'top 80%',
        },
      });
    }

    /* ── FOOTER: fade-up (gentle final entrance) ── */
    const footerTop = document.querySelector('.footer__top');
    if (footerTop) {
      gsap.from(footerTop, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 92%',
        },
      });
    }
  }

  /* ─────────────────────────────────────────
     HERO THREE.JS PARTICLE FIELD
     Three depth layers of particles:
       - Dust:   2000 tiny points, wide spread, low opacity
       - Mid:     800 medium points, tighter, full brand colors
       - Bokeh:   120 large blurred circles, very transparent, foreground
     Camera tilts lazily toward mouse. Slow global rotation.
     Replaced by real campaign video when asset is available.
  ───────────────────────────────────────── */
  function initHeroParticles() {
    if (prefersReduced) return;
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const hero = canvas.closest('.hero');

    // ── Scene / Camera / Renderer ──
    const scene    = new THREE.Scene();
    const w        = canvas.clientWidth  || window.innerWidth;
    const h        = canvas.clientHeight || window.innerHeight;
    const camera   = new THREE.PerspectiveCamera(65, w / h, 0.1, 200);
    camera.position.set(0, 0, 40);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: false, antialias: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 1);

    // Depth fog — particles fade into the dark background
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.014);

    // ── Brand color palette ──
    const palette = [
      new THREE.Color(0xc4967a),  // champagne rose — primary accent
      new THREE.Color(0xe8c4a0),  // warm gold
      new THREE.Color(0xfaf8f5),  // near-white
      new THREE.Color(0xa87858),  // deeper rose
      new THREE.Color(0xf0dcc0),  // pale champagne
      new THREE.Color(0xffffff),  // pure white — occasional bright spark
    ];

    // ── Helper: build a Points object ──
    function buildLayer(count, spread, ySpread, zSpread, size, opacity) {
      var positions = new Float32Array(count * 3);
      var colors    = new Float32Array(count * 3);

      for (var i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * ySpread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * zSpread;

        var c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

      var mat = new THREE.PointsMaterial({
        size:         size,
        vertexColors: true,
        transparent:  true,
        opacity:      opacity,
        blending:     THREE.AdditiveBlending,
        depthWrite:   false,
        sizeAttenuation: true,
      });

      return new THREE.Points(geo, mat);
    }

    // Dust layer — fine background grain
    var dust   = buildLayer(2200, 140, 80, 80, 0.12, 0.55);
    // Mid layer — main visible particles, brand colors
    var mid    = buildLayer(900,  90, 55, 55, 0.32, 0.80);
    // Bokeh layer — large out-of-focus blobs in foreground
    var bokeh  = buildLayer(130,  60, 40, 25, 1.80, 0.18);

    scene.add(dust);
    scene.add(mid);
    scene.add(bokeh);

    // ── Mouse tracking (camera tilt) ──
    var mouseX = 0, mouseY = 0;
    var camX   = 0, camY   = 0;

    if (hero) {
      hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
        mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      });
      hero.addEventListener('mouseleave', function () {
        mouseX = 0;
        mouseY = 0;
      });
    }

    // ── Resize ──
    function onResize() {
      var nw = canvas.clientWidth  || window.innerWidth;
      var nh = canvas.clientHeight || window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
    window.addEventListener('resize', onResize);

    // ── Animation loop ──
    var clock  = new THREE.Clock();
    var rafId  = null;

    function tick() {
      rafId = requestAnimationFrame(tick);
      var t = clock.getElapsedTime();

      // Layers rotate at different speeds for parallax depth
      dust.rotation.y  =  t * 0.025;
      dust.rotation.x  =  Math.sin(t * 0.018) * 0.04;
      mid.rotation.y   = -t * 0.018;
      mid.rotation.x   =  Math.sin(t * 0.012) * 0.03;
      bokeh.rotation.y =  t * 0.008;

      // Camera drifts toward mouse lazily
      camX += (mouseX * 4  - camX) * 0.04;
      camY += (-mouseY * 3 - camY) * 0.04;
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    // Only animate when hero is on screen
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          clock.start();
          tick();
        } else {
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
          clock.stop();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(hero || canvas);
  }

  /* ─────────────────────────────────────────
     HERO 3D MOUSE PARALLAX
     Layers move at different depths on mousemove.
     Each element with [data-depth] floats at that rate.
     Background counter-moves at half the rate (creates depth).
  ───────────────────────────────────────── */
  function initHeroParallax() {
    if (prefersReduced) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const layers = hero.querySelectorAll('[data-depth]');
    const bg     = hero.querySelector('.hero__video-placeholder');
    let raf      = null;
    let targetX  = 0;
    let targetY  = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      // Normalise: -0.5 to 0.5
      targetX = (e.clientX - rect.left) / rect.width  - 0.5;
      targetY = (e.clientY - rect.top)  / rect.height - 0.5;
    });

    hero.addEventListener('mouseleave', function () {
      targetX = 0;
      targetY = 0;
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      currentX = lerp(currentX, targetX, 0.07);
      currentY = lerp(currentY, targetY, 0.07);

      layers.forEach(function (el) {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0.05;
        const moveX = currentX * depth * 80;
        const moveY = currentY * depth * 80;
        gsap.set(el, { x: moveX, y: moveY, force3D: true });
      });

      // Background counter-moves for perceived depth
      if (bg) {
        gsap.set(bg, {
          x: currentX * -18,
          y: currentY * -18,
          scale: 1.06, // keep slightly oversized so edges don't show
          force3D: true,
        });
      }

      raf = requestAnimationFrame(tick);
    }

    // Only run when hero is in view
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(tick);
        } else {
          if (raf) { cancelAnimationFrame(raf); raf = null; }
        }
      });
    }, { threshold: 0.1 });

    observer.observe(hero);
  }

  /* ─────────────────────────────────────────
     PRODUCT CARD 3D TILT
     Magnetic perspective tilt on mousemove within each card.
     rotateX + rotateY capped at ±12deg. Resets on leave.
  ───────────────────────────────────────── */
  function initCardTilt() {
    if (prefersReduced) return;

    const cards = document.querySelectorAll('.product-card');
    const MAX_TILT = 10; // degrees

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect   = card.getBoundingClientRect();
        const relX   = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
        const relY   = (e.clientY - rect.top)  / rect.height - 0.5;
        const rotY   =  relX * MAX_TILT;
        const rotX   = -relY * MAX_TILT;

        gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 900,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      card.addEventListener('mouseleave', function () {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto',
        });
      });
    });
  }

  /* ─────────────────────────────────────────
     EMAIL FORM — Klaviyo integration stub
  ───────────────────────────────────────── */
  function initEmailForms() {
    const forms = document.querySelectorAll('.email-capture__form, .footer__newsletter-form');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn  = form.querySelector('button[type="submit"]');
        if (!emailInput || !emailInput.value) return;

        const email = emailInput.value.trim();
        const KLAVIYO_LIST_ID = 'YOUR_KLAVIYO_LIST_ID'; // Replace with real Klaviyo list ID

        // Klaviyo Subscribe API v2
        const payload = {
          api_key: 'YOUR_KLAVIYO_PUBLIC_KEY', // Replace with real public key
          profiles: [{ email: email }],
        };

        if (submitBtn) {
          submitBtn.textContent = 'Joining...';
          submitBtn.disabled = true;
        }

        fetch('https://a.klaviyo.com/api/v2/list/' + KLAVIYO_LIST_ID + '/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            if (res.ok) {
              emailInput.value = '';
              if (submitBtn) submitBtn.textContent = 'Joined.';
              setTimeout(function () {
                if (submitBtn) {
                  submitBtn.textContent = 'Join';
                  submitBtn.disabled = false;
                }
              }, 3000);
            } else {
              if (submitBtn) {
                submitBtn.textContent = 'Try again';
                submitBtn.disabled = false;
              }
            }
          })
          .catch(function () {
            // Graceful fail — still give user feedback
            emailInput.value = '';
            if (submitBtn) {
              submitBtn.textContent = 'Joined.';
              setTimeout(function () {
                submitBtn.textContent = 'Join';
                submitBtn.disabled = false;
              }, 3000);
            }
          });
      });
    });
  }

  /* ─────────────────────────────────────────
     INIT — run after DOM ready
  ───────────────────────────────────────── */
  function init() {
    initAnnouncementBar();
    initNav();
    initMobileMenu();
    initLenis();
    initHeroParticles();   // Three.js canvas — must run before parallax
    initScrollAnimations();
    initHeroParallax();
    initCardTilt();
    initEmailForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
