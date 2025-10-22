'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/DarkModeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/utils/i18n';

export default function Navbar() {
  const router = useRouter();
  const { language } = useLanguage();
  const { isAuth, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = (key) => getTranslation(language, key);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/#about', label: t('about') },
    { href: '/#activities', label: t('activities') },
    { href: '/#team', label: t('team') },
    { href: '/#contact', label: t('contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10">
              <Image
                src="/infinity_club_logo.png"
                alt="Infinity Club Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold hidden sm:inline">{t('clubName')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <LanguageSelector />

            {isAuth ? (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="outline">
                  <Link href="/dashboard">{t('dashboard')}</Link>
                </Button>
                <Button onClick={handleLogout} variant="destructive">
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="outline">
                  <Link href="/login">{t('login')}</Link>
                </Button>
                <Button asChild className="bg-hero hover:bg-hero/90 text-white">
                  <Link href="/register">{t('joinUs')}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex flex-col gap-2 mt-4">
                {isAuth ? (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard">{t('dashboard')}</Link>
                    </Button>
                    <Button onClick={handleLogout} variant="destructive" className="w-full">
                      {t('logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/login">{t('login')}</Link>
                    </Button>
                    <Button asChild className="w-full bg-hero hover:bg-hero/90 text-white">
                      <Link href="/register">{t('joinUs')}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
