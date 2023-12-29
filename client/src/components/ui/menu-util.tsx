import React, { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react'
import { Button } from './button'

import * as TogglePrimitive from '@radix-ui/react-toggle'
import { Toggle } from './toggle'
import { twMerge } from 'tailwind-merge'

export type MenuUtilsProps = {
  variant?: 'mobile' | 'desktop'
  children: ReactNode
}

type MenuUtilsButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

type MenuUtilsToggleProps = {
  children: ReactNode
} & ComponentProps<typeof TogglePrimitive.Root>

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
  const buttonStyle = twMerge(
    'h-12 w-12 rounded-none hover:bg-primary/60',
    props.className,
  )

  return (
    <Button variant="ghost" className={buttonStyle} {...props}>
      {children}
    </Button>
  )
}

export function MenuUtilsToggle({ children, ...props }: MenuUtilsToggleProps) {
  const toggleStyle = twMerge(
    'h-12 w-12 rounded-none px-4 py-2 hover:bg-primary/40 hover:text-foreground data-[state=on]:bg-primary/60',
    props.className,
  )

  return (
    <Toggle className={toggleStyle} {...props}>
      {children}
    </Toggle>
  )
}
