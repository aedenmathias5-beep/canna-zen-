import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

interface Price {
  label: string;
  amount: number;
  grams?: number;
}

interface WeightSelectorProps {
  prices: Price[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function WeightSelector({ prices, selectedIndex, onSelect }: WeightSelectorProps) {
  if (prices.length <= 1) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Scale size={14} style={{ color: 'var(--text-muted)' }} />
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Choisir un format
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {prices.map((price, i) => {
          const isSelected = selectedIndex === i;
          return (
            <motion.button
              key={price.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(i)}
              className={`relative px-4 py-3 rounded-xl text-left transition-all duration-300 overflow-hidden ${
                isSelected ? 'shadow-lg' : 'hover:shadow-md'
              }`}
              style={isSelected
                ? { background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)', color: '#e8c49a' }
                : { background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }
              }
            >
              {isSelected && (
                <motion.div
                  layoutId="weight-selected"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex flex-col">
                <span className={`text-sm font-semibold ${isSelected ? 'text-white' : ''}`}>
                  {price.label}
                </span>
                <span className={`text-lg font-bold mt-0.5 ${isSelected ? 'text-[#e8c49a]' : 'text-gradient-vivid'}`}>
                  {price.amount.toFixed(2)}€
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
