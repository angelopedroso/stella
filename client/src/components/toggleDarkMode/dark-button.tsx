'use client'

import { Moon, Sun } from 'lucide-react'
import { Toggle } from '../ui/toggle'
import { useDarkMode } from './hooks/toggle.hook'

export function ToggleDarkMode() {
  const { checked, handleToggle } = useDarkMode()

  return (
    <Toggle
      aria-label="Dark mode"
      onPressedChange={handleToggle}
      pressed={checked}
    >
      {checked ? <Moon /> : <Sun />}
    </Toggle>
  )
}
