import { gql, useQuery } from '@apollo/client';
//import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from '../../wallet';

// const CLIENT_OPTIONS = {
//   context: {
//     clientName: 'detrust'
//   }
// }

// function convertStringToBN(trusts: any) {
//   for (let trust of trusts) {
//     trust.amountPerTimeInterval = new BigNumber(trust.amountPerTimeInterval)
//     trust.releasedAmount = new BigNumber(trust.releasedAmount)
//     trust.totalAmount = new BigNumber(trust.totalAmount)
//   }
// }

/**
 * Get all trusts of the current account as a settlor
 *
 * @return array of trusts whose settlor is the current account
 */
export function useGetTrustListAsSettlor() {
  const { account } = useActiveWeb3React()
  const { data, loading, error } = useQuery(
    gql`
      {
        trusts(where: { settlor: "${account}" }) {
          id
          name
          beneficiary
          nextReleaseTime
          timeInterval
          amountPerTimeInterval
          totalAmount
          releasedAmount
          revocable
        }
      }
    `
    // CLIENT_OPTIONS
  )

  //console.log(data)
  const trusts = data ? data.trusts : []
  //convertStringToBN(trusts)
  //console.log(trusts)

  return {
    data: trusts,
    isLoading: loading,
    error,
  }
}

/**
 * Get all trusts of the current account as a beneficiary
 *
 * @return array of trusts whose beneficiary is the current account
 */
export function useGetTrustListAsBeneficiary() {
  const { account } = useActiveWeb3React()
  const { data, loading, error } = useQuery(
    gql`
      {
        trusts(where: { beneficiary: "${account}" }) {
          id
          name
          settlor
          nextReleaseTime
          timeInterval
          amountPerTimeInterval
          totalAmount
          releasedAmount
          revocable
        }
      }
    `
    // CLIENT_OPTIONS
  )

  const trusts = data ? data.trusts : []
  //convertStringToBN(trusts)
  //console.log(trusts)

  return {
    data: trusts,
    isLoading: loading,
    error,
  }
}
