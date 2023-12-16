import Image from 'next/image'
import { ToggleDarkMode } from '../toggleDarkMode/dark-button'
import Logo from '@/assets/logo.png'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex items-center justify-between pb-8">
      <Link href="/" className="cursor-pointer">
        <Image src={Logo} alt="logo" width={56} height={56} objectFit="cover" />
      </Link>
      <div className="flex gap-2">
        <ToggleDarkMode />
      </div>
    </header>
  )
}
