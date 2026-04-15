export const TIERS = [
  { name: 'Bronze', minPoints: 0, discount: 0 },
  { name: 'Argent', minPoints: 500, discount: 5 },
  { name: 'Or', minPoints: 1500, discount: 10 },
  { name: 'Platine', minPoints: 5000, discount: 15 },
];

export const LOYALTY_TIERS = [
  { name: 'Bronze', minPoints: 0, discount: 0 },
  { name: 'Argent', minPoints: 500, discount: 5 },
  { name: 'Or', minPoints: 1500, discount: 10 },
  { name: 'Platine', minPoints: 5000, discount: 15 },
];

export function calculateLoyaltyPoints(orderTotal: number) {
  return Math.floor(orderTotal);
}

export function getTierFromPoints(points: number) {
  const tier = [...LOYALTY_TIERS].reverse().find(t => points >= t.minPoints);
  return tier?.name || 'Bronze';
}

export function getTierConfig(tierName: string) {
  return LOYALTY_TIERS.find(t => t.name === tierName) || LOYALTY_TIERS[0];
}

export function getPointsToNextTier(points: number) {
  const next = LOYALTY_TIERS.find(t => t.minPoints > points);
  return next ? next.minPoints - points : 0;
}

export function calculateLevel(points: number) {
  const tierName = getTierFromPoints(points);
  const config = getTierConfig(tierName);
  const next = LOYALTY_TIERS.find(t => t.minPoints > points);
  return { level: LOYALTY_TIERS.indexOf(config) + 1, name: tierName, nextLevel: next?.minPoints || config.minPoints, progress: 0 };
}

export function getRewards() { return []; }
