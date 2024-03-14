import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import azJSON from './translations/az.json';
import enJSON from './translations/en.json';

/**
 * The current layout language.
 * 
 * This variable represents the language used for the layout of the application.
 * It is retrieved from the local storage and defaults to 'az' if not found.
 * 
 * @type {string}
 */
const currentLayoutLanguage: string =
  localStorage.getItem('currentLayoutLanguage') || 'az'; // Default to 'az' if not found

i18n.use(initReactI18next).init({
  resources: {
    az: { ...azJSON },
    en: { ...enJSON }
  },
  lng: currentLayoutLanguage
});
