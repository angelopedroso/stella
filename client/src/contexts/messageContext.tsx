'use client'

import { Message } from '@/@types/message'
import { useMessage } from '@/hooks/useMessage'
import { RefObject, createContext } from 'react'
import { Socket } from 'socket.io-client'
import { ContextProvider } from './languageContext'

export type MessageContextType = {
  messages: (Message | undefined)[]
  socket: Socket | undefined
  messageRef: RefObject<HTMLDivElement>
  roomSlot: number
}

export const MessageContext = createContext<MessageContextType>(
  {} as MessageContextType,
)

export function MessageProvider({ children }: ContextProvider) {
  const messageObj = useMessage()

  return (
    <MessageContext.Provider value={messageObj}>
      {children}
    </MessageContext.Provider>
  )
}
