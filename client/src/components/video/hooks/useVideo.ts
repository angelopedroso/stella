/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguageContext } from '@/hooks'

import { MediaConnection } from 'peerjs'
import { useStreamContext } from '@/hooks/useStreamContext'
import { useVideoStream } from './useVideoStream'
import { usePeer } from './usePeer'

type IPeerParams = {
  peerId: string
  roomId: string
}

export function useVideo() {
  const { socket, room, skipped, setSkipped } = useLanguageContext()
  const { addGuestStream, addSignal, callSignal, guestStream } =
    useStreamContext()

  const myVideoRef = useRef<HTMLVideoElement>(null)
  const guestVideoRef = useRef<HTMLVideoElement>(null)

  const { stream, isPermissionGranted } = useVideoStream(myVideoRef)
  const me = usePeer()

  const [isSearching, setSearching] = useState(true)

  const removePeer = useCallback(
    (call?: MediaConnection) => {
      setSearching(true)
      if (call) {
        call.close()
      }
    },
    [setSearching],
  )

  const handleStreamEvents = (call: MediaConnection) => {
    call.on('stream', (guestStream) => {
      setSearching(false)
      addSignal(call)
      addGuestStream(guestStream)
    })
  }

  const handleVideoAnswer = useCallback(
    ({ peerId }: IPeerParams) => {
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

      try {
        const call = me!.call(peerId, stream!, options)
        handleStreamEvents(call)
      } catch (error) {
        console.log(error)
      }
    },
    [me, stream, handleStreamEvents],
  )

  useEffect(() => {
    if (!me || !room || !isPermissionGranted) return

    socket?.emit('video-chat-join', {
      roomId: room.id,
      peerId: me?.id,
    } as IPeerParams)
  }, [me, room, isPermissionGranted])

  useEffect(() => {
    if (!me || !stream) return

    socket?.on('video-answer', handleVideoAnswer)

    me.on('call', (call) => {
      call.answer(stream, {
        sdpTransform: (sdp: string) => {
          return sdp.replace(
            'a=fmtp:111 minptime=10;useinbandfec=1',
            'a=fmtp:111 ptime=5;useinbandfec=1;stereo=1;maxplaybackrate=48000;maxaveragebitrat=128000;sprop-stereo=1',
          )
        },
      })

      handleStreamEvents(call)
    })
  }, [me, stream, socket, handleVideoAnswer])

  useEffect(() => {
    if (skipped) {
      removePeer(callSignal)
      setSkipped(false)
    }

    const handleUserDisconnected = () => {
      removePeer(callSignal)
    }

    socket?.on('user-disconnected-videochat', handleUserDisconnected)

    return () => {
      socket?.off('user-disconnected-videochat', handleUserDisconnected)
    }
  }, [skipped, callSignal, removePeer])

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
