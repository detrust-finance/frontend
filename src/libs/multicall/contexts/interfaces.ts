export interface MulticallContextProps extends MulticallStateProps {
  WalletDispatch?: any
  ContractListRefetch?: any
  addTransaction?: any
}

export interface MulticallStateProps {
  callListeners?: {
    // on a per-chain basis
    [chainId: number]: {
      // stores for each call key the listeners' preferences
      [callKey: string]: {
        // stores how many listeners there are per each blocks per fetch preference
        [blocksPerFetch: number]: number
      }
    }
  }

  callResults: {
    [chainId: number]: {
      [callKey: string]: {
        data?: string | null
        blockNumber?: number
        fetchingBlockNumber?: number
      }
    }
  }
}

export interface ReducerActionProps {
  type: string
  payload?: any
}
