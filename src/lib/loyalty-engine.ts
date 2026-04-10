export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface TierConfig {
  tier: LoyaltyTier;
  label: string;
  minPoints: number;
  multiplier: number;
  color: string;
  emoji: string;
}

export const TIERS: TierConfig[] = [
  { tier: 'bronze',   label: 'Bronze',   minPoints: 0,    multiplier: 1.0, color: '#cd7f32', emoji: '🥉' },
  { tier: 'silver',   label: 'Argent',   minPoints: 500,  multiplier: 1.5, color: '#9ca3af', emoji: '🥈' },
  { tier: 'gold',     label: 'Or',       minPoints: 1500, multiplier: 2.0, color: '#c4956a', emoji: '🥇' },
  { tier: 'platinum', label: 'Platine',  minPoints: 3000, multiplier: 3.0, color: '#2d4a3e', emoji: '💎' },
];

export function getTierFromPoints(points: number): LoyaltyTier {
  const tier = [...TIERS].reverse().find(t => points >= t.minPoints);
  return tier?.tier ?? 'bronze';
}

export function getTierConfig(tier: LoyaltyTier): TierConfig {
  return TIERS.find(t => t.tier === tier) ?? TIERS[0];
}

export function calculateLoyaltyPoints(orderTotal: number, tier: LoyaltyTier): number {
  const config = getTierConfig(tier);
  return Math.floor(orderTotal * config.multiplier);
}

export function getNextTier(currentTier: LoyaltyTier): TierConfig | null {
  const idx = TIERS.findIndex(t => t.tier === currentTier);
  return TIERS[idx + 1] ?? null;
}

export function getPointsToNextTier(currentPoints: number): number | null {
  const nextTier = TIERS.find(t => t.minPoints > currentPoints);
  if (!nextTier) return null;
  return nextTier.minPoints - currentPoints;
}
