import { React } from '@ungap/global-this'
import { BoxProps } from 'rebass/styled-components'

export interface ModalProps extends BoxProps {
  title?: string
  onDismiss?: any
  hideClose?: boolean
  image?: {
    src: string
    width: string | number
    height: string | number
  }
  headerWithBackground?: any
}

export interface ModalsContextProps {
  content?: React.ReactNode
  isOpen?: boolean
  onPresent: (content: React.ReactNode, opts?: any) => void
  onDismiss: () => void
}

export interface ModalsProps {
  children: React.ReactNode
  options?: any
}
