import React from 'react'
import { Flex, FlexProps } from 'rebass/styled-components'
import { useTheme } from '../../../../hooks'

const Container: React.FC<FlexProps> = ({ children, ...restprops }) => {
  const { colors } = useTheme()

  return (
    <Flex
      sx={{
        width: '100%',
        // height: [
        //   'calc(100vh - 120px)',
        //   'calc(100vh - 120px)',
        //   'calc(100vh - 60px)',
        // ],
        justifyContent: 'center',
        alignItems: 'center',
        bg: colors.white,
        boxShadow: '0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481)',
        borderRadius: '6px',
      }}
      {...restprops}
    >
      {children}
    </Flex>
  )
}

export default Container
