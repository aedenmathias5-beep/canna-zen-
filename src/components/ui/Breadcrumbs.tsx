import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs font-light mb-6 overflow-x-auto" style={{ color: 'var(--text-muted)' }}>
      <Link to="/" className="hover:text-[#c4956a] transition-colors shrink-0" aria-label="Accueil">
        <Home size={13} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 shrink-0">
          <ChevronRight size={11} style={{ color: 'var(--border-color)' }} />
          {item.to ? (
            <Link to={item.to} className="hover:text-[#c4956a] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
