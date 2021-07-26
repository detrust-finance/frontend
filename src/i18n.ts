import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
//import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import commonEN from './locales/en/common'
import commonCN from './locales/cn/common'
import yourAccountEN from './locales/en/your-account'
import yourAccountCN from './locales/cn/your-account'
import walletEN from './locales/en/wallet'
import walletCN from './locales/cn/wallet'

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources: {
      en: {
        common: commonEN,
        yourAccount: yourAccountEN,
        wallet: walletEN,
      },
      cn: {
        common: commonCN,
        yourAccount: yourAccountCN,
        wallet: walletCN,
      },
    },
    react: {
      useSuspense: true,
    },

    ns: ['common', 'yourAccount', 'wallet'],
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
