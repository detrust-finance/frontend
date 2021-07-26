import styled, { keyframes } from 'styled-components'
import { Loader as FeatherLoader } from 'react-feather'

const loaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Loader = styled(FeatherLoader)`
  height: ${({ theme }) => theme.fontSizes.xxl};
  animation: ${loaderAnimation} 2.5s linear infinite;
`
