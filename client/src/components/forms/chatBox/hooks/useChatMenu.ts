import { useLanguageContext } from '@/hooks'
import { useRouter } from 'next/navigation'

export function useChatMenu() {
  const { socket, userConfig, setSkipped } = useLanguageContext()
  const { push } = useRouter()

  function handleExitChat() {
    push('/')
  }

  function handleSkipChat() {
    setSkipped(true)
    socket?.emit('skip-chat-room', userConfig)
  }

  return {
    handleExitChat,
    handleSkipChat,
  }
}
