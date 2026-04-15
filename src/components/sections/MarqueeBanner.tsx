import '../../styles/design-system.css';

const items = [
  { text: 'Livraison offerte dès 49€' },
  { text: 'THC < 0.3% · 100% légal en France' },
  { text: 'Cannabis d\'exception cultivé avec soin' },
  { text: 'Expédition sous 24h' },
  { text: 'Gamme complète CBD · D10 · OH+' },
  { text: 'Paiement sécurisé · Crypto acceptées' },
  { text: 'Produits testés en laboratoire' },
  { text: 'Conseils personnalisés disponibles' },
];

export function MarqueeBanner() {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrapper" style={{  }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-sep">✦</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
