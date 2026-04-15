import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center fade-in-up">
      <Helmet>
        <title>Page introuvable — CannaZen</title>
      </Helmet>
      <div className="text-7xl mb-6">🌿</div>
      <h1 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[var(--text-primary)] italic mb-3">
        Page introuvable
      </h1>
      <p className="text-[var(--text-secondary)] mb-8 font-light leading-relaxed">
        Cette page n'existe pas ou a été déplacée. Pas d'inquiétude, notre jardin vous attend.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e] hover:from-[#2d4a3e] hover:to-[#3d6050] text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md shadow-[#1a2f23]/15"
        >
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
        <Link
          to="/boutique"
          className="inline-flex items-center justify-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)]/50 text-[var(--text-primary)] px-6 py-3 rounded-xl font-semibold hover:border-[#6b8f5e]/30 transition-colors"
        >
          Voir la boutique
        </Link>
      </div>
    </div>
  );
}
