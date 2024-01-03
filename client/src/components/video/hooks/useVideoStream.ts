import { useState, useCallback, useEffect, RefObject } from 'react'

import { useStreamContext } from '@/hooks/useStreamContext'

export function useVideoStream(video: RefObject<HTMLVideoElement>) {
  const { addMyStream, setHasVideo } = useStreamContext()

  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isPermissionGranted, setPermissionGranted] = useState(false)

  const getStream = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()

      const hasVideo = devices.find((device) => device.kind === 'videoinput')

      const constraints: MediaStreamConstraints = {
        audio: {
          autoGainControl: false,
          echoCancellation: false,
          noiseSuppression: false,
          channelCount: 2,
          sampleRate: 48000,
          sampleSize: 16,
        },
        video: !!hasVideo,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      setStream(stream)
      addMyStream(stream)
      setPermissionGranted(true)
      setHasVideo(!!hasVideo)

      if (video.current) {
        video.current.srcObject = stream
      }
    } catch (error) {
      if (error instanceof DOMException) {
        console.error(error)
      }
    }
  }, [addMyStream, setHasVideo, video])

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      getStream()
    }
  }, [])

  return { stream, isPermissionGranted }
}
