'use client'

import { ReactNode, createContext, useState } from 'react'

export type ContextProvider = {
  children: ReactNode
}

type Context = {
  addGuestStream: (stream: MediaStream) => void
  guestStream: MediaStream
  addMyStream: (stream: MediaStream) => void
  myStream: MediaStream
}

export const StreamContext = createContext<Context>({} as Context)

export function StreamProvider({ children }: ContextProvider) {
  const [guestStream, setGuestStream] = useState<MediaStream>({} as MediaStream)
  const [myStream, setMyStream] = useState<MediaStream>({} as MediaStream)

  function addGuestStream(stream: MediaStream) {
    setGuestStream(stream)
  }

  function addMyStream(stream: MediaStream) {
    setMyStream(stream)
  }

  return (
    <StreamContext.Provider
      value={{
        addGuestStream,
        addMyStream,
        guestStream,
        myStream,
      }}
    >
      {children}
    </StreamContext.Provider>
  )
}
