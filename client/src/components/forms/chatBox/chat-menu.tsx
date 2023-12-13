'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Menu, LogOut, SkipForward } from 'lucide-react'
import { useChatMenu } from './hooks/useChatMenu'

export function ChatMenu() {
  const { handleExitChat, handleSkipChat } = useChatMenu()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="sm:hidden"
            aria-label="Menu chat button"
          >
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="flex justify-evenly gap-2"
        >
          <DropdownMenuItem
            className="flex flex-col items-center justify-center gap-1 text-xs"
            aria-label="Leave button"
            onClick={handleExitChat}
          >
            <LogOut className="h-6 w-6 text-primary" />
            Leave
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-col items-center justify-center gap-1 text-xs"
            aria-label="Skip user button"
            onClick={handleSkipChat}
          >
            <SkipForward className="h-6 w-6 text-primary" />
            Skip
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden gap-2 sm:flex">
        <Button
          aria-label="Leave the room"
          variant="ghost"
          onClick={handleExitChat}
        >
          <LogOut size={20} />
        </Button>
        <Button aria-label="Skip user" variant="ghost" onClick={handleSkipChat}>
          <SkipForward size={20} className="text-primary" />
        </Button>
      </div>
    </>
  )
}
