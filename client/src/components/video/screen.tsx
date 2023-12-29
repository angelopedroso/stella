'use client'

import Draggable from 'react-draggable'

import { useVideo } from './hooks/useVideo'
import { useChatMenu, useMediaQueryContext } from '@/hooks'

import { MenuUtils, MenuUtilsToggle } from '@/components/ui/menu-util'

import { Loader2, Mic, MicOff, Video, VideoOff } from 'lucide-react'

export function VideoScreen() {
  const { isDesktop, position } = useMediaQueryContext()
  const { myVideoRef, guestVideoRef, isSearching } = useVideo()
  const {
    checkedMic,
    handleToggleMic,
    checkedVideo,
    handleToggleVideo,
    guestOptions,
  } = useChatMenu()

  return (
    <div className="relative flex h-full flex-col gap-4 md:h-72 md:flex-row-reverse md:justify-center lg:h-full lg:flex-col">
      {!isSearching ? (
        <video
          autoPlay
          playsInline
          className="w-full grow rounded-lg border object-cover"
          ref={guestVideoRef}
          aria-label="Guest video cam"
          muted={guestOptions?.micStatus}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="flex w-full grow flex-col items-center justify-center rounded-lg border text-secondary">
          <Loader2 className="h-1/2 w-1/2 animate-spin" />
        </div>
      )}

      <Draggable
        bounds="parent"
        disabled={isDesktop}
        position={position}
        nodeRef={myVideoRef}
      >
        <div className="absolute right-2 top-2 h-32 w-24 grow overflow-hidden rounded-lg border md:static md:h-auto md:w-full">
          <video
            autoPlay
            playsInline
            className="h-full object-cover"
            ref={myVideoRef}
            aria-label="Your video cam"
            muted
          />
          <MenuUtils>
            <MenuUtilsToggle
              aria-label="Mic toggle button"
              onPressedChange={handleToggleMic}
            >
              {checkedMic ? <MicOff /> : <Mic />}
            </MenuUtilsToggle>
            <MenuUtilsToggle
              aria-label="Video toggle button"
              onPressedChange={handleToggleVideo}
            >
              {checkedVideo ? <VideoOff /> : <Video />}
            </MenuUtilsToggle>
          </MenuUtils>
        </div>
      </Draggable>
    </div>
  )
}
