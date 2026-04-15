import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, MapPin, Sparkles } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { Hero } from '../components/sections/Hero';
import { MarqueeBanner } from '../components/sections/MarqueeBanner';
import { CategoryGrid } from '../components/sections/CategoryGrid';
import { FeaturedProducts } from '../components/sections/FeaturedProducts';
import { TrustSection } from '../components/sections/TrustSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { MoodMatcher } from '../components/sections/MoodMatcher';

const DISCOVER_CARDS = [
  {
    to: '/coffrets',
    icon: Gift,
    title: 'Coffrets Surprise',
    desc: 'Sélections thématiques · Jusqu\'à -30%',
    gradient: { dark: 'linear-gradient(145deg, rgba(201,168,76,0.08) 0%, rgba(14,28,18,0.95) 100%)', light: 'linear-gradient(145deg, rgba(255,240,210,0.3) 0%, rgba(255,255,255,0.95) 100%)' },
    accent: { dark: '#c9a84c', light: '#8b6f4a' },
  },
  {
    to: '/terroirs',
    icon: MapPin,
    title: 'Nos Terroirs',
    desc: 'Explorez les régions françaises',
    gradient: { dark: 'linear-gradient(145deg, rgba(45,90,61,0.12) 0%, rgba(14,28,18,0.95) 100%)', light: 'linear-gradient(145deg, rgba(212,230,218,0.3) 0%, rgba(255,255,255,0.95) 100%)' },
    accent: { dark: '#7ab893', light: '#4A6741' },
  },
  {
    to: '/loyalty',
    icon: Sparkles,
    title: 'Programme Fidélité',
    desc: 'Gagnez des points · Récompenses exclusives',
    gradient: { dark: 'linear-gradient(145deg, rgba(138,180,212,0.08) 0%, rgba(14,28,18,0.95) 100%)', light: 'linear-gradient(145deg, rgba(220,230,245,0.3) 0%, rgba(255,255,255,0.95) 100%)' },
    accent: { dark: '#8ab4d4', light: '#4a6a8a' },
  },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log('Newsletter signup:', email.toLowerCase().trim());
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div>
      <Helmet>
        <title>CannaZen — CBD Premium, Fleurs, Résines, Huiles & Vapes</title>
        <meta name="description" content="Boutique en ligne de CBD premium — Fleurs, résines, huiles et vapes de qualité supérieure. THC < 0.3%, 100% légal en France. Livraison offerte dès 49€." />
        <meta property="og:title" content="CannaZen — CBD Premium" />
        <meta property="og:description" content="Découvrez notre sélection de produits CBD premium." />
      </Helmet>

      <Hero />
      <MarqueeBanner />
      <FeaturedProducts />
      <CategoryGrid />
      <TrustSection />
      <MoodMatcher />
      <TestimonialsSection />

      {/* Newsletter section */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: '100px 40px',
          borderTop: `1px solid ${isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.08)'}`,
        }}
      >
        {/* Background gradient accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(74,103,65,0.03) 0%, transparent 70%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-[640px] mx-auto text-center"
        >
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(74,103,65,0.4), transparent)',
            }}
          />

          <h2
            className="font-serif italic leading-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: isDark ? 'var(--text-primary)' : '#1a2f23',
            }}
          >
            Restez dans le{' '}
            <span className="text-or">jardin</span>
          </h2>

          <p
            className="font-sans text-sm font-light leading-relaxed mb-10"
            style={{ color: isDark ? 'var(--text-secondary)' : 'rgba(26,47,35,0.6)' }}
          >
            Nouveautés, offres exclusives et conseils du concierge directement dans votre boîte mail.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-sans text-sm"
              style={{ color: isDark ? '#7ab893' : '#4A6741' }}
            >
              ✓ Merci ! Vous êtes inscrit(e).
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-3 max-w-[420px] mx-auto flex-wrap">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="flex-1 min-w-[200px] px-5 py-3.5 rounded-lg font-sans text-sm outline-none transition-all"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isDark ? 'rgba(201,168,76,0.15)' : 'rgba(74,103,65,0.15)'}`,
                  color: isDark ? 'var(--text-primary)' : '#1a2f23',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(201,168,76,0.4)' : 'rgba(74,103,65,0.4)';
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 0 0 3px rgba(201,168,76,0.06)'
                    : '0 0 0 3px rgba(74,103,65,0.06)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(201,168,76,0.15)' : 'rgba(74,103,65,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button type="submit" className="btn-luxury">
                <span>S'inscrire</span>
              </button>
            </form>
          )}

          <p
            className="font-sans text-[0.6rem] tracking-[0.1em] mt-5"
            style={{ color: isDark ? 'rgba(201,168,76,0.2)' : 'rgba(74,103,65,0.3)' }}
          >
            Désabonnement en un clic · Données protégées
          </p>
        </motion.div>
      </section>

      {/* Discover cards */}
      <section
        className="relative"
        style={{
          padding: '60px 40px 80px',
          borderTop: `1px solid ${isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.08)'}`,
        }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DISCOVER_CARDS.map((card, i) => {
              const Icon = card.icon;
              const accent = isDark ? card.accent.dark : card.accent.light;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={card.to}
                    className="block p-8 rounded-2xl transition-all group"
                    style={{
                      background: isDark ? card.gradient.dark : card.gradient.light,
                      border: `1px solid ${isDark ? 'rgba(201,168,76,0.06)' : 'rgba(74,103,65,0.08)'}`,
                      boxShadow: isDark
                        ? '0 4px 20px rgba(0,0,0,0.2)'
                        : '0 4px 20px rgba(0,40,20,0.04)',
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        background: `${accent}14`,
                        border: `1px solid ${accent}28`,
                      }}
                    >
                      <Icon size={20} color={accent} strokeWidth={1.3} />
                    </div>
                    <h3
                      className="font-serif text-xl font-normal mb-2 group-hover:translate-x-1 transition-transform"
                      style={{ color: isDark ? 'var(--text-primary)' : '#1a2f23' }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="font-sans text-xs font-light mb-5"
                      style={{ color: isDark ? 'var(--text-secondary)' : 'rgba(26,47,35,0.55)' }}
                    >
                      {card.desc}
                    </p>
                    <span
                      className="font-sans text-[0.65rem] tracking-[0.2em] uppercase inline-flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ color: accent }}
                    >
                      Explorer <ArrowRight size={10} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}