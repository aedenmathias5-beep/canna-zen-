import { CheckCircle } from 'lucide-react';
import { validateCompliance, complianceData } from '../../lib/compliance';

interface ProductBadgeProps {
  productId: number | string;
}

export function ProductBadge({ productId }: ProductBadgeProps) {
  const data = complianceData[String(productId)];
  if (!data) return null;

  const comp = validateCompliance(data);
  if (!comp.compliant) return null;

  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium"
      style={{
        background: 'rgba(74,103,65,0.08)',
        border: '1px solid rgba(74,103,65,0.2)',
        color: '#4a6741',
      }}
    >
      <CheckCircle className="w-2.5 h-2.5 shrink-0" />
      <span>Conforme &lt;0.3% THC</span>
    </div>
  );
}
