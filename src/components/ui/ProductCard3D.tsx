import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../lib/CartContext';
import type { Product } from '../../data/products';
import '../../styles/design-system.css';

interface Props {
  product: Product;
}

export function ProductCard3D({ product }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -7;
    const rotY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    if (shineRef.current) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      shineRef.current.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    setIsHovered(false);
  };

  const price = product.prices[0];
  const image = product.image;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, price, 1);
  };

  return (
    <div
      ref={cardRef}
      className="card-3d"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, rgba(26,51,32,0.5) 0%, rgba(13,26,16,0.95) 100%)',
        border: '1px solid rgba(201,168,76,0.12)',
        cursor: 'none',
        transition: 'transform 0.4s var(--ease-luxury), box-shadow 0.4s var(--ease-luxury)',
      }}
    >
      <div ref={shineRef} className="card-shine" />

      <Link to={`/boutique/${product.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#0d1a10' }}>
          {image && !image.includes('placeholder') ? (
            <img
              src={image}
              alt={product.name}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.6s var(--ease-luxury)',
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '4rem',
              background: 'linear-gradient(135deg, #0d1a10, #1a3320)',
            }}>
              {product.categorySlug === 'gummies-d9' ? '🍬' :
               product.categorySlug === 'huiles-cbd' ? '🫧' :
               product.categorySlug === 'vapes' ? '💨' :
               product.categorySlug === 'resines-d10' ? '🧱' : '🌿'}
            </div>
          )}

          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {product.isNew && (
              <span style={{
                padding: '4px 10px', background: 'var(--vert-jade)', color: 'var(--ivoire)',
                fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '4px',
                fontFamily: 'var(--font-body)',
              }}>Nouveau</span>
            )}
            {product.isBestSeller && (
              <span style={{
                padding: '4px 10px', background: 'var(--or)', color: 'var(--noir)',
                fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '4px',
                fontFamily: 'var(--font-body)', fontWeight: 500,
              }}>Best</span>
            )}
          </div>

          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,8,0.85) 0%, transparent 50%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s var(--ease-luxury)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '20px',
          }}>
            <button
              onClick={handleAddToCart}
              style={{
                padding: '10px 24px',
                background: 'var(--or)', color: 'var(--noir)',
                border: 'none', borderRadius: '999px',
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'var(--font-body)', fontWeight: 500, cursor: 'none',
                transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                transition: 'transform 0.4s var(--ease-luxury)',
              }}
            >
              Ajouter au panier
            </button>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem', fontWeight: 400,
            color: 'var(--ivoire)', marginBottom: '6px', lineHeight: 1.2,
          }}>
            {product.name}
          </h3>

          {product.cbdPercent && (
            <div style={{
              fontSize: '0.6rem', color: 'var(--vert-clair)',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: '10px', fontFamily: 'var(--font-body)',
            }}>
              CBD {product.cbdPercent}%
            </div>
          )}

          {product.effects && product.effects.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
              {product.effects.slice(0, 2).map((ef, i) => (
                <span key={i} style={{
                  padding: '3px 8px',
                  background: 'rgba(122,184,147,0.08)',
                  border: '1px solid rgba(122,184,147,0.2)',
                  borderRadius: '999px',
                  fontSize: '0.55rem', color: 'var(--vert-clair)',
                  letterSpacing: '0.1em', fontFamily: 'var(--font-body)',
                }}>{ef}</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem', fontWeight: 400,
              color: 'var(--or)',
            }}>
              {price.amount.toFixed(2)}€
            </span>
            {price.label && (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem', color: 'var(--gris-fin)',
                letterSpacing: '0.1em',
              }}>{price.label}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
