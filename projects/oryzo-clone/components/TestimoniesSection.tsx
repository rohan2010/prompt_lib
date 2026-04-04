import Image from "next/image";

const testimonials = [
  {
    img: "/images/testimonies/astronut.webp",
    stars: "★★★★★",
    quote:
      "Finally, a coaster that works in zero gravity. Had to duct-tape it down, but still.",
    author: "Commander Neil A., ISS",
  },
  {
    img: "/images/testimonies/pirate_king.webp",
    stars: "★★★★★",
    quote:
      "Arrr, this be the finest coaster in the seven seas. Me grog stays put!",
    author: "Captain Blackcork, High Seas",
  },
  {
    img: "/images/testimonies/youtuber.webp",
    stars: "★★★★★",
    quote:
      "Just unboxed this bad boy. The ASMR of placing a mug on it is INSANE.",
    author: "@CorkReviewer, 2.3M subscribers",
  },
  {
    img: "/images/testimonies/attention.webp",
    stars: "★★★★★",
    quote: "I don't even drink hot beverages. I just wanted one.",
    author: "Anonymous",
  },
  {
    img: "/images/testimonies/flat_earth.webp",
    stars: "★★★★★",
    quote: "The circular design PROVES the earth is round. Woke up.",
    author: "Dave F., Flat Earth Society (Reformed)",
  },
];

export default function TestimoniesSection() {
  return (
    <section
      id="testimonies"
      className="section"
      style={{
        background: "var(--color-black)",
        padding: "6rem 0",
        overflow: "hidden",
      }}
    >
      <div className="o-container" style={{ marginBottom: "2.5rem" }}>
        <span
          className="label-caps"
          style={{ color: "var(--color-orange)", display: "block", marginBottom: "1rem" }}
        >
          Social proof
        </span>
        <h2
          className="display-large"
          style={{ color: "var(--color-white)", maxWidth: "600px" }}
        >
          People all around the world love Oryzo
        </h2>
        <p
          className="body-text"
          style={{
            color: "rgba(255,237,215,0.5)",
            marginTop: "1rem",
            maxWidth: "500px",
          }}
        >
          Do not take our word for it, see what people say after living with
          Oryzo.
        </p>
      </div>

      {/* Horizontal scroll strip */}
      <div
        className="h-scroll-track"
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{
              width: "320px",
              borderRadius: "16px",
              overflow: "hidden",
              background: "rgba(255,237,215,0.04)",
              border: "1px solid rgba(255,237,215,0.08)",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image */}
            <div
              style={{
                width: "100%",
                height: "180px",
                position: "relative",
                background: "rgba(56,36,22,0.4)",
                overflow: "hidden",
              }}
            >
              <Image
                src={t.img}
                alt={t.author}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>

            {/* Content */}
            <div
              style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                flex: 1,
              }}
            >
              <span style={{ color: "#f5a623", fontSize: "0.875rem" }}>
                {t.stars}
              </span>
              <p
                className="body-text"
                style={{
                  color: "var(--color-white)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <span
                className="label-caps"
                style={{
                  color: "rgba(255,237,215,0.35)",
                  fontSize: "0.5625rem",
                  marginTop: "auto",
                }}
              >
                {t.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
