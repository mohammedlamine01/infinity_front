'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation  } from '@/utils/i18n';
import { Calendar, Users, Presentation, Code, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Activities() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const activities = [
    {
      title: language === 'ar' ? 'ورش العمل' : language === 'fr' ? 'Ateliers' : 'Workshops',
      description:
        language === 'ar'
          ? 'ورش عمل عملية حول تقنيات البرمجة الحديثة والأدوات'
          : language === 'fr'
          ? 'Ateliers pratiques sur les technologies et outils de programmation modernes'
          : 'Hands-on workshops on modern programming technologies and tools',
      icon: Presentation,
      date: language === 'ar' ? 'أسبوعياً' : language === 'fr' ? 'Hebdomadaire' : 'Weekly',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-500',
      badge: 'Practice',
      image: '🎨',
    },
    {
      title: language === 'ar' ? 'الهاكاثون' : language === 'fr' ? 'Hackathons' : 'Hackathons',
      description:
        language === 'ar'
          ? 'فعاليات برمجية مكثفة لحل مشاكل حقيقية وبناء مشاريع مبتكرة'
          : language === 'fr'
          ? 'Événements de codage intensifs pour résoudre des problèmes réels et créer des projets innovants'
          : 'Intensive coding events to solve real-world problems and build innovative projects',
      icon: Code,
      date: language === 'ar' ? 'شهرياً' : language === 'fr' ? 'Mensuel' : 'Monthly',
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-500',
      badge: 'Compete',
      image: '💻',
    },
    {
      title: language === 'ar' ? 'المحاضرات التقنية' : language === 'fr' ? 'Conférences Tech' : 'Tech Talks',
      description:
        language === 'ar'
          ? 'جلسات ملهمة مع خبراء الصناعة وقادة التكنولوجيا'
          : language === 'fr'
          ? 'Sessions inspirantes avec des experts de l\'industrie et des leaders technologiques'
          : 'Inspiring sessions with industry experts and tech leaders',
      icon: Users,
      date: language === 'ar' ? 'كل أسبوعين' : language === 'fr' ? 'Bimensuel' : 'Bi-weekly',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-500',
      badge: 'Learn',
      image: '🎤',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Staggered cascade animation
            activities.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="activities" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white dark:from-background dark:via-green-950/10 dark:to-background" ref={sectionRef}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800">
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400 animate-pulse" />
            <span className="text-green-700 dark:text-green-300 text-sm font-medium">Nos Activités</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-green-700 to-gray-900 dark:from-gray-100 dark:via-green-400 dark:to-gray-100 bg-clip-text text-transparent">
              {t('activitiesTitle')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('activitiesDescription')}
          </p>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const isVisible = visibleCards.includes(index);
            
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-16 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card Container */}
                <Card className="relative h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                  
                  {/* Green Top Accent Border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${activity.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                  {/* Image Overlay Container */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }} />
                    </div>

                    {/* Large Emoji/Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-500">
                        {activity.image}
                      </span>
                    </div>

                    {/* Green Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg transform translate-y-[-100%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {activity.badge}
                    </div>
                  </div>

                  <CardHeader className="relative">
                    {/* Animated Icon */}
                    <div className="absolute -top-8 left-6 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-4 border-white dark:border-gray-900 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <Icon className={`h-8 w-8 ${activity.iconColor} group-hover:animate-bounce`} />
                    </div>

                    <div className="pt-8">
                      <CardTitle className="text-2xl md:text-3xl mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                        {activity.title}
                      </CardTitle>

                      {/* Date Badge */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{activity.date}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                      {activity.description}
                    </CardDescription>
                  </CardContent>

                  {/* Green Glow Shadow on Hover */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${activity.color} rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10`} />

                  {/* Animated Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-tl ${activity.color} opacity-10 rounded-tl-full`} />
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
            {/* Shimmer Effect */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" />
            
            <span className="relative flex items-center gap-2">
              {t('joinUs')}
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
