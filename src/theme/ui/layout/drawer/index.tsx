import React from 'react'
import { Box, Text } from 'rebass/styled-components'
// Interfaces
import { DrawerProps } from './interfaces'
// Styles
import { CloseIcon } from './index.css'

const Drawer: React.FC<DrawerProps> = ({
  title,
  width = 260,
  children,
  onDismiss,
  ...restprops
}) => {
  return (
    <Box width={width} variant='card-primary' sx={{ zIndex: 1000 }}>
      {title && (
        <Box variant='card-title' sx={{ position: 'relative' }}>
          <Text textAlign='center' fontSize='lg'>
            {title}
          </Text>
          <CloseIcon onClick={onDismiss} cursor='pointer' />
        </Box>
      )}
      <Box variant='card-body' {...restprops}>
        {children}
      </Box>
    </Box>
  )
}

export default Drawer

export { Context as DrawerContext } from './context'
