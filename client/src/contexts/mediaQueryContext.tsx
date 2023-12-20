'use client'

import { createContext } from 'react'
import { ContextProvider } from './languageContext'
import { TargetProps, useMediaQuery } from '@/hooks/useMediaQuery'

type MediaQueryContextType = TargetProps

export const MediaQueryContext = createContext<MediaQueryContextType>(
  {} as MediaQueryContextType,
)

export function MediaQueryProvider({ children }: ContextProvider) {
  const mediumSizeMediaQuery = 768
  const { isDesktop, position } = useMediaQuery(mediumSizeMediaQuery)

  return (
    <MediaQueryContext.Provider value={{ isDesktop, position }}>
      {children}
    </MediaQueryContext.Provider>
  )
}
