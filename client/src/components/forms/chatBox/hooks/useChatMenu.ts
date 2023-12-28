import { useLanguageContext } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useChatMenu() {
  const { socket, userConfig, setSkipped } = useLanguageContext()
  const [isOpen, setIsOpen] = useState(false)

  const { push } = useRouter()

  function handleExitChat() {
    push('/')
  }

  function handleSkipChat() {
    setSkipped(true)
    socket?.emit('skip-chat-room', userConfig)
  }

  function openModal() {
    setIsOpen((prev) => !prev)
  }

  return {
    handleExitChat,
    handleSkipChat,
    openModal,
    isOpen,
  }
}
