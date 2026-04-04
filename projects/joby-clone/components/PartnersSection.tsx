"use client";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    name: "Car Service",
    description: "Ride-sharing partnerships connect our vertiports directly to your doorstep.",
    partners: ["Uber"],
    imgBg: "linear-gradient(160deg, #d0c8b8, #a09888)",
  },
  {
    name: "Airlines",
    description: "Our partnerships with leading global airlines will integrate our air taxi service into existing aviation networks.",
    partners: ["Delta", "Virgin Atlantic", "ANA"],
    imgBg: "linear-gradient(160deg, #b8c0c8, #889098)",
  },
  {
    name: "Infrastructure",
    description: "Working with cities and airports to build vertiports in the heart of your city.",
    partners: ["ANA Infrastructure", "Sumitomo"],
    imgBg: "linear-gradient(160deg, #c8b8a8, #988878)",
  },
  {
    name: "R&D",
    description: "Accelerating innovation through strategic research partnerships.",
    partners: ["NASA", "DARPA"],
    imgBg: "linear-gradient(160deg, #c0c8b8, #909888)",
  },
  {
    name: "Technology",
    description: "Best-in-class technology to power the future of urban air mobility.",
    partners: ["Toyota", "Intel"],
    imgBg: "linear-gradient(160deg, #b8c8c8, #889898)",
  },
  {
    name: "Government",
    description: "Working with governments worldwide to build the regulatory framework for safe air taxi operations.",
    partners: ["US Air Force", "UAE Government"],
    imgBg: "linear-gradient(160deg, #c8c0b8, #989088)",
  },
];

export default function PartnersSection() {
  const [active, setActive] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cat = categories[active];

  return (
    <section style={{ background: "var(--cream)", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <h2
          ref={sectionRef}
          className="reveal"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: 60,
            maxWidth: 700,
          }}
        >
          With partners like this,<br />there&apos;s nowhere to go but up.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 280px", gap: 48, alignItems: "start" }}>
          {/* Category nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {categories.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "10px 0",
                  fontFamily: "inherit",
                  fontSize: "1rem",
                  fontWeight: i === active ? 700 : 400,
                  color: "var(--black)",
                  opacity: i === active ? 1 : 0.45,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "opacity .2s",
                  letterSpacing: "-0.02em",
                }}
              >
                {i === active && (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--black)", flexShrink: 0 }} />
                )}
                {i !== active && <span style={{ width: 6, flexShrink: 0 }} />}
                {c.name}
              </button>
            ))}
          </nav>

          {/* Center image */}
          <div style={{
            borderRadius: 24,
            overflow: "hidden",
            aspectRatio: "3/4",
            background: cat.imgBg,
            position: "relative",
            transition: "background .4s ease",
          }}>
            {/* Worker/aviation scene placeholder */}
            <div style={{
              position: "absolute",
              left: "50%", bottom: 0,
              transform: "translateX(-50%)",
              width: "40%",
              height: "75%",
              background: "rgba(0,0,0,0.15)",
              borderRadius: "40% 40% 0 0",
            }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.2), transparent 50%)" }} />
          </div>

          {/* Right: description + logos */}
          <div style={{ paddingTop: 8 }}>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.65, opacity: 0.65, marginBottom: 32 }}>
              {cat.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {cat.partners.map((p, i) => (
                <div key={i} style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "1px solid rgba(14,22,32,.15)",
                  background: "rgba(255,255,255,0.5)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
