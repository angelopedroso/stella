import { MediaQueryContext } from '@/contexts/mediaQueryContext'
import { useContext } from 'react'

export function useMediaQueryContext() {
  const mediaQueryCtx = useContext(MediaQueryContext)

  return { ...mediaQueryCtx }
}
