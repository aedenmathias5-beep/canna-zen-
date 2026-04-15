import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Sparkles } from 'lucide-react';
import Logo from '../ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../lib/CartContext';
import { useTheme } from '../../lib/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Boutique', path: '/boutique' },
  { label: 'Terroirs', path: '/terroirs' },
  { label: 'Coffrets', path: '/coffrets' },
  { label: 'À propos', path: '/a-propos' },
];

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(10,18,9,0.9) 0%, rgba(10,18,9,0.75) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          borderBottom: `1px solid ${isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.06)'}`,
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group transition-transform hover:scale-105">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3.5 py-2 text-xs tracking-[0.15em] uppercase transition-colors rounded-lg"
                  style={{
                    color: isActive
                      ? isDark ? '#c9a84c' : '#4A6741'
                      : isDark ? 'rgba(245,240,232,0.5)' : 'rgba(26,47,35,0.5)',
                    fontWeight: isActive ? 500 : 400,
                    background: isActive
                      ? isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.06)'
                      : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Ritual finder CTA in nav */}
            <Link
              to="/quiz"
              className="ml-2 px-3.5 py-2 text-xs tracking-[0.12em] uppercase rounded-full flex items-center gap-1.5 transition-all"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))'
                  : 'linear-gradient(135deg, rgba(74,103,65,0.08), rgba(74,103,65,0.04))',
                border: `1px solid ${isDark ? 'rgba(201,168,76,0.15)' : 'rgba(74,103,65,0.12)'}`,
                color: isDark ? '#c9a84c' : '#4A6741',
                fontWeight: 500,
              }}
            >
              <Sparkles size={11} />
              Mon rituel
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Link
              to="/connexion"
              className="p-2 rounded-lg transition-colors"
              style={{ color: isDark ? 'rgba(245,240,232,0.5)' : 'rgba(26,47,35,0.5)' }}
              aria-label="Connexion"
            >
              <User className="w-[18px] h-[18px]" />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg transition-colors"
              style={{ color: isDark ? 'rgba(245,240,232,0.5)' : 'rgba(26,47,35,0.5)' }}
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full text-[9px] flex items-center justify-center font-bold"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, #c9a84c, #f0c060)'
                      : 'linear-gradient(135deg, #4A6741, #6B8F5E)',
                    color: isDark ? '#0a0a08' : '#fff',
                    minWidth: '18px',
                    height: '18px',
                  }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: isDark ? 'rgba(245,240,232,0.7)' : 'rgba(26,47,35,0.7)' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-50 md:hidden"
            style={{
              background: isDark
                ? 'linear-gradient(180deg, rgba(10,18,9,0.97), rgba(14,28,18,0.97))'
                : 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,246,242,0.98))',
              backdropFilter: 'blur(24px)',
              borderBottom: `1px solid ${isDark ? 'rgba(201,168,76,0.08)' : 'rgba(74,103,65,0.08)'}`,
              boxShadow: isDark
                ? '0 16px 48px rgba(0,0,0,0.4)'
                : '0 16px 48px rgba(0,40,20,0.08)',
            }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-wider uppercase py-3 px-3 rounded-xl transition-colors"
                  style={{
                    color: location.pathname === link.path
                      ? isDark ? '#c9a84c' : '#4A6741'
                      : isDark ? 'rgba(245,240,232,0.55)' : 'rgba(26,47,35,0.55)',
                    fontWeight: location.pathname === link.path ? 600 : 400,
                    background: location.pathname === link.path
                      ? isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.06)'
                      : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/quiz"
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-wider uppercase py-3 px-3 rounded-xl flex items-center gap-2 mt-1"
                style={{
                  color: isDark ? '#c9a84c' : '#4A6741',
                  background: isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.06)',
                  fontWeight: 500,
                }}
              >
                <Sparkles size={14} /> Trouver mon rituel
              </Link>
              <Link
                to="/connexion"
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-wider uppercase py-3 px-3 rounded-xl flex items-center gap-2"
                style={{ color: isDark ? 'rgba(245,240,232,0.5)' : 'rgba(26,47,35,0.5)' }}
              >
                <User className="w-4 h-4" /> Connexion
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;