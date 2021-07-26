// contexts
export { WalletContextProvider, WalletContext } from './contexts'

// components
export { Web3ReactManager } from './components'

// hooks
export {
  useActiveWeb3React,
  useBlockNumber,
  useWallet,
  useContract,
  useTokenContract,
  useSendTransaction,
} from './hooks'

export { ChainId } from './constants'

export { NETWORK_CHAIN_ID } from './connectors'

export { isAddress, getEtherscanLink } from './utils'

export { calculateGasMargin } from './utils/contract'

export {
  ERC20_ABI,
  ERC20_BYTES32_ABI,
  ERC20_INTERFACE,
  ERC20_BYTES32_INTERFACE,
} from './constants/abis/erc20'
