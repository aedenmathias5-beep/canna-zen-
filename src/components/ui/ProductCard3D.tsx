import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useCart } from '../../lib/CartContext';
import type { Product } from '../../data/products';
import '../../styles/design-system.css';

interface Props {
  product: Product;
}

export function ProductCard3D({ product }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const price = product.prices[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setRotation({ x: dy * -8, y: dx * 10 });
    setShine({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
    setIsHovered(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, price, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <Link
        to={`/boutique/${product.slug}`}
        style={{
          display: 'block',
          textDecoration: 'none',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(26,51,32,0.6) 0%, rgba(13,26,16,0.9) 100%)',
          border: '1px solid rgba(201,168,76,0.1)',
          position: 'relative',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
          transition: isHovered
            ? 'transform 0.1s ease'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
          boxShadow: isHovered
            ? '0 30px 80px rgba(0,0,0,0.5), 0 8px 30px rgba(201,168,76,0.15)'
            : '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Shine */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          pointerEvents: 'none', zIndex: 3,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
          borderRadius: '12px',
        }} />

        {/* Image */}
        <div style={{
          position: 'relative', paddingTop: '100%', overflow: 'hidden',
          background: 'linear-gradient(135deg, #0d1a10, #1a3320)',
        }}>
          {product.image && !product.image.includes('placeholder') ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
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

          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,8,0.7) 0%, transparent 50%)',
          }} />

          {/* Badges */}
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            display: 'flex', flexDirection: 'column', gap: '6px',
          }}>
            {product.isNew && (
              <span style={{
                padding: '4px 10px',
                background: 'linear-gradient(135deg, #c9a84c, #f0c060)',
                borderRadius: '20px', fontSize: '0.55rem',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a0a08',
              }}>Nouveau</span>
            )}
            {product.isBestSeller && (
              <span style={{
                padding: '4px 10px',
                background: 'rgba(26,51,32,0.9)',
                border: '1px solid rgba(122,184,147,0.3)',
                borderRadius: '20px', fontSize: '0.55rem',
                fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7ab893',
              }}>Best</span>
            )}
            {product.badge && !product.isBestSeller && (
              <span style={{
                padding: '4px 10px',
                background: 'rgba(26,51,32,0.9)',
                border: '1px solid rgba(122,184,147,0.3)',
                borderRadius: '20px', fontSize: '0.55rem',
                fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7ab893',
              }}>{product.badge}</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            style={{
              position: 'absolute', top: '12px', right: '12px',
              width: '32px', height: '32px',
              background: 'rgba(10,10,8,0.6)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 0.3s, transform 0.3s',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Heart size={12} color="#c9a84c" />
          </button>

          {/* Quick view */}
          <div style={{
            position: 'absolute', bottom: '12px', left: '12px', right: '12px',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s, transform 0.3s',
            display: 'flex', justifyContent: 'center',
          }}>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px',
                background: 'rgba(10,10,8,0.8)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '20px',
                color: '#e8d5a0',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'none',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Eye size={10} />
              Aperçu rapide
            </button>
          </div>
        </div>

        {/* Infos */}
        <div style={{ padding: '16px', position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#4a7c59', marginBottom: '6px',
          }}>
            {product.category}
          </div>

          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.1rem', fontWeight: 400,
            color: '#f5f0e8', lineHeight: 1.2,
            marginBottom: '8px', letterSpacing: '0.01em',
          }}>
            {product.name}
          </h3>

          {/* Effets */}
          {product.effects && product.effects.length > 0 && (
            <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', flexWrap: 'wrap' }}>
              {product.effects.slice(0, 2).map((ef, i) => (
                <span key={i} style={{
                  padding: '2px 8px',
                  background: 'rgba(122,184,147,0.1)',
                  border: '1px solid rgba(122,184,147,0.2)',
                  borderRadius: '4px', fontSize: '0.55rem',
                  color: '#7ab893', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.08em',
                }}>{ef}</span>
              ))}
            </div>
          )}

          {/* CBD */}
          {product.cbdPercent && (
            <div style={{ marginBottom: '10px' }}>
              <span style={{
                padding: '2px 8px',
                background: 'rgba(122,184,147,0.1)',
                border: '1px solid rgba(122,184,147,0.2)',
                borderRadius: '4px', fontSize: '0.55rem',
                color: '#7ab893', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.08em',
              }}>CBD {product.cbdPercent}%</span>
            </div>
          )}

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i} size={9}
                    fill={i < Math.round(product.rating) ? '#c9a84c' : 'none'}
                    color={i < Math.round(product.rating) ? '#c9a84c' : 'rgba(201,168,76,0.3)'}
                  />
                ))}
              </div>
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem',
                color: 'rgba(245,240,232,0.4)',
              }}>({product.reviewCount})</span>
            </div>
          )}

          {/* Prix + Panier */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.3rem', fontWeight: 500,
                color: '#c9a84c', letterSpacing: '0.01em',
              }}>
                {price.amount.toFixed(2).replace('.', ',')} €
              </div>
              {price.label && (
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.55rem', color: 'rgba(245,240,232,0.35)',
                  letterSpacing: '0.08em',
                }}>{price.label}</div>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px',
                background: addedToCart
                  ? 'linear-gradient(135deg, #2d5a3d, #4a7c59)'
                  : 'linear-gradient(135deg, #c9a84c, #f0c060)',
                border: 'none', borderRadius: '6px',
                color: addedToCart ? '#f5f0e8' : '#0a0a08',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.6rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: addedToCart ? 'scale(0.95)' : 'scale(1)',
                whiteSpace: 'nowrap',
              }}
            >
              <ShoppingCart size={11} />
              {addedToCart ? 'Ajouté ✓' : 'Ajouter'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
