import React from 'react';
import { motion } from 'motion/react';
import { Globe, DollarSign, Moon, Sun, Check } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const { language, currency, theme, setLanguage, setCurrency, setTheme, t } = useSettings();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'es', name: 'Español' },
  ];

  const currencies = [
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Preferences</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4">{t('settings')}</h1>
          <p className="text-lg text-[var(--text-primary)]/60">Customize your experience on the Coachly platform.</p>
        </motion.div>

        <div className="space-y-8">
          {/* Language Selection */}
          <section className="glass-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime">
                <Globe size={20} />
              </div>
              <h2 className="text-xl font-black">{t('language')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                    language === lang.code 
                      ? 'border-brand-lime bg-brand-lime/5 text-brand-lime' 
                      : 'border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]/60 hover:border-[var(--text-primary)]/20'
                  }`}
                >
                  <span className="font-bold">{lang.name}</span>
                  {language === lang.code && <Check size={16} />}
                </button>
              ))}
            </div>
          </section>

          {/* Currency Selection */}
          <section className="glass-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime">
                <DollarSign size={20} />
              </div>
              <h2 className="text-xl font-black">{t('currency')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setCurrency(curr.code as any)}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                    currency === curr.code 
                      ? 'border-brand-lime bg-brand-lime/5 text-brand-lime' 
                      : 'border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]/60 hover:border-[var(--text-primary)]/20'
                  }`}
                >
                  <span className="font-bold">{curr.code}</span>
                  {currency === curr.code && <Check size={16} />}
                </button>
              ))}
            </div>
          </section>

          {/* Theme Selection */}
          <section className="glass-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <h2 className="text-xl font-black">{t('theme')}</h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 p-6 rounded-xl border transition-all flex flex-col items-center gap-3 ${
                  theme === 'light' 
                    ? 'border-brand-lime bg-brand-lime/5 text-brand-lime' 
                    : 'border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]/60 hover:border-[var(--text-primary)]/20'
                }`}
              >
                <Sun size={24} />
                <span className="font-bold uppercase tracking-widest text-xs">{t('light')}</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 p-6 rounded-xl border transition-all flex flex-col items-center gap-3 ${
                  theme === 'dark' 
                    ? 'border-brand-lime bg-brand-lime/5 text-brand-lime' 
                    : 'border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]/60 hover:border-[var(--text-primary)]/20'
                }`}
              >
                <Moon size={24} />
                <span className="font-bold uppercase tracking-widest text-xs">{t('dark')}</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
