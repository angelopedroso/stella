'use client'

import { useVideo } from './hooks/useVideo'
import { useChatMenu } from '@/hooks'

import { MenuUtils, MenuUtilsToggle } from '@/components/ui/menu-util'

import { Loader2, Mic, MicOff, Video, VideoOff } from 'lucide-react'

export function VideoScreen() {
  const { myVideoRef, guestVideoRef, isSearching } = useVideo()
  const {
    checkedMic,
    handleToggleMic,
    checkedVideo,
    handleToggleVideo,
    guestOptions,
  } = useChatMenu()

  return (
    <div className="relative flex h-full flex-col gap-4 md:h-72 md:flex-row-reverse md:justify-center lg:h-full lg:max-w-[18.75rem] lg:flex-col">
      {!isSearching ? (
        <div
          data-muted={guestOptions.micStatus}
          className="h-full grow basis-1/2 overflow-hidden rounded-lg border object-cover data-[muted=true]:border-destructive md:w-full"
        >
          <video
            autoPlay
            playsInline
            className="h-full w-full object-cover"
            ref={myVideoRef}
            aria-label="Guest video cam"
            muted={guestOptions.micStatus}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="flex w-full grow basis-1/2 flex-col items-center justify-center rounded-lg border text-secondary">
          <Loader2 className="h-1/2 w-1/2 animate-spin" />
        </div>
      )}

      <div className="absolute right-2 top-2 h-32 w-24 overflow-hidden rounded-lg border md:static md:h-full md:w-full md:basis-1/2">
        <div className="relative h-full w-full bg-background">
          <video
            autoPlay
            playsInline
            className="h-full w-full object-cover"
            ref={myVideoRef}
            aria-label="Your video cam"
            muted
          />
          <MenuUtils>
            <MenuUtilsToggle
              aria-label="Mic toggle button"
              onPressedChange={handleToggleMic}
              pressed={checkedMic}
            >
              {checkedMic ? <MicOff /> : <Mic />}
            </MenuUtilsToggle>
            <MenuUtilsToggle
              aria-label="Video toggle button"
              onPressedChange={handleToggleVideo}
              pressed={checkedVideo}
            >
              {checkedVideo ? <VideoOff /> : <Video />}
            </MenuUtilsToggle>
          </MenuUtils>
        </div>
      </div>
    </div>
  )
}
