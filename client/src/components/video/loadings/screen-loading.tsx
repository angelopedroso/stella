import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export function VideoScreenLoading() {
  return (
    <div className="relative flex h-full flex-col gap-4 md:h-72 md:flex-row-reverse md:justify-center lg:h-full lg:flex-col">
      <Skeleton
        className="w-full grow rounded-lg border"
        aria-label="Guest video cam"
      />
      <Skeleton
        className="absolute right-2 top-2 h-32 w-24 grow overflow-hidden rounded-lg border md:static md:h-auto md:w-full"
        aria-label="Your video cam"
      />
    </div>
  )
}
