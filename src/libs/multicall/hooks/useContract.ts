import { Contract } from '@ethersproject/contracts'
import { useActiveWeb3React, useContract } from '../../wallet'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants'

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && MULTICALL_NETWORKS[chainId],
    MULTICALL_ABI,
    false,
  )
}
