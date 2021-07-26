import { useForm, useStep } from 'react-hooks-helper'
import React from 'react'
import StepOne from './step-one'
import Submit from './last-submit'
import { useGetTrustListAsBeneficiary } from '../../../../libs/detrust'
import { IFormClaimData } from '../../../../constants'
import { useActiveWeb3React } from '../../../../libs/wallet'
import { Login } from '../../../../components'

const steps = [{ id: 'step-one' }, { id: 'submit' }]

interface MultiStepFormProps {
  contractId?: any
  releaseToAddress: string
}

const state = {
  trustId: '',
  asset: 'ETH',
  settlorAddress: '',
  beneficiaryAddress: '',
  fundName: '',
  fundSource: 'wallet',
  releaseToAddress: '',
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  contractId,
  releaseToAddress,
}) => {
  const { account } = useActiveWeb3React()
  const [formData, setForm] = useForm<IFormClaimData>({
    ...state,
    releaseToAddress: releaseToAddress,
  })
  const { step, navigation } = useStep({ initialStep: 0, steps })
  const { id }: any = step
  const { data: trustList, isLoading } = useGetTrustListAsBeneficiary()

  const getContractData = React.useCallback(() => {
    if (!trustList) return
    const findTrust = trustList.find((a: any) => a.id === contractId)
    if (findTrust) {
      setForm({
        target: {
          name: 'trustId',
          value: findTrust.id,
        },
      })
      setForm({
        target: {
          name: 'beneficiaryAddress',
          value: findTrust.beneficiary,
        },
      })
      setForm({
        target: {
          name: 'fundName',
          value: findTrust.name,
        },
      })
      setForm({
        target: {
          name: 'settlorAddress',
          value: findTrust.settlor,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trustList, contractId])

  React.useEffect(() => {
    if (isLoading) return
    getContractData()
  }, [getContractData, isLoading])

  React.useEffect(() => {
    if (!releaseToAddress && account) {
      setForm({
        target: {
          name: 'releaseToAddress',
          value: account,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseToAddress, account])

  const props = { formData, setForm, navigation }

  if (!account) return <Login />

  switch (id) {
    case 'step-one':
      return <StepOne {...props} />
    case 'submit':
      return <Submit {...props} />
    default:
      return null
  }
}

export default MultiStepForm
