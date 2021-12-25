import React from 'react'
import { useForm, useStep } from 'react-hooks-helper'
import Submit from './last-submit'
import { useGetTrustListAsSettlor } from '../../../../libs/detrust'
import { IFormData } from '../../../../constants'
import { Login } from '../../../../components'
import { useActiveWeb3React } from '../../../../libs/wallet'

const steps = [
  { id: 'submit' },
]

interface MultiStepFormProps {
  trustId?: any
}

const state = {
  trustId: '',
  asset: 'ETH',
  settlorAddress: '',
  beneficiaryAddress: '',
  fundName: '',
  fundSource: 'wallet',
  releaseAmount: '',
  releaseInterval: '',
  releaseStartTime: '',
  totalDepositAmount: '',
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ trustId }) => {
  const { account } = useActiveWeb3React()
  const [formData, setForm] = useForm<IFormData>(state)
  const { step, navigation } = useStep({ initialStep: 0, steps })
  const { id }: any = step
  const { data: trustList, isLoading } = useGetTrustListAsSettlor()

  const getContractData = React.useCallback(() => {
    if (!trustList) return
    const findTrust = trustList.find((a: any) => a.id === trustId)
    if (findTrust) {
      setForm({
        target: {
          name: 'trustId',
          value: findTrust.id,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trustId, trustList])

  React.useEffect(() => {
    if (isLoading) return
    getContractData()
  }, [getContractData, isLoading])

  const props = { formData, setForm, navigation }

  if (!account) return <Login />

  switch (id) {
    case 'submit':
      return <Submit {...props} />
    default:
      return null
  }
}

export default MultiStepForm
