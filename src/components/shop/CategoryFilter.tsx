import type { ShopCategory } from '../../hooks/useShopProducts';

interface Props {
  categories: ShopCategory[];
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            selected === cat.slug
              ? 'text-white shadow-md'
              : 'glass-card hover:text-[#c4956a]'
          }`}
          style={selected === cat.slug
            ? { background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)' }
            : { color: 'var(--text-secondary)' }
          }
        >
          {cat.emoji} {cat.name}
          {cat.slug !== 'all' && (
            <span className="ml-1.5 text-[10px] opacity-60">({cat.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
