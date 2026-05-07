'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function withProtectedRoute(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const { isAuth, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuth) {
        router.push('/login');
      }
    }, [isAuth, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hero"></div>
        </div>
      );
    }

    if (!isAuth) {
      return null;
    }

    return <Component {...props} />;
  };
}

export function withAdminRoute(Component) {
  return function AdminRoute(props) {
    const router = useRouter();
    const { isAuth, user, loading } = useAuth();

    useEffect(() => {
      if (!loading) {
        if (!isAuth) {
          router.push('/login');
        } else if (user?.role !== 'admin') {
          router.push('/dashboard');
        }
      }
    }, [isAuth, user, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hero"></div>
        </div>
      );
    }

    if (!isAuth || user?.role !== 'admin') {
      return null;
    }

    return <Component {...props} />;
  };
}
