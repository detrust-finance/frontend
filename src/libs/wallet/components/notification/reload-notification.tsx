import React from 'react'
// Components
import { Flex, Box, Text } from 'rebass/styled-components'

export const ReloadNotification: React.FC = ({ children, ...restprops }) => {
  return (
    <Flex flexDirection='column' {...restprops}>
      <Box>
        <Text fontSize={14}>{children}</Text>
      </Box>
    </Flex>
  )
}
