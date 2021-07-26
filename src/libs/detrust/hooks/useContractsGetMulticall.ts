import { useCallback, useEffect, useMemo, useState } from 'react'

import { useSingleCallResult } from '../../multicall'

import { useDetrustContract } from './useContract'
import { getBalance } from '../utils/detrust'
import { useActiveWeb3React } from '../../wallet'

/**
 * Get the balance in this contract, which is not send to any trust
 * @return the balance of the settlor in this contract
 */
export function useGetBalance(): {
  token: string
  amount: string
} {
  const contract = useDetrustContract()
  const { account } = useActiveWeb3React()

  const { result } = useSingleCallResult(contract, 'getBalance', [account!])
  const data = result?.[0]

  return useMemo(
    () =>
      data
        ? {
            token: 'useGetBalance workz',
            amount: data,
          }
        : {
            token: 'useGetBalance',
            amount: '',
          },
    [data],
  )
}

export function useGetBalance2() {
  const contract = useDetrustContract()
  const [list, setList] = useState([])
  const { account } = useActiveWeb3React()

  const fetchData = useCallback(async () => {
    if (!account) return
    try {
      const result = await getBalance(contract, account)
      setList(result)
    } catch (e) {
      console.log('useBalanceOf error', e)
    }
  }, [account, contract])

  useEffect(() => {
    if (contract) {
      fetchData()
      const refreshInterval = setInterval(fetchData, 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [contract, fetchData])

  return list
}
/**
 * Get beneficiary's all trusts
 * @return array of trusts which's beneficiary is the tx.origin
 */
export function useGetTrustListAsBeneficiary(): {
  token: string
  amount: string
} {
  const contract = useDetrustContract()
  const { account } = useActiveWeb3React()

  const { result } = useSingleCallResult(
    contract,
    'getTrustListAsBeneficiary',
    [account!],
  )

  const data = result?.[0]

  return useMemo(
    () =>
      data
        ? {
            token: 'usegetTrustListAsBeneficiary workz',
            amount: data,
          }
        : {
            token: 'usegetTrustListAsBeneficiary',
            amount: '',
          },
    [data],
  )
}
/**
 * Get settlor's all trusts
 * @return array of trusts which's settlor is the tx.origin
 */
export function useGetTrustListAsSettlor(): {
  token: string
  amount: string
} {
  const contract = useDetrustContract()
  const { account } = useActiveWeb3React()
  const { result } = useSingleCallResult(contract, 'getTrustListAsSettlor', [
    account!,
  ])
  const data = result?.[0]

  return useMemo(
    () =>
      data
        ? {
            token: 'useGetTrustListAsSettlor workz',
            amount: data,
          }
        : {
            token: 'useGetTrustListAsSettlor undef',
            amount: '',
          },
    [data],
  )
}
