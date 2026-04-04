"use client";
import { useEffect, useRef } from "react";

const articles = [
  {
    date: "Mar 13, 2026",
    title: "Joby Completes Piloted Electric Air Taxi Flight Across San Francisco Bay and Around the Golden Gate",
    imgBg: "linear-gradient(160deg, #5888b8 0%, #4070a0 40%, #2a5080 100%)",
    city: "San Francisco",
  },
  {
    date: "Mar 11, 2026",
    title: "Joby's First FAA-Conforming Aircraft Takes Flight",
    imgBg: "linear-gradient(160deg, #9ab8c8 0%, #7898a8 40%, #5878a0 100%)",
    city: "Coastal Range",
  },
  {
    date: "Mar 9, 2026",
    title: "Joby to Begin U.S. Operations in 2026 Under White House Air Taxi Program",
    imgBg: "linear-gradient(160deg, #c8b8a8 0%, #a89888 40%, #888070 100%)",
    city: "Washington DC",
  },
];

export default function NewsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    [headingRef.current, ...cardRefs.current].filter(Boolean).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "var(--cream)", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        {/* Heading row */}
        <div ref={headingRef} className="reveal" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 60 }}>
          <h2 style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}>
            News from above
          </h2>
          <a href="#" className="btn btn-dark" style={{ marginTop: 8, flexShrink: 0 }}>View all News</a>
        </div>

        {/* 3-column news cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {articles.map((article, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`reveal reveal-d${i + 1}`}
              style={{ cursor: "pointer" }}
            >
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: "0.78rem", opacity: 0.5, fontWeight: 500 }}>{article.date}</span>
              </div>
              <h3 style={{
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.4,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: "1px solid rgba(14,22,32,.1)",
              }}>
                {article.title}
              </h3>
              {/* Image */}
              <div style={{
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "4/3",
                background: article.imgBg,
                position: "relative",
              }}>
                {/* Aircraft in flight placeholder */}
                <div style={{
                  position: "absolute",
                  left: "50%", top: "40%",
                  transform: "translate(-50%, -50%)",
                  width: "45%",
                  height: "30%",
                  background: "rgba(240,240,240,0.85)",
                  borderRadius: "45%",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.2), transparent 50%)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
