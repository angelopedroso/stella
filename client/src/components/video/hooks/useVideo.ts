/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguageContext } from '@/hooks'

import Peer from 'peerjs'
import { useStreamContext } from '@/hooks/useStreamContext'

type IPeerParams = {
  peerId: string
  roomId: string
}

export function useVideo() {
  const { socket, room } = useLanguageContext()
  const { addGuestStream, addMyStream } = useStreamContext()

  const [me, setMe] = useState<Peer>()

  const [guestStream, setGuestStream] = useState<MediaStream>()
  const [stream, setStream] = useState<MediaStream>()
  const [isSearching, setSearching] = useState(true)
  const [isPermissionGranted, setPermissionGranted] = useState(false)

  const myVideoRef = useRef<HTMLVideoElement>(null)
  const guestVideoRef = useRef<HTMLVideoElement>(null)

  const peerURL = `${process.env.NEXT_PUBLIC_PEER_URL}`
  const peerPort = Number(process.env.NEXT_PUBLIC_PEER_PORT)

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
        })

        setMe(peer)
      }

      fn()

      if (typeof navigator !== 'undefined') {
        getStream()
      }

      socket.on('users-changed', (data) => {
        if (data.event === 'left') {
          removePeer()
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!me || !room || !isPermissionGranted) return

    socket?.emit('video-chat-join', {
      roomId: room.id,
      peerId: me?.id,
    } as IPeerParams)
  }, [me, room, isPermissionGranted])

  useEffect(() => {
    if (!me || !stream) return

    socket?.on('video-answer', ({ peerId }: IPeerParams) => {
      const options = {
        constraints: {
          mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
          },
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1,
        },
        sdpTransform: (sdp: string) => {
          return sdp.replace(
            'a=fmtp:111 minptime=10;useinbandfec=1',
            'a=fmtp:111 ptime=5;useinbandfec=1;stereo=1;maxplaybackrate=48000;maxaveragebitrat=128000;sprop-stereo=1',
          )
        },
      }

      const call = me.call(peerId, stream, options)

      call.on('stream', (guestStream) => {
        setSearching(false)
        setGuestStream(guestStream)
        addGuestStream(guestStream)
      })
    })

    me.on('call', (call) => {
      call.answer(stream, {
        sdpTransform: (sdp: string) => {
          return sdp.replace(
            'a=fmtp:111 minptime=10;useinbandfec=1',
            'a=fmtp:111 ptime=5;useinbandfec=1;stereo=1;maxplaybackrate=48000;maxaveragebitrat=128000;sprop-stereo=1',
          )
        },
      })

      call.on('stream', (guestStream) => {
        setSearching(false)
        setGuestStream(guestStream)
        addGuestStream(guestStream)
      })
    })

    return () => {
      socket?.off('video-answer')
    }
  }, [me, stream])

  useEffect(() => {
    if (guestVideoRef.current && guestStream) {
      guestVideoRef.current.srcObject = guestStream
    }
  }, [guestVideoRef, guestStream])

  return {
    myVideoRef,
    guestVideoRef,
    isSearching,
    guestStream,
  }
}
