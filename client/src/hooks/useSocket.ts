import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

export function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const socketIo = io(url)

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }
    return cleanup
  }, [])

  return socket
}
