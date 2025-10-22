import { FC } from 'react';

interface RegisterFormStep2Props {
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
  onBack: () => void;
}

declare const RegisterFormStep2: FC<RegisterFormStep2Props>;
export default RegisterFormStep2;
