"use client";

import { useState } from "react";
import Image from "next/image";

const thumbs = [
  { src: "/images/wearable-gallery/thumbs/intro.webp", label: "Intro" },
  { src: "/images/wearable-gallery/thumbs/face.webp", label: "Face" },
  { src: "/images/wearable-gallery/thumbs/neck.webp", label: "Neck" },
];

export default function WearableSection() {
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <section
      id="wearable"
      className="section"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #100904 0%, #1e110a 50%, #382416 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 0",
      }}
    >
      <div
        className="o-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr 160px",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Left text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span
            className="label-caps"
            style={{ color: "var(--color-white)", opacity: 0.6 }}
          >
            So portable,
          </span>
          <h2
            className="display-medium"
            style={{
              color: "var(--color-white)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            it&apos;s wearable
          </h2>
          <p
            className="body-text"
            style={{ color: "rgba(255,237,215,0.5)", marginTop: "1rem" }}
          >
            Why put it on a table when you could put it on yourself? Oryzo goes
            everywhere you go.
          </p>
          <p
            className="label-caps"
            style={{
              color: "rgba(255,237,215,0.3)",
              fontSize: "0.5rem",
              marginTop: "2rem",
            }}
          >
            Warning — This stunt was performed by professionals. Do not attempt.
          </p>
        </div>

        {/* Center main image card */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "540px",
              margin: "0 auto",
              borderRadius: "20px",
              overflow: "hidden",
              border: "2px dashed rgba(255,237,215,0.2)",
              aspectRatio: "3/4",
              background: "rgba(56,36,22,0.6)",
            }}
          >
            <Image
              src={thumbs[activeThumb].src}
              alt={thumbs[activeThumb].label}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />

            {/* Notification card overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1rem",
                right: "1rem",
                background: "rgba(16,9,4,0.88)",
                backdropFilter: "blur(12px)",
                borderRadius: "14px",
                padding: "0.875rem 1rem",
                border: "1px solid rgba(0,220,180,0.15)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.375rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    color: "rgba(0,220,180,0.8)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  ☕ 3 &nbsp;|&nbsp; ✓ 112 bpm
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--color-white)",
                  lineHeight: 1.4,
                  marginBottom: "0.625rem",
                }}
              >
                ORYZO-1 — You only had 3 cups of coffee today. Want more?
              </p>
              <button
                style={{
                  background: "rgba(0,220,180,0.18)",
                  border: "1px solid rgba(0,220,180,0.4)",
                  borderRadius: "999px",
                  color: "rgb(0,220,180)",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.3rem 0.875rem",
                  cursor: "pointer",
                }}
              >
                Refill
              </button>
            </div>
          </div>
        </div>

        {/* Right thumb strip */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {thumbs.map((thumb, i) => (
            <button
              key={i}
              onClick={() => setActiveThumb(i)}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "12px",
                overflow: "hidden",
                border: `2px solid ${
                  activeThumb === i
                    ? "rgba(255,237,215,0.6)"
                    : "rgba(255,237,215,0.1)"
                }`,
                cursor: "pointer",
                position: "relative",
                transition: "border-color 0.2s ease",
                background: "rgba(56,36,22,0.4)",
              }}
            >
              <Image
                src={thumb.src}
                alt={thumb.label}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
