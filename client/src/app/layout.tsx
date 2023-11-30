import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { ThemeProvider } from '@/providers/theme.provider'
import { Header } from '@/components/header/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stella',
  description: 'Improve your speaking and listening skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex h-screen flex-col px-8 py-4 sm:px-14 sm:py-5 md:px-20 md:py-8`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
