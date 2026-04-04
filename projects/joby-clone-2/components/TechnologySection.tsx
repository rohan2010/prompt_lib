import Image from "next/image";

export default function TechnologySection() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#0e1620",
      }}
    >
      {/* Background image */}
      <Image
        src="/images/technology-bg.webp"
        alt="Joby aircraft technology"
        fill
        style={{ objectFit: "cover" }}
        priority
        sizes="100vw"
      />

      {/* Left content - bottom left */}
      <div
        style={{
          position: "absolute",
          left: "64px",
          bottom: "64px",
          zIndex: 2,
        }}
      >
        <h2 className="display-large" style={{ color: "#f5f4df" }}>
          Technology that makes
          <br />
          the dream possible
        </h2>
        <a href="#" className="btn" style={{ marginTop: "32px" }}>
          Explore
        </a>
      </div>

      {/* Right content - bottom right */}
      <div
        style={{
          position: "absolute",
          right: "64px",
          bottom: "64px",
          textAlign: "right",
          zIndex: 2,
        }}
      >
        <p
          style={{
            color: "rgba(245,244,223,0.8)",
            fontSize: "0.9rem",
            fontWeight: 400,
            lineHeight: 2,
          }}
        >
          · Vertical take-off and landing
          <br />
          · 200 mph top speed
          <br />
          · Zero operating emissions
        </p>
      </div>
    </section>
  );
}
