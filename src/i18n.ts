import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
//import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import commonEN from './locales/en/common'
import commonCN from './locales/cn/common'
import homeEN from './locales/en/home'
import homeCN from './locales/cn/home'
import dashboardEN from './locales/en/dashboard'
import dashboardCN from './locales/cn/dashboard'
import walletEN from './locales/en/wallet'
import walletCN from './locales/cn/wallet'

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources: {
      en: {
        common: commonEN,
        home: homeEN,
        dashboard: dashboardEN,
        wallet: walletEN,
      },
      cn: {
        common: commonCN,
        home: homeCN,
        dashboard: dashboardCN,
        wallet: walletCN,
      },
    },
    react: {
      useSuspense: true,
    },

    ns: ['common', 'home', 'dashboard', 'wallet'],
    defaultNS: 'common',
    nonExplicitSupportedLngs: true,
    supportedLngs: ['en', 'cn'],
    fallbackLng: 'en',
    preload: ['en', 'en'],
    keySeparator: false,
    interpolation: { escapeValue: false },
    debug: false,
  })

export default i18n
