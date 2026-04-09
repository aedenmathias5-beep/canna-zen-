import { useState, useEffect } from 'react';
import { Leaf, ShieldCheck, Droplets } from 'lucide-react';

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('cannazen-age-verified');
    if (!verified) setShow(true);
  }, []);

  if (!show) return null;

  const handleYes = () => {
    localStorage.setItem('cannazen-age-verified', 'true');
    setShow(false);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(26,47,35,0.6)', backdropFilter: 'blur(20px)' }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#c4956a]/8 rounded-full blur-[120px] orb-1" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#1a2f23]/10 rounded-full blur-[120px] orb-2" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#c9a96e]/6 rounded-full blur-[100px] orb-3" />
      </div>

      <div className="relative rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl fade-in-up" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c4956a]/30 to-transparent" />
        </div>
        <div className="relative z-10">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-breathe" style={{ background: 'linear-gradient(135deg, rgba(26,47,35,0.08), rgba(196,149,106,0.08))' }}>
            <Leaf size={32} className="text-[#1a2f23] dark:text-[#c4956a]" />
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl italic mb-3" style={{ color: 'var(--text-primary)' }}>Bienvenue au jardin</h2>
          <p className="mb-8 text-sm leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
            L'accès à notre collection est réservé aux <span className="text-[#c4956a] font-medium">personnes majeures</span>. Confirmez votre âge pour découvrir l'univers de Mary Jane.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleNo}
              className="w-full py-3.5 px-6 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-[#1a2f23]/5"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              J'ai moins de 18 ans
            </button>
            <button
              onClick={handleYes}
              className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-300 btn-vivid neon-glow"
            >
              Oui, j'ai +18 ans
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-light italic" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#1a2f23] dark:text-[#c4956a]" /> THC &lt; 0.3%</span>
            <span className="flex items-center gap-1"><Droplets size={12} className="text-[#c4956a]" /> Cannabis légal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
