import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';
import Logo from '../ui/Logo';

const menuItems = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Fleurs', children: [
      { label: 'Fleurs CBD', to: '/boutique?cat=fleurs-cbd' },
      { label: 'Fleurs D10', to: '/boutique?cat=fleurs-d10' },
      { label: 'Fleurs OH+', to: '/boutique?cat=fleurs-oh' },
    ]
  },
  { label: 'Résines D10', to: '/boutique?cat=resines-d10' },
  {
    label: 'Vapes', children: [
      { label: 'Vapes OH+', to: '/boutique?cat=vapes' },
      { label: 'Vapes HEC10', to: '/boutique?cat=vapes' },
    ]
  },
  { label: 'Huiles CBD', to: '/boutique?cat=huiles-cbd' },
  { label: 'Gummies D9', to: '/boutique?cat=gummies-d9' },
  { label: 'Boutique complète', to: '/boutique' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Connexion', to: '/connexion' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { theme } = useTheme();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0" style={{ background: 'rgba(13,148,136,0.1)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm p-6 shadow-xl lg:hidden flex flex-col overflow-y-auto" style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)' }}>
        <div className="flex items-center justify-between mb-8">
          <Logo variant={theme === 'dark' ? 'light' : 'dark'} />
          <button onClick={onClose} aria-label="Fermer le menu" style={{ color: 'var(--text-secondary)' }}><X size={24} /></button>
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map(item => {
            const hasChildren = 'children' in item && item.children;
            const isExpanded = expandedItem === item.label;
            return (
              <div key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                      className="w-full flex items-center justify-between text-sm font-medium py-3 px-3 rounded-lg transition-colors hover:bg-teal-500/5"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.label}
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isExpanded && item.children && (
                      <div className="pl-4 space-y-1 mb-2">
                        {item.children.map(child => (
                          <Link
                            key={child.label}
                            to={child.to}
                            onClick={onClose}
                            className="block text-sm py-2 px-3 rounded-lg transition-colors hover:bg-teal-500/5 hover:text-teal-600"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={'to' in item ? item.to! : '/'}
                    onClick={onClose}
                    className="text-sm font-medium py-3 px-3 rounded-lg transition-colors hover:bg-teal-500/5 hover:text-teal-600"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
