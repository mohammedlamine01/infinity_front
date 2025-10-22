'use client';

import { useEffect, useState } from 'react';
import { usersAPI, authAPI, specialitesAPI } from '@/utils/api';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Mail, Phone, Building2, AlertCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/i18n';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PendingUsersPage() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  const [pendingUsers, setPendingUsers] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validatingId, setValidatingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, specialitesResponse] = await Promise.all([
        authAPI.getPendingUsers(),
        specialitesAPI.getAll()
      ]);
      
      // Backend returns { users: [...] } not just an array
      setPendingUsers(usersResponse.data?.users || usersResponse.data || []);
      setSpecialites(specialitesResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(t('failedToLoad') + ' ' + t('pendingUsers').toLowerCase());
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const { data } = await authAPI.getPendingUsers();
      // Backend returns { users: [...] } not just an array
      setPendingUsers(data?.users || data || []);
    } catch (error) {
      console.error('Error fetching pending users:', error);
      toast.error(t('failedToLoad') + ' ' + t('pendingUsers').toLowerCase());
    }
  };

  const getSpecialiteName = (id_sp) => {
    const specialite = specialites.find(s => s.id === id_sp);
    return specialite?.nom_sp || specialite?.name || `ID: ${id_sp}`;
  };

  const handleValidate = async (userId) => {
    setValidatingId(userId);
    try {
      await authAPI.validateUser(userId);
      toast.success(t('userValidated'));
      fetchPendingUsers(); // Refresh the list
    } catch (error) {
      console.error('Error validating user:', error);
      toast.error(error.response?.data?.message || t('failedToValidate'));
    } finally {
      setValidatingId(null);
    }
  };

  const handleReject = async (userId) => {
    if (!confirm(t('rejectUserConfirmation'))) {
      return;
    }

    setValidatingId(userId);
    try {
      await usersAPI.delete(userId);
      toast.success(t('userRejected'));
      fetchPendingUsers(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error(error.response?.data?.message || t('failedToDelete'));
    } finally {
      setValidatingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('pendingUsers')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('reviewAndValidate')}
        </p>
      </div>

      {/* Stats Card */}
      <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {pendingUsers.length}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('usersAwaitingValidation')}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      ) : pendingUsers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('allCaughtUp')}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t('noPendingUsers')}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('phone')}</TableHead>
                <TableHead>{t('specialite')}</TableHead>
                <TableHead>{t('registered')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900 dark:text-white">
                    {user.name || 'N/A'}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate max-w-xs">{user.email || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {user.phone || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {user.id_sp ? getSpecialiteName(user.id_sp) : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleValidate(user.id)}
                        disabled={validatingId === user.id}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title={t('validate')}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {t('validate')}
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        disabled={validatingId === user.id}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title={t('reject')}
                      >
                        <XCircle className="w-4 h-4" />
                        {t('reject')}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
