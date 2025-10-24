'use client';

import { useEffect, useState } from 'react';
import { departmentsAPI, specialitesAPI, eventsAPI, usersAPI, authAPI } from '@/utils/api';
import { Building2, GraduationCap, Calendar, Users, UserCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/i18n';

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  const [stats, setStats] = useState({
    departments: 0,
    specialites: 0,
    events: 0,
    users: 0,
    pendingUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // ✅ الروابط محدّثة لتتوافق مع Laravel
      const [depts, specs, evts, usrs, pending] = await Promise.all([
        departmentsAPI.getAll(),           // GET /api/departments
        specialitesAPI.getAll(),           // GET /api/specialites
        eventsAPI.getAll(),                // GET /api/events
        usersAPI.getAll(),                 // GET /api/auth/users (admin only)
        authAPI.getPendingUsers().catch(() => ({ data: [] })), // GET /api/auth/users/pending
      ]);

      setStats({
        departments: depts?.data?.length || 0,
        specialites: specs?.data?.length || 0,
        events: evts?.data?.length || 0,
        users: usrs?.data?.length || 0,
        pendingUsers: pending?.data?.users?.length || pending?.data?.length || 0,
      });
    } catch (error) {
      console.error('❌ Error fetching stats:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: t('departments'), value: stats.departments, icon: Building2, color: 'bg-blue-500', href: '/dashboard/departments' },
    { label: t('specialites'), value: stats.specialites, icon: GraduationCap, color: 'bg-green-500', href: '/dashboard/specialites' },
    { label: t('events'), value: stats.events, icon: Calendar, color: 'bg-purple-500', href: '/dashboard/events' },
    { label: t('users'), value: stats.users, icon: Users, color: 'bg-orange-500', href: '/dashboard/users' },
    { label: t('pendingUsers'), value: stats.pendingUsers, icon: UserCheck, color: 'bg-amber-500', href: '/dashboard/pending-users' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{t('dashboardOverview')}</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          {t('welcomeToAdminPanel')}
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 h-28 sm:h-32"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow cursor-pointer active:scale-95"
                onClick={() => (window.location.href = card.href)}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium truncate">
                      {card.label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                      {card.value}
                    </p>
                  </div>
                  <div className={`${card.color} p-2 sm:p-3 rounded-lg shrink-0`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{t('quickActions')}</h2>
          <div className="space-y-2 sm:space-y-3">
            <a
              href="/dashboard/pending-users"
              className="block p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors active:scale-95"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-amber-900 dark:text-amber-300">{t('pendingUsers')}</p>
                  <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 mt-1 truncate">
                    {t('reviewAndValidate')}
                  </p>
                </div>
                {stats.pendingUsers > 0 && (
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-amber-500 text-white text-xs sm:text-sm font-bold rounded-full shrink-0">
                    {stats.pendingUsers}
                  </span>
                )}
              </div>
            </a>

            <a
              href="/dashboard/departments"
              className="block p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors active:scale-95"
            >
              <p className="text-sm sm:text-base font-medium text-blue-900 dark:text-blue-300">{t('manageAllDepartments')}</p>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 mt-1">
                {t('addEditDelete')}
              </p>
            </a>

            <a
              href="/dashboard/events"
              className="block p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors active:scale-95"
            >
              <p className="text-sm sm:text-base font-medium text-purple-900 dark:text-purple-300">{t('addEvent')}</p>
              <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-400 mt-1">
                {t('organizeNewEvent')}
              </p>
            </a>

            <a
              href="/dashboard/users"
              className="block p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors active:scale-95"
            >
              <p className="text-sm sm:text-base font-medium text-green-900 dark:text-green-300">{t('users')}</p>
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-400 mt-1">
                {t('browseAllMembers')}
              </p>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{t('recentActivity')}</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  {t('systemInitialized')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('justNow')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
