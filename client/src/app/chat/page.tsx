import { MessageBox } from '@/components/messageBox/messageBox'

export default function TextChatRoom() {
  return (
    <main className="-mx-8 flex flex-1 flex-col items-center justify-between overflow-hidden rounded-lg sm:-mx-14 md:justify-center md:border md:p-4 lg:mx-auto lg:w-3/5">
      <MessageBox />
    </main>
  )
}
