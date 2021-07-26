export interface WizardHeaderProps {
  headers: IWizardHeader[]
}

export interface IWizardHeader {
  title: string
  number: number
  status: 'inactive' | 'active' | 'done'
}
