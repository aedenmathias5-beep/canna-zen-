import { Leaf, Truck, Package, CheckCircle } from 'lucide-react';

interface Props {
  currentAmount: number;
  threshold?: number;
}

export default function ShippingProgress({ currentAmount, threshold = 49 }: Props) {
  const progress = Math.min((currentAmount / threshold) * 100, 100);
  const remaining = Math.max(threshold - currentAmount, 0);
  const isFree = currentAmount >= threshold;

  return (
    <div className="rounded-xl p-4 border border-[var(--border-color)]/50" style={{ background: 'rgba(196,149,106,0.03)' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-[#c4956a]" />
          <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
            {isFree ? 'Livraison offerte !' : `Plus que ${remaining.toFixed(2)}€ pour la livraison gratuite`}
          </span>
        </div>
        {isFree && <CheckCircle size={14} className="text-[#4a6741]" />}
      </div>

      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            background: isFree
              ? 'linear-gradient(90deg, #4a6741, #6b8f5e)'
              : 'linear-gradient(90deg, #c4956a, #d4a574)',
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
          style={{ left: `calc(${Math.min(progress, 95)}% - 8px)` }}
        >
          <Leaf size={12} className={`${isFree ? 'text-[#4a6741]' : 'text-[#c4956a]'} drop-shadow-sm shipping-leaf`} />
        </div>
      </div>

      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] font-light" style={{ color: 'var(--text-muted)' }}>0€</span>
        <div className="flex items-center gap-1">
          <Package size={9} className="text-[var(--text-muted)]" />
          <span className="text-[10px] font-light" style={{ color: 'var(--text-muted)' }}>{threshold}€</span>
        </div>
      </div>
    </div>
  );
}
