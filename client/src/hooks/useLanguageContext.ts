import { LanguageContext } from '@/contexts/languageContext'
import { useContext } from 'react'

export function useLanguageContext() {
  const { userConfig, setUserConfig } = useContext(LanguageContext)

  return {
    userConfig,
    setUserConfig,
  }
}
