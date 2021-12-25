import React from 'react'
import { Box, BoxProps } from 'rebass/styled-components'
import { useTheme } from '../../../../hooks'

interface TitleProps extends BoxProps {
  title: string
  subtitle?: string
}

const Title: React.FC<TitleProps> = ({ title, subtitle, ...restprops }) => {
  const { colors, darkMode, fontSizes } = useTheme()
  return (
    <Box {...restprops}>
      <Box
        as='h1'
        sx={{
          //color: darkMode ? colors.blue[100] : colors.blue[100],
          color: '#5E6282',
          fontSize: fontSizes.lg,
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        {title}
        {subtitle && (
          <Box
            as='span'
            sx={{
              pl: 2,
              //color: darkMode ? colors.grey[200] : colors.grey[200],
              color: '#5E6282',
              fontSize: fontSizes.lg,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              opacity: 0.4,
            }}
          >
            {subtitle}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Title
