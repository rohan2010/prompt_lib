"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    "Discover",
    "Experience",
    "Technology",
    "Company",
    "News",
    "Careers",
    "Investors",
    "Connect",
  ];

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
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 32px",
          background: scrolled ? "#0e1620" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        {/* Left: hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: "24px",
          }}
          aria-label="Open menu"
        >
          <span style={{ display: "block", height: "2px", background: "white", width: "24px" }} />
          <span style={{ display: "block", height: "2px", background: "white", width: "24px" }} />
          <span style={{ display: "block", height: "2px", background: "white", width: "24px" }} />
        </button>

        {/* Center: logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image src="/images/logo-animated.webp" alt="Joby Aviation" width={48} height={27} />
          <span style={{ color: "white", fontWeight: 700, fontSize: "1.3rem" }}>Joby</span>
        </div>

        {/* Right: CTA */}
        <a href="#" className="btn-dark">
          Investors ↗
        </a>
      </nav>

      {/* Fullscreen menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0e1620",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "32px",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "2rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Close menu"
          >
            ×
          </button>

          {/* Nav links */}
          <ul style={{ listStyle: "none" }}>
            {navLinks.map((link, i) => (
              <li
                key={link}
                style={{
                  animation: `slideUp 0.5s ${i * 50}ms both`,
                }}
              >
                <a
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "block",
                    lineHeight: 1.3,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#007ae5";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
