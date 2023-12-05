import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

  function handleFormSubmit(data: Message) {
    console.log(data)

    form.setFocus('message', { shouldSelect: true })
  }

  return {
    form,
    handleFormSubmit,
  }
}
