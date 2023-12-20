import { useState, useCallback, useEffect } from 'react'

type TargetProps = {
  isDesktop: boolean
  position?: { x: number; y: number }
}

export function useMediaQuery(width: number) {
  const [targetReached, setTargetReached] = useState<TargetProps>(
    {} as TargetProps,
  )

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached({ isDesktop: true, position: { x: 0, y: 0 } })
    } else {
      setTargetReached({ isDesktop: false })
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${width}px)`)

    media.addEventListener('change', (e) => updateTarget(e))

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached({ isDesktop: true, position: { x: 0, y: 0 } })
    }

    return () => media.removeEventListener('change', (e) => updateTarget(e))
  }, [updateTarget, width])

  return targetReached
}
