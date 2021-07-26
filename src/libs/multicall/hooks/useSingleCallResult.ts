import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { useBlockNumber } from '../../wallet'
import {
  OptionalMethodInputs,
  CallState,
  ListenerOptions,
  Call,
} from '../interfaces'
import { isValidMethodArgs, toCallState } from '../utils'
import { useCallsData } from './'

export function useSingleCallResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
  options?: ListenerOptions,
): CallState {
  const fragment = useMemo(
    () => contract?.interface?.getFunction(methodName),
    [contract, methodName],
  )

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs),
          },
        ]
      : []
  }, [contract, fragment, inputs])

  const result = useCallsData(calls, options)[0]
  const latestBlockNumber = useBlockNumber()

  return useMemo(() => {
    return toCallState(result, contract?.interface, fragment, latestBlockNumber)
  }, [result, contract, fragment, latestBlockNumber])
}
