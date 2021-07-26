import React, { useCallback, useEffect } from 'react'
// Hooks
import { useGetWalletTrustTokens, useGetContractTrustTokens } from '../hooks'
import { useActiveWeb3React, useWallet } from '../../wallet'
// Interfaces
import {
  DetrustContextProps,
  DetrustStateProps,
  ReducerActionProps,
} from './interfaces'
// Constants
import { DETRUST_NETWORKS } from '../constants'

const initialState: DetrustStateProps = {
  walletTrustTokens: [],
  contractTrustTokens: [],
}

const reducer = (
  state: DetrustStateProps,
  { type, payload }: ReducerActionProps,
) => {
  switch (type) {
    case 'UPDATE':
      return { ...state, ...payload }
    default:
      return state
  }
}

export const DetrustContext = React.createContext<DetrustContextProps>({
  ...initialState,
})

const DetrustContextProvider: React.FC = ({ children }) => {
  //const { t } = useTranslation('platform')
  const [DetrustState, DetrustDispatch] = React.useReducer(
    reducer,
    initialState,
  )

  const { chainId } = useActiveWeb3React()
  const { WalletDispatch } = useWallet()

  const { onGetWalletTrustTokens } = useGetWalletTrustTokens(chainId)
  const { onGetContractTrustTokens } = useGetContractTrustTokens(chainId)

  useEffect(() => {
    if (!chainId) return
    if (DETRUST_NETWORKS[chainId] !== '') {
      WalletDispatch({
        type: 'UPDATE',
        payload: {
          chainEnabled: true,
        },
      })
    } else {
      WalletDispatch({
        type: 'UPDATE',
        payload: {
          chainEnabled: false,
        },
      })
    }
  }, [chainId, WalletDispatch])

  const handleLists = useCallback(async () => {
    try {
      let walletTrustTokens: any = []
      let contractTrustTokens: any = []

      const walletResult = await onGetWalletTrustTokens()
      //console.log('walletResult', walletResult)
      if (walletResult?.status_code === 200) {
        walletTrustTokens = walletResult.data
      }
      const contractResult = await onGetContractTrustTokens()
      //console.log('contractResult', contractResult)
      if (contractResult?.status_code === 200) {
        contractTrustTokens = contractResult.data
      }
      DetrustDispatch({
        type: 'UPDATE',
        payload: {
          walletTrustTokens,
          contractTrustTokens,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }, [onGetWalletTrustTokens, onGetContractTrustTokens])

  useEffect(() => {
    if (!chainId) return
    handleLists()
  }, [chainId, handleLists])

  return (
    <DetrustContext.Provider
      value={{
        ...DetrustState,
        DetrustDispatch,
      }}
    >
      {children}
    </DetrustContext.Provider>
  )
}

export default DetrustContextProvider
