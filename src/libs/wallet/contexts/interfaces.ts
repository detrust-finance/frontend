export interface WalletContextProps extends WalletStateProps {
  WalletDispatch?: any
  ContractListRefetch?: any
  addTransaction?: any
}

export interface WalletStateProps {
  walletModalOpen: boolean
  chainEnabled: boolean
  transactions: any[]
  lastBlockNumber: number
  waitTxConfirm: boolean
  appVersion: number | string | undefined
}

export interface ReducerActionProps {
  type: string
  payload?: any
}
