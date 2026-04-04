"use client";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 192;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

// Text slides keyed to scroll progress thresholds
const textSlides = [
  {
    from: 0,
    to: 0.3,
    main: "Skip traffic.\nTime to fly.",
    sub: "The future of aviation is coming soon.",
    showMain: true,
  },
  {
    from: 0.3,
    to: 0.65,
    caption: "Elevate your commute with our\nall-electric air taxi, soon to be\nbookable at the tap of a button.",
    showMain: false,
  },
  {
    from: 0.65,
    to: 1,
    caption: "Zero traffic. Zero operating\nemissions. Just the space and\ntime your day deserves.",
    showMain: false,
  },
];

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = cw / ch;
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

  if (imgAspect > canvasAspect) {
    sw = img.naturalHeight * canvasAspect;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasAspect;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        loadedRef.current = loaded;
        if (loaded === TOTAL_FRAMES) setReady(true);
        // Draw first frame as soon as it loads
        if (i === 0) drawFrame(0);
      };
      images.push(img);
    }
    framesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawFrame(idx: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = framesRef.current[idx];
    if (!img?.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawCover(ctx, img, canvas.width, canvas.height);
  }

  // Resize canvas to match viewport
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll → frame index
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScroll = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(1, scrolled / totalScroll);

      setProgress(p);

      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.round(p * (TOTAL_FRAMES - 1))
      );

      if (targetFrame === currentFrameRef.current) return;
      currentFrameRef.current = targetFrame;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(targetFrame));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine active text slide
  const activeSlide = textSlides.find(
    (s) => progress >= s.from && progress < s.to
  ) ?? textSlides[textSlides.length - 1];

  const captionSlide = !activeSlide.showMain ? activeSlide : null;

  return (
    <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Canvas frame scrubber */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Loading indicator */}
        {!ready && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0e1620",
          }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: ".12em", fontWeight: 600 }}>
              LOADING
            </div>
          </div>
        )}

        {/* Dark gradient overlays */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }} />

        {/* Rounded bottom clip matching the real site */}
        <div style={{
          position: "absolute",
          bottom: -2,
          left: "2%",
          right: "2%",
          height: 48,
          background: "var(--cream)",
          borderRadius: "50% 50% 0 0",
          pointerEvents: "none",
        }} />

        {/* Main hero title — visible at start */}
        <div style={{
          position: "absolute",
          bottom: "14%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "#fff",
          opacity: progress < 0.25 ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          width: "max-content",
        }}>
          <h1 style={{
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            whiteSpace: "pre-line",
            textAlign: "center",
            textShadow: "0 2px 24px rgba(0,0,0,0.3)",
          }}>
            {"Skip traffic.\nTime to fly."}
          </h1>
        </div>

        {/* Subtitle — center, visible at start */}
        <div style={{
          position: "absolute",
          bottom: "6.5%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.8)",
          fontSize: "0.9rem",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          opacity: progress < 0.2 ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}>
          The future of aviation is coming soon.
        </div>

        {/* Scroll-driven caption — left side */}
        {captionSlide && (
          <div
            key={activeSlide.from}
            style={{
              position: "absolute",
              bottom: "9%",
              left: "4%",
              maxWidth: 360,
              color: "#fff",
              opacity: 1,
              animation: "fadeInCaption .45s ease both",
              pointerEvents: "none",
            }}
          >
            <div style={{
              width: 3,
              height: 44,
              background: "rgba(255,255,255,0.45)",
              marginBottom: 14,
              borderRadius: 2,
            }} />
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontWeight: 500,
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
              textShadow: "0 1px 12px rgba(0,0,0,0.4)",
            }}>
              {"caption" in activeSlide ? activeSlide.caption : ""}
            </p>
          </div>
        )}

        {/* Progress dots */}
        <div style={{
          position: "absolute",
          bottom: "9%",
          right: "4%",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          pointerEvents: "none",
        }}>
          {textSlides.map((s, i) => {
            const isActive = progress >= s.from && progress < s.to;
            return (
              <div key={i} style={{
                width: 4,
                height: isActive ? 20 : 4,
                borderRadius: 2,
                background: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                transition: "height 0.3s ease, background 0.3s ease",
              }} />
            );
          })}
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute",
          bottom: "9%",
          right: "4%",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          opacity: progress < 0.05 ? 0.8 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          marginBottom: 80,
        }}>
          Scroll
        </div>
      </div>

      <style>{`
        @keyframes fadeInCaption {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
