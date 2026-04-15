import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Leaf, Gift, Heart, User, Info, HelpCircle, Award } from 'lucide-react';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../lib/ThemeContext';

const navItems = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/boutique', label: 'Boutique', icon: ShoppingBag },
  { to: '/quiz', label: 'Quiz CBD', icon: HelpCircle },
  { to: '/terroirs', label: 'Terroirs', icon: Leaf },
  { to: '/coffrets', label: 'Coffrets', icon: Gift },
  { to: '/loyalty', label: 'Fidélité', icon: Award },
  { to: '/wishlist', label: 'Favoris', icon: Heart },
  { to: '/compte', label: 'Mon Compte', icon: User },
  { to: '/a-propos', label: 'À propos', icon: Info },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <aside
      className="sidebar-panel fixed top-0 left-0 h-screen w-[250px] z-50 flex-col border-r overflow-y-auto transition-colors duration-500"
      style={{
        background: isDark ? '#0a0a08' : 'rgba(255,255,255,0.95)',
        borderColor: isDark ? 'rgba(201,168,76,0.1)' : 'rgba(74,103,65,0.1)',
        backdropFilter: isDark ? 'none' : 'blur(20px)',
      }}
    >
      <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: isDark ? 'rgba(201,168,76,0.1)' : 'rgba(74,103,65,0.1)' }}>
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <ThemeToggle />
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== '/' && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-light transition-all duration-200"
              style={{
                color: active
                  ? (isDark ? '#c9a84c' : '#4A6741')
                  : (isDark ? '#a0998a' : '#5a6b5e'),
                background: active
                  ? (isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.08)')
                  : 'transparent',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(74,103,65,0.05)';
                  (e.currentTarget as HTMLElement).style.color = isDark ? '#f5f0e8' : '#1a2f23';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = isDark ? '#a0998a' : '#5a6b5e';
                }
              }}
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t text-[10px] text-center font-light transition-colors duration-500" style={{
        borderColor: isDark ? 'rgba(201,168,76,0.1)' : 'rgba(74,103,65,0.1)',
        color: isDark ? '#6b6458' : '#8a9a8c',
      }}>
        © {new Date().getFullYear()} CannaZen
      </div>
    </aside>
  );
}
