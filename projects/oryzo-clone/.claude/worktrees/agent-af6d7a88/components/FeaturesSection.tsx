const features = [
  {
    num: "01",
    label: "Precision-engineered lift",
    body: "With a precision-engineered lift (exactly one coaster thick), Oryzo doesn't just elevate your mug — it elevates your entire lifestyle.",
  },
  {
    num: "02",
    label: "Liquid Intelligence System",
    body: "Our revolutionary hydrophobic surface technology redirects condensation with pinpoint precision. Translation: your table stays dry.",
  },
  {
    num: "03",
    label: "Thermal Resistance Matrix",
    body: "Cork's natural cellular structure creates millions of tiny air pockets that work as insulation. Your ice stays icy. Your coffee stays hot-ish.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="section"
      style={{
        background: "var(--color-green-lightest)",
        padding: "6rem 0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="o-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left: heading + features */}
          <div>
            <span
              className="label-caps"
              style={{
                color: "var(--color-green)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Product Features
            </span>
            <h2
              className="display-large"
              style={{ color: "var(--color-black)", marginBottom: "3rem" }}
            >
              Rise above mediocrity
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {features.map((f) => (
                <div
                  key={f.num}
                  style={{
                    padding: "2rem 0",
                    borderBottom: "1px dashed rgba(16,9,4,0.2)",
                    display: "grid",
                    gridTemplateColumns: "2.5rem 1fr",
                    gap: "1rem",
                    alignItems: "start",
                  }}
                >
                  <span
                    className="label-caps"
                    style={{
                      color: "var(--color-grey-brown)",
                      paddingTop: "0.125rem",
                    }}
                  >
                    {f.num}
                  </span>
                  <div>
                    <h3
                      className="label-caps"
                      style={{
                        color: "var(--color-black)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        marginBottom: "0.625rem",
                      }}
                    >
                      {f.label}
                    </h3>
                    <p
                      className="body-text"
                      style={{ color: "var(--color-grey-brown)" }}
                    >
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: spec sheet decoration */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "4rem",
            }}
          >
            {/* Cork circle */}
            <div
              style={{
                width: "min(340px, 90%)",
                height: "min(340px, 90%)",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at 35% 35%, #d9904a 0%, #c8843c 30%, #a86828 70%, #8a5220 100%)",
                boxShadow:
                  "0 20px 80px rgba(56,36,22,0.3), inset 0 2px 8px rgba(255,200,140,0.3)",
                position: "relative",
                flexShrink: 0,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${85 - i * 12}%`,
                    height: `${85 - i * 12}%`,
                    borderRadius: "50%",
                    border: "1px solid rgba(120,72,20,0.2)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>

            {/* Spec annotations */}
            {[
              { top: "10%", left: "-10%", label: "Ø 95mm", desc: "Standard" },
              { top: "50%", right: "-5%", label: "4mm", desc: "Thickness" },
              {
                bottom: "10%",
                left: "10%",
                label: "Cork",
                desc: "Material",
              },
            ].map((ann, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...ann,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.125rem",
                }}
              >
                <span
                  className="label-caps"
                  style={{
                    color: "var(--color-black)",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                  }}
                >
                  {ann.label}
                </span>
                <span
                  className="label-caps"
                  style={{ color: "var(--color-grey-brown)", fontSize: "0.5rem" }}
                >
                  {ann.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
