import React from 'react'
import { FlexProps } from 'rebass/styled-components'

export interface TableProps extends FlexProps {
  columns: TableColumnProps[]
  subRowComponent?: (data: any) => React.ReactNode
  dataSource: any[]
  loading?: boolean
  scrollbarsStyle?: any
  tableHeaderStyle?: any
  tableHeaderVariant?: any
  sortable?: boolean
  defaultSortHeader?: string
}

export interface TableColumnProps {
  key: number | string
  title: string
  dataIndex: string
  width?: string // percent or pixesl eg. 20% | 250px
  align?: 'left' | 'center' | 'right'
  sortBy?: string | undefined
  hideSort?: boolean
  Render?: (data: any, index: number) => React.ReactNode
}

export interface ThumbStyleProps {
  style: any
}
