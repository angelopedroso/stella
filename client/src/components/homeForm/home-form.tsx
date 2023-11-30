'use client'

import ReactFlagsSelect from 'react-flags-select'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useLanguageForm } from './hooks/home-form.hook'
import { Button } from '../ui/button'
import { MoveRight } from 'lucide-react'

export function HomeForm() {
  const { form, handleFormSubmit } = useLanguageForm()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col items-start justify-center gap-4"
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
                    placeholder="Select your country"
                    searchable
                    className="menu-flags w-64"
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          variant="link"
          className="flex items-center gap-2 p-0 text-base font-semibold text-violet-400 transition-colors hover:text-violet-500 hover:underline"
          type="submit"
        >
          Begin your journey <MoveRight />
        </Button>
      </form>
    </Form>
  )
}
