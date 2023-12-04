'use client'

import { Language } from '@/components/homeForm/hooks/home-form.hook'
import React, { createContext, useState } from 'react'

type Provider = {
  children: React.ReactNode
}

type Context = {
  userConfig: Language
  setUserConfig: (data: Language) => void
}

export const LanguageContext = createContext<Context>({} as Context)

export function LanguageProvider({ children }: Provider) {
  const [userConfig, setUserConfig] = useState<Language>({} as Language)

  return (
    <LanguageContext.Provider value={{ userConfig, setUserConfig }}>
      {children}
    </LanguageContext.Provider>
  )
}
