import { ChainId } from '../../wallet'
import DETRUST_ABI from './abis/detrust.json'

const DETRUST_NETWORKS: { [chainId in ChainId]: string } = {
  //[ChainId.MAINNET]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_MAINNET ?? '',
  [ChainId.MAINNET]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_MAINNET ?? '0x1060f5077d75D4D71e50E9080AF8b238143f2F5f',
  //[ChainId.ROPSTEN]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_ROPSTEN ?? '0x57958dC0d306c947Dc91785f944C5e0fc8698214',
  [ChainId.ROPSTEN]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_ROPSTEN ?? '',
  [ChainId.KOVAN]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_KOVAN ?? '',
  [ChainId.RINKEBY]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_RINKEBY ?? '',
  [ChainId.GÖRLI]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_GÖRLI ?? '',
  [ChainId.BSC]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_BSC ?? '',
  [ChainId.BSC_TESTNET]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_BSC_TESTNET ?? '',
  [ChainId.OKEX]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_OKEX?? '',
  [ChainId.OKEX_TESTNET]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_OKEX_TESTNET ?? '',
  [ChainId.HECO]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_HECO ?? '',
  [ChainId.HECO_TESTNET]: process.env.NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_HECO_TESTNET ?? '',
}

export { DETRUST_ABI, DETRUST_NETWORKS }
