/**
 * ORBIT — Orbital Diagram Engine
 * Canvas 2D implementation for the animated 7-layer orbital visualization.
 *
 * Three contexts:
 *  - "hero"   : ambient, no interaction, reduced opacity
 *  - "layers" : full interaction, detail panel, keyboard nav
 *  - "cta"    : faded callback, no labels, zoomed in
 */

'use strict';

/* ─── Layer data ─────────────────────────────────────────────────────────── */

const LAYERS = [
  {
    code: 'OPS',
    name: 'Operations Agent',
    color: '#e8edf5',
    glow: 'rgba(232, 237, 245, 0.20)',
    ring: 0,
    angleOffset: 0,
    speed: 0.0003,
    radius: 26,
    agentRole: 'Orchestrates all other layers, routes tasks between specialists, manages cross-functional workflows, and serves as the single command center for all merchant operations.',
    specialistRole: 'Operations Coordinator — the central point of contact who ensures every function runs in sync, flags conflicts, and maintains operational integrity across all seven domains.',
    merchantBenefit: 'One command center. Every function — logistics, compliance, marketing, e-commerce — coordinated and reported through a single operational layer. Zero coordination overhead on the merchant side.',
  },
  {
    code: 'MIA',
    name: 'Market Intelligence Agent',
    color: '#4af0c8',
    glow: 'rgba(74, 240, 200, 0.15)',
    ring: 1,
    angleOffset: 0,
    speed: 0.0005,
    radius: 20,
    agentRole: 'Continuously monitors market trends, competitor pricing, consumer signals, and emerging category shifts. Synthesizes intelligence into actionable briefs without merchant involvement.',
    specialistRole: 'Market Researcher — deep category expertise who interprets AI signals, adds contextual nuance, and produces strategic insight reports aligned to the merchant\'s positioning.',
    merchantBenefit: 'Live market intelligence without hiring a research team. Know what competitors are doing, where trends are heading, and how to position — before the market moves.',
  },
  {
    code: 'CIA',
    name: 'Compliance Intelligence Agent',
    color: '#4a9eff',
    glow: 'rgba(74, 158, 255, 0.15)',
    ring: 1,
    angleOffset: (2 * Math.PI) / 3,
    speed: 0.0005,
    radius: 20,
    agentRole: 'Tracks regulatory changes, tariff schedules, import/export rules, labeling requirements, and platform policy updates across all markets the merchant operates in.',
    specialistRole: 'Compliance Broker — licensed specialist who reviews AI-flagged changes, executes filings, manages documentation, and maintains compliant records on behalf of the merchant.',
    merchantBenefit: 'Compliant operations in every market — without reading a single regulatory update. Cross-border complexity disappears from the merchant\'s line of sight entirely.',
  },
  {
    code: 'ECOM',
    name: 'E-commerce Agent',
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.15)',
    ring: 1,
    angleOffset: (4 * Math.PI) / 3,
    speed: 0.0005,
    radius: 20,
    agentRole: 'Manages product listings, inventory synchronization, platform fee optimization, pricing rules, and catalog integrity across all active e-commerce channels.',
    specialistRole: 'E-commerce Manager — platform-certified specialist who handles channel-specific strategy, promotional planning, A/B testing, and relationship with platform account managers.',
    merchantBenefit: 'Stores that run themselves. Listings stay optimized, inventory stays accurate, platforms stay happy — while the merchant focuses on product, not channel management.',
  },
  {
    code: 'MKT',
    name: 'Marketing Agent',
    color: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.15)',
    ring: 2,
    angleOffset: 0,
    speed: 0.0008,
    radius: 20,
    agentRole: 'Executes content schedules, manages paid campaign parameters, tracks performance metrics, optimizes creative allocation, and surfaces growth opportunities based on conversion data.',
    specialistRole: 'Performance Marketer — growth specialist who sets campaign strategy, interprets agent-generated performance data, manages creative direction, and owns acquisition efficiency.',
    merchantBenefit: 'A growth engine running in the background. Marketing outputs consistently without the merchant briefing campaigns, reviewing metrics, or managing creative sprints.',
  },
  {
    code: 'LOG',
    name: 'Logistics Agent',
    color: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.15)',
    ring: 2,
    angleOffset: (2 * Math.PI) / 3,
    speed: 0.0008,
    radius: 20,
    agentRole: 'Coordinates shipment routing, carrier selection, delivery tracking, exception handling, and cross-border customs documentation for all outbound and inbound flows.',
    specialistRole: 'Logistics Coordinator — carrier-network specialist who manages escalations, negotiates rates, resolves delivery exceptions, and maintains carrier relationships on merchant\'s behalf.',
    merchantBenefit: 'Supply chain on autopilot. Shipments move, exceptions get resolved, and carriers get managed — without a single logistics email reaching the merchant.',
  },
  {
    code: 'WHS',
    name: 'Warehousing Agent',
    color: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.15)',
    ring: 2,
    angleOffset: (4 * Math.PI) / 3,
    speed: 0.0008,
    radius: 20,
    agentRole: 'Manages inventory positioning, fulfillment queue, pick-pack-ship instructions, returns processing, and bin-level accuracy across all warehouse locations.',
    specialistRole: 'Warehouse Operator — fulfillment specialist who oversees physical operations, quality control, returns inspection, and capacity planning across merchant inventory.',
    merchantBenefit: 'Physical operations handled. Product moves from shelf to customer without the merchant knowing which warehouse it left from — because they no longer need to.',
  },
];

/* Ring geometry — proportional to canvas size */
const RINGS = [
  { radiusXRatio: 0.22, radiusYRatio: 0.16 }, // inner  — OPS
  { radiusXRatio: 0.39, radiusYRatio: 0.29 }, // middle — MIA, CIA, ECOM
  { radiusXRatio: 0.54, radiusYRatio: 0.40 }, // outer  — MKT, LOG, WHS
];

/* ─── OrbitalDiagram class ───────────────────────────────────────────────── */

class OrbitalDiagram {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {'hero'|'layers'|'cta'} mode
   * @param {object} [options]
   */
  constructor(canvas, mode, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mode = mode;
    this.options = options;

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.angles = LAYERS.map(l => l.angleOffset);
    this.hoveredIndex = -1;
    this.selectedIndex = -1;
    this.nodePositions = []; // [{x, y, radius}] in CSS pixels

    this.running = false;
    this.rafId = null;
    this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this._onResize = this._resize.bind(this);
    this._onMouseMove = this._handleMouseMove.bind(this);
    this._onMouseLeave = this._handleMouseLeave.bind(this);
    this._onMouseClick = this._handleClick.bind(this);
    this._onKeyDown = this._handleKeyDown.bind(this);

    this._resize();
    this._setupListeners();
    this._setupIntersectionObserver();
  }

  /* ── Setup ───────────────────────────────────────────────────────────── */

  _resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height > 0 ? rect.height : rect.width);
    this.cssSize = size > 0 ? size : 560;

    // For hero and cta, fill parent
    if (this.mode === 'hero' || this.mode === 'cta') {
      this.cssW = rect.width;
      this.cssH = rect.height;
    } else {
      this.cssW = this.cssSize;
      this.cssH = this.cssSize;
    }

    this.canvas.style.width = this.cssW + 'px';
    this.canvas.style.height = this.cssH + 'px';
    this.canvas.width = Math.round(this.cssW * this.dpr);
    this.canvas.height = Math.round(this.cssH * this.dpr);
    this.ctx.scale(this.dpr, this.dpr);

    this.cx = this.cssW / 2;
    this.cy = this.cssH / 2;

    // Reference size for scaling geometry
    this.refSize = Math.min(this.cssW, this.cssH);
  }

  _setupListeners() {
    window.addEventListener('resize', this._onResize);

    if (this.mode === 'layers') {
      this.canvas.addEventListener('mousemove', this._onMouseMove);
      this.canvas.addEventListener('mouseleave', this._onMouseLeave);
      this.canvas.addEventListener('click', this._onMouseClick);
      this.canvas.addEventListener('keydown', this._onKeyDown);
      this.canvas.setAttribute('tabindex', '0');
      this.canvas.setAttribute('role', 'application');
      this.canvas.setAttribute('aria-roledescription', 'interactive orbital diagram');
      this.canvas.setAttribute('aria-label', 'Orbit 7-layer model diagram. Seven operational layers orbit a central merchant node. Hover or click each node to learn more about that layer.');
    } else {
      this.canvas.setAttribute('role', 'img');
      this.canvas.setAttribute('aria-label', 'Animated orbital diagram showing seven operational layers orbiting a central merchant node');
    }
  }

  _setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      this.start();
      return;
    }
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.start();
        } else {
          this.stop();
        }
      });
    }, { threshold: 0.01 });
    this.observer.observe(this.canvas);
  }

  /* ── Lifecycle ────────────────────────────────────────────────────────── */

  start() {
    if (this.running) return;
    this.running = true;
    this._loop();
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this._onResize);
    if (this.observer) this.observer.disconnect();
    if (this.mode === 'layers') {
      this.canvas.removeEventListener('mousemove', this._onMouseMove);
      this.canvas.removeEventListener('mouseleave', this._onMouseLeave);
      this.canvas.removeEventListener('click', this._onMouseClick);
      this.canvas.removeEventListener('keydown', this._onKeyDown);
    }
  }

  /* ── Animation Loop ───────────────────────────────────────────────────── */

  _loop() {
    if (!this.running) return;
    this._tick();
    this.rafId = requestAnimationFrame(() => this._loop());
  }

  _tick() {
    // Advance angles (skip if reduced motion)
    if (!this.prefersReduced) {
      LAYERS.forEach((layer, i) => {
        this.angles[i] += layer.speed;
      });
    }
    this._draw();
  }

  /* ── Drawing ──────────────────────────────────────────────────────────── */

  _draw() {
    const { ctx, cssW, cssH, cx, cy, mode } = this;
    ctx.clearRect(0, 0, cssW, cssH);

    const scale = this.mode === 'cta' ? 1.2 : 1;
    const nodeOpacity = mode === 'hero' ? 0.4 : 1;
    const ringOpacity = mode === 'hero' ? 0.05 : (mode === 'cta' ? 0.08 : 0.08);

    this.nodePositions = [];

    // Draw orbit rings
    RINGS.forEach((ring, ringIdx) => {
      const rx = (this.refSize / 2) * ring.radiusXRatio * scale;
      const ry = (this.refSize / 2) * ring.radiusYRatio * scale;

      // Get color for this ring (use first layer on it)
      const layerOnRing = LAYERS.find(l => l.ring === ringIdx);
      const ringColor = layerOnRing ? layerOnRing.color : '#4a9eff';

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = this._hexToRgba(ringColor, ringOpacity);
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    });

    // Draw connection lines from each node to center
    LAYERS.forEach((layer, i) => {
      const ring = RINGS[layer.ring];
      const rx = (this.refSize / 2) * ring.radiusXRatio * scale;
      const ry = (this.refSize / 2) * ring.radiusYRatio * scale;
      const x = cx + rx * Math.cos(this.angles[i]);
      const y = cy + ry * Math.sin(this.angles[i]);

      if (mode !== 'cta') {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        const lineAlpha = this.hoveredIndex === i ? 0.12 : 0.04;
        ctx.strokeStyle = this._hexToRgba(layer.color, lineAlpha * nodeOpacity);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    });

    // Draw central MERCHANT node
    this._drawMerchantNode(scale, nodeOpacity);

    // Draw each layer node
    LAYERS.forEach((layer, i) => {
      const ring = RINGS[layer.ring];
      const rx = (this.refSize / 2) * ring.radiusXRatio * scale;
      const ry = (this.refSize / 2) * ring.radiusYRatio * scale;
      const x = cx + rx * Math.cos(this.angles[i]);
      const y = cy + ry * Math.sin(this.angles[i]);

      const isHovered = this.hoveredIndex === i;
      const isSelected = this.selectedIndex === i;
      const nodeR = (isHovered || isSelected) ? layer.radius * 1.3 : layer.radius;

      // Store hit-test position
      this.nodePositions[i] = { x, y, radius: nodeR };

      this._drawNode(ctx, x, y, nodeR, layer, isHovered || isSelected, nodeOpacity, mode);
    });
  }

  _drawMerchantNode(scale, nodeOpacity) {
    const { ctx, cx, cy } = this;
    const r = 28 * scale;

    // Pulsing glow
    const t = Date.now() / 1000;
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.5);
    const glowR = r + 14 + pulse * 8;

    if (!this.prefersReduced) {
      const grd = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, glowR * 1.4);
      grd.addColorStop(0, `rgba(74, 158, 255, ${0.12 * nodeOpacity})`);
      grd.addColorStop(1, 'rgba(74, 158, 255, 0)');
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, glowR * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();
    }

    // Node fill
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232, 237, 245, ${0.06 * nodeOpacity})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(232, 237, 245, ${0.35 * nodeOpacity})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Label
    if (this.mode !== 'cta') {
      ctx.save();
      ctx.font = `bold ${Math.max(8, 9 * scale)}px 'Space Mono', monospace`;
      ctx.fillStyle = `rgba(232, 237, 245, ${0.9 * nodeOpacity})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MERCHANT', cx, cy);
      ctx.restore();
    }
  }

  _drawNode(ctx, x, y, r, layer, isActive, nodeOpacity, mode) {
    // Glow halo
    const glowR = r + 12;
    const grd = ctx.createRadialGradient(x, y, r * 0.2, x, y, glowR * 1.6);
    grd.addColorStop(0, this._hexToRgba(layer.color, isActive ? 0.2 * nodeOpacity : 0.08 * nodeOpacity));
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, glowR * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.restore();

    // Node fill
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = this._hexToRgba(layer.color, isActive ? 0.14 * nodeOpacity : 0.07 * nodeOpacity);
    ctx.fill();
    ctx.strokeStyle = this._hexToRgba(layer.color, isActive ? 0.85 * nodeOpacity : 0.55 * nodeOpacity);
    ctx.lineWidth = isActive ? 2 : 1.5;
    ctx.stroke();
    ctx.restore();

    // Code label
    if (mode !== 'cta') {
      ctx.save();
      const fontSize = Math.max(7, (layer.code.length > 3 ? 7 : 9));
      ctx.font = `bold ${fontSize}px 'Space Mono', monospace`;
      ctx.fillStyle = this._hexToRgba(layer.color, 0.95 * nodeOpacity);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(layer.code, x, y);
      ctx.restore();
    }
  }

  /* ── Interaction ──────────────────────────────────────────────────────── */

  _getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  _hitTest(mx, my) {
    for (let i = 0; i < this.nodePositions.length; i++) {
      const n = this.nodePositions[i];
      const dx = mx - n.x;
      const dy = my - n.y;
      if (Math.sqrt(dx * dx + dy * dy) <= n.radius + 8) {
        return i;
      }
    }
    return -1;
  }

  _handleMouseMove(e) {
    const { x, y } = this._getMousePos(e);
    const hit = this._hitTest(x, y);
    if (hit !== this.hoveredIndex) {
      this.hoveredIndex = hit;
      this.canvas.style.cursor = hit >= 0 ? 'pointer' : 'default';
      if (this.options.onHover) {
        this.options.onHover(hit >= 0 ? LAYERS[hit] : null, hit);
      }
    }
  }

  _handleMouseLeave() {
    this.hoveredIndex = -1;
    this.canvas.style.cursor = 'default';
    if (this.options.onHover) this.options.onHover(null, -1);
  }

  _handleClick(e) {
    const { x, y } = this._getMousePos(e);
    const hit = this._hitTest(x, y);
    if (hit >= 0) {
      this.selectedIndex = hit === this.selectedIndex ? -1 : hit;
      if (this.options.onSelect) {
        this.options.onSelect(this.selectedIndex >= 0 ? LAYERS[this.selectedIndex] : null, this.selectedIndex);
      }
    } else {
      this.selectedIndex = -1;
      if (this.options.onSelect) this.options.onSelect(null, -1);
    }
  }

  _handleKeyDown(e) {
    const total = LAYERS.length;
    if (e.key === 'Tab') {
      e.preventDefault();
      const dir = e.shiftKey ? -1 : 1;
      let next;
      if (this.selectedIndex < 0) {
        next = dir === 1 ? 0 : total - 1;
      } else {
        next = (this.selectedIndex + dir + total) % total;
      }
      this.selectedIndex = next;
      if (this.options.onSelect) {
        this.options.onSelect(LAYERS[next], next);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this.selectedIndex >= 0) {
        if (this.options.onSelect) {
          this.options.onSelect(LAYERS[this.selectedIndex], this.selectedIndex);
        }
      }
    } else if (e.key === 'Escape') {
      this.selectedIndex = -1;
      if (this.options.onSelect) this.options.onSelect(null, -1);
    }
  }

  /* ── Utilities ────────────────────────────────────────────────────────── */

  _hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /* Public method to select a node by index */
  selectNode(index) {
    this.selectedIndex = index;
  }
}

/* ─── Exports ─────────────────────────────────────────────────────────────── */

window.OrbitalDiagram = OrbitalDiagram;
window.ORBIT_LAYERS = LAYERS;
