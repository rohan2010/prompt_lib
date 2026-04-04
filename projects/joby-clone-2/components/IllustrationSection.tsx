"use client";

import { useEffect } from "react";

const panels = [
  {
    label: "Future Vision — 1",
    heading: "Where every cross-town invitation is a definite \u2018yes\u2019.",
  },
  {
    label: "Future Vision — 2",
    heading:
      "Where game day is gridlock-free and every restaurant is local.",
  },
  {
    label: "Future Vision — 3",
    heading: "Where our cities are greener, more friendly places to be.",
  },
];

export default function IllustrationSection() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "#007ae5",
        position: "relative",
        overflow: "hidden",
        minHeight: "400vh",
      }}
    >
      {/* Decorative cloud shapes */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "500px",
          height: "300px",
          background: "white",
          borderRadius: "50%",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "-10%",
          width: "400px",
          height: "240px",
          background: "white",
          borderRadius: "50%",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "10%",
          width: "350px",
          height: "200px",
          background: "white",
          borderRadius: "50%",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "5%",
          width: "450px",
          height: "260px",
          background: "white",
          borderRadius: "50%",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />

      {/* Floating abstract aircraft icons */}
      <svg
        viewBox="0 0 80 40"
        width={80}
        height={40}
        style={{
          position: "absolute",
          top: "15%",
          left: "60%",
          opacity: 0.15,
          fill: "white",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <ellipse cx="40" cy="20" rx="38" ry="8" />
        <ellipse cx="10" cy="12" rx="8" ry="3" transform="rotate(-20 10 12)" />
        <ellipse cx="70" cy="12" rx="8" ry="3" transform="rotate(20 70 12)" />
        <circle cx="40" cy="20" r="4" />
      </svg>
      <svg
        viewBox="0 0 80 40"
        width={60}
        height={30}
        style={{
          position: "absolute",
          top: "45%",
          right: "20%",
          opacity: 0.12,
          fill: "white",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <ellipse cx="40" cy="20" rx="38" ry="8" />
        <ellipse cx="10" cy="12" rx="8" ry="3" transform="rotate(-20 10 12)" />
        <ellipse cx="70" cy="12" rx="8" ry="3" transform="rotate(20 70 12)" />
        <circle cx="40" cy="20" r="4" />
      </svg>

      {/* Section label at top */}
      <div style={{ padding: "80px 64px 0" }}>
        <p className="section-label" style={{ color: "white" }}>
          Dream of Flight
        </p>
      </div>

      {/* Panels */}
      {panels.map((panel, i) => (
        <div
          key={i}
          className="reveal"
          style={{
            padding: "120px 64px",
            transitionDelay: `${i * 100}ms`,
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              opacity: 0.7,
              color: "#f5f4df",
              marginBottom: "24px",
            }}
          >
            {panel.label}
          </p>
          <h3
            className="display-large"
            style={{ color: "#f5f4df", maxWidth: "600px" }}
          >
            {panel.heading}
          </h3>
        </div>
      ))}
    </section>
  );
}
