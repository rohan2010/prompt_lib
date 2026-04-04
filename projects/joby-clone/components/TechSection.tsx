"use client";
import { useEffect, useRef } from "react";

const specs = [
  { value: "200", unit: "mph", label: "Top speed" },
  { value: "150", unit: "mi", label: "Range per charge" },
  { value: "6", unit: "×", label: "Times quieter than helicopter" },
  { value: "0", unit: "", label: "Operating emissions" },
];

export default function TechSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    [titleRef.current, specsRef.current, imgRef.current].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "var(--cream)", padding: "120px 0 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left text */}
          <div ref={titleRef} className="reveal">
            <span className="section-label" style={{ display: "block", marginBottom: 16 }}>Technology</span>
            <h2 style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: 32,
            }}>
              Technology that makes<br />the dream possible
            </h2>
            <a href="#" className="btn btn-dark" style={{ marginBottom: 60 }}>Explore</a>

            {/* Specs grid */}
            <div
              ref={specsRef}
              className="reveal reveal-d1"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 48 }}
            >
              {specs.map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "var(--black)",
                  }}>
                    {s.value}<span style={{ fontSize: "55%", opacity: 0.6, marginLeft: 2 }}>{s.unit}</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", opacity: 0.55, marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: aircraft image */}
          <div
            ref={imgRef}
            className="reveal-scale reveal-d1"
            style={{
              borderRadius: 24,
              overflow: "hidden",
              aspectRatio: "1",
              background: "linear-gradient(135deg, #c8c0b8 0%, #a8a098 40%, #888078 100%)",
              position: "relative",
            }}
          >
            {/* Joby aircraft top-down / 3/4 view placeholder */}
            <div style={{
              position: "absolute",
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: "75%",
              height: "55%",
              background: "linear-gradient(145deg, #f0ece8, #d8d0c8)",
              borderRadius: "45% 45% 35% 35%",
              boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
            }} />
            {/* Rotors */}
            {[
              { left: "12%", top: "20%" },
              { right: "12%", top: "20%" },
              { left: "12%", bottom: "20%" },
              { right: "12%", bottom: "20%" },
              { left: "50%", top: "8%" },
              { left: "50%", bottom: "8%" },
            ].map((pos, i) => (
              <div key={i} style={{
                position: "absolute",
                ...pos,
                transform: "translate(-50%, -50%)",
                width: "14%",
                height: "14%",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.12)",
              }} />
            ))}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 40%, transparent 30%, rgba(0,0,0,.15) 100%)" }} />
            {/* Joby logo on aircraft */}
            <div style={{
              position: "absolute",
              left: "50%", top: "45%",
              transform: "translate(-50%, -50%)",
              color: "var(--dark-blue)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: ".05em",
              opacity: 0.6,
            }}>
              ∿ Joby
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
