import { getAddress } from '@ethersproject/address'
import { ChainId } from '../constants'

// returns the checksummed address if the address is valid, otherwise returns false
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return ''
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
  56: '',
  97: '',
  65: '',
  66: '',
  128: '',
  256: '',
}
const BSC_PREFIXES: {
  [key: number]: string
} = {
  56: '',
  97: 'testnet.',
}
//https://testnet.bscscan.com
//https://bscscan.com
const OKEX_PREFIXES: {
  [key: number]: string
} = {
  65: 'okexchain-test',
  66: 'okexchain',
}
export function getEtherscanLink(
  chainId: ChainId = 1,
  data: string,
  type: 'transaction' | 'token' | 'address',
): string {
  const chainIdInt = parseInt(chainId.toString())
  let prefix = ''
  if (chainIdInt === 56 || chainIdInt === 97) {
    prefix = `https://${
      BSC_PREFIXES[chainIdInt] || BSC_PREFIXES[56]
    }bscscan.com`
  } else if (chainIdInt === 65 || chainIdInt === 66) {
    prefix = `https://www.oklink.com/${
      OKEX_PREFIXES[chainId] || OKEX_PREFIXES[65]
    }`
  } else {
    prefix = `https://${
      ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
    }etherscan.io`
  }

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}
