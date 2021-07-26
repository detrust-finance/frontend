import { useQuery, UseQueryResult } from 'react-query'
import { useActiveWeb3React } from '../../wallet'
import moment from 'moment-timezone'
import { useDetrustContract } from './useContract'
import {
  getBalance,
  getTrustListAsBeneficiary,
  getTrustListAsSettlor,
} from '../utils/detrust'
import BigNumber from 'bignumber.js'

/**
 * Get the balance in this contract, which is not send to any trust
 * @return the balance of the settlor in this contract
 */
export function useGetBalance() {
  const contract = useDetrustContract()
  const { account } = useActiveWeb3React()

  const { data, isLoading } = useQuery(
    ['useGetBalance', account],
    async () => {
      if (!contract) return
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await getBalance(contract, account!)

      if (result?.[0]) {
        return {
          balance: new BigNumber(result?.[0]?._hex),
        }
      }
      //return new BigNumber(result)
    },
    {
      enabled: true,
      initialData: () => ({ balance: new BigNumber(0) }),
      onError: error => {
        console.group('❌ useGetBalance error response')
        console.error(error)
        console.groupEnd()
      },
    },
  )

  return {
    data,
    isLoading,
  }
}

/**
 * Get beneficiary's all trusts
 *
 * @return array of trusts which's beneficiary is the tx.orgigin
 */
export function useGetTrustListAsBeneficiary() {
  const contract = useDetrustContract()
  const { account } = useActiveWeb3React()

  const { data, isLoading } = useQuery(
    ['useGetTrustListAsBeneficiary', account],
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await getTrustListAsBeneficiary(contract, account!)
      if (result?.[0]) {
        return result[0].map((trust: any) => {
          return {
            id: new BigNumber(trust.id?._hex).toFixed(0),
            amountPerTimeInterval: new BigNumber(
              trust.amountPerTimeInterval?._hex,
            ).dividedBy(1e18),
            beneficiary: trust.beneficiary,
            name: trust.name,
            nextReleaseTime: new BigNumber(trust.nextReleaseTime?._hex),
            claimEnabled:
              moment().diff(moment.unix(trust.nextReleaseTime?._hex)) >= 0,
            settlor: trust.settlor,
            timeInterval: new BigNumber(trust.timeInterval?._hex),
            totalAmount: new BigNumber(trust.totalAmount?._hex).dividedBy(1e18),
          }
        })
      }
      return result
      //return new BigNumber(result)
    },
    {
      enabled: true,
      initialData: () => {},
      onError: error => {
        console.group('❌ useGetBalance error response')
        console.error(error)
        console.groupEnd()
      },
    },
  )

  return {
    data,
    isLoading,
  }
}

/**
 * Get settlor's all trusts
 *
 * @return array of trusts which's settlor is the tx.orgigin
 */
export function useGetTrustListAsSettlor(): UseQueryResult<any, any> {
  const { account } = useActiveWeb3React()
  const contract = useDetrustContract()

  const result = useQuery(
    ['useGetTrustListAsSettlor', account],
    async () => {
      if (!contract) return
      const result = await getTrustListAsSettlor(contract!, account!)
      // console.log('useGetTrustListAsSettlor', result)
      if (result?.[0]) {
        return result[0].map((trust: any) => {
          return {
            id: new BigNumber(trust.id?._hex).toFixed(0),
            amountPerTimeInterval: new BigNumber(
              trust.amountPerTimeInterval?._hex,
            ).dividedBy(1e18),
            beneficiary: trust.beneficiary,
            name: trust.name,
            nextReleaseTime: new BigNumber(trust.nextReleaseTime?._hex),
            settlor: trust.settlor,
            timeInterval: new BigNumber(trust.timeInterval?._hex),
            totalAmount: new BigNumber(trust.totalAmount?._hex).dividedBy(1e18),
          }
        })
      }
      return []
      //return new BigNumber(result)
    },
    {
      enabled: true,
      initialData: () => {},
      onError: error => {
        console.group('❌ useGetBalance error response')
        console.error(error)
        console.groupEnd()
      },
    },
  )

  return result
}
