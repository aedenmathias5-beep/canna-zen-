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

  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;
  const w = Math.round(135 * scale);
  const h = Math.round(41 * scale);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 270 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(4, 10)">
        <path
          d="M20 6C20 6 15 16 10 22C5 28 0 32 0 32C0 32 8 30 14 26C20 22 24 16 26 12C28 16 32 22 38 26C44 30 52 32 52 32C52 32 47 28 42 22C37 16 32 6 32 6C32 6 28 14 26 18C24 14 20 6 20 6Z"
          fill={leafPrimary}
          opacity="0.8"
          transform="scale(0.65)"
        />
        <path
          d="M20 6C20 6 15 16 10 22C5 28 0 32 0 32C0 32 8 30 14 26C20 22 24 16 26 12C28 16 32 22 38 26C44 30 52 32 52 32C52 32 47 28 42 22C37 16 32 6 32 6C32 6 28 14 26 18C24 14 20 6 20 6Z"
          fill={leafSecondary}
          opacity="0.5"
          transform="translate(3, 5) scale(0.65)"
        />
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
