import styled from 'styled-components'
import { Box } from 'rebass/styled-components'
import { rem } from 'polished'

const iconHeight = rem('16px')
const iconWidth = rem('16px')

export const Smile = styled(Box)`
  height: calc(${iconHeight} / 2);
  width: calc(${iconWidth} / 2);
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.green[200]};
`
export const Sad = styled(Box)`
  height: calc(${iconHeight} / 2);
  width: calc(${iconWidth} / 2);
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.red[200]};
`
