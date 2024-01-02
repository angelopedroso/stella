'use client'

import ReactFlagsSelect from 'react-flags-select'
import { MessageSquare, MoveRight, Video } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useLanguageForm } from './hooks/useHomeForm'
import { countries } from '@/lib/global'

export function HomeForm() {
  const { form, handleFormSubmit } = useLanguageForm()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col items-start justify-center gap-4"
        id="lang"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="native"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ReactFlagsSelect
                    onSelect={field.onChange}
                    selected={field.value}
                    placeholder="Select your native language"
                    searchable
                    className="menu-flags w-72"
                    countries={countries.codes}
                    customLabels={countries.label}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="learn"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ReactFlagsSelect
                    onSelect={field.onChange}
                    selected={field.value}
                    placeholder="Select a language"
                    searchable
                    className="menu-flags w-64"
                    countries={countries.codes}
                    customLabels={countries.label}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Dialog>
          <DialogTrigger
            className="flex items-center gap-2 p-0 text-base font-semibold text-primary transition-colors disabled:cursor-not-allowed [&:not(:disabled)]:hover:text-primary/80 [&:not(:disabled)]:hover:underline"
            disabled={!form.formState.isValid}
            aria-label="Button to open type of chat dialog"
          >
            Begin your journey <MoveRight />
          </DialogTrigger>
          <DialogContent className="border-0 bg-transparent py-24 sm:border sm:bg-background">
            <div className="flex items-center justify-evenly">
              <Button
                type="submit"
                onClick={() => form.setValue('type', 'chat')}
                form="lang"
                variant="secondary"
                className="flex h-32 w-32 flex-col justify-center gap-2 p-4"
                aria-label="Button to choose text chat."
              >
                <MessageSquare size={36} />
                <span>Text chat</span>
              </Button>
              <Button
                type="submit"
                onClick={() => form.setValue('type', 'video')}
                form="lang"
                className="flex h-32 w-32 flex-col justify-center gap-2 p-4"
                aria-label="Button to choose voice chat."
              >
                <Video size={36} />
                <span>Voice chat</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  )
}
