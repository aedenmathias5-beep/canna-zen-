// @ts-nocheck
import { motion } from 'framer-motion';

const breathe = {
  animate: {
    scale: [1, 1.025, 1],
    rotate: [0, 0.8, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const as const },
  },
};

const sway = (delay = 0) => ({
  animate: {
    rotate: [0, 2, -1, 0],
    y: [0, -3, 0],
    transition: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut" as const as const, delay },
  },
});

export function FleursCBDIllustration({ size = 220 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background halo */}
      <motion.ellipse
        cx="110" cy="115"
        rx="70" ry="65"
        fill="rgba(122,184,147,0.06)"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const as const }}
      />

      {/* Main stem */}
      <motion.path
        d="M110 185 C110 185 108 160 110 130 C112 100 110 70 110 50"
        stroke="#7ab893" strokeWidth="2" strokeLinecap="round"
        opacity={0.5}
        {...sway(0)}
      />

      {/* Leaf veins — left large leaf */}
      <motion.g {...sway(0.3)}>
        <path d="M110 100 C90 95 70 85 55 70 C70 68 80 72 88 80 C96 88 104 95 110 100Z"
          fill="rgba(122,184,147,0.35)" stroke="#7ab893" strokeWidth="0.8" opacity={0.8} />
        <path d="M110 100 C90 95 70 85 55 70" stroke="#7ab893" strokeWidth="0.6" opacity={0.4} />
        <path d="M95 92 C82 89 73 84 65 77" stroke="#7ab893" strokeWidth="0.4" opacity={0.35} />
        <path d="M100 97 C87 94 78 89 70 83" stroke="#7ab893" strokeWidth="0.4" opacity={0.3} />
      </motion.g>

      {/* Right large leaf */}
      <motion.g {...sway(0.6)}>
        <path d="M110 100 C130 95 150 85 165 70 C150 68 140 72 132 80 C124 88 116 95 110 100Z"
          fill="rgba(122,184,147,0.3)" stroke="#7ab893" strokeWidth="0.8" opacity={0.7} />
        <path d="M110 100 C130 95 150 85 165 70" stroke="#7ab893" strokeWidth="0.6" opacity={0.4} />
        <path d="M125 92 C138 89 147 84 155 77" stroke="#7ab893" strokeWidth="0.4" opacity={0.3} />
      </motion.g>

      {/* Middle finger leaves */}
      <motion.g {...sway(0.2)}>
        <path d="M110 80 C100 72 88 60 85 44 C93 50 98 58 104 70 C107 75 109 78 110 80Z"
          fill="rgba(122,184,147,0.4)" stroke="#7ab893" strokeWidth="0.8" opacity={0.85} />
        <path d="M110 80 C120 72 132 60 135 44 C127 50 122 58 116 70 C113 75 111 78 110 80Z"
          fill="rgba(122,184,147,0.4)" stroke="#7ab893" strokeWidth="0.8" opacity={0.85} />
      </motion.g>

      {/* Tiny top leaves */}
      <motion.g {...sway(0.8)}>
        <path d="M110 60 C104 52 100 44 100 36 C105 40 107 48 109 56 C109.5 58 110 59 110 60Z"
          fill="rgba(122,184,147,0.5)" stroke="#7ab893" strokeWidth="0.7" />
        <path d="M110 60 C116 52 120 44 120 36 C115 40 113 48 111 56 C110.5 58 110 59 110 60Z"
          fill="rgba(122,184,147,0.5)" stroke="#7ab893" strokeWidth="0.7" />
      </motion.g>

      {/* Lower left leaf */}
      <motion.g {...sway(1.0)}>
        <path d="M110 130 C88 125 68 118 50 105 C66 102 78 107 90 116 C100 123 107 128 110 130Z"
          fill="rgba(122,184,147,0.25)" stroke="#7ab893" strokeWidth="0.7" opacity={0.6} />
      </motion.g>
      <motion.g {...sway(0.9)}>
        <path d="M110 130 C132 125 152 118 170 105 C154 102 142 107 130 116 C120 123 113 128 110 130Z"
          fill="rgba(122,184,147,0.2)" stroke="#7ab893" strokeWidth="0.7" opacity={0.5} />
      </motion.g>

      {/* Trichome crystals */}
      {[
        [78, 68], [88, 58], [98, 76], [122, 58], [132, 68],
        [62, 78], [155, 75], [70, 110], [148, 108],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i} cx={cx} cy={cy} r={1.5}
          fill="#c9d8b8" opacity={0.6}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* Bud cluster at top */}
      <motion.g {...breathe}>
        <ellipse cx="110" cy="52" rx="8" ry="10" fill="rgba(122,184,147,0.5)" stroke="#7ab893" strokeWidth="0.8" />
        <ellipse cx="104" cy="56" rx="5" ry="7" fill="rgba(122,184,147,0.4)" stroke="#7ab893" strokeWidth="0.6" />
        <ellipse cx="116" cy="56" rx="5" ry="7" fill="rgba(122,184,147,0.4)" stroke="#7ab893" strokeWidth="0.6" />
        <circle cx="110" cy="46" r="3" fill="#7ab893" opacity={0.6} />
        <circle cx="105" cy="49" r="2" fill="#7ab893" opacity={0.4} />
        <circle cx="115" cy="49" r="2" fill="#7ab893" opacity={0.4} />
      </motion.g>
    </svg>
  );
}

export function HuilesCBDIllustration({ size = 220 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glow */}
      <motion.ellipse cx="110" cy="130" rx="50" ry="45"
        fill="rgba(184,212,112,0.08)"
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const as const }}
      />

      {/* Dropper bottle */}
      <motion.g {...breathe}>
        {/* Bottle body */}
        <path d="M95 95 C95 90 98 88 105 88 L115 88 C122 88 125 90 125 95 L128 165 C128 170 124 174 118 174 L102 174 C96 174 92 170 92 165 Z"
          fill="rgba(184,212,112,0.12)" stroke="#b8d470" strokeWidth="1.2" />
        {/* Bottle neck */}
        <rect x="103" y="72" width="14" height="18" rx="4"
          fill="rgba(184,212,112,0.15)" stroke="#b8d470" strokeWidth="1" />
        {/* Dropper tip */}
        <path d="M107 62 L110 55 L113 62 L111 72 L109 72 Z"
          fill="#b8d470" opacity={0.7} />
        {/* Cap */}
        <rect x="100" y="68" width="20" height="8" rx="3"
          fill="#b8d470" opacity={0.5} />

        {/* Oil inside */}
        <path d="M97 140 C97 140 96 120 96 110 L110 108 L124 110 C124 110 124 130 124 145 L110 147 Z"
          fill="rgba(184,212,112,0.25)" />

        {/* Leaf inside bottle */}
        <path d="M105 130 C102 122 103 112 110 108 C117 112 118 122 115 130 C113 134 107 134 105 130Z"
          fill="rgba(184,212,112,0.4)" stroke="#b8d470" strokeWidth="0.6" opacity={0.7} />
        <line x1="110" y1="108" x2="110" y2="132"
          stroke="#b8d470" strokeWidth="0.5" opacity={0.5} />
      </motion.g>

      {/* Drops falling */}
      {[
        { cx: 110, cy: 185, r: 5, delay: 0 },
        { cx: 105, cy: 196, r: 3.5, delay: 0.5 },
        { cx: 113, cy: 198, r: 2.5, delay: 1 },
      ].map((d, i) => (
        <motion.ellipse key={i} cx={d.cx} cy={d.cy} rx={d.r} ry={d.r * 1.3}
          fill="rgba(184,212,112,0.45)" stroke="#b8d470" strokeWidth="0.5"
          animate={{ y: [0, 4, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: d.delay }}
        />
      ))}

      {/* Floating leaf particles */}
      {[
        [75, 100], [145, 115], [68, 140], [152, 150],
      ].map(([cx, cy], i) => (
        <motion.g key={i}
          animate={{ rotate: [0, 15, 0], y: [0, -5, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <path d={`M${cx} ${cy} C${cx - 8} ${cy - 6} ${cx - 8} ${cy + 6} ${cx} ${cy}Z`}
            fill="#b8d470" opacity={0.4} />
          <path d={`M${cx} ${cy} C${cx + 8} ${cy - 6} ${cx + 8} ${cy + 6} ${cx} ${cy}Z`}
            fill="#b8d470" opacity={0.3} />
        </motion.g>
      ))}
    </svg>
  );
}

export function ResinesIllustration({ size = 220 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.g {...breathe}>
        {/* Crystal base - large */}
        <path d="M110 50 L148 85 L140 155 L80 155 L72 85 Z"
          fill="rgba(232,213,160,0.12)" stroke="#e8d5a0" strokeWidth="1" />
        {/* Crystal faces */}
        <path d="M110 50 L148 85 L110 100 Z" fill="rgba(232,213,160,0.2)" />
        <path d="M110 50 L72 85 L110 100 Z" fill="rgba(232,213,160,0.15)" />
        <path d="M110 100 L148 85 L140 155 Z" fill="rgba(232,213,160,0.1)" />
        <path d="M110 100 L72 85 L80 155 Z" fill="rgba(232,213,160,0.08)" />
        <path d="M110 100 L140 155 L80 155 Z" fill="rgba(232,213,160,0.18)" />

        {/* Smaller crystal left */}
        <path d="M72 85 L85 72 L92 95 Z"
          fill="rgba(232,213,160,0.15)" stroke="#e8d5a0" strokeWidth="0.6" />
        {/* Smaller crystal right */}
        <path d="M148 85 L135 72 L128 95 Z"
          fill="rgba(232,213,160,0.12)" stroke="#e8d5a0" strokeWidth="0.6" />

        {/* Resin drop at bottom */}
        <path d="M110 155 C104 165 104 175 110 178 C116 175 116 165 110 155Z"
          fill="rgba(232,213,160,0.5)" stroke="#e8d5a0" strokeWidth="0.8" />
      </motion.g>

      {/* Pollen/spore particles */}
      {[
        [85, 70], [135, 65], [60, 110], [160, 105], [90, 165], [130, 170],
        [75, 145], [148, 140],
      ].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 2 : 1.5}
          fill="#e8d5a0" opacity={0.5}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Refraction lines */}
      {[
        [110, 50, 90, 25], [110, 50, 130, 28], [110, 50, 110, 22],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#e8d5a0" strokeWidth="0.8" strokeLinecap="round"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}
    </svg>
  );
}

export function VapesIllustration({ size = 220 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Device */}
      <motion.g {...breathe}>
        <rect x="97" y="90" width="26" height="90" rx="10"
          fill="rgba(122,184,147,0.12)" stroke="#7ab893" strokeWidth="1.2" />
        <rect x="100" y="80" width="20" height="14" rx="5"
          fill="rgba(122,184,147,0.2)" stroke="#7ab893" strokeWidth="1" />
        <rect x="103" y="76" width="14" height="6" rx="3"
          fill="rgba(122,184,147,0.4)" stroke="#7ab893" strokeWidth="0.8" />
        {/* Mouthpiece */}
        <path d="M105 76 L108 62 L112 62 L115 76"
          fill="rgba(122,184,147,0.3)" stroke="#7ab893" strokeWidth="0.8" />
        {/* Window */}
        <rect x="103" y="110" width="14" height="30" rx="4"
          fill="rgba(122,184,147,0.15)" stroke="#7ab893" strokeWidth="0.6" />
        {/* Oil level */}
        <rect x="103" y="118" width="14" height="22" rx="3"
          fill="rgba(122,184,147,0.3)" />
        {/* Button */}
        <circle cx="110" cy="155" r="4" fill="rgba(122,184,147,0.5)" stroke="#7ab893" strokeWidth="0.8" />
      </motion.g>

      {/* Vapor clouds — leaf-shaped */}
      {[
        { cx: 85, cy: 52, scale: 1.2, delay: 0 },
        { cx: 95, cy: 38, scale: 0.9, delay: 0.5 },
        { cx: 110, cy: 30, scale: 1, delay: 1 },
        { cx: 125, cy: 42, scale: 0.8, delay: 1.5 },
        { cx: 72, cy: 42, scale: 0.7, delay: 0.3 },
      ].map((v, i) => (
        <motion.g key={i}
          animate={{ y: [-5, -18, -5], opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: v.delay, ease: "easeInOut" as const as const }}
          style={{ transformOrigin: `${v.cx}px ${v.cy}px` }}
        >
          <ellipse cx={v.cx} cy={v.cy} rx={10 * v.scale} ry={7 * v.scale}
            fill="rgba(122,184,147,0.2)" />
          <ellipse cx={v.cx - 6 * v.scale} cy={v.cy + 2 * v.scale}
            rx={7 * v.scale} ry={5 * v.scale}
            fill="rgba(122,184,147,0.15)" />
          <ellipse cx={v.cx + 6 * v.scale} cy={v.cy + 3 * v.scale}
            rx={6 * v.scale} ry={4 * v.scale}
            fill="rgba(122,184,147,0.12)" />
        </motion.g>
      ))}

      {/* Botanical vine decoration */}
      <motion.path
        d="M75 180 C70 160 75 140 80 130 C85 120 82 110 78 100"
        stroke="#7ab893" strokeWidth="0.8" strokeLinecap="round" opacity={0.25}
        {...sway(0.5)}
      />
      <motion.path
        d="M145 180 C150 160 145 140 140 130 C135 120 138 110 142 100"
        stroke="#7ab893" strokeWidth="0.8" strokeLinecap="round" opacity={0.2}
        {...sway(1)}
      />
      {[
        [75, 150, -15], [80, 135, 10], [78, 118, -20],
        [145, 152, 15], [140, 138, -12],
      ].map(([cx, cy, rotate], i) => (
        <motion.g key={i}
          style={{ transformOrigin: `${cx}px ${cy}px`, rotate: `${rotate}deg` }}
          animate={{ rotate: [`${rotate}deg`, `${rotate + 8}deg`, `${rotate}deg`] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" as const as const }}
        >
          <ellipse cx={cx} cy={cy} rx={8} ry={5} fill="rgba(122,184,147,0.2)" />
        </motion.g>
      ))}
    </svg>
  );
}

export function GummiesIllustration({ size = 220 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glow */}
      <motion.ellipse cx="110" cy="130" rx="65" ry="55"
        fill="rgba(212,122,184,0.06)"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Gummy bear — stylized botanical version */}
      <motion.g animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const as const }}
        style={{ transformOrigin: '100px 130px' }}>
        {/* Body */}
        <ellipse cx="100" cy="135" rx="22" ry="28"
          fill="rgba(212,122,184,0.25)" stroke="#d47ab8" strokeWidth="1" />
        {/* Head */}
        <circle cx="100" cy="105" r="18"
          fill="rgba(212,122,184,0.3)" stroke="#d47ab8" strokeWidth="1" />
        {/* Ears */}
        <circle cx="88" cy="91" r="8" fill="rgba(212,122,184,0.25)" stroke="#d47ab8" strokeWidth="0.8" />
        <circle cx="112" cy="91" r="8" fill="rgba(212,122,184,0.25)" stroke="#d47ab8" strokeWidth="0.8" />
        {/* Arms */}
        <path d="M78 125 C68 118 62 112 64 106" stroke="#d47ab8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M122 125 C132 118 138 112 136 106" stroke="#d47ab8" strokeWidth="1.5" strokeLinecap="round" />
        {/* Flower detail on body */}
        <circle cx="100" cy="130" r="5" fill="rgba(212,122,184,0.4)" stroke="#d47ab8" strokeWidth="0.5" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return <circle key={i} cx={100 + Math.cos(rad) * 8} cy={130 + Math.sin(rad) * 8} r={3} fill="rgba(212,122,184,0.3)" />;
        })}
        {/* Eyes */}
        <circle cx="95" cy="103" r="2.5" fill="#d47ab8" opacity={0.6} />
        <circle cx="105" cy="103" r="2.5" fill="#d47ab8" opacity={0.6} />
      </motion.g>

      {/* Second gummy — different pose */}
      <motion.g animate={{ rotate: [2, -2, 2], y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const as const, delay: 0.5 }}
        style={{ transformOrigin: '142px 145px' }}>
        <ellipse cx="142" cy="155" rx="16" ry="20"
          fill="rgba(212,122,184,0.2)" stroke="#d47ab8" strokeWidth="0.8" />
        <circle cx="142" cy="130" r="13"
          fill="rgba(212,122,184,0.22)" stroke="#d47ab8" strokeWidth="0.8" />
        <circle cx="134" cy="120" r="6" fill="rgba(212,122,184,0.18)" stroke="#d47ab8" strokeWidth="0.6" />
        <circle cx="150" cy="120" r="6" fill="rgba(212,122,184,0.18)" stroke="#d47ab8" strokeWidth="0.6" />
      </motion.g>

      {/* Floating botanical elements */}
      {[
        { cx: 60, cy: 110, color: '#d47ab8' },
        { cx: 168, cy: 115, color: '#e8b8d8' },
        { cx: 55, cy: 165, color: '#d47ab8' },
        { cx: 172, cy: 158, color: '#e8a8d0' },
      ].map((f, i) => (
        <motion.g key={i}
          animate={{ rotate: [0, 360], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
          style={{ transformOrigin: `${f.cx}px ${f.cy}px` }}
        >
          {[0, 72, 144, 216, 288].map((angle, j) => {
            const rad = (angle * Math.PI) / 180;
            return <ellipse key={j}
              cx={f.cx + Math.cos(rad) * 6} cy={f.cy + Math.sin(rad) * 6}
              rx={3} ry={5}
              fill={f.color} opacity={0.3}
              transform={`rotate(${angle}, ${f.cx + Math.cos(rad) * 6}, ${f.cy + Math.sin(rad) * 6})`}
            />;
          })}
          <circle cx={f.cx} cy={f.cy} r={3} fill={f.color} opacity={0.5} />
        </motion.g>
      ))}
    </svg>
  );
}

export function FleursD10Illustration({ size = 220 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sunflower-like bloom */}
      <motion.g
        animate={{ rotate: [0, 3, -2, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const as const }}
        style={{ transformOrigin: '110px 110px' }}
      >
        {/* Petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const cx = 110 + Math.cos(angle) * 52;
          const cy = 110 + Math.sin(angle) * 52;
          return (
            <ellipse key={i} cx={cx} cy={cy} rx={10} ry={18}
              fill={`rgba(201,168,76,${i % 2 === 0 ? 0.35 : 0.2})`}
              stroke="#c9a84c" strokeWidth="0.6"
              transform={`rotate(${i * 30 + 90}, ${cx}, ${cy})`}
              opacity={0.8}
            />
          );
        })}

        {/* Inner ring */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 110 + Math.cos(angle) * 28;
          const cy = 110 + Math.sin(angle) * 28;
          return (
            <ellipse key={i} cx={cx} cy={cy} rx={6} ry={11}
              fill={`rgba(201,168,76,0.4)`}
              transform={`rotate(${i * 45 + 90}, ${cx}, ${cy})`}
            />
          );
        })}

        {/* Center */}
        <circle cx="110" cy="110" r="22" fill="rgba(201,168,76,0.3)" stroke="#c9a84c" strokeWidth="1" />
        <circle cx="110" cy="110" r="14" fill="rgba(201,168,76,0.4)" />
        <circle cx="110" cy="110" r="7" fill="rgba(201,168,76,0.6)" />

        {/* Center texture dots */}
        {[
          [106, 106], [110, 104], [114, 106], [112, 110],
          [108, 110], [106, 114], [110, 115], [114, 113],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={1.2} fill="#a0782a" opacity={0.4} />
        ))}
      </motion.g>

      {/* Stem */}
      <path d="M110 165 C108 175 110 185 110 195" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity={0.4} />

      {/* Pollen particles */}
      {[
        [75, 75], [145, 80], [62, 115], [158, 118], [80, 155], [140, 152],
        [70, 140], [152, 138],
      ].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r={1.5}
          fill="#e8c84c" opacity={0.5}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -6, 0] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </svg>
  );
}

export function FleursOHIllustration({ size = 220 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lotus-inspired flower */}
      <motion.g
        animate={{ scale: [1, 1.02, 1], rotate: [0, 1, -1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const as const }}
        style={{ transformOrigin: '110px 120px' }}
      >
        {/* Outer petals */}
        {[
          [110, 60], [145, 78], [155, 115], [138, 150], [82, 150], [65, 115], [75, 78],
        ].map(([cx, cy], i) => (
          <path key={i}
            d={`M110 120 C${cx - 15} ${cy + 10} ${cx + 15} ${cy + 10} 110 120`}
            fill={`rgba(138,180,212,${i % 2 === 0 ? 0.3 : 0.2})`}
            stroke="#8ab4d4" strokeWidth="0.7" opacity={0.8}
          />
        ))}

        {/* Mid petals */}
        {[
          [110, 75], [140, 98], [130, 140], [90, 140], [80, 98],
        ].map(([cx, cy], i) => (
          <path key={i}
            d={`M110 120 C${cx - 12} ${cy + 8} ${cx + 12} ${cy + 8} 110 120`}
            fill={`rgba(138,180,212,0.35)`}
            stroke="#8ab4d4" strokeWidth="0.8"
          />
        ))}

        {/* Inner petals */}
        {[
          [110, 88], [132, 108], [122, 138], [98, 138], [88, 108],
        ].map(([cx, cy], i) => (
          <path key={i}
            d={`M110 120 C${cx - 10} ${cy + 6} ${cx + 10} ${cy + 6} 110 120`}
            fill="rgba(138,180,212,0.45)"
            stroke="#8ab4d4" strokeWidth="0.9"
          />
        ))}

        {/* Center circle */}
        <circle cx="110" cy="120" r="14" fill="rgba(138,180,212,0.4)" stroke="#8ab4d4" strokeWidth="1.2" />
        <circle cx="110" cy="120" r="7" fill="rgba(138,180,212,0.6)" />
        <circle cx="110" cy="120" r="3" fill="#8ab4d4" opacity={0.8} />
      </motion.g>

      {/* Mandala rings */}
      {[40, 58, 76].map((r, i) => (
        <motion.circle key={i} cx="110" cy="120" r={r}
          stroke="#8ab4d4" strokeWidth="0.4" fill="none"
          opacity={0.15 - i * 0.04}
          strokeDasharray={i === 1 ? "4 8" : "none"}
          animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
          transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Floating droplets */}
      {[
        [72, 72], [150, 68], [60, 148], [162, 142],
      ].map(([cx, cy], i) => (
        <motion.g key={i}
          animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
        >
          <path d={`M${cx} ${cy} C${cx - 5} ${cy - 8} ${cx + 5} ${cy - 8} ${cx} ${cy - 14}`}
            fill="rgba(138,180,212,0.35)" stroke="#8ab4d4" strokeWidth="0.5" />
        </motion.g>
      ))}
    </svg>
  );
}
