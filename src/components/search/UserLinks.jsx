'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, User, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { searchTranslations } from '../../utils/searchTranslations';

export default function UserLinks({ user, onBack, language }) {
  const t = searchTranslations[language];
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserLinks = async () => {
      if (!user?.id) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/links/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user links');
        }
        const data = await response.json();
        setLinks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching user links:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserLinks();
  }, [user?.id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        className="mb-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-black text-slate-400 dark:text-slate-500 hover:bg-slate-800 dark:hover:bg-slate-900 transition-all duration-300"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t.back}</span>
      </motion.button>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black dark:bg-black rounded-2xl p-8 border border-slate-800 dark:border-slate-700 shadow-xl mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {user.profile_image ? (
              <img
                src={user.profile_image}
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-green-500/20"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center ring-4 ring-green-500/20">
                <User className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-800"></div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white dark:text-slate-100 mb-2">
              {user.name}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-slate-300 dark:text-slate-400">
              {user.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
              )}
              
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              )}
              
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
            </div>

            {user.bio && (
              <p className="mt-4 text-slate-300 dark:text-slate-400 leading-relaxed">
                {user.bio}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Links Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-white dark:text-slate-100 mb-6"
        >
          {t.profileLinks}
        </motion.h2>

        {isLoading ? (
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center py-12"
          >
            <Loader2 className="h-8 w-8 animate-spin text-green-600 dark:text-green-400" />
            <span className="ml-2 text-slate-400 dark:text-slate-500">{t.loading}</span>
          </motion.div>
        ) : error ? (
          <motion.div
            variants={itemVariants}
            className="bg-red-900/20 dark:bg-red-900/20 rounded-xl p-6 text-center border border-red-800 dark:border-red-800"
          >
            <p className="text-red-400 dark:text-red-400">
              {t.errorLoadingLinks}: {error}
            </p>
          </motion.div>
        ) : links.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="bg-slate-900 dark:bg-black rounded-xl p-12 text-center border border-slate-800 dark:border-slate-700"
          >
                        <ExternalLink className="h-12 w-12 text-slate-600 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400 dark:text-slate-500">
              {t.noLinksAvailable}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {links.map((link, index) => {
              // Generate colors based on index for variety
              const colors = [
                { bg: 'from-blue-500 to-blue-600', hover: 'hover:from-blue-600 hover:to-blue-700' },
                { bg: 'from-purple-500 to-purple-600', hover: 'hover:from-purple-600 hover:to-purple-700' },
                { bg: 'from-green-500 to-green-600', hover: 'hover:from-green-600 hover:to-green-700' },
                { bg: 'from-orange-500 to-orange-600', hover: 'hover:from-orange-600 hover:to-orange-700' },
                { bg: 'from-pink-500 to-pink-600', hover: 'hover:from-pink-600 hover:to-pink-700' },
                { bg: 'from-indigo-500 to-indigo-600', hover: 'hover:from-indigo-600 hover:to-indigo-700' }
              ];
              const colorScheme = colors[index % colors.length];

              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden bg-gradient-to-br ${colorScheme.bg} ${colorScheme.hover} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <ExternalLink className="h-8 w-8" />
                      <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1">
                      {link.name_link}
                    </h3>
                    
                    {link.description && (
                      <p className="text-sm text-white/80 mb-2">
                        {link.description}
                      </p>
                    )}
                    
                    <p className="text-sm text-white/60">
                      {t.clickToView}
                    </p>
                  </div>

                  {/* Decorative gradient overlay */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </motion.a>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Additional Info Section */}
      {user.skills && user.skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-black dark:bg-black rounded-2xl p-6 border border-slate-800 dark:border-slate-700 shadow-lg"
        >
          <h3 className="text-xl font-bold text-white dark:text-slate-100 mb-4">
            {t.skills}
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
