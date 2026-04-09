import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Retour en haut de page"
      className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e] text-white shadow-lg shadow-[#1a2f23]/15 hover:from-[#2d4a3e] hover:to-[#3d6050] transition-all flex items-center justify-center opacity-90 hover:opacity-100"
    >
      <ArrowUp size={18} />
    </button>
  );
}
