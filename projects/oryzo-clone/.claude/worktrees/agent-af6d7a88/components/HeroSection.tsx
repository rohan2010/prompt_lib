export default function HeroSection() {
  return (
    <section
      id="hero"
      className="section"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #3d2008 0%, #5a3010 30%, #2d4518 60%, #445231 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top-left label */}
      <div
        style={{
          position: "absolute",
          top: "7rem",
          left: "2rem",
          zIndex: 10,
        }}
      >
        <span
          className="label-caps"
          style={{ color: "var(--color-white)", opacity: 0.7 }}
        >
          Made for mugs. Built for tables.
        </span>
      </div>

      {/* Giant ORYZO text */}
      <div
        style={{
          position: "absolute",
          bottom: "12rem",
          left: "-0.02em",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <h1
          className="display-hero"
          style={{
            color: "var(--color-white)",
            opacity: 0.92,
            lineHeight: 0.85,
          }}
        >
          ORYZO
        </h1>
      </div>

      {/* Cork coaster circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(40vw, 480px)",
          height: "min(40vw, 480px)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 35% 35%, #d9904a 0%, #c8843c 30%, #a86828 70%, #8a5220 100%)",
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.6), inset 0 2px 8px rgba(255,200,140,0.3), inset 0 -4px 16px rgba(0,0,0,0.4)",
          zIndex: 8,
        }}
      >
        {/* Cork texture lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${85 - i * 9}%`,
              height: `${85 - i * 9}%`,
              borderRadius: "50%",
              border: "1px solid rgba(120,72,20,0.18)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Right center text */}
      <div
        style={{
          position: "absolute",
          right: "4rem",
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: "500px",
          zIndex: 10,
        }}
      >
        <p
          className="display-medium"
          style={{ color: "var(--color-white)", lineHeight: 1.3 }}
        >
          Designed to lift, insulate, and grip in all the right ways. Oryzo
          makes the simplest moment feel considered.
        </p>
      </div>

      {/* Bottom-left dark card */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "2rem",
          zIndex: 10,
          background: "rgba(16,9,4,0.72)",
          border: "1px solid rgba(255,237,215,0.1)",
          borderRadius: "12px",
          padding: "1.25rem 1.5rem",
          maxWidth: "340px",
          backdropFilter: "blur(8px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.75rem",
            color: "var(--color-white)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Designed by Lusion, the award-winning design studio.
        </p>
        <div
          style={{
            height: "1px",
            background: "rgba(255,237,215,0.15)",
            margin: "0.75rem 0",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "0.8125rem",
            color: "rgba(255,237,215,0.6)",
          }}
        >
          The world&apos;s most unnecessarily sophisticated cork coaster.
        </p>
      </div>

      {/* Bottom center scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          className="label-caps"
          style={{ color: "rgba(255,237,215,0.5)" }}
        >
          Scroll to continue
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{ opacity: 0.5 }}
        >
          <path
            d="M8 0V20M8 20L2 14M8 20L14 14"
            stroke="#ffedd7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom-right video thumbnail widget */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "4rem",
          zIndex: 10,
          width: "140px",
          height: "90px",
          borderRadius: "10px",
          overflow: "hidden",
          background: "rgba(16,9,4,0.6)",
          border: "1px solid rgba(255,237,215,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.375rem",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,237,215,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <path d="M1 1L9 6L1 11V1Z" fill="#ffedd7" />
            </svg>
          </div>
          <span
            className="label-caps"
            style={{ color: "rgba(255,237,215,0.6)", fontSize: "0.5rem" }}
          >
            Play
          </span>
        </div>
      </div>
    </section>
  );
}
