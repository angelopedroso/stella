import { KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useLanguageContext } from '@/hooks'

import { z } from 'zod'

const messageSchema = z.object({
  message: z.string().min(1, 'Please, type something.'),
})

export type Message = z.infer<typeof messageSchema>

export function useChatForm() {
  const form = useForm<Message>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  })
  const { handleSetNewMessage } = useLanguageContext()

  function onEnterPress(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      form.handleSubmit(handleFormSubmit)()
    }
  }

  function handleFormSubmit(data: Message) {
    handleSetNewMessage(data.message)

    form.reset()
    form.setFocus('message')
  }

  return {
    form,
    handleFormSubmit,
    onEnterPress,
  }
}
