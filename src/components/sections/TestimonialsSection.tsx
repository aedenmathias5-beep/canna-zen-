import { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';
import '../../styles/design-system.css';

const TESTIMONIALS = [
  {
    name: 'Alexandre M.',
    location: 'Paris',
    rating: 5,
    text: "Qualité exceptionnelle, livraison ultra rapide. Les fleurs Indoor sont sublimes, arôme puissant et bien préservé. Je recommande sans hésitation.",
    product: 'Gelato Indoor',
    date: 'Mars 2025',
  },
  {
    name: 'Sarah K.',
    location: 'Lyon',
    rating: 5,
    text: "L'huile full spectrum m'a vraiment aidée pour mon sommeil. Service client top, réponse en moins d'une heure. Packaging très premium.",
    product: 'Huile CBD 20%',
    date: 'Février 2025',
  },
  {
    name: 'Thomas R.',
    location: 'Bordeaux',
    rating: 5,
    text: "Ma commande de résine hash est arrivée en 24h comme promis. Discret, professionnel. La qualité est vraiment au rendez-vous.",
    product: 'Hash Marocain',
    date: 'Mars 2025',
  },
  {
    name: 'Camille D.',
    location: 'Strasbourg',
    rating: 5,
    text: "Boutique de référence pour le CBD en France. Catalogue immense, prix justes, et les gummies sont délicieux ! Commande régulière depuis 6 mois.",
    product: 'Gummies Mixed',
    date: 'Janvier 2025',
  },
  {
    name: 'Nicolas B.',
    location: 'Marseille',
    rating: 5,
    text: "Les résines D10 Afghan Gold sont extraordinaires. Un terroir authentique qu'on ressent vraiment. Merci CannaZen.",
    product: 'Afghan Gold D10',
    date: 'Décembre 2024',
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      setActive(i => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(t);
  }, [auto]);

  const current = TESTIMONIALS[active];

  const sectionBg = isDark
    ? 'linear-gradient(135deg, #0e1c12 0%, #0a0a08 100%)'
    : 'linear-gradient(135deg, #eef5ec 0%, #f5f2ec 100%)';

  const quoteColor = isDark ? '#f5f0e8' : '#1a2f23';
  const quoteDecor = isDark ? 'rgba(201,168,76,0.04)' : 'rgba(74,103,65,0.04)';
  const nameColor = isDark ? '#c9a84c' : '#4A6741';
  const metaColor = isDark ? 'rgba(245,240,232,0.35)' : 'rgba(26,47,35,0.4)';
  const dotActive = isDark
    ? 'linear-gradient(90deg, #c9a84c, #f0c060)'
    : 'linear-gradient(90deg, #4A6741, #6B8F5E)';
  const dotInactive = isDark ? 'rgba(245,240,232,0.15)' : 'rgba(74,103,65,0.15)';

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 40px',
        background: sectionBg,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.6s',
      }}
    >
      <Quote
        size={200}
        style={{
          position: 'absolute',
          top: '40px', left: '40px',
          color: quoteDecor,
          pointerEvents: 'none',
        }}
      />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s var(--ease-luxury), transform 0.8s var(--ease-luxury)',
      }}>
        <div className="text-label" style={{ color: isDark ? '#4a7c59' : '#4A6741', marginBottom: '48px' }}>
          — Ils nous font confiance
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '32px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={nameColor} color={nameColor} />
          ))}
        </div>

        <blockquote
          key={active}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: quoteColor,
            lineHeight: 1.5,
            letterSpacing: '0.01em',
            marginBottom: '32px',
            animation: 'testimonial-in 0.5s var(--ease-luxury)',
            transition: 'color 0.4s',
          }}
        >
          <style>{`
            @keyframes testimonial-in {
              from { opacity: 0; transform: translateY(16px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          "{current.text}"
        </blockquote>

        <div key={`author-${active}`} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '48px',
          animation: 'testimonial-in 0.5s var(--ease-luxury) 0.1s both',
        }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            fontSize: '0.85rem',
            color: nameColor,
            letterSpacing: '0.05em',
            transition: 'color 0.4s',
          }}>
            {current.name}
          </span>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.65rem',
            color: metaColor,
            letterSpacing: '0.1em',
            transition: 'color 0.4s',
          }}>
            {current.location} · {current.product} · {current.date}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setAuto(false); }}
              style={{
                width: i === active ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === active ? dotActive : dotInactive,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s var(--ease-luxury)',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
