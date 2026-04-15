import { useAuth } from '../lib/AuthContext';
export function useAuthActions() {
  const { signOut } = useAuth();
  return { handleSignOut: signOut };
}
