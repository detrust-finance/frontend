import { useCallback, useContext } from 'react'

import { WalletContext } from '../contexts/wallet'
import { sendTransaction } from '../utils/contract'
import { useActiveWeb3React } from './useActiveWeb3React'

export function useWallet(): any {
  const wallet = useContext(WalletContext)
  return wallet
}

export const useSendTransaction = () => {
  const { library, account } = useActiveWeb3React()

  const handleAction = useCallback(
    async (amount: any, to: any) => {
      if (!library || !account)
        return {
          message: 'error',
        }
      try {
        const tx = await sendTransaction(library, account, amount, to)
        return tx
      } catch (e) {
        return e
      }
    },
    [library, account],
  )

  return { onSendTransaction: handleAction }
}
