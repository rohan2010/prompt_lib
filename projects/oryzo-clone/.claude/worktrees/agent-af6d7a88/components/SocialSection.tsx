import Image from "next/image";

const socialImages = [
  { src: "/images/social-content/edge.webp", label: "Edge" },
  { src: "/images/social-content/sticker_1.webp", label: "Sticker" },
  { src: "/images/social-content/always_on.webp", label: "Always On" },
  { src: "/images/social-content/color.webp", label: "Color" },
  { src: "/images/social-content/3090.webp", label: "3090" },
  { src: "/images/social-content/perfect.webp", label: "Perfect" },
  { src: "/images/social-content/drop_test.webp", label: "Drop Test" },
  { src: "/images/social-content/legacy_support.webp", label: "Legacy Support" },
];

export default function SocialSection() {
  return (
    <section
      id="social"
      className="section"
      style={{
        background: "var(--color-black)",
        padding: "6rem 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,237,215,0.06)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 0,
          alignItems: "center",
          minHeight: "360px",
        }}
      >
        {/* Left text column */}
        <div
          style={{
            padding: "0 2rem 0 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <span
            className="label-caps"
            style={{ color: "rgba(255,237,215,0.3)", fontSize: "0.5625rem" }}
          >
            Always On — 24/7 uptime. No power required.
          </span>
          <h3
            className="display-medium"
            style={{
              color: "var(--color-white)",
              fontWeight: 700,
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
            }}
          >
            Runs on the edge
          </h3>
          <h3
            className="display-medium"
            style={{
              color: "var(--color-white)",
              fontWeight: 700,
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
            }}
          >
            Refuses the cloud
          </h3>
          <span
            className="label-caps"
            style={{
              color: "var(--color-orange)",
              marginTop: "0.5rem",
            }}
          >
            On-device.
          </span>
        </div>

        {/* Right: horizontal scrolling images */}
        <div
          className="h-scroll-track"
          style={{ paddingRight: "2rem" }}
        >
          {socialImages.map((img, i) => (
            <div
              key={i}
              style={{
                width: "300px",
                height: "320px",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                background: "rgba(56,36,22,0.4)",
                border: "1px solid rgba(255,237,215,0.06)",
                flexShrink: 0,
              }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
