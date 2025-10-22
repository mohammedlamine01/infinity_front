'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RegisterFormStep1 from '@/components/RegisterFormStep1';
import RegisterFormStep2 from '@/components/RegisterFormStep2';
import { isAuthenticated } from '@/utils/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/i18n';

export default function RegisterPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    id_sp: '', // Specialty ID for API
    bio: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  if (isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/50">
      <div className="w-full max-w-md">
        {step === 1 ? (
          <RegisterFormStep1
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(2)}
          />
        ) : (
          <RegisterFormStep2
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(1)}
          />
        )}

        <div className="text-center mt-4 text-sm text-muted-foreground">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/login" className="text-hero hover:underline font-medium">
            {t('login')}
          </Link>
        </div>
      </div>
    </div>
  );
}
