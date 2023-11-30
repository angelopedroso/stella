import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useDarkMode() {
  const { setTheme, theme } = useTheme()
  const [checked, setChecked] = useState(false)

  function handleToggle() {
    setChecked((prev) => !prev)
    setTheme(checked ? 'dark' : 'light')
  }

  useEffect(() => {
    setChecked(theme !== 'dark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { checked, handleToggle }
}
