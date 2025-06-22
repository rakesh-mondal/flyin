import { useState, useEffect } from 'react';

const LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    // Initialize document direction immediately
    const currentLang = savedLang as 'en' | 'ar';
    document.documentElement.dir = LANGUAGES[currentLang].dir;
    document.documentElement.lang = currentLang;
    
    if (currentLang === 'ar') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    
    return savedLang;
  });

  const changeLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction - THIS AFFECTS ALL PAGES
    document.documentElement.dir = LANGUAGES[lang].dir;
    document.documentElement.lang = lang;
    
    // Add RTL class to body for styling - THIS AFFECTS ALL PAGES
    if (lang === 'ar') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    
    // Force a page reload to ensure all components re-render with new language
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    // Set initial direction on component mount
    const currentLang = language as 'en' | 'ar';
    document.documentElement.dir = LANGUAGES[currentLang].dir;
    document.documentElement.lang = currentLang;
    
    // Add RTL class to body for styling
    if (currentLang === 'ar') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [language]);

  return {
    language,
    changeLanguage,
    isRTL: language === 'ar',
    currentLanguage: LANGUAGES[language as keyof typeof LANGUAGES]
  };
}; 