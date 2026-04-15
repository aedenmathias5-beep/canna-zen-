import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../lib/ThemeContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const WORDS = ['Détente', 'Bien-être', 'Sérénité', 'Euphorie', 'Équilibre'];

function LotusLeaf({ isDark }: { isDark: boolean }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      width="80"
      height="90"
      viewBox="0 0 80 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-8"
    >
      {/* Stem */}
      <motion.line
        x1="40" y1="58" x2="40" y2="88"
        stroke={isDark ? '#7ab893' : '#6b9f6e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      {/* Center petal */}
      <motion.path
        d="M40 12C40 12 32 28 32 38C32 48 36 54 40 56C44 54 48 48 48 38C48 28 40 12 40 12Z"
        fill={isDark ? '#5a9a72' : '#7ab893'}
        opacity="0.9"
        initial={{ scale: 0, originX: '40px', originY: '56px' }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      {/* Left petal */}
      <motion.path
        d="M40 56C40 56 24 46 18 36C12 26 14 18 18 16C22 18 30 26 34 36C38 46 40 56 40 56Z"
        fill={isDark ? '#4a8a62' : '#6b9f6e'}
        opacity="0.8"
        initial={{ scale: 0, originX: '40px', originY: '56px' }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      {/* Right petal */}
      <motion.path
        d="M40 56C40 56 56 46 62 36C68 26 66 18 62 16C58 18 50 26 46 36C42 46 40 56 40 56Z"
        fill={isDark ? '#4a8a62' : '#6b9f6e'}
        opacity="0.8"
        initial={{ scale: 0, originX: '40px', originY: '56px' }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      {/* Far left petal */}
      <motion.path
        d="M40 56C40 56 18 52 10 44C2 36 4 28 8 26C12 30 22 38 30 46C38 54 40 56 40 56Z"
        fill={isDark ? '#3d7a55' : '#5a8f60'}
        opacity="0.6"
        initial={{ scale: 0, originX: '40px', originY: '56px' }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
      {/* Far right petal */}
      <motion.path
        d="M40 56C40 56 62 52 70 44C78 36 76 28 72 26C68 30 58 38 50 46C42 54 40 56 40 56Z"
        fill={isDark ? '#3d7a55' : '#5a8f60'}
        opacity="0.6"
        initial={{ scale: 0, originX: '40px', originY: '56px' }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
    </motion.svg>
  );
}

export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(160deg, #060806 0%, #0a1209 20%, #0e1c12 45%, #1a3320 70%, #0d1810 100%)'
          : 'linear-gradient(160deg, #faf8f5 0%, #f0ece4 25%, #e8f0eb 50%, #f5f0e8 75%, #eef2ed 100%)',
        transition: 'background 0.8s',
      }}
    >
      {/* Ambient gradient orbs */}
      <motion.div
        style={{ opacity: orbOpacity, scale: orbScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(74,103,65,0.1) 0%, rgba(74,103,65,0.03) 40%, transparent 70%)',
            animation: 'hero-orb-float 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse, rgba(45,90,61,0.12) 0%, transparent 60%)'
              : 'radial-gradient(ellipse, rgba(74,103,65,0.06) 0%, transparent 60%)',
            animation: 'hero-orb-float 15s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(122,184,147,0.06) 0%, transparent 65%)'
              : 'radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 65%)',
            animation: 'hero-orb-float 10s ease-in-out infinite 2s',
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, rgba(10,18,9,0.3) 80%, rgba(10,18,9,0.6) 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(248,246,240,0.2) 80%, rgba(248,246,240,0.4) 100%)',
        }}
      />

      <style>{`
        @keyframes hero-orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, -20px) scale(1.05); }
          66% { transform: translate(-10px, 10px) scale(0.97); }
        }
      `}</style>

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 text-center px-6 py-32 max-w-[920px] flex flex-col items-center"
      >
        {/* Legal badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="badge-luxury mb-10"
        >
          Cannabis légal · THC &lt; 0.3%
        </motion.div>

        {/* Lotus leaf illustration */}
        <LotusLeaf isDark={isDark} />

        {/* Main title — original */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif leading-[0.95] tracking-[-0.02em] mb-3"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            fontWeight: 300,
            color: isDark ? '#f5f0e8' : '#1a2f23',
            transition: 'color 0.5s',
          }}
        >
          L'univers de
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic leading-[0.95] tracking-[-0.02em] mb-8"
          style={{
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 300,
          }}
        >
          <span
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(135deg, #c9a84c 0%, #f0c060 30%, #e8d5a0 60%, #c9a84c 100%)'
                : 'linear-gradient(135deg, #2d5a3d 0%, #4a7c59 40%, #6b9f6e 70%, #3d6b4a 100%)',
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer-gold 5s ease-in-out infinite',
            }}
          >
            Mary Jane
          </span>
        </motion.h1>

        {/* Word rotator — fixed width for longer words */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6 h-10"
        >
          <span
            className="font-sans text-sm tracking-[0.2em] uppercase"
            style={{ color: isDark ? 'rgba(245,240,232,0.45)' : 'rgba(26,47,35,0.5)' }}
          >
            Pour votre
          </span>
          <div className="relative w-[180px] h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute font-serif italic text-2xl"
                style={{ color: isDark ? '#c9a84c' : '#4A6741' }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-sans text-base font-light leading-relaxed max-w-[520px] mx-auto mb-12"
          style={{
            color: isDark ? 'rgba(245,240,232,0.55)' : 'rgba(26,47,35,0.6)',
            letterSpacing: '0.02em',
          }}
        >
          Sélection premium de fleurs CBD, D10, OH+, résines, vapes
          et huiles biologiques. L'excellence du cannabis légal français.
        </motion.p>

        {/* CTAs — original labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Link to="/boutique" className="btn-luxury group">
            <span>Découvrir la boutique</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </Link>
          <Link to="/quiz" className="btn-ghost">
            <span>Quiz personnalisé</span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex gap-12 justify-center mt-16 pt-10 flex-wrap"
          style={{
            borderTop: `1px solid ${isDark ? 'rgba(201,168,76,0.1)' : 'rgba(74,103,65,0.12)'}`,
          }}
        >
          {[
            { num: '28', label: 'Produits premium' },
            { num: '7', label: 'Catégories' },
            { num: '4.9★', label: 'Note moyenne' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
              className="text-center"
            >
              <div
                className="font-serif text-3xl md:text-4xl font-light leading-none mb-1"
                style={{ color: isDark ? '#c9a84c' : '#4A6741', transition: 'color 0.4s' }}
              >
                {stat.num}
              </div>
              <div
                className="font-sans text-[0.6rem] tracking-[0.25em] uppercase"
                style={{ color: isDark ? 'rgba(245,240,232,0.35)' : 'rgba(26,47,35,0.4)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: 'hero-orb-float 3s ease-in-out infinite' }}
      >
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1"
          style={{
            border: `1px solid ${isDark ? 'rgba(201,168,76,0.25)' : 'rgba(74,103,65,0.25)'}`,
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[3px] h-2 rounded-full"
            style={{ background: isDark ? 'rgba(201,168,76,0.5)' : 'rgba(74,103,65,0.5)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
