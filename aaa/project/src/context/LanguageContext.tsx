import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations } from '../translations';

export type Language = 'uz' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Browser tilini aniqlash
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'uz' || browserLang === 'ru' || browserLang === 'en') {
      return browserLang as Language;
    }
    return 'uz'; // Default til
  };

  // Local storage dan tilni olish yoki browser tilini ishlatish
  const getInitialLanguage = (): Language => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'uz' || savedLang === 'ru' || savedLang === 'en')) {
      return savedLang as Language;
    }
    return getBrowserLanguage();
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  // Initial language setup
  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguage(initialLang);
  }, []);

  const t = (section: string, key: string): string => {
    return (translations[language] as any)?.[section]?.[key] || `${section}.${key}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 