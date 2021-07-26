import { useContext } from 'react'
import { ResponsiveContext } from '../contexts'

const useResponsive = (): any => {
  const responsive = useContext(ResponsiveContext)

  return responsive
}

export default useResponsive
