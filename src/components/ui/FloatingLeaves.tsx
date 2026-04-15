import { useEffect, useRef, memo } from 'react';
import { useTheme } from '../../lib/ThemeContext';

// Minimalist cannabis leaf SVG path
const LEAF_PATH = "M12 2C12 2 8.5 6 6.5 10C5 12.5 5.5 15 7 16C7 16 8 12 12 8C16 12 17 16 17 16C18.5 15 19 12.5 17.5 10C15.5 6 12 2 12 2Z";

interface LeafParticle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  speedY: number;
  speedX: number;
  opacity: number;
  swayPhase: number;
  swaySpeed: number;
}

function FloatingLeavesInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let rafId: number;

    const count = Math.min(12, Math.floor(w / 150));
    const leaves: LeafParticle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 12 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      speedY: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.08 + 0.03,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.005 + 0.002,
    }));

    const leafPath = new Path2D(LEAF_PATH);
    let time = 0;

    const draw = () => {
      time++;
      if (time % 2 !== 0) { rafId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);

      for (const leaf of leaves) {
        leaf.swayPhase += leaf.swaySpeed;
        leaf.x += leaf.speedX + Math.sin(leaf.swayPhase) * 0.4;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotSpeed;

        if (leaf.y > h + 30) { leaf.y = -30; leaf.x = Math.random() * w; }
        if (leaf.x < -30) leaf.x = w + 30;
        if (leaf.x > w + 30) leaf.x = -30;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.scale(leaf.size / 24, leaf.size / 24);
        ctx.globalAlpha = leaf.opacity;
        ctx.fillStyle = isDark ? '#4a7c59' : '#6B8F5E';
        ctx.fill(leafPath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}

export const FloatingLeaves = memo(FloatingLeavesInner);
