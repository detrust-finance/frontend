import { Contract } from '@ethersproject/contracts'
import { useActiveWeb3React, useContract } from '../../wallet'
import { DETRUST_ABI, DETRUST_NETWORKS } from '../constants'

export function useDetrustContract(
  withSignerIfPossible?: boolean,
): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && DETRUST_NETWORKS[chainId],
    DETRUST_ABI,
    withSignerIfPossible,
  )
}
