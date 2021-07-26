import { ButtonProps, BoxProps } from 'rebass/styled-components'
export interface WizardButtonsProps extends BoxProps {
  buttons: IWizardButton[]
  disabledSubmit?: boolean
}

export interface IWizardButton extends ButtonProps {
  title?: string
  buttonProps?: any
  variant?: string
}
