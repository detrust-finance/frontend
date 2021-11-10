import React, { useState } from 'react'
import { Flex, Box, Text } from 'rebass/styled-components'
//import SimpleBar from 'simplebar-react'
import _ from 'lodash'
// Components
//import { Spacer } from '../../'
import { ChevronDown, ChevronUp } from 'react-feather'
// iterfaces
import { TableProps, TableColumnProps } from './interfaces'
import { rem } from 'polished'

const SORT_DIRECTION: {
  [x: string]: 'asc' | 'desc'
} = {
  ASC: 'asc',
  DESC: 'desc',
}

const Table: React.FC<TableProps> = ({
  columns,
  subRowComponent,
  dataSource,
  loading,
  scrollbarsStyle,
  tableHeaderStyle,
  tableHeaderVariant,
  sortable,
  defaultSortHeader = '',
  ...restprops
}) => {
  const [defaultWidth, setDefaultWidth] = React.useState<number>(0)
  const [sortHeader, setSortHeader] = React.useState<string | undefined>(
    columns[0]?.sortBy,
  )
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(
    SORT_DIRECTION.ASC,
  )

  const [selected, setSelected] = useState<any[]>([])

  React.useEffect(() => {
    if (!columns.length) return
    setDefaultWidth(100 / columns.length)
  }, [columns.length])

  React.useEffect(() => {
    if (!defaultSortHeader) return
    setSortHeader(defaultSortHeader)
  }, [defaultSortHeader])

  const toggleDetails = React.useCallback(
    (item: string | number) =>
      selected.includes(item)
        ? setSelected(state =>
            state.filter((record: string | number) => record !== item),
          )
        : setSelected(state => [item, ...state]),
    [selected],
  )

  return (
    <Flex variant='table'>
      <Flex
        variant={tableHeaderVariant ? tableHeaderVariant : 'table-header'}
        {...tableHeaderStyle}
      >
        {subRowComponent && (
          <Box width={30} textAlign='center'>
            +
          </Box>
        )}
        {columns &&
          columns.map((col: TableColumnProps) => (
            <Box
              key={col.key}
              flex={col.width ? `1 1 ${col.width}` : `1 1 ${defaultWidth}%`}
            >
              {sortable ? (
                <Flex
                  flexDirection='row'
                  alignItems='center'
                  justifyContent={
                    !col.align
                      ? 'flex-start'
                      : col.align === 'left'
                      ? 'flex-start'
                      : col.align === 'right'
                      ? 'flex-end'
                      : 'center'
                  }
                >
                  {col?.hideSort ? (
                    <Text as='span'>{col.title}</Text>
                  ) : (
                    <>
                      <Text
                        as='span'
                        onClick={() => {
                          setSortHeader(col?.sortBy)
                          setSortDirection(SORT_DIRECTION.ASC)
                        }}
                        sx={{ cursor: !col?.hideSort ? 'pointer' : 'default' }}
                      >
                        {col.title}
                      </Text>
                      {sortHeader === col?.sortBy && (
                        <>
                          {sortDirection === SORT_DIRECTION.ASC ? (
                            <Text
                              as='span'
                              onClick={() =>
                                setSortDirection(SORT_DIRECTION.DESC)
                              }
                              sx={{ cursor: 'pointer' }}
                              ml='3px'
                            >
                              <ChevronUp
                                height={rem('13px')}
                                width={rem('13px')}
                              />
                            </Text>
                          ) : (
                            <Text
                              as='span'
                              onClick={() =>
                                setSortDirection(SORT_DIRECTION.ASC)
                              }
                              sx={{ cursor: 'pointer' }}
                              ml='3px'
                            >
                              <ChevronDown
                                height={rem('13px')}
                                width={rem('13px')}
                              />
                            </Text>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Flex>
              ) : (
                <Text textAlign={col.align}>{col.title}</Text>
              )}
            </Box>
          ))}
      </Flex>

      {loading && (
        <Flex
          variant='loading-wrapper'
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          Loading...
        </Flex>
      )}
      <Box {...restprops}>
        {/* <SimpleBar
          style={
            !scrollbarsStyle
              ? { minHeight: 290, maxHeight: 290 }
              : { ...scrollbarsStyle }
          }
        > */}
          {/* <Spacer size='sm' /> */}
          <Flex flexDirection='column' sx={{ position: 'relative' }}>
            {dataSource?.length > 0 &&
              _.orderBy(dataSource, [sortHeader], [sortDirection])?.map(
                (source: any, i: number) =>
                  _.isArray(source)
                    ? source?.map(
                        (data: any) =>
                          !data?.hide && (
                            <Flex flexDirection='column' key={data?.key}>
                              <Flex
                                width={30}
                                alignItems='center'
                                justifyContent='center'
                                sx={{ cursor: 'pointer' }}
                              >
                                {selected === source ? (
                                  <ChevronUp />
                                ) : (
                                  <ChevronDown />
                                )}
                              </Flex>
                              {columns &&
                                columns?.map((col: TableColumnProps) => (
                                  <Box
                                    key={col?.key}
                                    flex={
                                      col?.width
                                        ? `1 1 ${col?.width}`
                                        : `1 1 ${defaultWidth}%`
                                    }
                                  >
                                    {col?.Render ? (
                                      col?.Render(data, i)
                                    ) : (
                                      <Text textAlign={col.align}>
                                        {data[col?.dataIndex]}
                                      </Text>
                                    )}
                                  </Box>
                                ))}
                            </Flex>
                          ),
                      )
                    : !source?.hide && (
                        <React.Fragment key={source?.key}>
                          <Flex variant='table-row'>
                            <Flex
                              width={30}
                              alignItems='center'
                              justifyContent='center'
                              sx={{ cursor: 'pointer' }}
                              onClick={() => toggleDetails(source.key)}
                            >
                              {selected.includes(source.key) ? (
                                <ChevronUp height={16} />
                              ) : (
                                <ChevronDown height={16} />
                              )}
                            </Flex>
                            {columns &&
                              columns.map((col: TableColumnProps) => (
                                <Box
                                  key={col?.key}
                                  flex={
                                    col?.width
                                      ? `1 1 ${col?.width}`
                                      : `1 1 ${defaultWidth}%`
                                  }
                                >
                                  {col?.Render ? (
                                    col?.Render(source, i)
                                  ) : (
                                    <Text textAlign={col?.align}>
                                      {source?.[col?.dataIndex]}
                                    </Text>
                                  )}
                                </Box>
                              ))}
                          </Flex>
                          {subRowComponent &&
                            selected.includes(source.key) &&
                            subRowComponent(source)}
                        </React.Fragment>
                      ),
              )}
          </Flex>
        {/* </SimpleBar> */}
      </Box>
    </Flex>
  )
}

export default Table
