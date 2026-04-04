"use client";
import { useState } from "react";

const footerLinks = {
  Discover: ["Experience", "Technology", "Company", "News", "Careers"],
  Connect: ["For Investors", "Fly Blade", "Joby Shop"],
  Follow: ["YouTube", "Instagram", "LinkedIn", "X"],
};

const legalLinks = ["Privacy Policy", "Terms of Use", "Impact Reporting", "Health Plan Transparency", "Safety Policy"];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ background: "var(--blue)", color: "#fff" }}>
      {/* Main footer content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 40, marginBottom: 60 }}>
          {/* Logo + legal */}
          <div>
            {/* Joby logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, color: "#fff" }}>
              <svg width="28" height="20" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.8 14.6C13.8 3.4 9 1.1 6.5.4-3.1-2.3-2.3 14.4 15.4 18 24.2 42.4 40.8 31.1 49.7 13.1 54.8 2.9 50.7-2.7 43.1 1.3 36.7 4.7 28 14.9 17.8 14.6zM7.1 9.8C3 4.9 8.9-1 14.6 14.4 12.9 14 9.9 13.3 7.1 9.8zM18.9 18.1C31.1 17.6 40.6 4.7 44.8 5.6 51 7 28.2 45.5 18.9 18.1z" fill="currentColor"/>
              </svg>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.04em" }}>Joby</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {legalLinks.map((l) => (
                <a key={l} href="#" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                  {l}
                </a>
              ))}
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", marginTop: 8 }}>© 2026 Joby Aero, Inc.</p>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h4 style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", opacity: 0.45, marginBottom: 16 }}>{col}</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {links.map((link) => (
                  <a key={link} href="#" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}>
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Email signup */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 40, display: "flex", justifyContent: "flex-end" }}>
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: 8, color: "rgba(255,255,255,0.9)" }}>Sign up for updates</p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 0 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter e-mail address"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.4)",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: "0.9rem",
                  padding: "4px 0",
                  outline: "none",
                  width: 240,
                  caretColor: "#fff",
                }}
              />
              <button type="submit" style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: "1rem",
                padding: "4px 8px",
                transition: "color .2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div style={{
        height: 200,
        background: "linear-gradient(135deg, var(--dark-blue) 0%, var(--blue) 40%, var(--orange) 70%, var(--pink) 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          right: 0, top: 0,
          width: "40%", height: "100%",
          background: "rgba(200,220,255,0.3)",
          borderRadius: "60% 0 0 60%",
        }} />
        <div style={{
          position: "absolute",
          right: "15%", bottom: 0,
          width: "30%", height: "80%",
          background: "var(--dark-blue)",
          borderRadius: "40% 40% 0 0",
        }} />
      </div>
    </footer>
  );
}
