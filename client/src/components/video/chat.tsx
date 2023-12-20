'use client'

import React from 'react'
import { MessageBox } from '@/components/messageBox'
import { VideoMenu } from './menu'
import { useMessageContext } from '@/hooks/useMessageContext'
import { useMediaQueryContext } from '@/hooks/useMediaQueryContext'

export function ChatVideo() {
  const { isDesktop } = useMediaQueryContext()
  const messageCtx = useMessageContext()

  return (
    <>
      {isDesktop ? (
        <div className="flex h-full flex-1 flex-col items-center justify-between overflow-hidden rounded-lg md:justify-center md:border md:p-4">
          <MessageBox context={messageCtx} hasMenu />
        </div>
      ) : (
        <VideoMenu context={messageCtx} />
      )}
    </>
  )
}
