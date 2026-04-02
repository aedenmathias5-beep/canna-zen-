import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import AuthGuard from '../components/auth/AuthGuard';
import Breadcrumbs from '../components/ui/Breadcrumbs';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  label?: string;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  payment_status?: string;
  shipping_method?: string;
  items: OrderItem[];
}

const getStatusBadge = (status: string) => {
  const statuses: Record<string, { label: string; bg: string; text: string }> = {
    pending: { label: 'En attente', bg: 'bg-[#f5ecd7]/60', text: 'text-[#8b7355]' },
    confirmed: { label: 'Confirmée', bg: 'bg-[#e8efe4]/60', text: 'text-[#6b8f5e]' },
    paid: { label: 'Payée', bg: 'bg-[#e8efe4]/60', text: 'text-[#6b8f5e]' },
    processing: { label: 'En préparation', bg: 'bg-blue-50', text: 'text-blue-600' },
    shipped: { label: 'Expédiée', bg: 'bg-[#f5ecd7]/60', text: 'text-[#8b7355]' },
    delivered: { label: 'Livrée', bg: 'bg-[#e8efe4]/80', text: 'text-[#4a6741]' },
    cancelled: { label: 'Annulée', bg: 'bg-red-50', text: 'text-red-500' },
    awaiting_transfer: { label: 'Virement en attente', bg: 'bg-[#f5ecd7]/60', text: 'text-[#8b7355]' },
    test_mode: { label: 'Confirmée', bg: 'bg-[#e8efe4]/60', text: 'text-[#6b8f5e]' },
  };
  return statuses[status] || statuses.pending;
};

function StatusBadge({ status }: { status: string }) {
  const config = getStatusBadge(status);
  return (
    <span className={`${config.bg} ${config.text} text-xs font-medium px-3 py-1 rounded-full`}>
      {config.label}
    </span>
  );
}

function OrderTimeline({ status }: { status: string }) {
  const steps = [
    { key: 'confirmed', label: 'Commande confirmée' },
    { key: 'processing', label: 'En préparation' },
    { key: 'shipped', label: 'Expédiée' },
    { key: 'delivered', label: 'Livrée' },
  ];

  const statusMap: Record<string, number> = {
    pending: -1,
    confirmed: 0,
    paid: 0,
    test_mode: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
  };
  const currentIndex = statusMap[status] ?? -1;

  return (
    <div className="mt-4 pt-4 border-t border-[#e8efe4]/40">
      <p className="text-[10px] font-medium text-[#7a7267]/60 uppercase tracking-wider mb-3">
        Suivi de commande
      </p>
      <div className="space-y-2.5">
        {steps.map((step, i) => {
          const isDone = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                isDone
                  ? 'bg-[#e8efe4]/60 border-[#6b8f5e]/30 text-[#6b8f5e]'
                  : 'bg-[#f7f3ec] border-[#e8efe4]/40 text-[#7a7267]/40'
              }`}>
                {isDone ? '✓' : (i + 1)}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${
                  isCurrent ? 'font-medium text-[#2c2520]' :
                  isDone ? 'text-[#7a7267]' : 'text-[#7a7267]/40 font-light'
                }`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-xs text-[#6b8f5e] mt-0.5 font-light">Statut actuel</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrdersContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    setLoading(true);
    const allOrders: Order[] = [];

    if (isSupabaseConfigured && supabase && user) {
      try {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data) {
          data.forEach((order: any) => {
            allOrders.push({
              id: order.payment_id || order.id.slice(0, 8).toUpperCase(),
              date: order.created_at,
              total: order.total_amount,
              status: order.status || order.payment_status || 'pending',
              payment_status: order.payment_status,
              shipping_method: order.shipping_method,
              items: order.items || [],
            });
          });
        }
      } catch (err) {
        console.error('Error loading orders from Supabase:', err);
      }
    }

    const localOrders = JSON.parse(localStorage.getItem('cannazen-orders') || '[]');
    const supabaseIds = new Set(allOrders.map(o => o.id));
    localOrders.forEach((order: any) => {
      if (!supabaseIds.has(order.id)) {
        allOrders.push({
          id: order.id,
          date: order.date,
          total: order.total,
          status: order.status || 'confirmed',
          items: (order.items || []).map((item: any) => ({
            name: item.product?.name || item.name || 'Produit',
            price: item.selectedPrice?.amount || item.price || 0,
            quantity: item.quantity || 1,
            label: item.selectedPrice?.label || item.label || '',
            image: item.product?.image || item.image || '',
          })),
        });
      }
    });

    allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setOrders(allOrders);
    setLoading(false);
  };

  const shippingLabel = (method?: string) => {
    if (!method) return '';
    const labels: Record<string, string> = {
      colissimo: 'Colissimo',
      chronopost: 'Chronopost Express',
      relay: 'Point Relais',
    };
    return labels[method] || method;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet><title>Mes commandes — CannaZen</title></Helmet>

      <Breadcrumbs items={[{ label: 'Mon compte', to: '/compte' }, { label: 'Commandes' }]} />

      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-8">Mes commandes</h1>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-[#6b8f5e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#7a7267] font-light">Chargement...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="text-[#e8efe4] mx-auto mb-4" />
          <p className="text-[#7a7267] mb-4 font-light">Aucune commande pour le moment</p>
          <Link to="/boutique" className="text-[#6b8f5e] hover:text-[#4a6741] font-medium">Voir la boutique</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order.id;
            return (
              <div key={order.id} className="bg-white/80 border border-[#e8efe4]/50 rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#2c2520]">{order.id}</span>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={order.status} />
                      {isExpanded ? <ChevronUp size={16} className="text-[#7a7267]" /> : <ChevronDown size={16} className="text-[#7a7267]" />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#7a7267] font-light">
                      {new Date(order.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm font-semibold text-[#2c2520]">{order.total.toFixed(2)}€</p>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-[#e8efe4]/40 px-4 pb-4">
                    {order.shipping_method && (
                      <p className="text-xs text-[#7a7267] font-light mt-3 mb-2">
                        Livraison : {shippingLabel(order.shipping_method)}
                      </p>
                    )}
                    {order.items.length > 0 ? (
                      <div className="space-y-2 mt-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            {item.image && (
                              <div className="w-10 h-10 rounded-lg bg-[#e8efe4]/20 border border-[#e8efe4]/40 overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-[#2c2520] truncate">{item.name}</p>
                              {item.label && <p className="text-xs text-[#7a7267]/60 font-light">{item.label}</p>}
                            </div>
                            <p className="text-xs text-[#7a7267] font-light">x{item.quantity}</p>
                            <p className="text-sm font-medium text-[#2c2520]">{(item.price * item.quantity).toFixed(2)}€</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#7a7267]/60 font-light mt-3">Détails non disponibles</p>
                    )}

                    <OrderTimeline status={order.status} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  return (
    <AuthGuard>
      <OrdersContent />
    </AuthGuard>
  );
}
