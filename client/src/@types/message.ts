export type Message = {
  text: string
  from: string
  event: 'joined' | 'left'
  user: string
}
