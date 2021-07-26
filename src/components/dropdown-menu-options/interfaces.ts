import React from 'react'
import { BoxProps as RebassBoxProps } from 'rebass/styled-components'

export interface DropdownMenuOptionsProps extends RebassBoxProps {
  onClick?: any
  options: DropDownMenuOption[]
  handleClose?: any
  resolution?: string | number | React.ReactNode
}

export interface DropDownMenuOption {
  key?: any
  name: string | React.ReactNode
  value: any | React.ReactNode
  icon: any
  symbol: any
}
