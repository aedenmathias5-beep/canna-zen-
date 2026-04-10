import { useState, useEffect, useRef } from 'react';
import '../../styles/design-system.css';

const testimonials = [
  {
    text: "La qualité est incomparable. Les fleurs OH+ sont d'un niveau que je n'avais jamais expérimenté ailleurs. Service impeccable.",
    author: "Alexandre M.",
    location: "Paris",
    rating: 5,
    product: "Gelato OH+",
  },
  {
    text: "Reçu en 24h, emballage discret et soigné. Les gummies D9 Cookies sont exactement comme décrit. Je recommande à 100%.",
    author: "Sarah L.",
    location: "Lyon",
    rating: 5,
    product: "Cereal Milk D9",
  },
  {
    text: "Le quiz m'a aidé à trouver exactement ce qu'il me fallait pour mon sommeil. L'huile CBD 30% a changé mes nuits.",
    author: "Thomas R.",
    location: "Bordeaux",
    rating: 5,
    product: "Huile CBD 30%",
  },
  {
    text: "Boutique premium dans tous les sens du terme. Produits exceptionnels, packaging élégant, livraison express parfaite.",
    author: "Emma D.",
    location: "Strasbourg",
    rating: 5,
    product: "Amnesia D10",
  },
  {
    text: "Les résines D10 Afghan Gold sont extraordinaires. Un terroir authentique qu'on ressent vraiment. Merci CannaZen.",
    author: "Nicolas B.",
    location: "Marseille",
    rating: 5,
    product: "Afghan Gold D10",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: 'var(--or)', fontSize: '0.7rem' }}>★</span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = (i: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goTo((active + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const t = testimonials[active];

  return (
    <section style={{
      padding: '96px 40px',
      background: 'var(--vert-nuit)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'rgba(201,168,76,0.04)',
        borderRadius: '50%',
        filter: 'blur(80px)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div className="badge-luxury" style={{ marginBottom: '48px' }}>Ils nous font confiance</div>

        <div style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(12px)' : 'translateY(0)',
          transition: 'opacity 0.3s var(--ease-luxury), transform 0.3s var(--ease-luxury)',
        }}>
          <div style={{ marginBottom: '32px' }}>
            <Stars n={t.rating} />
          </div>

          <blockquote style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--ivoire)',
            lineHeight: 1.5,
            marginBottom: '40px',
            position: 'relative',
          }}>
            <span style={{ color: 'var(--or)', opacity: 0.4, fontSize: '3rem', lineHeight: 0.5, verticalAlign: 'bottom', marginRight: '8px' }}>"</span>
            {t.text}
            <span style={{ color: 'var(--or)', opacity: 0.4, fontSize: '3rem', lineHeight: 0.5, verticalAlign: 'bottom', marginLeft: '8px' }}>"</span>
          </blockquote>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--or-pale)', fontWeight: 500 }}>
              {t.author}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--gris-fin)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {t.location} · {t.product}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '48px' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === active ? 'var(--or)' : 'rgba(201,168,76,0.25)',
                border: 'none',
                cursor: 'none',
                transition: 'all 0.4s var(--ease-luxury)',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
