import React from 'react'
import { Box } from 'rebass/styled-components'
import ClickAwayListener from 'react-click-away-listener'
import { DropdownProps } from './interfaces'

const DropDown: React.FC<DropdownProps> = ({
  buttonComponent,
  menuComponent,
  trigger = 'click',
  menuStyle,
  ...restprops
}) => {
  const [show, setShow] = React.useState(false)

  const handleToggle = React.useCallback(() => setShow(state => !state), [])
  const handleOpen = React.useCallback(() => setShow(false), [])
  const handleClose = React.useCallback(() => setShow(false), [])

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{ position: 'relative' }}
      >
        {trigger === 'hover' && (
          <Box
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            onMouseEnter={handleOpen}
          >
            {React.isValidElement(buttonComponent) &&
              React.cloneElement(buttonComponent, {
                show,
                handleToggle,
                handleOpen,
                handleClose,
              })}
          </Box>
        )}
        {trigger === 'click' && (
          <Box
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={handleToggle}
          >
            {React.isValidElement(buttonComponent) &&
              React.cloneElement(buttonComponent, {
                show,
                handleToggle,
                handleOpen,
                handleClose,
              })}
          </Box>
        )}
        {show && (
          <Box
            variant='drop-down'
            sx={{
              ...menuStyle,
            }}
            {...restprops}
            className='hover'
          >
            {React.isValidElement(menuComponent) &&
              React.cloneElement(menuComponent, {
                show,
                handleToggle,
                handleOpen,
                handleClose,
              })}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  )
}

export default DropDown
