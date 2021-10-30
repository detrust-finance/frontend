import React from 'react'
import {
  Label as LabelRebass,
  Input as InputRebass,
  Select as SelectRebass,
} from '@rebass/forms'
import { default as DatePickerOriginal } from 'react-datepicker'
import { Flex } from 'rebass/styled-components'
import { rem } from 'polished'
// import { Calendar as CalendarIcon } from 'react-feather'
// Hooks
import { useTheme } from '../../../../hooks'
// Interfaces
import {
  InputProps,
  DatePickerProps,
  SelectProps,
  SelectOption,
} from './interfaces'

const Input = React.forwardRef<any, InputProps>(
  ({ label, name, defaultValue, endAdornment, ...restprops }, ref) => {
    const { darkMode, colors, borderRadius, spacer, fontSizes } = useTheme()
    return (
      <Flex flexDirection='column' width='100%'>
        {label && (
          <LabelRebass
            color={colors.grey[100]}
            fontSize={fontSizes.regular}
            mb={spacer.sm}
            htmlFor={name}
          >
            {label}
          </LabelRebass>
        )}
        <Flex
          flexDirection='row'
          alignItems='center'
          sx={{
            width: '100%',
            borderColor: darkMode ? colors.grey[100] : colors.grey[100],
            borderWidth: 1,
            borderStyle: 'solid',
            //borderRadius: borderRadius[4],
            borderRadius: '0 0 10px 10px',
            transition: 'all ease-in-out 0.2s',
            '&:focus-within': {
              borderColor: darkMode ? colors.white : colors.black,
            },
          }}
        >
          <InputRebass
            flex={1}
            name={name}
            defaultValue={defaultValue}
            {...restprops}
            sx={{
              width: '100%',
              textAlign: 'left',
              borderColor: 'transparent',
              borderRadius: borderRadius[4],
              borderWidth: '1px',
              padding: spacer.xl,
              fontSize: fontSizes.lg,

              '&:focus': {
                outlineStyle: 'none',
              },
              ...restprops?.sx,
            }}
            ref={ref}
          />
          {endAdornment && endAdornment}
        </Flex>
      </Flex>
    )
  },
)

export const InputFormGroup: React.FC<InputProps> = ({
  label,
  name,
  defaultValue,
  endAdornment,
  ...restprops
}) => {
  const { darkMode, colors, borderRadius, spacer, fontSizes } = useTheme()
  return (
    <Flex flexDirection='column'>
      {label && (
        <LabelRebass
          color={colors.grey[100]}
          fontSize={fontSizes[100]}
          mb={spacer.sm}
          htmlFor={name}
        >
          {label}
        </LabelRebass>
      )}
      <Flex
        flexDirection='row'
        alignItems='center'
        sx={{
          borderColor: darkMode ? colors.grey[600] : colors.grey[600],
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: borderRadius[4],
        }}
      >
        <InputRebass
          name={name}
          defaultValue={defaultValue}
          {...restprops}
          sx={{
            borderColor: 'transparent',
            borderRadius: borderRadius[4],
            borderWidth: '1px',
            paddingY: '4px',
            paddingX: '8px',
            fontSize: rem('13px'),
            textAlign: 'center',
            color: darkMode ? colors.grey[100] : colors.grey[100],
            '&:focus': {
              outlineStyle: 'none',
            },
            '&::-webkit-input-placeholder': {
              color: darkMode ? colors.black : colors.grey[500],
              opacity: 1,
            },
            '&::-moz-placeholder': {
              color: darkMode ? colors.black : colors.grey[500],
              opacity: 1,
            },
            '&:-ms-input-placeholder': {
              color: darkMode ? colors.black : colors.grey[500],
              opacity: 1,
            },
            '&:-moz-placeholder': {
              color: darkMode ? colors.black : colors.grey[500],
              opacity: 1,
            },
          }}
        />
        {endAdornment && endAdornment}
      </Flex>
    </Flex>
  )
}

export const DatePicker = React.forwardRef<DatePickerProps, any>(
  ({ label, name, endAdornment, ...restprops }, ref) => {
    const { darkMode, colors, borderRadius, spacer, fontSizes } = useTheme()
    return (
      <Flex flexDirection='column' width='100%'>
        {label && (
          <LabelRebass
            color={colors.grey[100]}
            fontSize={fontSizes.regular}
            mb={spacer.sm}
            htmlFor={name}
          >
            {label}
          </LabelRebass>
        )}
        <Flex
          flexDirection='row'
          alignItems='center'
          sx={{
            width: '100%',
            borderColor: darkMode ? colors.grey[100] : colors.grey[100],
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: borderRadius[4],
            transition: 'all ease-in-out 0.2s',
            '&:focus-within': {
              borderColor: darkMode ? colors.white : colors.black,
            },
          }}
        >
          <DatePickerOriginal {...restprops} ref={ref} />
          {endAdornment && endAdornment}
        </Flex>
      </Flex>
    )
  },
)

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  defaultValue,
  options,
  ...restprops
}) => {
  const { darkMode, colors, borderRadius, spacer, fontSizes } = useTheme()
  return (
    <Flex flexDirection='column' width='100%'>
      {label && (
        <LabelRebass
          color={colors.grey[100]}
          fontSize={fontSizes.regular}
          mb={spacer.sm}
          htmlFor={name}
        >
          {label}
        </LabelRebass>
      )}
      <Flex
        sx={{
          width: '100%',
          borderColor: darkMode ? colors.grey[100] : colors.grey[100],
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: borderRadius[4],
          transition: 'all ease-in-out 0.2s',
          '&:focus-within': {
            borderColor: darkMode ? colors.white : colors.black,
          },
          '& > div': {
            width: '100%',
          },
        }}
      >
        <SelectRebass
          name={name}
          defaultValue={defaultValue}
          {...restprops}
          sx={{
            width: '100%',
            textAlign: 'center',
            borderColor: 'transparent',
            borderRadius: borderRadius[4],
            borderWidth: '1px',
            padding: spacer.xl,
            fontSize: fontSizes.lg,
            '&:focus': {
              outlineStyle: 'none',
            },
          }}
        >
          {options.map((option: SelectOption) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectRebass>
      </Flex>
    </Flex>
  )
}

export default Input
