import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';

export default function Confirmation() {
  const { id } = useParams();

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center fade-in-up">
      <Helmet><title>Commande confirmée — CannaZen</title></Helmet>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--border-color)] mb-5">
        <CheckCircle size={32} className="text-[#c4956a]" />
      </div>
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[var(--text-primary)] italic mb-3">Commande confirmée !</h1>
      <p className="text-[var(--text-secondary)] mb-2 font-light">Merci pour votre commande</p>
      <p className="text-lg font-semibold text-[#c4956a] mb-8">Numéro : {id}</p>
      <p className="text-sm text-[var(--text-secondary)] mb-4 font-light leading-relaxed">
        Vous recevrez un email de confirmation avec les détails de votre commande et les informations de suivi.
      </p>
      <div className="bg-[var(--border-color)]/30 border border-[var(--border-color)]/50 rounded-xl px-4 py-3 mb-8">
        <p className="text-sm text-[#c4956a] font-medium">Livraison estimée le {formattedDate}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/boutique" className="bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e] hover:from-[#2d4a3e] hover:to-[#3d6050] text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md shadow-[#1a2f23]/15">
          Continuer mes achats
        </Link>
        <Link to="/" className="bg-[var(--bg-surface)] border border-[var(--border-color)]/50 text-[var(--text-primary)] px-6 py-3 rounded-xl font-semibold hover:border-[#6b8f5e]/30 transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
