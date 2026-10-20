import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'es';
type Currency = 'AED' | 'USD' | 'EUR';
type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  currency: Currency;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
  formatPrice: (amount: number) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    settings: 'Settings',
    language: 'Language',
    currency: 'Currency',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    save: 'Save Changes',
    home: 'Home',
    programs: 'Programs',
    pricing: 'Pricing',
    reviews: 'Reviews',
    bookNow: 'Book Now',
    coach: 'Coach',
    aboutCoach: 'About Coachly',
    pathway: 'Pathway',
    philosophy: 'Philosophy',
    curriculum: 'Curriculum',
    drills: 'Drills',
  },
  ar: {
    settings: 'الإعدادات',
    language: 'اللغة',
    currency: 'العملة',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    save: 'حفظ التغييرات',
    home: 'الرئيسية',
    programs: 'البرامج',
    pricing: 'الأسعار',
    reviews: 'التقييمات',
    bookNow: 'احجز الآن',
    coach: 'المدرب',
    aboutCoach: 'عن كوتشلي',
    pathway: 'المسار',
    philosophy: 'الفلسفة',
    curriculum: 'المنهج',
    drills: 'التمارين',
  },
  es: {
    settings: 'Ajustes',
    language: 'Idioma',
    currency: 'Moneda',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    save: 'Guardar Cambios',
    home: 'Inicio',
    programs: 'Programas',
    pricing: 'Precios',
    reviews: 'Reseñas',
    bookNow: 'Reservar',
    coach: 'Entrenador',
    aboutCoach: 'Sobre Coachly',
    pathway: 'Camino',
    philosophy: 'Filosofía',
    curriculum: 'Currículo',
    drills: 'Ejercicios',
  }
};

const exchangeRates: Record<Currency, number> = {
  AED: 1,
  USD: 0.27,
  EUR: 0.25,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [currency, setCurrency] = useState<Currency>(() => (localStorage.getItem('curr') as Currency) || 'AED');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');

  useEffect(() => {
    localStorage.setItem('lang', language);
    localStorage.setItem('curr', currency);
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, currency, theme]);

  const t = (key: string) => translations[language][key] || key;

  const formatPrice = (amount: number) => {
    const converted = amount * exchangeRates[currency];
    return `${converted.toLocaleString()} ${currency}`;
  };

  return (
    <SettingsContext.Provider value={{ language, currency, theme, setLanguage, setCurrency, setTheme, t, formatPrice }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
