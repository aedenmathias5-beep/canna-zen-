import { useState, useMemo } from 'react';
import { z } from 'zod';
import type { Product } from '../data/products';

const IntentSchema = z.object({
  goal: z.enum(['sleep', 'relax', 'focus', 'taste', 'budget']),
  format: z.enum(['flower', 'oil', 'gummies', 'resin', 'vape']).optional(),
});

export type Intent = z.infer<typeof IntentSchema>;

const EFFECT_MAP: Record<Intent['goal'], string[]> = {
  sleep:  ['Sommeil', 'Relaxation profonde', 'Relaxation'],
  relax:  ['Relaxation', 'Détente', 'Anti-stress', 'Bien-être'],
  focus:  ['Énergie', 'Focus', 'Créativité'],
  taste:  ['Euphorie', 'Créativité', 'Bien-être'],
  budget: [],
};

const FORMAT_MAP: Record<NonNullable<Intent['format']>, string[]> = {
  flower:  ['fleurs-cbd', 'fleurs-d10', 'fleurs-oh-plus'],
  oil:     ['huiles-cbd'],
  gummies: ['gummies-d9'],
  resin:   ['resines-d10'],
  vape:    ['vapes-oh-plus', 'vapes-hec10'],
};

function scoreProduct(product: Product, intent: Intent): number {
  let score = 0;
  const targetEffects = EFFECT_MAP[intent.goal];

  for (const effect of product.effects) {
    if (targetEffects.some(t => effect.toLowerCase().includes(t.toLowerCase()))) {
      score += 4;
    }
  }

  if (intent.format) {
    const targetSlugs = FORMAT_MAP[intent.format];
    if (targetSlugs.includes(product.categorySlug)) score += 3;
  }

  if (product.rating >= 4.5) score += 1;
  if (product.isBestSeller) score += 1;

  if (intent.goal === 'budget') {
    const minPrice = Math.min(...product.prices.map(p => p.amount));
    score += minPrice < 10 ? 5 : minPrice < 20 ? 3 : 1;
  }

  return score;
}

export function useRecommendations(products: Product[]) {
  const [intent, setIntent] = useState<Intent>({ goal: 'relax' });

  const recommendations = useMemo(
    () =>
      products
        .map(p => ({ ...p, score: scoreProduct(p, intent) }))
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8),
    [products, intent]
  );

  const updateIntent = (partial: Partial<Intent>) => {
    setIntent(prev => IntentSchema.parse({ ...prev, ...partial }));
  };

  return { recommendations, intent, updateIntent };
}
