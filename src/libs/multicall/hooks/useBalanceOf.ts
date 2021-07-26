import { useMemo } from 'react'
import {
  useActiveWeb3React,
  useTokenContract,
  isAddress,
  ERC20_INTERFACE,
} from '../../wallet'

import { useMulticallContract } from '../hooks/useContract'
import { Token, TokenAmount } from '../interfaces'
import { useSingleCallResult } from './'
import { useMultipleContractSingleData } from './useMultipleContractSingleData'
import { useSingleContractMultipleData } from './useSingleContractMultipleData'

const showDebug = false

export function useBalanceOf(token?: any): {
  token: string
  amount: string
} {
  const { account } = useActiveWeb3React()
  const contract = useTokenContract(token?.address, false)

  const { result } = useSingleCallResult(contract, 'balanceOf', [
    account ?? undefined,
  ])
  const data = result?.[0]

  return useMemo(
    () =>
      data
        ? {
            token: token?.address,
            amount: data.toString(),
          }
        : {
            token: token?.address,
            amount: '',
          },
    [token, data],
  )
}
/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(
  uncheckedAddresses?: (string | null | undefined)[],
): { [address: string]: TokenAmount | undefined } {
  const multicallContract = useMulticallContract()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses],
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map(address => [address]),
  )

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: any }>(
        (memo, address, i) => {
          const value = results?.[i]?.result?.[0]
          if (value)
            memo[address] = {
              token: 'ETH',
              amount: value.toString(),
            }
          return memo
        },
        {
          token: 'ETH',
          amount: '',
        },
      ),
    [addresses, results],
  )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[],
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () =>
      tokens?.filter(
        (t?: Token): t is Token => isAddress(t?.contract_address) !== false,
      ) ?? [],
    [tokens],
  )
  if (showDebug)
    console.log(
      'useTokenBalancesWithLoadingIndicator got tokens',
      validatedTokens,
    )
  const validatedTokenAddresses = useMemo(
    () => validatedTokens.map(vt => vt.contract_address),
    [validatedTokens],
  )

  if (showDebug)
    console.log(
      'useTokenBalancesWithLoadingIndicator got validatedTokenAddresses',
      validatedTokenAddresses,
    )
  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    ERC20_INTERFACE,
    'balanceOf',
    [address],
  )

  if (showDebug)
    console.log('useTokenBalancesWithLoadingIndicator got balances', balances)
  const anyLoading: boolean = useMemo(
    () => balances.some(callState => callState.loading),
    [balances],
  )

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{
              [tokenAddress: string]: TokenAmount | undefined
            }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? value.toString() : undefined
              if (amount) {
                memo[token.contract_address] = {
                  token: token.contract_address,
                  amount: amount,
                }
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances],
    ),
    anyLoading,
  ]
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[],
): { [tokenAddress: string]: TokenAmount | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}
