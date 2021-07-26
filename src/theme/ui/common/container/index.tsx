import React from 'react'
import { Flex, FlexProps } from 'rebass/styled-components'

const Container: React.FC<FlexProps> = ({ children, ...restprops }) => {
  return (
    <Flex
      sx={{
        width: '100%',
        height: [
          'calc(100vh - 120px)',
          'calc(100vh - 120px)',
          'calc(100vh - 60px)',
        ],
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...restprops}
    >
      {children}
    </Flex>
  )
}

export default Container
