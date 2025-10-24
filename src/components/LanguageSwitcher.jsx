'use client';

import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'EN', fullName: 'English' },
    { code: 'fr', label: 'FR', fullName: 'Français' },
    { code: 'ar', label: 'ع', fullName: 'العربية' }
  ];

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1 shadow-sm">
      <div className="hidden sm:flex items-center px-2 text-slate-500 dark:text-slate-400">
        <Languages className="h-4 w-4" />
      </div>
      
      <div className="flex gap-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out
              ${
                language === lang.code
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }
            `}
          >
            {language === lang.code && (
              <motion.div
                layoutId="activeLanguage"
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{lang.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
