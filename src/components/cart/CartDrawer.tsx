import { X, ShoppingBag, Minus, Plus, Trash2, Truck, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../lib/CartContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const FREE_SHIPPING_THRESHOLD = 49;
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.90;
  const total = cartTotal + shipping;
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(13,148,136,0.1)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-[80] w-full sm:w-[400px] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-xl italic flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            Panier
            {cartItems.length > 0 && (
              <span className="text-xs font-normal not-italic px-2 py-0.5 rounded-full text-white bg-gradient-to-r from-teal-500 to-emerald-500">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </h2>
          <button onClick={onClose} aria-label="Fermer le panier" className="hover:rotate-90 transition-all duration-300" style={{ color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center fade-in-up">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(13,148,136,0.06)' }}>
              <ShoppingBag size={32} className="text-teal-400/40" />
            </div>
            <p className="mb-2 font-light" style={{ color: 'var(--text-secondary)' }}>Votre panier est vide</p>
            <p className="text-xs mb-6 font-light" style={{ color: 'var(--text-muted)' }}>Explorez notre collection pour trouver votre bonheur</p>
            <Link
              to="/boutique"
              onClick={onClose}
              className="text-white px-6 py-2.5 rounded-xl text-sm font-semibold btn-vivid"
            >
              Voir la boutique
            </Link>
          </div>
        ) : (
          <>
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={14} className={`transition-colors duration-300 ${shipping === 0 ? 'text-emerald-500' : 'text-teal-400'}`} />
                {shipping === 0 ? (
                  <p className="text-xs font-semibold text-emerald-500">Livraison offerte !</p>
                ) : (
                  <p className="text-xs font-light" style={{ color: 'var(--text-secondary)' }}>
                    Plus que <span className="font-semibold text-teal-600">{remaining.toFixed(2)}€</span> pour la livraison offerte
                  </p>
                )}
              </div>
              <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.map((item, i) => (
                <div
                  key={item.id}
                  className="group relative glass-card rounded-xl p-3 transition-all duration-300"
                  style={{ animation: `slide-up 0.3s cubic-bezier(0.22, 1, 0.36, 1) ${i * 50}ms both` }}
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0" style={{ border: '1px solid var(--border-light)' }}>
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{item.product.name}</h4>
                      <p className="text-xs font-light" style={{ color: 'var(--text-secondary)' }}>{item.selectedPrice.label}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-sm font-semibold text-gradient-vivid">{(item.selectedPrice.amount * item.quantity).toFixed(2)}€</p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] font-light" style={{ color: 'var(--text-muted)' }}>{item.selectedPrice.amount.toFixed(2)}€/u</p>
                        )}
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} aria-label={`Retirer ${item.product.name}`} className="absolute -top-2 -right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm hover:scale-110 hover:text-red-400" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <div className="flex items-center gap-2 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Réduire la quantité" className="p-1.5 hover:scale-110 active:scale-90 transition-transform" style={{ color: 'var(--text-secondary)' }}>
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-5 text-center font-medium" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Augmenter la quantité" className="p-1.5 hover:scale-110 active:scale-90 transition-transform" style={{ color: 'var(--text-secondary)' }}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 space-y-3" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex justify-between text-sm">
                <span className="font-light" style={{ color: 'var(--text-secondary)' }}>Sous-total</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{cartTotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-light" style={{ color: 'var(--text-secondary)' }}>Livraison estimée</span>
                <span className={`font-medium ${shipping === 0 ? 'text-emerald-500' : ''}`} style={shipping !== 0 ? { color: 'var(--text-primary)' } : undefined}>{shipping === 0 ? 'Offerte' : `${shipping.toFixed(2)}€`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-primary)' }}>Total</span>
                <span className="text-gradient-vivid">{total.toFixed(2)}€</span>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full text-center text-white py-3 rounded-xl font-semibold btn-vivid neon-glow"
              >
                Commander — {total.toFixed(2)}€
              </Link>
              <div className="flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="text-sm font-light transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Continuer mes achats
                </button>
                <button
                  onClick={() => { clearCart(); }}
                  className="flex items-center gap-1.5 text-xs font-light transition-colors duration-200 hover:text-red-400"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Trash size={12} /> Vider le panier
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
