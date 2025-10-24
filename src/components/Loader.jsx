'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="mb-4"
      >
        <Loader2 className="h-12 w-12 text-green-600 dark:text-green-400" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Loading...
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Please wait while we fetch your data
        </p>
      </motion.div>

      {/* Animated dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="h-2 w-2 bg-green-600 dark:bg-green-400 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
