'use client'

import { useMediaQueryContext } from '@/hooks/useMediaQueryContext'
import Draggable from 'react-draggable'
import { useVideo } from './hooks/useVideo'

export function VideoScreen() {
  const { isDesktop, position } = useMediaQueryContext()
  const { myVideoRef, guestVideoRef } = useVideo()

  return (
    <div className="relative flex h-full flex-col gap-4 md:h-72 md:flex-row-reverse md:justify-center lg:h-full lg:flex-col">
      <video
        autoPlay
        playsInline
        className="w-full grow rounded-lg border object-cover"
        ref={guestVideoRef}
      />
      <Draggable
        bounds="parent"
        disabled={isDesktop}
        position={position}
        nodeRef={myVideoRef}
      >
        <video
          autoPlay
          playsInline
          className="absolute right-2 top-2 h-32 w-24 grow rounded-lg border object-cover md:static md:w-full"
          ref={myVideoRef}
          muted
        />
      </Draggable>
    </div>
  )
}
