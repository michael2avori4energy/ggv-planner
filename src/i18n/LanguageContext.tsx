import React, { useState } from 'react';
import { type Lang, translations } from './translations';
import { LanguageContext } from './languageContextDef';

const detectBrowserLang = (): Lang => {
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();
  return browserLang === 'de' ? 'de' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(detectBrowserLang);
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
};
