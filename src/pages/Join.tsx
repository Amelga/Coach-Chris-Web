import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { authErrorMessage, useAuth } from '../auth/useAuth';

/**
 * /join â€” split-screen sign-up / sign-in landing page.
 *
 * LEFT: decorative full-bleed image (public/landing_image.png), hidden below 768px.
 * RIGHT: Firebase Auth email/password form with sign-up, sign-in and password
 * reset modes in one component, plus Google sign-in (reuses the existing
 * UserContext.signIn). Auth state itself comes from UserContext; when it flips
 * to a signed-in user this page redirects away to /dashboard.
 */

type View = 'signup' | 'signin' | 'reset';
type FieldKey = 'name' | 'email' | 'password' | 'confirm' | 'consent';
type FieldErrors = Partial<Record<FieldKey, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_IDS: Record<FieldKey, string> = {
  name: 'join-name',
  email: 'join-email',
  password: 'join-password',
  confirm: 'join-confirm',
  consent: 'join-consent',
};

// Site input styling (matches Contact.tsx) + explicit focus-visible ring for keyboard users.
const inputClass =
  'w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/30 outline-none transition-colors focus:border-brand-lime focus-visible:ring-2 focus-visible:ring-brand-lime/60';

const labelClass = 'block text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2';

const errorClass = 'mt-1.5 text-xs min-h-[1rem] text-[var(--accent-red)]';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="w-5 h-5 shrink-0">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function Join() {
  const { user, loading, signIn: signInWithGoogle } = useUser();
  const { signUpWithEmail, signInWithEmail, sendResetEmail } = useAuth();

  const [view, setView] = useState<View>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [consent, setConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Join | Coach Chris';
    return () => {
      document.title = previous;
    };
  }, []);

  const switchView = (next: View) => {
    setView(next);
    setErrors({});
    setFormError(null);
    setResetSent(false);
    setPassword('');
    setConfirm('');
    setShowPassword(false);
    setShowConfirm(false);
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    const trimmedEmail = email.trim();

    if (view === 'signup' && !fullName.trim()) next.name = 'Please enter your full name.';

    if (!trimmedEmail) next.email = 'Please enter your email address.';
    else if (!EMAIL_PATTERN.test(trimmedEmail)) next.email = 'Please enter a valid email address.';

    if (view === 'reset') return next;

    if (!password) next.password = 'Please enter your password.';
    else if (view === 'signup' && password.length < 8) next.password = 'Password must be at least 8 characters.';

    if (view === 'signup') {
      if (!confirm) next.confirm = 'Please confirm your password.';
      else if (confirm !== password) next.confirm = 'Passwords do not match.';
      if (!consent) next.consent = 'Please accept the terms to continue.';
    }

    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setFormError(null);
    setResetSent(false);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Move focus to the first invalid control for keyboard/screen-reader users.
      const order: FieldKey[] = ['name', 'email', 'password', 'confirm', 'consent'];
      const firstInvalid = order.find((key) => validationErrors[key]);
      if (firstInvalid) document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      if (view === 'signup') {
        // On success UserContext picks up the new session and this page redirects to /dashboard.
        await signUpWithEmail(fullName.trim(), email.trim(), password);
      } else if (view === 'signin') {
        await signInWithEmail(email.trim(), password);
      } else {
        await sendResetEmail(email.trim());
        setResetSent(true);
      }
    } catch (err) {
      setFormError(authErrorMessage((err as { code?: string })?.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    if (submitting) return;
    setFormError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setFormError(authErrorMessage((err as { code?: string })?.code));
    } finally {
      setSubmitting(false);
    }
  };

  // While Firebase resolves the first auth state, keep the form hidden.
  if (loading) {
    return (
      <div role="status" className="min-h-[100dvh] flex items-center justify-center bg-[var(--bg-primary)]">
        <Loader2 className="animate-spin text-brand-lime" size={32} aria-hidden="true" />
        <span className="sr-only">Checking your sessionâ€¦</span>
      </div>
    );
  }

  // Already signed in (or just signed up) â€” leave this page.
  if (user) return <Navigate to="/dashboard" replace />;

  const isGooglePending = submitting;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col md:flex-row md:h-[100dvh] md:overflow-hidden bg-[var(--bg-primary)]">
      {/* LEFT â€” decorative image (hidden below 768px) */}
      <div className="relative w-full h-[30vh] shrink-0 overflow-hidden md:h-full md:w-1/2">
        <img
          src="/landing_image.png"
          alt=""
          aria-hidden="true"
          width={1024}
          height={1536}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      {/* RIGHT â€” form, vertically centered, ~420px column */}
      <div className="flex w-full md:w-1/2 md:h-full md:overflow-y-auto px-6 py-10 sm:px-10 md:py-10">
        <div className="m-auto w-full max-w-[420px]">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-brand-lime transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to home
          </Link>

          <p className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-3">Coach Chris</p>
          <h1 id="join-title" className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight mb-3">
            {view === 'signup' ? 'Create your account' : view === 'signin' ? 'Welcome back' : 'Reset password'}
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            {view === 'signup'
              ? 'Join the academy to track your development, book sessions and follow your pathway.'
              : view === 'signin'
                ? 'Sign in to pick up where you left off.'
                : 'Enter your account email and we will send you a reset link.'}
          </p>

          <form onSubmit={handleSubmit} noValidate aria-labelledby="join-title" aria-busy={submitting} className="space-y-4">
            {formError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/10 px-4 py-3 text-sm text-[var(--accent-red)]"
              >
                <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                <span>{formError}</span>
              </div>
            )}

            {view === 'signup' && (
              <div>
                <label htmlFor={FIELD_IDS.name} className={labelClass}>
                  Full name
                </label>
                <input
                  id={FIELD_IDS.name}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${FIELD_IDS.name}-error` : undefined}
                  className={inputClass}
                  placeholder="Alex Rivera"
                />
                <p id={`${FIELD_IDS.name}-error`} aria-live="polite" className={errorClass}>
                  {errors.name}
                </p>
              </div>
            )}

            <div>
              <label htmlFor={FIELD_IDS.email} className={labelClass}>
                Email
              </label>
              <input
                id={FIELD_IDS.email}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${FIELD_IDS.email}-error` : undefined}
                className={inputClass}
                placeholder="you@example.com"
              />
              <p id={`${FIELD_IDS.email}-error`} aria-live="polite" className={errorClass}>
                {errors.email}
              </p>
            </div>

            {view !== 'reset' && (
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <label htmlFor={FIELD_IDS.password} className={labelClass}>
                    Password
                  </label>
                  {view === 'signin' && (
                    <button
                      type="button"
                      onClick={() => switchView('reset')}
                      className="text-[10px] font-bold uppercase tracking-widest text-brand-lime hover:underline mb-2"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    id={FIELD_IDS.password}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={view === 'signup' ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? `${FIELD_IDS.password}-error` : undefined}
                    className={`${inputClass} pr-12`}
                    placeholder={view === 'signup' ? 'At least 8 characters' : 'Your password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center rounded-r-xl text-[var(--text-secondary)] hover:text-brand-lime transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/60"
                  >
                    {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                  </button>
                </div>
                <p id={`${FIELD_IDS.password}-error`} aria-live="polite" className={errorClass}>
                  {errors.password}
                </p>
              </div>
            )}

            {view === 'signup' && (
              <div>
                <label htmlFor={FIELD_IDS.confirm} className={labelClass}>
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id={FIELD_IDS.confirm}
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    aria-invalid={Boolean(errors.confirm)}
                    aria-describedby={errors.confirm ? `${FIELD_IDS.confirm}-error` : undefined}
                    className={`${inputClass} pr-12`}
                    placeholder="Repeat your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                    aria-pressed={showConfirm}
                    className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center rounded-r-xl text-[var(--text-secondary)] hover:text-brand-lime transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/60"
                  >
                    {showConfirm ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                  </button>
                </div>
                <p id={`${FIELD_IDS.confirm}-error`} aria-live="polite" className={errorClass}>
                  {errors.confirm}
                </p>
              </div>
            )}

            {view === 'signup' && (
              <div>
                <label htmlFor={FIELD_IDS.consent} className="flex items-start gap-3 cursor-pointer">
                  <input
                    id={FIELD_IDS.consent}
                    name="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? `${FIELD_IDS.consent}-error` : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent-lime)] cursor-pointer"
                  />
                  <span className="text-xs leading-relaxed text-[var(--text-secondary)]">
                    I have read and agree to the Terms of Service and Privacy Policy of this site.
                  </span>
                </label>
                <p id={`${FIELD_IDS.consent}-error`} aria-live="polite" className={errorClass}>
                  {errors.consent}
                </p>
              </div>
            )}

            {resetSent && (
              <div
                role="status"
                className="rounded-xl border border-brand-lime/30 bg-brand-lime/10 px-4 py-3 text-sm text-[var(--text-primary)]"
              >
                If an account exists for <span className="font-bold">{email.trim()}</span>, a password reset link is on
                its way. Check your inbox (and spam folder).
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                  {view === 'signup' ? 'Creating accountâ€¦' : view === 'signin' ? 'Signing inâ€¦' : 'Sending linkâ€¦'}
                </>
              ) : view === 'signup' ? (
                'Create account'
              ) : view === 'signin' ? (
                'Sign in'
              ) : (
                'Send reset link'
              )}
            </button>

            {view !== 'reset' && (
              <>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                  <span className="h-px flex-1 bg-[var(--border-color)]" aria-hidden="true" />
                  or
                  <span className="h-px flex-1 bg-[var(--border-color)]" aria-hidden="true" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={isGooglePending}
                  className="btn-secondary w-full justify-center min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </>
            )}
          </form>

          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            {view === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchView('signin')}
                  className="font-bold text-brand-lime hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                New here?{' '}
                <button
                  type="button"
                  onClick={() => switchView('signup')}
                  className="font-bold text-brand-lime hover:underline"
                >
                  Create an account
                </button>
                {view === 'reset' && (
                  <>
                    {' Â· '}
                    <button
                      type="button"
                      onClick={() => switchView('signin')}
                      className="font-bold text-brand-lime hover:underline"
                    >
                      Back to sign in
                    </button>
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
