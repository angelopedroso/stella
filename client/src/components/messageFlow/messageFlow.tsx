'use client'

import { useMessage } from './hooks/useMessage'

export function MessageFlow() {
  const { messages, socket, messageRef } = useMessage()

  return (
    <div className="flex w-full flex-1 flex-col gap-4 overflow-y-auto rounded-t-lg bg-background p-2 md:border md:border-b-0 md:p-4">
      {messages.map((message, index) => {
        return message?.user ? (
          <span
            className="mx-auto rounded-lg bg-secondary px-2 py-1 text-sm font-semibold text-gray-500"
            key={index}
            ref={messageRef}
          >
            Guest {message?.event === 'joined' ? 'entered' : 'left'}
          </span>
        ) : (
          <div
            data-from={message?.from === socket?.id}
            className="w-fit max-w-[70%] self-start break-words rounded-xl bg-secondary px-5 py-4 data-[from=true]:self-end data-[from=true]:bg-primary data-[from=true]:text-white"
            key={index}
            ref={messageRef}
          >
            <p>{message?.text}</p>
          </div>
        )
      })}
    </div>
  )
}
