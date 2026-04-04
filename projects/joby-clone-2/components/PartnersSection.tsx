"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const tabs = [
  {
    label: "Car Service",
    desc: "We're partnering with global leaders in ground transportation to seamlessly integrate air mobility into the future of door-to-door travel.",
    partner: "Uber",
  },
  {
    label: "Airlines",
    desc: "Working with leading airlines to connect vertiports to major airport hubs, making multimodal travel seamless.",
    partner: "Delta",
  },
  {
    label: "Infrastructure",
    desc: "Collaborating with infrastructure leaders to build the vertiports and charging systems that will power our network.",
    partner: "Toyota",
  },
  {
    label: "R&D",
    desc: "Partnering with world-class research institutions to advance electric aviation technology and safety systems.",
    partner: "NASA",
  },
  {
    label: "Technology",
    desc: "Integrating cutting-edge technology platforms to deliver a seamless, app-based aerial rideshare experience.",
    partner: "Uber",
  },
];

export default function PartnersSection() {
  const [activeTab, setActiveTab] = useState(0);

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

  const current = tabs[activeTab];

  return (
    <section style={{ background: "#f5f4df", padding: "120px 64px" }}>
      {/* Heading */}
      <h2
        className="display-medium"
        style={{ textAlign: "center", marginBottom: "80px" }}
      >
        With partners like this,
        <br />
        there&apos;s nowhere to go but up.
      </h2>

      {/* 3-column layout */}
      <div
        style={{
          display: "flex",
          gap: "48px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Tabs column */}
        <div
          style={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "8px 0",
                display: "block",
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: activeTab === i ? 700 : 400,
                color: activeTab === i ? "#0e1620" : "#c7c6b6",
                fontFamily: "inherit",
                transition: "color 0.2s, font-weight 0.2s",
              }}
            >
              {activeTab === i ? "· " : ""}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Center image */}
        <div
          style={{
            width: "320px",
            height: "480px",
            borderRadius: "24px",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <Image
            src="/images/experience-1.webp"
            alt={current.label}
            fill
            style={{ objectFit: "cover" }}
            sizes="320px"
          />
        </div>

        {/* Description column */}
        <div
          style={{
            flex: 1,
            paddingLeft: "48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "#0e1620",
            }}
          >
            {current.desc}
          </p>
          <div>
            <a
              href="#"
              className="btn-dark"
              style={{
                background: "#0e1620",
                color: "#f5f4df",
                borderColor: "#0e1620",
              }}
            >
              {current.partner}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
