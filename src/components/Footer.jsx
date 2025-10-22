'use client';

import Link from 'next/link';
import { Mail, Instagram, Youtube, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation  } from '@/utils/i18n';

export default function Footer() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const socialLinks = [
    {
      icon: Mail,
      href: 'mailto:infinity.tech@univ-bba.dz',
      label: 'infinity.tech@univ-bba.dz',
      ariaLabel: 'Email',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/club_infinity',
      label: '@club_infinity',
      ariaLabel: 'Instagram',
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/@club_infinity',
      label: 'club_infinity',
      ariaLabel: 'YouTube',
    },
    {
      icon: Facebook,
      href: 'https://facebook.com/infinity.club',
      label: 'infinity club',
      ariaLabel: 'Facebook',
    },
  ];

  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('clubName')}</h3>
            <p className="text-muted-foreground">
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact')}</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground">University of BBA</p>
              <p className="text-muted-foreground">Algeria</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('followUs')}</h3>
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.ariaLabel}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>
            © 2025 {t('clubName')} - University of BBA. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
