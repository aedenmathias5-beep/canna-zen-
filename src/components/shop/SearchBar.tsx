import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4956a]/40" />
      <input
        type="text"
        value={localValue}
        onChange={e => handleChange(e.target.value)}
        placeholder="Rechercher un produit..."
        className="w-full glass-card rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:border-[#c4956a]/30 focus:ring-1 focus:ring-[#c4956a]/15 transition-colors"
        style={{ color: 'var(--text-primary)' }}
      />
      {localValue && (
        <button
          onClick={handleClear}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors hover:text-[#c4956a]"
          style={{ color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
