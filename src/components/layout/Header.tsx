import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../lib/CartContext';
import { useAuth } from '../../lib/AuthContext';
import { useTheme } from '../../lib/ThemeContext';
import CartDrawer from '../cart/CartDrawer';
import MobileMenu from './MobileMenu';
import UserMenu from '../auth/UserMenu';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Fleurs', children: [
      { label: 'Fleurs CBD', to: '/boutique?cat=fleurs-cbd' },
      { label: 'Fleurs D10', to: '/boutique?cat=fleurs-d10' },
      { label: 'Fleurs OH+', to: '/boutique?cat=fleurs-oh' },
    ]
  },
  { label: 'Résines', to: '/boutique?cat=resines-d10' },
  {
    label: 'Vapes', children: [
      { label: 'Vapes OH+', to: '/boutique?cat=vapes' },
      { label: 'Vapes HEC10', to: '/boutique?cat=vapes' },
    ]
  },
  { label: 'Huiles', to: '/boutique?cat=huiles-cbd' },
  { label: 'Gummies', to: '/boutique?cat=gummies-d9' },
  { label: 'Boutique', to: '/boutique' },
];

function DropdownMenu({ item, onClose }: { item: typeof navItems[0]; onClose: () => void }) {
  if (!('children' in item) || !item.children) return null;
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 rounded-xl shadow-xl overflow-hidden py-1.5 min-w-[200px] z-50 animate-slide-down premium-shadow" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
      {item.children.map(child => (
        <Link
          key={child.label}
          to={child.to}
          onClick={onClose}
          className="block px-5 py-3 text-sm hover:pl-6 transition-all duration-200 font-light"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,149,106,0.06)'; e.currentTarget.style.color = 'var(--accent-1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          {child.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCartCount = useRef(cartCount);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => () => { if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 400);
      prevCartCount.current = cartCount;
      return () => clearTimeout(t);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  return (
    <>
      <div className="relative text-[10px] font-light py-2.5 overflow-hidden whitespace-nowrap tracking-[0.25em] uppercase" style={{ background: 'linear-gradient(90deg, #1a2f23, #2d4a3e, #1a2f23)', color: 'rgba(250,248,245,0.7)' }}>
        <div className="inline-flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="inline-flex items-center">
              <span className="inline-flex items-center gap-2 mx-10"><span className="w-1 h-1 rounded-full bg-[#c4956a]/60" />Livraison offerte dès 49€</span>
              <span className="inline-flex items-center gap-2 mx-10"><span className="w-1 h-1 rounded-full bg-[#c4956a]/60" />THC &lt; 0.3% · 100% Légal</span>
              <span className="inline-flex items-center gap-2 mx-10"><span className="w-1 h-1 rounded-full bg-[#c4956a]/60" />Cannabis d'exception cultivé avec soin</span>
              <span className="inline-flex items-center gap-2 mx-10"><span className="w-1 h-1 rounded-full bg-[#c4956a]/60" />Expédition sous 24h</span>
              <span className="inline-flex items-center gap-2 mx-10"><span className="w-1 h-1 rounded-full bg-[#c4956a]/60" />Gamme complète CBD · D10 · OH+</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 backdrop-blur-2xl ${scrolled ? 'premium-shadow' : ''}`}
        style={{
          background: 'var(--bg-header)',
          borderBottom: `1px solid ${scrolled ? 'var(--border-color)' : 'var(--border-light)'}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'}`}>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu" className="lg:hidden p-1.5 transition-colors hover:scale-110 active:scale-95 duration-200" style={{ color: 'var(--text-secondary)' }}>
                <Menu size={20} />
              </button>
              <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Rechercher" className="p-1.5 transition-all hover:scale-110 active:scale-95 duration-200" style={{ color: 'var(--text-secondary)' }}>
                <Search size={20} />
              </button>
            </div>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2 transition-transform duration-300 hover:scale-105">
              <Logo variant={theme === 'dark' ? 'light' : 'dark'} />
            </Link>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link
                  to="/connexion"
                  aria-label="Mon compte"
                  className="p-1.5 transition-all hover:scale-110 active:scale-95 duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <User size={20} />
                </Link>
              )}
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Ouvrir le panier"
                className="relative p-1.5 transition-all hover:scale-110 active:scale-95 duration-200"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#c4956a] text-white text-[9px] font-semibold flex items-center justify-center rounded-full ${cartBounce ? 'animate-count-pop' : ''}`}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex justify-center py-2.5" style={{ borderTop: '1px solid var(--border-light)' }}>
          <div className="flex items-center gap-10 text-[10px] font-medium tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
            {navItems.map(item => {
              const hasChildren = 'children' in item && item.children;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleDropdownLeave()}
                >
                  {'to' in item && item.to ? (
                    <Link to={item.to} className="py-1.5 transition-colors uppercase relative group hover:text-[#c4956a]">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#c4956a] group-hover:w-full transition-all duration-400" />
                    </Link>
                  ) : (
                    <button className="py-1.5 transition-colors uppercase flex items-center gap-1 relative group hover:text-[#c4956a]">
                      {item.label} <ChevronDown size={10} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#c4956a] group-hover:w-full transition-all duration-400" />
                    </button>
                  )}
                  {hasChildren && openDropdown === item.label && (
                    <DropdownMenu item={item} onClose={() => setOpenDropdown(null)} />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {searchOpen && (
          <div className="px-4 py-3 animate-slide-down" style={{ borderTop: '1px solid var(--border-light)', background: 'var(--bg-header)' }}>
            <form onSubmit={handleSearch} className="max-w-lg mx-auto flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="flex-1 glass rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#c4956a]/30 transition-all duration-300"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Fermer la recherche" className="p-2 hover:rotate-90 transition-all duration-300" style={{ color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
