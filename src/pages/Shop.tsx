import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useShopProducts } from '../hooks/useShopProducts';
import ProductCard from '../components/shop/ProductCard';
import CategoryFilter from '../components/shop/CategoryFilter';
import SearchBar from '../components/shop/SearchBar';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import AnimatedSection from '../components/ui/AnimatedSection';
import { QuizCard } from '../components/ui/QuizCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const { items, allItems, loading, source, shopCategories } = useShopProducts(selectedCategory, searchQuery);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', slug);
    }
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setSearchParams(params, { replace: true });
  };

  const handleReset = () => {
    setSearchParams({}, { replace: true });
  };

  const activeCat = shopCategories.find(c => c.slug === selectedCategory);
  const pageTitle = activeCat && activeCat.slug !== 'all'
    ? `${activeCat.name} — CannaZen`
    : 'Boutique CBD — CannaZen';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Parcourez notre catalogue de produits CBD premium : fleurs, résines D10, vapes OH+, huiles bio et gummies. Livraison rapide en France." />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content="/logo-cannazen.png" />
      </Helmet>

      <Breadcrumbs items={
        activeCat && activeCat.slug !== 'all'
          ? [{ label: 'Boutique', to: '/boutique' }, { label: activeCat.name }]
          : [{ label: 'Boutique' }]
      } />

      <AnimatedSection animation="fade-up">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold italic" style={{ color: 'var(--text-primary)' }}>
              {activeCat && activeCat.slug !== 'all' ? activeCat.name : 'Boutique'}
            </h1>
            {source === 'supabase' && !loading && (
              <span className="text-[10px] px-2 py-1 rounded-full font-medium"
                style={{ background: 'rgba(74,103,65,0.08)', color: '#4a6741', border: '1px solid rgba(74,103,65,0.15)' }}>
                ● Live
              </span>
            )}
          </div>
          <p className="font-light mt-1" style={{ color: 'var(--text-secondary)' }}>
            {loading ? 'Chargement…' : `${items.length} produit${items.length > 1 ? 's' : ''}${items.length !== allItems.length ? ` sur ${allItems.length}` : ' disponibles'}`}
          </p>
        </div>
      </AnimatedSection>

      <div className="space-y-4 mb-6">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        {!loading && (
          <CategoryFilter
            categories={shopCategories}
            selected={selectedCategory}
            onSelect={handleCategoryChange}
          />
        )}
      </div>

      <div className="mb-8 lg:hidden">
        <QuizCard />
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <QuizCard />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-24 gap-3">
              <Loader2 size={20} className="animate-spin text-[#c4956a]" />
              <span className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>Chargement des produits…</span>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 fade-in-up">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-light mb-2" style={{ color: 'var(--text-secondary)' }}>Aucun produit trouvé</p>
              <p className="text-sm font-light mb-4" style={{ color: 'var(--text-muted)' }}>Essayez avec d'autres mots-clés ou catégories</p>
              <button
                onClick={handleReset}
                className="text-[#c4956a] hover:text-[#a07850] font-medium text-sm transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
              initial="hidden"
              animate="visible"
            >
              {items.map(p => (
                <motion.div
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 28, scale: 0.97 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
