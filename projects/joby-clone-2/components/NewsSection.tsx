"use client";

import { useEffect } from "react";
import Image from "next/image";

const articles = [
  {
    img: "/images/news-1.webp",
    date: "Mar 13, 2026",
    title:
      "Joby Completes Piloted Electric Air Taxi Flight Across San Francisco Bay and Around the Golden Gate",
  },
  {
    img: "/images/news-2.webp",
    date: "Mar 11, 2026",
    title: "Joby's First FAA-Conforming Aircraft Takes Flight",
  },
  {
    img: "/images/news-3.webp",
    date: "Mar 9, 2026",
    title:
      "Joby to Begin U.S. Operations in 2026 Under White House Air Taxi Program",
  },
];

export default function NewsSection() {
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
    <section style={{ background: "#f5f4df", padding: "120px 64px" }}>
      {/* Heading row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "48px",
        }}
      >
        <h2 className="display-medium">News from above</h2>
        <a
          href="#"
          style={{
            color: "#0e1620",
            fontSize: "0.9rem",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          View all News →
        </a>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {articles.map((article, i) => (
          <article
            key={i}
            className="reveal"
            style={{
              flex: "1",
              minWidth: "280px",
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {/* Image */}
            <div
              style={{
                aspectRatio: "16/9",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                width: "100%",
              }}
            >
              <Image
                src={article.img}
                alt={article.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Date */}
            <p
              style={{
                color: "#c7c6b6",
                fontSize: "0.78rem",
                fontWeight: 500,
                marginTop: "16px",
              }}
            >
              {article.date}
            </p>

            {/* Title */}
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                lineHeight: 1.35,
                marginTop: "8px",
                color: "#0e1620",
              }}
            >
              {article.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
