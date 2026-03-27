---
name: video-to-3d-parallax-website
description: Turn a folder of videos into a premium 3D scroll-driven website with depth-layered parallax, Three.js plane displacement, multi-axis transforms, and cinematic section choreography. Activates on any request involving 3D scroll, parallax websites, depth effects, or video-to-web conversion with spatial motion.
---

# Video to 3D Parallax Scroll Website

Turn a folder of video files into a **depth-driven scroll experience** — multiple video layers moving at different Z-axis speeds, Three.js displacement effects, and cinematic parallax choreography. Not flat scroll animations. Genuine 3D spatial motion.

## Input

The user provides: a folder path containing video files (MP4, MOV, etc.) and optionally:
- A theme/brand name
- Which video is the hero vs. supporting sections
- Preferred depth intensity (subtle / medium / extreme)
- Color scheme preferences
- Section text content

If not specified, ask briefly or apply sensible creative defaults. Assume the first video alphabetically is the hero unless told otherwise.

---

## Premium Checklist (Non-Negotiable)

1. **Three.js displacement shader** — hero video rendered as a 3D plane that warps on scroll via a displacement map, not a flat `<video>` tag
2. **Lenis smooth scroll** — native scroll kills the depth illusion; Lenis is mandatory
3. **3+ parallax depth layers** — foreground (1.0x), midground (0.6x), background (0.25x), minimum. Each layer moves at a distinct speed
4. **Gyroscope parallax on mobile** — `DeviceOrientationEvent` tilts layers on mobile instead of mouse; graceful fallback to scroll-only
5. **Mouse-tracking depth** — desktop cursor position drives subtle X/Y translation of each layer at different rates, reinforcing the Z illusion
6. **Frame extraction per video** — each video in the folder becomes a canvas-rendered frame sequence, not an HTML `<video>` element
7. **4+ section transition types** — depth-push, Z-rotate, perspective-tilt, slab-slide. Never repeat consecutively
8. **Massive scale contrast** — foreground text at 14vw+, background labels at 1.8vw. Size difference sells depth
9. **Fog/depth-of-field overlay** — a radial gradient fog layer on the canvas that thickens/thins with scroll to simulate camera focus
10. **CTA section with Z-burst** — final CTA section explodes elements toward the viewer on enter (scale 0.4 → 1.0)
11. **Depth counter animations** — stats count up AND scale from 0.7 → 1.0 simultaneously, reinforcing Z motion language
12. **Scroll height generosity** — minimum 1200vh total. 3D depth needs breathing room or it reads as jitter, not motion
13. **No centered body text** — all body copy lives in a 35% side zone. Center is reserved for depth-play elements only
14. **Perspective root** — `perspective: 1200px` on `#scene`, `transform-style: preserve-3d` on all containers. Never fake it with shadows alone

---

## Workflow

**FFmpeg and FFprobe must be available on PATH. Verify before starting:**

```bash
ffprobe -version
ffmpeg -version
```

---

### Step 1: Scan the Video Folder

```bash
ls -la <FOLDER_PATH>/*.{mp4,mov,MP4,MOV} 2>/dev/null
```

For each video file found, probe its dimensions and duration:

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,duration,r_frame_rate,nb_frames \
  -of csv=p=0 "<VIDEO_PATH>"
```

Determine per video:
- **Role assignment**: hero (first / largest / user-specified), section videos (remaining)
- **Target frame count**:
  - Hero video: 200–300 frames (most scroll interaction lives here)
  - Section videos: 80–150 frames each (lighter weight)
- **Extraction fps**:
  - Short (<10s): original fps, cap at 300 frames
  - Medium (10–30s): 10–15 fps
  - Long (30s+): 5–8 fps
- **Output width**: match aspect ratio, cap at 1920px for hero, 1280px for sections

---

### Step 2: Extract Frames (All Videos)

Create a subfolder per video to keep frames organized:

```bash
# Hero video
mkdir -p frames/hero
ffmpeg -i "<HERO_VIDEO>" \
  -vf "fps=<FPS>,scale=1920:-1" \
  -c:v libwebp -quality 82 "frames/hero/frame_%04d.webp"

# Section videos (repeat per file)
mkdir -p frames/section_01
ffmpeg -i "<SECTION_VIDEO_01>" \
  -vf "fps=<FPS>,scale=1280:-1" \
  -c:v libwebp -quality 80 "frames/section_01/frame_%04d.webp"
```

After extraction, count frames per folder:

```bash
ls frames/hero/ | wc -l
ls frames/section_01/ | wc -l
```

Record these counts — they are used as `HERO_FRAME_COUNT` and `SECTION_N_FRAME_COUNT` constants in `js/app.js`.

---

### Step 3: Scaffold

```
project-root/
  index.html
  css/style.css
  js/
    app.js
    three-scene.js      ← Three.js hero displacement (isolated)
    parallax.js         ← Layer depth + mouse/gyro tracking
  frames/
    hero/frame_0001.webp ...
    section_01/frame_0001.webp ...
    section_02/frame_0001.webp ...
```

No bundler. Vanilla HTML/CSS/JS + CDN libraries only.

---

### Step 4: Build index.html

Required structure (in this exact order):

```html
<!-- 1. Loader -->
<!-- #loader > .loader-brand, #loader-bar, #loader-percent, .loader-depth-hint -->

<!-- 2. Fixed header -->
<!-- .site-header > nav: logo left, links right, depth-indicator dot center -->

<!-- 3. Three.js hero mount -->
<!-- #three-hero (100vh, position:fixed initially, becomes sticky) -->
<!-- Contains: canvas injected by Three.js -->

<!-- 4. Hero text layer (position:fixed, z-index above three-hero) -->
<!-- .hero-text-layer > .hero-depth-label, .hero-heading (words in spans), .hero-subline -->
<!-- data-depth="1.8" — fastest moving layer -->

<!-- 5. Hero background label (position:fixed, z-index below three-hero) -->
<!-- .hero-bg-label (massive, 18vw, muted opacity) -->
<!-- data-depth="0.2" — barely moves -->

<!-- 6. Scroll container -->
<!-- #scroll-container (1200vh+) -->
<!-- Parallax sections, stats section, CTA section -->

<!-- 7. Fog overlay (position:fixed, pointer-events:none) -->
<!-- #depth-fog — radial gradient, opacity driven by JS -->
```

Parallax section structure:

```html
<section class="parallax-section align-left"
         data-enter="18" data-leave="34"
         data-transition="depth-push"
         data-video="section_01">
  <div class="parallax-layers">
    <div class="layer layer-bg"    data-depth="0.2"></div>
    <div class="layer layer-mid"   data-depth="0.6">
      <canvas class="section-canvas"></canvas>
    </div>
    <div class="layer layer-fg"    data-depth="1.0">
      <span class="section-label">001 / Depth</span>
      <h2 class="section-heading">Heading Text</h2>
      <p class="section-body">Body copy here.</p>
    </div>
  </div>
</section>
```

Stats section:

```html
<section class="parallax-section section-stats"
         data-enter="60" data-leave="76"
         data-transition="z-burst">
  <div class="stats-grid">
    <div class="stat" data-depth="1.2">
      <span class="stat-number" data-value="98" data-decimals="0">0</span>
      <span class="stat-suffix">%</span>
      <span class="stat-label">Retention at depth</span>
    </div>
  </div>
</section>
```

CTA section:

```html
<section class="parallax-section section-cta"
         data-enter="88" data-leave="100"
         data-transition="z-burst"
         data-persist="true">
  <div class="layer layer-fg" data-depth="1.0">
    <h2 class="cta-heading">Call to Action</h2>
    <a class="cta-button" href="#">Get Started</a>
  </div>
</section>
```

CDN scripts (end of body, this order):

```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="js/parallax.js"></script>
<script src="js/three-scene.js"></script>
<script src="js/app.js"></script>
```

---

### Step 5: Build css/style.css

Use the **frontend-design skill** for creative, distinctive styling. Key technical patterns:

```css
:root {
  --bg:            #0a0a0a;
  --bg-mid:        #111111;
  --surface:       #1a1a1a;
  --text:          #f0ede8;
  --text-muted:    #6b6660;
  --accent:        #e8d5b0;      /* warm gold — adjust to brand */
  --accent-cold:   #4a9eff;      /* contrast accent */
  --font-display:  '[DISPLAY FONT]', serif;
  --font-body:     '[BODY FONT]', sans-serif;
  --perspective:   1200px;
  --ease-depth:    cubic-bezier(0.25, 1, 0.5, 1);
  --duration-in:   0.9s;
}

/* 3D scene root */
#scene {
  perspective: var(--perspective);
  perspective-origin: 50% 40%;
  transform-style: preserve-3d;
}

/* Depth layer speeds — CSS fallback (JS overrides with exact values) */
[data-depth="0.2"]  { --parallax-speed: 0.2; }
[data-depth="0.6"]  { --parallax-speed: 0.6; }
[data-depth="1.0"]  { --parallax-speed: 1.0; }
[data-depth="1.2"]  { --parallax-speed: 1.2; }
[data-depth="1.8"]  { --parallax-speed: 1.8; }

/* Side zones — center is depth-play space only */
.align-left  { padding-left: 5vw;  padding-right: 58vw; }
.align-right { padding-left: 58vw; padding-right: 5vw;  }
.align-left  .layer-fg,
.align-right .layer-fg { max-width: 38vw; }

/* Scale contrast between depth layers */
.hero-bg-label    { font-size: 18vw; opacity: 0.04; letter-spacing: -0.04em; }
.hero-heading     { font-size: 14vw; line-height: 0.9; }
.section-heading  { font-size: 4.5rem; }
.section-label    { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; }

/* Fog overlay */
#depth-fog {
  position: fixed; inset: 0; pointer-events: none; z-index: 8;
  background: radial-gradient(ellipse 60% 60% at 50% 50%,
    transparent 30%, rgba(0,0,0,0.7) 100%);
  opacity: 0;
  transition: opacity 0.4s var(--ease-depth);
}

/* Mobile collapse */
@media (max-width: 768px) {
  .align-left, .align-right {
    padding: 0 6vw;
  }
  .layer-fg { max-width: 100%; }
  .hero-heading { font-size: 16vw; }
  .hero-bg-label { display: none; }
}
```

---

### Step 6: Build js/three-scene.js

Three.js handles the **hero video displacement shader only**. Everything else (sections, parallax) uses canvas + GSAP.

```js
// three-scene.js — Hero displacement plane
const ThreeScene = (() => {
  let renderer, scene, camera, plane, uniforms;

  const vertexShader = `
    uniform float uProgress;
    uniform sampler2D uDisplace;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 disp = texture2D(uDisplace, vUv);
      float strength = disp.r * uProgress * 0.18;
      vec3 displaced = position;
      displaced.z += strength;
      displaced.x += (disp.r - 0.5) * uProgress * 0.08;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      gl_FragColor = vec4(color.rgb, color.a * uOpacity);
    }
  `;

  function init(mountEl, width, height) {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mountEl.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2;

    // Displacement map — procedural noise texture (no external asset needed)
    const displaceCanvas = document.createElement("canvas");
    displaceCanvas.width = displaceCanvas.height = 512;
    generateNoiseTexture(displaceCanvas);
    const displaceTexture = new THREE.CanvasTexture(displaceCanvas);

    uniforms = {
      uTexture:  { value: null },
      uDisplace: { value: displaceTexture },
      uProgress: { value: 0.0 },
      uOpacity:  { value: 1.0 }
    };

    const geo = new THREE.PlaneGeometry(3.2, 1.8, 32, 18);
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true
    });

    plane = new THREE.Mesh(geo, mat);
    scene.add(plane);
    renderer.render(scene, camera);
  }

  // Procedural displacement — no file dependency
  function generateNoiseTexture(canvas) {
    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.random() * 255;
      imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = v;
      imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function updateFrame(imageElement) {
    if (!imageElement) return;
    const tex = new THREE.Texture(imageElement);
    tex.needsUpdate = true;
    uniforms.uTexture.value = tex;
    renderer.render(scene, camera);
  }

  function setDisplacementProgress(value) {
    uniforms.uProgress.value = value;
    renderer.render(scene, camera);
  }

  function setOpacity(value) {
    uniforms.uOpacity.value = value;
    renderer.render(scene, camera);
  }

  function resize(width, height) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  return { init, updateFrame, setDisplacementProgress, setOpacity, resize };
})();
```

---

### Step 7: Build js/parallax.js

Handles all depth-layer motion: scroll-driven Y offset, mouse X/Y tracking, and gyroscope tilt.

```js
// parallax.js — Depth layer orchestration
const ParallaxEngine = (() => {
  let layers = [];
  let mouseX = 0, mouseY = 0;
  let gyroX = 0, gyroY = 0;
  let useGyro = false;
  let scrollProgress = 0;
  const MOUSE_STRENGTH = 18; // max px offset from mouse at depth 1.0
  const GYRO_STRENGTH  = 12;

  function init() {
    layers = Array.from(document.querySelectorAll("[data-depth]")).map(el => ({
      el,
      depth: parseFloat(el.dataset.depth),
      baseY: 0
    }));

    // Mouse tracking (desktop)
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Gyroscope (mobile)
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (e) => {
        if (e.gamma !== null) {
          useGyro = true;
          gyroX = Math.max(-30, Math.min(30, e.gamma)) / 30; // -1 to 1
          gyroY = Math.max(-30, Math.min(30, e.beta - 45)) / 30;
        }
      });
    }
  }

  // Called every frame from app.js RAF loop
  function update(progress) {
    scrollProgress = progress;
    const inputX = useGyro ? gyroX : mouseX;
    const inputY = useGyro ? gyroY : mouseY;
    const strength = useGyro ? GYRO_STRENGTH : MOUSE_STRENGTH;

    layers.forEach(({ el, depth }) => {
      const scrollY  = progress * window.innerHeight * (1 - depth) * 0.4;
      const offsetX  = inputX * strength * (depth - 0.6); // depth > 0.6 moves with mouse
      const offsetY  = inputY * strength * (depth - 0.6) * 0.5 + scrollY;

      el.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
    });
  }

  return { init, update };
})();
```

---

### Step 8: Build js/app.js

The orchestration layer. Ties Lenis, Three.js, ParallaxEngine, section animations, and frame rendering together.

#### 8a. Lenis + GSAP Sync (MANDATORY)

```js
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

#### 8b. Frame Preloader (Two-Phase)

```js
// Phase 1: Load hero first 15 frames immediately (fast first paint)
// Phase 2: Load all remaining frames in background
// Hold loader until 100% complete
// Track per-video frame arrays separately:
const heroFrames    = new Array(HERO_FRAME_COUNT).fill(null);
const section01Frames = new Array(SECTION_01_FRAME_COUNT).fill(null);
// etc.
```

#### 8c. Hero Frame → Three.js Pipeline

```js
const HERO_FRAME_SPEED = 2.0; // 1.8–2.2

ScrollTrigger.create({
  trigger: "#scroll-container",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    const p = self.progress;

    // Frame index
    const accelerated = Math.min(p * HERO_FRAME_SPEED, 1);
    const index = Math.min(Math.floor(accelerated * HERO_FRAME_COUNT), HERO_FRAME_COUNT - 1);
    if (heroFrames[index]) {
      ThreeScene.updateFrame(heroFrames[index]);
    }

    // Displacement ramps up in first 30% of scroll, holds, then relaxes
    const displaceProgress = p < 0.3
      ? p / 0.3
      : p < 0.7
        ? 1.0
        : 1.0 - (p - 0.7) / 0.3;
    ThreeScene.setDisplacementProgress(displaceProgress);

    // Parallax engine
    ParallaxEngine.update(p);

    // Fog depth — peaks at stats section
    updateFog(p);
  }
});
```

#### 8d. Section Canvas Renderer

Each section video has its own canvas and frame array. Same padded-cover draw logic as the hero, but uses the section's frame array:

```js
function drawSectionFrame(canvas, frames, progress, frameSpeed = 1.6) {
  const ctx = canvas.getContext("2d");
  const frameCount = frames.length;
  const accelerated = Math.min(progress * frameSpeed, 1);
  const index = Math.min(Math.floor(accelerated * frameCount), frameCount - 1);
  const img = frames[index];
  if (!img) return;

  const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight) * 0.88;
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
}
```

#### 8e. Section Animation System

Each section reads `data-transition` and applies a distinct 3D entrance. **Never use the same transition for consecutive sections.**

```js
function setupSectionAnimation(section) {
  const type    = section.dataset.transition;
  const persist = section.dataset.persist === "true";
  const enter   = parseFloat(section.dataset.enter) / 100;
  const leave   = parseFloat(section.dataset.leave) / 100;
  const layers  = section.querySelectorAll(".layer-fg, .layer-mid");
  const fg      = section.querySelector(".layer-fg");
  const children = fg
    ? fg.querySelectorAll(".section-label, .section-heading, .section-body, .cta-button, .stat")
    : [];

  const tl = gsap.timeline({ paused: true });

  switch (type) {
    case "depth-push":
      // Elements arrive from deep Z — scale up and fade
      tl.from(children, {
        z: -120, scale: 0.7, opacity: 0,
        stagger: 0.13, duration: 1.0, ease: "power3.out"
      });
      break;
    case "z-rotate":
      // Plane tilts in on the Y axis (perspective card flip)
      tl.from(section, { rotationY: 12, opacity: 0, duration: 1.1, ease: "power3.out" })
        .from(children, { y: 30, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power2.out" }, "-=0.6");
      break;
    case "perspective-tilt":
      // Section tilts on X (like lifting a lid)
      tl.from(section, { rotationX: -10, opacity: 0, transformOrigin: "50% 100%", duration: 1.2, ease: "power4.out" })
        .from(children, { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.7");
      break;
    case "slab-slide":
      // Entire section slides in as a thick slab from left or right
      const dir = section.classList.contains("align-right") ? 160 : -160;
      tl.from(section, { x: dir, opacity: 0, duration: 1.0, ease: "power3.out" })
        .from(children, { x: dir * 0.4, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power2.out" }, "-=0.7");
      break;
    case "z-burst":
      // CTA / stats: elements burst toward viewer
      tl.from(children, {
        scale: 0.4, z: -200, opacity: 0,
        stagger: 0.18, duration: 1.2, ease: "back.out(1.4)"
      });
      break;
    case "fog-clear":
      // Section fades in as fog dissipates — used after stats
      tl.from(section, { filter: "blur(12px)", opacity: 0, duration: 1.4, ease: "power2.out" })
        .from(children, { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.8");
      break;
    case "clip-depth":
      // Depth clip-path wipe: reveals from center outward
      tl.from(section, { clipPath: "inset(20% 20% 20% 20% round 12px)", opacity: 0, duration: 1.2, ease: "power4.inOut" })
        .from(children, { opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.6");
      break;
  }

  // Scroll-position-driven play/reverse via ScrollTrigger onUpdate
  // persist === true: play but never reverse when leave point is passed
  ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: false,
    onUpdate: (self) => {
      const p = self.progress;
      if (p >= enter && p < leave) {
        if (tl.progress() === 0) tl.play();
      } else if (p < enter && !persist) {
        tl.reverse();
      }
    }
  });
}
```

#### 8f. Depth Fog Control

```js
function updateFog(progress) {
  const fog = document.getElementById("depth-fog");
  const statsEnter = 0.60, statsLeave = 0.76;
  const fadeRange = 0.05;
  let opacity = 0;

  if (progress >= statsEnter - fadeRange && progress < statsEnter)
    opacity = (progress - (statsEnter - fadeRange)) / fadeRange * 0.6;
  else if (progress >= statsEnter && progress <= statsLeave)
    opacity = 0.6;
  else if (progress > statsLeave && progress <= statsLeave + fadeRange)
    opacity = 0.6 * (1 - (progress - statsLeave) / fadeRange);

  fog.style.opacity = opacity;
}
```

#### 8g. Counter Animations with Z-Scale

```js
document.querySelectorAll(".stat-number").forEach(el => {
  const target   = parseFloat(el.dataset.value);
  const decimals = parseInt(el.dataset.decimals || "0");
  const parent   = el.closest(".stat");

  gsap.from(el, {
    textContent: 0,
    duration: 2.2,
    ease: "power2.out",
    snap: { textContent: decimals === 0 ? 1 : 0.01 },
    scrollTrigger: { trigger: parent, start: "top 70%", toggleActions: "play none none reverse" }
  });

  // Z-scale reinforces depth language
  gsap.from(parent, {
    scale: 0.65, z: -80, opacity: 0,
    duration: 1.0, ease: "back.out(1.2)",
    scrollTrigger: { trigger: parent, start: "top 70%", toggleActions: "play none none reverse" }
  });
});
```

#### 8h. Depth Indicator (Optional Polish)

A small fixed UI element showing current "depth level" as a number that changes with scroll — reinforces the spatial narrative:

```js
const depthIndicator = document.querySelector(".depth-indicator");
if (depthIndicator) {
  ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "top top", end: "bottom bottom",
    onUpdate: (self) => {
      const depth = (1 + self.progress * 9).toFixed(1); // "1.0" → "10.0"
      depthIndicator.textContent = `DEPTH ${depth}m`;
    }
  });
}
```

---

### Step 9: Test

1. Serve locally: `npx serve .` (or `python -m http.server 8000`)
2. **Scroll depth check**: All three parallax layer speeds should be visibly distinct by the 15% scroll mark
3. **Displacement check**: Hero plane should visibly warp during the first half of scroll
4. **Mouse/gyro check**: Move cursor — foreground text should move more than background text
5. **Transition variety check**: No two consecutive sections share the same `data-transition` value
6. **Fog check**: Fog overlay appears and disappears cleanly around the stats section
7. **Mobile check**: Gyroscope activates depth on tilt; side alignment collapses correctly
8. **CTA persist check**: Final section stays visible when scrolled to the bottom

---

## Transition Types Quick Reference

| Type | 3D Technique | Elements | Duration |
|---|---|---|---|
| `depth-push` | Z translate + scale | Children stagger | 1.0s |
| `z-rotate` | rotationY on container | Section + children | 1.1s |
| `perspective-tilt` | rotationX on container | Section + children | 1.2s |
| `slab-slide` | X translate, full section | Section + children | 1.0s |
| `z-burst` | Scale from 0.4 + Z | Children stagger | 1.2s |
| `fog-clear` | blur + opacity | Section + children | 1.4s |
| `clip-depth` | inset clip-path wipe | Section + children | 1.2s |

All types use stagger (0.10–0.18s). Ease: `power3.out` default, `power4.inOut` for clip types, `back.out(1.4)` for burst types.

---

## Parallax Depth Layer Reference

| Layer | `data-depth` | Scroll Speed | Mouse Response | Typical Content |
|---|---|---|---|---|
| Deep background | 0.2 | Very slow | Minimal | Oversized muted label, gradient wash |
| Background | 0.4 | Slow | Slight | Texture or gradient plane |
| Midground | 0.6 | Medium | Moderate | Section canvas (video frames) |
| Foreground | 1.0 | Baseline | Standard | Headings, body copy |
| Hyper-foreground | 1.8 | Fast | Strong | Hero heading, large display type |

---

## Anti-Patterns

- **Using `<video>` elements instead of canvas frames** — video elements ignore scroll control, kill the frame-to-scroll binding, and make displacement impossible
- **Flat `translateY` only** — without `perspective` on a parent and `preserve-3d` on containers, you have 2D scroll, not parallax depth
- **Same depth for all text layers** — if every element has `data-depth="1.0"` the parallax effect is invisible
- **FRAME_SPEED < 1.6 for section canvases** — section videos are shorter; they need faster completion to stay in sync with their scroll window
- **Fog opacity > 0.75** — above 0.75 the section beneath becomes illegible; keep peak at 0.6
- **Z-burst on every section** — reserve `z-burst` for CTA and stats only; used repeatedly it reads as a bug
- **Mouse strength > 25px at depth 1.0** — past this threshold, text visibly detaches from the page and reads as broken layout
- **Scroll height < 1200vh** — depth illusions require time to read; cramped scroll ranges compress the 3D effect into jitter
- **Not clamping gyro input** — raw `DeviceOrientationEvent` values can spike; always clamp `e.gamma` and `e.beta` to ±30 before normalizing
- **Skipping `prefers-reduced-motion`** — 3D parallax is one of the most disorienting effects for vestibular disorders; the reduced-motion fallback must disable all depth transforms and revert to simple fade entrances

---

## Troubleshooting

- **Three.js plane shows black**: Texture not loaded yet — ensure frames[0] is loaded before calling `ThreeScene.updateFrame()`
- **Parallax layers judder**: Increase Lenis `duration` to 1.6, reduce `MOUSE_STRENGTH`
- **Displacement too subtle**: Increase `strength` multiplier in vertex shader from `0.18` to `0.28`
- **Displacement too extreme (surface looks torn)**: Reduce `uProgress` ceiling in `setDisplacementProgress` from `1.0` to `0.6`
- **Mobile gyro not activating**: `DeviceOrientationEvent` requires HTTPS on iOS 13+; test on a real device over HTTPS, not localhost
- **Section transitions firing early**: Check `data-enter` and `data-leave` percentages — sections need at least 12% range to feel unhurried
- **Fog not clearing**: Verify `statsEnter` and `statsLeave` constants in `updateFog()` match the stats section's `data-enter`/`data-leave` attributes
- **Canvas blurry on retina**: Apply `devicePixelRatio` scaling: `canvas.width = el.offsetWidth * dpr`
- **Memory crash on mobile**: Reduce all section frame counts to ≤ 100, hero to ≤ 180. Use 960px width for section frames
