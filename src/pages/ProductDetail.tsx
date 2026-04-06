import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, Minus, Plus, ShoppingCart, Shield, Truck, Package, Heart, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';
import { addToWishlist, removeFromWishlist } from '../lib/supabaseDb';
import ProductCard from '../components/shop/ProductCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import AnimatedSection from '../components/ui/AnimatedSection';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const { user, profile, refreshProfile } = useAuth();
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const productIdStr = product ? String(product.id) : '';
  const isInWishlist = product ? (profile?.wishlist || []).includes(productIdStr) : false;

  useEffect(() => {
    setImageLoaded(false);
    setAddedToCart(false);
    setSelectedPriceIndex(0);
    setQuantity(1);
  }, [slug]);

  const toggleWishlist = async () => {
    if (!product || !user) {
      toast.error('Connectez-vous pour ajouter aux favoris');
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist(user.id, productIdStr);
        toast.success('Retiré des favoris');
      } else {
        await addToWishlist(user.id, productIdStr);
        toast.success('Ajouté aux favoris');
      }
      await refreshProfile();
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center fade-in-up">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-4 italic" style={{ color: 'var(--text-primary)' }}>Produit non trouvé</h1>
        <p className="mb-6 font-light" style={{ color: 'var(--text-secondary)' }}>Ce produit n'existe pas ou n'est plus disponible.</p>
        <Link to="/boutique" className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold btn-vivid">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const selectedPrice = product.prices[selectedPriceIndex];
  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const alsoLike = related.length < 4
    ? [...related, ...products.filter(p => p.id !== product.id && !related.find(r => r.id === p.id)).slice(0, 4 - related.length)]
    : related;

  const handleAddToCart = () => {
    addToCart(product, selectedPrice, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>{product.name} — CannaZen</title>
        <meta name="description" content={`${product.name} — ${product.description.slice(0, 150)}`} />
        <meta property="og:title" content={`${product.name} — CannaZen`} />
        <meta property="og:description" content={product.description.slice(0, 150)} />
        <meta property="og:image" content={product.image} />
      </Helmet>

      <Breadcrumbs items={[
        { label: 'Boutique', to: '/boutique' },
        { label: product.category, to: `/boutique?cat=${product.categorySlug}` },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <AnimatedSection animation="fade-left">
          <div className="relative aspect-square rounded-2xl overflow-hidden glass-card flex items-center justify-center group cursor-zoom-in">
            <img
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white tracking-wider">
                {product.badge}
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                NOUVEAU
              </span>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-right" delay={100}>
          <div>
            <p className="text-[10px] font-medium tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{product.category}</p>
            <h1 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold italic mb-3" style={{ color: 'var(--text-primary)' }}>{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={`transition-colors duration-300 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>{product.rating} ({product.reviewCount} avis)</span>
            </div>

            <p className="mb-6 font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>

            <div className="mb-4">
              <p className="text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Effets</p>
              <div className="flex flex-wrap gap-2">
                {product.effects.map((effect, i) => (
                  <span
                    key={effect}
                    className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-300 cursor-default"
                    style={{
                      background: 'rgba(13,148,136,0.08)',
                      color: 'var(--accent-1)',
                      border: '1px solid rgba(13,148,136,0.15)',
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Intensité</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: imageLoaded ? `${(product.intensity / 5) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(13,148,136,0.08)', color: 'var(--accent-1)' }}>{product.intensity}/5</span>
              </div>
            </div>

            {product.prices.length > 1 && (
              <div className="mb-6">
                <p className="text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Format</p>
                <div className="flex flex-wrap gap-2">
                  {product.prices.map((price, i) => (
                    <button
                      key={price.label}
                      onClick={() => setSelectedPriceIndex(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 ${
                        selectedPriceIndex === i
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-transparent shadow-md scale-105'
                          : 'hover:scale-105'
                      }`}
                      style={selectedPriceIndex !== i ? { borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--bg-card)' } : undefined}
                    >
                      {price.label} — {price.amount.toFixed(2)}€
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-3xl font-semibold text-gradient-vivid mb-6">{selectedPrice.amount.toFixed(2)}€</div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Réduire la quantité" className="hover:scale-110 active:scale-90 transition-transform" style={{ color: 'var(--text-secondary)' }}>
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-semibold" style={{ color: 'var(--text-primary)' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Augmenter la quantité" className="hover:scale-110 active:scale-90 transition-transform" style={{ color: 'var(--text-secondary)' }}>
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 btn-magnetic text-white ${
                  addedToCart
                    ? 'bg-emerald-600 shadow-lg'
                    : 'btn-vivid'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} className="animate-count-pop" /> Ajouté !
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Ajouter au panier
                  </>
                )}
              </button>
              <button
                onClick={toggleWishlist}
                aria-label={isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                className={`p-3 rounded-xl border transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isInWishlist
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'hover:text-red-400'
                }`}
                style={!isInWishlist ? { borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--bg-card)' } : undefined}
              >
                <Heart size={18} className={`transition-transform duration-300 ${isInWishlist ? 'fill-current scale-110' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, label: 'Livraison 24h', color: 'text-teal-500' },
                { icon: Shield, label: 'THC < 0.3%', color: 'text-emerald-500' },
                { icon: Package, label: 'Discret', color: 'text-cyan-500' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1 text-center p-3 rounded-xl glass-card card-hover-lift group">
                  <item.icon size={16} className={`${item.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-[10px] font-light" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.05), rgba(6,182,212,0.05))', border: '1px solid rgba(13,148,136,0.12)' }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <p className="text-xs font-semibold text-teal-600 italic mb-2">Le Smokellier recommande</p>
              <p className="text-sm italic font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                "{product.smokellierQuote}"
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {alsoLike.length > 0 && (
        <AnimatedSection>
          <section>
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-6 italic" style={{ color: 'var(--text-primary)' }}>Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-child">
              {alsoLike.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        </AnimatedSection>
      )}
    </div>
  );
}
