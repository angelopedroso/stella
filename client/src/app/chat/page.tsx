import { ChatPage } from '@/components/chat/box'
import { MessageProvider } from '@/contexts/messageContext'

export default function TextChatRoom() {
  return (
    <MessageProvider>
      <ChatPage />
    </MessageProvider>
  )
}
