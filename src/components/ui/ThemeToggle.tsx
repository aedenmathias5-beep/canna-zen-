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
        <Moon size={18} className="hover:text-[#1a2f23] transition-colors" />
      ) : (
        <Sun size={18} className="text-[#c9a96e] hover:text-[#d4a574] transition-colors" />
      )}
    </button>
  );
}
