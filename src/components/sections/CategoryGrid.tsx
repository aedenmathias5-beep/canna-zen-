import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { products } from '../../data/products';
import '../../styles/design-system.css';

const CATEGORIES = [
  {
    slug: 'fleurs-cbd',
    name: 'Fleurs CBD',
    desc: 'Indoor, outdoor, greenhouse — toutes les textures',
    color: '#2d5a3d',
    accent: '#7ab893',
    size: 'large',
  },
  {
    slug: 'fleurs-d10',
    name: 'Fleurs D10',
    desc: 'Delta-10 — puissance & euphorie légale',
    color: '#1a3320',
    accent: '#c9a84c',
    size: 'small',
  },
  {
    slug: 'fleurs-oh',
    name: 'Fleurs OH+',
    desc: 'OH+ — expertise & intensité premium',
    color: '#0d1a10',
    accent: '#7ab893',
    size: 'small',
  },
  {
    slug: 'resines-d10',
    name: 'Résines D10',
    desc: 'Hash, pollen et rosin de qualité',
    color: '#1a3320',
    accent: '#e8d5a0',
    size: 'medium',
  },
  {
    slug: 'vapes',
    name: 'Vapes',
    desc: 'Cartouches et dispositifs discrets',
    color: '#0d1a10',
    accent: '#7ab893',
    size: 'medium',
  },
  {
    slug: 'huiles-cbd',
    name: 'Huiles CBD',
    desc: 'Full spectrum, broad spectrum, isolat',
    color: '#1a3320',
    accent: '#e8d5a0',
    size: 'medium',
  },
  {
    slug: 'gummies-d9',
    name: 'Gummies D9',
    desc: 'Gélifiés Delta-9 & comestibles premium',
    color: '#2d5a3d',
    accent: '#c9a84c',
    size: 'medium',
  },
];

const SPANS = [
  { col: 'span 5', row: 'span 2' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 3', row: 'span 1' },
  { col: 'span 3', row: 'span 1' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 3', row: 'span 1' },
  { col: 'span 4', row: 'span 1' },
];

export function CategoryGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #0a0a08 0%, #0d1a10 100%)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '60px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s var(--ease-luxury)',
        }}>
          <div>
            <div className="text-label" style={{ color: '#4a7c59', marginBottom: '12px' }}>
              — Explorer
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: '#f5f0e8',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              Toutes nos{' '}
              <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>catégories</em>
            </h2>
          </div>
        </div>

        {/* Grid asymétrique */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(3, 200px)',
          gap: '14px',
        }}>
          {CATEGORIES.map((cat, i) => {
            const count = products.filter(p => p.categorySlug === cat.slug).length;
            const isFirst = i === 0;

            return (
              <Link
                key={cat.slug}
                to={`/boutique?cat=${cat.slug}`}
                onMouseEnter={() => setHovered(cat.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn: SPANS[i].col,
                  gridRow: SPANS[i].row,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  background: `linear-gradient(145deg, ${cat.color}cc, ${cat.color}ff)`,
                  border: `1px solid ${hovered === cat.slug ? cat.accent + '55' : cat.accent + '18'}`,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  position: 'relative',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                  transition: `opacity 0.7s var(--ease-luxury) ${i * 90}ms, transform 0.7s var(--ease-luxury) ${i * 90}ms, box-shadow 0.4s ease, border-color 0.3s`,
                  boxShadow: hovered === cat.slug
                    ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${cat.accent}22`
                    : '0 4px 20px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 30% 50%, ${cat.accent}18 0%, transparent 70%)`,
                  opacity: hovered === cat.slug ? 1 : 0,
                  transition: 'opacity 0.4s',
                }} />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,8,0.6) 0%, transparent 60%)',
                }} />

                {/* Corner decoration */}
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  width: '32px', height: '32px',
                  border: `1px solid ${cat.accent}40`,
                  borderRadius: '50%',
                  transform: hovered === cat.slug ? 'scale(3) rotate(45deg)' : 'scale(1)',
                  transition: 'transform 0.6s var(--ease-luxury)',
                  opacity: 0.4,
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: isFirst ? '2.2rem' : '1.4rem',
                    fontWeight: 400,
                    color: '#f5f0e8',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                    transform: hovered === cat.slug ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'transform 0.4s var(--ease-luxury)',
                  }}>
                    {cat.name}
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.65rem',
                    color: `${cat.accent}cc`,
                    letterSpacing: '0.05em',
                    marginTop: '6px',
                    opacity: hovered === cat.slug ? 1 : 0.6,
                    transform: hovered === cat.slug ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'opacity 0.4s, transform 0.4s var(--ease-luxury)',
                  }}>
                    {cat.desc}
                  </div>
                  {count > 0 && (
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.55rem',
                      color: 'rgba(245,240,232,0.35)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginTop: '8px',
                      opacity: hovered === cat.slug ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }}>
                      {count} produit{count > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
