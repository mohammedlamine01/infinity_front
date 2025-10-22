import { FC } from 'react';

interface RegisterFormStep1Props {
  formData: {
    name: string;
    email: string;
    phone: string;
    specialty: string;
    bio: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
}

declare const RegisterFormStep1: FC<RegisterFormStep1Props>;
export default RegisterFormStep1;
