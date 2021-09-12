import { useForm, useStep } from 'react-hooks-helper'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import Submit from './last-submit'
import { useActiveWeb3React } from '../../../../libs/wallet'
import { Login } from '../../../../components'
// import { INTERVAL_OPTIONS } from '../../../../constants'

const steps = [
  { id: 'step-one' },
  { id: 'step-two' },
  { id: 'step-three' },
  { id: 'submit' },
]

export interface IFormData {
  asset: string
  beneficiaryAddress: string
  fundName: string
  fundSource: string
  releaseAmount: string | number
  releaseInterval: string | number
  releaseStartTime: Date | string
  totalDepositAmount: string | number
  revocable: boolean
}

const MultiStepForm: React.FC = () => {
  const { account } = useActiveWeb3React()
  const [formData, setForm] = useForm<IFormData>({
    asset: 'ETH',
    beneficiaryAddress: '',
    fundName: '',
    fundSource: 'wallet',
    releaseAmount: '',
    releaseInterval: '',
    releaseStartTime: '',
    totalDepositAmount: '',
    revocable: false,
  })
  const { step, navigation } = useStep({ initialStep: 0, steps })
  const { id }: any = step

  const props = { formData, setForm, navigation }

  if (!account) return <Login />

  switch (id) {
    case 'step-one':
      return <StepOne {...props} />
    case 'step-two':
      return <StepTwo {...props} />
    case 'step-three':
      return <StepThree {...props} />
    case 'submit':
      return <Submit {...props} />

    default:
      return null
  }
}

export default MultiStepForm
