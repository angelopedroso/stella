import { ErrorIcon } from '@/components/animations/not-found/error-icon'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center px-4 md:px-0">
      <div className="flex flex-col items-center justify-center gap-4">
        <ErrorIcon />
        <div className="-mt-10 flex flex-col items-center justify-center">
          <h1 className="text-center text-lg font-bold text-slate-900 dark:text-slate-300 md:text-2xl">
            Oops! It looks like you are in an unfamiliar place.
          </h1>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 md:text-lg">
            Turn around and go back home!
          </p>
        </div>
        <Link
          href="/"
          className="w-fit rounded-lg bg-primary px-5 py-3 text-slate-100 transition-colors hover:bg-primary/80"
        >
          Go to home
        </Link>
      </div>
    </main>
  )
}
