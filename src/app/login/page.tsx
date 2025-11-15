'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);


  const handleSignIn = () => {
    signInWithGoogle();
  };

  if (loading || user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-card-foreground">
            Sign in to Skillforge Prime
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <Button onClick={handleSignIn} className="w-full" disabled={loading}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}