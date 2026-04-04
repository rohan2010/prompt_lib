export default function AISection() {
  return (
    <section
      id="ai"
      className="section"
      style={{
        minHeight: "100vh",
        background: "var(--color-black)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,237,215,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,237,215,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Decorative dots top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "3rem",
          right: "3rem",
          display: "grid",
          gridTemplateColumns: "repeat(6, 8px)",
          gap: "8px",
          opacity: 0.2,
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "var(--color-white)",
            }}
          />
        ))}
      </div>

      {/* Decorative dots bottom-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "3rem",
          display: "grid",
          gridTemplateColumns: "repeat(6, 8px)",
          gap: "8px",
          opacity: 0.2,
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "var(--color-white)",
            }}
          />
        ))}
      </div>

      <div
        className="o-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "2rem",
          padding: "6rem 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Label */}
        <span
          className="label-caps"
          style={{ color: "var(--color-orange)", marginBottom: "0.5rem" }}
        >
          Artisanal Intelligence
        </span>

        {/* Big italic text */}
        <h2
          className="display-large"
          style={{
            color: "var(--color-white)",
            fontStyle: "italic",
            maxWidth: "900px",
            lineHeight: 1.05,
          }}
        >
          isn&apos;t just a coaster.
        </h2>

        {/* Subheading */}
        <p
          className="display-medium"
          style={{
            color: "rgba(255,237,215,0.65)",
            maxWidth: "700px",
            marginTop: "1rem",
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          Oryzo isn&apos;t just a coaster. It&apos;s the result of
          unprecedented AI* breakthroughs in material science, thermodynamic
          optimization, and surface topology engineering.
        </p>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "4rem",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,237,215,0.2), transparent)",
            marginTop: "1rem",
          }}
        />

        {/* Footnote */}
        <p
          className="label-caps"
          style={{
            color: "rgba(255,237,215,0.35)",
            fontSize: "0.5625rem",
          }}
        >
          * AI stands for Artisanal Intelligence
        </p>
      </div>
    </section>
  );
}
