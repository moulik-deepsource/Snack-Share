import React, { useEffect } from 'react';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import { I18nextProvider } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getLocale } from '../store/app/selectors';

import enUS from './locales/en_US/translation.json';
import viVN from './locales/vi_VN/translation.json';

if (__BROWSER__) {
    i18next.use(i18nextXHRBackend);
}

// i18next.use(__BROWSER__ ? i18nextXHRBackend : {}).init({
i18next.init({
    backend: {
        // for all available options read the backend's repository readme file
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
        // Must be false until Suspense is supported on the server side
        useSuspense: false,
        wait: true,
    },
    debug: process.env.NODE_ENV === 'development' && __BROWSER__,
    fallbackLng: 'en_US',
    fallbackNS: ['translation'],
    // This option is necessary to tell i18next to try loading missing resources via
    // i18next-xhr-backend, otherwise no calls will be made if resources are defined.
    partialBundledLanguages: true,
    resources: {
        en_US: { translation: enUS },
        vi_VN: { translation: viVN },
    },
    parseMissingKeyHandler: (missing: any) => {
        if (process.env.NODE_ENV === 'development' && __BROWSER__) {
            console.warn('MISSING TRANSLATION:', missing);
        }
        return missing;
    },
});

i18next.languages = ['en_US', 'vi_VN'];

const I18N: React.FC<any> = ({ children }) => {
    const locale = useSelector(getLocale);
    useEffect(() => {
        i18next.changeLanguage(locale);
    }, [locale]);

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default React.memo(I18N);
