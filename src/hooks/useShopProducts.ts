import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { products as localProducts } from '../data/products';
import type { Product } from '../data/products';

interface RemoteProduct {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  short_desc: string | null;
  price: number;
  stock: number;
  images: string[] | null;
  category: string | null;
  category_slug: string | null;
  weight_grams: number | null;
  cbd_percentage: number | null;
  badge: string | null;
  rating: number | null;
  review_count: number | null;
  intensity: number | null;
  effects: string[] | null;
  smokellier_quote: string | null;
  is_new: boolean | null;
  is_best_seller: boolean | null;
  is_active: boolean;
  created_at: string;
}

const CATEGORY_DISPLAY: Record<string, { name: string; emoji: string }> = {
  'gummies-d9':  { name: 'Gummies D9', emoji: '🍬' },
  'fleurs-cbd':  { name: 'Fleurs CBD', emoji: '🌿' },
  'fleurs-d10':  { name: 'Fleurs D10', emoji: '💎' },
  'resines-d10': { name: 'Résines D10', emoji: '🧱' },
  'fleurs-oh':   { name: 'Fleurs OH+', emoji: '⚡' },
  'vapes':       { name: 'Vapes', emoji: '💨' },
  'huiles-cbd':  { name: 'Huiles CBD', emoji: '🫧' },
  fleurs:        { name: 'Fleurs CBD', emoji: '🌿' },
  resines:       { name: 'Résines', emoji: '🧱' },
  huiles:        { name: 'Huiles CBD', emoji: '🫧' },
};

function remoteToProduct(p: RemoteProduct, index: number): Product {
  const catSlug = p.category_slug ?? p.category?.toLowerCase().replace(/\s+/g, '-') ?? 'cbd';
  const display = CATEGORY_DISPLAY[catSlug] ?? { name: p.category ?? catSlug, emoji: '🌿' };
  const slug = p.slug ?? p.name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return {
    id: index + 10000,
    name: p.name,
    slug,
    category: display.name,
    categorySlug: catSlug,
    description: p.description ?? p.name,
    shortDesc: p.short_desc ?? p.description ?? '',
    effects: p.effects ?? [],
    smokellierQuote: p.smokellier_quote ?? `${p.name} — qualité premium.`,
    badge: p.badge ?? undefined,
    rating: p.rating ?? 4.5,
    reviewCount: p.review_count ?? 0,
    intensity: p.intensity ?? 3,
    image: p.images?.[0] ?? '/placeholder-product.svg',
    prices: [{ label: p.weight_grams ? `${p.weight_grams}g` : 'Unité', amount: p.price }],
    inStock: p.stock > 0,
    stock: p.stock,
    cbdPercent: p.cbd_percentage ?? undefined,
    isNew: p.is_new ?? false,
    isBestSeller: p.is_best_seller ?? false,
  };
}

export interface ShopCategory {
  slug: string;
  name: string;
  emoji: string;
  count: number;
}

interface UseShopProductsResult {
  items: Product[];
  allItems: Product[];
  loading: boolean;
  source: 'supabase' | 'local';
  shopCategories: ShopCategory[];
}

export function useShopProducts(category: string, search: string): UseShopProductsResult {
  const [allItems, setAllItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'local'>('local');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function load() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('is_best_seller', { ascending: false });

        if (cancelled) return;
        if (!error && data && data.length > 0) {
          setAllItems((data as RemoteProduct[]).map((p, i) => remoteToProduct(p, i)));
          setSource('supabase');
        } else {
          throw new Error('fallback');
        }
      } catch {
        if (!cancelled) {
          setAllItems(localProducts);
          setSource('local');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const shopCategories = useMemo<ShopCategory[]>(() => {
    const all: ShopCategory = { slug: 'all', name: 'Tous', emoji: '✨', count: allItems.length };
    const cats = new Map<string, ShopCategory>();
    for (const p of allItems) {
      if (!cats.has(p.categorySlug)) {
        const display = CATEGORY_DISPLAY[p.categorySlug] ?? { name: p.category, emoji: '🌿' };
        cats.set(p.categorySlug, { slug: p.categorySlug, name: display.name, emoji: display.emoji, count: 0 });
      }
      cats.get(p.categorySlug)!.count++;
    }
    return [all, ...Array.from(cats.values())];
  }, [allItems]);

  const items = useMemo(() => {
    let result = allItems;
    if (category !== 'all') {
      result = result.filter(p => p.categorySlug === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allItems, category, search]);

  return { items, allItems, loading, source, shopCategories };
}
