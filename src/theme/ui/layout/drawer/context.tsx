import React from 'react'
import { Flex, Box } from 'rebass/styled-components'
// Hooks
import { useTheme } from '../../../../hooks'
import { CloseIcon } from '../drawer/index.css'
// Interfaces
import { DrawerContextProps } from './interfaces'

export const Context = React.createContext<DrawerContextProps>({
  onPresent: () => null,
  onDismiss: () => null,
})

const DrawerContextProvider: React.FC = ({ children }) => {
  const { variants, colors } = useTheme()
  const [left, setLeft] = React.useState<string>(variants.drawer.left)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [content, setContent] = React.useState<React.ReactNode>()

  const handlePresent = React.useCallback(
    (modalContent: React.ReactNode) => {
      setContent(modalContent)
      setLeft('0')
      setIsOpen(true)
    },
    [setContent],
  )

  const handleDismiss = React.useCallback(() => {
    setContent(undefined)
    setLeft(variants.drawer.left)
    setIsOpen(false)
  }, [variants.drawer.left])

  return (
    <Context.Provider
      value={{
        content,
        left,
        isOpen,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {isOpen && (
        <>
          <Flex
            alignItems='center'
            justifyContent='center'
            sx={{
              // visibility: isOpen ? 'visible' : 'hidden',
              visibility: 'visible',
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: isOpen ? 260 : 0,
              zIndex: 997,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <Box
              onClick={handleDismiss}
              backgroundColor={colors.blue[500]}
              sx={{
                position: 'absolute',
                backdropFilter: 'blur(2px)',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
          </Flex>
          <Box
            sx={{
              '.nav-wrapper': {
                zIndex: 1000,
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                height: '100%',
              },
            }}
          >
            <Flex variant='drawer'>
              <CloseIcon
                cursor='pointer'
                color={colors.blue[500]}
                onClick={handleDismiss}
              />
              {React.isValidElement(content) &&
                React.cloneElement(content, {
                  onDismiss: handleDismiss,
                })}
            </Flex>
          </Box>
        </>
      )}
    </Context.Provider>
  )
}

export default DrawerContextProvider
