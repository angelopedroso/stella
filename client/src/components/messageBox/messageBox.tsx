import { ChatBoxForm } from '../forms/chatBox/chatBox-form'
import { MessageFlow } from '../messageFlow/messageFlow'

export function MessageBox() {
  return (
    <>
      <MessageFlow />
      <ChatBoxForm />
    </>
  )
}
