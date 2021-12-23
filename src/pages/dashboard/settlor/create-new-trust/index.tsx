import { /*useForm, */useStep } from 'react-hooks-helper'
import StepOne from './step-one'
import StepTwo from './step-two'
import Submit from './last-submit'
import { useActiveWeb3React } from '../../../../libs/wallet'
import { Login } from '../../../../components'
import { useSimpleForm2 } from '../../../../libs/misc/useSimpleForm'
// import { INTERVAL_OPTIONS } from '../../../../constants'

const steps = [
  { id: 'step-one' },
  { id: 'step-two' },
  { id: 'submit' },
]

export interface IFormData {
  asset: string
  beneficiaryAddress: string
  fundName: string
  fundSource: string
  releaseAmount: string | number
  releaseInterval: string | number
  releaseStartTime: Date | null | undefined
  totalDepositAmount: string | number
  revocable: boolean
}

const MultiStepForm: React.FC = () => {
  const { account } = useActiveWeb3React()
  //const [formData, setForm] = useForm<IFormData>({
  const [formData, setForm] = useSimpleForm2({
    asset: 'ETH',
    beneficiaryAddress: '',
    fundName: '',
    fundSource: 'wallet',
    releaseAmount: '',
    releaseInterval: '',
    releaseStartTime: null,
    totalDepositAmount: '',
    revocable: true,
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
    case 'submit':
      return <Submit {...props} />

    default:
      return null
  }
}

export default MultiStepForm
