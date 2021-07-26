import { useEffect, useMemo } from 'react'
import { useActiveWeb3React } from '../../wallet'
import { CallResult, Call, ListenerOptions } from '../interfaces'
import { parseCallKey, toCallKey } from '../utils'
import { useMulticall } from './useMulticall'

const INVALID_RESULT: CallResult = {
  valid: false,
  blockNumber: undefined,
  data: undefined,
}

const showDebug = false

// the lowest level call for subscribing to contract data
export function useCallsData(
  calls: (Call | undefined)[],
  options?: ListenerOptions,
): CallResult[] {
  const { chainId } = useActiveWeb3React()
  const { MulticallDispatch, callResults, callListeners } = useMulticall()
  if (showDebug) console.log('useCallsData init calls', calls)
  if (showDebug) console.log('useCallsData init callResults', callResults)
  if (showDebug) console.log('useCallsData init callListeners', callListeners)
  //const callResults:any = {}
  //const dispatch:any = {}
  //const callResults = useSelector<AppState, AppState['multicall']['callResults']>(state => state.multicall.callResults)
  //const dispatch = useDispatch<AppDispatch>()

  const serializedCallKeys: string = useMemo(
    () =>
      JSON.stringify(
        calls
          ?.filter((c): c is Call => Boolean(c))
          ?.map(toCallKey)
          ?.sort() ?? [],
      ),
    [calls],
  )

  // update listeners when there is an actual change that persists for at least 100ms
  useEffect(() => {
    const callKeys: string[] = JSON.parse(serializedCallKeys)
    if (!chainId || callKeys.length === 0) return undefined
    const calls = callKeys.map(key => parseCallKey(key))
    if (showDebug)
      console.log('useCallsData useEffect calls = serializedCallKeys', calls)
    if (showDebug)
      console.log('useCallsData useEffect callListeners', callListeners)

    const listeners = callListeners ?? {}
    listeners[chainId] = listeners[chainId] ?? {}
    const blocksPerFetch = 1
    calls.forEach(call => {
      const callKey = toCallKey(call)
      listeners[chainId][callKey] = listeners[chainId][callKey] ?? {}
      listeners[chainId][callKey][blocksPerFetch] =
        (listeners[chainId][callKey][blocksPerFetch] ?? 0) + 1
    })

    MulticallDispatch({
      type: 'UPDATE',
      payload: {
        callListeners: listeners,
      },
    })
    /*
    dispatch(
      addMulticallListeners({
        chainId,
        calls,
        options
      })
    )
*/
    return () => {
      const listeners = callListeners ?? {}
      if (showDebug)
        console.log(
          'useCallsData useEffect removing callListeners:',
          callListeners,
        )

      if (!listeners[chainId]) return
      calls.forEach(call => {
        const callKey = toCallKey(call)
        if (!listeners[chainId][callKey]) return
        if (!listeners[chainId][callKey][blocksPerFetch]) return

        if (listeners[chainId][callKey][blocksPerFetch] === 1) {
          delete listeners[chainId][callKey][blocksPerFetch]
        } else {
          listeners[chainId][callKey][blocksPerFetch]--
        }
      })
      if (showDebug)
        console.log('useCallsData useEffect removing new listeners:', listeners)
      MulticallDispatch({
        type: 'UPDATE',
        payload: {
          callListeners: listeners,
        },
      })
      /*
      dispatch(
        removeMulticallListeners({
          chainId,
          calls,
          options
        })
      )
      */
    }
  }, [chainId, MulticallDispatch, options, callListeners, serializedCallKeys])

  return useMemo(
    () =>
      calls.map<CallResult>(call => {
        if (showDebug)
          console.log('useCallsData return calls  call', call, callResults)
        if (!chainId || !call) return INVALID_RESULT

        if (showDebug)
          console.log('useCallsData return callResults ', callResults)
        if (showDebug)
          console.log(
            'useCallsData return callResults[chainId] ',
            callResults[chainId],
          )
        const result = callResults[chainId]?.[toCallKey(call)]
        if (showDebug) console.log('useCallsData return result ', result)
        let data
        if (result?.data && result?.data !== '0x') {
          data = result.data
        }

        return { valid: true, data, blockNumber: result?.blockNumber }
      }),
    [callResults, calls, chainId],
  )
}
