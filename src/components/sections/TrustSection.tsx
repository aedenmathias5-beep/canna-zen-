import { useRef, useEffect, useState } from 'react';
import { Shield, Leaf, Truck, Award, FlaskConical, Headphones } from 'lucide-react';
import '../../styles/design-system.css';

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: 'Paiement sécurisé',
    desc: 'Transactions chiffrées SSL. Mollie & Ovri certifiés. Crypto acceptée.',
    color: '#c9a84c',
  },
  {
    icon: Leaf,
    title: 'Qualité certifiée',
    desc: 'Analyses laboratoires indépendants. THC < 0.3% garanti sur chaque lot.',
    color: '#7ab893',
  },
  {
    icon: Truck,
    title: 'Livraison rapide',
    desc: 'Expédition sous 24h en semaine. Colissimo & Mondial Relay. Offerte dès 49€.',
    color: '#c9a84c',
  },
  {
    icon: Award,
    title: 'Premium garanti',
    desc: 'Sélection rigoureuse. Seul le meilleur 1% référencé. Cultivateurs certifiés.',
    color: '#7ab893',
  },
  {
    icon: FlaskConical,
    title: 'Analyses lab',
    desc: 'Chaque lot testé en laboratoire indépendant. Certificats disponibles sur demande.',
    color: '#e8d5a0',
  },
  {
    icon: Headphones,
    title: 'Support dédié',
    desc: 'Conseillers disponibles 7j/7 par email et chat. Réponse sous 2h.',
    color: '#c9a84c',
  },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a08 0%, #0d1a10 50%, #0a0a08 100%)',
      }}
    >
      {/* Décoration fond */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(45,90,61,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s var(--ease-luxury), transform 0.8s var(--ease-luxury)',
        }}>
          <div className="text-label" style={{ color: '#4a7c59', marginBottom: '16px' }}>
            — Pourquoi nous choisir
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#f5f0e8',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            L'excellence à{' '}
            <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>chaque étape</em>
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2px',
          background: 'rgba(201,168,76,0.05)',
          border: '1px solid rgba(201,168,76,0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const isHov = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '40px 36px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: isHov ? 'rgba(26,51,32,0.35)' : '#0a0a08',
                  transition: `background 0.4s ease, opacity 0.6s var(--ease-luxury) ${i * 80}ms, transform 0.6s var(--ease-luxury) ${i * 80}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  cursor: 'default',
                }}
              >
                {/* Hover glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(circle at 30% 30%, ${item.color}0a, transparent 60%)`,
                  opacity: isHov ? 1 : 0,
                  transition: 'opacity 0.4s',
                }} />

                {/* Icon */}
                <div style={{
                  width: '48px', height: '48px',
                  border: `1px solid ${item.color}30`,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                  background: `${item.color}08`,
                  position: 'relative', zIndex: 1,
                  transform: isHov ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}>
                  <Icon size={20} color={item.color} strokeWidth={1.2} />
                </div>

                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.2rem',
                  fontWeight: 400,
                  color: '#f5f0e8',
                  marginBottom: '10px',
                  letterSpacing: '0.01em',
                  position: 'relative', zIndex: 1,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.8rem',
                  lineHeight: 1.65,
                  color: 'rgba(245,240,232,0.45)',
                  fontWeight: 300,
                  position: 'relative', zIndex: 1,
                }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
