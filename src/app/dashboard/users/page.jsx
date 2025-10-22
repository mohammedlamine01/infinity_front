'use client';

import { useEffect, useState } from 'react';
import { usersAPI } from '@/utils/api';
import { toast } from 'sonner';
import { Search, Mail, Phone, Building2, AlertCircle } from 'lucide-react';
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

export default function UsersPage() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const { data } = await usersAPI.getAll();
      // Filter only validated users (assuming status field or is_valid field)
      const validatedUsers = data.filter(user => user.status === 'valid' || user.is_valid === 1 || user.is_valid === true);
      setUsers(validatedUsers);
      setFilteredUsers(validatedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(t('failedToLoad') + ' ' + t('users').toLowerCase());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('validatedUsers')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('viewAllValidatedMembers')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchByName')}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
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
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery ? t('noUsersFound') : t('validatedUsers')}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {t('showing')} {filteredUsers.length} {t('of')} {users.length} {t('users').toLowerCase()}
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead>{t('phone')}</TableHead>
                  <TableHead>{t('role')}</TableHead>
                  <TableHead>{t('specialite')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
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
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        user.role === 'admin'
                          ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                          : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      }`}>
                        {user.role || 'visitor'}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {user.specialite?.nom_sp || user.specialite?.name || 'N/A'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
