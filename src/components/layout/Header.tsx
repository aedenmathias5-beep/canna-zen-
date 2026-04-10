import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../lib/CartContext';
import { useAuth } from '../../lib/AuthContext';
import { useTheme } from '../../lib/ThemeContext';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import CartDrawer from '../cart/CartDrawer';
import MobileMenu from './MobileMenu';
import UserMenu from '../auth/UserMenu';
import '../../styles/design-system.css';

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
      { label: 'Vapes OH+ & HEC10', to: '/boutique?cat=vapes' },
    ]
  },
  { label: 'Huiles', to: '/boutique?cat=huiles-cbd' },
  { label: 'Gummies', to: '/boutique?cat=gummies-d9' },
  { label: 'Boutique', to: '/boutique' },
];

function Dropdown({ item, onClose }: { item: typeof navItems[0]; onClose: () => void }) {
  if (!('children' in item) || !item.children) return null;
  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 12px)',
      left: '50%',
      transform: 'translateX(-50%)',
      minWidth: '200px',
      background: 'rgba(10,10,8,0.97)',
      border: '1px solid rgba(201,168,76,0.15)',
      borderRadius: '8px',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      zIndex: 200,
    }}>
      {item.children.map(child => (
        <Link
          key={child.label}
          to={child.to}
          onClick={onClose}
          style={{
            display: 'block',
            padding: '12px 20px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--gris-fin)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            transition: 'color 0.2s, background 0.2s, padding-left 0.3s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--or)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)';
            (e.currentTarget as HTMLElement).style.paddingLeft = '28px';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--gris-fin)';
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.paddingLeft = '20px';
          }}
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

  const isDark = theme === 'dark';

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
    const onScroll = () => setScrolled(window.scrollY > 30);
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

  const iconStyle = {
    color: isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.7)',
    cursor: 'pointer',
    padding: '8px',
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.3s',
    borderRadius: '8px',
  } as React.CSSProperties;

  const bgMarquee = isDark ? 'rgba(5,5,4,0.95)' : 'rgba(245,242,237,0.97)';
  const bgHeader = scrolled
    ? (isDark ? 'rgba(5,5,4,0.97)' : 'rgba(250,248,245,0.97)')
    : (isDark ? 'rgba(10,10,8,0.85)' : 'rgba(250,248,245,0.85)');
  const borderHeader = scrolled
    ? (isDark ? 'rgba(201,168,76,0.12)' : 'rgba(74,103,65,0.12)')
    : (isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.06)');
  const iconHoverColor = isDark ? 'var(--or)' : '#4A6741';

  return (
    <>
      <div style={{ background: bgMarquee, borderBottom: `1px solid ${borderHeader}`, overflow: 'hidden', transition: 'background 0.4s' }}>
        <div className="marquee-wrapper" style={{ border: 'none', background: 'transparent' }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: 'flex' }}>
                {[
                  'Livraison offerte dès 49€',
                  'THC < 0.3% · 100% Légal',
                  'Cannabis d\'exception',
                  'Expédition sous 24h',
                  'Gamme CBD · D10 · OH+',
                  'Paiement sécurisé',
                ].map((text, j) => (
                  <div key={j} className="marquee-item" style={{ padding: '10px 32px', fontSize: '0.58rem' }}>
                    <span className="marquee-sep">✦</span>
                    {text}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-sticky)' as any,
          background: bgHeader,
          backdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${borderHeader}`,
          transition: 'background 0.4s var(--ease-luxury), border-color 0.4s var(--ease-luxury)',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? '56px' : '68px',
            transition: 'height 0.4s var(--ease-luxury)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setMenuOpen(true)}
                style={{ ...iconStyle, display: 'none' } as React.CSSProperties}
                className="lg-hide"
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={iconStyle}
                aria-label="Rechercher"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = iconHoverColor; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.7)'; }}
              >
                <Search size={18} />
              </button>
            </div>

            <Link
              to="/"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="CannaZen - Accueil"
            >
              <Logo size={scrolled ? 'sm' : 'md'} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ThemeToggle />
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link
                  to="/connexion"
                  style={{ ...iconStyle, textDecoration: 'none' }}
                  aria-label="Compte"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = iconHoverColor; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.7)'; }}
                >
                  <User size={18} />
                </Link>
              )}
              <button
                onClick={() => setCartOpen(true)}
                style={{ ...iconStyle, position: 'relative' }}
                aria-label="Panier"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = iconHoverColor; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.7)'; }}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '16px',
                    height: '16px',
                    background: isDark ? 'var(--or)' : '#4A6741',
                    color: isDark ? 'var(--noir)' : '#fff',
                    fontSize: '9px',
                    fontWeight: 700,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-body)',
                    transform: cartBounce ? 'scale(1.3)' : 'scale(1)',
                    transition: 'transform 0.3s var(--ease-spring)',
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          borderTop: `1px solid ${isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.08)'}`,
          padding: '12px 32px',
          transition: 'border-color 0.4s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {navItems.map(item => {
              const hasChildren = 'children' in item && item.children;
              return (
                <div
                  key={item.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleDropdownLeave()}
                >
                  {'to' in item && item.to ? (
                    <Link
                      to={item.to}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.7)',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = iconHoverColor; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.7)'; }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.7)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = iconHoverColor; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.7)'; }}
                    >
                      {item.label}
                      <ChevronDown size={10} style={{
                        transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s',
                      }} />
                    </button>
                  )}
                  {hasChildren && openDropdown === item.label && (
                    <Dropdown item={item} onClose={() => setOpenDropdown(null)} />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {searchOpen && (
          <div style={{
            padding: '12px 32px',
            borderTop: `1px solid ${isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.08)'}`,
            background: isDark ? 'rgba(5,5,4,0.95)' : 'rgba(245,242,237,0.97)',
            transition: 'background 0.3s',
          }}>
            <form onSubmit={handleSearch} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                autoFocus
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
                  border: `1px solid ${isDark ? 'rgba(201,168,76,0.2)' : 'rgba(74,103,65,0.2)'}`,
                  borderRadius: '4px',
                  color: isDark ? 'var(--ivoire)' : '#1a2f23',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{
                  padding: '10px',
                  background: 'transparent',
                  border: `1px solid ${isDark ? 'rgba(201,168,76,0.1)' : 'rgba(74,103,65,0.15)'}`,
                  borderRadius: '4px',
                  color: isDark ? 'var(--gris-fin)' : 'rgba(74,103,65,0.6)',
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
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
