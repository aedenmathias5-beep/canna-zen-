import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Logo from '../ui/Logo';
import AnimatedSection from '../ui/AnimatedSection';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-14 pb-8 mt-20 relative" style={{ background: 'linear-gradient(135deg, #0d3b2e, #0a2530, #0d2d3a)', color: 'white' }}>
      <button
        onClick={scrollToTop}
        aria-label="Retour en haut"
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 text-white rounded-full flex items-center justify-center shadow-lg btn-vivid"
      >
        <ArrowUp size={18} />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-1">
              <Logo variant="light" className="mb-4" />
              <p className="text-white/60 text-sm font-light leading-relaxed">L'excellence du cannabis légal. Produits CBD premium sélectionnés avec soin.</p>
            </div>
            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] text-teal-400/60 mb-4 uppercase">Navigation</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Accueil', to: '/' },
                  { label: 'Boutique', to: '/boutique' },
                  { label: 'À propos', to: '/a-propos' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="text-sm text-white/60 hover:text-teal-300 hover:translate-x-1 transition-all duration-200 font-light inline-block">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] text-teal-400/60 mb-4 uppercase">Catégories</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Fleurs CBD', cat: 'fleurs-cbd' },
                  { label: 'Fleurs D10', cat: 'fleurs-d10' },
                  { label: 'Fleurs OH+', cat: 'fleurs-oh' },
                  { label: 'Vapes', cat: 'vapes' },
                  { label: 'Huiles CBD', cat: 'huiles-cbd' },
                  { label: 'Gummies D9', cat: 'gummies-d9' },
                ].map(link => (
                  <Link key={link.cat} to={`/boutique?cat=${link.cat}`} className="text-sm text-white/60 hover:text-teal-300 hover:translate-x-1 transition-all duration-200 font-light inline-block">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] text-teal-400/60 mb-4 uppercase">Informations</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'CGV', to: '/cgv' },
                  { label: 'Mentions légales', to: '/mentions-legales' },
                  { label: 'Confidentialité', to: '/politique-de-confidentialite' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="text-sm text-white/60 hover:text-teal-300 hover:translate-x-1 transition-all duration-200 font-light inline-block">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] text-teal-400/60 mb-4 uppercase">Contact</h4>
              <div className="text-sm text-white/60 space-y-1 font-light">
                <p>contact@cannazen.space</p>
                <p>11 rue de Tourraine</p>
                <p>67100 Strasbourg</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-light">© 2026 CannaZen · Cannabis légal · THC &lt; 0.3%</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/30 font-light">Paiement sécurisé</span>
              <div className="flex items-center gap-2">
                {['CB', 'VISA', 'MC', 'Virement'].map(method => (
                  <span key={method} className="bg-white/5 hover:bg-white/10 rounded px-2 py-1 text-[10px] text-white/50 font-medium transition-colors duration-200 cursor-default border border-white/5">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-white/20 font-light text-center mt-4">© CannaZen 2026 · THC &lt; 0.3% · Vente interdite aux mineurs · Produits non médicamenteux</p>
        </div>
      </div>
    </footer>
  );
}
