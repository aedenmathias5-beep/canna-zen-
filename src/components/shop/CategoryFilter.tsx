import { categories } from '../../data/products';

interface Props {
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
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
        </button>
      ))}
    </div>
  );
}
