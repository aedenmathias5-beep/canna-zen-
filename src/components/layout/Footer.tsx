import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Logo from '../ui/Logo';
import AnimatedSection from '../ui/AnimatedSection';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-8 mt-20 relative" style={{ background: 'linear-gradient(160deg, #1a2f23, #162a1f, #111f18)', color: 'white' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4956a]/20 to-transparent" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#c4956a]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#2d4a3e]/20 rounded-full blur-[100px]" />
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Retour en haut"
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 hover:-translate-y-1"
        style={{ background: 'linear-gradient(135deg, #c4956a, #d4a574)' }}
      >
        <ArrowUp size={18} />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
            <div className="lg:col-span-1">
              <Logo variant="light" className="mb-4" />
              <p className="text-white/40 text-sm font-light leading-relaxed">L'excellence du cannabis légal. Produits CBD premium sélectionnés avec soin.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.3em] text-[#c4956a]/50 mb-5 uppercase">Navigation</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Accueil', to: '/' },
                  { label: 'Boutique', to: '/boutique' },
                  { label: 'À propos', to: '/a-propos' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="text-sm text-white/40 hover:text-[#c4956a] hover:translate-x-1 transition-all duration-300 font-light inline-block">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.3em] text-[#c4956a]/50 mb-5 uppercase">Catégories</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Fleurs CBD', cat: 'fleurs-cbd' },
                  { label: 'Fleurs D10', cat: 'fleurs-d10' },
                  { label: 'Fleurs OH+', cat: 'fleurs-oh' },
                  { label: 'Vapes', cat: 'vapes' },
                  { label: 'Huiles CBD', cat: 'huiles-cbd' },
                  { label: 'Gummies D9', cat: 'gummies-d9' },
                ].map(link => (
                  <Link key={link.cat} to={`/boutique?cat=${link.cat}`} className="text-sm text-white/40 hover:text-[#c4956a] hover:translate-x-1 transition-all duration-300 font-light inline-block">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.3em] text-[#c4956a]/50 mb-5 uppercase">Informations</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'CGV', to: '/cgv' },
                  { label: 'Mentions légales', to: '/mentions-legales' },
                  { label: 'Confidentialité', to: '/politique-de-confidentialite' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="text-sm text-white/40 hover:text-[#c4956a] hover:translate-x-1 transition-all duration-300 font-light inline-block">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.3em] text-[#c4956a]/50 mb-5 uppercase">Contact</h4>
              <div className="text-sm text-white/40 space-y-1.5 font-light">
                <p>contact@cannazen.space</p>
                <p>11 rue de Tourraine</p>
                <p>67100 Strasbourg</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="border-t border-white/8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-white/20 font-light tracking-wider">© 2026 CannaZen · Cannabis légal · THC &lt; 0.3%</p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/20 font-light">Paiement sécurisé</span>
              <div className="flex items-center gap-2">
                {['CB', 'VISA', 'MC', 'Virement'].map(method => (
                  <span key={method} className="bg-white/5 hover:bg-white/8 rounded px-2.5 py-1 text-[10px] text-white/30 font-medium transition-colors duration-300 cursor-default border border-white/5">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[9px] text-white/12 font-light text-center mt-5 tracking-wider">© CannaZen 2026 · THC &lt; 0.3% · Vente interdite aux mineurs · Produits non médicamenteux</p>
        </div>
      </div>
    </footer>
  );
}
