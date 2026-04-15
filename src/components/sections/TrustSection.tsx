import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Leaf, Truck, FlaskConical, Award, Headphones, X } from 'lucide-react';

interface TrustItem {
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  detail: string;
  color: string;
  darkColor: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Shield,
    title: 'Paiement 100% Sécurisé',
    shortDesc: 'Transactions chiffrées SSL',
    detail: 'Nous utilisons un chiffrement SSL 256-bit pour toutes les transactions. Vos données bancaires ne sont jamais stockées sur nos serveurs. Nous acceptons : Cartes bancaires (Visa, Mastercard), PayPal, Virements bancaires, et Cryptomonnaies (Bitcoin, Ethereum).',
    color: '#c9a84c',
    darkColor: '#e8c49a',
  },
  {
    icon: Leaf,
    title: 'Qualité Certifiée Bio',
    shortDesc: 'Analyses laboratoires indépendants',
    detail: 'Tous nos produits sont issus de l\'agriculture biologique européenne. Chaque lot est testé par des laboratoires indépendants pour garantir : Taux de CBD précis, THC < 0.3% (conforme législation), Absence de pesticides et métaux lourds. Certificats disponibles sur demande.',
    color: '#4a7c59',
    darkColor: '#7ab893',
  },
  {
    icon: Truck,
    title: 'Livraison Express 24-48h',
    shortDesc: 'Expédition sous 24h en semaine',
    detail: 'Expédition le jour même pour toute commande passée avant 14h (jours ouvrés). Livraison en 24-48h en France métropolitaine. Options disponibles : Colissimo à domicile, Point relais (offert dès 49€), Chronopost express. Emballage discret et neutre garanti.',
    color: '#c9a84c',
    darkColor: '#e8c49a',
  },
  {
    icon: FlaskConical,
    title: 'Transparence Totale',
    shortDesc: 'Chaque lot testé indépendamment',
    detail: 'Nous croyons en la transparence totale. Chaque produit dispose d\'un QR code menant directement à son certificat d\'analyse (COA). Vous pouvez vérifier : Le profil cannabinoïde complet (CBD, CBG, CBN...), L\'absence de contaminants, La traçabilité complète du lot. Ces documents sont accessibles 24/7.',
    color: '#5a7a9a',
    darkColor: '#8ab4d4',
  },
  {
    icon: Award,
    title: 'Sélection Premium',
    shortDesc: 'Seul le meilleur 1% référencé',
    detail: 'Nous ne sélectionnons que le top 1% des produits du marché européen. Nos critères : Génétiques exceptionnelles, Cultivateurs partenaires certifiés, Taux de cannabinoïdes optimaux, Arômes et terpènes préservés, Conditionnement premium pour une conservation parfaite.',
    color: '#c9a84c',
    darkColor: '#e8c49a',
  },
  {
    icon: Headphones,
    title: 'Support Client Expert',
    shortDesc: 'Conseillers disponibles 7j/7',
    detail: 'Notre équipe d\'experts CBD est là pour vous guider. Disponible 7j/7 par email (réponse sous 2h), chat en direct (9h-21h), et téléphone (10h-18h). Nous pouvons vous conseiller sur : Le choix des produits, Les dosages recommandés, Les interactions possibles, Le suivi de commande.',
    color: '#4a7c59',
    darkColor: '#7ab893',
  },
];

export function TrustSection() {
  const [activeItem, setActiveItem] = useState<TrustItem | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section style={{
      padding: 'clamp(60px, 8vw, 120px) clamp(16px, 4vw, 40px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(45,90,61,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="text-label" style={{ color: 'var(--accent-2)', marginBottom: '16px' }}>
            — Pourquoi nous choisir
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
          }}>
            L'excellence à{' '}
            <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>chaque étape</em>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const isHov = hoveredIdx === i;

            return (
              <motion.button
                key={i}
                onClick={() => setActiveItem(item)}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: '32px 28px',
                  borderRadius: '16px',
                  textAlign: 'left',
                  
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  boxShadow: isHov
                    ? '0 16px 48px var(--shadow-color)'
                    : '0 4px 16px var(--shadow-color)',
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isHov && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at 20% 20%, ${item.color}12, transparent 65%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                <motion.div
                  animate={{ rotate: isHov ? 8 : 0, scale: isHov ? 1.12 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    width: '48px', height: '48px',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '18px',
                    background: `${item.color}14`,
                    border: `1px solid ${item.color}30`,
                    position: 'relative', zIndex: 1,
                  }}
                >
                  <Icon size={20} color={item.color} strokeWidth={1.3} />
                </motion.div>

                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  letterSpacing: '0.01em',
                  position: 'relative', zIndex: 1,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  fontWeight: 300,
                  marginBottom: '16px',
                  position: 'relative', zIndex: 1,
                }}>
                  {item.shortDesc}
                </p>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: item.color,
                  position: 'relative', zIndex: 1,
                  opacity: isHov ? 1 : 0.6,
                  transition: 'opacity 0.3s',
                }}>
                  En savoir plus →
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveItem(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: 'clamp(28px, 4vw, 48px)',
                maxWidth: '540px',
                width: '100%',
                position: 'relative',
                boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
              }}
            >
              <button
                onClick={() => setActiveItem(null)}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: 'var(--border-color)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  
                  color: 'var(--text-secondary)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--border-color)')}
              >
                <X size={14} />
              </button>

              <div style={{
                width: '56px', height: '56px',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
                background: `${activeItem.color}18`,
                border: `1px solid ${activeItem.color}40`,
              }}>
                <activeItem.icon size={24} color={activeItem.color} strokeWidth={1.3} />
              </div>

              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                marginBottom: '8px',
                lineHeight: 1.2,
              }}>
                {activeItem.title}
              </h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeItem.color,
                marginBottom: '20px',
                fontWeight: 500,
              }}>
                {activeItem.shortDesc}
              </p>
              <div style={{
                width: '40px', height: '1px',
                background: `${activeItem.color}40`,
                marginBottom: '20px',
              }} />
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                fontWeight: 300,
              }}>
                {activeItem.detail}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
