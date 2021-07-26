import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from './walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'

//import { FortmaticConnector } from './fortmatic'
import { NetworkConnector } from './network-connector'

const PORTIS_ID =
  process.env.NEXT_PUBLIC_NETWORK_URL ?? 'https://mainnet.infura.io/v3/'

const NETWORK_URL =
  process.env.NEXT_PUBLIC_NETWORK_URL ?? 'https://mainnet.infura.io/v3/'

export const network = new NetworkConnector({
  urls: {
    [1]: NETWORK_URL,
    [56]: 'https://bsc-dataseed.binance.org/',
    [97]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  defaultChainId: 1,
})

class myWall extends WalletConnectConnector {
  constructor() {
    super({
      rpc: {
        [1]: NETWORK_URL,
      },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      pollingInterval: 15000,
    })
  }

  setRpc() {}
}

// mainnet only
export const walletconnect = new myWall()

export const networkReady = true

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary =
    networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1],
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'detrust',
  appLogoUrl: '',
})
