'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'
import Lottie from 'react-lottie-player'

export function HomeIcon() {
  const [animationData, setAnimationData] = useState<object>()

  useEffect(() => {
    import('@/assets/home.json').then(setAnimationData)
  }, [])

  if (!animationData)
    return (
      <div className="flex h-full w-full justify-center pt-4 md:pt-0">
        <Skeleton className="h-80 w-80 sm:h-[25rem] sm:w-[25rem]" />
      </div>
    )

  return (
    <Lottie
      className="h-full w-full"
      animationData={animationData}
      loop
      play
      speed={1}
    />
  )
}
