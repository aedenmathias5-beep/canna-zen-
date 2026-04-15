// @ts-nocheck
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import { useCart } from '../../lib/CartContext';
import { useTheme } from '../../lib/ThemeContext';
import toast from 'react-hot-toast';

function ArtProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`, {
      icon: '✓',
      style: {
        background: isDark ? '#0d1a10' : '#f0f7f0',
        color: isDark ? '#f5f0e8' : '#1a2f23',
        border: `1px solid ${isDark ? 'rgba(201,168,76,0.2)' : 'rgba(74,103,65,0.2)'}`,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: '280px',
        maxWidth: '280px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(160deg, rgba(14,28,18,0.95) 0%, rgba(10,18,9,0.98) 100%)'
          : 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(248,250,246,0.98) 100%)',
        border: `1px solid ${isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.08)'}`,
        boxShadow: hovered
          ? isDark
            ? '0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.06)'
            : '0 24px 64px rgba(0,40,20,0.12), 0 0 40px rgba(74,103,65,0.04)'
          : isDark
            ? '0 8px 32px rgba(0,0,0,0.35)'
            : '0 8px 32px rgba(74,103,65,0.06)',
        cursor: 'pointer',
        transition: 'box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        borderColor: hovered
          ? isDark ? 'rgba(201,168,76,0.18)' : 'rgba(74,103,65,0.15)'
          : isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.08)',
        flexShrink: 0,
      }}
      onClick={() => navigate(`/boutique/${product.slug}`)}
    >
      {/* Image zone */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = '/placeholder.svg';
            target.style.objectFit = 'contain';
            target.style.padding = '24px';
            target.style.opacity = '0.5';
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark
            ? 'linear-gradient(180deg, transparent 40%, rgba(10,18,9,0.8) 100%)'
            : 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.6) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span
              className="px-2.5 py-1 rounded-full text-[0.5rem] font-semibold tracking-[0.15em] uppercase"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(122,184,147,0.9), rgba(74,124,89,0.9))'
                  : 'linear-gradient(135deg, #4a7c59, #3d6b4a)',
                color: '#fff',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              Nouveau
            </span>
          )}
          {product.isBestSeller && (
            <span
              className="px-2.5 py-1 rounded-full text-[0.5rem] font-semibold tracking-[0.15em] uppercase"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #c9a84c, #f0c060)'
                  : 'linear-gradient(135deg, #4A6741, #6B8F5E)',
                color: isDark ? '#0a0a08' : '#fff',
                boxShadow: isDark ? '0 4px 12px rgba(201,168,76,0.3)' : '0 4px 12px rgba(74,103,65,0.3)',
              }}
            >
              ★ Best-seller
            </span>
          )}
        </div>

        {/* Hover CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-between"
        >
          <span
            className="text-[0.6rem] font-medium tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {(product.categorySlug || '').replace(/-/g, ' ')}
          </span>
        </motion.div>
      </div>

      {/* Info zone */}
      <div className="p-5">
        <h3
          className="font-serif text-lg font-medium leading-tight mb-1 truncate"
          style={{ color: isDark ? '#f5f0e8' : '#1a2f23', transition: 'color 0.3s' }}
        >
          {product.name}
        </h3>
        {product.strain && (
          <p
            className="font-sans text-[0.65rem] mb-2.5 tracking-wide"
            style={{ color: isDark ? 'rgba(245,240,232,0.35)' : 'rgba(26,47,35,0.4)', fontStyle: 'italic' }}
          >
            {product.strain}
          </p>
        )}

        {/* Stars */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i} size={10}
                fill={i < Math.round(product.rating) ? (isDark ? '#c9a84c' : '#4A6741') : 'transparent'}
                color={i < Math.round(product.rating) ? (isDark ? '#c9a84c' : '#4A6741') : (isDark ? 'rgba(245,240,232,0.2)' : 'rgba(26,47,35,0.2)')}
              />
            ))}
            {product.reviewCount > 0 && (
              <span className="text-[0.58rem] ml-1" style={{ color: isDark ? 'rgba(245,240,232,0.3)' : 'rgba(26,47,35,0.35)' }}>
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Separator */}
        <div
          className="w-full h-px mb-3"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05), transparent)'
              : 'linear-gradient(90deg, rgba(74,103,65,0.12), rgba(74,103,65,0.04), transparent)',
          }}
        />

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="font-serif text-xl font-medium"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #c9a84c, #f0c060)'
                  : 'linear-gradient(135deg, #3d5a3a, #5a8c6a)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {product.prices?.[0]?.amount?.toFixed(2) ?? '—'}€
            </span>
          </div>
          <motion.button
            onClick={handleCart}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.6rem] font-semibold tracking-[0.1em] uppercase"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #c9a84c, #e8b84c)'
                : 'linear-gradient(135deg, #4A6741, #6B8F5E)',
              color: isDark ? '#0a0a08' : '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: isDark
                ? '0 4px 16px rgba(201,168,76,0.25)'
                : '0 4px 16px rgba(74,103,65,0.2)',
            }}
          >
            <ShoppingCart size={11} />
            Ajouter
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  const featured = products.filter(p => p.isBestSeller || p.isNew).slice(0, 8);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  };

  const checkScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    setCanScrollLeft(t.scrollLeft > 0);
    setCanScrollRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 10);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(80px, 10vw, 140px) 0',
        background: isDark
          ? 'linear-gradient(180deg, rgba(10,18,9,0) 0%, rgba(14,28,18,0.3) 30%, rgba(10,18,9,0) 100%)'
          : 'linear-gradient(180deg, rgba(248,246,242,0) 0%, rgba(238,245,236,0.3) 30%, rgba(248,246,242,0) 100%)',
      }}
    >
      {/* Section header */}
      <div
        className="flex items-end justify-between flex-wrap gap-5 mb-12"
        style={{ padding: '0 clamp(20px, 4vw, 48px)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase mb-4"
            style={{ color: isDark ? '#4a7c59' : '#4A6741' }}
          >
            — Sélection du concierge
          </div>
          <h2
            className="font-serif leading-none"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 300,
              color: isDark ? 'var(--text-primary)' : '#1a2f23',
            }}
          >
            Nos meilleurs{' '}
            <em
              className="italic"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #c9a84c, #f0c060)'
                  : 'linear-gradient(135deg, #3d5a3a, #5a8c6a)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              produits
            </em>
          </h2>
        </motion.div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              border: `1px solid ${canScrollLeft
                ? isDark ? 'rgba(201,168,76,0.35)' : 'rgba(74,103,65,0.3)'
                : isDark ? 'rgba(201,168,76,0.12)' : 'rgba(74,103,65,0.1)'}`,
              color: canScrollLeft ? (isDark ? '#c9a84c' : '#4A6741') : (isDark ? 'rgba(201,168,76,0.2)' : 'rgba(74,103,65,0.2)'),
              background: 'transparent',
              cursor: canScrollLeft ? 'pointer' : 'default',
            }}
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              border: `1px solid ${canScrollRight
                ? isDark ? 'rgba(201,168,76,0.35)' : 'rgba(74,103,65,0.3)'
                : isDark ? 'rgba(201,168,76,0.12)' : 'rgba(74,103,65,0.1)'}`,
              color: canScrollRight ? (isDark ? '#c9a84c' : '#4A6741') : (isDark ? 'rgba(201,168,76,0.2)' : 'rgba(74,103,65,0.2)'),
              background: 'transparent',
              cursor: canScrollRight ? 'pointer' : 'default',
            }}
          >
            <ChevronRight size={15} />
          </button>
          <Link
            to="/boutique"
            className="btn-ghost ml-2 flex items-center gap-2"
          >
            <span>Voir tout</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Product track */}
      <div
        ref={trackRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto"
        style={{
          padding: '8px clamp(20px, 4vw, 48px) 32px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`.art-track::-webkit-scrollbar { display: none; }`}</style>
        {featured.map((product, i) => (
          <ArtProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}