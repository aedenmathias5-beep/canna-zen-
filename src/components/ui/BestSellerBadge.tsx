import { Flame } from 'lucide-react';

interface Props {
  className?: string;
}

export default function BestSellerBadge({ className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold rounded-full tracking-wider bestseller-neon ${className}`}>
      <Flame size={10} className="bestseller-flame" />
      BEST-SELLER
    </span>
  );
}
