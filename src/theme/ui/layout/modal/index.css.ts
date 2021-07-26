import styled from 'styled-components'
import { X, Icon as IconProps } from 'react-feather'
import { rem } from 'polished'

export const CloseIcon = styled<IconProps>(X)<{
  top?: any
  right?: any
  color?: any
}>`
  position: absolute;
  width: ${rem('22px')};
  height: ${rem('22px')};
  right: ${({ right }) => (right ? right : rem('30px'))};
  top: ${({ top }) => (top ? top : 'calc(50% - 11px)')};
  color: ${({ color }) => color};
`
