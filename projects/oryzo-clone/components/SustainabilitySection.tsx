const stats = [
  { value: "100%", label: "Sustainably sourced" },
  { value: "0", label: "Animals harmed" },
  { value: "∞", label: "Trees that volunteered" },
];

export default function SustainabilitySection() {
  return (
    <section
      id="sustainability"
      className="section"
      style={{
        background: "var(--color-green)",
        padding: "6rem 0",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background cork texture circle */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 35% 35%, rgba(200,132,60,0.18) 0%, rgba(168,104,40,0.08) 60%, transparent 100%)",
          border: "1px solid rgba(255,237,215,0.05)",
          pointerEvents: "none",
        }}
      />

      <div className="o-container" style={{ position: "relative", zIndex: 1 }}>
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
              style={{ color: "rgba(255,237,215,0.6)" }}
            >
              100% Plant-based
            </span>

            <h2
              className="display-large"
              style={{ color: "var(--color-white)" }}
            >
              Vegan-friendly sustainability
            </h2>

            <p
              className="body-text"
              style={{
                color: "rgba(255,237,215,0.65)",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              Pure cork sourced sustainably. Completely vegan — no animals were
              harmed in the making of your coaster. Several oak trees gave their
              bark willingly.
            </p>
          </div>

          {/* Right: stats + circle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "flex-start",
            }}
          >
            {/* Cork circle */}
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at 35% 35%, #d9904a 0%, #c8843c 30%, #a86828 70%, #8a5220 100%)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                position: "relative",
                flexShrink: 0,
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${80 - i * 14}%`,
                    height: `${80 - i * 14}%`,
                    borderRadius: "50%",
                    border: "1px solid rgba(120,72,20,0.2)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "2rem" }}>
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                      fontWeight: 800,
                      color: "var(--color-white)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="label-caps"
                    style={{
                      color: "rgba(255,237,215,0.45)",
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
      </div>
    </section>
  );
}
