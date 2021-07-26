import { ChainId } from '../../wallet'
import DETRUST_ABI from './abis/detrust.json'

const DETRUST_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: process.env.NEXT_PUBLIC_CHAIN_ID_MAINNET ?? '',
  [ChainId.ROPSTEN]: process.env.NEXT_PUBLIC_CHAIN_ID_ROPSTEN ?? '',
  [ChainId.KOVAN]: process.env.NEXT_PUBLIC_CHAIN_ID_KOVAN ?? '',
  [ChainId.RINKEBY]: process.env.NEXT_PUBLIC_CHAIN_ID_RINKEBY ?? '0x376394Be63692CCBD2E9B30440D320Fc938c1e62',
  [ChainId.GÖRLI]: process.env.NEXT_PUBLIC_CHAIN_ID_GÖRLI ?? '',
  [ChainId.BSC]: process.env.NEXT_PUBLIC_CHAIN_ID_BSC ?? '',
  [ChainId.BSC_TESTNET]: process.env.NEXT_PUBLIC_CHAIN_ID_BSC_TESTNET ?? '',
  [ChainId.OKEX]: process.env.NEXT_PUBLIC_CHAIN_ID_OKEX?? '',
  [ChainId.OKEX_TESTNET]: process.env.NEXT_PUBLIC_CHAIN_ID_OKEX_TESTNET ?? '',
  [ChainId.HECO]: process.env.NEXT_PUBLIC_CHAIN_ID_HECO ?? '',
  [ChainId.HECO_TESTNET]: process.env.NEXT_PUBLIC_CHAIN_ID_HECO_TESTNET ?? '',
}

export { DETRUST_ABI, DETRUST_NETWORKS }
