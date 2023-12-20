'use client'

import { useMediaQueryContext } from '@/hooks/useMediaQueryContext'
import { useRef } from 'react'
import Draggable from 'react-draggable'

export function VideoScreen() {
  const { isDesktop, position } = useMediaQueryContext()
  const myVideo = useRef<HTMLVideoElement>(null)

  return (
    <div className="relative flex h-full flex-col gap-4 md:h-72 md:flex-row md:justify-center lg:h-full lg:flex-col">
      <video
        autoPlay
        playsInline
        className="w-full grow rounded-lg border bg-blue-500"
      />
      <Draggable
        bounds="parent"
        disabled={isDesktop}
        position={position}
        nodeRef={myVideo}
      >
        <video
          autoPlay
          playsInline
          className="absolute right-2 top-2 h-32 w-24 grow rounded-lg border bg-red-500 md:static md:h-auto md:w-full"
          ref={myVideo}
        />
      </Draggable>
    </div>
  )
}
