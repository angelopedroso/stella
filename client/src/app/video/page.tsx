import { MediaQueryProvider } from '@/contexts/mediaQueryContext'
import { MessageProvider } from '@/contexts/messageContext'
import { StreamProvider } from '@/contexts/streamContext'

import { ChatVideo } from '@/components/video/chat'
import { Suspense } from 'react'
import { VideoScreenLoading } from '@/components/video/loadings/screen-loading'
import { VideoScreen } from '@/components/video/screen'

export default function VoiceChatRoom() {
  return (
    <MessageProvider>
      <MediaQueryProvider>
        <StreamProvider>
          <main className="relative flex h-full flex-col justify-center gap-4 rounded-lg lg:flex-row lg:border lg:p-4">
            <Suspense fallback={<VideoScreenLoading />}>
              <VideoScreen />
            </Suspense>
            <ChatVideo />
          </main>
        </StreamProvider>
      </MediaQueryProvider>
    </MessageProvider>
  )
}
