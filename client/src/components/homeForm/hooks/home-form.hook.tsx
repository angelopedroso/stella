import { server } from '@/lib/websocket'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const languageSchema = z.object({
  learn: z.string().min(1, 'Please, choose a language to learn'),
  native: z.string().min(1, 'Please, choose your native language'),
})

type Language = z.infer<typeof languageSchema>

export function useLanguageForm() {
  const form = useForm<Language>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      learn: '',
      native: '',
    },
  })

  function handleFormSubmit(data: Language) {
    server.emit('enter-chat-room', data)
  }

  return { form, handleFormSubmit }
}
