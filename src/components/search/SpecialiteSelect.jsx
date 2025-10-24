'use client';

import { motion } from 'framer-motion';
import { GraduationCap, ChevronRight, ArrowLeft } from 'lucide-react';
import { searchTranslations } from '../../utils/searchTranslations';

export default function SpecialiteSelect({ specialites, onSelect, onBack, searchQuery, language }) {
  const t = searchTranslations[language];

  const filteredSpecialites = specialites.filter(spec =>
    spec.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spec.description?.toLowerCase().includes(searchQuery.toLowerCase())
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
          {t.selectSpecialty}
        </motion.h2>
      </div>

      {filteredSpecialites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <GraduationCap className="h-16 w-16 text-slate-600 dark:text-slate-700 mb-4" />
          <h3 className="text-xl font-semibold text-white dark:text-slate-400 mb-2">
            {t.noSpecialtiesFound}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredSpecialites.map((spec) => (
            <motion.div
              key={spec.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(spec)}
              className="group cursor-pointer bg-black dark:bg-slate-800 rounded-xl p-6 border border-slate-800 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 shadow-sm hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg group-hover:from-green-100 group-hover:to-emerald-100 dark:group-hover:from-green-800/30 dark:group-hover:to-emerald-800/30 transition-all duration-300">
                  <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400 transform group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h3 className="text-lg font-semibold text-white dark:text-slate-100 mb-2 group-hover:text-green-400 dark:group-hover:text-green-400 transition-colors duration-300">
                {spec.name}
              </h3>

              {spec.description && (
                <p className="text-sm text-slate-400 dark:text-slate-400 line-clamp-2">
                  {spec.description}
                </p>
              )}

              {spec.users_count && (
                <div className="mt-4 pt-4 border-t border-slate-800 dark:border-slate-700">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-500">
                    {spec.users_count} {t.students}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
