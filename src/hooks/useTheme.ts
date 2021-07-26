import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

const useTheme = (): any => {
  const theme = useContext(ThemeContext)

  return theme
}

export default useTheme
