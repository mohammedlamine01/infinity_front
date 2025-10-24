'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation  } from '@/utils/i18n';

export default function RegisterFormStep1({ formData, setFormData, onNext }) {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl">{t('register')} - Step 1/2</CardTitle>
        <CardDescription>
          {language === 'ar'
            ? 'معلوماتك الشخصية'
            : language === 'fr'
            ? 'Vos informations personnelles'
            : 'Your personal information'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('nameLabel')}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={t('nameLabel')}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('emailLabel')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t('emailLabel')}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('phoneLabel')}</Label>
            <Input
              id="phone"
              name="phone"
              type="number"
              placeholder={t('phoneLabel')}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {t('nextStep')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
