import { SelectOption } from '../theme/ui/forms/input/interfaces'
import { IMenu, ISidebarMenu } from './interfaces'

export const defaultLanguage = 'en'
export const API_URL = 'https://api.studio.thegraph.com/query/2808/detrust-subgraph/v0.0.6'
// export const API_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'https://api-dev.detrust.finance/graphql' :
//       'https://api.detrust.finance/graphql'
// export const API_BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'https://api-dev.detrust.finance' :
//       'https://api.detrust.finance'
export const DATE_FORMAT = 'YYYY/MM/DD HH:mm'
export const DATE_FORMAT_NO_TIME = 'YYYY/MM/DD'
export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'

export const NUMBER_FORMAT = {
  '0': '0,0',
  '2': '0,0.00',
  '3': '0,0.000',
  '4': '0,0.0000',
}

export const ONE_DAY_SECONDS = 86400

export const INTERVAL_OPTIONS: SelectOption[] = [
  {
    label: 'option.label.weekly',
    label2: 'option.label.week',
    value: '604800',
  },
  {
    label: 'option.label.monthly',
    label2: 'option.label.month',
    value: '2629744',
  },
  {
    label: 'option.label.yearly',
    label2: 'option.label.year',
    value: '31556926',
  },
]

export const menu: IMenu[] = [
  {
    title: 'home',
    path: '/',
  },
  {
    title: 'dashboard',
    path: '/dashboard',
  },
]
export const sidebarMenu: ISidebarMenu[] = [
  {
    icon: {
      path: {
        mouseenter: '/images/icon-wallet.svg',
        mouseleave: '/images/icon-wallet-hover.svg',
      },
      width: 24,
      height: 24,
    },
    title: 'balances',
    subtitle: 'wallet-and-contract',
    path: ['/dashboard', '/dashboard/balances/transfer-funds'],
    className: '',
  },
  {
    icon: {
      path: {
        mouseenter: '/images/icon-settlor.svg',
        mouseleave: '/images/icon-settlor-hover.svg',
      },
      width: 23,
      height: 35,
    },
    title: 'settlor',
    subtitle: 'lock-your-assets',
    path: [
      '/dashboard/settlor',
      '/dashboard/settlor/create-new-trust',
      '/dashboard/settlor/top-up-fund/[trustId]',
    ],
    className: 'dark',
  },
  {
    icon: {
      path: {
        mouseenter: '/images/icon-beneficiary.svg',
        mouseleave: '/images/icon-beneficiary-hover.svg',
      },
      width: 35,
      height: 32,
    },
    title: 'beneficiary',
    subtitle: 'claim-your-assets',
    path: [
      '/dashboard/beneficiary',
      '/dashboard/beneficiary/claim',
      '/dashboard/beneficiary/claim/[...params]',
    ],
    className: 'darker',
  },
]

export * from './interfaces'
export * from './api-responses'
