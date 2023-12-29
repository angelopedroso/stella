'use client'

import { useChatForm } from './hooks/useChatForm'

import TextareaAutosize from 'react-textarea-autosize'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { MessageBoxProps } from '@/components/messageBox'
import { ChatMenu } from './chat-menu'

import { Send } from 'lucide-react'

type ChatBoxFormProps = Omit<MessageBoxProps, 'context'>

export function ChatBoxForm({ hasMenu = false }: ChatBoxFormProps) {
  const { form, handleFormSubmit, onEnterPress } = useChatForm()

  return (
    <div className="w-full border-t pt-4 md:border-none md:pt-0">
      <div className="flex items-center justify-center gap-4 rounded-lg px-2 md:border md:px-4 md:py-2 lg:px-16 lg:py-8">
        {hasMenu && <ChatMenu />}

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
