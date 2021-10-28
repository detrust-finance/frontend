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
          color: colors.jaffa,
          fontSize: [fontSizes.xxl, fontSizes.xxl, fontSizes.xxxl],
          fontWeight: 800,
          textTransform: 'uppercase',
        }}
      >
        {title}
        {subtitle && (
          <Box
            as='span'
            sx={{
              pl: 2,
              color: darkMode ? colors.grey[200] : colors.grey[200],
              fontSize: [fontSizes.xxl, fontSizes.xxl, fontSizes.xxxl],
              fontWeight: 800,
              textTransform: 'uppercase',
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
