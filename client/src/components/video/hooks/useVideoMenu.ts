import { useState } from 'react'

export function useVideoMenu() {
  const [checkedMic, setCheckedMic] = useState(false)
  const [checkedVideo, setCheckedVideo] = useState(false)

  function handleToggleMic() {
    setCheckedMic((prev) => !prev)
  }

  function handleToggleVideo() {
    setCheckedVideo((prev) => !prev)
  }

  return { checkedMic, checkedVideo, handleToggleMic, handleToggleVideo }
}
