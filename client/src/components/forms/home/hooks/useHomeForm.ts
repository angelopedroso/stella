import { useLanguageContext } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const languageSchema = z
  .object({
    learn: z.string().min(1, 'Please, choose a language to learn'),
    native: z.string().min(1, 'Please, choose your native language'),
    type: z.enum(['voice', 'text']),
  })
  .refine((data) => data.learn !== data.native, {
    path: ['native'],
    message: 'Native language must be different from learn language',
  })

export type Language = z.infer<typeof languageSchema>

export function useLanguageForm() {
  const form = useForm<Language>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      learn: '',
      native: '',
      type: 'text',
    },
  })

  const { setUserConfig } = useLanguageContext()

  const { push } = useRouter()

  function handleFormSubmit(data: Language) {
    setUserConfig(data)

    if (data.type === 'text') {
      push('/chat')
    } else {
      push('/video')
    }
  }

  return { form, handleFormSubmit }
}
