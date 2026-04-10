import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import '../../styles/design-system.css';

const categories = [
  { slug: 'fleurs-cbd', name: 'Fleurs CBD', sub: 'Légèreté & détente', emoji: '🌿', span: 'col-span-2' },
  { slug: 'fleurs-d10', name: 'Fleurs D10', sub: 'Puissance naturelle', emoji: '💎', span: '' },
  { slug: 'fleurs-oh', name: 'Fleurs OH+', sub: 'Expertise & intensité', emoji: '⚡', span: '' },
  { slug: 'resines-d10', name: 'Résines D10', sub: 'Tradition & authenticité', emoji: '🧱', span: '' },
  { slug: 'vapes', name: 'Vapes', sub: 'Discrétion & plaisir', emoji: '💨', span: '' },
  { slug: 'huiles-cbd', name: 'Huiles CBD', sub: 'Bien-être quotidien', emoji: '🫧', span: '' },
  { slug: 'gummies-d9', name: 'Gummies D9', sub: 'Gourmandise & relaxation', emoji: '🍬', span: '' },
];

export function CategoryGrid() {
  return (
    <section style={{
      padding: '96px 40px',
      background: 'linear-gradient(180deg, #0a0a08 0%, #0d1a10 100%)',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="badge-luxury" style={{ marginBottom: '16px' }}>Collections</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            color: 'var(--ivoire)',
            lineHeight: 1.1,
          }}>
            Explorez nos{' '}
            <span className="text-or" style={{ fontStyle: 'italic' }}>univers</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          gridTemplateRows: 'auto',
        }}>
          {categories.map((cat, i) => {
            const count = products.filter(p => p.categorySlug === cat.slug).length;
            const isLarge = i === 0;

            return (
              <Link
                key={cat.slug}
                to={`/boutique?cat=${cat.slug}`}
                style={{
                  gridColumn: isLarge ? 'span 2' : 'span 1',
                  gridRow: isLarge ? 'span 1' : 'span 1',
                  position: 'relative',
                  aspectRatio: isLarge ? '2/1' : '1/1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, rgba(26,51,32,0.4) 0%, rgba(13,26,16,0.9) 100%)',
                  border: '1px solid rgba(201,168,76,0.1)',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  cursor: 'none',
                  transition: 'border-color 0.4s var(--ease-luxury), transform 0.4s var(--ease-luxury)',
                  group: 'category',
                } as React.CSSProperties}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: isLarge ? '28px' : '20px',
                  right: isLarge ? '28px' : '20px',
                  fontSize: isLarge ? '3rem' : '2rem',
                  opacity: 0.6,
                }}>
                  {cat.emoji}
                </div>

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,8,0.85) 0%, transparent 60%)',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isLarge ? '1.6rem' : '1.1rem',
                    fontWeight: 400,
                    color: 'var(--ivoire)',
                    marginBottom: '4px',
                    lineHeight: 1.1,
                  }}>{cat.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    color: 'var(--vert-clair)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>{cat.sub}</p>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    color: 'rgba(201,168,76,0.5)',
                    letterSpacing: '0.2em',
                  }}>{count} produit{count > 1 ? 's' : ''}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
