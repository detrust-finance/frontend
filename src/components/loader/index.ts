import styled, { keyframes } from 'styled-components'
// import { Circle as FeatherLoader } from 'react-feather'

const loaderAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

// export const Loader = styled(FeatherLoader)<{ size?: number }>`
//   animation: ${loaderAnimation} 1.5s ease-in-out infinite;
//   /*stroke: #29b500;*/
//   stroke: #F0864B;
//   height: ${({ size }) => size};
//   stroke-linecap: round;
//   stroke-width: 1.4;
//   stroke-linejoin: round;
//   stroke-dasharray: 45;
// `

export const Loader = styled.div<{ size: number }>`
  animation: ${loaderAnimation} 1.5s ease-in-out infinite;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-bottom-color: #F0864B;
  border-width: 5px;
  border-radius: 50%;
  box-sizing: border-box;
`
