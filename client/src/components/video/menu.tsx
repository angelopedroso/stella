'use client'

import Sheet from 'react-modal-sheet'

import { useChatMenu } from '../forms/chatBox/hooks/useChatMenu'
import { MessageContextType } from '@/contexts/messageContext'

import { MenuUtils, MenuUtilsButton } from '@/components/ui/menu-util'
import { MessageBox } from '@/components/messageBox'

import { LogOut, MessageSquare, SkipForward } from 'lucide-react'

export interface VideoMenuProps {
  context: MessageContextType
}

export function VideoMenu({ context }: VideoMenuProps) {
  const { handleExitChat, handleSkipChat, isOpen, openModal } = useChatMenu()

  return (
    <>
      <MenuUtils variant="mobile">
        <MenuUtilsButton onClick={handleExitChat}>
          <LogOut />
        </MenuUtilsButton>
        <MenuUtilsButton onClick={openModal}>
          <MessageSquare />
        </MenuUtilsButton>
        <MenuUtilsButton onClick={handleSkipChat}>
          <SkipForward />
        </MenuUtilsButton>
      </MenuUtils>
      <Sheet isOpen={isOpen} onClose={openModal}>
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
