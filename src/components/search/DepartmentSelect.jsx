'use client';

import { motion } from 'framer-motion';
import { Building2, ChevronRight } from 'lucide-react';
import { searchTranslations } from '../../utils/searchTranslations';

export default function DepartmentSelect({ departments, onSelect, searchQuery, language }) {
  const t = searchTranslations[language];

  const filteredDepartments = departments.filter(dept =>
    dept.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  if (filteredDepartments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Building2 className="h-16 w-16 text-slate-600 dark:text-slate-700 mb-4" />
        <h3 className="text-xl font-semibold text-white dark:text-slate-400 mb-2">
          {t.noDepartmentsFound}
        </h3>
        <p className="text-slate-400 dark:text-slate-500">
          {t.tryDifferentSearch}
        </p>
      </div>
    );
  }

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-white dark:text-slate-100 mb-6"
      >
        {t.selectDepartment}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredDepartments.map((dept) => (
          <motion.div
            key={dept.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(dept)}
            className="group cursor-pointer bg-black dark:bg-slate-800 rounded-xl p-6 border border-slate-800 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 shadow-sm hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg group-hover:from-green-100 group-hover:to-emerald-100 dark:group-hover:from-green-800/30 dark:group-hover:to-emerald-800/30 transition-all duration-300">
                <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400 transform group-hover:translate-x-1 transition-all duration-300" />
            </div>

            <h3 className="text-lg font-semibold text-white dark:text-slate-100 mb-2 group-hover:text-green-400 dark:group-hover:text-green-400 transition-colors duration-300">
              {dept.name}
            </h3>

            {dept.description && (
              <p className="text-sm text-slate-400 dark:text-slate-400 line-clamp-2">
                {dept.description}
              </p>
            )}

            {dept.specialites_count && (
              <div className="mt-4 pt-4 border-t border-slate-800 dark:border-slate-700">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-500">
                  {dept.specialites_count} {t.specialties}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
