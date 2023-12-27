/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguageContext } from '@/hooks'

import Peer from 'peerjs'

type IPeerParams = {
  peerId: string
  roomId: string
}

export function useVideo() {
  const { socket, room } = useLanguageContext()
  const [me, setMe] = useState<Peer>()
  const [stream, setStream] = useState<MediaStream>()

  const myVideoRef = useRef<HTMLVideoElement>(null)
  const guestVideoRef = useRef<HTMLVideoElement>(null)

  const getStream = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined') {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            autoGainControl: false,
            channelCount: 2,
            echoCancellation: false,
            noiseSuppression: false,
            sampleRate: 48000,
            sampleSize: 16,
          },
        })

        setStream(stream)

        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream
        }
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (socket) {
      const peer = new Peer(socket.id, {
        host: 'localhost',
        port: 9001,
        path: '/peer',
      })

      setMe(peer)

      getStream()
    }
  }, [socket])

  useEffect(() => {
    if (!me || !room) return

    socket?.emit('video-chat-join', {
      roomId: room.id,
      peerId: me?.id,
    } as IPeerParams)
  }, [room])

  useEffect(() => {
    if (!me || !stream) return

    socket?.on('video-answer', ({ peerId }: IPeerParams) => {
      const call = me.call(peerId, stream, {
        sdpTransform: (sdp: string) => {
          return sdp.replace(
            'a=fmtp:111 minptime=10;useinbandfec=1',
            'a=fmtp:111 ptime=5;useinbandfec=1;stereo=1;maxplaybackrate=48000;maxaveragebitrat=128000;sprop-stereo=1',
          )
        },
      })

      call.on('stream', (guestStream) => {
        if (guestVideoRef.current) {
          guestVideoRef.current.srcObject = guestStream
        }
      })
    })

    me.on('call', (call) => {
      call.answer(stream)

      call.on('stream', (guestStream) => {
        if (guestVideoRef.current) {
          guestVideoRef.current.srcObject = guestStream
        }
      })
    })
  }, [me, stream, socket])

  return {
    myVideoRef,
    guestVideoRef,
    me,
  }
}
