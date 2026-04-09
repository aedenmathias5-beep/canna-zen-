interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Logo({ variant = 'light', className = '' }: LogoProps) {
  const textColor = variant === 'dark' ? '#1a2f23' : '#faf8f5';
  const leafPrimary = '#1a2f23';
  const leafSecondary = '#c4956a';

  return (
    <svg
      width="135"
      height="41"
      viewBox="0 0 270 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(4, 10)">
        <path
          d="M20 6C20 6 15 16 10 22C5 28 0 32 0 32C0 32 8 30 14 26C20 22 24 16 26 12C28 16 32 22 38 26C44 30 52 32 52 32C52 32 47 28 42 22C37 16 32 6 32 6C32 6 28 14 26 18C24 14 20 6 20 6Z"
          fill={variant === 'dark' ? leafPrimary : '#2d4a3e'}
          opacity="0.7"
          transform="scale(0.65)"
        />
        <path
          d="M20 6C20 6 15 16 10 22C5 28 0 32 0 32C0 32 8 30 14 26C20 22 24 16 26 12C28 16 32 22 38 26C44 30 52 32 52 32C52 32 47 28 42 22C37 16 32 6 32 6C32 6 28 14 26 18C24 14 20 6 20 6Z"
          fill={leafSecondary}
          opacity="0.45"
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
