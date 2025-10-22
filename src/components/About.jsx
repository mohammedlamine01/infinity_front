'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation  } from '@/utils/i18n';
import { Lightbulb, Code, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Lightbulb,
      title: t('innovation'),
      description: t('innovationDesc'),
      color: 'text-yellow-500',
      bgGradient: 'from-yellow-500/10 to-yellow-500/5',
    },
    {
      icon: Code,
      title: t('technology'),
      description: t('technologyDesc'),
      color: 'text-blue-500',
      bgGradient: 'from-blue-500/10 to-blue-500/5',
    },
    {
      icon: Users,
      title: t('teamwork'),
      description: t('teamworkDesc'),
      color: 'text-green-500',
      bgGradient: 'from-green-500/10 to-green-500/5',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger card animations
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Subtle Background Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-green-950/20 dark:via-background dark:to-green-950/10"
      />

      {/* Animated Background Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium border border-green-200 dark:border-green-800">
              À Propos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 dark:from-gray-100 dark:via-green-300 dark:to-gray-100 bg-clip-text text-transparent animate-fade-in">
            {t('aboutTitle')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('aboutDescription')}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);
            
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Glassmorphism Card */}
                <Card className="relative h-full overflow-hidden border-2 border-transparent hover:border-green-400/50 transition-all duration-500 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-lg hover:shadow-green-500/20 hover:shadow-2xl hover:-translate-y-2">
                  
                  {/* Animated Green Border Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-lg animate-border-trace" 
                         style={{
                           background: 'linear-gradient(90deg, transparent, oklch(0.6273 0.1700 149.2005), transparent)',
                           backgroundSize: '200% 2px',
                           backgroundPosition: '-200% 0',
                           backgroundRepeat: 'no-repeat',
                         }}
                    />
                  </div>

                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <CardHeader className="relative z-10">
                    {/* Animated Icon Container */}
                    <div className="mb-6 relative">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border-2 border-green-100 dark:border-green-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {/* Pulsing Ring */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-green-400 animate-ping opacity-0 group-hover:opacity-75" />
                        
                        {/* Icon with Breathing Animation */}
                        <Icon className={`h-10 w-10 ${feature.color} relative z-10 group-hover:animate-pulse`} />
                      </div>
                    </div>

                    <CardTitle className="text-2xl md:text-3xl mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <CardDescription className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-20 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full" />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes border-trace {
          0% {
            background-position: -200% 0, 100% -200%, 200% 100%, 0 200%;
          }
          25% {
            background-position: 200% 0, 100% -200%, 200% 100%, 0 200%;
          }
          50% {
            background-position: 200% 0, 100% 200%, 200% 100%, 0 200%;
          }
          75% {
            background-position: 200% 0, 100% 200%, -200% 100%, 0 200%;
          }
          100% {
            background-position: 200% 0, 100% 200%, -200% 100%, 0 -200%;
          }
        }

        .animate-border-trace {
          animation: border-trace 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
