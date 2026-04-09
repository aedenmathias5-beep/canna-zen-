import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import type { Product } from '../../data/products';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const minPrice = Math.min(...product.prices.map(p => p.amount));

  return (
    <Link
      to={`/boutique/${product.slug}`}
      className="group glass-card rounded-2xl overflow-hidden card-3d smoke-effect relative"
    >
      <div className="relative aspect-square flex items-center justify-center overflow-hidden" style={{ borderBottom: '1px solid var(--border-light)' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold rounded-full tracking-wider" style={{ background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)', color: '#e8c49a' }}>
            {product.badge}
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold rounded-full" style={{ background: 'linear-gradient(135deg, #c4956a, #d4a574)', color: 'white' }}>
            NOUVEAU
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#1a2f23] text-[10px] font-medium px-3.5 py-2 rounded-full shadow-lg tracking-wide">
            Voir le produit <ArrowRight size={10} />
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[9px] font-medium tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{product.category}</p>
        <h3 className="font-['Cormorant_Garamond'] font-semibold text-sm line-clamp-1 group-hover:text-[#c4956a] transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
        <div className="flex items-center gap-1 mt-1.5 mb-2">
          <Star size={11} className="fill-[#c9a96e] text-[#c9a96e]" />
          <span className="text-[10px] font-light" style={{ color: 'var(--text-secondary)' }}>{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-gradient-vivid">
            {product.prices.length > 1 ? `Dès ${minPrice.toFixed(2)}€` : `${minPrice.toFixed(2)}€`}
          </p>
          <span className="text-[#c4956a] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
