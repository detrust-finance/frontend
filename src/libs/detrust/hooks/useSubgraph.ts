import { gql, useQuery } from '@apollo/client';
import { useActiveWeb3React } from '../../wallet';

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
  )

  return {
    data,
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
  )

  return {
    data,
    isLoading: loading,
    error,
  }
}
