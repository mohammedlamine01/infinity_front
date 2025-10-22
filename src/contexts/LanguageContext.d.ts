import { ReactNode } from 'react';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function useLanguage(): LanguageContextType;
export function LanguageProvider({ children }: { children: ReactNode }): JSX.Element;
