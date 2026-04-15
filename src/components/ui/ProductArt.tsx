import { useEffect, useRef } from 'react';

type Palette = 'cbd' | 'd10' | 'oh' | 'd9' | 'resine' | 'huile' | 'vape';

function slugToPalette(categorySlug: string, name: string): Palette {
  const s = (categorySlug || '').toLowerCase();
  const n = (name || '').toLowerCase();
  if (s.includes('gummies') || n.includes('gummies') || n.includes('cookie')) return 'd9';
  if (s.includes('resine') || n.includes('hash') || n.includes('pollen')) return 'resine';
  if (s.includes('huile') || n.includes('huile') || n.includes('oil')) return 'huile';
  if (s.includes('vape') || n.includes('vape') || n.includes('cart')) return 'vape';
  if (s.includes('oh') || n.includes('oh')) return 'oh';
  if (s.includes('d10') || n.includes('d10') || n.includes('delta-10')) return 'd10';
  return 'cbd';
}

const PALETTES: Record<Palette, { bg: string; a: string; b: string; c: string; glow: string }> = {
  cbd: { bg: '#0d1f15', a: '#7ab893', b: '#4a7c59', c: '#c9a84c', glow: 'rgba(122,184,147,0.25)' },
  d10: { bg: '#1e1408', a: '#e8b84c', b: '#c9a84c', c: '#f0d080', glow: 'rgba(232,184,76,0.3)' },
  oh: { bg: '#0e1525', a: '#8ab4d4', b: '#6090b8', c: '#e8c8a0', glow: 'rgba(138,180,212,0.3)' },
  d9: { bg: '#1e0d18', a: '#d47ab8', b: '#e896c8', c: '#f0b8e0', glow: 'rgba(212,122,184,0.35)' },
  resine: { bg: '#18140a', a: '#e8d5a0', b: '#c9a84c', c: '#f0e8c0', glow: 'rgba(232,213,160,0.25)' },
  huile: { bg: '#121e0a', a: '#b8d470', b: '#96b850', c: '#d8f090', glow: 'rgba(184,212,112,0.28)' },
  vape: { bg: '#091520', a: '#7ab8d4', b: '#5098b8', c: '#a0d8e8', glow: 'rgba(122,184,212,0.3)' },
};

function drawCBD(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: typeof PALETTES.cbd) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  // Background glow
  const grd = ctx.createRadialGradient(cx, cy * 0.8, 0, cx, cy * 0.8, w * 0.6);
  grd.addColorStop(0, p.glow);
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Rotating leaf shapes
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + t * 0.4;
    const r = w * 0.28 + Math.sin(t * 0.7 + i) * 8;
    const lx = cx + Math.cos(angle) * r;
    const ly = cy + Math.sin(angle) * r;

    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(angle + Math.PI / 2 + t * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.bezierCurveTo(10, -8, 10, 8, 0, 16);
    ctx.bezierCurveTo(-10, 8, -10, -8, 0, -16);
    ctx.fillStyle = i % 2 === 0 ? `${p.a}60` : `${p.b}50`;
    ctx.fill();
    ctx.strokeStyle = `${p.a}80`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  }

  // Center botanical star
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(t * 0.2);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const r1 = 30 + Math.sin(t * 1.2 + i * 0.8) * 5;
    const r2 = 16;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r2, Math.sin(a) * r2);
    ctx.lineTo(Math.cos(a + 0.3) * r1, Math.sin(a + 0.3) * r1);
    ctx.lineTo(Math.cos(a + Math.PI / 7) * r2, Math.sin(a + Math.PI / 7) * r2);
    ctx.fillStyle = `${p.a}55`;
    ctx.fill();
  }
  ctx.restore();

  // Gold center
  const grd2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
  grd2.addColorStop(0, `${p.c}cc`);
  grd2.addColorStop(1, `${p.a}30`);
  ctx.beginPath();
  ctx.arc(cx, cy, 12 + Math.sin(t) * 2, 0, Math.PI * 2);
  ctx.fillStyle = grd2;
  ctx.fill();

  // Floating particles
  for (let i = 0; i < 14; i++) {
    const px = cx + Math.cos(t * 0.5 + i * 0.8) * (40 + i * 8) * Math.sin(t * 0.3 + i);
    const py = cy + Math.sin(t * 0.5 + i * 0.8) * (30 + i * 6) * Math.cos(t * 0.4 + i * 0.7);
    const pr = 1.5 + Math.sin(t + i) * 0.8;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fillStyle = `${p.c}${Math.floor(100 + Math.sin(t + i) * 80).toString(16).padStart(2, '0')}`;
    ctx.fill();
  }
}

function drawD10(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: typeof PALETTES.d10) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.7);
  grd.addColorStop(0, p.glow);
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Sacred geometry - rotating triangles
  ctx.save();
  ctx.translate(cx, cy);
  for (let tri = 0; tri < 4; tri++) {
    ctx.save();
    ctx.rotate(t * (tri % 2 === 0 ? 0.3 : -0.25) + (tri * Math.PI) / 4);
    const r = 20 + tri * 18;
    ctx.beginPath();
    for (let v = 0; v < 3; v++) {
      const a = (v / 3) * Math.PI * 2 - Math.PI / 2;
      v === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
              : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.strokeStyle = `${p.a}${tri === 0 ? 'cc' : tri === 1 ? '88' : '50'}`;
    ctx.lineWidth = tri === 0 ? 1.5 : 1;
    ctx.stroke();
    if (tri === 0) {
      ctx.fillStyle = `${p.b}25`;
      ctx.fill();
    }
    ctx.restore();
  }
  ctx.restore();

  // Hexagonal center
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(t * 0.15);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
    const r = 14 + Math.sin(t * 2) * 2;
    i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
            : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  const hGrd = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
  hGrd.addColorStop(0, `${p.c}ee`);
  hGrd.addColorStop(1, `${p.a}88`);
  ctx.fillStyle = hGrd;
  ctx.fill();
  ctx.restore();

  // Orbit particles
  for (let i = 0; i < 12; i++) {
    const angle = t * 0.6 + (i / 12) * Math.PI * 2;
    const r = 55 + Math.sin(t * 2 + i) * 15;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 1.8 + Math.cos(t + i) * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = `${p.c}${Math.floor(120 + Math.sin(t + i * 0.5) * 90).toString(16).padStart(2, '0')}`;
    ctx.fill();
  }
}

function drawOH(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: typeof PALETTES.oh) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  const grd = ctx.createRadialGradient(cx, cy * 0.7, 0, cx, cy, w * 0.65);
  grd.addColorStop(0, p.glow);
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Wave forms
  for (let wave = 0; wave < 5; wave++) {
    ctx.beginPath();
    const offset = wave * 12;
    for (let x = 0; x <= w; x += 3) {
      const y = cy + offset - 30 + Math.sin((x / w) * Math.PI * 3 + t * 0.8 + wave * 0.5) * (20 - wave * 2);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `${p.a}${Math.floor(30 + (5 - wave) * 20).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Lotus circles
  ctx.save();
  ctx.translate(cx, cy - 10);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + t * 0.2;
    const r = 30;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 18, 0, Math.PI * 2);
    ctx.strokeStyle = `${p.a}45`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 14 + Math.sin(t) * 2, 0, Math.PI * 2);
  const cGrd = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
  cGrd.addColorStop(0, `${p.c}cc`);
  cGrd.addColorStop(1, `${p.a}44`);
  ctx.fillStyle = cGrd;
  ctx.fill();
  ctx.restore();

  // Droplets
  for (let i = 0; i < 8; i++) {
    const dx = cx + Math.cos(t * 0.4 + i * 0.8) * 60;
    const dy = cy + Math.sin(t * 0.6 + i * 0.9) * 45;
    ctx.beginPath();
    ctx.arc(dx, dy, 2 + Math.sin(t + i) * 1, 0, Math.PI * 2);
    ctx.fillStyle = `${p.a}70`;
    ctx.fill();
  }
}

function drawD9(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: typeof PALETTES.d9) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.7);
  grd.addColorStop(0, p.glow);
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Bubble cluster
  const bubbles = [
    { rx: cx - 20, ry: cy - 15, r: 28, phase: 0 },
    { rx: cx + 22, ry: cy - 10, r: 22, phase: 1.2 },
    { rx: cx, ry: cy + 25, r: 24, phase: 2.4 },
    { rx: cx - 25, ry: cy + 15, r: 16, phase: 0.8 },
    { rx: cx + 25, ry: cy + 18, r: 14, phase: 1.8 },
  ];
  bubbles.forEach(({ rx, ry, r, phase }) => {
    const x = rx + Math.sin(t * 0.5 + phase) * 5;
    const y = ry + Math.cos(t * 0.4 + phase) * 4;
    const bGrd = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
    bGrd.addColorStop(0, `${p.c}50`);
    bGrd.addColorStop(0.5, `${p.a}30`);
    bGrd.addColorStop(1, `${p.b}15`);
    ctx.beginPath();
    ctx.arc(x, y, r + Math.sin(t + phase) * 2, 0, Math.PI * 2);
    ctx.fillStyle = bGrd;
    ctx.fill();
    ctx.strokeStyle = `${p.a}60`;
    ctx.lineWidth = 1;
    ctx.stroke();
    // Shine
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fill();
  });

  // Pop art dots
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 + t * 0.3;
    const r = 75 + Math.sin(t + i * 0.4) * 15;
    const size = 2.5 + Math.sin(t * 2 + i) * 1.2;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, size, 0, Math.PI * 2);
    const colors = [p.a, p.b, p.c, '#f8a0c8'];
    ctx.fillStyle = `${colors[i % colors.length]}${Math.floor(80 + Math.sin(t + i) * 60).toString(16).padStart(2, '0')}`;
    ctx.fill();
  }
}

function drawResine(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: typeof PALETTES.resine) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  const grd = ctx.createRadialGradient(cx, cy * 0.8, 0, cx, cy, w * 0.65);
  grd.addColorStop(0, p.glow);
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Crystal formation
  const crystals = [
    { x: cx, y: cy - 10, h: 70, w: 20, rot: 0 },
    { x: cx - 30, y: cy + 15, h: 50, w: 14, rot: -0.3 },
    { x: cx + 28, y: cy + 12, h: 55, w: 16, rot: 0.25 },
    { x: cx - 15, y: cy + 25, h: 40, w: 12, rot: -0.15 },
    { x: cx + 14, y: cy + 28, h: 38, w: 11, rot: 0.2 },
  ];
  crystals.forEach(({ x, y, h: ch, w: cw, rot }, i) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot + Math.sin(t * 0.3 + i * 0.5) * 0.03);
    ctx.beginPath();
    ctx.moveTo(0, -ch / 2);
    ctx.lineTo(cw / 2, -ch / 4);
    ctx.lineTo(cw / 2, ch / 4);
    ctx.lineTo(0, ch / 2);
    ctx.lineTo(-cw / 2, ch / 4);
    ctx.lineTo(-cw / 2, -ch / 4);
    ctx.closePath();
    const cGrd = ctx.createLinearGradient(0, -ch / 2, 0, ch / 2);
    cGrd.addColorStop(0, `${p.c}cc`);
    cGrd.addColorStop(0.5, `${p.a}66`);
    cGrd.addColorStop(1, `${p.b}44`);
    ctx.fillStyle = cGrd;
    ctx.fill();
    ctx.strokeStyle = `${p.c}aa`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  });

  // Resin drop
  ctx.beginPath();
  ctx.moveTo(cx, cy + 60);
  ctx.bezierCurveTo(cx - 8, cy + 80, cx + 8, cy + 80, cx, cy + 90);
  ctx.fillStyle = `${p.a}80`;
  ctx.fill();

  // Sparkles
  for (let i = 0; i < 10; i++) {
    const sx = cx + Math.cos(t * 0.8 + i * 0.6) * 80 * Math.random();
    const sy = cy + Math.sin(t * 0.7 + i * 0.7) * 60 * Math.random();
    const ss = 1 + Math.sin(t * 2 + i) * 0.8;
    if (Math.sin(t + i) > 0) {
      ctx.beginPath();
      ctx.arc(sx, sy, ss, 0, Math.PI * 2);
      ctx.fillStyle = `${p.c}cc`;
      ctx.fill();
    }
  }
}

function drawHuile(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: typeof PALETTES.huile) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.65);
  grd.addColorStop(0, p.glow);
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Bottle silhouette
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy - 40);
  ctx.lineTo(cx + 14, cy - 40);
  ctx.lineTo(cx + 18, cy + 30);
  ctx.bezierCurveTo(cx + 18, cy + 55, cx - 18, cy + 55, cx - 18, cy + 30);
  ctx.closePath();
  const bGrd = ctx.createLinearGradient(cx - 18, 0, cx + 18, 0);
  bGrd.addColorStop(0, `${p.b}30`);
  bGrd.addColorStop(0.4, `${p.a}50`);
  bGrd.addColorStop(1, `${p.b}20`);
  ctx.fillStyle = bGrd;
  ctx.fill();
  ctx.strokeStyle = `${p.a}80`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Oil fill animation
  const fillY = cy - 10 + Math.sin(t * 0.8) * 4;
  ctx.beginPath();
  ctx.moveTo(cx - 16, fillY + 40);
  for (let x = cx - 16; x <= cx + 16; x++) {
    const wave = Math.sin((x - cx) * 0.3 + t * 1.5) * 3;
    ctx.lineTo(x, fillY + wave);
  }
  ctx.lineTo(cx + 16, cy + 50);
  ctx.lineTo(cx - 16, cy + 50);
  ctx.closePath();
  ctx.fillStyle = `${p.a}55`;
  ctx.fill();

  // Drops
  [
    { x: cx, y: cy + 75, r: 6, delay: 0 },
    { x: cx - 10, y: cy + 88, r: 4, delay: 0.8 },
    { x: cx + 8, y: cy + 90, r: 3, delay: 1.4 },
  ].forEach(({ x, y, r, delay }) => {
    const dy = Math.sin(t * 0.7 + delay) * 4;
    ctx.beginPath();
    ctx.arc(x, y + dy, r, 0, Math.PI * 2);
    ctx.fillStyle = `${p.a}70`;
    ctx.fill();
  });

  // Floating leaves
  for (let i = 0; i < 6; i++) {
    const lx = cx + Math.cos(t * 0.4 + i) * 55;
    const ly = cy + Math.sin(t * 0.5 + i * 0.7) * 40;
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(t * 0.3 + i);
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = `${p.c}50`;
    ctx.fill();
    ctx.restore();
  }
}

function drawVape(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: typeof PALETTES.vape) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  // Device
  ctx.beginPath();
  ctx.roundRect(cx - 10, cy - 30, 20, 75, 8);
  ctx.fillStyle = `${p.b}40`;
  ctx.fill();
  ctx.strokeStyle = `${p.a}80`;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Vapor clouds — drifting up
  for (let cloud = 0; cloud < 5; cloud++) {
    const phase = (cloud / 5);
    const ty = ((t * 0.5 + phase) % 1);
    const y = cy - 40 - ty * 100;
    const x = cx + Math.sin(t * 0.8 + cloud * 1.2) * 20;
    const r = 14 + ty * 20;
    const alpha = (1 - ty) * 0.35;

    const vGrd = ctx.createRadialGradient(x, y, 0, x, y, r);
    vGrd.addColorStop(0, `${p.a}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
    vGrd.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = vGrd;
    ctx.fill();
  }

  // Glow at top of device
  const gGrd = ctx.createRadialGradient(cx, cy - 32, 0, cx, cy - 32, 14);
  gGrd.addColorStop(0, `${p.c}cc`);
  gGrd.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(cx, cy - 32, 8, 0, Math.PI * 2);
  ctx.fillStyle = gGrd;
  ctx.fill();
}

const DRAW_FNS: Record<Palette, (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: any) => void> = {
  cbd: drawCBD, d10: drawD10, oh: drawOH, d9: drawD9,
  resine: drawResine, huile: drawHuile, vape: drawVape,
};

interface ProductArtProps {
  categorySlug: string;
  name: string;
  width?: number;
  height?: number;
}

export function ProductArt({ categorySlug, name, width = 270, height = 180 }: ProductArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const palette = slugToPalette(categorySlug, name);
  const p = PALETTES[palette];
  const drawFn = DRAW_FNS[palette];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      drawFn(ctx, width, height, t, p);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animRef.current);
  }, [palette, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        borderRadius: '8px',
        background: p.bg,
      }}
    />
  );
}
