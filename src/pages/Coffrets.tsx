import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Gift, Star, Sparkles, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../lib/CartContext';
import AnimatedSection from '../components/ui/AnimatedSection';

interface Coffret {
  id: string;
  name: string;
  description: string;
  emoji: string;
  price: number;
  originalPrice: number;
  productIds: number[];
  theme: string;
  gradient: string;
}

const coffrets: Coffret[] = [
  { id: 'discovery', name: 'Coffret Découverte', description: "L'essentiel du CBD pour commencer votre voyage. 3 variétés soigneusement sélectionnées.", emoji: '🌱', price: 29.90, originalPrice: 39.70, productIds: [3, 5, 6], theme: 'Initiation', gradient: 'from-[#2d4a3e] to-[#3d6050]' },
  { id: 'premium', name: 'Coffret Premium', description: "Notre sélection d'exception pour les connaisseurs. 4 produits best-sellers.", emoji: '💎', price: 59.90, originalPrice: 79.60, productIds: [1, 4, 8, 9], theme: 'Connaisseur', gradient: 'from-[#c4956a] to-[#d4a574]' },
  { id: 'relax', name: 'Coffret Relax', description: "Détente absolue. Une sélection orientée relaxation et bien-être.", emoji: '🧘', price: 44.90, originalPrice: 59.50, productIds: [3, 17, 18], theme: 'Bien-être', gradient: 'from-[#1a2f23] to-[#2d4a3e]' },
  { id: 'intense', name: 'Coffret Intense', description: "Pour les amateurs de sensations fortes. Nos produits les plus puissants.", emoji: '⚡', price: 69.90, originalPrice: 94.60, productIds: [7, 8, 10, 11], theme: 'Puissance', gradient: 'from-[#8b7355] to-[#c4956a]' },
];

function CoffretCard({ coffret }: { coffret: Coffret }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const { addToCart } = useCart();
  const coffretProducts = coffret.productIds.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;
  const discount = Math.round((1 - coffret.price / coffret.originalPrice) * 100);

  const handleOpen = () => {
    if (isRevealed) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsRevealed(true);
      setIsOpening(false);
    }, 1200);
  };

  const handleAddAll = () => {
    coffretProducts.forEach(p => {
      addToCart(p, p.prices[0], 1);
    });
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden group">
      <div className={`relative p-6 bg-gradient-to-br ${coffret.gradient} text-white`}>
        <div className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
          -{discount}%
        </div>
        <span className="text-4xl block mb-3">{coffret.emoji}</span>
        <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold italic">{coffret.name}</h3>
        <p className="text-xs opacity-80 mt-1 font-light">{coffret.theme}</p>
      </div>

      <div className="p-5">
        <p className="text-sm font-light leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{coffret.description}</p>

        {!isRevealed ? (
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-500 ${
              isOpening ? 'coffret-opening' : 'btn-amber hover:scale-[1.02]'
            }`}
          >
            {isOpening ? (
              <>
                <Gift size={16} className="animate-bounce" />
                <span className="animate-pulse">Ouverture en cours...</span>
              </>
            ) : (
              <>
                <Gift size={16} />
                Ouvrir le coffret
              </>
            )}
          </button>
        ) : (
          <div className="space-y-3 fade-in-up">
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Contenu du coffret</p>
            <div className="space-y-2">
              {coffretProducts.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-2 rounded-lg border border-[var(--border-color)]/50 coffret-item"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                    <p className="text-[10px] font-light" style={{ color: 'var(--text-muted)' }}>{p.category}</p>
                  </div>
                  <Star size={10} className="text-[#c9a96e] fill-[#c9a96e]" />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]/40">
              <div>
                <span className="text-lg font-bold text-gradient-vivid">{coffret.price.toFixed(2)}€</span>
                <span className="text-xs line-through ml-2" style={{ color: 'var(--text-muted)' }}>{coffret.originalPrice.toFixed(2)}€</span>
              </div>
              <button onClick={handleAddAll} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white btn-vivid">
                <ShoppingCart size={14} /> Ajouter tout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Coffrets() {
  return (
    <div className="py-8">
      <Helmet>
        <title>Coffrets Surprise CBD — Sélections Premium | CannaZen</title>
        <meta name="description" content="Découvrez nos coffrets surprise CBD. Sélections thématiques à prix réduit avec animation d'ouverture exclusive." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium px-4 py-2 rounded-full mb-4 tracking-[0.2em] uppercase" style={{ background: 'rgba(196,149,106,0.08)', color: '#c4956a', border: '1px solid rgba(196,149,106,0.15)' }}>
            <Sparkles size={11} /> Éditions limitées
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold italic mb-3" style={{ color: 'var(--text-primary)' }}>
            Coffrets <span className="text-gradient-vivid">Surprise</span>
          </h1>
          <p className="text-sm sm:text-base font-light max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Des sélections thématiques soigneusement composées. Ouvrez le coffret pour découvrir son contenu.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-6 stagger-child">
          {coffrets.map(c => <CoffretCard key={c.id} coffret={c} />)}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>
            💡 Les coffrets sont composés à partir de notre catalogue. Économisez jusqu'à 30% par rapport à l'achat individuel.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
