"use client";

import { useState } from "react";
import Image from "next/image";

const discover = ["Experience", "Technology", "Company", "News", "Careers"];
const explore = ["For Investors", "Fly Blade", "Joby Shop"];
const connect = ["YouTube", "Instagram", "LinkedIn", "X"];

export default function FooterSection() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ background: "#007ae5" }}>
      {/* Top grid */}
      <div
        style={{
          padding: "80px 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "48px",
        }}
      >
        {/* Col 1 - Logo */}
        <div>
          <Image
            src="/images/logo-animated.webp"
            alt="Joby Aviation"
            width={48}
            height={27}
          />
        </div>

        {/* Col 2 - Discover */}
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: "20px",
              color: "#f5f4df",
            }}
          >
            Discover
          </p>
          {discover.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "0.95rem",
                fontWeight: 400,
                lineHeight: 2,
                textDecoration: "none",
                color: "#f5f4df",
                display: "block",
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Col 3 - Explore */}
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: "20px",
              color: "#f5f4df",
            }}
          >
            Explore
          </p>
          {explore.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "0.95rem",
                fontWeight: 400,
                lineHeight: 2,
                textDecoration: "none",
                color: "#f5f4df",
                display: "block",
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Col 4 - Connect */}
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: "20px",
              color: "#f5f4df",
            }}
          >
            Connect
          </p>
          {connect.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "0.95rem",
                fontWeight: 400,
                lineHeight: 2,
                textDecoration: "none",
                color: "#f5f4df",
                display: "block",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Small links row */}
      <div
        style={{
          padding: "0 64px 32px",
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {[
          "Privacy Policy",
          "Terms of Use",
          "Impact Reporting",
          "Health Plan Transparency",
          "Safety Policy",
        ].map((link) => (
          <a
            key={link}
            href="#"
            style={{
              color: "rgba(245,244,223,0.6)",
              fontSize: "0.78rem",
              textDecoration: "none",
            }}
          >
            {link}
          </a>
        ))}
        <span
          style={{ color: "rgba(245,244,223,0.5)", fontSize: "0.78rem", marginLeft: "auto" }}
        >
          © 2026 Joby Aero, Inc.
        </span>
      </div>

      {/* Bottom band */}
      <div
        style={{
          padding: "48px 64px",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        {/* Left: large logo */}
        <Image
          src="/images/logo-animated.webp"
          alt="Joby Aviation"
          width={60}
          height={34}
        />

        {/* Right: email signup */}
        <div>
          <p
            style={{
              color: "#f5f4df",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Sign up for updates
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <input
              type="email"
              placeholder="Enter e-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.4)",
                color: "white",
                fontSize: "1.1rem",
                padding: "8px 0",
                width: "360px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={() => setEmail("")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "1.3rem",
                cursor: "pointer",
                padding: "4px",
              }}
              aria-label="Submit email"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div
        style={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          background: "#007ae5",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: "20%",
            width: "120%",
            height: 160,
            background: "#1c3f99",
            borderRadius: "50% 50% 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: "40%",
            width: "80%",
            height: 120,
            background: "#eb6110",
            borderRadius: "50% 50% 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            right: "-10%",
            width: "60%",
            height: 100,
            background: "#ffd9c9",
            borderRadius: "50% 50% 0 0",
          }}
        />
      </div>
    </footer>
  );
}
