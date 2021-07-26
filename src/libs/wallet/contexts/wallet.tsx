import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
//import _ from 'lodash'
// Hooks
import { useActiveWeb3React, useToastify } from '../hooks'
// Interfaces
import {
  WalletContextProps,
  WalletStateProps,
  ReducerActionProps,
} from './interfaces'
// Constants
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
// Components
// import { ReloadNotification } from '../components'

const initialState: WalletStateProps = {
  walletModalOpen: false,
  chainEnabled: false,
  transactions: [],
  lastBlockNumber: 0,
  waitTxConfirm: false,
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION,
}

const reducer = (
  state: WalletStateProps,
  { type, payload }: ReducerActionProps,
) => {
  switch (type) {
    case 'UPDATE':
      return { ...state, ...payload }
    default:
      return state
  }
}

export const WalletContext = React.createContext<WalletContextProps>({
  ...initialState,
})

export const shouldCheck = (
  lastBlockNumber: number,
  tx: {
    addedTime: number
    receipt?: {}
    lastCheckedBlockNumber?: number
    confirmed: boolean
  },
): boolean => {
  if (tx.receipt) return false
  if (tx.confirmed) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (moment().unix() - tx.addedTime) / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}

const WalletContextProvider: React.FC = ({ children }) => {
  const { t } = useTranslation('platform')
  const [WalletState, WalletDispatch] = React.useReducer(reducer, initialState)
  const { chainId, account } = useWeb3React()
  const { txToast } = useToastify()
  const { lastBlockNumber, transactions } = WalletState
  const { library } = useActiveWeb3React()
  const [lastBlockNumberChecked, setLastBlockNumberChecked] = useState(0)

  const blockNumberCallback = useCallback((blockNumber: number) => {
    WalletDispatch({
      type: 'UPDATE',
      payload: {
        lastBlockNumber: blockNumber,
      },
    })
  }, [])

  const addTransaction = useCallback(
    (tx: any, callback: () => void = () => {}) => {
      const hash = tx.hash

      const txs = transactions ?? {}
      txs[hash] = {
        hash,
        from: account,
        addedTime: moment().unix(),
        confirmed: false,
        callback,
      }
      WalletDispatch({
        type: 'UPDATE',
        payload: {
          transactions: txs,
          waitTxConfirm: true,
        },
      })
    },
    [transactions, account],
  )

  const [txHashChecking, setTxHashChecking] = useState('')
  useEffect(() => {
    if (
      !chainId ||
      !library ||
      !lastBlockNumber ||
      lastBlockNumberChecked >= lastBlockNumber
    )
      return
    setLastBlockNumberChecked(lastBlockNumber)
    Object.keys(transactions)
      .filter(hash => shouldCheck(lastBlockNumber, transactions[hash]))
      .forEach(hash => {
        if (hash === txHashChecking) return
        setTxHashChecking(hash)
        library
          .getTransactionReceipt(hash)
          .then(receipt => {
            if (receipt) {
              const txs = transactions
              txs[hash].confirmed = true
              txs[hash].receipt = {
                blockHash: receipt.blockHash,
                blockNumber: receipt.blockNumber,
                contractAddress: receipt.contractAddress,
                from: receipt.from,
                status: receipt.status,
                to: receipt.to,
                transactionHash: receipt.transactionHash,
                transactionIndex: receipt.transactionIndex,
              }
              WalletDispatch({
                type: 'UPDATE',
                payload: {
                  transactions: txs,
                },
              })
              WalletDispatch({
                type: 'UPDATE',
                payload: {
                  waitTxConfirm: false,
                },
              })

              txToast(
                t('message-txconfirmed'),
                receipt.transactionHash,
                'success',
              )

              txs[hash].callback()

              setTxHashChecking('')
            } else {
              const txs = transactions
              txs[hash].lastCheckedBlockNumber = lastBlockNumber
              WalletDispatch({
                type: 'UPDATE',
                payload: {
                  transactions: txs,
                },
              })
              setTxHashChecking('')
            }
          })
          .catch(error => {
            console.error(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [
    txHashChecking,
    setTxHashChecking,
    lastBlockNumberChecked,
    setLastBlockNumberChecked,
    txToast,
    chainId,
    library,
    transactions,
    lastBlockNumber,
    t,
    blockNumberCallback,
  ])

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId) return undefined

    //setState({ chainId, blockNumber: null })
    try {
      library
        .getBlockNumber()
        .then(blockNumberCallback)
        .catch(error =>
          console.error(
            `Failed to get block number for chainId: ${chainId}`,
            error,
          ),
        )

      library.on('block', blockNumberCallback)
    } catch (e) {
      console.log('e', e)
    }
    return () => {
      library.removeListener('block', blockNumberCallback)
    }
  }, [chainId, library, blockNumberCallback])

  return (
    <WalletContext.Provider
      value={{
        ...WalletState,
        WalletDispatch,
        addTransaction: addTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider
