'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Swords } from 'lucide-react';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  // If the user is already logged in, redirect them to the dashboard.
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // While checking for user state, show a loading indicator.
  if (loading) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div>Loading...</div>
        </div>
    );
  }
  
  // If user is already defined, this component will redirect,
  // so we can render the sign-in page.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 text-center shadow-lg">
        <div className="flex flex-col items-center gap-4">
            <Swords className="h-12 w-12 text-primary" />
            <h2 className="text-3xl font-extrabold text-card-foreground font-headline">
                Skillforge Prime
            </h2>
            <p className="text-muted-foreground">
                Sign in to save your progress and build your legacy.
            </p>
        </div>
        <div className="mt-8 space-y-6">
          <Button onClick={() => signInWithGoogle()} className="w-full" disabled={loading}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
