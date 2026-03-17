/* ── Horizontal Photo Scroll Gallery ── */
(function () {
  const section = document.querySelector(".gallery-section");
  const track   = document.getElementById("gallery-track");

  if (!section || !track) return;

  // Wait for images to be available so scrollWidth is accurate
  function initGallery() {
    const trackWidth = track.scrollWidth;
    const distance   = trackWidth - window.innerWidth;

    if (distance <= 0) return; // Not wide enough to scroll

    gsap.to(track, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=" + distance,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }

  // Use a short delay to ensure images have laid out
  if (document.readyState === "complete") {
    initGallery();
  } else {
    window.addEventListener("load", initGallery);
  }
})();
