import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { Button } from './button'

export type MenuUtilsProps = {
  variant?: 'mobile' | 'desktop'
  children: ReactNode
}

type MenuUtilsButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function MenuUtils({ children, variant = 'desktop' }: MenuUtilsProps) {
  const isMobile = variant === 'mobile'

  return (
    <div
      data-mobile={isMobile}
      className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-white/30 backdrop-blur-sm data-[mobile=false]:hidden data-[mobile=false]:md:flex data-[mobile=true]:md:hidden"
    >
      {children}
    </div>
  )
}

export function MenuUtilsButton({ children, ...props }: MenuUtilsButtonProps) {
  return (
    <Button
      variant="ghost"
      className="h-12 w-12 rounded-none hover:bg-primary/60"
      {...props}
    >
      {children}
    </Button>
  )
}
