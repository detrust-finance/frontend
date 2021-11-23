import React from 'react'
import { FlexProps } from 'rebass/styled-components'
import { TableColumnProps } from '../table/interfaces'

export interface Table2Props extends FlexProps {
  columns: TableColumnProps[]
  dataSource: any[]
  subRowComponent?: (data: any) => React.ReactNode
}
