import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './utils/en.json';
import hi from './utils/hi.json';
import french from './utils/french.json'

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: en,
        hi: hi,
        french: french
    },
    interpolation: {
        escapeValue: false
    }
});

export default i18n;