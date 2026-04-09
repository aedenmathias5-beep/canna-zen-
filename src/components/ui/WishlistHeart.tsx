import { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { addToWishlist, removeFromWishlist } from '../../lib/supabaseDb';
import toast from 'react-hot-toast';

interface Props {
  productId: number;
  size?: number;
  className?: string;
}

export default function WishlistHeart({ productId, size = 18, className = '' }: Props) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleToggle = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast('Connectez-vous pour ajouter aux favoris', { icon: '❤️' });
      return;
    }

    setAnimating(true);
    const newLiked = !liked;
    setLiked(newLiked);

    try {
      if (newLiked) {
        await addToWishlist(user.id, String(productId));
        toast.success('Ajouté aux favoris !');
      } else {
        await removeFromWishlist(user.id, String(productId));
        toast.success('Retiré des favoris');
      }
    } catch {
      setLiked(!newLiked);
      toast.error('Erreur');
    }
    setTimeout(() => setAnimating(false), 600);
  }, [liked, user, productId]);

  return (
    <button
      onClick={handleToggle}
      className={`relative transition-all duration-300 ${className}`}
      aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart
        size={size}
        className={`transition-all duration-300 ${
          liked ? 'fill-red-500 text-red-500' : 'text-[var(--text-muted)] hover:text-red-400'
        } ${animating ? 'wishlist-pulse' : ''}`}
      />
      {animating && liked && (
        <>
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-red-400 heart-particle"
              style={{
                '--angle': `${i * 60}deg`,
                animationDelay: `${i * 50}ms`,
              } as React.CSSProperties}
            />
          ))}
        </>
      )}
    </button>
  );
}
