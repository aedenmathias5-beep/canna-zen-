import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Product } from '../../data/products';
import WishlistHeart from '../ui/WishlistHeart';
import BestSellerBadge from '../ui/BestSellerBadge';
import { ProductBadge } from '../ui/ProductBadge';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const minPrice = Math.min(...product.prices.map(p => p.amount));
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/boutique/${product.slug}`}
        className="group glass-card rounded-2xl overflow-hidden smoke-effect relative block"
      >
        {/* 3D Glare overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            ),
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />

        <div className="relative aspect-square flex items-center justify-center overflow-hidden" style={{ borderBottom: '1px solid var(--border-light)' }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = '/placeholder.svg';
              target.style.objectFit = 'contain';
              target.style.padding = '24px';
              target.style.opacity = '0.5';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.isBestSeller && (
            <BestSellerBadge className="absolute top-3 left-3 z-10" />
          )}
          {product.badge && !product.isBestSeller && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold rounded-full tracking-wider" style={{ background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)', color: '#e8c49a' }}>
              {product.badge}
            </span>
          )}
          {product.isNew && !product.stock && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold rounded-full" style={{ background: 'linear-gradient(135deg, #c4956a, #d4a574)', color: 'white' }}>
              NOUVEAU
            </span>
          )}
          {product.stock !== undefined && product.stock === 0 && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold rounded-full" style={{ background: 'rgba(180,60,50,0.85)', color: 'white' }}>
              ÉPUISÉ
            </span>
          )}
          {product.stock !== undefined && product.stock > 0 && product.stock <= 8 && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold rounded-full" style={{ background: 'rgba(196,149,106,0.9)', color: 'white' }}>
              ⚡ {product.stock} restants
            </span>
          )}
          <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <WishlistHeart productId={product.id} size={16} className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md" />
          </div>
          <div className="absolute bottom-3 left-3 right-14 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#1a2f23] text-[10px] font-medium px-3.5 py-2 rounded-full shadow-lg tracking-wide">
              Voir le produit <ArrowRight size={10} />
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-[9px] font-medium tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{product.category}</p>
          <h3 className="font-['Cormorant_Garamond'] font-semibold text-sm line-clamp-1 group-hover:text-[#c4956a] transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
          {product.strain && (
            <p className="text-[9px] font-light italic mt-0.5 line-clamp-1" style={{ color: 'var(--text-muted)' }}>
              {product.strain}
            </p>
          )}
          <div className="flex items-center gap-1 mt-1.5 mb-1.5">
            <Star size={11} className="fill-[#c9a96e] text-[#c9a96e]" />
            <span className="text-[10px] font-light" style={{ color: 'var(--text-secondary)' }}>{product.rating} ({product.reviewCount})</span>
          </div>
          <div className="mb-2">
            <ProductBadge productId={product.id} />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-gradient-vivid">
              {product.prices.length > 1 ? `Dès ${minPrice.toFixed(2)}€` : `${minPrice.toFixed(2)}€`}
            </p>
            <motion.span
              className="text-[#c4956a]"
              initial={{ opacity: 0, x: -4 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
