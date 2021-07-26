import { BoxProps } from 'rebass/styled-components'

export interface DropdownProps extends BoxProps {
  buttonComponent: React.ReactNode
  menuComponent: React.ReactNode
  trigger?: 'hover' | 'click'
  menuStyle?: object
}
