import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useTheme } from '../hooks'
import { ResponsiveContextProviderProps } from './interfaces'

const initialState = {
  isDesktop: false,
  isLaptop: false,
  isTablet: false,
  isMobile: false,
  isPortrait: false,
}

export const ResponsiveContext =
  React.createContext<ResponsiveContextProviderProps>(initialState)

const ResponsiveContextProvider: React.FC = ({ children }) => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery({
    query: `(min-width: ${breakpoints[0]})`,
  })
  const isTablet = useMediaQuery({
    query: `(min-width: ${breakpoints[1]})`,
  })
  const isLaptop = useMediaQuery({
    query: `(min-width: ${breakpoints[2]})`,
  })
  const isDesktop = useMediaQuery({
    query: `(min-width: ${breakpoints[2]})`,
  })
  const isPortrait = useMediaQuery({
    query: '(orientation: portrait)',
  })

  // console.group('Breakpoints')
  // console.log('isMobile', isMobile)
  // console.log('isTablet', isTablet)
  // console.log('isLaptop', isLaptop)
  // console.log('isDesktop', isDesktop)
  // console.groupEnd()

  return (
    <ResponsiveContext.Provider
      value={{
        isDesktop,
        isLaptop,
        isTablet,
        isMobile,
        isPortrait,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  )
}

export default ResponsiveContextProvider
