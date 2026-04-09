import { useState } from 'react';
import { X, Mail, Eye, EyeOff, User, Loader2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthActions } from '../../hooks/useAuthActions';
import { registerSchema, type RegisterInput } from '../../lib/validators/auth';
import { supabase } from '../../lib/supabase';
import SocialButton from './SocialButton';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { register, actionLoading } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RegisterInput>({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false as any,
    acceptAge: false as any,
  });

  if (!isOpen) return null;

  const passwordStrength = (pw: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) return { score, label: 'Faible', color: 'bg-red-400' };
    if (score <= 3) return { score, label: 'Moyen', color: 'bg-amber-400' };
    if (score <= 4) return { score, label: 'Fort', color: 'bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e]' };
    return { score, label: 'Très fort', color: 'bg-[#2d4a3e]' };
  };

  const strength = passwordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.displayName);
      onClose();
    } catch {
    }
  };

  const handleGoogleClick = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://cannazen.fun/auth/callback'
      }
    });
    if (error) {
      console.error('Google auth error:', error);
      alert('Erreur Google: ' + error.message);
      return;
    }
    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert('Pas de lien Google reçu');
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border ${
      errors[field] ? 'border-red-300' : 'border-[var(--border-color)]/60'
    } bg-[var(--bg-surface)]/50 py-3 px-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:border-[#c4956a] focus:outline-none focus:ring-1 focus:ring-[#c4956a]/20`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#2c2520]/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 my-8 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border-color)]/50 bg-[var(--bg-surface)] shadow-2xl shadow-[#1a2f23]/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c4956a] to-transparent" />

        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <h2 className="mb-1 font-['Cormorant_Garamond'] text-2xl font-bold text-[var(--text-primary)] italic">Créer un compte</h2>
          <p className="mb-6 text-sm text-[var(--text-secondary)] font-light">Rejoignez l'expérience CannaZen</p>

          <div className="mb-6">
            <SocialButton provider="google" onClick={handleGoogleClick} loading={actionLoading} label="S'inscrire avec Google" />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-color)]" /></div>
            <div className="relative flex justify-center">
              <span className="bg-[var(--bg-surface)] px-4 text-xs uppercase tracking-widest text-[var(--text-secondary)]/50">ou par email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]/50" />
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className={`${inputClass('displayName')} pl-10`}
                  placeholder="Jean Dupont"
                />
              </div>
              {errors.displayName && <p className="mt-1 text-xs text-red-500">{errors.displayName}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]/50" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`${inputClass('email')} pl-10`}
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`${inputClass('password')} pr-10`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]/50 hover:text-[var(--text-secondary)]">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="mb-1 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength.score ? strength.color : 'bg-[var(--border-color)]'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength.score <= 2 ? 'text-red-500' : strength.score <= 3 ? 'text-amber-600' : 'text-[#c4956a]'}`}>
                    {strength.label}
                  </p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">Confirmer le mot de passe</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={inputClass('confirmPassword')}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex cursor-pointer items-start gap-3">
                <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${formData.acceptAge ? 'border-[#c4956a] bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e]' : 'border-[var(--border-color)] bg-white'} transition-colors`}>
                  {formData.acceptAge && <Check className="h-3 w-3 text-white" />}
                </div>
                <input type="checkbox" className="sr-only" checked={formData.acceptAge as boolean} onChange={(e) => setFormData({ ...formData, acceptAge: e.target.checked as any })} />
                <span className="text-sm text-[var(--text-secondary)] font-light">Je confirme avoir <span className="font-semibold text-[var(--text-primary)]">18 ans ou plus</span></span>
              </label>
              {errors.acceptAge && <p className="ml-8 text-xs text-red-500">{errors.acceptAge}</p>}

              <label className="flex cursor-pointer items-start gap-3">
                <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${formData.acceptTerms ? 'border-[#c4956a] bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e]' : 'border-[var(--border-color)] bg-white'} transition-colors`}>
                  {formData.acceptTerms && <Check className="h-3 w-3 text-white" />}
                </div>
                <input type="checkbox" className="sr-only" checked={formData.acceptTerms as boolean} onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked as any })} />
                <span className="text-sm text-[var(--text-secondary)] font-light">
                  J'accepte les{' '}
                  <Link to="/cgv" className="text-[#c4956a] underline" target="_blank">CGV</Link>{' '}
                  et la{' '}
                  <Link to="/politique-de-confidentialite" className="text-[#c4956a] underline" target="_blank">politique de confidentialité</Link>
                </span>
              </label>
              {errors.acceptTerms && <p className="ml-8 text-xs text-red-500">{errors.acceptTerms}</p>}
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className="w-full rounded-xl bg-gradient-to-r from-[#1a2f23] to-[#2d4a3e] py-3 text-sm font-semibold text-white shadow-md shadow-[#1a2f23]/15 transition-all hover:from-[#2d4a3e] hover:to-[#3d6050] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'Créer mon compte'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)] font-light">
            Déjà un compte ?{' '}
            <button onClick={onSwitchToLogin} className="font-medium text-[#c4956a] hover:text-[#a07850]">Se connecter</button>
          </p>
        </div>
      </div>
    </div>
  );
}
