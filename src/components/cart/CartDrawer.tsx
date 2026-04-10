import { X, ShoppingBag, Minus, Plus, ArrowRight, Trash2, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../lib/CartContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const FREE_THRESHOLD = 49;
  const remaining = Math.max(0, FREE_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_THRESHOLD) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(5,5,4,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 70,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: '420px',
        maxWidth: '100vw',
        background: 'linear-gradient(180deg, #0d1a10 0%, #0a0a08 100%)',
        border: '1px solid rgba(201,168,76,0.12)',
        borderRight: 'none',
        zIndex: 80,
        display: 'flex',
        flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: open ? '-20px 0 80px rgba(0,0,0,0.5)' : 'none',
      }}>
        {/* Header */}
        <div style={{
          padding: '28px 28px 20px',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingBag size={18} color="#c9a84c" strokeWidth={1.2} />
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.2rem',
              fontWeight: 400,
              color: '#f5f0e8',
              letterSpacing: '0.02em',
            }}>
              Panier
            </span>
            {cartCount > 0 && (
              <span style={{
                padding: '2px 8px',
                background: 'rgba(201,168,76,0.15)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '20px',
                fontSize: '0.6rem',
                color: '#c9a84c',
                fontFamily: 'DM Sans, sans-serif',
              }}>
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: 'rgba(245,240,232,0.4)',
              cursor: 'pointer',
              display: 'flex',
              transition: 'color 0.2s',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping progress */}
        {cartTotal > 0 && cartTotal < FREE_THRESHOLD && (
          <div style={{
            padding: '16px 28px',
            background: 'rgba(26,51,32,0.3)',
            borderBottom: '1px solid rgba(201,168,76,0.06)',
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.65rem',
              color: 'rgba(245,240,232,0.5)',
              marginBottom: '8px',
              letterSpacing: '0.05em',
            }}>
              Plus que <strong style={{ color: '#c9a84c' }}>{remaining.toFixed(2).replace('.', ',')} €</strong> pour la livraison offerte
            </div>
            <div style={{
              height: '2px',
              background: 'rgba(245,240,232,0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #c9a84c, #f0c060)',
                borderRadius: '2px',
                transition: 'width 0.5s var(--ease-luxury)',
                boxShadow: '0 0 8px rgba(201,168,76,0.5)',
              }} />
            </div>
          </div>
        )}
        {cartTotal >= FREE_THRESHOLD && (
          <div style={{
            padding: '12px 28px',
            background: 'rgba(26,51,32,0.5)',
            borderBottom: '1px solid rgba(122,184,147,0.15)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.65rem',
            color: '#7ab893',
            letterSpacing: '0.05em',
          }}>
            🌿 Livraison offerte !
          </div>
        )}

        {/* Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 28px',
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '16px',
              opacity: 0.4,
            }}>
              <ShoppingBag size={40} color="#c9a84c" strokeWidth={0.8} />
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.1rem',
                color: '#f5f0e8',
                fontWeight: 300,
              }}>
                Votre panier est vide
              </span>
              <Link
                to="/boutique"
                onClick={onClose}
                className="btn-ghost"
                style={{ marginTop: '8px' }}
              >
                <span>Voir la boutique</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <style>{`
                @keyframes cart-item-in {
                  from { opacity: 0; transform: translateX(20px); }
                  to { opacity: 1; transform: translateX(0); }
                }
              `}</style>
              {cartItems.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    background: 'rgba(26,51,32,0.2)',
                    border: '1px solid rgba(201,168,76,0.06)',
                    borderRadius: '8px',
                    animation: `cart-item-in 0.4s var(--ease-luxury) ${i * 50}ms both`,
                  }}
                >
                  <div style={{
                    width: '64px', height: '64px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#1a3320',
                  }}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '0.95rem',
                      fontWeight: 400,
                      color: '#f5f0e8',
                      marginBottom: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {item.product.name}
                    </div>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.6rem',
                      color: 'rgba(245,240,232,0.35)',
                      marginBottom: '6px',
                      letterSpacing: '0.05em',
                    }}>
                      {item.selectedPrice.label}
                    </div>
                    <div style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1rem',
                      color: '#c9a84c',
                      marginBottom: '10px',
                    }}>
                      {(item.selectedPrice.amount * item.quantity).toFixed(2).replace('.', ',')} €
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '24px', height: '24px',
                          border: '1px solid rgba(201,168,76,0.2)',
                          borderRadius: '4px',
                          background: 'none',
                          color: '#c9a84c',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <Minus size={10} />
                      </button>
                      <span style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.75rem',
                        color: '#f5f0e8',
                        minWidth: '20px',
                        textAlign: 'center',
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '24px', height: '24px',
                          border: '1px solid rgba(201,168,76,0.2)',
                          borderRadius: '4px',
                          background: 'none',
                          color: '#c9a84c',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none', border: 'none',
                          color: 'rgba(245,240,232,0.2)',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center',
                          transition: 'color 0.2s',
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 28px 28px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                color: 'rgba(245,240,232,0.5)',
                textTransform: 'uppercase',
              }}>
                Sous-total
              </span>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.4rem',
                fontWeight: 500,
                color: '#c9a84c',
              }}>
                {cartTotal.toFixed(2).replace('.', ',')} €
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="btn-luxury"
              style={{ width: '100%', justifyContent: 'center', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Commander</span>
              <ArrowRight size={14} />
            </Link>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '12px',
            }}>
              <button
                onClick={onClose}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.65rem',
                  color: 'rgba(245,240,232,0.3)',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                }}
              >
                Continuer mes achats
              </button>
              <button
                onClick={() => clearCart()}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'none', border: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.6rem',
                  color: 'rgba(245,240,232,0.2)',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                }}
              >
                <Trash size={11} /> Vider
              </button>
            </div>
            <p style={{
              textAlign: 'center',
              marginTop: '12px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.6rem',
              color: 'rgba(245,240,232,0.15)',
              letterSpacing: '0.05em',
            }}>
              Livraison calculée à la commande
            </p>
          </div>
        )}
      </div>
    </>
  );
}
