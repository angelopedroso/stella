import { useState, useEffect } from 'react'

import Peer from 'peerjs'
import { useLanguageContext } from '@/hooks'

export function usePeer() {
  const { socket } = useLanguageContext()
  const [me, setMe] = useState<Peer | null>(null)

  const peerURL = `${process.env.NEXT_PUBLIC_PEER_URL}`
  const peerPort = Number(process.env.NEXT_PUBLIC_PEER_PORT)

  useEffect(() => {
    const createPeer = async () => {
      if (socket) {
        const PeerJS = (await import('peerjs')).default

        const peer = new PeerJS(socket.id, {
          host: peerURL,
          port: peerPort,
        })
        setMe(peer)
      }
    }

    createPeer()
  }, [socket])

  return me
}
