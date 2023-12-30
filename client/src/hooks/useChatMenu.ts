import { useLanguageContext } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useStreamContext } from './useStreamContext'
import { Message } from '@/@types/message'

type GuestOptionsProps = {
  micStatus: boolean
  camStatus: boolean
}

export function useChatMenu() {
  const { socket, userConfig, setSkipped, room } = useLanguageContext()
  const { guestStream, myStream } = useStreamContext()

  const [isOpen, setIsOpen] = useState(false)

  const [checkedMic, setCheckedMic] = useState(false)
  const [checkedVideo, setCheckedVideo] = useState(false)

  const [guestOptions, setGuestOptions] = useState<GuestOptionsProps>(
    {} as GuestOptionsProps,
  )

  const { push } = useRouter()

  function handleExitChat() {
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

    socket?.on('users-changed', (user: Message) => {
      if (user.event === 'left') {
        setCheckedMic(false)
        setCheckedVideo(false)
      }
    })

    return () => {
      socket?.off('video-menu-mic')
      socket?.off('video-menu-cam')
    }
  }, [socket, toggleCamera])

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
  }
}
