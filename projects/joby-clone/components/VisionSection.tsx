"use client";
import { useEffect, useRef } from "react";

export default function VisionSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    [textRef.current, imgRef.current].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "var(--blue)", overflow: "hidden" }}>
      {/* Top label bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "24px 40px",
        color: "rgba(255,255,255,0.65)",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: ".06em",
        textTransform: "uppercase",
      }}>
        <span>Our future vision</span>
        <span>New wave aviation</span>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 40px 0" }}>
        <div ref={textRef} className="reveal">
          {/* Marquee heading */}
          <div className="marquee-wrapper" style={{ marginBottom: 16 }}>
            <div className="marquee-track">
              {[...Array(4)].map((_, i) => (
                <span key={i} style={{
                  fontSize: "clamp(4rem, 12vw, 10rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.12)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}>
                  Dream of Flight &nbsp;&nbsp;
                </span>
              ))}
            </div>
          </div>

          {/* Sub copy */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 60 }}>
            <div>
              <p style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.3, color: "#fff" }}>
                Imagine a world where every cross-town invitation is a definite &apos;yes&apos;.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
                We&apos;re building a new wave of aviation — one that makes flight as routine as riding a bus,
                as quiet as a whisper, and as clean as the sky itself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width illustration */}
      <div
        ref={imgRef}
        className="reveal-scale"
        style={{
          width: "100%",
          aspectRatio: "21/10",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, var(--blue) 0%, #1050c0 100%)",
        }}
      >
        {/* Illustrated city scene with people on vertiport */}
        {/* Sky gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #1c60e0 0%, #2870f0 60%, #1850c8 100%)" }} />

        {/* City buildings (back) */}
        {[
          { left: "5%", width: "6%", height: "55%", color: "#c84020" },
          { left: "12%", width: "4%", height: "70%", color: "#d86030" },
          { left: "17%", width: "8%", height: "45%", color: "#c85028" },
          { left: "70%", width: "5%", height: "60%", color: "#c84020" },
          { left: "77%", width: "7%", height: "50%", color: "#e07040" },
          { left: "85%", width: "4%", height: "65%", color: "#d05030" },
          { left: "91%", width: "6%", height: "45%", color: "#c84020" },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute",
            left: b.left,
            bottom: "20%",
            width: b.width,
            height: b.height,
            background: b.color,
            borderRadius: "4px 4px 0 0",
          }} />
        ))}

        {/* Trees (dark blue blob shapes) */}
        {[
          { left: "0%", size: "18%", bottom: "28%" },
          { left: "15%", size: "14%", bottom: "30%" },
          { left: "26%", size: "12%", bottom: "32%" },
          { right: "0%", size: "16%", bottom: "28%" },
          { right: "15%", size: "14%", bottom: "30%" },
          { right: "27%", size: "10%", bottom: "32%" },
        ].map((t, i) => (
          <div key={i} style={{
            position: "absolute",
            ...(t.left !== undefined ? { left: t.left } : { right: t.right }),
            bottom: t.bottom,
            width: t.size,
            aspectRatio: "1",
            background: "#1c3a8c",
            borderRadius: "50%",
          }} />
        ))}

        {/* Vertiport platform */}
        <div style={{
          position: "absolute",
          left: "30%", right: "30%",
          bottom: "20%",
          height: "6%",
          background: "#e8d0b8",
          borderRadius: 4,
        }} />

        {/* People on platform */}
        {[
          { left: "35%", height: "12%", color: "#b83020" },
          { left: "40%", height: "14%", color: "#c84030" },
          { left: "55%", height: "13%", color: "#b83020" },
          { left: "62%", height: "11%", color: "#e07060" },
        ].map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            left: p.left,
            bottom: "26%",
            width: "3%",
            height: p.height,
            background: p.color,
            borderRadius: "50% 50% 0 0",
          }} />
        ))}

        {/* Ground */}
        <div style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          height: "20%",
          background: "#1848b0",
        }} />

        {/* Joby aircraft in sky */}
        <div style={{
          position: "absolute",
          left: "50%", top: "20%",
          transform: "translateX(-50%)",
          width: "12%",
          height: "7%",
          background: "rgba(240,245,255,0.9)",
          borderRadius: "50%",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }} />
      </div>
    </section>
  );
}
