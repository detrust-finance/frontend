import { Contract } from '@ethersproject/contracts'
import React, { useEffect, useMemo, useRef } from 'react'
import _ from 'lodash'
// Hooks
import { useActiveWeb3React, useBlockNumber } from '../../wallet/hooks'
// Interfaces
import {
  MulticallContextProps,
  MulticallStateProps,
  ReducerActionProps,
} from './interfaces'
// Constants
import { Call } from '../interfaces'
import { CancelledError, retry, RetryableError } from '../../wallet/utils/retry'
import { useDebounce } from '../hooks'
import { useMulticallContract } from '../hooks/useContract'
import { parseCallKey, chunkArray, toCallKey } from '../utils'
// Components
// import { ReloadNotification } from '../components'

const showDebug = false

const initialState: MulticallStateProps = {
  callResults: {},
}

const reducer = (
  state: MulticallStateProps,
  { type, payload }: ReducerActionProps,
) => {
  switch (type) {
    case 'UPDATE':
      return { ...state, ...payload }
    default:
      return state
  }
}

export const MulticallContext = React.createContext<MulticallContextProps>({
  ...initialState,
})

// chunk calls so we do not exceed the gas limit
const CALL_CHUNK_SIZE = 500

/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param multicallContract multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param minBlockNumber minimum block number of the result set
 */
async function fetchChunk(
  multicallContract: Contract,
  chunk: Call[],
  minBlockNumber: number,
): Promise<{ results: string[]; blockNumber: number }> {
  console.debug('Fetching chunk', multicallContract, chunk, minBlockNumber)
  let resultsBlockNumber, returnData
  try {
    ;[resultsBlockNumber, returnData] = await multicallContract.aggregate(
      chunk.map(obj => [obj.address, obj.callData]),
    )
  } catch (error) {
    console.debug('Failed to fetch chunk inside retry', error)
    throw error
  }
  if (resultsBlockNumber.toNumber() < minBlockNumber) {
    console.debug(
      `Fetched results for old block number: ${resultsBlockNumber.toString()} vs. ${minBlockNumber}`,
    )
    throw new RetryableError('Fetched for old block number')
  }
  return { results: returnData, blockNumber: resultsBlockNumber.toNumber() }
}

/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */
export function activeListeningKeys(
  //allListeners: AppState['multicall']['callListeners'],
  allListeners: any,
  chainId?: number,
): { [callKey: string]: number } {
  if (!allListeners || !chainId) return {}
  if (showDebug)
    console.log(
      'context activeListeningKeys allListeners',
      JSON.stringify(allListeners),
    )
  if (showDebug) console.log('context activeListeningKeys chainId', chainId)
  const listeners = allListeners[chainId]
  if (showDebug)
    console.log(
      'context activeListeningKeys listeners',
      JSON.stringify(listeners),
    )
  if (!listeners) return {}

  const returnKeys = Object.keys(listeners).reduce<{
    [callKey: string]: number
  }>((memo, callKey) => {
    const keyListeners = listeners[callKey]
    if (showDebug) console.log('context activeListeningKeys memo', memo)
    if (showDebug) console.log('context activeListeningKeys callKey', callKey)
    if (showDebug)
      console.log('context activeListeningKeys keyListeners', keyListeners)

    memo[callKey] = Object.keys(keyListeners)
      .filter(key => {
        const blocksPerFetch = parseInt(key)
        if (blocksPerFetch <= 0) return false
        return keyListeners[blocksPerFetch] > 0
      })
      .reduce((previousMin, current) => {
        return Math.min(previousMin, parseInt(current))
      }, Infinity)
    if (showDebug) console.log('context activeListeningKeys memo return', memo)
    return memo
  }, {})
  if (showDebug)
    console.log('context activeListeningKeys returnKeys', returnKeys)
  return returnKeys
}

/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param listeningKeys each call key mapped to how old the data can be in blocks
 * @param chainId the current chain id
 * @param latestBlockNumber the latest block number
 */
export function outdatedListeningKeys(
  //callResults: AppState['multicall']['callResults'],
  callResults: any,
  listeningKeys: { [callKey: string]: number },
  chainId: number | undefined,
  latestBlockNumber: number | undefined,
): string[] {
  if (!chainId || !latestBlockNumber) return []
  const results = callResults[chainId]
  // no results at all, load everything
  if (!results) return Object.keys(listeningKeys)

  return Object.keys(listeningKeys).filter(callKey => {
    const blocksPerFetch = listeningKeys[callKey]

    const data = callResults[chainId][callKey]
    // no data, must fetch
    if (!data) return true

    const minDataBlockNumber = latestBlockNumber - (blocksPerFetch - 1)

    // already fetching it for a recent enough block, don't refetch it
    if (
      data.fetchingBlockNumber &&
      data.fetchingBlockNumber >= minDataBlockNumber
    )
      return false

    // if data is older than minDataBlockNumber, fetch it
    return !data.blockNumber || data.blockNumber < minDataBlockNumber
  })
}

const MulticallContextProvider: React.FC = ({ children }) => {
  const [MulticallState, MulticallDispatch] = React.useReducer(
    reducer,
    initialState,
  )
  const { callListeners, callResults } = MulticallState
  if (showDebug)
    console.log('context init callListeners', JSON.stringify(callListeners))
  if (showDebug)
    console.log('context init callResults', JSON.stringify(callResults))

  // wait for listeners to settle before triggering updates
  const debouncedListeners = useDebounce(callListeners, 100)
  const latestBlockNumber = useBlockNumber()
  const { chainId } = useActiveWeb3React()
  const multicallContract = useMulticallContract()
  const cancellations =
    useRef<{ blockNumber: number; cancellations: (() => void)[] }>()

  const listeningKeys: { [callKey: string]: number } = useMemo(() => {
    if (showDebug)
      console.log(
        'context listeningKeys got callListeners',
        JSON.stringify(callListeners),
      )
    if (showDebug)
      console.log(
        'context listeningKeys got callListeners debouncedListeners',
        JSON.stringify(debouncedListeners),
      )
    const activeKeys = activeListeningKeys(debouncedListeners, chainId)
    if (showDebug)
      console.log('context listeningKeys return', JSON.stringify(activeKeys))
    return activeKeys
  }, [JSON.stringify(debouncedListeners), chainId])

  const unserializedOutdatedCallKeys = useMemo(() => {
    if (showDebug)
      console.log(
        'context unserializedOutdatedCallKeys input listeningKeys',
        listeningKeys,
      )
    if (showDebug)
      console.log(
        'context unserializedOutdatedCallKeys callResults listeningKeys latestBlockNumber chainId',
        callResults,
        listeningKeys,
        latestBlockNumber,
        chainId,
      )
    return outdatedListeningKeys(
      callResults,
      listeningKeys,
      chainId,
      latestBlockNumber,
    )
  }, [chainId, callResults, listeningKeys, latestBlockNumber])

  const serializedOutdatedCallKeys = useMemo(
    () => JSON.stringify(unserializedOutdatedCallKeys.sort()),
    [unserializedOutdatedCallKeys],
  )

  useEffect(() => {
    if (showDebug) console.log('context multicall')
    if (!latestBlockNumber || !chainId || !multicallContract) return
    if (showDebug)
      console.log('context multicall latestBlockNumber', latestBlockNumber)

    const outdatedCallKeys: string[] = JSON.parse(serializedOutdatedCallKeys)
    if (outdatedCallKeys.length === 0) return
    const calls = outdatedCallKeys.map(key => parseCallKey(key))

    if (showDebug) console.log('context outdatedCallKeys', outdatedCallKeys)
    if (showDebug) console.log('context calls', calls)
    const chunkedCalls = chunkArray(calls, CALL_CHUNK_SIZE)
    if (showDebug) console.log('context chunkedCalls', chunkedCalls)

    if (cancellations.current?.blockNumber !== latestBlockNumber) {
      cancellations.current?.cancellations?.forEach(c => c())
    }

    if (showDebug)
      console.log(
        'context multicall calls chainId fetchingBlockNumber',
        calls,
        chainId,
        latestBlockNumber,
      )

    const newCallResults = callResults ?? {}
    newCallResults[chainId] = callResults[chainId] ?? {}
    calls.forEach(call => {
      const callKey = toCallKey(call)
      const current = newCallResults[chainId][callKey]
      if (!current) {
        newCallResults[chainId][callKey] = {
          fetchingBlockNumber: latestBlockNumber,
        }
      } else {
        if ((current.fetchingBlockNumber ?? 0) >= latestBlockNumber) return
        newCallResults[chainId][callKey].fetchingBlockNumber = latestBlockNumber
      }
    })

    MulticallDispatch({
      type: 'UPDATE',
      payload: {
        callResults: newCallResults,
      },
    })
    /*
    MulticallDispatch(
      fetchingMulticallResults({
        calls,
        chainId,
        fetchingBlockNumber: latestBlockNumber
      })
    )
*/
    cancellations.current = {
      blockNumber: latestBlockNumber,
      cancellations: chunkedCalls.map((chunk, index) => {
        const { cancel, promise } = retry(
          () => fetchChunk(multicallContract, chunk, latestBlockNumber),
          {
            n: Infinity,
            minWait: 2500,
            maxWait: 3500,
          },
        )
        promise
          .then(({ results: returnData, blockNumber: fetchBlockNumber }) => {
            cancellations.current = {
              cancellations: [],
              blockNumber: latestBlockNumber,
            }

            // accumulates the length of all previous indices
            const firstCallKeyIndex = chunkedCalls
              .slice(0, index)
              .reduce<number>((memo, curr) => memo + curr.length, 0)
            const lastCallKeyIndex = firstCallKeyIndex + returnData.length
            //if (showDebug) console.log('lastCallKeyIndex', lastCallKeyIndex)
            if (showDebug) console.log('context returnData', returnData)
            const results = outdatedCallKeys
              .slice(firstCallKeyIndex, lastCallKeyIndex)
              .reduce<{ [callKey: string]: string | null }>(
                (memo, callKey, i) => {
                  memo[callKey] = returnData[i] ?? null
                  return memo
                },
                {},
              )
            if (showDebug)
              console.log('context outdatedCallKeys', outdatedCallKeys)
            if (showDebug) console.log('context results', results)

            if (showDebug) console.log('context callResults', callResults)
            const newCallResults = callResults ?? {}
            newCallResults[chainId] = callResults[chainId] ?? {}
            Object.keys(results).forEach(callKey => {
              const current = newCallResults[chainId][callKey]
              if ((current?.blockNumber ?? 0) > fetchBlockNumber) return
              newCallResults[chainId][callKey] = {
                data: results[callKey],
                blockNumber: fetchBlockNumber,
              }
            })

            if (showDebug)
              console.log('context newCallResults', newCallResults?.[4])
            MulticallDispatch({
              type: 'UPDATE',
              payload: {
                callResults: newCallResults,
              },
            })
          })
          .catch((error: any) => {
            if (error instanceof CancelledError) {
              console.debug(
                'Cancelled fetch for blockNumber',
                latestBlockNumber,
              )
              return
            }
            console.error(
              'Failed to fetch multicall chunk',
              chunk,
              chainId,
              error,
            )
            const newCallResults = callResults ?? {}
            newCallResults[chainId] = callResults[chainId] ?? {}
            calls.forEach(call => {
              const callKey = toCallKey(call)
              const current = newCallResults[chainId][callKey]
              if (!current) return // only should be dispatched if we are already fetching
              if (current.fetchingBlockNumber === latestBlockNumber) {
                delete current.fetchingBlockNumber
                current.data = null
                current.blockNumber = latestBlockNumber
              }
            })
            MulticallDispatch({
              type: 'UPDATE',
              payload: {
                callResults: newCallResults,
              },
            })
            /*
            MulticallDispatch(
              errorFetchingMulticallResults({
                calls: chunk,
                chainId,
                fetchingBlockNumber: latestBlockNumber
              })
            )
            */
          })
        return cancel
      }),
    }
  }, [
    chainId,
    multicallContract,
    MulticallDispatch,
    callResults,
    serializedOutdatedCallKeys,
    latestBlockNumber,
  ])

  return (
    <MulticallContext.Provider
      value={{
        ...MulticallState,
        MulticallDispatch,
      }}
    >
      {children}
    </MulticallContext.Provider>
  )
}

export default MulticallContextProvider
