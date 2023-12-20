import { ChatBoxForm } from '../forms/chatBox/chatBox-form'
import { MessageFlow } from '../messageFlow'

export type MessageBoxProps = {
  hasMenu?: boolean
}

export function MessageBox({ hasMenu = false }: MessageBoxProps) {
  return (
    <>
      <MessageFlow />
      <ChatBoxForm hasMenu={hasMenu} />
    </>
  )
}
