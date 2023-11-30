import Link from 'next/link'
import { MoveRight } from 'lucide-react'
import { HomeIcon } from '@/assets/spoken-icon-home'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between lg:flex-row">
      <div className="flex flex-col items-start justify-center gap-4">
        <h2 className="text-4xl font-bold md:max-w-4xl md:text-7xl">
          Reveal your Fluency
        </h2>

        <p className="max-w-6xl font-semibold leading-6 text-slate-700 dark:text-slate-300">
          Explore an innovative space where language barriers dissolve in
          engaging experiences. Here, dive into video chats that transcend
          conventional communication, enhancing your skills in different
          languages. Connect with people from around the world and discover a
          unique approach to improving your linguistic abilities. Embark on this
          virtual journey that goes beyond words, boosting your fluency in
          surprising ways.
        </p>

        <Link
          href="/login"
          className="flex items-center gap-2 font-semibold text-violet-400 transition-colors hover:text-violet-500 hover:underline"
        >
          Begin your journey <MoveRight />
        </Link>
      </div>
      <div className="flex items-center justify-end md:w-full">
        <HomeIcon />
      </div>
    </main>
  )
}
