'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import LoadingPage from '@/components/LoadingPage';

export default function DashboardLayout({ children }) {
  const { isAuth, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push('/login');
    } else if (!loading && user?.role !== 'admin') {
      router.push('/');
    }
  }, [isAuth, user, loading, router]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuth || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
