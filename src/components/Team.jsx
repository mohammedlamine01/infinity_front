'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation  } from '@/utils/i18n';
import { Github, Linkedin, Mail } from 'lucide-react';

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
      avatar: '👨‍💻',
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
      avatar: '👩‍💻',
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
      avatar: '🎯',
    },
  ];

  return (
    <section id="team" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('teamTitle')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('teamDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="hover-scale cursor-pointer text-center border-2 hover:border-hero transition-all duration-300"
            >
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-hero flex items-center justify-center text-5xl">
                    {member.avatar}
                  </div>
                </div>
                <CardTitle className="text-2xl">{member.name}</CardTitle>
                <CardDescription className="text-base font-semibold text-hero">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
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
