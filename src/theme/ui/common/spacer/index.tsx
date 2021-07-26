import React from 'react'
import _ from 'lodash'
import { useResponsive, useTheme } from '../../../../hooks'
import { SpacerProps } from './interfaces'
import { SpacerBox } from './style.css'

const Spacer: React.FC<SpacerProps> = ({ size }) => {
  const { spacer } = useTheme()
  const { isMobile, isTablet, isLaptop, isDesktop } = useResponsive()

  if (size && _.isArray(size)) {
    if (isDesktop)
      return (
        <SpacerBox
          size={
            size[3]
              ? spacer[size[3]]
              : size[2]
              ? spacer[size[2]]
              : size[1]
              ? spacer[size[1]]
              : spacer[size[0]]
          }
        />
      )
    if (isLaptop)
      return (
        <SpacerBox
          size={
            size[2]
              ? spacer[size[2]]
              : size[1]
              ? spacer[size[1]]
              : spacer[size[0]]
          }
        />
      )
    if (isTablet)
      return <SpacerBox size={size[1] ? spacer[size[1]] : spacer[size[0]]} />
    if (isMobile) return <SpacerBox size={spacer[size[0]]} />
  }

  if (size && !_.isArray(size)) return <SpacerBox size={spacer[size]} />

  return <SpacerBox />
}

export default Spacer
