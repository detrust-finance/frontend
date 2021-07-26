import { BoxProps } from 'rebass'

export interface BalanceProps extends BoxProps {
  address: string
  type?: 'wallet' | 'contract'
}
