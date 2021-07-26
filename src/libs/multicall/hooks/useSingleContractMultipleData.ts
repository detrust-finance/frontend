import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { useBlockNumber } from '../../wallet'
import {
  Call,
  CallState,
  ListenerOptions,
  OptionalMethodInputs,
} from '../interfaces'
import { toCallState } from '../utils'
import { useCallsData } from './useCallsData'

export function useSingleContractMultipleData(
  contract: Contract | null | undefined,
  methodName: string,
  callInputs: OptionalMethodInputs[],
  options?: ListenerOptions,
): CallState[] {
  const fragment = useMemo(
    () => contract?.interface?.getFunction(methodName),
    [contract, methodName],
  )

  const calls = useMemo(
    () =>
      contract && fragment && callInputs && callInputs.length > 0
        ? callInputs.map<Call>(inputs => {
            return {
              address: contract.address,
              callData: contract.interface.encodeFunctionData(fragment, inputs),
            }
          })
        : [],
    [callInputs, contract, fragment],
  )

  const results = useCallsData(calls, options)

  const latestBlockNumber = useBlockNumber()

  return useMemo(() => {
    return results.map(result =>
      toCallState(result, contract?.interface, fragment, latestBlockNumber),
    )
  }, [fragment, contract, results, latestBlockNumber])
}
