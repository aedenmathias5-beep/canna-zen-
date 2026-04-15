// @ts-nocheck
import { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../../lib/AuthContext';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  productSlug: string;
  onSubmitted: () => void;
}

export default function ReviewForm({ productSlug, onSubmitted }: ReviewFormProps) {
  const { user, profile } = useAuth();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="text-sm font-light py-3" style={{ color: 'var(--text-muted)' }}>
        <a href="/connexion" className="text-[#c4956a] hover:underline">Connectez-vous</a> pour laisser un avis.
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { toast.error('Choisissez une note'); return; }
    if (comment.trim().length < 10) { toast.error('Commentaire trop court (min 10 caractères)'); return; }

    setLoading(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: user.id,
        product_slug: productSlug,
        author_name: profile?.display_name || profile?.email?.split('@')[0] || 'Anonyme',
        rating,
        comment: comment.trim(),
      });

      if (error) throw error;
      toast.success('Avis publié, merci !');
      setRating(0);
      setComment('');
      onSubmitted();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('42P01') || msg.includes('does not exist')) {
        toast.error('La table reviews n\'existe pas encore — voir migration SQL');
      } else if (msg.includes('unique') || msg.includes('duplicate')) {
        toast.error('Vous avez déjà laissé un avis sur ce produit');
      } else {
        toast.error('Erreur lors de la publication');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Votre note</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={`transition-colors ${(hovered || rating) >= n ? 'fill-[#c4956a] text-[#c4956a]' : 'text-gray-300'}`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Partagez votre expérience avec ce produit..."
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#c4956a]/30 transition-all"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        />
        <p className="text-[10px] text-right mt-1" style={{ color: 'var(--text-muted)' }}>{comment.length}/500</p>
      </div>
      <button
        type="submit"
        disabled={loading || rating === 0}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-vivid disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
        Publier l'avis
      </button>
    </form>
  );
}
