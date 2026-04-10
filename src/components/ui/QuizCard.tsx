import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const goals = [
  { value: 'sleep',  label: 'Dormir',       emoji: '🌙' },
  { value: 'relax',  label: 'Me détendre',  emoji: '🍃' },
  { value: 'focus',  label: 'Focus & énergie', emoji: '⚡' },
  { value: 'taste',  label: 'Découvrir',    emoji: '✨' },
];

export function QuizCard() {
  const [selected, setSelected] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/quiz${selected ? `?goal=${selected}` : ''}`);
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'linear-gradient(135deg, rgba(26,47,35,0.03), rgba(196,149,106,0.05))',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={15} className="text-[#c4956a]" />
        <h3 className="font-['Cormorant_Garamond'] text-base font-semibold italic" style={{ color: 'var(--text-primary)' }}>
          Quel CBD pour vous ?
        </h3>
      </div>
      <p className="text-[11px] mb-4" style={{ color: 'var(--text-muted)' }}>
        Répondez en 30 secondes, on s'occupe du reste.
      </p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {goals.map(g => (
          <button
            key={g.value}
            onClick={() => setSelected(g.value)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all duration-200"
            style={{
              background: selected === g.value
                ? 'linear-gradient(135deg, #1a2f23, #2d4a3e)'
                : 'var(--bg-card)',
              color: selected === g.value ? '#e8c49a' : 'var(--text-secondary)',
              border: `1px solid ${selected === g.value ? 'transparent' : 'var(--border-color)'}`,
              transform: selected === g.value ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <span>{g.emoji}</span>
            <span>{g.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
        style={{
          background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)',
          color: '#e8c49a',
        }}
      >
        Trouver mon CBD idéal <ArrowRight size={12} />
      </button>
    </div>
  );
}
