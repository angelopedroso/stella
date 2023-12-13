'use client'

import TextareaAutosize from 'react-textarea-autosize'
import { useChatForm } from './hooks/useChatForm'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { ChatMenu } from './chat-menu'

export function ChatBoxForm() {
  const { form, handleFormSubmit, onEnterPress } = useChatForm()

  return (
    <div className="flex w-full items-center justify-center border-t bg-background pt-4 md:border-none md:pt-0">
      <div className="flex w-full items-center justify-center gap-4 rounded-b-lg bg-background px-4 sm:px-0 md:border md:px-16 md:py-8">
        <ChatMenu />
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
                  className="h-full w-full resize-none rounded-md border-none bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  maxRows={6}
                  onKeyDown={(e) => onEnterPress(e)}
                  aria-label="Input to typing text"
                  {...field}
                />
              )}
            />
            <Button type="submit" variant="ghost" aria-label="Send message">
              <Send size={20} />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
