import { Message } from '@/@types/message'
import { useLanguageContext, useSocket } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'

export function useMessage() {
  const { userConfig, setRoom, setSocket, setSkipped, skipped } =
    useLanguageContext()
  const socket = useSocket('http://localhost:8001')

  const [messages, setMessages] = useState<Partial<Message[]>>([])

  const { push } = useRouter()

  const messageRef = useRef<HTMLDivElement>(null)

  const handleChatRoomEntered = useCallback(
    (room: string) => setRoom(room),
    [setRoom],
  )
  const handleMessage = useCallback(
    (message: Message) => setMessages((prev) => [...prev, message]),
    [setMessages],
  )
  const handleUsersChanged = useCallback(
    (user: Message) => setMessages((prev) => [...prev, user]),
    [setMessages],
  )

  useEffect(() => {
    if (!userConfig.native) {
      push('/')
      return
    }

    if (skipped) {
      setMessages([])
      setSkipped(false)
    }

    socket?.emit('enter-chat-room', {
      native: userConfig.native,
      learn: userConfig.learn,
    })

    socket?.on('chat-room-entered', handleChatRoomEntered)
    socket?.on('message', handleMessage)
    socket?.on('users-changed', handleUsersChanged)

    setSocket(socket)

    return () => {
      socket?.off('message')
      socket?.off('chat-room-entered')
      socket?.off('users-changed')
    }
  }, [
    handleChatRoomEntered,
    handleMessage,
    handleUsersChanged,
    push,
    setSkipped,
    setSocket,
    skipped,
    socket,
    userConfig,
  ])

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return {
    messages,
    socket,
    messageRef,
  }
}
