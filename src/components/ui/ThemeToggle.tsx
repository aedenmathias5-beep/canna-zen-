import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../lib/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      aria-pressed={theme === 'light'}
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-card/70 text-primary shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-ring/60 hover:bg-card active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
      />
      <motion.span
        key={theme}
        initial={{ rotate: -120, scale: 0.65, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {isDark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
      </motion.span>
    </button>
  );
}
