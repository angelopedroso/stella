'use client'

import { useMessageContext } from '@/hooks/useMessageContext'

export function MessageFlow() {
  const { messages, socket, messageRef, roomSlot } = useMessageContext()
  const maxUsersInRoom = 2

  return (
    <>
      {/* Users quantity logged into room */}
      <div className="flex w-full items-center gap-2 border-b px-1 pb-2 md:border-none">
        <div
          data-slot={roomSlot !== maxUsersInRoom}
          className="h-3 w-3 rounded-full bg-green-500 data-[slot=true]:bg-red-500"
        />
        <p className="text-slate-600">
          {roomSlot}/{maxUsersInRoom}
        </p>
      </div>
      {/* Messages chat */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-background p-1">
        {messages.map((message, index) => {
          return message?.user ? (
            <span
              className="mx-auto rounded-lg bg-secondary px-2 py-1 text-sm font-semibold text-gray-500"
              key={index}
              ref={messageRef}
            >
              Guest {message?.event}
            </span>
          ) : (
            <div
              data-from={message?.from === socket?.id}
              className="w-fit max-w-[70%] self-start break-words rounded-xl bg-secondary px-5 py-4 data-[from=true]:self-end data-[from=true]:bg-primary data-[from=true]:text-white"
              key={index}
              ref={messageRef}
            >
              <p className="tracking-wide">{message?.text}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
