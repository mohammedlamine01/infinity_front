'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation  } from '@/utils/i18n';
import { Github, Linkedin, Mail, Users } from 'lucide-react';

export default function Team() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const teamMembers = [
    {
      name: 'Team Member 1',
      role: language === 'ar' ? 'الرئيس' : language === 'fr' ? 'Président' : 'President',
      bio:
        language === 'ar'
          ? 'متحمس للتكنولوجيا وقيادة المجتمع'
          : language === 'fr'
          ? 'Passionné de technologie et de leadership communautaire'
          : 'Passionate about technology and community leadership',
    },
    {
      name: 'Team Member 2',
      role:
        language === 'ar' ? 'نائب الرئيس' : language === 'fr' ? 'Vice-président' : 'Vice President',
      bio:
        language === 'ar'
          ? 'مطور متمرس ومرشد'
          : language === 'fr'
          ? 'Développeur expérimenté et mentor'
          : 'Experienced developer and mentor',
    },
    {
      name: 'Team Member 3',
      role:
        language === 'ar'
          ? 'منسق الفعاليات'
          : language === 'fr'
          ? 'Coordinateur d\'événements'
          : 'Events Coordinator',
      bio:
        language === 'ar'
          ? 'منظم فعاليات إبداعي ومتحمس'
          : language === 'fr'
          ? 'Organisateur d\'événements créatif et passionné'
          : 'Creative and passionate event organizer',
    },
  ];

  return (
    <section
      id="team"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white dark:from-background dark:via-green-950/10 dark:to-background"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('teamTitle')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('teamDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden cursor-pointer text-center border-2 border-white/60 dark:border-white/10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg hover:shadow-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/10 transition-all duration-300" />
              <CardHeader className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                    <Users className="h-11 w-11" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{member.name}</CardTitle>
                <CardDescription className="text-base font-semibold text-hero">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
