export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        background: "linear-gradient(180deg, #1a1005 0%, #0e1620 100%)",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Hero text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "140px",
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#f5f4df",
          zIndex: 2,
        }}
      >
        <h1 className="display-hero">
          Skip traffic.
          <br />
          Time to fly.
        </h1>
      </div>

      {/* Blue rounded band at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "-2px",
          left: 0,
          right: 0,
          height: "120px",
          background: "#007ae5",
          borderRadius: "48px 48px 0 0",
          zIndex: 2,
        }}
      />

      {/* Bottom blue band text */}
      <p
        style={{
          position: "absolute",
          bottom: "40px",
          width: "100%",
          textAlign: "center",
          color: "#f5f4df",
          fontSize: "0.9rem",
          fontWeight: 400,
          zIndex: 3,
        }}
      >
        The future of aviation is coming soon.
      </p>
    </section>
  );
}
