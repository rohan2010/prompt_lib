"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "INTRO", href: "#hero" },
  { label: "FEATURES", href: "#features" },
  { label: "PRODUCT", href: "#product" },
  { label: "CONTACT", href: "#footer" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = ["hero", "features", "product", "footer"];
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2rem",
          background: scrolled
            ? "rgba(16,9,4,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "0.875rem",
            letterSpacing: "0.2em",
            color: "var(--color-white)",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
          onClick={() => scrollTo("#hero")}
        >
          ORYZO
        </span>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`nav-link${active === sectionId ? " active" : ""}`}
                style={{ background: "none", border: "none" }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Fixed right sidebar vertical text */}
      <div
        style={{
          position: "fixed",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 99,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.5625rem",
          letterSpacing: "0.18em",
          fontWeight: 600,
          textTransform: "uppercase",
          color: "rgba(255,237,215,0.35)",
          fontFamily: "var(--font-display)",
          pointerEvents: "none",
        }}
      >
        ORYZO-1 MODEL
      </div>
    </>
  );
}
