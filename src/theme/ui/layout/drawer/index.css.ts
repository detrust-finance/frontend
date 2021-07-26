import styled from 'styled-components'
import { X, Icon as IconProps } from 'react-feather'
import { rem } from 'polished'

export const CloseIcon = styled<IconProps>(X)`
  position: absolute;
  width: ${rem('22px')};
  height: ${rem('22px')};
  right: ${rem('30px')};
  top: ${rem('40px')};
`
