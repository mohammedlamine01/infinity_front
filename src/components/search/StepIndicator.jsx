'use client';

import { motion } from 'framer-motion';
import { Building2, GraduationCap, Users, Check } from 'lucide-react';

export default function StepIndicator({ currentStep, language }) {
  const steps = [
    { 
      id: 1, 
      icon: Building2,
      label: {
        en: 'Department',
        fr: 'Département',
        ar: 'القسم'
      }
    },
    { 
      id: 2, 
      icon: GraduationCap,
      label: {
        en: 'Specialty',
        fr: 'Spécialité',
        ar: 'التخصص'
      }
    },
    { 
      id: 3, 
      icon: Users,
      label: {
        en: 'Users',
        fr: 'Utilisateurs',
        ar: 'المستخدمين'
      }
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="relative flex items-center justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 -z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            initial={{ width: '0%' }}
            animate={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep >= step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: isCurrent ? [1, 1.1, 1] : 1,
                    boxShadow: isCurrent 
                      ? [
                          '0 0 0 0px rgba(34, 197, 94, 0.4)',
                          '0 0 0 10px rgba(34, 197, 94, 0)',
                          '0 0 0 0px rgba(34, 197, 94, 0)'
                        ]
                      : 'none'
                  }}
                  transition={{
                    repeat: isCurrent ? Infinity : 0,
                    duration: 2
                  }}
                  className={`
                    relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
                    transition-all duration-500
                    ${isActive 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50' 
                      : 'bg-slate-800 text-slate-500'
                    }
                  `}
                >
                  {isActive && currentStep > step.id ? (
                    <Check className="w-6 h-6 sm:w-7 sm:h-7" />
                  ) : (
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  )}
                </motion.div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`
                  text-xs sm:text-sm font-medium transition-colors duration-300
                  ${isCurrent 
                    ? 'text-green-400' 
                    : isActive 
                      ? 'text-white' 
                      : 'text-slate-500'
                  }
                `}
              >
                {step.label[language] || step.label.en}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
