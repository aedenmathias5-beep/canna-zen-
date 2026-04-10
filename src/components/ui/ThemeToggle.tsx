import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      style={{
        position: 'relative',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: `1px solid ${isDark ? 'rgba(201,168,76,0.2)' : 'rgba(74,103,65,0.2)'}`,
        borderRadius: '50%',
        cursor: 'none',
        transition: 'border-color 0.3s, background 0.3s',
        color: isDark ? 'rgba(201,168,76,0.7)' : 'rgba(74,103,65,0.7)',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isDark ? 'rgba(201,168,76,0.6)' : 'rgba(74,103,65,0.5)';
        el.style.background = isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.08)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isDark ? 'rgba(201,168,76,0.2)' : 'rgba(74,103,65,0.2)';
        el.style.background = 'transparent';
      }}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
