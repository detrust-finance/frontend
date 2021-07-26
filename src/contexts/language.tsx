import React from 'react'
import i18n from '../i18n'
import { defaultLanguage } from '../constants'
import { LanguageContextProps } from './interfaces'

export const LanguageContext = React.createContext<LanguageContextProps>({
  language: defaultLanguage,
})

const LanguageContextProvider: React.FC = ({ children }) => {
  const { language } = React.useContext(LanguageContext)
  const [currentLanguage, setCurrentLanguage] = React.useState<any>(language)

  React.useEffect(() => {
    const result = window.localStorage.getItem('i18nextLng')
    if (!result) {
      i18n.changeLanguage(defaultLanguage)
      setCurrentLanguage(defaultLanguage)
      return
    }

    setCurrentLanguage(result?.substring(0, 2))
    i18n.changeLanguage(result?.substring(0, 2))
  }, [])

  const changeLanguage = React.useCallback(code => {
    i18n.changeLanguage(code?.substring(0, 2))
    setCurrentLanguage(code?.substring(0, 2))
    window.localStorage.setItem('i18nextLng', code?.substring(0, 2))
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        language: currentLanguage,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContextProvider
