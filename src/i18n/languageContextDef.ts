import { createContext } from 'react';
import type { Lang } from './translations';

type Translations = Record<string, string>;

export interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);
