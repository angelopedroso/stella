import { useContext } from 'react'

import { StreamContext } from '@/contexts/streamContext'

export function useStreamContext() {
  const stream = useContext(StreamContext)

  return { ...stream }
}
