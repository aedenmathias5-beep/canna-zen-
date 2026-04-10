import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../lib/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut, Package, Heart, Shield, Mail, Star, ChevronRight } from 'lucide-react';
import { useAuthActions } from '../hooks/useAuthActions';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import AuthGuard from '../components/auth/AuthGuard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { LoyaltyWidget } from '../components/ui/LoyaltyWidget';

const STATUS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: 'En attente', bg: 'bg-[#f5ecd7]/60', text: 'text-[#8b7355]' },
  paid: { label: 'Payée', bg: 'bg-[var(--border-color)]/60', text: 'text-[#c4956a]' },
  shipped: { label: 'Expédiée', bg: 'bg-[var(--border-color)]/60', text: 'text-[#c4956a]' },
  delivered: { label: 'Livrée', bg: 'bg-[var(--border-color)]/80', text: 'text-[#4a6741]' },
  awaiting_transfer: { label: 'Virement en attente', bg: 'bg-[#f5ecd7]/60', text: 'text-[#8b7355]' },
};

function AccountContent() {
  const { user, profile } = useAuth();
  const { signOut } = useAuthActions();
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const loadRecentOrders = async () => {
      const allOrders: any[] = [];

      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(3);
          if (data) {
            data.forEach((o: any) => allOrders.push({
              id: o.payment_id || o.id.slice(0, 8).toUpperCase(),
              date: o.created_at,
              total: o.total_amount,
              status: o.payment_status || o.status,
            }));
          }
        } catch {}
      }

      if (allOrders.length === 0) {
        const local = JSON.parse(localStorage.getItem('cannazen-orders') || '[]');
        local.slice(-3).reverse().forEach((o: any) => allOrders.push({
          id: o.id,
          date: o.date,
          total: o.total,
          status: 'pending',
        }));
      }

      setRecentOrders(allOrders);
    };
    loadRecentOrders();
  }, [user]);

  const menuItems = [
    { to: '/compte/commandes', icon: Package, label: 'Mes commandes', desc: 'Suivez vos commandes en cours et passées' },
    { to: '/wishlist', icon: Heart, label: 'Mes favoris', desc: 'Retrouvez vos produits préférés' },
    { to: '/loyalty', icon: Star, label: 'Programme fidélité', desc: 'Vos points et avantages exclusifs' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet><title>Mon compte — CannaZen</title></Helmet>

      <Breadcrumbs items={[{ label: 'Mon compte' }]} />

      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[var(--text-primary)] italic mb-8">Mon compte</h1>

      <div className="bg-white/80 border border-[var(--border-color)]/50 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          {profile?.photoURL ? (
            <img src={profile.photoURL} alt={`Photo de ${profile.displayName || 'profil'}`} className="w-16 h-16 rounded-full border-2 border-[var(--border-color)]" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[var(--border-color)]/50 flex items-center justify-center text-[#c4956a] text-xl font-semibold">
              {(profile?.displayName || user?.email || '?')[0].toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h2 className="font-semibold text-lg text-[var(--text-primary)]">{profile?.displayName || 'Utilisateur'}</h2>
            <p className="text-sm text-[var(--text-secondary)] font-light flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" /> {user?.email}
            </p>
            {profile?.provider && (
              <p className="text-xs text-[var(--text-secondary)]/60 mt-1 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Connecté via {profile.provider === 'google' ? 'Google' : 'Email'}
              </p>
            )}
          </div>
        </div>

        {profile?.stats && (profile.stats.totalOrders > 0 || profile.stats.loyaltyPoints > 0) && (
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[var(--border-color)]/50">
            <div className="text-center">
              <p className="text-lg font-semibold text-[var(--text-primary)]">{profile.stats.totalOrders}</p>
              <p className="text-xs text-[var(--text-secondary)] font-light">Commandes</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-[var(--text-primary)]">{profile.stats.totalSpent.toFixed(0)} €</p>
              <p className="text-xs text-[var(--text-secondary)] font-light">Dépensé</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-[#c4956a] flex items-center justify-center gap-1">
                <Star className="h-4 w-4" /> {profile.stats.loyaltyPoints}
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-light">Points</p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <LoyaltyWidget points={profile?.stats?.loyaltyPoints ?? 0} />
      </div>

      <div className="space-y-3 mb-6">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-4 bg-white/80 border border-[var(--border-color)]/50 rounded-xl p-4 hover:border-[#6b8f5e]/30 transition-colors shadow-sm group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--border-color)]/30 text-[#c4956a] group-hover:bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e]/10 transition-colors">
              <item.icon size={20} />
            </div>
            <div>
              <span className="text-[var(--text-primary)] font-medium">{item.label}</span>
              <p className="text-xs text-[var(--text-secondary)] font-light">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {recentOrders.length > 0 && (
        <div className="bg-white/80 border border-[var(--border-color)]/50 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--text-primary)]">Commandes récentes</h3>
            <Link to="/compte/commandes" className="text-xs text-[#c4956a] hover:text-[#4a6741] font-medium flex items-center gap-0.5">
              Tout voir <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const cfg = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
              return (
                <Link
                  key={order.id}
                  to="/compte/commandes"
                  className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)]/30 hover:border-[#6b8f5e]/20 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{order.id}</p>
                    <p className="text-xs text-[var(--text-secondary)] font-light">
                      {new Date(order.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`${cfg.bg} ${cfg.text} text-xs font-medium px-2.5 py-0.5 rounded-full`}>{cfg.label}</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{order.total.toFixed(2)}€</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={signOut}
        className="flex items-center gap-3 w-full bg-white/80 border border-[var(--border-color)]/50 rounded-xl p-4 text-red-500 hover:border-red-200 hover:bg-red-50/50 transition-colors shadow-sm"
      >
        <LogOut size={20} />
        <span>Déconnexion</span>
      </button>
    </div>
  );
}

export default function Account() {
  return (
    <AuthGuard>
      <AccountContent />
    </AuthGuard>
  );
}
