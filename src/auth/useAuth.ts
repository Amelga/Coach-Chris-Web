import { useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

/**
 * Small auth helper for the email/password flows used by the /join page.
 *
 * Auth *state* already lives in src/context/UserContext.tsx (onAuthStateChanged,
 * Google sign-in via signInWithPopup). This hook only wraps the one-shot email
 * calls and maps Firebase error codes to friendly, user-facing copy so raw
 * error text is never rendered in the UI.
 */

const FRIENDLY_MESSAGES: Record<string, string> = {
  'email-already-in-use': 'An account with this email already exists. Try signing in instead.',
  'invalid-email': 'Please enter a valid email address.',
  'weak-password': 'Password is too weak. Use at least 8 characters.',
  'too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
  'network-request-failed': 'Network error. Check your connection and try again.',
  'popup-closed-by-user': 'Google sign-in was cancelled before it finished.',
  'popup-blocked': 'Your browser blocked the Google pop-up. Allow pop-ups for this site and try again.',
  'user-not-found': 'Email or password is incorrect.',
  'wrong-password': 'Email or password is incorrect.',
  'invalid-credential': 'Email or password is incorrect.',
  'user-disabled': 'This account has been disabled. Please contact the coach.',
  'operation-not-allowed': 'This sign-in method is not enabled yet. Please contact the coach.',
  'requires-recent-login': 'For security, please sign in again before retrying.',
};

/** Maps a Firebase Auth error code to friendly copy; never expose raw codes/messages. */
export const authErrorMessage = (code?: string): string =>
  (code && FRIENDLY_MESSAGES[code]) || 'Something went wrong. Please try again.';

export const useAuth = () => {
  const signUpWithEmail = useCallback(async (name: string, email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    // Best effort: a failed verification send should not roll back account creation.
    await sendEmailVerification(credential.user).catch(() => undefined);
  }, []);

  const signInWithEmail = useCallback(
    (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),
    [],
  );

  const sendResetEmail = useCallback((email: string) => sendPasswordResetEmail(auth, email), []);

  return { signUpWithEmail, signInWithEmail, sendResetEmail };
};
