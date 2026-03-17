/* ── Main App — Lenis + GSAP ScrollTrigger orchestration ── */
(function () {
  // ── Lenis smooth scroll ──────────────────────────────────
  const lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    direction: "vertical",
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // ── Header scroll state ──────────────────────────────────
  const header = document.getElementById("site-header");
  if (header) {
    ScrollTrigger.create({
      start: "top+=80 top",
      onEnter:      function () { header.classList.add("scrolled"); },
      onLeaveBack:  function () { header.classList.remove("scrolled"); }
    });
  }

  // ── Bio statement word split ─────────────────────────────
  const bioStatement = document.querySelector(".bio-statement");
  if (bioStatement && typeof SplitText !== "undefined") {
    const split = new SplitText(bioStatement, { type: "words" });
    gsap.fromTo(
      split.words,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bioStatement,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  } else if (bioStatement) {
    // Fallback without SplitText
    gsap.fromTo(
      bioStatement,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: bioStatement, start: "top 80%" }
      }
    );
  }

  const bioSig = document.querySelector(".bio-signature");
  if (bioSig) {
    gsap.fromTo(
      bioSig,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: bioSig, start: "top 85%" }
      }
    );
  }

  // ── Content split section ────────────────────────────────
  const splitItems = document.querySelectorAll(".split-item");
  if (splitItems.length) {
    gsap.fromTo(
      splitItems,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-split",
          start: "top 75%"
        }
      }
    );
  }

  // ── Showcase cards ───────────────────────────────────────
  const showcaseCards = document.querySelectorAll(".showcase-card");
  if (showcaseCards.length) {
    gsap.fromTo(
      showcaseCards,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".showcase-grid",
          start: "top 75%"
        }
      }
    );
  }

  const showcaseHeader = document.querySelector(".showcase-header");
  if (showcaseHeader) {
    gsap.fromTo(
      showcaseHeader,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: showcaseHeader, start: "top 80%" }
      }
    );
  }

  // ── Store section ────────────────────────────────────────
  const storeImgs = document.querySelectorAll(".store-img");
  if (storeImgs.length) {
    storeImgs.forEach(function (img, i) {
      gsap.fromTo(
        img,
        { y: 50 + i * 15, opacity: 0 },
        {
          y: img.classList.contains("store-img--1") ? -20 :
             img.classList.contains("store-img--3") ?  20 : 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: ".store-section",
            start: "top 70%"
          }
        }
      );
    });
  }

  const storeContent = document.querySelector(".store-content");
  if (storeContent) {
    gsap.fromTo(
      storeContent,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: storeContent, start: "top 75%" }
      }
    );
  }

  // ── Partners header ──────────────────────────────────────
  const partnersHeader = document.querySelector(".partners-header");
  if (partnersHeader) {
    gsap.fromTo(
      partnersHeader.children,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: partnersHeader, start: "top 75%" }
      }
    );
  }

  // Partners featured grid
  const partnerImgs = document.querySelectorAll(".partners-img");
  if (partnerImgs.length) {
    gsap.fromTo(
      partnerImgs,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".partners-featured", start: "top 80%" }
      }
    );
  }

  // ── Social grid ──────────────────────────────────────────
  const socialItems = document.querySelectorAll(".social-item");
  if (socialItems.length) {
    gsap.fromTo(
      socialItems,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".social-grid",
          start: "top 80%"
        }
      }
    );
  }

  // ── Footer tagline ───────────────────────────────────────
  const footerTagline = document.querySelector(".footer-tagline");
  if (footerTagline && typeof SplitText !== "undefined") {
    const splitFt = new SplitText(footerTagline, { type: "chars" });
    gsap.fromTo(
      splitFt.chars,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      {
        clipPath: "inset(0 0% 0 0)", opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: { trigger: footerTagline, start: "top 85%" }
      }
    );
  } else if (footerTagline) {
    gsap.fromTo(
      footerTagline,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: footerTagline, start: "top 85%" }
      }
    );
  }

  // ── Hero parallax on scroll ──────────────────────────────
  const heroImg = document.querySelector(".hero-img");
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // ── prefers-reduced-motion: kill all ScrollTriggers ──────
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionQuery.matches) {
    ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
    lenis.destroy();
  }
})();
