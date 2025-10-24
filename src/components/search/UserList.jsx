'use client';

import { motion } from 'framer-motion';
import { User, Mail, ChevronRight, ArrowLeft, Briefcase } from 'lucide-react';
import { searchTranslations } from '../../utils/searchTranslations';

export default function UserList({ users, onSelect, onBack, searchQuery, language }) {
  const t = searchTranslations[language];

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-slate-900 dark:bg-black text-slate-400 dark:text-slate-500 hover:bg-slate-800 dark:hover:bg-slate-900 transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-white dark:text-slate-100"
        >
          {t.selectStudent}
        </motion.h2>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <User className="h-16 w-16 text-slate-600 dark:text-slate-700 mb-4" />
          <h3 className="text-xl font-semibold text-white dark:text-slate-400 mb-2">
            {t.noStudentsFound}
          </h3>
          <p className="text-slate-400 dark:text-slate-500">
            {t.tryDifferentSearch}
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(user)}
              className="group cursor-pointer bg-black dark:bg-slate-800 rounded-xl p-5 border border-slate-800 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 shadow-sm hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt={user.name}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-green-500 transition-all duration-300"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-green-500 transition-all duration-300">
                      <User className="h-7 w-7 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white dark:text-slate-100 group-hover:text-green-400 dark:group-hover:text-green-400 transition-colors duration-300 truncate">
                      {user.name}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-green-400 dark:group-hover:text-green-400 transform group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>

                  {user.email && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-400 dark:text-slate-400">
                      <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}

                  {user.role && (
                    <div className="flex items-center gap-2 mt-2">
                      <Briefcase className="h-3.5 w-3.5 text-slate-500" />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">
                        {user.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
