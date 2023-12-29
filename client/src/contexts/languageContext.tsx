'use client'

import { Language } from '@/components/forms/home/hooks/useHomeForm'
import { ReactNode, createContext, useState } from 'react'
import { Socket } from 'socket.io-client'

export type ContextProvider = {
  children: ReactNode
}

type Room = { id: string; isOwner: boolean }

type Context = {
  userConfig: Language
  setUserConfig: (data: Language) => void
  setRoom: (room: Room) => void
  setSocket: (socket: Socket | undefined) => void
  socket: Socket | undefined
  room: Room
  handleSetNewMessage: (message: string) => void
  skipped: boolean
  setSkipped: (skipped: boolean) => void
  addGuestStream: (stream: MediaStream) => void
  guestStream: MediaStream
  addMyStream: (stream: MediaStream) => void
  myStream: MediaStream
}

export const LanguageContext = createContext<Context>({} as Context)

export function LanguageProvider({ children }: ContextProvider) {
  const [userConfig, setUserConfig] = useState<Language>({} as Language)
  const [room, setRoom] = useState<Room>({} as Room)
  const [socket, setSocket] = useState<Socket | undefined>()
  const [skipped, setSkipped] = useState<boolean>(false)
  const [guestStream, setGuestStream] = useState<MediaStream>({} as MediaStream)
  const [myStream, setMyStream] = useState<MediaStream>({} as MediaStream)

  function addGuestStream(stream: MediaStream) {
    setGuestStream(stream)
  }

  function addMyStream(stream: MediaStream) {
    setMyStream(stream)
  }

  function handleSetNewMessage(message: string) {
    socket?.emit('add-message', {
      text: message,
      roomId: room.id,
    })
  }

  return (
    <LanguageContext.Provider
      value={{
        setUserConfig,
        handleSetNewMessage,
        setRoom,
        setSocket,
        setSkipped,
        addGuestStream,
        addMyStream,
        userConfig,
        room,
        socket,
        skipped,
        guestStream,
        myStream,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
