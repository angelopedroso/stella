'use client'

import { MessageBox } from '../messageBox'
import { useMessageContext } from '@/hooks/useMessageContext'

export function ChatPage() {
  const messageCtx = useMessageContext()

  return (
    <main className="-mx-8 flex flex-1 flex-col items-center justify-between rounded-lg sm:-mx-14 md:justify-center md:border md:p-4 lg:mx-auto lg:w-3/5">
      <MessageBox context={messageCtx} hasMenu />
    </main>
  )
}
