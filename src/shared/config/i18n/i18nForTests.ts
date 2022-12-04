import i18nWithTests from 'i18next';
import { initReactI18next } from 'react-i18next';

i18nWithTests
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },
        resources: { ru: { translations: {} } },
    });

export default i18nWithTests;
