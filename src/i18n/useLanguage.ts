import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from './languageContextDef';

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
