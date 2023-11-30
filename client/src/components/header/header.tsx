import Image from 'next/image'
import { ToggleDarkMode } from '../toggleDarkMode/dark-button'
import Logo from '@/assets/StellaLogo.png'

export function Header() {
  return (
    <header className="flex items-center justify-between pb-8">
      <div className="flex items-center justify-center">
        <Image src={Logo} alt="logo" width={56} height={56} />
        <h1 className="-ml-3.5 text-xl font-bold tracking-normal">tella</h1>
      </div>
      <div className="flex gap-2">
        <ToggleDarkMode />
      </div>
    </header>
  )
}
