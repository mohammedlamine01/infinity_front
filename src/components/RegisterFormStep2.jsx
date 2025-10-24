'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation  } from '@/utils/i18n';
import { registerUser } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function RegisterFormStep2({ formData, setFormData, onBack }) {
  const router = useRouter();
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = (key) => getTranslation(language, key);
  const [loading, setLoading] = useState(false);
  const [specialites, setSpecialites] = useState([]);
  const [loadingSpecialites, setLoadingSpecialites] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  // Fetch specialites on component mount
  useEffect(() => {
    const fetchSpecialites = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await axios.get(`${API_URL}/specialites`);
        setSpecialites(response.data);
      } catch (error) {
        console.error('Error fetching specialites:', error);
        toast({
          title: language === 'ar'
            ? 'فشل في تحميل التخصصات'
            : language === 'fr'
            ? 'Échec du chargement des spécialités'
            : 'Failed to load specialties',
          variant: 'destructive',
        });
      } finally {
        setLoadingSpecialites(false);
      }
    };

    fetchSpecialites();
  }, [language, toast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, id_sp: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = language === 'ar'
        ? 'كلمات المرور غير متطابقة'
        : language === 'fr'
        ? 'Les mots de passe ne correspondent pas'
        : 'Passwords do not match';
      setMessage(errorMsg);
      setMessageType('error');
      toast({
        title: errorMsg,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      // Prepare data according to API requirements
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        id_sp: parseInt(formData.id_sp), // Specialty ID
        password: formData.password,
        password_confirmation: formData.password, // API expects password_confirmation
      };

      const response = await registerUser(registrationData);

      const successMsg = response.message || t('registerSuccess');
      setMessage(successMsg);
      setMessageType('success');

      toast({
        title: t('registerSuccess'),
        description: response.message || '',
      });

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = error.response?.data?.message || error.response?.data?.errors?.email?.[0] || t('registerError');
      
      // If the backend returns "The email has already been taken.", display in current language
      if (errorMessage === "The email has already been taken.") {
        if (language === 'ar') {
          errorMessage = "البريد الإلكتروني مأخوذ بالفعل.";
        } else if (language === 'fr') {
          errorMessage = "L'email a déjà été pris.";
        } else {
          errorMessage = "The email has already been taken.";
        }
      }
      
      setMessage(errorMessage);
      setMessageType('error');
      toast({
        title: t('registerError'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl">{t('register')} - Step 2/2</CardTitle>
        <CardDescription>
          {language === 'ar'
            ? 'معلومات الحساب'
            : language === 'fr'
            ? 'Informations du compte'
            : 'Account information'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert className={`mb-4 ${messageType === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
            {messageType === 'error' ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            <AlertDescription className={messageType === 'error' ? 'text-red-700' : 'text-green-700'}>
              {message}
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id_sp">{t('specialtyLabel')}</Label>
            {loadingSpecialites ? (
              <div className="flex items-center justify-center p-3 border rounded-md">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'جاري التحميل...' : language === 'fr' ? 'Chargement...' : 'Loading...'}
                </span>
              </div>
            ) : (
              <Select value={formData.id_sp} onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder={
                    language === 'ar'
                      ? 'اختر التخصص'
                      : language === 'fr'
                      ? 'Sélectionnez une spécialité'
                      : 'Select a specialty'
                  } />
                </SelectTrigger>
                <SelectContent>
                  {specialites.map((specialite) => (
                    <SelectItem key={specialite.id} value={specialite.id.toString()}>
                      {specialite.nom_sp || specialite.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">{t('bioLabel')}</Label>
            <textarea
              id="bio"
              name="bio"
              placeholder={t('bioLabel')}
              value={formData.bio}
              onChange={handleChange}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('confirmPasswordLabel')}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={t('confirmPasswordLabel')}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              {t('previousStep')}
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('registerButton')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
