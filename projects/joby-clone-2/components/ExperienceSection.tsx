"use client";

import { useEffect } from "react";
import Image from "next/image";

const cards = [
  {
    num: "1",
    img: "/images/experience-1.webp",
    desc: "Leave city congestion behind and choose a stress-free commute through the clouds.",
  },
  {
    num: "2",
    img: "/images/experience-2.webp",
    desc: "Sit back and enjoy.\nBreathtaking views come standard with every seat.",
  },
  {
    num: "3",
    img: "/images/experience-3.webp",
    desc: "Enjoy seamless travel with a choreographed rideshare to the vertiport.",
  },
];

export default function ExperienceSection() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      style={{
        background:
          "linear-gradient(to bottom, #007ae5 0%, #007ae5 50%, #f5f4df 100%)",
      }}
    >
      <div
        style={{
          padding: "120px 64px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <p className="section-label" style={{ color: "#f5f4df", opacity: 0.7 }}>
          Experience Highlights
        </p>
        <h2
          className="display-large"
          style={{ color: "#f5f4df", marginBottom: "80px" }}
        >
          Nowhere to go
          <br />
          but Up
        </h2>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.num}
              className="reveal"
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                background: "#0e1620",
                width: "340px",
                aspectRatio: "2/3",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Number badge */}
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  color: "#f5f4df",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  zIndex: 2,
                }}
              >
                {card.num}
              </span>

              {/* Background image */}
              <Image
                src={card.img}
                alt={`Experience ${card.num}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="340px"
              />

              {/* Bottom overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "32px",
                  background:
                    "linear-gradient(transparent, rgba(14,22,32,0.8))",
                  zIndex: 2,
                }}
              >
                <p
                  style={{
                    color: "#f5f4df",
                    fontSize: "1rem",
                    lineHeight: 1.4,
                    fontWeight: 400,
                    marginBottom: "12px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {card.desc}
                </p>
                <a
                  href="#"
                  className="link-underline"
                  style={{ color: "#f5f4df", fontSize: "0.85rem" }}
                >
                  Discover the Experience
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <a
            href="#"
            style={{
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Let&apos;s fly →
          </a>
        </div>
      </div>
    </section>
  );
}
