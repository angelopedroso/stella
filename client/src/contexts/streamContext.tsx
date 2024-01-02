'use client'

import { MediaConnection } from 'peerjs'
import { ReactNode, createContext, useState } from 'react'

export type ContextProvider = {
  children: ReactNode
}

type Context = {
  addGuestStream: (stream: MediaStream) => void
  guestStream: MediaStream
  addMyStream: (stream: MediaStream) => void
  myStream: MediaStream
  addSignal: (call: MediaConnection) => void
  callSignal: MediaConnection | undefined
  setHasVideo: (value: boolean) => void
  hasVideo: boolean
}

export const StreamContext = createContext<Context>({} as Context)

export function StreamProvider({ children }: ContextProvider) {
  const [guestStream, setGuestStream] = useState<MediaStream>({} as MediaStream)
  const [myStream, setMyStream] = useState<MediaStream>({} as MediaStream)
  const [callSignal, setCallSignal] = useState<MediaConnection>()
  const [hasVideo, setHasVideo] = useState<boolean>(true)

  function addGuestStream(stream: MediaStream) {
    setGuestStream(stream)
  }

  function addMyStream(stream: MediaStream) {
    setMyStream(stream)
  }

  function addSignal(call: MediaConnection) {
    setCallSignal(call)
  }

  return (
    <StreamContext.Provider
      value={{
        addGuestStream,
        addMyStream,
        addSignal,
        setHasVideo,
        guestStream,
        myStream,
        callSignal,
        hasVideo,
      }}
    >
      {children}
    </StreamContext.Provider>
  )
}
