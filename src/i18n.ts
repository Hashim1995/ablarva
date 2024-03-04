import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import azJSON from './translations/az.json';
import enJSON from './translations/en.json';

const currentLayoutLanguage =
  localStorage.getItem('currentLayoutLanguage') || 'az'; // Default to 'az' if not found

i18n.use(initReactI18next).init({
  resources: {
    az: { ...azJSON },
    en: { ...enJSON }
  },
  lng: currentLayoutLanguage
});
