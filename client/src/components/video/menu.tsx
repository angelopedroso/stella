'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, MessageSquare, SkipForward } from 'lucide-react'
import Sheet from 'react-modal-sheet'
import { MessageBox } from '../messageBox'
import { useChatMenu } from '../forms/chatBox/hooks/useChatMenu'
import { MessageContextType } from '@/contexts/messageContext'

export interface VideoMenuProps {
  context: MessageContextType
}

export function VideoMenu({ context }: VideoMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { handleExitChat, handleSkipChat } = useChatMenu()

  return (
    <>
      <div className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-white/30 backdrop-blur-sm md:hidden">
        <Button
          variant="ghost"
          className="h-12 w-12 rounded-none hover:bg-primary/60"
          onClick={handleExitChat}
        >
          <LogOut />
        </Button>
        <Button
          variant="ghost"
          className="h-12 w-12 rounded-none hover:bg-primary/60"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare />
        </Button>
        <Button
          variant="ghost"
          className="h-12 w-12 rounded-none hover:bg-primary/60"
          onClick={handleSkipChat}
        >
          <SkipForward />
        </Button>
      </div>
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Sheet.Container>
          <Sheet.Header className="bg-background" />
          <Sheet.Content className="bg-background py-2">
            <MessageBox context={context} />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}
