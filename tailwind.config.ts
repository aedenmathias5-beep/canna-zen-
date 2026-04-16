import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1A1A2E',
        surface: '#16213E',
        surfaceLight: '#0F3460',
        brand: '#7C3AED',
        brandLight: '#A78BFA',
        accent: '#10B981',
        accentLight: '#34D399',
        neon: '#00FF41',
        danger: '#E94560',
        gold: '#F59E0B',
        cream: '#FFFFFF',
        textPrimary: '#FFFFFF',
        textSecondary: '#B8B8D0',
        textMuted: '#7A7A90',
        border: '#2A2A3E',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        smoke: { '0%': { transform: 'translateY(0) scale(1)', opacity: '0.04' }, '50%': { opacity: '0.06' }, '100%': { transform: 'translateY(-200px) scale(1.5)', opacity: '0' } },
        pulse_glow: { '0%, 100%': { boxShadow: '0 0 20px rgba(16,185,129,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(16,185,129,0.6)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        draw: { to: { strokeDashoffset: '0' } },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        smoke: 'smoke 8s ease-out infinite',
        'pulse-glow': 'pulse_glow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
