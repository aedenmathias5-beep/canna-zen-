import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';
import '../../styles/design-system.css';

const HERO_WORDS = ['Fleurs', 'Résines', 'Huiles', 'Vapes', 'Gummies'];

export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const parallax1 = useRef<HTMLDivElement>(null);
  const parallax2 = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % HERO_WORDS.length);
        setIsTransitioning(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      if (parallax1.current) {
        parallax1.current.style.transform = `translate(${dx * -30}px, ${dy * -20}px)`;
      }
      if (parallax2.current) {
        parallax2.current.style.transform = `translate(${dx * 20}px, ${dy * 15}px)`;
      }
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  const titleColor = isDark ? '#f5f0e8' : '#1a2f23';
  const subtitleColor = isDark ? 'rgba(245,240,232,0.55)' : 'rgba(26,47,35,0.65)';
  const wordGradient = isDark
    ? 'linear-gradient(135deg, #c9a84c 0%, #f0c060 50%, #e8d5a0 100%)'
    : 'linear-gradient(135deg, #4A6741 0%, #6B8F5E 50%, #4A6741 100%)';
  const heroBg = isDark
    ? 'var(--grad-hero)'
    : 'linear-gradient(135deg, #faf8f5 0%, #f0ece4 40%, #e5e0d6 100%)';
  const radialBg = isDark
    ? 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(26,51,32,0.6) 0%, transparent 70%)'
    : 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(74,103,65,0.15) 0%, transparent 70%)';

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: heroBg,
        transition: 'background 0.6s',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: radialBg }} />

      <ParticleField isDark={isDark} />

      <div
        ref={parallax1}
        style={{
          position: 'absolute',
          top: '15%', right: '8%',
          width: '400px', height: '400px',
          border: `1px solid ${isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.1)'}`,
          borderRadius: '50%',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          position: 'absolute', inset: '40px',
          border: `1px solid ${isDark ? 'rgba(201,168,76,0.05)' : 'rgba(74,103,65,0.06)'}`,
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', inset: '80px',
          border: `1px solid ${isDark ? 'rgba(201,168,76,0.04)' : 'rgba(74,103,65,0.04)'}`,
          borderRadius: '50%',
        }} />
      </div>

      <div
        ref={parallax2}
        style={{
          position: 'absolute',
          bottom: '10%', left: '5%',
          width: '250px', height: '250px',
          border: `1px solid ${isDark ? 'rgba(122,184,147,0.08)' : 'rgba(74,103,65,0.08)'}`,
          borderRadius: '50%',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'absolute',
        top: 0, right: '30%',
        width: '1px', height: '100%',
        background: isDark
          ? 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.12) 30%, rgba(201,168,76,0.12) 70%, transparent 100%)'
          : 'linear-gradient(180deg, transparent 0%, rgba(74,103,65,0.1) 30%, rgba(74,103,65,0.1) 70%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '900px',
      }}>
        <div
          className="badge-luxury"
          style={{ marginBottom: '40px', display: 'inline-flex' }}
        >
          Cannabis légal · THC &lt; 0.3%
        </div>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          fontWeight: 300,
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          color: titleColor,
          marginBottom: '24px',
          transition: 'color 0.4s',
        }}>
          L'univers
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: isDark ? '#c9a84c' : '#4A6741' }}>
            CBD
          </em>
          <br />
          <span style={{
            display: 'inline-block',
            minWidth: '300px',
            background: wordGradient,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
            transition: 'opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {HERO_WORDS[wordIdx]}
          </span>
        </h1>

        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '1rem',
          fontWeight: 300,
          lineHeight: 1.7,
          color: subtitleColor,
          maxWidth: '480px',
          margin: '0 auto 52px',
          letterSpacing: '0.01em',
          transition: 'color 0.4s',
        }}>
          Sélection premium de cannabis légal cultivé avec soin.
          <br />
          Qualité d'exception, expédition sous 24h.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/boutique" className="btn-luxury">
            <span>Découvrir la boutique</span>
            <ArrowRight size={14} />
          </Link>
          <Link to="/boutique?cat=fleurs-cbd" className="btn-ghost">
            <span>Meilleures ventes</span>
          </Link>
        </div>

        <div style={{
          display: 'flex',
          gap: '48px',
          justifyContent: 'center',
          marginTop: '72px',
          paddingTop: '40px',
          borderTop: `1px solid ${isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.1)'}`,
          flexWrap: 'wrap',
          transition: 'border-color 0.4s',
        }}>
          {[
            { num: '28', label: 'Produits premium' },
            { num: '4.9★', label: 'Note moyenne' },
            { num: '24h', label: 'Expédition' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2rem',
                fontWeight: 400,
                color: isDark ? '#c9a84c' : '#4A6741',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                transition: 'color 0.4s',
              }}>
                {num}
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(245,240,232,0.4)' : 'rgba(26,47,35,0.5)',
                marginTop: '6px',
                transition: 'color 0.4s',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'hero-bounce 2s ease-in-out infinite',
        pointerEvents: 'none',
      }}>
        <style>{`
          @keyframes hero-bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-8px); }
          }
        `}</style>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: isDark ? 'rgba(245,240,232,0.3)' : 'rgba(26,47,35,0.35)',
        }}>Défiler</span>
        <div style={{
          width: '1px', height: '40px',
          background: isDark
            ? 'linear-gradient(180deg, rgba(201,168,76,0.5), transparent)'
            : 'linear-gradient(180deg, rgba(74,103,65,0.4), transparent)',
        }} />
      </div>
    </section>
  );
}

function ParticleField({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; phase: number;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    let time = 0;

    const color = isDark ? '201, 168, 76' : '74, 103, 65';

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      particles.forEach(p => {
        p.x += p.vx + Math.sin(time + p.phase) * 0.2;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity * pulse})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.7 }}
    />
  );
}
