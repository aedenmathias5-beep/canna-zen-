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
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selected === cat.slug
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
              : 'glass-card hover:text-teal-600'
          }`}
          style={selected !== cat.slug ? { color: 'var(--text-secondary)' } : undefined}
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
