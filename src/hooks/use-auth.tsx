'use client';

import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import {
  User,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This effect runs once on mount to handle the redirect result from Firebase.
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          // On successful sign-in redirect, send user to dashboard.
          router.push('/dashboard');
        }
      })
      .catch((error) => {
        // This error can be ignored. It often happens on page load if there's no pending redirect.
        console.warn('Firebase getRedirectResult error on initial load:', error.code);
      });

    // This listener is the source of truth for the user's auth state.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      // We will redirect to the Google sign-in page.
      // The onAuthStateChanged listener will handle the user state when they return.
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // On sign out, redirect to the main dashboard which is now public.
      router.push('/dashboard');
      setLoading(false);
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut: signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
