import { Interface } from '@ethersproject/abi'
import { useMemo } from 'react'
import { useBlockNumber } from '../../wallet'
import {
  Call,
  CallState,
  ListenerOptions,
  OptionalMethodInputs,
} from '../interfaces'
import { isValidMethodArgs, toCallState } from '../utils'
import { useCallsData } from './useCallsData'

const showDebug = false

export function useMultipleContractSingleData(
  addresses: (string | undefined)[],
  contractInterface: Interface,
  methodName: string,
  callInputs?: OptionalMethodInputs,
  options?: ListenerOptions,
): CallState[] {
  const fragment = useMemo(
    () => contractInterface.getFunction(methodName),
    [contractInterface, methodName],
  )
  const callData: string | undefined = useMemo(
    () =>
      fragment && isValidMethodArgs(callInputs)
        ? contractInterface.encodeFunctionData(fragment, callInputs)
        : undefined,
    [callInputs, contractInterface, fragment],
  )
  if (showDebug) console.log('useMultipleContractSingleData callData', callData)

  const calls = useMemo(
    () =>
      fragment && addresses && addresses.length > 0 && callData
        ? addresses.map<Call | undefined>(address => {
            return address && callData
              ? {
                  address,
                  callData,
                }
              : undefined
          })
        : [],
    [addresses, callData, fragment],
  )
  if (showDebug) console.log('useMultipleContractSingleData calls', calls)
  if (showDebug) console.log('useMultipleContractSingleData options', options)

  const results = useCallsData(calls, options)
  if (showDebug) console.log('useMultipleContractSingleData results', results)

  const latestBlockNumber = useBlockNumber()

  return useMemo(() => {
    return results.map(result =>
      toCallState(result, contractInterface, fragment, latestBlockNumber),
    )
  }, [fragment, results, contractInterface, latestBlockNumber])
}
