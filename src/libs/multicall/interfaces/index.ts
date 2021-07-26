import BigNumber from 'bignumber.js'

export type MethodArg = string | number | BigNumber
export type MethodArgs = Array<MethodArg | MethodArg[]>
export type OptionalMethodInputs =
  | Array<MethodArg | MethodArg[] | undefined>
  | undefined

export interface Result extends ReadonlyArray<any> {
  readonly [key: string]: any
}

export interface CallState {
  readonly valid: boolean
  // the result, or undefined if loading or errored/no data
  readonly result: Result | undefined
  // true if the result has never been fetched
  readonly loading: boolean
  // true if the result is not for the latest block
  readonly syncing: boolean
  // true if the call was made and is synced, but the return data is invalid
  readonly error: boolean
}

export interface CallResult {
  readonly valid: boolean
  readonly data: string | undefined
  readonly blockNumber: number | undefined
}

export interface ListenerOptions {
  // how often this data should be fetched, by default 1
  readonly blocksPerFetch?: number
}

export interface Call {
  address: string
  callData: string
}

export interface Token {
  address: string
  contract_address: string
  symbol?: string
  name?: string
  enabled?: boolean
}

export interface TokenAmount {
  token: string
  amount: string
}
