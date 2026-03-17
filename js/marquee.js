/* ── Partner Logo Marquee ── */
(function () {
  const leftTrack  = document.getElementById("marquee-left");
  const rightTrack = document.getElementById("marquee-right");

  if (!leftTrack || !rightTrack) return;

  // Row 1 — scrolls left
  gsap.to(leftTrack, {
    xPercent: -50,
    ease: "none",
    duration: 28,
    repeat: -1
  });

  // Row 2 — scrolls right, slower
  gsap.to(rightTrack, {
    xPercent: 50,
    ease: "none",
    duration: 36,
    repeat: -1
  });

  // Pause marquee when hovered
  [leftTrack, rightTrack].forEach(function (track) {
    track.closest(".marquee-row").addEventListener("mouseenter", function () {
      gsap.globalTimeline.pause();
    });
    track.closest(".marquee-row").addEventListener("mouseleave", function () {
      gsap.globalTimeline.resume();
    });
  });
})();
