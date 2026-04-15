// @ts-nocheck
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

interface Mood {
  id: string;
  label: string;
  emoji: string;
  subtitle: string;
  color: string;
  glowColor: string;
  bgTint: string;
  textColor: string;
  textColorLight: string;
  category: string;
  poem: string;
}

const MOODS: Mood[] = [
  {
    id: 'serenite',
    label: 'Sérénité',
    emoji: '🌿',
    subtitle: 'Détente & calme',
    color: 'radial-gradient(circle at 40% 40%, #2d5a3d, #1a3528, #0f2018)',
    glowColor: 'rgba(45,90,61,0.6)',
    bgTint: 'rgba(45,90,61,0.08)',
    textColor: '#7ec89e',
    textColorLight: '#2d5a3d',
    category: 'fleurs',
    poem: 'Laissez-vous porter par le silence des jardins. Chaque souffle devient plus doux, chaque pensée plus légère.',
  },
  {
    id: 'energie',
    label: 'Énergie',
    emoji: '⚡',
    subtitle: 'Vitalité & clarté',
    color: 'radial-gradient(circle at 40% 40%, #c4956a, #8a5e3a, #5a3a20)',
    glowColor: 'rgba(196,149,106,0.6)',
    bgTint: 'rgba(196,149,106,0.08)',
    textColor: '#e8b87a',
    textColorLight: '#8a5e3a',
    category: 'vapes',
    poem: 'Un élan naturel, sans secousse. Votre journée s\'illumine d\'une présence légère et affûtée.',
  },
  {
    id: 'sommeil',
    label: 'Sommeil',
    emoji: '🌙',
    subtitle: 'Repos & récupération',
    color: 'radial-gradient(circle at 40% 40%, #3a2d5a, #251a3d, #140f22)',
    glowColor: 'rgba(100,75,180,0.6)',
    bgTint: 'rgba(80,60,150,0.08)',
    textColor: '#b8a0e8',
    textColorLight: '#5a3d8a',
    category: 'huiles',
    poem: 'Le soir tombe doucement. Votre corps mérite un repos profond, naturel et réparateur.',
  },
  {
    id: 'focus',
    label: 'Focus',
    emoji: '✦',
    subtitle: 'Concentration & flow',
    color: 'radial-gradient(circle at 40% 40%, #1a4a5a, #0f2d3a, #081820)',
    glowColor: 'rgba(30,120,160,0.6)',
    bgTint: 'rgba(30,100,140,0.08)',
    textColor: '#7ac8e8',
    textColorLight: '#1a4a5a',
    category: 'resines',
    poem: 'L\'esprit s\'aiguise comme une lame. Chaque pensée devient précise, chaque action, intentionnelle.',
  },
];

const orbVariants = {
  idle: (custom: number) => ({
    scale: [1, 1.04, 1],
    opacity: [0.85, 1, 0.85],
    transition: {
      duration: 3 + custom * 0.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: custom * 0.4,
    },
  }),
  hovered: {
    scale: 1.12,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
  selected: {
    scale: 1.18,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export function MoodMatcher() {
  const [selected, setSelected] = useState<Mood | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const titleColor = isDark ? 'var(--text-primary)' : '#1a2f23';
  const subtitleColor = isDark ? 'var(--text-secondary)' : 'rgba(26,47,35,0.55)';
  const labelColor = isDark ? '#f5f0e8' : '#1a2f23';

  return (
    <section style={{
      padding: 'clamp(60px, 8vw, 120px) 24px',
      position: 'relative',
      overflow: 'hidden',
      background: selected
        ? `radial-gradient(ellipse at center, ${selected.bgTint} 0%, transparent 70%)`
        : 'transparent',
      transition: 'background 0.8s ease',
    }}>
      <motion.div
        key={selected?.id ?? 'none'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
      >
        <div className="badge-luxury" style={{ marginBottom: '28px' }}>
          Jardin Zen Interactif
        </div>

        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="question"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: titleColor,
                marginBottom: '12px',
                lineHeight: 1.1,
                transition: 'color 0.4s',
              }}>
                Comment vous sentez-vous <span className="text-or">aujourd'hui</span> ?
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: subtitleColor,
                fontWeight: 300,
                marginBottom: '64px',
                letterSpacing: '0.02em',
                transition: 'color 0.4s',
              }}>
                Choisissez votre humeur — nous vous guidons vers les produits qui lui correspondent.
              </p>
            </motion.div>
          ) : (
            <motion.div key="selected-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: isDark ? selected.textColor : selected.textColorLight,
                marginBottom: '12px',
                lineHeight: 1.1,
                transition: 'color 0.6s ease',
              }}>
                {selected.label}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: subtitleColor,
                fontWeight: 300,
                marginBottom: '48px',
                maxWidth: '480px',
                margin: '0 auto 48px',
                lineHeight: 1.75,
                fontStyle: 'italic',
                transition: 'color 0.4s',
              }}>
                {selected.poem}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(16px, 3vw, 40px)',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}>
          {MOODS.map((mood, i) => {
            const isSelected = selected?.id === mood.id;
            const isHovered = hovered === mood.id;
            const isDimmed = selected && !isSelected;

            return (
              <motion.button
                key={mood.id}
                onClick={() => setSelected(isSelected ? null : mood)}
                onHoverStart={() => setHovered(mood.id)}
                onHoverEnd={() => setHovered(null)}
                animate={isSelected ? 'selected' : isHovered ? 'hovered' : 'idle'}
                custom={i}
                variants={orbVariants}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  opacity: isDimmed ? 0.35 : 1,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div style={{ position: 'relative' }}>
                  {(isSelected || isHovered) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: 'absolute',
                        inset: '-20px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${mood.glowColor} 0%, transparent 70%)`,
                        filter: 'blur(8px)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  <motion.div
                    style={{
                      width: 'clamp(80px, 12vw, 120px)',
                      height: 'clamp(80px, 12vw, 120px)',
                      borderRadius: '50%',
                      background: mood.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isSelected
                        ? `2px solid ${isDark ? mood.textColor : mood.textColorLight}`
                        : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      boxShadow: isSelected
                        ? `0 0 40px ${mood.glowColor}, 0 0 80px ${mood.glowColor}40`
                        : '0 8px 32px rgba(0,0,0,0.4)',
                      transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '15%', left: '15%',
                      width: '35%', height: '35%',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.12)',
                      filter: 'blur(4px)',
                    }} />
                    <span style={{ fontSize: 'clamp(24px, 4vw, 36px)', position: 'relative', zIndex: 1 }}>
                      {mood.emoji}
                    </span>
                  </motion.div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                    fontWeight: 500,
                    color: isSelected
                      ? (isDark ? mood.textColor : mood.textColorLight)
                      : labelColor,
                    marginBottom: '2px',
                    transition: 'color 0.4s ease',
                    letterSpacing: '0.03em',
                  }}>
                    {mood.label}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    color: subtitleColor,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'color 0.4s',
                  }}>
                    {mood.subtitle}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link
                to={`/boutique?cat=${selected.category}`}
                className="btn-luxury"
                style={{ borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Voir les produits {selected.label}</span>
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => setSelected(null)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: subtitleColor,
                  background: 'none',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: '999px',
                  padding: '12px 24px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s, color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}
              >
                Choisir une autre humeur
              </button>
            </motion.div>
          )}

          {!selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/quiz" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: subtitleColor,
                textDecoration: 'none',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderBottom: `1px solid ${isDark ? 'rgba(201,168,76,0.2)' : 'rgba(74,103,65,0.2)'}`,
                paddingBottom: '2px',
                transition: 'color 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = isDark ? '#c9a84c' : '#4A6741';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '';
              }}
              >
                Ou répondre au quiz complet →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
