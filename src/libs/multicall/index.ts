// contexts
export { MulticallContextProvider, MulticallContext } from './contexts'

export {
  useMulticall,
  useBalanceOf,
  useETHBalances,
  useTokenBalances,
  useTokenBalancesWithLoadingIndicator,
  useMulticallContract,
  useMultipleContractSingleData,
  useSingleCallResult,
  useSingleContractMultipleData,
} from './hooks'

export type { Token, TokenAmount } from './interfaces'
