import { /* useForm, */useStep } from 'react-hooks-helper'
import React from 'react'
import StepOne from './step-one'
import Submit from './last-submit'
//import { useGetTrustListAsBeneficiary } from '../../../../libs/detrust'
//import { IFormClaimData } from '../../../../constants'
import { useActiveWeb3React } from '../../../../libs/wallet'
import { Login } from '../../../../components'
import { useSimpleForm as useForm } from '../../../../libs/misc/useSimpleForm'

const steps = [{ id: 'step-one' }, { id: 'submit' }]

interface MultiStepFormProps {
  trustId?: any
  releaseToAddress: string
  fundName: string
}

const state = {
  trustId: '',
  //asset: 'ETH',
  //settlorAddress: '',
  //beneficiaryAddress: '',
  fundName: '',
  //fundSource: 'wallet',
  releaseToAddress: '',
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  trustId,
  releaseToAddress,
  fundName,
}) => {
  // console.log(`trust ID: ${trustId}, releaseToAddress: ${releaseToAddress}, fundName: ${fundName}`)
  const { account } = useActiveWeb3React()
  const [formData, setForm] = useForm/*<IFormClaimData>*/({
    ...state,
    trustId,
    releaseToAddress,
    fundName,
  })
  const { step, navigation } = useStep({ initialStep: 0, steps })
  const { id }: any = step
  // const { data: trustList, isLoading } = useGetTrustListAsBeneficiary()

  // const getContractData = React.useCallback(() => {
  //   if (!trustList) return
  //   const findTrust = trustList.find((a: any) => a.id === trustId)
  //   if (findTrust) {
  //     // setForm({
  //     //   target: {
  //     //     name: 'trustId',
  //     //     value: findTrust.id,
  //     //   },
  //     // })
  //     // setForm({
  //     //   target: {
  //     //     name: 'beneficiaryAddress',
  //     //     value: findTrust.beneficiary,
  //     //   },
  //     // })
  //     // setForm({
  //     //   target: {
  //     //     name: 'fundName',
  //     //     value: findTrust.name,
  //     //   },
  //     // })
  //     // setForm({
  //     //   target: {
  //     //     name: 'settlorAddress',
  //     //     value: findTrust.settlor,
  //     //   },
  //     // })
  //     setForm({
  //       trustId: findTrust.id,
  //       beneficiaryAddress: findTrust.beneficiary,
  //       fundName: findTrust.name,
  //       settlorAddress: findTrust.settlor,
  //     })
  //   } else {
  //     setForm({
  //       trustId: '*', // release all
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [trustList, trustId])

  // React.useEffect(() => {
  //   if (isLoading) return
  //   getContractData()
  // }, [getContractData, isLoading])

  React.useEffect(() => {
    // console.log(`releaseToAddress: ${releaseToAddress}, account: ${account}`)
    if (!releaseToAddress && account) {
      // setForm({
      //   target: {
      //     name: 'releaseToAddress',
      //     value: account,
      //   },
      // })
      // console.log(`setForm({ releaseToAddress: ${account} })`)
      setForm({ releaseToAddress: account })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseToAddress, account]) 

  const props = { formData, setForm, navigation }

  if (!account) return <Login />

  switch (id) {
    case 'step-one':
      return formData?.releaseToAddress ? <StepOne {...props} /> : null
    case 'submit':
      return <Submit {...props} />
    default:
      return null
  }
}

export default MultiStepForm
