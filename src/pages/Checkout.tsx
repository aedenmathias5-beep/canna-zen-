// @ts-nocheck
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { createPayment } from '../services/mollieService';
import { AlertTriangle, Package, Lock, Mail, CreditCard, Smartphone, Bitcoin, Landmark } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';

type PaymentMethod = 'card' | 'applepay' | 'crypto' | 'transfer';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<'colissimo' | 'chronopost' | 'relay'>('colissimo');
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: profile?.displayName?.split(' ')[0] || '',
    lastName: profile?.displayName?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const [orderComplete, setOrderComplete] = useState(false);
  if (cartItems.length === 0 && !orderComplete) return <Navigate to="/boutique" />;

  const shippingCost = shipping === 'chronopost' ? 9.90
    : shipping === 'relay' ? (cartTotal >= 39 ? 0 : 3.90)
    : (cartTotal >= 49 ? 0 : 4.90);
  const total = cartTotal + shippingCost;

  const getMollieMethod = (pm: PaymentMethod): string | undefined => {
    if (pm === 'card') return 'creditcard';
    if (pm === 'applepay') return 'applepay';
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const orderId = `CZ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    try {
      const orderItems = cartItems.map(item => ({
        name: item.product.name,
        productName: item.product.name,
        grammage: item.selectedPrice.label,
        unitPrice: Math.round(item.selectedPrice.amount * 100),
        price: item.selectedPrice.amount,
        quantity: item.quantity,
        label: item.selectedPrice.label,
        image: item.product.image,
      }));

      const isTestMode = (import.meta.env.VITE_MOLLIE_API_KEY || '').startsWith('test_') || !import.meta.env.VITE_MOLLIE_API_KEY;

      if ((payment === 'card' || payment === 'applepay') && !isTestMode) {
        const mollieMethod = getMollieMethod(payment);
        const result = await createPayment(
          orderItems,
          {
            method: shipping,
            cost: Math.round(shippingCost * 100),
            firstName: form.firstName,
            lastName: form.lastName,
            address: form.address,
            city: form.city,
            postalCode: form.zip,
            phone: form.phone,
          },
          form.email,
          user?.id,
          mollieMethod
        );

        if (result.success && result.checkoutUrl) {
          setOrderComplete(true);
          clearCart();
          window.location.href = result.checkoutUrl;
          return;
        }

        if (result.error) {
          throw new Error(result.error === 'DIRECT_MODE'
            ? 'Le service de paiement est temporairement indisponible. Veuillez réessayer.'
            : result.error);
        }

        throw new Error('Erreur inattendue lors du paiement. Veuillez réessayer.');
      }

      const orderStatus = (payment === 'card' || payment === 'applepay')
        ? (isTestMode ? 'test_paid' : 'paid')
        : 'pending';
      const orderData = { id: orderId, items: cartItems, total, shipping, payment, form, date: new Date().toISOString(), status: orderStatus };
      const localOrders = JSON.parse(localStorage.getItem('cannazen-orders') || '[]');
      localOrders.push(orderData);
      localStorage.setItem('cannazen-orders', JSON.stringify(localOrders));

      if (user) {
        try {
          await supabase.from('orders').insert({
            user_id: user.id,
            status: orderStatus,
            total: Math.round(total * 100),
            payment_method: payment,
            shipping_address: {
              firstName: form.firstName,
              lastName: form.lastName,
              address: form.address,
              city: form.city,
              zip: form.zip,
              phone: form.phone,
            },
            notes: `Order ${orderId}`,
          });
        } catch (err) {
          console.warn('Order save failed:', err);
        }
      }

      setOrderComplete(true);
      clearCart();
      setSubmitting(false);
      navigate(`/checkout/confirmation/${orderId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Une erreur est survenue');
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#c4956a]/40 focus:ring-1 focus:ring-[#c4956a]/15 text-sm transition-colors";

  const paymentOptionClass = (pm: PaymentMethod) =>
    `flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${payment === pm ? 'border-[#c4956a] bg-[rgba(196,149,106,0.04)]' : 'border-[var(--border-color)] hover:border-[#c4956a]/30'}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet><title>Checkout — CannaZen</title></Helmet>
      <Breadcrumbs items={[
        { label: 'Boutique', to: '/boutique' },
        { label: 'Checkout' },
      ]} />
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[var(--text-primary)] italic mb-8">Finaliser ma commande</h1>

      {(import.meta.env.VITE_MOLLIE_API_KEY || '').startsWith('test_') && (
        <div className="bg-[#f5ecd7]/40 border border-[#c4a35a]/15 rounded-xl p-4 mb-8 flex items-center gap-3">
          <AlertTriangle size={18} className="text-[#c4a35a] shrink-0" />
          <p className="text-sm text-[#8b7355] font-light">MODE TEST — Aucun paiement réel ne sera effectué</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--bg-card)] backdrop-blur-sm border border-[var(--border-color)]/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-4">
              <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="Prénom" required className={inputClass} />
              <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="Nom" required className={inputClass} />
            </div>
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" placeholder="Email" required className={`${inputClass} mt-4`} />
            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} type="tel" placeholder="Téléphone" required className={`${inputClass} mt-4`} />
          </div>

          <div className="bg-[var(--bg-card)] backdrop-blur-sm border border-[var(--border-color)]/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Adresse de livraison</h2>
            <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Adresse" required className={inputClass} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} placeholder="Code postal" required className={inputClass} />
              <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="Ville" required className={inputClass} />
            </div>
          </div>

          <div className="bg-[var(--bg-card)] backdrop-blur-sm border border-[var(--border-color)]/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Mode de livraison</h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${shipping === 'colissimo' ? 'border-[#c4956a] bg-[rgba(196,149,106,0.04)]' : 'border-[var(--border-color)] hover:border-[#c4956a]/30'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shipping === 'colissimo'} onChange={() => setShipping('colissimo')} className="accent-[#c4956a]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Colissimo domicile</p>
                    <p className="text-xs text-[var(--text-secondary)] font-light">2-3 jours ouvrés</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{cartTotal >= 49 ? <span className="text-[#1a2f23] dark:text-[#c4956a]">GRATUIT</span> : '4,90€'}</span>
              </label>
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${shipping === 'chronopost' ? 'border-[#c4956a] bg-[rgba(196,149,106,0.04)]' : 'border-[var(--border-color)] hover:border-[#c4956a]/30'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shipping === 'chronopost'} onChange={() => setShipping('chronopost')} className="accent-[#c4956a]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Chronopost Express 24h</p>
                    <p className="text-xs text-[var(--text-secondary)] font-light">Livraison lendemain avant 13h</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">9,90€</span>
              </label>
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${shipping === 'relay' ? 'border-[#c4956a] bg-[rgba(196,149,106,0.04)]' : 'border-[var(--border-color)] hover:border-[#c4956a]/30'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shipping === 'relay'} onChange={() => setShipping('relay')} className="accent-[#c4956a]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Point Relais (Mondial Relay)</p>
                    <p className="text-xs text-[var(--text-secondary)] font-light">3-5 jours ouvrés</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{cartTotal >= 39 ? <span className="text-[#1a2f23] dark:text-[#c4956a]">GRATUIT</span> : '3,90€'}</span>
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--text-secondary)] font-light">
              <span className="flex items-center gap-1"><Package size={12} /> Expédition sous 24h</span>
              <span className="flex items-center gap-1"><Lock size={12} /> Emballage 100% discret et hermétique</span>
              <span className="flex items-center gap-1"><Mail size={12} /> Suivi de commande par email</span>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] backdrop-blur-sm border border-[var(--border-color)]/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Moyen de paiement</h2>
            <div className="space-y-3">
              <label className={paymentOptionClass('card')}>
                <input type="radio" checked={payment === 'card'} onChange={() => setPayment('card')} className="accent-[#c4956a]" />
                <CreditCard size={20} className="text-[#c4956a] shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Carte bancaire</p>
                  <p className="text-xs text-[var(--text-secondary)] font-light">Visa, Mastercard, CB — via Mollie</p>
                </div>
              </label>

              <label className={paymentOptionClass('applepay')}>
                <input type="radio" checked={payment === 'applepay'} onChange={() => setPayment('applepay')} className="accent-[#c4956a]" />
                <Smartphone size={20} className="text-[var(--text-primary)] shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Apple Pay</p>
                  <p className="text-xs text-[var(--text-secondary)] font-light">Paiement rapide depuis votre appareil Apple</p>
                </div>
              </label>

              <label className={paymentOptionClass('crypto')}>
                <input type="radio" checked={payment === 'crypto'} onChange={() => setPayment('crypto')} className="accent-[#c4956a]" />
                <Bitcoin size={20} className="text-[#c4a35a] shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Cryptomonnaie</p>
                  <p className="text-xs text-[var(--text-secondary)] font-light">Bitcoin, Ethereum, USDT</p>
                </div>
              </label>

              <label className={paymentOptionClass('transfer')}>
                <input type="radio" checked={payment === 'transfer'} onChange={() => setPayment('transfer')} className="accent-[#c4956a]" />
                <Landmark size={20} className="text-[var(--text-secondary)] shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Virement bancaire</p>
                  <p className="text-xs text-[var(--text-secondary)] font-light">IBAN communiqué après confirmation</p>
                </div>
              </label>
            </div>

            {payment === 'card' && (
              <div className="mt-4 bg-[var(--border-color)]/20 border border-[var(--border-color)]/40 rounded-xl p-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Lock size={14} className="text-[#1a2f23] dark:text-[#c4956a]" />
                  <p className="text-[var(--text-primary)] font-medium">Paiement sécurisé via Mollie</p>
                </div>
                <div className="flex gap-2 flex-wrap mb-2">
                  <span className="bg-[var(--bg-card)] border border-[var(--border-color)]/40 rounded-lg px-2.5 py-1 text-xs text-[var(--text-secondary)]">Visa</span>
                  <span className="bg-[var(--bg-card)] border border-[var(--border-color)]/40 rounded-lg px-2.5 py-1 text-xs text-[var(--text-secondary)]">Mastercard</span>
                  <span className="bg-[var(--bg-card)] border border-[var(--border-color)]/40 rounded-lg px-2.5 py-1 text-xs text-[var(--text-secondary)]">CB</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-light">Chiffrement SSL 256 bits. Vos données bancaires ne sont jamais stockées sur notre site.</p>
              </div>
            )}

            {payment === 'applepay' && (
              <div className="mt-4 bg-[var(--border-color)]/20 border border-[var(--border-color)]/40 rounded-xl p-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone size={14} className="text-[var(--text-primary)]" />
                  <p className="text-[var(--text-primary)] font-medium">Apple Pay via Mollie</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-light">Payez en un instant avec Touch ID ou Face ID. Disponible sur Safari (Mac, iPhone, iPad).</p>
              </div>
            )}

            {payment === 'crypto' && (
              <div className="mt-4 bg-[#f5ecd7]/30 border border-[#c4a35a]/15 rounded-xl p-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Bitcoin size={14} className="text-[#c4a35a]" />
                  <p className="text-[#8b7355] font-medium">Paiement en cryptomonnaie</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-light mb-3">Après confirmation, vous recevrez les adresses de paiement par email. Votre commande sera validée dès réception des fonds.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-[var(--bg-card)] border border-[#c4a35a]/20 rounded-lg px-2.5 py-1 text-xs text-[#8b7355] font-medium">BTC</span>
                  <span className="bg-[var(--bg-card)] border border-[#c4a35a]/20 rounded-lg px-2.5 py-1 text-xs text-[#8b7355] font-medium">ETH</span>
                  <span className="bg-[var(--bg-card)] border border-[#c4a35a]/20 rounded-lg px-2.5 py-1 text-xs text-[#8b7355] font-medium">USDT</span>
                </div>
              </div>
            )}

            {payment === 'transfer' && (
              <div className="mt-4 bg-[#f5ecd7]/30 border border-[#c4a35a]/15 rounded-xl p-4 text-sm">
                <p className="text-[#8b7355] font-medium mb-2">Coordonnées bancaires</p>
                <div className="text-[var(--text-secondary)] font-light space-y-1">
                  <p>IBAN : <span className="font-medium text-[var(--text-primary)]">LU61 6060 0020 0000 5401</span></p>
                  <p>BIC : <span className="font-medium text-[var(--text-primary)]">OLKILUL1XXX</span></p>
                  <p className="text-xs italic mt-2">Référence = votre numéro de commande</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-[var(--bg-card)] backdrop-blur-sm border border-[var(--border-color)] rounded-2xl p-6 premium-shadow sticky top-24">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Récapitulatif</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)] truncate mr-2 font-light">{item.product.name} x{item.quantity}</span>
                  <span className="font-medium">{(item.selectedPrice.amount * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border-color)]/40 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)] font-light">Sous-total</span>
                <span className="font-medium">{cartTotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)] font-light">Livraison ({shipping === 'chronopost' ? 'Express' : shipping === 'relay' ? 'Relais' : 'Colissimo'})</span>
                <span className={`font-medium ${shippingCost === 0 ? 'text-[#1a2f23] dark:text-[#c4956a]' : ''}`}>{shippingCost === 0 ? 'Offerte' : `${shippingCost.toFixed(2)}€`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[var(--border-color)]/40">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>
            )}
            <button type="submit" disabled={submitting} className="w-full mt-6 btn-vivid disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all neon-glow">
              {submitting ? 'Traitement...' : 'Confirmer la commande'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
