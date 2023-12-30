'use client'

import Image from 'next/image'
import errorIcon from '@/assets/error-404.svg'
import Lottie from 'react-lottie-player'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function ErrorIcon() {
  const [animationData, setAnimationData] = useState<object>()

  useEffect(() => {
    import('@/assets/error.json').then(setAnimationData)
  }, [])

  if (!animationData)
    return (
      <div className="mb-8 flex h-3/4 w-full justify-center">
        <Skeleton className="h-44 w-[20rem] sm:w-[30rem] md:w-[32rem]" />
      </div>
    )

  return (
    <div className="flex">
      <Image
        className="w-16 sm:w-auto"
        src={errorIcon}
        alt='letter "4" to "404"'
        priority
      />
      <Lottie
        className="h-44 w-44 bg-transparent sm:h-72 sm:w-72"
        animationData={animationData}
        speed={1}
        play
        loop
      />
      <Image
        className="w-16 sm:w-auto"
        src={errorIcon}
        alt='letter "4" to "404"'
        priority
      />
    </div>
  )
}
