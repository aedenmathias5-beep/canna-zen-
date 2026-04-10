import { useEffect, useRef } from 'react';

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      const dx = posRef.current.x - ringPos.current.x;
      const dy = posRef.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.12;
      ringPos.current.y += dy * 0.12;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor="hover"], input, select, textarea')) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };

    const handleLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor="hover"], input, select, textarea')) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };

    const handleDown = () => dot.classList.add('clicking');
    const handleUp = () => dot.classList.remove('clicking');

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div className="grain-overlay" />
    </>
  );
}
