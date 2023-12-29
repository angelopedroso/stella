import { HomeIcon } from '@/assets/spoken-icon-home'
import { HomeForm } from '@/components/forms/home/home-form'
import { HomeText } from '@/components/homeText'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between lg:flex-row">
      <div className="flex max-w-4xl flex-col items-start justify-center gap-4">
        <h2 className="text-4xl font-bold md:max-w-4xl md:text-7xl">
          Reveal your Fluency
        </h2>

        <HomeText />

        <HomeForm />
      </div>
      <div className="flex items-center justify-center lg:min-w-[30rem] lg:justify-end">
        <HomeIcon />
      </div>
    </main>
  )
}
