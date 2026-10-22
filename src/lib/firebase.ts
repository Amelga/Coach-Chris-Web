import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // Firestore database ID. Leave unset for a project whose database is
  // "(default)"; set it to the database's actual name when the project only has
  // a named database (as gen-lang-client-0531216729 does).
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || undefined
};

const app = initializeApp(firebaseConfig);

// Firestore init must never crash the whole app. This runs at module load, so a
// throw here unmounts React before it renders and every route shows a blank page
// (which is what a misconfigured database ID or an incompatible database does).
// Only ChatWidget and UserContext use Firestore; the landing page, /join sign-up
// and every content page must keep working regardless of database state.
//
// Initialize lazily and fall back to the plain (default) handle when the
// configured database can't be opened, so a bad/absent database degrades the
// Firestore features instead of taking the whole site down.
let firestoreInstance: ReturnType<typeof getFirestore>;
try {
  firestoreInstance = firebaseConfig.firestoreDatabaseId
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);
} catch (error) {
  console.error(
    `Firestore: could not open database "${firebaseConfig.firestoreDatabaseId}". ` +
      'Falling back to the default database handle.',
    error
  );
  firestoreInstance = getFirestore(app);
}

export const db = firestoreInstance;
export const auth = getAuth(app);
