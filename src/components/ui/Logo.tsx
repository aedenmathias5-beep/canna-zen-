import { useId } from 'react';
import { useTheme } from '../../lib/ThemeContext';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant, className = '', size = 'md' }: LogoProps) {
  const { theme } = useTheme();
  const effectiveVariant = variant ?? (theme === 'dark' ? 'light' : 'dark');

  const textColor = effectiveVariant === 'dark' ? '#1a2f23' : '#faf8f5';
  const leafPrimary = effectiveVariant === 'dark' ? '#1a2f23' : '#2d4a3e';
  const leafSecondary = '#c4956a';
  const glowColor = effectiveVariant === 'dark' ? 'rgba(74,103,65,0.6)' : 'rgba(201,168,76,0.5)';
  const sparkleColor = effectiveVariant === 'dark' ? '#4A6741' : '#c9a84c';

  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;
  const w = Math.round(135 * scale);
  const h = Math.round(41 * scale);

  const reactId = useId();
  const uniqueId = `logo-${size}-${reactId.replace(/:/g, '')}`;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 270 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={`${uniqueId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor={glowColor} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uniqueId}-sparkle-glow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`${uniqueId}-shimmer`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={leafSecondary} stopOpacity="0">
            <animate attributeName="offset" values="-0.5;1.5" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="15%" stopColor={leafSecondary} stopOpacity="0.7">
            <animate attributeName="offset" values="-0.35;1.65" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="30%" stopColor={leafSecondary} stopOpacity="0">
            <animate attributeName="offset" values="-0.2;1.8" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>

      <g transform="translate(4, 10)" filter={`url(#${uniqueId}-glow)`}>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="4,10; 4,7; 4,10"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
        />

        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-3,17,15; 3,17,15; -3,17,15"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          />

          <path
            d="M20 6C20 6 15 16 10 22C5 28 0 32 0 32C0 32 8 30 14 26C20 22 24 16 26 12C28 16 32 22 38 26C44 30 52 32 52 32C52 32 47 28 42 22C37 16 32 6 32 6C32 6 28 14 26 18C24 14 20 6 20 6Z"
            fill={leafPrimary}
            transform="scale(0.65)"
          >
            <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
          </path>

          <path
            d="M20 6C20 6 15 16 10 22C5 28 0 32 0 32C0 32 8 30 14 26C20 22 24 16 26 12C28 16 32 22 38 26C44 30 52 32 52 32C52 32 47 28 42 22C37 16 32 6 32 6C32 6 28 14 26 18C24 14 20 6 20 6Z"
            fill={leafSecondary}
            transform="translate(3, 5) scale(0.65)"
          >
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite" />
          </path>

          <path
            d="M20 6C20 6 15 16 10 22C5 28 0 32 0 32C0 32 8 30 14 26C20 22 24 16 26 12C28 16 32 22 38 26C44 30 52 32 52 32C52 32 47 28 42 22C37 16 32 6 32 6C32 6 28 14 26 18C24 14 20 6 20 6Z"
            fill={`url(#${uniqueId}-shimmer)`}
            opacity="0.6"
            transform="scale(0.65)"
          />
        </g>

        <g filter={`url(#${uniqueId}-sparkle-glow)`}>
          <circle cx="6" cy="8" r="1.2" fill={sparkleColor}>
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0s" repeatCount="indefinite" />
            <animate attributeName="r" values="0.5;1.5;0.5" dur="2s" begin="0s" repeatCount="indefinite" />
          </circle>
          <circle cx="28" cy="4" r="1" fill={sparkleColor}>
            <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="r" values="0.3;1.2;0.3" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="33" cy="12" r="0.8" fill={sparkleColor}>
            <animate attributeName="opacity" values="0;0.8;0" dur="2.2s" begin="1.2s" repeatCount="indefinite" />
            <animate attributeName="r" values="0.3;1;0.3" dur="2.2s" begin="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="12" cy="20" r="0.9" fill={sparkleColor}>
            <animate attributeName="opacity" values="0;0.9;0" dur="2.4s" begin="0.3s" repeatCount="indefinite" />
            <animate attributeName="r" values="0.4;1.3;0.4" dur="2.4s" begin="0.3s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      <text
        x="46"
        y="44"
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="600"
        fontSize="36"
        letterSpacing="3"
        fill={textColor}
      >
        Canna<tspan fill={leafSecondary} fontStyle="italic">Zen</tspan>
      </text>
    </svg>
  );
}
