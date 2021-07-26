import { Box } from 'rebass/styled-components'
import styled from 'styled-components'

import { SpacerBoxProps } from './interfaces'

export const SpacerBox = styled(Box)<SpacerBoxProps>`
  width: ${({ theme, size }) => (size ? size : theme.spacer.sm)};
  height: ${({ theme, size }) => (size ? size : theme.spacer.sm)};
`
