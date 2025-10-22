'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/i18n';
import { 
  LayoutDashboard, 
  Building2, 
  GraduationCap, 
  Calendar, 
  Users,
  UserCheck,
  LogOut,
  Home
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const menuItems = [
    { 
      href: '/dashboard', 
      label: t('dashboard'), 
      icon: LayoutDashboard 
    },
    { 
      href: '/dashboard/departments', 
      label: t('departments'), 
      icon: Building2 
    },
    { 
      href: '/dashboard/specialites', 
      label: t('specialites'), 
      icon: GraduationCap 
    },
    { 
      href: '/dashboard/events', 
      label: t('events'), 
      icon: Calendar 
    },
    { 
      href: '/dashboard/users', 
      label: t('users'), 
      icon: Users 
    },
    { 
      href: '/dashboard/pending-users', 
      label: t('pendingUsers'), 
      icon: UserCheck 
    },
  ];

  const isActive = (href) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Infinity Club
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {t('adminDashboard')}
        </p>
      </div>

      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${active 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.name || 'Admin User'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user?.email || 'admin@example.com'}
          </p>
          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded">
            {user?.role || 'admin'}
          </span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all mb-2"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm">{t('backToHome')}</span>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}
