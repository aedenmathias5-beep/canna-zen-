import { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { products as localProducts } from '../../data/products';
import ProductCard from './ProductCard';
import type { Product } from '../../data/products';

interface RemoteProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  images: string[] | null;
  category: string;
  weight_grams: number | null;
  cbd_percentage: number | null;
  is_active: boolean;
  created_at: string;
}

const CATEGORY_MAP: Record<string, string> = {
  fleurs: 'Fleurs CBD',
  resines: 'Résines',
  huiles: 'Huiles',
  gummies: 'Gummies',
  vapes: 'Vapes',
  infusions: 'Infusions',
};

function remoteToLocal(p: RemoteProduct, index: number): Product {
  const category = CATEGORY_MAP[p.category ?? ''] ?? p.category ?? 'CBD';
  const slug = p.name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return {
    id: index + 1000,
    name: p.name,
    slug,
    category,
    categorySlug: p.category ?? 'cbd',
    description: p.description ?? p.name,
    shortDesc: p.description ?? '',
    effects: [],
    smokellierQuote: '',
    rating: 4.5,
    reviewCount: 0,
    intensity: 2,
    image: (p.images?.[0]) ?? '/placeholder-product.svg',
    prices: [{ label: p.weight_grams ? `${p.weight_grams}g` : 'Unité', amount: p.price }],
    inStock: p.stock_quantity > 0,
    stock: p.stock_quantity,
    cbdPercent: p.cbd_percentage ?? undefined,
  };
}

interface ProductGridProps {
  title?: string;
  limit?: number;
  showFallback?: boolean;
  category?: string;
}

export default function ProductGrid({ title = 'Catalogue', limit = 8, showFallback = true, category }: ProductGridProps) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'local'>('local');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (category) query = query.eq('category', category);

        const { data, error } = await query;

        if (cancelled) return;

        if (!error && data && data.length > 0) {
          setItems((data as unknown as RemoteProduct[]).map((p, i) => remoteToLocal(p, i)));
          setSource('supabase');
        } else {
          throw new Error('empty or error');
        }
      } catch {
        if (!cancelled && showFallback) {
          const fallback = category
            ? localProducts.filter(p => p.categorySlug === category).slice(0, limit)
            : localProducts.slice(0, limit);
          setItems(fallback);
          setSource('local');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, showFallback, category ?? '']);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3">
        <Loader2 size={18} className="animate-spin text-[#c4956a]" />
        <span className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>Chargement des produits...</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <RefreshCw size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
        <p className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>Aucun produit disponible</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold italic text-gradient-vivid">
            {title}
          </h2>
          {source === 'supabase' && (
            <span className="text-[10px] px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'rgba(74,103,65,0.08)', color: '#4a6741', border: '1px solid rgba(74,103,65,0.15)' }}>
              ● Live
            </span>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-child">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
