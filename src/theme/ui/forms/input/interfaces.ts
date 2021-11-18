import { ReactDatePickerProps as DatePickerPropsOriginal } from 'react-datepicker'
import {
  InputProps as InputPropsRebass,
  SelectProps as SelectPropsRebass,
} from '@rebass/forms'

export interface InputProps extends InputPropsRebass {
  label?: string
  endAdornment?: React.ReactNode
}

export interface DatePickerProps extends DatePickerPropsOriginal {
  label?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  required?: boolean
}

export interface SelectProps extends SelectPropsRebass {
  label?: string
  options: SelectOption[]
}

export interface SelectOption {
  label: string
  label2?: string
  value: string | number
}
