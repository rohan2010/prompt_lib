export default function StorySection() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0a0f1a 0%, #1a2540 50%, #0e1620 100%)",
      }}
    >
      {/* Decorative tail number */}
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "15rem",
          fontWeight: 700,
          color: "white",
          opacity: 0.05,
          userSelect: "none",
          whiteSpace: "nowrap",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
        }}
      >
        N542BJ
      </span>

      {/* Left content */}
      <div
        style={{
          position: "absolute",
          left: "64px",
          bottom: "80px",
          zIndex: 2,
        }}
      >
        <h2
          className="display-large"
          style={{ color: "#f5f4df", maxWidth: "500px" }}
        >
          The sky was never the limit.
        </h2>
        <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
          <a href="#" className="btn">
            Discover our Story
          </a>
          <a
            href="#"
            className="btn-outline"
            style={{
              color: "#f5f4df",
              borderColor: "rgba(245,244,223,0.4)",
            }}
          >
            Work at Joby
          </a>
        </div>
      </div>

      {/* Right content */}
      <p
        style={{
          color: "rgba(245,244,223,0.7)",
          maxWidth: "320px",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          position: "absolute",
          right: "64px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        In 2009, a small team of Joby engineers set out to build the future of
        flight. Thousands of test flights later, we&apos;ve turned &ldquo;what if&rdquo; into
        &ldquo;what&apos;s next&rdquo;?
      </p>
    </section>
  );
}
