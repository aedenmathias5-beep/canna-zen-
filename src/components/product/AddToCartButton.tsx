import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddToCartButtonProps {
  quantity: number;
  setQuantity: (q: number) => void;
  onAdd: () => void;
  added: boolean;
  price: number;
}

export default function AddToCartButton({ quantity, setQuantity, onAdd, added, price }: AddToCartButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onAdd();
    if (btnRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = btnRef.current.getBoundingClientRect();
      confetti({
        particleCount: 55,
        spread: 65,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#c9a84c', '#a07850', '#7ec89e', '#b8a0e8', '#e8c49a'],
        scalar: 0.85,
        gravity: 0.85,
        ticks: 180,
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <div className="space-y-3">
      {/* Total line */}
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Total</span>
        <motion.span
          key={price * quantity}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold text-gradient-vivid"
        >
          {(price * quantity).toFixed(2)}€
        </motion.span>
      </div>

      {/* Quantity + Add */}
      <div className="flex items-stretch gap-3">
        {/* Quantity selector */}
        <div
          className="flex items-center gap-3 rounded-xl px-4"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
        >
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            aria-label="Réduire"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Minus size={16} />
          </motion.button>
          <AnimatePresence mode="wait">
            <motion.span
              key={quantity}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-8 text-center font-bold text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              {quantity}
            </motion.span>
          </AnimatePresence>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Augmenter"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Plus size={16} />
          </motion.button>
        </div>

        {/* Add to cart button */}
        <motion.button
          ref={btnRef}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          disabled={added}
          className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-base transition-all duration-300 text-white ${
            added ? 'shadow-lg' : 'btn-vivid shadow-xl hover:shadow-2xl'
          }`}
          style={added ? { background: 'linear-gradient(135deg, #2d5a3d, #1a3c2a)' } : undefined}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <Check size={20} /> Ajouté au panier !
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={20} /> Ajouter au panier
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
