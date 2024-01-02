'use client'

import Sheet from 'react-modal-sheet'

import { useChatMenu } from '@/hooks'
import { MessageContextType } from '@/contexts/messageContext'

import {
  MenuUtils,
  MenuUtilsButton,
  MenuUtilsToggle,
} from '@/components/ui/menu-util'
import { MessageBox } from '@/components/messageBox'

import {
  LogOut,
  MessageSquare,
  Mic,
  MicOff,
  SkipForward,
  Video,
  VideoOff,
} from 'lucide-react'

export interface VideoMenuProps {
  context: MessageContextType
}

export function VideoMenu({ context }: VideoMenuProps) {
  const { checkedMic, checkedVideo, hasVideo, ...menu } = useChatMenu()

  return (
    <>
      <MenuUtils variant="mobile">
        <MenuUtilsButton
          aria-label="Exit chat button"
          onClick={menu.handleExitChat}
        >
          <LogOut />
        </MenuUtilsButton>
        <MenuUtilsToggle
          aria-label="Mic toggle button"
          onPressedChange={menu.handleToggleMic}
        >
          {checkedMic ? <MicOff /> : <Mic />}
        </MenuUtilsToggle>
        <MenuUtilsButton aria-label="Open chat button" onClick={menu.openModal}>
          <MessageSquare />
        </MenuUtilsButton>
        <MenuUtilsToggle
          aria-label="Video toggle button"
          onPressedChange={menu.handleToggleVideo}
          disabled={!hasVideo}
        >
          {checkedVideo ? <VideoOff /> : <Video />}
        </MenuUtilsToggle>
        <MenuUtilsButton
          aria-label="Skip chat room button"
          onClick={menu.handleSkipChat}
        >
          <SkipForward />
        </MenuUtilsButton>
      </MenuUtils>
      <Sheet isOpen={menu.isOpen} onClose={menu.openModal}>
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
