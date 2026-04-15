import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/products';
import { useTheme } from '../../lib/ThemeContext';
import {
  FleursCBDIllustration,
  HuilesCBDIllustration,
  ResinesIllustration,
  VapesIllustration,
  GummiesIllustration,
  FleursD10Illustration,
  FleursOHIllustration,
} from './BotanicalIllustrations';

interface Category {
  slug: string;
  name: string;
  poem: string;
  accent: string;
  bg: string;
  Illustration: React.ComponentType<{ size?: number }>;
  span: { col: string; row: string };
  illustrationSize: number;
}

const CATEGORIES: Category[] = [
  {
    slug: 'fleurs-cbd',
    name: 'Fleurs CBD',
    poem: 'Essences naturelles cultivées avec passion, récoltées à maturité parfaite',
    accent: '#7ab893',
    bg: 'linear-gradient(145deg, #0d1f15 0%, #091410 100%)',
    Illustration: FleursCBDIllustration,
    span: { col: 'span 7', row: 'span 2' },
    illustrationSize: 280,
  },
  {
    slug: 'huiles-cbd',
    name: 'Huiles CBD',
    poem: 'Extraction douce, plénitude totale',
    accent: '#b8d470',
    bg: 'linear-gradient(145deg, #131f08 0%, #0a1406 100%)',
    Illustration: HuilesCBDIllustration,
    span: { col: 'span 5', row: 'span 1' },
    illustrationSize: 160,
  },
  {
    slug: 'resines-d10',
    name: 'Résines D10',
    poem: 'Concentrés d\'exception, cristallisés avec soin',
    accent: '#e8d5a0',
    bg: 'linear-gradient(145deg, #1a160a 0%, #100e06 100%)',
    Illustration: ResinesIllustration,
    span: { col: 'span 5', row: 'span 1' },
    illustrationSize: 160,
  },
  {
    slug: 'fleurs-d10',
    name: 'Fleurs D10',
    poem: 'Euphorie légale, arômes solaires',
    accent: '#c9a84c',
    bg: 'linear-gradient(145deg, #1e1508 0%, #130e05 100%)',
    Illustration: FleursD10Illustration,
    span: { col: 'span 4', row: 'span 1' },
    illustrationSize: 140,
  },
  {
    slug: 'vapes',
    name: 'Vapes',
    poem: 'Vapeur botanique, ritual moderne',
    accent: '#7ab893',
    bg: 'linear-gradient(145deg, #08151a 0%, #050e12 100%)',
    Illustration: VapesIllustration,
    span: { col: 'span 4', row: 'span 1' },
    illustrationSize: 140,
  },
  {
    slug: 'fleurs-oh',
    name: 'Fleurs OH+',
    poem: 'Intensité maîtrisée, expertise premium',
    accent: '#8ab4d4',
    bg: 'linear-gradient(145deg, #091528 0%, #050d1a 100%)',
    Illustration: FleursOHIllustration,
    span: { col: 'span 4', row: 'span 1' },
    illustrationSize: 140,
  },
  {
    slug: 'gummies-d9',
    name: 'Gummies D9',
    poem: 'Douceur botanique, plaisir gourmand',
    accent: '#d47ab8',
    bg: 'linear-gradient(145deg, #1e0d18 0%, #140810 100%)',
    Illustration: GummiesIllustration,
    span: { col: 'span 4', row: 'span 1' },
    illustrationSize: 140,
  },
];

function CategoryCard({ cat, i }: { cat: Category; i: number }) {
  const [hovered, setHovered] = useState(false);
  const count = products.filter(p => p.categorySlug === cat.slug).length;
  const isLarge = i === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ gridColumn: cat.span.col, gridRow: cat.span.row }}
    >
      <Link
        to={`/boutique?cat=${cat.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: isLarge ? '420px' : '200px',
          borderRadius: '18px',
          overflow: 'hidden',
          position: 'relative',
          background: cat.bg,
          border: `1px solid ${cat.accent}18`,
          textDecoration: 'none',
          
        }}
      >
        {/* Hover glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 40% 35%, ${cat.accent}22 0%, transparent 65%)`,
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {/* Bottom gradient for text */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(4,6,4,0.92) 0%, rgba(4,6,4,0.3) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Illustration */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isLarge ? '32px' : '16px',
          position: 'relative',
        }}>
          <motion.div
            animate={hovered
              ? { scale: 1.06, y: -4 }
              : { scale: 1, y: 0 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <cat.Illustration size={cat.illustrationSize} />
          </motion.div>
        </div>

        {/* Text content */}
        <div style={{
          position: 'relative', zIndex: 2,
          padding: isLarge ? '28px 32px' : '16px 20px',
        }}>
          <motion.h3
            animate={hovered ? { y: -2 } : { y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: isLarge ? '2.4rem' : '1.4rem',
              fontWeight: 400,
              color: '#f5f0e8',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              marginBottom: '8px',
            }}
          >
            {cat.name}
          </motion.h3>

          <AnimatePresence>
            {(hovered || isLarge) && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: isLarge ? '0.85rem' : '0.72rem',
                  color: cat.accent,
                  fontWeight: 300,
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                  marginBottom: '8px',
                  overflow: 'hidden',
                }}
              >
                {cat.poem}
              </motion.p>
            )}
          </AnimatePresence>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {count > 0 && (
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.6rem',
                color: 'rgba(245,240,232,0.35)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}>
                {count} produit{count > 1 ? 's' : ''}
              </span>
            )}
            <motion.span
              animate={hovered ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.4 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.65rem',
                color: cat.accent,
                letterSpacing: '0.1em',
                marginLeft: 'auto',
              }}
            >
              Explorer →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryGrid() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const titleColor = isDark ? 'var(--text-primary)' : '#1a2f23';
  const accentColor = isDark ? '#c9a84c' : '#4A6741';
  const labelColor = isDark ? '#4a7c59' : '#4A6741';

  return (
    <section style={{
      padding: 'clamp(60px, 8vw, 100px) clamp(16px, 3vw, 40px)',
      background: 'var(--gradient-bg)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.6rem', fontWeight: 500,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: labelColor, marginBottom: '14px',
          }}>
            — Galerie Botanique
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            color: titleColor,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            transition: 'color 0.4s',
          }}>
            Toutes nos <em style={{ color: accentColor, fontStyle: 'italic' }}>catégories</em>
          </h2>
        </motion.div>

        {/* Desktop asymmetric grid */}
        <div
          className="category-gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(3, 210px)',
            gap: '12px',
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.slug} cat={cat} i={i} />
          ))}
        </div>

        {/* Mobile fallback */}
        <style>{`
          @media (max-width: 768px) {
            .category-gallery-grid {
              grid-template-columns: 1fr 1fr !important;
              grid-template-rows: auto !important;
            }
            .category-gallery-grid > * {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
            }
            .category-gallery-grid > *:first-child {
              grid-column: span 2 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
