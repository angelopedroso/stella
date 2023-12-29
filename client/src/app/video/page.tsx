import { MediaQueryProvider } from '@/contexts/mediaQueryContext'
import { MessageProvider } from '@/contexts/messageContext'

import { ChatVideo } from '@/components/video/chat'
import { VideoScreen } from '@/components/video/screen'

export default function VoiceChatRoom() {
  return (
    <MessageProvider>
      <MediaQueryProvider>
        <main className="relative flex h-full flex-col justify-center gap-4 rounded-lg lg:flex-row lg:border lg:p-4">
          <VideoScreen />
          <ChatVideo />
        </main>
      </MediaQueryProvider>
    </MessageProvider>
  )
}
