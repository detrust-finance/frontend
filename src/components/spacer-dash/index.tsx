import React from 'react'
import { Box } from 'rebass/styled-components'
import styled from 'styled-components'
// Components

export interface SpacerDashProps {
  bgColor: string
  width?: number
}

const SpacerDash: React.FC<SpacerDashProps> = ({
  bgColor,
  width = 64,
  ...resprops
}) => {
  return (
    <StyledBox bgColor={bgColor} width={width} height='4px' {...resprops} />
  )
}

const StyledBox = styled(Box)<{ bgColor?: string }>`
  background: ${({ bgColor }) => bgColor};
`

export default SpacerDash
