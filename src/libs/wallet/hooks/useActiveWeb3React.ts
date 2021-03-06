import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '../constants'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { NetworkContextName } from '../constants'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId | undefined
} {
  const context = useWeb3ReactCore<Web3Provider>()
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
  if (typeof window === 'undefined') return context
  return context.active ? context : contextNetwork
}
