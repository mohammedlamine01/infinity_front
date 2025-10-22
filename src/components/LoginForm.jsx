'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation  } from '@/utils/i18n';
import { loginUser } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';
import { useAsyncLoad } from '@/hooks/useAsyncLoad';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const { language } = useLanguage();
  const { login } = useAuth();
  const { toast } = useToast();
  const { withLoading } = useAsyncLoad();
  const t = (key) => getTranslation(language, key);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await withLoading(async () => {
        const response = await loginUser(formData.email, formData.password);
        
        // Update auth context immediately
        login(response.user, response.token);
        
        toast({
          title: t('loginSuccess'),
          description: '',
        });

        router.push('/dashboard');
      }, 'Logging in...');
    } catch (error) {
      console.error('Login error:', error);
      
      // Check if user is not validated
      if (error.response?.data?.error?.includes('validé') || 
          error.response?.data?.error?.includes('validated')) {
        toast({
          title: t('accountNotValidated'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('loginError'),
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl">{t('login')}</CardTitle>
        <CardDescription>{t('heroSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="password">{t('passwordLabel')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={t('passwordLabel')}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('loginButton')}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {t('dontHaveAccount')}{' '}
            <Link href="/register" className="text-hero hover:underline font-medium">
              {t('register')}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
