import i18n, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationES from './locales/es.json';

const resources: Resource = {
  en: {
    code: 'en',
    name: 'English',
    translation: translationEN,
  },
  es: {
    code: 'es',
    name: 'Español',
    translation: translationES,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['es', 'en'],
    fallbackLng: 'es',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
