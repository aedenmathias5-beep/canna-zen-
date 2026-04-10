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
        zIndex: 'var(--z-modal)' as any,
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

        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <div style={{
            width: '80px', height: '80px',
            margin: '0 auto',
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
          }}>
            🌿
          </div>
          {[1, 2].map(i => (
            <div key={i} style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${80 + i * 24}px`,
              height: `${80 + i * 24}px`,
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.1)',
              animation: `ring-pulse ${2 + i}s ease-in-out ${i * 0.5}s infinite`,
              pointerEvents: 'none',
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
              cursor: 'none',
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
