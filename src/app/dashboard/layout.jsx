'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import LoadingPage from '@/components/LoadingPage';
import { Menu } from 'lucide-react';
import { isAdminFromCookie } from '@/utils/cookies';

export default function DashboardLayout({ children }) {
  const { isAuth, user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdminCookie, setIsAdminCookie] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        router.push('/login');
      } else {
        // ✅ Check admin status from cookie for instant verification
        const adminFromCookie = isAdminFromCookie();
        setIsAdminCookie(adminFromCookie);
        
        // Fallback to user role if cookie not found
        if (!adminFromCookie && user?.role !== 'admin') {
          router.push('/');
        }
      }
    }
  }, [isAuth, user, loading, router]);

  if (loading) {
    return <LoadingPage />;
  }

  // ✅ Use cookie-based check first, fallback to user role
  const isAdmin = isAdminCookie || user?.role === 'admin';
  
  if (!isAuth || !isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              Infinity Club
            </h1>
          </div>
        </div>
        
        {children}
      </main>
    </div>
  );
}
