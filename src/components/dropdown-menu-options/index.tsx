import React from 'react'
import { rem } from 'polished'
// Hooks
import { useTheme } from '../../hooks'
// Components
import { Flex, Text, Image } from 'rebass/styled-components'
import { Circle, CheckCircle } from 'react-feather'
// Interfaces
import { DropdownMenuOptionsProps, DropDownMenuOption } from './interfaces'

const DropdownMenuOptions: React.FC<DropdownMenuOptionsProps> = ({
  options,
  onClick,
  handleClose,
  ...restprops
}) => {
  const { darkMode, colors } = useTheme()
  const [tokenChoice, setTokenChoice] = React.useState('')

  return (
    <Flex
      flexDirection='column'
      {...restprops}
      sx={{
        width: 'auto',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: darkMode ? colors.grey[200] : colors.grey[200],
        bg: darkMode ? colors.blue[200] : colors.white,
        color: darkMode ? colors.white : colors.black,
      }}
    >
      {options.map((option: DropDownMenuOption) => (
        <Flex
          key={option.key}
          flexDirection='row'
          alignItems='center'
          justifyContent='flex-start'
          onClick={() => {
            onClick(option)
            setTokenChoice(option.symbol)
            handleClose()
          }}
          sx={{
            px: rem('4px'),
            py: rem('8px'),
            cursor: 'pointer',
            '&:hover': {
              bg: darkMode ? colors.blue[200] : colors.blue[200],
              color: colors.white,
            },
          }}
        >
          {option.symbol === tokenChoice ? (
            <CheckCircle height={rem('13px')} />
          ) : (
            <Circle height={rem('13px')} />
          )}
          <Image
            className='list-icon'
            src={option.icon?.url}
            width={20}
            height={20}
          />
          <Text
            as='span'
            fontWeight='bold'
            ml={rem('10px')}
            sx={{ textTransform: 'cap' }}
          >
            {option.symbol}
          </Text>
          <Text
            as='span'
            ml={rem('5px')}
            sx={{ color: colors.grey[100], textTransform: 'initial' }}
          >
            {option.name}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}

export default DropdownMenuOptions
