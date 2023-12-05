import { ChatBoxForm } from '@/components/forms/chatBox/chatBox-form'

export default function TextChatRoom() {
  return (
    <main className="-mx-8 flex flex-1 flex-col items-center justify-between overflow-hidden sm:mx-0 md:justify-center">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-t-lg bg-background px-2 sm:px-0 md:w-4/5 md:border md:border-b-0 md:px-16 md:pb-4 md:pt-12">
        <div className="w-11/12 self-end rounded-xl bg-primary px-5 py-4 text-white md:max-w-2xl">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            nam itaque sit sint nisi maxime illum repellendus eveniet hic
            voluptas vitae est consequuntur expedita deserunt aspernatur nostrum
            quasi perspiciatis culpa? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Illum, vitae laboriosam pariatur sint repellendus
            sit, quo corrupti obcaecati est nisi, ullam quos. Recusandae maiores
            obcaecati, magnam inventore earum necessitatibus libero!
          </p>
        </div>
        <div className="w-11/12 self-start rounded-xl bg-secondary px-5 py-4 md:max-w-2xl">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            nam itaque sit sint nisi maxime illum repellendus eveniet hic
            voluptas vitae est consequuntur expedita deserunt aspernatur nostrum
            quasi perspiciatis culpa? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Illum, vitae laboriosam pariatur sint repellendus
            sit, quo corrupti obcaecati est nisi, ullam quos. Recusandae maiores
            obcaecati, magnam inventore earum necessitatibus libero!
          </p>
        </div>
      </div>
      <ChatBoxForm />
    </main>
  )
}
