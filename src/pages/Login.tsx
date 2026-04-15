// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../lib/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import ResetPasswordModal from '../components/auth/ResetPasswordModal';

type ModalView = 'login' | 'register' | 'reset';

export default function Login() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<ModalView>('login');

  const redirectTo = searchParams.get('redirect') || '/compte';

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  const handleClose = () => {
    navigate(redirectTo, { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-muted-foreground font-light">Chargement...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Connexion — CannaZen</title>
        <meta name="description" content="Connectez-vous ou créez votre compte CannaZen." />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
        {view === 'login' && (
          <LoginModal
            onClose={handleClose}
            onSwitchToRegister={() => setView('register')}
            onSwitchToReset={() => setView('reset')}
          />
        )}
        {view === 'register' && (
          <RegisterModal
            onClose={handleClose}
            onSwitchToLogin={() => setView('login')}
          />
        )}
        {view === 'reset' && (
          <ResetPasswordModal
            onClose={handleClose}
            onSwitchToLogin={() => setView('login')}
          />
        )}
      </div>
    </>
  );
}
