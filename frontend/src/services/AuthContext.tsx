import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

// ── Passthrough / Demo credentials ──────────────────────────────────
const DEMO_EMAIL = 'test@gmail.com';
const DEMO_PASSWORD = 'test1234';
const DEMO_USER = {
  uid: 'demo-user-alex',
  email: DEMO_EMAIL,
  displayName: 'Alex Johnson',
};

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore session on mount
  useEffect(() => {
    // Check for demo session first
    const demoSession = localStorage.getItem('fundmyskill_demo_session');
    if (demoSession === 'true') {
      setUser(DEMO_USER);
      setLoading(false);
      // Still listen for Firebase auth changes, but don't block on it
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Real Firebase user — clear demo session so real UID is used
        localStorage.removeItem('fundmyskill_demo_session');
        localStorage.setItem('fundmyskill_firebase_uid', firebaseUser.uid);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      } else if (!localStorage.getItem('fundmyskill_demo_session')) {
        // Only clear user if demo session is not active
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      // ── Passthrough mode: test@gmail.com / test1234 ──
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem('fundmyskill_demo_session', 'true');
        setUser(DEMO_USER);
        setLoading(false);
        return;
      }

      // ── Real Firebase Authentication ──
      const credential = await signInWithEmailAndPassword(auth, email, password);
      // Clear demo session — real user takes priority
      localStorage.removeItem('fundmyskill_demo_session');
      localStorage.setItem('fundmyskill_firebase_uid', credential.user.uid);
      setUser({
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: credential.user.displayName,
      });
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid') {
        // Firebase not configured — fall back to demo hint
        setError('Firebase not configured. Use test@gmail.com / test1234 to log in.');
      } else {
        setError(err.message || 'Sign in failed.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('fundmyskill_demo_session');
    localStorage.removeItem('fundmyskill_firebase_uid');
    try {
      await firebaseSignOut(auth);
    } catch {
      // Firebase might not be configured — that's fine
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
