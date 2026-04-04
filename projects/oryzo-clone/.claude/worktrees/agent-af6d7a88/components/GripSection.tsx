const stats = [
  { value: "10,000", label: "Grip tests conducted" },
  { value: "0", label: "Spills recorded" },
  { value: "1", label: "Broken heart (the tester)" },
];

export default function GripSection() {
  return (
    <section
      id="grip"
      className="section"
      style={{
        background: "var(--color-black)",
        padding: "6rem 0",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,237,215,0.1), transparent)",
        }}
      />

      <div className="o-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left: text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <span
              className="label-caps"
              style={{ color: "var(--color-orange)" }}
            >
              Grip-locked Antislip Technology
            </span>

            <h2
              className="display-large"
              style={{ color: "var(--color-white)" }}
            >
              Precision Grip, Zero Drama
            </h2>

            <p
              className="body-text"
              style={{
                color: "rgba(255,237,215,0.55)",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              Micro-textured cork so grippy your drink forgot how to slide. We
              ran 10,000 grip tests. Zero spills. One broken heart (the tester
              got too attached).
            </p>
          </div>

          {/* Right: stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.value}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  padding: "1.5rem",
                  border: "1px solid rgba(255,237,215,0.08)",
                  borderRadius: "12px",
                  background: "rgba(255,237,215,0.02)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 3rem)",
                    fontWeight: 800,
                    color: "var(--color-white)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="label-caps"
                  style={{
                    color: "rgba(255,237,215,0.35)",
                    fontSize: "0.5625rem",
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
