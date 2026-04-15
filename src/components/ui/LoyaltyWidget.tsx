// @ts-nocheck
import { useEffect, useState } from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { calculateLoyaltyPoints, getTierFromPoints, getTierConfig, getPointsToNextTier } from '../../lib/loyalty-engine';

interface LoyaltyWidgetProps {
  orderTotal?: number;
  points: number;
}

export function LoyaltyWidget({ orderTotal = 0, points }: LoyaltyWidgetProps) {
  const [earned, setEarned] = useState(0);
  const tier = getTierFromPoints(points);
  const config = getTierConfig(tier);
  const toNext = getPointsToNextTier(points);

  useEffect(() => {
    if (orderTotal > 0) {
      setEarned(calculateLoyaltyPoints(orderTotal, tier));
    }
  }, [orderTotal, tier]);

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'linear-gradient(135deg, rgba(26,47,35,0.04), rgba(196,149,106,0.06))',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{config.emoji}</span>
          <div>
            <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Niveau fidélité</p>
            <p className="text-sm font-semibold" style={{ color: config.color }}>{config.label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Solde</p>
          <p className="text-lg font-bold flex items-center gap-1" style={{ color: '#c4956a' }}>
            <Star size={14} className="fill-[#c4956a]" />
            {points.toLocaleString('fr-FR')}
          </p>
        </div>
      </div>

      {toNext !== null && (
        <div className="mb-3">
          <div className="flex justify-between text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
            <span>{points} pts</span>
            <span>+{toNext} pts pour le niveau suivant</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (points / (points + toNext)) * 100)}%`,
                background: `linear-gradient(90deg, ${config.color}, #c4956a)`,
              }}
            />
          </div>
        </div>
      )}

      {earned > 0 && (
        <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <TrendingUp size={13} className="text-[#4a6741]" />
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Cette commande vous rapporte{' '}
            <span className="font-semibold animate-count-pop" style={{ color: '#c4956a' }}>
              +{earned.toLocaleString('fr-FR')} pts
            </span>
          </p>
        </div>
      )}

      <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>
        Multiplicateur ×{config.multiplier} — {config.label}
      </p>
    </div>
  );
}
