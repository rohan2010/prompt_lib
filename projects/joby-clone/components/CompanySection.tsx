"use client";
import { useEffect, useRef } from "react";

export default function CompanySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "var(--cream)", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left image */}
          <div style={{
            borderRadius: 24,
            overflow: "hidden",
            aspectRatio: "3/4",
            background: "linear-gradient(160deg, #b0c0d8 0%, #8898b8 40%, #6878a0 100%)",
            position: "relative",
          }}>
            {/* Aircraft approaching with person silhouette */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #a0b8d0 0%, #7898c0 50%, #5070a0 100%)" }} />
            <div style={{
              position: "absolute",
              left: "50%", top: "30%",
              transform: "translate(-50%, -50%)",
              width: "50%", height: "28%",
              background: "rgba(240,245,255,0.8)",
              borderRadius: "45%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }} />
            <div style={{
              position: "absolute",
              left: "50%", bottom: 0,
              transform: "translateX(-50%)",
              width: "25%", height: "60%",
              background: "linear-gradient(180deg, transparent 30%, rgba(60,50,40,.7))",
              borderRadius: "40% 40% 0 0",
            }} />
          </div>

          {/* Right text */}
          <div ref={ref} className="reveal">
            <h2 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: 24,
            }}>
              The sky was never<br />the limit.
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, opacity: 0.65, marginBottom: 32, maxWidth: 420 }}>
              In 2009, a small team of Joby engineers set out to build the future of transportation.
              Today, we&apos;re bringing that vision to life with the world&apos;s first certified electric air taxi service.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#" className="btn btn-dark">Discover our Story</a>
              <a href="#" className="btn btn-outline">Work at Joby</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
