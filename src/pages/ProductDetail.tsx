import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, Shield, Truck, Package, Heart, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { products, getDetailImages } from '../data/products';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';
import { addToWishlist, removeFromWishlist } from '../lib/supabaseDb';
import ProductCard from '../components/shop/ProductCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import AnimatedSection from '../components/ui/AnimatedSection';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList';
import ProductGallery from '../components/product/ProductGallery';
import WeightSelector from '../components/product/WeightSelector';
import AddToCartButton from '../components/product/AddToCartButton';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const { user, profile, refreshProfile } = useAuth();
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewKey, setReviewKey] = useState(0);

  const productIdStr = product ? String(product.id) : '';
  const isInWishlist = false;

  useEffect(() => {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-16">
        {/* Gallery */}
        <AnimatedSection animation="fade-left">
          <ProductGallery
            mainImage={product.image}
            images={product.images || getDetailImages(product.categorySlug)}
            productName={product.name}
            badge={product.badge}
            isNew={product.isNew}
          />
        </AnimatedSection>

        {/* Product Info */}
        <AnimatedSection animation="fade-right" delay={0.1}>
          <div className="lg:sticky lg:top-28">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{product.category}</p>
            <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold italic mb-3" style={{ color: 'var(--text-primary)' }}>{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className={`transition-colors duration-300 ${i < Math.round(product.rating) ? 'fill-[#c9a96e] text-[#c9a96e]' : 'text-gray-200 dark:text-gray-600'}`} />
                ))}
              </div>
              <span className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>{product.rating} ({product.reviewCount} avis)</span>
            </div>

            <p className="mb-6 font-light leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>

            {/* Effects */}
            <div className="mb-5">
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Effets</p>
              <div className="flex flex-wrap gap-2">
                {product.effects.map((effect, i) => (
                  <motion.span
                    key={effect}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(196,149,106,0.08)',
                      color: '#c4956a',
                      border: '1px solid rgba(196,149,106,0.15)',
                    }}
                  >
                    {effect}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Intensity */}
            <div className="mb-6">
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Intensité</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(product.intensity / 5) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #1a2f23, #c4956a, #e8c49a)' }}
                  />
                </div>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(196,149,106,0.08)', color: '#c4956a' }}>{product.intensity}/5</span>
              </div>
            </div>

            {/* Weight/Format Selector */}
            <WeightSelector
              prices={product.prices}
              selectedIndex={selectedPriceIndex}
              onSelect={setSelectedPriceIndex}
            />

            {/* Add to Cart */}
            <div className="mb-6">
              <AddToCartButton
                quantity={quantity}
                setQuantity={setQuantity}
                onAdd={handleAddToCart}
                added={addedToCart}
                price={selectedPrice.amount}
              />
            </div>

            {/* Wishlist */}
            <div className="mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={toggleWishlist}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
                  isInWishlist
                    ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-950/20 dark:border-red-800'
                    : ''
                }`}
                style={!isInWishlist ? { borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--bg-card)' } : undefined}
              >
                <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
                {isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, label: 'Livraison 24h', sub: 'Rapide & fiable' },
                { icon: Shield, label: 'THC < 0.3%', sub: '100% légal' },
                { icon: Package, label: 'Discret', sub: 'Emballage neutre' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex flex-col items-center gap-1 text-center p-3 rounded-xl glass-card group"
                >
                  <item.icon size={16} className="text-[#c4956a] group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                  <span className="text-[9px] font-light" style={{ color: 'var(--text-muted)' }}>{item.sub}</span>
                </motion.div>
              ))}
            </div>

            {/* Smokellier quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(196,149,106,0.05), rgba(26,47,35,0.03))', border: '1px solid rgba(196,149,106,0.12)' }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#c4956a]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <p className="text-xs font-semibold text-[#c4956a] italic mb-2">Le Smokellier recommande</p>
              <p className="text-sm italic font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                "{product.smokellierQuote}"
              </p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>

      {/* Related products */}
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

      {/* Reviews */}
      <AnimatedSection className="mt-8">
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
          <div className="px-6 py-4 flex items-center gap-2" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
            <MessageSquare size={16} className="text-[#c4956a]" />
            <h2 className="font-['Cormorant_Garamond'] text-xl font-semibold italic" style={{ color: 'var(--text-primary)' }}>
              Avis clients
            </h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-medium mb-4 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Laisser un avis</p>
              <ReviewForm productSlug={product.slug} onSubmitted={() => setReviewKey(k => k + 1)} />
            </div>
            <div>
              <p className="text-xs font-medium mb-4 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Avis publiés</p>
              <ReviewList productSlug={product.slug} refreshKey={reviewKey} />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
