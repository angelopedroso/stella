import { LanguageContext } from '@/contexts/languageContext'
import { useContext } from 'react'

export function useLanguageContext() {
  const languageCtx = useContext(LanguageContext)

  return { ...languageCtx }
}
