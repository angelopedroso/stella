/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguageContext } from '@/hooks'

import Peer from 'peerjs'

type IPeerParams = {
  peerId: string
  roomId: string
}

export function useVideo() {
  const { socket, room, addGuestStream, addMyStream } = useLanguageContext()

  const [me, setMe] = useState<Peer>()

  const [guestStream, setGuestStream] = useState<MediaStream>()
  const [stream, setStream] = useState<MediaStream>()
  const [isSearching, setSearching] = useState(true)
  const [isPermissionGranted, setPermissionGranted] = useState(false)

  const myVideoRef = useRef<HTMLVideoElement>(null)
  const guestVideoRef = useRef<HTMLVideoElement>(null)

  const peerURL = `${process.env.NEXT_PUBLIC_DATABASE_URL}`
  const peerPort = Number(process.env.NEXT_PUBLIC_PEER_PORT)

  const getStream = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()

      const hasVideo = devices.find((device) => device.kind === 'videoinput')

      const constraints: MediaStreamConstraints = {
        audio: {
          autoGainControl: false,
          channelCount: 2,
          echoCancellation: false,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
        },
        video: !!hasVideo,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      setStream(stream)
      addMyStream(stream)
      setPermissionGranted(true)

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream
      }
    } catch (error) {
      if (error instanceof DOMException) {
        console.error(error)
      }
    }
  }, [])

  function removePeer() {
    setSearching(true)
    guestStream?.getTracks().forEach((track) => track.stop())
  }

  useEffect(() => {
    if (socket) {
      const fn = async () => {
        const PeerJS = (await import('peerjs')).default

        const peer = new PeerJS(socket.id, {
          host: peerURL,
          port: peerPort,
          path: '/peer',
        })

        setMe(peer)
      }

      fn()

      if (typeof navigator !== 'undefined') {
        getStream()
      }

      socket.on('video-leave', removePeer)
    }
  }, [socket])

  useEffect(() => {
    if (!me || !room || !isPermissionGranted || !stream) return

    socket?.emit('video-chat-join', {
      roomId: room.id,
      peerId: me?.id,
    } as IPeerParams)
  }, [room, isPermissionGranted, stream])

  useEffect(() => {
    if (!me || !stream) return

    setSearching(true)

    socket?.on('video-answer', ({ peerId }: IPeerParams) => {
      const call = me.call(peerId, stream, {
        sdpTransform: (sdp: string) => {
          return sdp.replace(
            'a=fmtp:111 minptime=10;useinbandfec=1',
            'a=fmtp:111 ptime=5;useinbandfec=1;stereo=1;maxplaybackrate=48000;maxaveragebitrat=128000;sprop-stereo=1',
          )
        },
      })

      setSearching(false)

      call.on('stream', (guestStream) => {
        if (guestVideoRef.current) {
          guestVideoRef.current.srcObject = guestStream
          setGuestStream(guestStream)
          addGuestStream(guestStream)
        }
      })
    })

    me.on('call', (call) => {
      call.answer(stream)

      setSearching(false)

      call.on('stream', (guestStream) => {
        if (guestVideoRef.current) {
          guestVideoRef.current.srcObject = guestStream
          setGuestStream(guestStream)
          addGuestStream(guestStream)
        }
      })
    })
  }, [me, stream, socket])

  return {
    myVideoRef,
    guestVideoRef,
    isSearching,
    guestStream,
  }
}
