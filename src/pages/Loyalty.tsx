// @ts-nocheck
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Star, Gift, ArrowRight, TrendingUp, ShoppingBag } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AuthGuard from '../components/auth/AuthGuard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { LoyaltyWidget } from '../components/ui/LoyaltyWidget';
import { getTierFromPoints, getTierConfig, TIERS, getPointsToNextTier } from '../lib/loyalty-engine';

function LoyaltyContent() {
  const { user, profile } = useAuth();
  const [points, setPoints] = useState<number>(profile?.stats?.loyaltyPoints ?? 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadPoints() {
      try {
        const { data } = await supabase
          .from('loyalty_points')
          .select('points')
          .eq('user_id', user!.id)
          .maybeSingle();

        if (data) {
          setPoints(Number(data.points));
        } else {
          setPoints(profile?.stats?.loyaltyPoints ?? 0);
        }
      } catch {
        setPoints(profile?.stats?.loyaltyPoints ?? 0);
      } finally {
        setLoading(false);
      }
    }

    loadPoints();
  }, [user, profile]);

  const tier = getTierFromPoints(points);
  const config = getTierConfig(tier);
  const toNext = getPointsToNextTier(points);

  const perks: Record<string, string[]> = {
    bronze:   ['1 point par euro dépensé', 'Accès aux offres membres', 'Newsletter exclusive'],
    silver:   ['1.5 points par euro dépensé', 'Livraison offerte dès 39€', 'Accès anticipé aux nouveautés'],
    gold:     ['2 points par euro dépensé', 'Livraison offerte dès 29€', 'Coffret surprise anniversaire'],
    platinum: ['3 points par euro dépensé', 'Livraison offerte sans minimum', 'Conseiller dédié', 'Produits en avant-première'],
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Programme fidélité — CannaZen</title>
        <meta name="description" content="Gagnez des points à chaque achat et débloquez des avantages exclusifs avec le programme fidélité CannaZen." />
      </Helmet>

      <Breadcrumbs items={[{ label: 'Mon compte', to: '/compte' }, { label: 'Fidélité' }]} />

      <div className="mb-2">
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: '#c4956a' }}>Programme</span>
        <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold italic" style={{ color: 'var(--text-primary)' }}>
          Fidélité CannaZen
        </h1>
      </div>
      <p className="text-sm font-light mb-8" style={{ color: 'var(--text-secondary)' }}>
        Gagnez des points à chaque achat, montez en niveau et débloquez des avantages exclusifs.
      </p>

      {!loading && (
        <div className="mb-6">
          <LoyaltyWidget points={points} />
        </div>
      )}

      <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <h2 className="font-['Cormorant_Garamond'] text-lg font-semibold italic mb-1" style={{ color: 'var(--text-primary)' }}>
          Avantages {config.emoji} {config.label}
        </h2>
        <ul className="space-y-2 mt-3">
          {perks[tier].map((perk, i) => (
            <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Star size={12} className="shrink-0 fill-[#c4956a] text-[#c4956a]" />
              {perk}
            </li>
          ))}
        </ul>
        {toNext !== null && (
          <p className="text-xs mt-4 pt-3 border-t" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}>
            Plus que <strong style={{ color: '#c4956a' }}>{toNext} points</strong> pour passer au niveau suivant.
          </p>
        )}
      </div>

      <div className="rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid var(--border-color)' }}>
        <div className="px-5 py-3" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="font-['Cormorant_Garamond'] text-lg font-semibold italic" style={{ color: 'var(--text-primary)' }}>
            Tous les niveaux
          </h2>
        </div>
        <div className="divide-y" style={{ divideColor: 'var(--border-color)' }}>
          {TIERS.map(t => {
            const isCurrent = t.tier === tier;
            return (
              <div
                key={t.tier}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors"
                style={{
                  background: isCurrent ? 'rgba(196,149,106,0.04)' : 'transparent',
                }}
              >
                <span className="text-xl shrink-0">{t.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold" style={{ color: isCurrent ? t.color : 'var(--text-primary)' }}>
                      {t.label}
                    </p>
                    {isCurrent && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(196,149,106,0.12)', color: '#c4956a' }}>
                        VOTRE NIVEAU
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-light" style={{ color: 'var(--text-muted)' }}>
                    À partir de {t.minPoints.toLocaleString('fr-FR')} points · ×{t.multiplier} par euro
                  </p>
                </div>
                <TrendingUp size={14} style={{ color: isCurrent ? t.color : 'var(--text-muted)' }} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <Link
          to="/boutique"
          className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)', color: '#e8c49a' }}
        >
          <ShoppingBag size={18} />
          <span className="text-sm font-medium">Acheter</span>
          <ArrowRight size={14} className="ml-auto" />
        </Link>
        <Link
          to="/compte"
          className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
        >
          <Gift size={18} className="text-[#c4956a]" />
          <span className="text-sm font-medium">Mon compte</span>
          <ArrowRight size={14} className="ml-auto" style={{ color: 'var(--text-muted)' }} />
        </Link>
      </div>
    </div>
  );
}

export default function Loyalty() {
  return (
    <AuthGuard>
      <LoyaltyContent />
    </AuthGuard>
  );
}
