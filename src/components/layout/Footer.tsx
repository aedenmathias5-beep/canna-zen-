import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className="border-t mt-20 transition-colors duration-500" style={{
      borderColor: isDark ? 'hsl(150 10% 16%)' : 'hsl(40 15% 88%)',
      background: isDark ? 'rgba(13,26,16,0.5)' : 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(12px)',
    }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-serif text-xl"><span className="text-primary">Canna</span><span className="text-foreground">Zen</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              CBD premium français, cultivé avec passion et respect de la terre.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-primary">Boutique</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/boutique?category=fleurs" className="hover:text-primary transition-colors">Fleurs CBD</Link>
              <Link to="/boutique?category=huiles" className="hover:text-primary transition-colors">Huiles</Link>
              <Link to="/boutique?category=resines" className="hover:text-primary transition-colors">Résines</Link>
              <Link to="/boutique?category=vapes" className="hover:text-primary transition-colors">Vapes</Link>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-primary">Informations</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/a-propos" className="hover:text-primary transition-colors">À propos</Link>
              <Link to="/terroirs" className="hover:text-primary transition-colors">Nos terroirs</Link>
              <Link to="/quiz" className="hover:text-primary transition-colors">Quiz CBD</Link>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-primary">Légal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/cgv" className="hover:text-primary transition-colors">CGV</Link>
              <Link to="/politique-de-confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
              <Link to="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CannaZen — Tous droits réservés. Produits réservés aux +18 ans.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
