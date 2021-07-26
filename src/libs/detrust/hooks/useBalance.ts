import { useMemo } from 'react'
import { isAddress, ERC20_INTERFACE } from '../../wallet'

import {
  Token,
  TokenAmount,
  useMultipleContractSingleData,
} from '../../multicall'
import BigNumber from 'bignumber.js'
import { ETH_ADDRESS } from '../../../constants'

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useBalances(
  address: string,
  tokens?: (Token | undefined)[],
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () =>
      tokens?.filter(
        (t?: Token): t is Token =>
          isAddress(t?.contract_address) !== false &&
          t?.contract_address !== ETH_ADDRESS &&
          t?.enabled === true,
      ) ?? [],
    [tokens],
  )

  const validatedTokenAddresses = useMemo(
    () => validatedTokens.map(vt => vt.contract_address),
    [validatedTokens],
  )

  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    ERC20_INTERFACE,
    'balanceOf',
    [address],
  )

  const anyLoading: boolean = useMemo(
    () => balances.some(callState => callState.loading),
    [balances],
  )

  return [
    useMemo(
      () =>
        address && tokens && tokens.length > 0
          ? tokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>(
              (memo, token, i) => {
                if (token?.contract_address === ETH_ADDRESS) {
                  /*
                console.log('etththth ETH', ethResults?.[0].result?.[0].toString())
                memo[token!.contract_address] = {
                  token: token!.contract_address,
                  amount: new BigNumber(ethResults?.[0].result?.[0].toString()).dividedBy(1e18).toFixed(2)
                }
                */
                } else if (
                  validatedTokenAddresses.indexOf(token!.contract_address)
                ) {
                  const value = balances?.[i - 1]?.result?.[0]
                  const amount = value ? value.toString() : '0'
                  memo[token!.contract_address] = {
                    token: token!.contract_address,
                    amount: new BigNumber(amount).dividedBy(1e18).toFixed(2),
                  }
                }
                return memo
              },
              {},
            )
          : {},
      [address, tokens, validatedTokenAddresses, balances],
    ),
    anyLoading,
  ]
}
