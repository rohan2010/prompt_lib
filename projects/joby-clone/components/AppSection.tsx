"use client";
import { useEffect, useRef } from "react";

export default function AppSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    [leftRef.current, rightRef.current].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "var(--cream)", paddingBottom: 0 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 32,
          alignItems: "end",
        }}>
          {/* Left: app mockup */}
          <div
            ref={leftRef}
            className="reveal-scale"
            style={{
              borderRadius: 24,
              overflow: "hidden",
              aspectRatio: "4/3",
              background: "linear-gradient(145deg, #c8a880, #8a6840, #4a3020)",
              position: "relative",
            }}
          >
            {/* Sky + city background */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #c8a868 0%, #a07840 40%, #684828 100%)",
            }} />
            {/* App UI overlay */}
            <div style={{
              position: "absolute",
              left: "50%", top: "25%",
              transform: "translateX(-50%)",
              width: "54%",
              background: "rgba(245,244,223,0.12)",
              backdropFilter: "blur(8px)",
              borderRadius: 16,
              padding: "16px 20px",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", marginBottom: 4 }}>Your Journey</p>
              <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, marginBottom: 12 }}>Today, 12:45 pm</p>
              {/* Route line */}
              <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.4)", position: "relative" }}>
                  <div style={{ position: "absolute", left: "35%", top: -7, width: 14, height: 14, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="var(--black)">
                      <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1l3.5 1v-1.5L13 19v-5.5z"/>
                    </svg>
                  </div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
              </div>
              {/* Times */}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)" }}>
                <div><div style={{ color: "#fff", fontWeight: 600 }}>12:45 pm</div><div>10 min Ride</div></div>
                <div style={{ textAlign: "center" }}><div style={{ color: "#fff", fontWeight: 600 }}>1:00 pm</div><div>15 min Flight</div></div>
                <div style={{ textAlign: "right" }}><div style={{ color: "#fff", fontWeight: 600 }}>1:15 pm</div><div>5 min Ride</div></div>
              </div>
            </div>
          </div>

          {/* Right: text + image */}
          <div ref={rightRef} className="reveal" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Right side photo */}
            <div style={{
              borderRadius: 24,
              overflow: "hidden",
              aspectRatio: "4/3",
              background: "linear-gradient(160deg, #d0c8b8, #a09080)",
              position: "relative",
            }}>
              {/* Person boarding placeholder */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: "30%",
                width: "30%",
                height: "80%",
                background: "linear-gradient(180deg, transparent, #8a7060)",
                borderRadius: "50% 50% 0 0",
              }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", background: "linear-gradient(180deg, #c0b0a0, #a09080)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.25), transparent 50%)" }} />
            </div>

            {/* Text */}
            <div>
              <span className="section-label" style={{ display: "block", marginBottom: 12 }}>Coming soon</span>
              <h2 style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: 16,
              }}>
                Seamless door to door travel, all from a few taps on our app.
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.65, opacity: 0.65 }}>
                Our app coordinates your end-to-end commute, including an Uber to and from our vertiport.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width aircraft close-up */}
      <div style={{
        width: "100%",
        aspectRatio: "21/9",
        background: "linear-gradient(135deg, #2a2420 0%, #3a3028 30%, #c0a888 70%, #e8d0b0 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Aircraft fuselage shape */}
        <div style={{
          position: "absolute",
          left: "-10%", top: "5%",
          width: "80%", height: "90%",
          background: "linear-gradient(145deg, #d8ccc0, #b8a898, #989080)",
          borderRadius: "40% 60% 60% 40%",
          transform: "rotate(-8deg)",
          boxShadow: "8px 16px 60px rgba(0,0,0,0.3)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(40,30,24,.8) 0%, transparent 50%)" }} />
      </div>
    </section>
  );
}
