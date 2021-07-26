import { useCallback } from 'react'
import { getWalletTrustTokens, getContractTrustTokens } from '../utils'

export const useGetWalletTrustTokens = (chainId: any) => {
  const handleFetch = useCallback(async () => {
    try {
      const tx = await getWalletTrustTokens(chainId)
      return tx
    } catch (e) {
      console.error('useGetWalletTrustTokens error', e)
      return e
    }
  }, [chainId])

  return { onGetWalletTrustTokens: handleFetch }
}

export const useGetContractTrustTokens = (chainId: any) => {
  const handleFetch = useCallback(async () => {
    try {
      const tx = await getContractTrustTokens(chainId)
      return tx
    } catch (e) {
      console.error('useGetContractTrustTokens error', e)
      return e
    }
  }, [chainId])

  return { onGetContractTrustTokens: handleFetch }
}
