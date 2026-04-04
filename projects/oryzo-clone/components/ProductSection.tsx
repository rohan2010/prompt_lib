"use client";

import { useState } from "react";

const products = [
  { id: "oryzo", name: "ORYZO", price: "from $12", desc: "The original." },
  { id: "pro", name: "ORYZO Pro", price: "from $14", desc: "For power users." },
  {
    id: "max",
    name: "ORYZO Pro Max",
    price: "from $19",
    desc: "Unreasonably premium.",
  },
];

export default function ProductSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="product"
      className="section"
      style={{
        background: "var(--color-black)",
        padding: "6rem 0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,237,215,0.06)",
      }}
    >
      <div
        className="o-container"
        style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
      >
        {/* Heading */}
        <div>
          <span
            className="label-caps"
            style={{ color: "rgba(255,237,215,0.4)", display: "block", marginBottom: "1rem" }}
          >
            Configure your coaster
          </span>
          <h2 className="display-large" style={{ color: "var(--color-white)" }}>
            Choose your{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-white)" }}>
              own
            </em>
          </h2>
        </div>

        {/* Product selector tabs */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              style={{
                background: "none",
                border: `1px solid ${active === i ? "rgba(255,237,215,0.6)" : "rgba(255,237,215,0.12)"}`,
                borderRadius: "999px",
                padding: "0.625rem 1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                transition: "border-color 0.2s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color:
                    active === i
                      ? "var(--color-white)"
                      : "rgba(255,237,215,0.35)",
                  transition: "color 0.2s ease",
                }}
              >
                {p.name}
              </span>
              <span
                className="label-caps"
                style={{
                  color: "rgba(255,237,215,0.3)",
                  fontSize: "0.5625rem",
                }}
              >
                {p.price}
              </span>
            </button>
          ))}
        </div>

        {/* Product display */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,237,215,0.06)",
          }}
        >
          {/* Big name */}
          <div>
            {/* Layered doubled text effect */}
            <div style={{ position: "relative" }}>
              <h3
                aria-hidden
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 8vw, 8rem)",
                  fontWeight: 800,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,237,215,0.15)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  position: "absolute",
                  top: "6px",
                  left: "4px",
                  userSelect: "none",
                }}
              >
                {products[active].name}
              </h3>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 8vw, 8rem)",
                  fontWeight: 800,
                  color: "var(--color-white)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  position: "relative",
                }}
              >
                {products[active].name}
              </h3>
            </div>

            <p
              className="body-text"
              style={{
                color: "rgba(255,237,215,0.45)",
                marginTop: "1.5rem",
              }}
            >
              {products[active].desc}
            </p>

            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <button className="btn-primary">Order Now</button>
              <button className="btn-dark">Learn More</button>
            </div>
          </div>

          {/* Cork coaster */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "min(300px, 80%)",
                height: "min(300px, 80%)",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at 35% 35%, #d9904a 0%, #c8843c 30%, #a86828 70%, #8a5220 100%)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
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
              {/* Pro badge */}
              {active > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(16,9,4,0.85)",
                    borderRadius: "999px",
                    padding: "0.375rem 0.875rem",
                    border: "1px solid rgba(255,237,215,0.2)",
                  }}
                >
                  <span
                    className="label-caps"
                    style={{
                      color: "var(--color-white)",
                      fontSize: "0.5625rem",
                    }}
                  >
                    {active === 1 ? "PRO" : "PRO MAX"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
