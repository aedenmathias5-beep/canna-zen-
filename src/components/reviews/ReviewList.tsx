import { useEffect, useState } from 'react';
import { Star, Loader2, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Review {
  id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewListProps {
  productSlug: string;
  refreshKey?: number;
}

export default function ReviewList({ productSlug, refreshKey = 0 }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableExists, setTableExists] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    supabase
      .from('reviews')
      .select('id, author_name, rating, comment, created_at')
      .eq('product_slug', productSlug)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          if (error.message?.includes('42P01') || error.code === 'PGRST205') {
            setTableExists(false);
          }
          setLoading(false);
          return;
        }
        setReviews(data ?? []);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [productSlug, refreshKey]);

  if (!tableExists) return null;

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-4" style={{ color: 'var(--text-muted)' }}>
        <Loader2 size={14} className="animate-spin" />
        <span className="text-xs">Chargement des avis...</span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex items-center gap-2 py-4" style={{ color: 'var(--text-muted)' }}>
        <MessageSquare size={14} />
        <span className="text-xs">Aucun avis pour l'instant. Soyez le premier !</span>
      </div>
    );
  }

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex">
          {[1,2,3,4,5].map(n => (
            <Star key={n} size={14} className={avg >= n ? 'fill-[#c4956a] text-[#c4956a]' : 'text-gray-300'} />
          ))}
        </div>
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {avg.toFixed(1)} · {reviews.length} avis
        </span>
      </div>

      {reviews.map(r => (
        <div key={r.id} className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)' }}>
                {r.author_name[0]?.toUpperCase()}
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{r.author_name}</span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(n => (
                <Star key={n} size={10} className={r.rating >= n ? 'fill-[#c4956a] text-[#c4956a]' : 'text-gray-300'} />
              ))}
            </div>
          </div>
          <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{r.comment}</p>
          <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>
            {new Date(r.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      ))}
    </div>
  );
}
