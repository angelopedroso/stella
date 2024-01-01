import { useState, useEffect } from 'react'
import { useSocket, useLanguageContext } from '@/hooks'

export function useTotalUsers() {
  const socketURL = `${process.env.NEXT_PUBLIC_DATABASE_URL}`
  const socket = useSocket(socketURL)

  const { setSocket } = useLanguageContext()

  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    socket?.on('total-users', setTotalUsers)
    setSocket(socket)
  }, [socket, setSocket])

  return { totalUsers }
}
