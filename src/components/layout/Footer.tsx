import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import '../../styles/design-system.css';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Boutique', to: '/boutique' },
  { label: 'Quiz CBD', to: '/quiz' },
  { label: 'Coffrets', to: '/coffrets' },
  { label: 'Nos Terroirs', to: '/terroirs' },
  { label: 'Programme fidélité', to: '/loyalty' },
  { label: 'À propos', to: '/a-propos' },
];

const categories = [
  { label: 'Fleurs CBD', to: '/boutique?cat=fleurs-cbd' },
  { label: 'Fleurs D10', to: '/boutique?cat=fleurs-d10' },
  { label: 'Fleurs OH+', to: '/boutique?cat=fleurs-oh' },
  { label: 'Résines D10', to: '/boutique?cat=resines-d10' },
  { label: 'Vapes OH+ & HEC10', to: '/boutique?cat=vapes' },
  { label: 'Huiles CBD BIO', to: '/boutique?cat=huiles-cbd' },
  { label: 'Gummies D9', to: '/boutique?cat=gummies-d9' },
];

const legalLinks = [
  { label: 'CGV', to: '/cgv' },
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Confidentialité', to: '/politique-de-confidentialite' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await supabase.from('subscribers').insert({ email: email.toLowerCase().trim() });
    } catch {}
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0d1a10 0%, #050504 100%)',
      color: 'var(--ivoire)',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      paddingTop: '80px',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '80px',
        }}>
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--or)',
              marginBottom: '16px',
              letterSpacing: '0.05em',
            }}>
              CannaZen
            </div>
            <div className="badge-luxury" style={{ marginBottom: '20px' }}>Nature & Bien-être</div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              color: 'var(--gris-fin)',
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: '28px',
            }}>
              L'excellence du cannabis légal français. Produits CBD premium sélectionnés avec soin pour votre bien-être.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['IG', 'TT', 'TG'].map(soc => (
                <div key={soc} style={{
                  width: '36px', height: '36px',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  color: 'var(--or-pale)',
                  cursor: 'none',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'; }}
                >
                  {soc}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.4)',
              marginBottom: '24px',
            }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'var(--gris-fin)',
                    textDecoration: 'none',
                    fontWeight: 300,
                    transition: 'color 0.3s, paddingLeft 0.3s',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--or)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gris-fin)'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.4)',
              marginBottom: '24px',
            }}>Catégories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'var(--gris-fin)',
                    textDecoration: 'none',
                    fontWeight: 300,
                    transition: 'color 0.3s',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--or)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gris-fin)'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.4)',
              marginBottom: '24px',
            }}>Newsletter</h4>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              color: 'var(--gris-fin)',
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: '20px',
            }}>
              Offres exclusives, nouveautés et conseils du Smokellier.
            </p>
            {subscribed ? (
              <div style={{ color: 'var(--vert-clair)', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
                ✓ Merci, vous êtes inscrit(e) !
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '4px',
                    color: 'var(--ivoire)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    outline: 'none',
                    cursor: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
                  onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; }}
                />
                <button
                  type="submit"
                  className="btn-luxury"
                  style={{ justifyContent: 'center', borderRadius: '4px' }}
                >
                  <span>S'inscrire</span>
                </button>
              </form>
            )}

            <div style={{ marginTop: '28px' }}>
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.4)',
                marginBottom: '12px',
              }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['contact@cannazen.fun', '11 rue de Tourraine', '67100 Strasbourg'].map((line, i) => (
                  <p key={i} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--gris-fin)',
                    fontWeight: 300,
                  }}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(201,168,76,0.08)',
          paddingTop: '32px',
          paddingBottom: '40px',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '16px',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: 'rgba(201,168,76,0.25)',
              letterSpacing: '0.1em',
            }}>
              © 2026 CannaZen · Cannabis légal · THC &lt; 0.3%
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
              {legalLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    color: 'rgba(201,168,76,0.25)',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    cursor: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.6)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.25)'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(201,168,76,0.2)', letterSpacing: '0.1em' }}>Paiement sécurisé</span>
              {['CB', 'VISA', 'MC', 'BTC', 'ETH'].map(m => (
                <span key={m} style={{
                  padding: '3px 8px',
                  border: '1px solid rgba(201,168,76,0.1)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.55rem',
                  color: 'rgba(201,168,76,0.3)',
                  letterSpacing: '0.1em',
                }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            color: 'rgba(201,168,76,0.12)',
            textAlign: 'center' as const,
            letterSpacing: '0.1em',
          }}>
            THC &lt; 0.3% · Vente interdite aux mineurs · Produits non médicamenteux · Consommation responsable
          </p>
        </div>
      </div>
    </footer>
  );
}
