import styled, { keyframes } from 'styled-components'
import { Circle as FeatherLoader } from 'react-feather'

const loaderAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`
export const Loader = styled(FeatherLoader)<{ size?: number }>`
  animation: ${loaderAnimation} 1.5s ease-in-out infinite;
  stroke: #29b500;
  height: ${({ size }) => size};
  stroke-linecap: round;
  stroke-width: 1.4;
  stroke-linejoin: round;
  stroke-dasharray: 45;
`
