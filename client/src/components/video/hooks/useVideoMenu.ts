import { useLanguageContext } from '@/hooks'
import { useCallback, useEffect, useState } from 'react'

type GuestOptionsProps = {
  micStatus: boolean
  camStatus: boolean
}

export function useVideoMenu(guestStream?: MediaStream) {
  const { room, socket } = useLanguageContext()

  const [checkedMic, setCheckedMic] = useState(false)
  const [checkedVideo, setCheckedVideo] = useState(false)

  const [guestOptions, setGuestOptions] = useState<GuestOptionsProps>(
    {} as GuestOptionsProps,
  )

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

    socket?.emit('video-menu-cam', data)
  }

  useEffect(() => {
    socket?.on('video-menu-mic', (status) =>
      setGuestOptions((prev) => {
        return { ...prev, micStatus: status }
      }),
    )
    socket?.on('video-menu-cam', toggleCamera)

    return () => {
      socket?.off('video-menu-mic')
      socket?.off('video-menu-cam')
    }
  }, [socket, toggleCamera])

  return {
    checkedMic,
    checkedVideo,
    handleToggleMic,
    handleToggleVideo,
    guestOptions,
  }
}
