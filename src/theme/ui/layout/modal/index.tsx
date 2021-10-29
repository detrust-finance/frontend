import React from 'react'
import { Box, Image, Text } from 'rebass/styled-components'
// Interfaces
import { ModalProps } from './interfaces'
// Styles
import { CloseIcon } from './index.css'
import styled from 'styled-components'

const Modal: React.FC<ModalProps> = ({
  title,
  width = [327, 327, 500, null],
  children,
  onDismiss,
  hideClose,
  image,
  headerWithBackground,
  ...restprops
}) => {
  return (
    <Box
      width={width}
      variant='modal'
      sx={{ zIndex: 1000, position: 'relative' }}
    >
      {title && (
        <Box variant='modal-header' sx={{ position: 'relative' }}>
          <Text textAlign='center' fontSize='lg' as='h1'>
            {title}
          </Text>
          {!hideClose && <CloseIcon onClick={onDismiss} cursor='pointer' />}
        </Box>
      )}
      {headerWithBackground && (
        <StyledBox>
          {!hideClose && (
            <CloseIcon
              onClick={onDismiss}
              cursor='pointer'
              top='1rem'
              right='1rem'
              color='white'
            />
          )}
          <Image src={headerWithBackground} />
        </StyledBox>
      )}
      {image && (
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          sx={{ borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
        />
      )}
      <Box variant='modal-body' sx={{ zIndex: 1000 }} {...restprops}>
        {React.isValidElement(children) &&
          React.cloneElement(children, {
            onDismiss,
          })}
      </Box>
    </Box>
  )
}

const StyledBox = styled(Box)`
  position: relative;
`

export default Modal

export { Context as ModalContext } from './context'
