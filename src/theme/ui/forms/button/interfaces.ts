import { ButtonProps as RebassButtonProps } from 'rebass'
export interface ButtonProps extends RebassButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | null | undefined | string | number
  loading?: boolean
  disabled?: boolean
  children?: React.ReactNode
  newWindow?: boolean
}
