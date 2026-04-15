import { ReactNode } from 'react';
import { useAuth } from '../../lib/AuthContext';
export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <div style={{ padding: '120px 24px', textAlign: 'center' }}><p style={{ color: 'var(--text-secondary)' }}>Connectez-vous pour accéder à cette page.</p></div>;
  return <>{children}</>;
}
