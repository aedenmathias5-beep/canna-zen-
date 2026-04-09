import { useState } from 'react';
import { X, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useAuthActions } from '../../hooks/useAuthActions';
import { resetPasswordSchema } from '../../lib/validators/auth';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function ResetPasswordModal({ isOpen, onClose, onSwitchToLogin }: ResetPasswordModalProps) {
  const { resetPassword, actionLoading } = useAuthActions();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = resetPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    try {
      await resetPassword(email);
      setSent(true);
    } catch {
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2c2520]/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border-color)]/50 bg-[var(--bg-surface)] shadow-2xl shadow-[#1a2f23]/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c4956a] to-transparent" />

        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--border-color)]/50">
                <Mail className="h-8 w-8 text-[#c4956a]" />
              </div>
              <h2 className="mb-2 font-['Cormorant_Garamond'] text-2xl font-bold text-[var(--text-primary)] italic">Email envoyé !</h2>
              <p className="mb-6 text-sm text-[var(--text-secondary)] font-light">
                Si un compte existe avec l'adresse <span className="font-medium text-[var(--text-primary)]">{email}</span>, vous recevrez un email de réinitialisation.
              </p>
              <button
                onClick={onSwitchToLogin}
                className="w-full rounded-xl bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e] py-3 text-sm font-semibold text-white shadow-md shadow-[#1a2f23]/15 transition-all hover:from-[#2d4a3e] hover:to-[#3d6050]"
              >
                Retour à la connexion
              </button>
            </div>
          ) : (
            <>
              <button onClick={onSwitchToLogin} className="mb-4 flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <ArrowLeft className="h-4 w-4" /> Retour
              </button>
              <h2 className="mb-1 font-['Cormorant_Garamond'] text-2xl font-bold text-[var(--text-primary)] italic">Mot de passe oublié</h2>
              <p className="mb-6 text-sm text-[var(--text-secondary)] font-light">
                Entrez votre email pour recevoir un lien de réinitialisation
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-[var(--border-color)]/60 bg-[var(--bg-surface)]/50 py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:border-[#c4956a] focus:outline-none focus:ring-1 focus:ring-[#c4956a]/20"
                      placeholder="votre@email.com"
                      autoFocus
                    />
                  </div>
                  {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e] py-3 text-sm font-semibold text-white shadow-md shadow-[#1a2f23]/15 transition-all hover:from-[#2d4a3e] hover:to-[#3d6050] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'Envoyer le lien'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
