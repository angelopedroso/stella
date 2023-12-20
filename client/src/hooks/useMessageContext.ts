import { MessageContext } from '@/contexts/messageContext'
import { useContext } from 'react'

export function useMessageContext() {
  const messageCtx = useContext(MessageContext)

  return { ...messageCtx }
}
