'use client'

import { useTotalUsers } from './hooks/useTotalUsers'

export function HomeText() {
  const { totalUsers } = useTotalUsers()

  return (
    <p className="font-semibold leading-6 text-slate-700 dark:text-slate-300">
      Embark on a virtual journey where language barriers dissolve, currently
      connecting with a diverse community of{' '}
      <span className="text-primary">{totalUsers}</span> individuals. Immerse
      yourself in video chats that transcend conventional communication,
      elevating your proficiency in various languages. Engage with people from
      around the world and uncover a distinctive method for enhancing your
      linguistic abilities. Join this evolving experience that transcends words,
      fostering fluency in unexpected ways.
    </p>
  )
}
