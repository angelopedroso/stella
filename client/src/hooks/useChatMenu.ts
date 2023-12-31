import { useLanguageContext } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useStreamContext } from './useStreamContext'

type GuestOptionsProps = {
  micStatus: boolean
  camStatus: boolean
}

export function useChatMenu() {
  const { socket, userConfig, setSkipped, room } = useLanguageContext()
  const { guestStream, myStream, callSignal, hasVideo } = useStreamContext()

  const [isOpen, setIsOpen] = useState(false)

  const [checkedMic, setCheckedMic] = useState(false)
  const [checkedVideo, setCheckedVideo] = useState(false)

  const [guestOptions, setGuestOptions] = useState<GuestOptionsProps>(
    {} as GuestOptionsProps,
  )

  const { push } = useRouter()

  function handleExitChat() {
    if (callSignal) {
      callSignal.close()
    }
    push('/')
  }

  function handleSkipChat() {
    setSkipped(true)
    socket?.emit('skip-chat-room', userConfig)
  }

  function openModal() {
    setIsOpen((prev) => !prev)
  }

  const toggleCamera = useCallback(
    (camStatus: boolean) => {
      if (guestStream) {
        const tracks = guestStream.getVideoTracks()
        if (tracks.length > 0) {
          tracks[0].enabled = !camStatus
          setGuestOptions((prev) => {
            return { ...prev, camStatus: !camStatus }
          })
        }
      }
    },
    [guestStream],
  )

  function handleToggleMic() {
    setCheckedMic((prev) => !prev)

    const data = {
      roomId: room.id,
      micStatus: !checkedMic,
    }

    socket?.emit('video-menu-mic', data)
  }

  function handleToggleVideo() {
    setCheckedVideo((prev) => !prev)

    const data = {
      roomId: room.id,
      camStatus: !checkedVideo,
    }

    if (myStream) {
      const tracks = myStream.getVideoTracks()
      if (tracks.length > 0) {
        tracks[0].enabled = !data.camStatus
      }
    }

    socket?.emit('video-menu-cam', data)
  }

  useEffect(() => {
    socket?.on('video-menu-mic', (status) =>
      setGuestOptions((prev) => {
        return { ...prev, micStatus: status }
      }),
    )

    socket?.on('video-menu-cam', toggleCamera)

    socket?.on('user-disconnected-videochat', () => {
      setCheckedMic(false)
      setCheckedVideo(false)

      setGuestOptions({ micStatus: false, camStatus: false })

      try {
        if (myStream && hasVideo) {
          const videoTrack = myStream
            ?.getTracks()
            .find((track) => track.kind === 'video')

          if (videoTrack) {
            videoTrack.enabled = true
          }
        }
      } catch (error) {
        console.error("❌ - You haven't got a video cam")
      }
    })

    return () => {
      socket?.off('video-menu-mic')
      socket?.off('video-menu-cam')
    }
  }, [myStream, toggleCamera])

  return {
    handleExitChat,
    handleSkipChat,
    handleToggleMic,
    handleToggleVideo,
    openModal,
    isOpen,
    checkedMic,
    checkedVideo,
    guestOptions,
    hasVideo,
  }
}
