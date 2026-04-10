import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard3D } from '../ui/ProductCard3D';
import '../../styles/design-system.css';

export function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 6);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '96px 0', background: 'var(--noir)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge-luxury" style={{ marginBottom: '16px' }}>Sélection</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--ivoire)',
              lineHeight: 1.05,
            }}>
              Nos <span className="text-or">best-sellers</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {(['left', 'right'] as const).map(dir => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                style={{
                  width: '44px', height: '44px',
                  border: '1px solid rgba(201,168,76,0.25)',
                  background: 'transparent',
                  borderRadius: '50%',
                  color: 'var(--or-pale)',
                  cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem',
                  transition: 'background 0.3s, border-color 0.3s',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.6)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)';
                }}
              >
                {dir === 'left' ? '←' : '→'}
              </button>
            ))}
            <Link
              to="/boutique"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--or)',
                textDecoration: 'none',
                cursor: 'none',
              }}
            >
              Voir tout →
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          padding: '0 40px 20px',
          scrollSnapType: 'x mandatory',
          cursor: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {bestSellers.map(p => (
          <div
            key={p.id}
            style={{ minWidth: '300px', scrollSnapAlign: 'start', flexShrink: 0 }}
          >
            <ProductCard3D product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
