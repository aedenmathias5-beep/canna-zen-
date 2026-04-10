import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/design-system.css';

const words = ['Détente', 'Bien-être', 'Sérénité', 'Euphorie', 'Équilibre'];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length);
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

    const colors = ['rgba(201,168,76,', 'rgba(122,184,147,', 'rgba(248,240,232,'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2 - 0.1,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.4 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

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

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--grad-hero)',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{
        position: 'absolute',
        top: '25%', left: '10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float-orb 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%', right: '10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(26,51,32,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float-orb 10s ease-in-out infinite reverse',
      }} />

      <style>{`
        @keyframes float-orb {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes fade-word {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '900px',
      }}>
        <div className="badge-luxury" style={{ marginBottom: '32px', display: 'inline-flex' }}>
          Cannabis légal · THC &lt; 0.3%
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          fontWeight: 300,
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          color: 'var(--ivoire)',
          marginBottom: '8px',
        }}>
          L'univers de
        </h1>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          fontWeight: 300,
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          marginBottom: '32px',
          fontStyle: 'italic',
          display: 'inline-block',
        }}>
          <span className="text-or">Mary Jane</span>
        </h1>

        <div style={{ marginBottom: '20px', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--gris-fin)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginRight: '12px',
          }}>Pour votre</span>
          <span
            key={wordIndex}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--or)',
              fontStyle: 'italic',
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s var(--ease-luxury), transform 0.4s var(--ease-luxury)',
            }}
          >
            {words[wordIndex]}
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
          color: 'var(--gris-fin)',
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: '600px',
          margin: '0 auto 48px',
        }}>
          Sélection premium de fleurs CBD, D10, OH+, résines, vapes et huiles biologiques. 
          L'excellence du cannabis légal français.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/boutique" className="btn-luxury">
            <span>Découvrir la boutique</span>
            <span style={{ fontSize: '1rem' }}>→</span>
          </Link>
          <Link
            to="/quiz"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
              color: 'var(--gris-fin)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '2px',
              transition: 'color 0.3s, border-color 0.3s',
              cursor: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--or-pale)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gris-fin)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; }}
          >
            <span>Quiz personnalisé</span>
          </Link>
        </div>

        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          marginTop: '64px',
          paddingTop: '48px',
          borderTop: '1px solid rgba(201,168,76,0.08)',
        }}>
          {[
            { num: '28', label: 'Produits premium' },
            { num: '7', label: 'Catégories' },
            { num: '4.9★', label: 'Note moyenne' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--or)',
                lineHeight: 1,
              }}>{stat.num}</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                color: 'var(--gris-fin)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '6px',
              }}>{stat.label}</div>
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
        animation: 'bounce-scroll 2s ease-in-out infinite',
      }}>
        <style>{`@keyframes bounce-scroll { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }`}</style>
        <div style={{
          width: '20px', height: '32px',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4px',
        }}>
          <div style={{
            width: '3px', height: '8px',
            background: 'rgba(201,168,76,0.5)',
            borderRadius: '2px',
            animation: 'scroll-dot 2s ease-in-out infinite',
          }} />
        </div>
        <style>{`@keyframes scroll-dot { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(6px); opacity: 0.3; } }`}</style>
      </div>
    </section>
  );
}
