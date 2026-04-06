import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products, categories } from '../data/products';
import ProductCard from '../components/shop/ProductCard';
import CategoryFilter from '../components/shop/CategoryFilter';
import SearchBar from '../components/shop/SearchBar';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import AnimatedSection from '../components/ui/AnimatedSection';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';

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

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.effects.some(e => e.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const activeCat = categories.find(c => c.slug === selectedCategory);
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
          <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold italic" style={{ color: 'var(--text-primary)' }}>
            {activeCat && activeCat.slug !== 'all' ? activeCat.name : 'Boutique'}
          </h1>
          <p className="font-light" style={{ color: 'var(--text-secondary)' }}>
            {filtered.length} produit{filtered.length > 1 ? 's' : ''}{filtered.length !== products.length ? ` sur ${products.length}` : ' disponibles'}
          </p>
        </div>
      </AnimatedSection>

      <div className="space-y-4 mb-8">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <CategoryFilter selected={selectedCategory} onSelect={handleCategoryChange} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 fade-in-up">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-light mb-2" style={{ color: 'var(--text-secondary)' }}>Aucun produit trouvé</p>
          <p className="text-sm font-light mb-4" style={{ color: 'var(--text-muted)' }}>Essayez avec d'autres mots-clés ou catégories</p>
          <button
            onClick={handleReset}
            className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger-child">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
