import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Hero } from '../components/sections/Hero';
import { MarqueeBanner } from '../components/sections/MarqueeBanner';
import { CategoryGrid } from '../components/sections/CategoryGrid';
import { FeaturedProducts } from '../components/sections/FeaturedProducts';
import { TrustSection } from '../components/sections/TrustSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import '../styles/design-system.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const { error } = await supabase.from('subscribers').insert({ email: email.toLowerCase().trim() });
      if (error && (error.code === '23505' || error.message?.includes('duplicate'))) {
        toast('Vous êtes déjà inscrit(e) !', { icon: '💌' });
      }
    } catch {}
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div style={{ background: 'var(--noir)' }}>
      <Helmet>
        <title>CannaZen — CBD Premium, Fleurs, Résines, Huiles & Vapes</title>
        <meta name="description" content="Boutique en ligne de CBD premium — Fleurs, résines, huiles et vapes de qualité supérieure. THC < 0.3%, 100% légal en France. Livraison offerte dès 49€." />
        <meta property="og:title" content="CannaZen — CBD Premium" />
        <meta property="og:description" content="Découvrez notre sélection de produits CBD premium. Fleurs, résines, huiles et vapes de qualité supérieure." />
      </Helmet>

      <Hero />

      <MarqueeBanner />

      <FeaturedProducts />

      <CategoryGrid />

      <TrustSection />

      <section style={{
        padding: '96px 40px',
        background: 'var(--noir)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', width: '100%' }}>
          <div className="badge-luxury" style={{ marginBottom: '24px' }}>Découvrez votre CBD idéal</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--ivoire)',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}>
            Quel <span className="text-or">CBD</span> est fait pour vous ?
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'var(--gris-fin)',
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: '40px',
          }}>
            Répondez à 4 questions et découvrez les produits parfaitement adaptés à vos besoins, votre budget et votre niveau d'expérience.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['🧘 Détente', '⚡ Énergie', '🌙 Sommeil', '✨ Euphorie'].map((item, i) => (
              <div key={i} style={{
                padding: '12px 20px',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--gris-fin)',
                letterSpacing: '0.1em',
                background: 'rgba(201,168,76,0.03)',
              }}>{item}</div>
            ))}
          </div>
          <Link to="/quiz" className="btn-luxury" style={{ borderRadius: '4px' }}>
            <span>Faire le quiz</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      <TestimonialsSection />

      <section style={{
        padding: '96px 40px',
        background: 'var(--vert-nuit)',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '24px' }}>📩</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--ivoire)',
            marginBottom: '16px',
          }}>
            Restez dans le <span className="text-or">jardin</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--gris-fin)',
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: '40px',
          }}>
            Nouveautés, offres exclusives et conseils du Smokellier directement dans votre boîte mail. Pas de spam, jamais.
          </p>
          {subscribed ? (
            <div style={{ color: 'var(--vert-clair)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
              ✓ Merci ! Vous êtes inscrit(e).
            </div>
          ) : (
            <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '12px', maxWidth: '440px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '14px 20px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '4px',
                  color: 'var(--ivoire)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)'; }}
                onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'; }}
              />
              <button type="submit" className="btn-luxury" style={{ borderRadius: '4px' }}>
                <span>S'inscrire</span>
              </button>
            </form>
          )}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            color: 'rgba(201,168,76,0.25)',
            letterSpacing: '0.1em',
            marginTop: '20px',
          }}>
            Désabonnement en un clic · Données protégées
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 40px', background: 'var(--noir)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { to: '/coffrets', emoji: '🎁', title: 'Coffrets Surprise', desc: 'Sélections thématiques · Jusqu\'à -30%', accent: 'var(--or)' },
              { to: '/terroirs', emoji: '🗺️', title: 'Nos Terroirs', desc: 'Explorez les régions françaises', accent: 'var(--vert-clair)' },
              { to: '/loyalty', emoji: '💎', title: 'Programme Fidélité', desc: 'Gagnez des points · Récompenses exclusives', accent: 'var(--or-pale)' },
            ].map((card, i) => (
              <Link
                key={i}
                to={card.to}
                style={{
                  display: 'block',
                  padding: '32px',
                  background: 'rgba(26,51,32,0.2)',
                  border: '1px solid rgba(201,168,76,0.1)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{card.emoji}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  color: 'var(--ivoire)',
                  marginBottom: '8px',
                }}>{card.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--gris-fin)',
                  fontWeight: 300,
                  marginBottom: '20px',
                }}>{card.desc}</p>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: card.accent,
                }}>Explorer →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
