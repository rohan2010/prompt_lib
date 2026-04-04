export default function FooterSection() {
  return (
    <footer
      id="footer"
      style={{
        background: "var(--color-black)",
        padding: "6rem 2rem 3rem",
        borderTop: "1px solid rgba(255,237,215,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      {/* Main message */}
      <span className="label-caps" style={{ color: "rgba(255,237,215,0.35)" }}>
        Reality check
      </span>

      <h2
        className="display-medium"
        style={{
          color: "var(--color-white)",
          maxWidth: "600px",
          fontWeight: 700,
        }}
      >
        We caught your attention with a non-existent product.
      </h2>

      <p
        className="body-text"
        style={{
          color: "rgba(255,237,215,0.5)",
          maxWidth: "480px",
          lineHeight: 1.7,
        }}
      >
        If we can sell a coaster, imagine what we can do for your brand.
      </p>

      {/* CTA email */}
      <a
        href="mailto:hello@lusion.co"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.25rem, 3vw, 2.5rem)",
          color: "var(--color-white)",
          textDecoration: "underline",
          textDecorationColor: "rgba(255,237,215,0.3)",
          textUnderlineOffset: "0.25em",
          marginTop: "1rem",
          transition: "text-decoration-color 0.2s ease",
          letterSpacing: "-0.02em",
        }}
      >
        hello@lusion.co
      </a>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "1px",
          background: "rgba(255,237,215,0.08)",
          marginTop: "3rem",
        }}
      />

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span
          className="label-caps"
          style={{ color: "rgba(255,237,215,0.25)", fontSize: "0.5625rem" }}
        >
          © 2025 Lusion
        </span>
        <span
          className="label-caps"
          style={{
            color: "rgba(255,237,215,0.25)",
            fontSize: "0.5625rem",
            textAlign: "right",
          }}
        >
          Oryzo is a fictional product. No coasters were actually engineered.
        </span>
      </div>
    </footer>
  );
}
