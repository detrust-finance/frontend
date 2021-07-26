import React from 'react'

export interface IMenu {
  title: string
  path: string | string[]
}

export interface ISidebarMenu extends IMenu {
  icon: ISidebarMenuIcon
  subtitle: string
  className: string
  exact?: boolean
}

export interface ISidebarMenuIcon {
  path: {
    mouseenter: string
    mouseleave: string
  }
  width: number | string
  height: number | string
}

export interface IApiTrustToken {
  name: string
  symbol: string
  contract_address: string
  enabled: boolean
  price_usd: number | string
  icon: {
    url: string
    width: number
    height: number
  }
  icon2x: {
    url: string
    width: number
    height: number
  }
  icon3x: {
    url: string
    width: number
    height: number
  }
  decimals: number
  network: {
    name: string
    chain_id: string
  }
  coingecko_id: string
}

export interface IFormData {
  trustId: string | number
  asset: string
  settlorAddress: string
  beneficiaryAddress: string
  fundName: string
  fundSource: string
  releaseAmount: string
  releaseInterval: string
  releaseStartTime: string
  totalDepositAmount: string
}

export interface IFormClaimData {
  trustId: string
  asset: string
  settlorAddress: string
  beneficiaryAddress: string
  fundName: string
  fundSource: string
  releaseToAddress: string
}

export interface IRemoteData {
  [x: string]: {
    price_usd: string | number
  }
}

export interface IApiDataResponse {
  walletTrustTokens: IRemoteData
  contractTrustTokens: IRemoteData
}

export interface SelectLanguageMenuProps {
  handleClose?: React.EffectCallback
}
