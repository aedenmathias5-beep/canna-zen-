import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard3D } from '../ui/ProductCard3D';
import '../../styles/design-system.css';

export function FeaturedProducts() {
  const featured = products.filter(p => p.isBestSeller || p.isNew).slice(0, 8);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  };

  const checkScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 0);
    setCanScrollRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 10);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, var(--noir) 0%, var(--vert-nuit) 50%, var(--noir) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '0 40px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '60px',
        flexWrap: 'wrap',
        gap: '24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s var(--ease-luxury), transform 0.8s var(--ease-luxury)',
      }}>
        <div>
          <div className="text-label" style={{ color: '#4a7c59', marginBottom: '16px' }}>
            — Sélection premium
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#f5f0e8',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            Nos meilleurs<br />
            <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>produits</em>
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            style={{
              width: '44px', height: '44px',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '50%', background: 'none',
              color: canScrollLeft ? '#c9a84c' : 'rgba(201,168,76,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: canScrollLeft ? 'pointer' : 'default',
              transition: 'all 0.3s',
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            style={{
              width: '44px', height: '44px',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '50%',
              background: canScrollRight ? 'rgba(201,168,76,0.1)' : 'none',
              color: canScrollRight ? '#c9a84c' : 'rgba(201,168,76,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: canScrollRight ? 'pointer' : 'default',
              transition: 'all 0.3s',
            }}
          >
            <ChevronRight size={16} />
          </button>

          <Link
            to="/boutique"
            className="btn-ghost"
            style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Voir tout</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={trackRef}
        onScroll={checkScroll}
        style={{
          display: 'flex',
          gap: '20px',
          padding: '8px 40px 24px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`::-webkit-scrollbar { display: none; }`}</style>
        {featured.map((product, i) => (
          <div
            key={product.id}
            style={{
              minWidth: '270px',
              maxWidth: '270px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.7s var(--ease-luxury) ${i * 80}ms, transform 0.7s var(--ease-luxury) ${i * 80}ms`,
            }}
          >
            <ProductCard3D product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
