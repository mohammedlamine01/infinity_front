'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { isAuth, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuth) {
      router.push('/dashboard');
    }
  }, [isAuth, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hero"></div>
      </div>
    );
  }

  if (isAuth) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/50">
      <LoginForm />
    </div>
  );
}
