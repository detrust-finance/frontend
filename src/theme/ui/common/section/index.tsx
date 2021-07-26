import React from 'react'
import { Flex, FlexProps } from 'rebass/styled-components'

const Section: React.FC<FlexProps> = ({ children, ...restprops }) => {
  return (
    <Flex
      sx={{
        width: '100%',
        maxWidth: ['100%', 1000, null, null],
      }}
      {...restprops}
    >
      {children}
    </Flex>
  )
}

export default Section
