import React from 'react'
import { Flex, Box, Text } from 'rebass/styled-components'
import _ from 'lodash'
import { Table2Props } from './interfaces'
import { useTranslation } from 'react-i18next'
import { TableColumnProps } from '../table/interfaces'

const Table2 = ({
  columns,
  dataSource,
  subRowComponent,
  ...restprops
}: Table2Props) => {
  //const { t } = useTranslation('dashboard')

  return (
    <Flex variant='table'>
      <Box {...restprops}>
        <Flex
          flexDirection='column'
          width='100%'
          sx={{ gap: '60px' }}
          mt='10px'
        >
          {dataSource.map(data => {
            //console.log(data)
            return (
              <Flex
                flexDirection='column'
                width='100%'
                //mt='24px'
                //mb='auto'
                sx={{ gap: '10px' }}
                key={data.key}
              >
                {columns.map((col: TableColumnProps) => {
                  //console.log(col)
                  return (
                    <Box key={col.key}>
                      <Flex
                        variant='outlined-box-left2'
                        flexDirection='column'
                        sx={{ borderBottomColor: 'transparent' }}
                      >
                        <Text fontSize='lg'>
                          {col.title}
                        </Text>
                      </Flex>
                      <Flex
                        flexDirection='row'
                        variant='outlined-box3'
                        alignContent='center'
                        //sx={{ borderTopColor: 'transparent' }}
                      >
                        {col.Render && col.Render(data, 0)}
                      </Flex>
                    </Box>
                  )
                })}
                {subRowComponent && subRowComponent(data)}
              </Flex>
            )
          })}
        </Flex>
      </Box>
    </Flex>
  )
}

export default Table2
