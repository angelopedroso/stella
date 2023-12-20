import { MessageContextType } from '@/contexts/messageContext'
import { ChatBoxForm } from '../forms/chatBox/chatBox-form'
import { MessageFlow } from '../messageFlow'

export type MessageBoxProps = {
  hasMenu?: boolean
  context: MessageContextType
}

export function MessageBox({ hasMenu = false, context }: MessageBoxProps) {
  return (
    <>
      <MessageFlow {...context} />
      <ChatBoxForm hasMenu={hasMenu} />
    </>
  )
}
