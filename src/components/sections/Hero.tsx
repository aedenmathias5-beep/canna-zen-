import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../lib/ThemeContext';
import '../../styles/design-system.css';

const WORDS = ['Détente', 'Bien-être', 'Sérénité', 'Euphorie', 'Équilibre'];

export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let rafId: number;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const colorsDark = ['rgba(201,168,76,', 'rgba(122,184,147,', 'rgba(248,240,232,'];
    const colorsLight = ['rgba(74,103,65,', 'rgba(106,143,88,', 'rgba(196,149,106,'];
    const colors = isDark ? colorsDark : colorsLight;

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2 - 0.1,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.35 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, [isDark]);

  const titleColor = isDark ? '#f5f0e8' : '#1a2f23';
  const accentColor = isDark ? '#c9a84c' : '#4A6741';
  const subtitleColor = isDark ? 'rgba(245,240,232,0.6)' : 'rgba(26,47,35,0.65)';
  const heroBg = isDark
    ? 'linear-gradient(135deg, #0a0a08 0%, #0d1a10 40%, #1a3320 100%)'
    : 'linear-gradient(135deg, #faf8f5 0%, #f0ece4 40%, #e5e0d6 100%)';

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: heroBg,
      transition: 'background 0.6s',
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Orbes */}
      <div style={{
        position: 'absolute', top: '25%', left: '10%',
        width: '500px', height: '500px',
        background: isDark
          ? 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(74,103,65,0.07) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)',
        animation: 'float-orb 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: '400px', height: '400px',
        background: isDark
          ? 'radial-gradient(circle, rgba(26,51,32,0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)',
        animation: 'float-orb 10s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes float-orb {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes leaf-breathe {
          0%, 100% { transform: scale(1) rotate(-1deg); filter: drop-shadow(0 0 20px rgba(122,184,147,0.3)); }
          50% { transform: scale(1.04) rotate(1deg); filter: drop-shadow(0 0 40px rgba(122,184,147,0.6)); }
        }
        @keyframes leaf-shimmer {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.8; }
        }
        @keyframes stem-grow {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.06); }
        }
      `}</style>

      <style>{`
        @keyframes hero-reveal {
          from { opacity: 0; transform: translateY(40px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes hero-line-reveal {
          from { opacity: 0; transform: translateY(30px) skewY(2deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0); }
        }
        @keyframes hero-scale-in {
          from { opacity: 0; transform: scale(0.8) rotate(-5deg); }
          to   { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes stat-count-in {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        padding: '120px 24px 60px',
        maxWidth: '900px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
      }}>
        {/* Badge légal */}
        <div className="badge-luxury" style={{
          marginBottom: '36px',
          animation: 'hero-reveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both',
        }}>
          Cannabis légal · THC &lt; 0.3%
        </div>

        {/* Feuille animée */}
        <div style={{
          marginBottom: '32px',
          animation: 'hero-scale-in 1s cubic-bezier(0.16,1,0.3,1) 0.4s both, leaf-breathe 4s ease-in-out 1.4s infinite',
          transformOrigin: 'bottom center',
        }}>
          <AnimatedLeaf isDark={isDark} size={140} />
        </div>

        {/* Titre L'univers de Mary Jane */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
          fontWeight: 300,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: titleColor,
          marginBottom: '16px',
          transition: 'color 0.4s',
          animation: 'hero-line-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both',
        }}>
          L'univers de
        </h1>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
          fontWeight: 300,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          marginBottom: '32px',
          fontStyle: 'italic',
          animation: 'hero-line-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s both',
        }}>
          <span style={{
            background: isDark
              ? 'linear-gradient(135deg, #c9a84c 0%, #f0c060 50%, #e8d5a0 100%)'
              : 'linear-gradient(135deg, #4A6741 0%, #6B8F5E 50%, #4A6741 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Mary Jane
          </span>
        </h1>

        {/* Rotateur de mots */}
        <div style={{
          marginBottom: '20px',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          animation: 'hero-reveal 0.8s cubic-bezier(0.16,1,0.3,1) 1s both',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: subtitleColor,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>Pour votre</span>
          <span
            key={wordIdx}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.6rem',
              color: accentColor,
              fontStyle: 'italic',
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
              transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {WORDS[wordIdx]}
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
          color: subtitleColor,
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto 48px',
          transition: 'color 0.4s',
          animation: 'hero-reveal 0.8s cubic-bezier(0.16,1,0.3,1) 1.1s both',
        }}>
          Sélection premium de fleurs CBD, D10, OH+, résines, vapes et huiles biologiques.
          L'excellence du cannabis légal français.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
          animation: 'hero-reveal 0.8s cubic-bezier(0.16,1,0.3,1) 1.3s both',
        }}>
          <Link to="/boutique" className="btn-luxury">
            <span>Découvrir la boutique</span>
            <span style={{ fontSize: '1rem' }}>→</span>
          </Link>
          <Link to="/quiz" className="btn-ghost">
            <span>Quiz personnalisé</span>
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          marginTop: '64px',
          paddingTop: '40px',
          borderTop: `1px solid ${isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.1)'}`,
          flexWrap: 'wrap',
          transition: 'border-color 0.4s',
          animation: 'hero-reveal 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s both',
        }}>
          {[
            { num: '28', label: 'Produits premium' },
            { num: '7', label: 'Catégories' },
            { num: '4.9★', label: 'Note moyenne' },
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: 'center',
              animation: `stat-count-in 0.6s cubic-bezier(0.16,1,0.3,1) ${1.6 + i * 0.15}s both`,
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 300,
                color: accentColor,
                lineHeight: 1,
                transition: 'color 0.4s',
              }}>{stat.num}</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                color: subtitleColor,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '6px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'bounce-scroll 2s ease-in-out infinite',
        pointerEvents: 'none',
      }}>
        <style>{`
          @keyframes bounce-scroll {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(8px); }
          }
        `}</style>
        <div style={{
          width: '20px', height: '32px',
          border: `1px solid ${isDark ? 'rgba(201,168,76,0.3)' : 'rgba(74,103,65,0.3)'}`,
          borderRadius: '10px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px',
        }}>
          <div style={{
            width: '3px', height: '8px',
            background: isDark ? 'rgba(201,168,76,0.5)' : 'rgba(74,103,65,0.5)',
            borderRadius: '2px',
            animation: 'scroll-dot 2s ease-in-out infinite',
          }} />
        </div>
        <style>{`
          @keyframes scroll-dot {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(6px); opacity: 0.3; }
          }
        `}</style>
      </div>
    </section>
  );
}

function AnimatedLeaf({ isDark, size = 120 }: { isDark: boolean; size?: number }) {
  const leafPrimary = isDark ? '#2d5a3d' : '#3d6b4a';
  const leafSecondary = isDark ? '#4a7c59' : '#5a8c6a';
  const leafHighlight = isDark ? '#6B8F5E' : '#7aab80';
  const leafVein = isDark ? 'rgba(122,184,147,0.4)' : 'rgba(90,140,106,0.35)';
  const glowColor = isDark ? 'rgba(122,184,147,0.35)' : 'rgba(74,103,65,0.25)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 24px ${glowColor})`, overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="leaf-grad-l" cx="35%" cy="40%" r="65%">
          <stop offset="0%" stopColor={leafHighlight} stopOpacity="0.9" />
          <stop offset="100%" stopColor={leafPrimary} stopOpacity="1" />
        </radialGradient>
        <radialGradient id="leaf-grad-r" cx="65%" cy="40%" r="65%">
          <stop offset="0%" stopColor={leafSecondary} stopOpacity="0.85" />
          <stop offset="100%" stopColor={leafPrimary} stopOpacity="1" />
        </radialGradient>
        <radialGradient id="leaf-grad-c" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor={leafHighlight} stopOpacity="0.95" />
          <stop offset="100%" stopColor={leafSecondary} stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Feuille gauche externe */}
      <path
        d="M60 108 C60 108 20 95 12 68 C6 48 18 30 32 26 C32 26 40 60 60 108Z"
        fill="url(#leaf-grad-l)"
        opacity="0.75"
        style={{ animation: 'leaf-shimmer 4s ease-in-out infinite 0.5s' }}
      />
      {/* Feuille droite externe */}
      <path
        d="M60 108 C60 108 100 95 108 68 C114 48 102 30 88 26 C88 26 80 60 60 108Z"
        fill="url(#leaf-grad-r)"
        opacity="0.75"
        style={{ animation: 'leaf-shimmer 4s ease-in-out infinite 1s' }}
      />
      {/* Feuille gauche milieu */}
      <path
        d="M60 108 C60 108 30 90 24 65 C19 48 28 35 40 32 C40 32 46 68 60 108Z"
        fill="url(#leaf-grad-l)"
        opacity="0.85"
        style={{ animation: 'leaf-shimmer 4s ease-in-out infinite 0.8s' }}
      />
      {/* Feuille droite milieu */}
      <path
        d="M60 108 C60 108 90 90 96 65 C101 48 92 35 80 32 C80 32 74 68 60 108Z"
        fill="url(#leaf-grad-r)"
        opacity="0.85"
        style={{ animation: 'leaf-shimmer 4s ease-in-out infinite 1.3s' }}
      />
      {/* Feuille gauche intérieure */}
      <path
        d="M60 108 C60 108 40 85 38 62 C36 46 44 36 52 34 C52 34 54 72 60 108Z"
        fill="url(#leaf-grad-c)"
        opacity="0.9"
        style={{ animation: 'leaf-shimmer 4s ease-in-out infinite 0.3s' }}
      />
      {/* Feuille droite intérieure */}
      <path
        d="M60 108 C60 108 80 85 82 62 C84 46 76 36 68 34 C68 34 66 72 60 108Z"
        fill="url(#leaf-grad-c)"
        opacity="0.9"
        style={{ animation: 'leaf-shimmer 4s ease-in-out infinite 0.6s' }}
      />
      {/* Feuille centrale */}
      <path
        d="M60 108 C60 108 46 78 46 52 C46 34 52 20 60 16 C68 20 74 34 74 52 C74 78 60 108 60 108Z"
        fill="url(#leaf-grad-c)"
        opacity="1"
        style={{ animation: 'leaf-shimmer 3.5s ease-in-out infinite' }}
      />

      {/* Nervures centrales */}
      <path d="M60 108 L60 18" stroke={leafVein} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M60 85 L38 62" stroke={leafVein} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      <path d="M60 85 L82 62" stroke={leafVein} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      <path d="M60 70 L28 55" stroke={leafVein} strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M60 70 L92 55" stroke={leafVein} strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M60 55 L22 45" stroke={leafVein} strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
      <path d="M60 55 L98 45" stroke={leafVein} strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />

      {/* Tige */}
      <path
        d="M60 108 L60 122"
        stroke={leafPrimary}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ animation: 'stem-grow 4s ease-in-out infinite' }}
      />

      {/* Point central lumineux */}
      <circle cx="60" cy="108" r="3" fill={leafHighlight} opacity="0.7" />
    </svg>
  );
}
