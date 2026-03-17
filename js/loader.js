/* ── Loader Gate ── */
(function () {
  const loader = document.getElementById("loader");
  const btn    = document.getElementById("loader-enter");

  if (!loader || !btn) return;

  btn.addEventListener("click", function () {
    // Wipe loader up and off screen
    gsap.to(loader, {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.2,
      ease: "power4.inOut",
      overwrite: true,
      onComplete: function () {
        loader.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Animate hero content in after loader leaves
    gsap.fromTo(
      ".hero-name-first, .hero-name-last",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: "power3.out", delay: 0.4 }
    );
    gsap.fromTo(
      ".hero-eyebrow, .hero-subtitle, .hero-scroll-hint",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.7 }
    );
    gsap.fromTo(
      ".hero-next-event, .hero-signature",
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.9 }
    );
  });

  // Prevent scroll behind loader
  document.body.style.overflow = "hidden";
})();
