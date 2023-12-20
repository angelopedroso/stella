import { Message } from '@/@types/message'
import { useLanguageContext, useSocket } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback, use } from 'react'

export function useMessage() {
  const { userConfig, setRoom, setSocket, setSkipped, skipped } =
    useLanguageContext()

  const socketURL = process.env.NEXT_PUBLIC_DATABASE_URL ?? ''
  const socket = useSocket(socketURL)

  const [messages, setMessages] = useState<Partial<Message[]>>([])
  const [roomSlot, setRoomSlot] = useState<number>(1)

  const messageRef = useRef<HTMLDivElement>(null)
  const { push } = useRouter()

  const handleChatRoomEntered = useCallback(
    (room: string) => setRoom(room),
    [setRoom],
  )
  const handleMessage = useCallback(
    (message: Message) => setMessages((prev) => [...prev, message]),
    [setMessages],
  )
  const handleUsersChanged = useCallback(
    (user: Message) => {
      if (user.event === 'joined') {
        setMessages([])
      }
      setMessages((prev) => [...prev, user])
    },
    [setMessages],
  )
  const handleSlotRoomChanged = useCallback(
    (room: number) => setRoomSlot(room),
    [setRoomSlot],
  )

  useEffect(() => {
    // If the user not defined basic settings
    if (!userConfig.native) {
      push('/')
      return
    }

    // If user clicked on skip button
    if (skipped) {
      setMessages([])
      setSkipped(false)
    }

    // Emit when joined on a room by first time
    socket?.emit('enter-chat-room', {
      native: userConfig.native,
      learn: userConfig.learn,
      type: userConfig.chat,
    })

    socket?.on('chat-room-entered', handleChatRoomEntered)
    socket?.on('message', handleMessage)
    socket?.on('users-changed', handleUsersChanged)
    socket?.on('slot-room-changed', handleSlotRoomChanged)

    setSocket(socket)

    return () => {
      socket?.off('message')
      socket?.off('chat-room-entered')
      socket?.off('users-changed')
      socket?.off('slot-room-changed')
    }
  }, [
    handleChatRoomEntered,
    handleMessage,
    handleUsersChanged,
    handleSlotRoomChanged,
    push,
    setSkipped,
    setSocket,
    skipped,
    socket,
    userConfig,
  ])

  useEffect(() => {
    // Scroll to current message
    messageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return {
    messages,
    socket,
    messageRef,
    roomSlot,
  }
}