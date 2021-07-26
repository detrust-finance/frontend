import React from 'react'
import { Flex, Box } from 'rebass/styled-components'
// Hooks
import { useTheme } from '../../../../hooks'
// Interfaces
import { ModalsContextProps } from './interfaces'

export const Context = React.createContext<ModalsContextProps>({
  onPresent: () => null,
  onDismiss: () => null,
})

const Modals: React.FC = ({ children }) => {
  const { colors } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [content, setContent] = React.useState<React.ReactNode>()
  const [options, setOptions] = React.useState({ hideClose: false })

  const handlePresent = React.useCallback(
    (
      modalContent: React.ReactNode,
      opts: { hideClose: boolean } | undefined,
    ) => {
      setContent(modalContent)
      setIsOpen(true)
      if (opts) {
        setOptions({ ...opts })
      }
    },
    [setContent, setIsOpen],
  )

  const handleDismiss = React.useCallback(() => {
    setContent(undefined)
    setIsOpen(false)
    setOptions({ hideClose: false })
  }, [setContent, setIsOpen])

  return (
    <Context.Provider
      value={{
        content,
        isOpen,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {isOpen && (
        <Flex
          alignItems='center'
          justifyContent='center'
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 999,
          }}
        >
          <Box
            onClick={!options.hideClose ? handleDismiss : () => {}}
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
          {React.isValidElement(content) &&
            React.cloneElement(content, {
              onDismiss: handleDismiss,
              hideClose: options.hideClose,
            })}
        </Flex>
      )}
    </Context.Provider>
  )
}

export default Modals
