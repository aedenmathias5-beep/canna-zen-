import { useEffect, useState } from 'react';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const already = sessionStorage.getItem('cz-loaded');
    if (already) { setDone(true); return; }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setHiding(true);
          setTimeout(() => {
            setDone(true);
            sessionStorage.setItem('cz-loaded', '1');
          }, 700);
        }, 400);
      }
      setProgress(Math.min(current, 100));
    }, 70);

    return () => clearInterval(interval);
  }, []);

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050504',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '48px',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        opacity: hiding ? 0 : 1,
        transform: hiding ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: hiding ? 'none' : 'all',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <svg width="52" height="52" viewBox="0 0 48 48" fill="none"
          style={{ animation: 'spin-slow 8s linear infinite', display: 'block', margin: '0 auto' }}>
          <style>{`@keyframes spin-slow { to { transform: rotate(360deg); } }`}</style>
          <path d="M24 2L28 12L38 8L34 18L44 22L34 26L38 36L28 32L24 42L20 32L10 36L14 26L4 22L14 18L10 8L20 12Z"
            fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
          <circle cx="24" cy="24" r="5" fill="#c9a84c" opacity="0.9"/>
        </svg>
        <div style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '1.25rem',
          color: '#c9a84c',
          letterSpacing: '0.4em',
          marginTop: '20px',
          textTransform: 'uppercase',
          fontWeight: 300,
        }}>
          CannaZen
        </div>
        <div style={{
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '0.6rem',
          color: 'rgba(201,168,76,0.4)',
          letterSpacing: '0.3em',
          marginTop: '6px',
          textTransform: 'uppercase',
        }}>
          Nature & Bien-être
        </div>
      </div>

      <div style={{ width: '180px' }}>
        <div style={{ height: '1px', background: 'rgba(201,168,76,0.12)', borderRadius: '1px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #c9a84c, #f0c060)',
            width: `${progress}%`,
            transition: 'width 0.08s ease',
            boxShadow: '0 0 12px rgba(201,168,76,0.6)',
          }} />
        </div>
        <div style={{
          textAlign: 'right',
          marginTop: '10px',
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '0.55rem',
          color: 'rgba(201,168,76,0.35)',
          letterSpacing: '0.15em',
        }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
