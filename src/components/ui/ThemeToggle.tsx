import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
      className="relative p-1.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
      style={{ color: 'var(--text-secondary)' }}
    >
      {theme === 'light' ? (
        <Moon size={18} className="hover:text-teal-600 transition-colors" />
      ) : (
        <Sun size={18} className="text-amber-400 hover:text-amber-300 transition-colors" />
      )}
    </button>
  );
}
