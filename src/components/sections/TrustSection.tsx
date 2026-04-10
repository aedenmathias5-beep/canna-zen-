import { useEffect, useRef } from 'react';
import '../../styles/design-system.css';

const features = [
  {
    icon: '🛡️',
    title: 'THC < 0.3%',
    desc: '100% légal en France et dans l\'Union Européenne. Conforme à la réglementation.',
  },
  {
    icon: '🚚',
    title: 'Livraison offerte',
    desc: 'Dès 49€ d\'achat en Colissimo. Express 24h disponible via Chronopost.',
  },
  {
    icon: '🔬',
    title: 'Testé en laboratoire',
    desc: 'Chaque lot est analysé par des laboratoires indépendants certifiés.',
  },
  {
    icon: '🌿',
    title: 'Agriculture raisonnée',
    desc: 'Cultivé sans pesticides ni engrais chimiques. Respect de la terre.',
  },
  {
    icon: '💎',
    title: 'Sélection premium',
    desc: 'Seul le meilleur 1% de la production est référencé dans notre catalogue.',
  },
  {
    icon: '🔒',
    title: 'Paiement sécurisé',
    desc: 'Carte bancaire, Apple Pay, crypto — transactions 100% sécurisées.',
  },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.trust-card').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
          });
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '96px 40px',
      background: 'linear-gradient(180deg, #0a0a08 0%, #0d1a10 50%, #0a0a08 100%)',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="badge-luxury" style={{ marginBottom: '24px' }}>Nos engagements</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            color: 'var(--ivoire)',
            lineHeight: 1.1,
          }}>
            L'excellence comme{' '}
            <span className="text-or">standard</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="trust-card reveal"
              style={{
                padding: '40px 32px',
                background: '#0a0a08',
                transition: `opacity 0.6s var(--ease-luxury) ${i * 80}ms, transform 0.6s var(--ease-luxury) ${i * 80}ms, background 0.3s`,
                cursor: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0a0a08'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>{f.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 400,
                color: 'var(--ivoire)',
                marginBottom: '12px',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--gris-fin)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
