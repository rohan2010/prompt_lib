"use client";
import { useEffect, useRef } from "react";

const highlights = [
  {
    num: "1",
    title: "Leave city congestion behind",
    body: "Leave city congestion behind and choose a stress-free commute through the clouds.",
    link: "Discover the Experience",
  },
  {
    num: "2",
    title: "Sit back and enjoy the view",
    body: "Sit back and enjoy the view. Our quiet, spacious cabin was designed for your comfort.",
    link: "Learn about the aircraft",
  },
  {
    num: "3",
    title: "Arrive on time, every time",
    body: "Leave the traffic below. With no roads to get stuck on, you'll always know when you'll arrive.",
    link: "Explore our routes",
  },
];

export default function ExperienceSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const imgRef1 = useRef<HTMLDivElement>(null);
  const imgRef2 = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headingRef.current, imgRef1.current, imgRef2.current, ctaRef.current, ...cardRefs.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "var(--cream)", padding: "120px 0 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        {/* Section label */}
        <span className="section-label reveal" ref={(el: HTMLSpanElement | null) => { cardRefs.current[3] = el; }}>
          Experience Highlights
        </span>

        {/* Giant heading */}
        <h2
          ref={headingRef}
          className="reveal"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--black)",
            marginTop: 24,
            marginBottom: 80,
          }}
        >
          Nowhere to go<br />but Up
        </h2>

        {/* Two-column: images left, cards right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Images collage */}
          <div style={{ position: "relative", paddingTop: 80 }}>
            {/* Small top-left image */}
            <div
              ref={imgRef1}
              className="reveal-scale"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "45%",
                aspectRatio: "3/4",
                borderRadius: 20,
                overflow: "hidden",
                background: "linear-gradient(160deg, #c08040, #7a4020, #2a1008)",
                zIndex: 2,
                boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
              }}
            >
              {/* Interior view placeholder */}
              <div style={{
                position: "absolute",
                left: "15%", top: "10%",
                width: "65%", height: "60%",
                borderRadius: "40%",
                background: "linear-gradient(145deg, #f0a040, #c07020)",
                opacity: 0.7,
              }} />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(170deg, rgba(10,5,2,.6) 50%, transparent)",
              }} />
            </div>

            {/* Large main image */}
            <div
              ref={imgRef2}
              className="reveal-scale reveal-d2"
              style={{
                marginLeft: "30%",
                aspectRatio: "3/4",
                borderRadius: 24,
                overflow: "hidden",
                background: "linear-gradient(160deg, #b8c8e0 0%, #90a8c8 40%, #6888a8 100%)",
                boxShadow: "0 16px 60px rgba(0,0,0,0.18)",
              }}
            >
              {/* Person near aircraft placeholder */}
              <div style={{
                position: "absolute",
                bottom: 0, left: "20%",
                width: "50%", height: "85%",
                background: "linear-gradient(180deg, transparent 30%, #c8b090)",
                borderRadius: "50% 50% 0 0",
              }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.3), transparent 50%)" }} />
            </div>
          </div>

          {/* Highlight cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {highlights.map((h, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  padding: "32px 0",
                  borderTop: "1px solid rgba(14,22,32,.12)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, opacity: 0.4, marginTop: 4, minWidth: 16 }}>{h.num}</span>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 10 }}>{h.title}</h3>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.65, marginBottom: 16 }}>{h.body}</p>
                    <a href="#" style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      fontSize: "0.85rem", fontWeight: 600, color: "var(--black)",
                      textDecoration: "none", opacity: 0.7,
                      borderBottom: "1px solid currentColor", paddingBottom: 1,
                    }}>
                      {h.link}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big CTA quote */}
        <div
          ref={ctaRef}
          className="reveal"
          style={{ marginTop: 120, maxWidth: 900 }}
        >
          <p style={{
            fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.25,
            marginBottom: 40,
            color: "var(--black)",
          }}>
            Imagine looking forward to your commute. And forgetting what gridlock feels like.
            When flight is a part of everyday life, anything is possible.
          </p>
          <a href="#" className="btn btn-dark">Discover the Experience</a>
        </div>
      </div>
    </section>
  );
}
