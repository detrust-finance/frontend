import { BoxProps } from 'rebass/styled-components'

export interface DrawerProps extends BoxProps {
  onDismiss?: any
}

export interface DrawerContextProps {
  content?: React.ReactNode
  left?: string
  isOpen?: boolean
  onPresent: (content: React.ReactNode) => void
  onDismiss: () => void
}
