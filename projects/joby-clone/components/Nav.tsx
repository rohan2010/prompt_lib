"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background .4s ease",
          background: scrolled ? "rgba(14,22,32,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Left: hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 8,
          }}
        >
          <span style={{ display: "block", width: 24, height: 1.5, background: "currentColor" }} />
          <span style={{ display: "block", width: 24, height: 1.5, background: "currentColor" }} />
        </button>

        {/* Center: logo */}
        <Link href="/" aria-label="Joby home" style={{ color: "#fff", textDecoration: "none" }}>
          <svg width="104" height="28" viewBox="0 0 104 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bird mark */}
            <path d="M13.1 10.7C10.2 2.5 6.7.8 4.8.3c-7.3-1.9-6.7 10.4 7.2 13.1C18.2 31.3 30.2 23 36.8 9.7c3.8-7.6.8-11.7-4.8-8.9C27.4 3.5 21.1 10.9 13.1 10.7zM5.2 7.2C2.2 3.6 6.6-.7 10.8 10.6 9.6 10.3 7.4 9.7 5.2 7.2zM14 13.3c9.1-.3 16-9.8 19-9.2 4.6 1 -13.6 29.6-19-4.1z" fill="white" transform="scale(0.7) translate(2, 2)"/>
            {/* Joby wordmark */}
            <text x="30" y="20" fill="white" fontSize="17" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="-0.5">Joby</text>
          </svg>
        </Link>

        {/* Right: Investors */}
        <a
          href="#"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: 4,
            opacity: 0.9,
          }}
        >
          Investors
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </nav>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "var(--black)",
            color: "var(--cream)",
            display: "flex",
            flexDirection: "column",
            padding: "32px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
            <span style={{ fontSize: "0.85rem", opacity: 0.5 }}>Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1rem", fontFamily: "inherit", fontWeight: 600 }}
            >
              Close
            </button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Discover", "Experience", "Technology", "Company", "News", "Careers", "Investors"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "var(--cream)",
                  textDecoration: "none",
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  opacity: 0.9,
                  transition: "opacity .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
