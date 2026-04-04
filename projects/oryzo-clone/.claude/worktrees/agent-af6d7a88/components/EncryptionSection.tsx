"use client";

import { useState } from "react";

export default function EncryptionSection() {
  const [inputValue, setInputValue] = useState("ORYZO");
  const [flipped, setFlipped] = useState(false);

  const handleDecode = () => {
    setFlipped(true);
    setTimeout(() => setFlipped(false), 2000);
  };

  return (
    <section
      id="encryption"
      className="section"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #3a4a28 0%, #2d3a1e 50%, #445231 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 0",
      }}
    >
      {/* Decorative grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,237,215,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,237,215,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        className="o-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: text + demo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <span
            className="label-caps"
            style={{ color: "rgba(255,237,215,0.5)" }}
          >
            Secure Communications Simplified
          </span>

          <h2
            className="display-large"
            style={{ color: "var(--color-white)", fontWeight: 800 }}
          >
            Smart Flip Encryption
          </h2>

          <p
            className="body-text"
            style={{
              color: "rgba(255,237,215,0.6)",
              maxWidth: "440px",
              lineHeight: 1.7,
            }}
          >
            Write a message. Flip. Instantly secure — until someone flips it
            back. Genius.
          </p>

          {/* Interactive demo */}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px dashed rgba(255,237,215,0.4)",
                color: "var(--color-white)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                outline: "none",
                width: "100%",
                padding: "0.5rem 0",
                transition: "transform 0.4s ease",
                transform: flipped ? "rotate(180deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            />

            <div>
              <button onClick={handleDecode} className="btn-dark">
                Decode Message
              </button>
            </div>

            <p
              className="label-caps"
              style={{
                color: "rgba(255,237,215,0.25)",
                fontSize: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {flipped ? "Decoding..." : "Enter a message and press decode"}
            </p>
          </div>
        </div>

        {/* Right: cork coaster visual */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "min(360px, 90%)",
              height: "min(360px, 90%)",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 35% 35%, #d9904a 0%, #c8843c 30%, #a86828 70%, #8a5220 100%)",
              boxShadow:
                "0 40px 120px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,200,140,0.3)",
              position: "relative",
              flexShrink: 0,
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: `${85 - i * 10}%`,
                  height: `${85 - i * 10}%`,
                  borderRadius: "50%",
                  border: "1px solid rgba(120,72,20,0.2)",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
            {/* Flip label */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span
                className="label-caps"
                style={{
                  color: "rgba(120,72,20,0.7)",
                  fontSize: "0.5625rem",
                }}
              >
                Flip to decode
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
