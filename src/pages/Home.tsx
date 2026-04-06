import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Shield, Truck, Star, Droplets, Mail, CheckCircle, Leaf, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/shop/ProductCard';
import AnimatedSection from '../components/ui/AnimatedSection';

const heroCategories = [
  { emoji: '🌿', name: 'Fleurs CBD', slug: 'fleurs-cbd' },
  { emoji: '💎', name: 'Fleurs D10', slug: 'fleurs-d10' },
  { emoji: '⚡', name: 'Fleurs OH+', slug: 'fleurs-oh' },
  { emoji: '🧱', name: 'Résines D10', slug: 'resines-d10' },
  { emoji: '💨', name: 'Vapes OH+ & HEC10', slug: 'vapes' },
  { emoji: '🫧', name: 'Huiles CBD BIO', slug: 'huiles-cbd' },
  { emoji: '🍬', name: 'Gummies D9', slug: 'gummies-d9' },
];

export default function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div>
      <Helmet>
        <title>CannaZen — CBD Premium, Fleurs, Résines, Huiles & Vapes</title>
        <meta name="description" content="Boutique en ligne de CBD premium — Fleurs, résines, huiles et vapes de qualité supérieure. THC < 0.3%, 100% légal en France. Livraison offerte dès 49€." />
        <meta property="og:title" content="CannaZen — CBD Premium" />
        <meta property="og:description" content="Découvrez notre sélection de produits CBD premium. Fleurs, résines, huiles et vapes de qualité supérieure." />
        <meta property="og:image" content="/logo-cannazen.png" />
      </Helmet>

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden aurora-bg-light">
        <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-teal-400/10 rounded-full blur-[120px] orb-1" />
        <div className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-emerald-400/10 rounded-full blur-[120px] orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/8 rounded-full blur-[150px] orb-3" />
        <div className="absolute top-[20%] right-[25%] w-40 h-40 bg-blue-400/6 rounded-full blur-[80px] orb-1" />

        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(13,148,136,0.4) 1px, transparent 0)', backgroundSize: '50px 50px' }} />

        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute pointer-events-none opacity-0"
            style={{
              left: `${10 + i * 15}%`,
              top: '-20px',
              animation: `leaf-fall ${14 + i * 2}s ${i * 2}s ease-in-out infinite`,
            }}
          >
            <Leaf size={10 + (i % 3) * 5} className="text-teal-500/20" />
          </div>
        ))}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            }}
          >
            <img
              src="/logo-cannazen.png"
              alt="CannaZen"
              className="mx-auto h-[90px] sm:h-[140px] object-contain mb-5 drop-shadow-lg animate-float"
            />
          </div>

          <div
            className="transition-all duration-700 delay-300"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium px-5 py-2.5 rounded-full mb-6 tracking-wider animate-shimmer" style={{ background: 'rgba(13,148,136,0.08)', color: 'var(--accent-1)', border: '1px solid rgba(13,148,136,0.15)' }}>
              <Sparkles size={12} className="text-cyan-500" />
              CANNABIS LÉGAL · THC &lt; 0.3%
            </div>
          </div>

          <h1
            className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight mb-4 italic transition-all duration-700 delay-500"
            style={{
              color: 'var(--text-primary)',
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            L'univers de{' '}
            <span className="text-gradient-vivid">Mary Jane</span>
          </h1>

          <p
            className="text-base sm:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-700 delay-700"
            style={{
              color: 'var(--text-secondary)',
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            Découvrez notre sélection de produits CBD premium. Fleurs, résines, huiles et vapes de qualité supérieure, cultivés avec soin.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-[900ms]"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <Link
              to="/boutique"
              className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-semibold btn-vivid neon-glow group text-lg"
            >
              Découvrir la boutique <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30">
          <div className="w-5 h-8 rounded-full border-2 border-teal-500/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-teal-500/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-child">
          {[
            { icon: Shield, text: 'THC < 0.3%', sub: '100% légal en France', color: 'text-teal-500' },
            { icon: Truck, text: 'Livraison offerte', sub: "Dès 49€ d'achat", color: 'text-emerald-500' },
            { icon: Star, text: 'Qualité premium', sub: 'Sélection rigoureuse', color: 'text-cyan-500' },
            { icon: Droplets, text: "Cannabis d'exception", sub: 'Cultivé avec soin', color: 'text-blue-500' },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-5 text-center card-hover-lift group transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: 'rgba(13,148,136,0.06)' }}>
                <item.icon size={22} className={`${item.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.text}</p>
              <p className="text-xs font-light mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold mb-8 text-center italic" style={{ color: 'var(--text-primary)' }}>
          Nos <span className="text-gradient-vivid">catégories</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 stagger-child">
          {heroCategories.map(cat => (
            <Link
              key={cat.slug}
              to={`/boutique?cat=${cat.slug}`}
              className="glass-card rounded-xl p-6 text-center card-hover-lift group overflow-hidden relative"
            >
              <div className="relative z-10">
                <span className="text-3xl mb-3 block group-hover:scale-125 transition-transform duration-500">{cat.emoji}</span>
                <h3 className="font-['Cormorant_Garamond'] font-semibold text-sm group-hover:text-teal-600 transition-colors" style={{ color: 'var(--text-primary)' }}>{cat.name}</h3>
                <p className="text-xs mt-1 font-light" style={{ color: 'var(--text-muted)' }}>
                  {products.filter(p => p.categorySlug === cat.slug).length} produits
                </p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] text-teal-500 font-medium tracking-wider uppercase flex items-center justify-center gap-1">
                    Explorer <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
        </div>
      </div>

      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold italic" style={{ color: 'var(--text-primary)' }}>
            <span className="text-gradient-vivid">Best-sellers</span>
          </h2>
          <Link to="/boutique" className="text-teal-500 text-sm font-medium hover:text-teal-600 flex items-center gap-1 transition-colors group">
            Voir tout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-child">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold italic" style={{ color: 'var(--text-primary)' }}>
            <span className="text-gradient-blue">Nouveautés</span>
          </h2>
          <Link to="/boutique" className="text-cyan-500 text-sm font-medium hover:text-cyan-600 flex items-center gap-1 transition-colors group">
            Voir tout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-child">
          {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" animation="scale-in">
        <div className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.06), rgba(6,182,212,0.04), rgba(16,185,129,0.06))', border: '1px solid rgba(13,148,136,0.12)' }}>
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-400/5 rounded-full blur-[80px] orb-1" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/5 rounded-full blur-[80px] orb-2" />
          <div className="absolute top-4 right-4 opacity-5">
            <Leaf size={100} className="text-teal-500 animate-rotate-slow" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center neon-glow" style={{ background: 'rgba(13,148,136,0.08)' }}>
              <Mail size={26} className="text-teal-500" />
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold italic mb-3" style={{ color: 'var(--text-primary)' }}>
              Restez dans le <span className="text-gradient-vivid">jardin</span>
            </h2>
            <p className="font-light mb-8 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Recevez nos nouveautés, offres exclusives et conseils du Smokellier directement dans votre boîte mail.
            </p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-emerald-500 fade-in-up">
                <CheckCircle size={20} />
                <span className="font-medium">Merci ! Vous êtes inscrit(e).</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-5 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-white rounded-xl font-semibold text-sm btn-vivid neon-glow"
                >
                  S'inscrire
                </button>
              </form>
            )}
            <p className="text-[10px] mt-4 font-light" style={{ color: 'var(--text-muted)' }}>Pas de spam. Désabonnement en un clic.</p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
