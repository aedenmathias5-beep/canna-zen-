import { useState, useEffect } from 'react';
import '../../styles/design-system.css';

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('cannazen-age-verified');
    if (!verified) setShow(true);
  }, []);

  if (!show) return null;

  const handleYes = () => {
    setHiding(true);
    setTimeout(() => {
      localStorage.setItem('cannazen-age-verified', 'true');
      setShow(false);
    }, 500);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(5,5,4,0.92)',
        backdropFilter: 'blur(24px)',
        opacity: hiding ? 0 : 1,
        transition: 'opacity 0.5s var(--ease-luxury)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '20%', left: '20%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float-orb 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%', right: '20%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(26,51,32,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float-orb 10s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes float-orb { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes ring-pulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.15); opacity: 0.1; } }
        @keyframes agegate-in { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes icon-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-6px) rotate(2deg); } 50% { transform: translateY(-3px) rotate(0deg); } 75% { transform: translateY(-8px) rotate(-2deg); } }
        @keyframes icon-glow-pulse { 0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.1), 0 0 40px rgba(45,74,62,0.05), inset 0 0 20px rgba(201,168,76,0.03); } 33% { box-shadow: 0 0 30px rgba(201,168,76,0.2), 0 0 60px rgba(45,74,62,0.1), inset 0 0 30px rgba(201,168,76,0.06); } 66% { box-shadow: 0 0 25px rgba(45,74,62,0.15), 0 0 50px rgba(201,168,76,0.08), inset 0 0 25px rgba(45,74,62,0.04); } }
        @keyframes icon-border-rotate { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes ring-expand { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; } }
        @keyframes sparkle-orbit { 0% { transform: translate(-50%, -50%) rotate(0deg) translateX(55px) scale(0); opacity: 0; } 15% { transform: translate(-50%, -50%) rotate(54deg) translateX(55px) scale(1); opacity: 1; } 85% { transform: translate(-50%, -50%) rotate(306deg) translateX(55px) scale(1); opacity: 1; } 100% { transform: translate(-50%, -50%) rotate(360deg) translateX(55px) scale(0); opacity: 0; } }
        @keyframes sparkle-twinkle { 0%, 100% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes leaf-breathe { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.08); filter: brightness(1.15); } }
      `}</style>

      <div
        style={{
          position: 'relative',
          maxWidth: '440px',
          width: '100%',
          borderRadius: '24px',
          padding: '56px 48px',
          background: 'linear-gradient(145deg, rgba(26,51,32,0.15) 0%, rgba(10,10,8,0.95) 100%)',
          border: '1px solid rgba(201,168,76,0.18)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(201,168,76,0.06)',
          textAlign: 'center',
          animation: 'agegate-in 0.6s var(--ease-luxury) both',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
          borderRadius: '24px 24px 0 0',
        }} />

        <div style={{ position: 'relative', marginBottom: '32px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'relative',
            width: '90px', height: '90px',
            animation: 'icon-float 5s ease-in-out infinite',
          }}>
            <div style={{
              width: '90px', height: '90px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(45,74,62,0.2), rgba(201,168,76,0.06))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'icon-glow-pulse 4s ease-in-out infinite',
              position: 'relative',
              overflow: 'visible',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '92px', height: '92px',
                borderRadius: '50%',
                border: '1px solid transparent',
                borderTopColor: 'rgba(201,168,76,0.4)',
                borderRightColor: 'rgba(201,168,76,0.15)',
                animation: 'icon-border-rotate 6s linear infinite',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '96px', height: '96px',
                borderRadius: '50%',
                border: '1px solid transparent',
                borderBottomColor: 'rgba(45,74,62,0.3)',
                borderLeftColor: 'rgba(45,74,62,0.1)',
                animation: 'icon-border-rotate 8s linear infinite reverse',
                pointerEvents: 'none',
              }} />

              <svg width="44" height="44" viewBox="0 0 60 60" fill="none" style={{ animation: 'leaf-breathe 3s ease-in-out infinite', position: 'relative', zIndex: 2 }}>
                <defs>
                  <linearGradient id="ageleaf1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3d6b4f" />
                    <stop offset="50%" stopColor="#2d4a3e" />
                    <stop offset="100%" stopColor="#1a3528" />
                  </linearGradient>
                  <linearGradient id="ageleaf2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#c4956a" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="ageleaf-glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood floodColor="rgba(201,168,76,0.3)" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="ageleaf-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0">
                      <animate attributeName="offset" values="-0.5;1.5" dur="2.5s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="15%" stopColor="#c9a84c" stopOpacity="0.6">
                      <animate attributeName="offset" values="-0.35;1.65" dur="2.5s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="30%" stopColor="#c9a84c" stopOpacity="0">
                      <animate attributeName="offset" values="-0.2;1.8" dur="2.5s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>
                </defs>

                <g filter="url(#ageleaf-glow)">
                  <g>
                    <animateTransform attributeName="transform" type="rotate" values="-2,30,30;2,30,30;-2,30,30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />

                    <path d="M30 8C30 8 22 22 16 30C10 38 4 44 4 44C4 44 14 41 22 36C30 31 35 22 38 16C41 22 46 31 54 36C62 41 72 44 72 44C72 44 66 38 60 30C54 22 46 8 46 8C46 8 40 20 38 26C36 20 30 8 30 8Z" fill="url(#ageleaf1)" transform="translate(-8,-4) scale(0.78)">
                      <animate attributeName="opacity" values="0.85;1;0.85" dur="2.5s" repeatCount="indefinite" />
                    </path>

                    <path d="M30 8C30 8 22 22 16 30C10 38 4 44 4 44C4 44 14 41 22 36C30 31 35 22 38 16C41 22 46 31 54 36C62 41 72 44 72 44C72 44 66 38 60 30C54 22 46 8 46 8C46 8 40 20 38 26C36 20 30 8 30 8Z" fill="url(#ageleaf2)" transform="translate(-5,-1) scale(0.78)">
                      <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
                    </path>

                    <path d="M30 8C30 8 22 22 16 30C10 38 4 44 4 44C4 44 14 41 22 36C30 31 35 22 38 16C41 22 46 31 54 36C62 41 72 44 72 44C72 44 66 38 60 30C54 22 46 8 46 8C46 8 40 20 38 26C36 20 30 8 30 8Z" fill="url(#ageleaf-shimmer)" opacity="0.5" transform="translate(-8,-4) scale(0.78)" />

                    <line x1="24" y1="12" x2="24" y2="38" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5">
                      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
                    </line>
                  </g>
                </g>

                {[
                  { cx: 10, cy: 18, delay: '0s', dur: '2.2s' },
                  { cx: 42, cy: 12, delay: '0.7s', dur: '1.8s' },
                  { cx: 48, cy: 28, delay: '1.4s', dur: '2.5s' },
                  { cx: 8, cy: 34, delay: '0.3s', dur: '2s' },
                  { cx: 30, cy: 6, delay: '1s', dur: '1.6s' },
                ].map((s, i) => (
                  <circle key={i} cx={s.cx} cy={s.cy} r="1.2" fill="#c9a84c">
                    <animate attributeName="opacity" values="0;1;0" dur={s.dur} begin={s.delay} repeatCount="indefinite" />
                    <animate attributeName="r" values="0.3;1.5;0.3" dur={s.dur} begin={s.delay} repeatCount="indefinite" />
                  </circle>
                ))}
              </svg>
            </div>
          </div>

          {[1, 2, 3].map(i => (
            <div key={i} style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${90 + i * 28}px`,
              height: `${90 + i * 28}px`,
              borderRadius: '50%',
              border: `1px solid rgba(201,168,76,${0.15 - i * 0.03})`,
              animation: `ring-expand ${3 + i}s ease-in-out ${i * 0.7}s infinite`,
              pointerEvents: 'none',
            }} />
          ))}

          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={`sparkle-${i}`} style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '4px', height: '4px',
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(201,168,76,0.8)' : 'rgba(45,74,62,0.6)',
              animation: `sparkle-twinkle ${1.5 + (i * 0.3)}s ease-in-out ${i * 0.5}s infinite`,
              transform: `translate(-50%, -50%) translate(${Math.cos(i * Math.PI / 3) * 60}px, ${Math.sin(i * Math.PI / 3) * 60}px)`,
              pointerEvents: 'none',
              boxShadow: i % 2 === 0 ? '0 0 6px rgba(201,168,76,0.5)' : '0 0 6px rgba(45,74,62,0.4)',
            }} />
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.2rem',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--ivoire)',
          marginBottom: '16px',
          lineHeight: 1.1,
        }}>
          Bienvenue au jardin
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--gris-fin)',
          lineHeight: 1.7,
          fontWeight: 300,
          marginBottom: '40px',
        }}>
          L'accès à notre collection est réservé aux{' '}
          <span style={{ color: 'var(--or)' }}>personnes majeures</span>
          . Confirmez votre âge pour découvrir l'univers de Mary Jane.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={handleYes}
            className="btn-luxury"
            style={{ width: '100%', justifyContent: 'center', borderRadius: '4px' }}
          >
            <span>Oui, j'ai +18 ans</span>
          </button>
          <button
            onClick={handleNo}
            style={{
              width: '100%',
              padding: '14px',
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.1)',
              borderRadius: '4px',
              color: 'var(--gris-fin)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'; (e.currentTarget as HTMLElement).style.color = 'var(--or-pale)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'; (e.currentTarget as HTMLElement).style.color = 'var(--gris-fin)'; }}
          >
            J'ai moins de 18 ans
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(201,168,76,0.08)',
        }}>
          {[
            { icon: '🛡️', text: 'THC < 0.3%' },
            { icon: '✓', text: 'Cannabis légal' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              color: 'rgba(201,168,76,0.4)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
