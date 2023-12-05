'use client'

import TextareaAutosize from 'react-textarea-autosize'
import { useChatForm } from './hooks/useChatForm'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { LogOut, Menu, Send, SkipForward } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ChatBoxForm() {
  const { form, handleFormSubmit } = useChatForm()

  return (
    <div className="flex w-full items-center justify-center border-t bg-background pt-4 md:border-none md:pt-0">
      <div className="flex w-full items-center justify-center gap-4 rounded-b-lg bg-background px-4 sm:px-0 md:w-4/5 md:border md:px-16 md:py-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="sm:hidden">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="flex justify-evenly gap-2"
          >
            <DropdownMenuItem className="flex flex-col items-center justify-center gap-1">
              <LogOut className="h-8 w-8 text-primary" />
              Leave
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-center justify-center gap-1">
              <SkipForward className="h-8 w-8 text-primary" />
              Skip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden gap-2 sm:flex">
          <Button aria-label="Leave the room" variant="secondary">
            <LogOut />
          </Button>
          <Button aria-label="Skip user">
            <SkipForward />
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex w-full items-center justify-center gap-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <TextareaAutosize
                  placeholder="Type a message..."
                  className="h-full w-full resize-none rounded-md bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  maxRows={6}
                  {...field}
                />
              )}
            />
            <Button type="submit">
              <Send size={18} fill="white" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
