/* ── Full-Screen Menu Overlay ── */
(function () {
  const overlay  = document.getElementById("menu-overlay");
  const toggle   = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const links    = document.querySelectorAll(".menu-link");
  const meta     = document.querySelector(".menu-meta");
  const photos   = document.querySelectorAll(".menu-photo-item");

  if (!overlay || !toggle) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    // Slide overlay in from bottom
    gsap.fromTo(
      overlay,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut", overwrite: true }
    );

    // Stagger nav links
    gsap.fromTo(
      links,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.2 }
    );

    // Meta / socials
    if (meta) {
      gsap.fromTo(
        meta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.55 }
      );
    }

    // Photos clip-path reveal, staggered
    gsap.fromTo(
      photos,
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.15 }
    );
  }

  function closeMenu() {
    isOpen = false;
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    gsap.to(overlay, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.7,
      ease: "power4.inOut",
      overwrite: true,
      onComplete: function () {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        // Reset link opacity for next open
        gsap.set(links, { opacity: 0, y: 30 });
        gsap.set(photos, { clipPath: "inset(100% 0 0 0)" });
        if (meta) gsap.set(meta, { opacity: 0, y: 20 });
      }
    });
  }

  toggle.addEventListener("click", function () {
    isOpen ? closeMenu() : openMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // Close on nav link click
  links.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) closeMenu();
  });

  // Initialize hidden state for links / photos
  gsap.set(links, { opacity: 0, y: 30 });
  gsap.set(photos, { clipPath: "inset(100% 0 0 0)" });
  if (meta) gsap.set(meta, { opacity: 0, y: 20 });
})();
