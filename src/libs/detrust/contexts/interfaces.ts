export interface DetrustContextProps extends DetrustStateProps {
  DetrustDispatch?: any
  ContractListRefetch?: any
  addTransaction?: any
}

export interface DetrustStateProps {
  walletTrustTokens: []
  contractTrustTokens: []
}

export interface ReducerActionProps {
  type: string
  payload?: any
}
