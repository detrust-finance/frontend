import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { parseEther } from '@ethersproject/units'
import { isAddress } from '.'

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string,
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}
// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any,
  )
}

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(10000)))
    .div(BigNumber.from(10000))
}

export const sendTransaction = async (
  library: Web3Provider,
  account: string,
  amount: string,
  to: string,
) => {
  const signer = getSigner(library, account)
  const estimatedGas = await signer
    .estimateGas({
      value: parseEther(amount),
      to: to,
    })
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return signer.estimateGas({
        value: parseEther(amount),
        to: to,
      })
    })

  return signer
    .sendTransaction({
      gasLimit: calculateGasMargin(estimatedGas),
      value: parseEther(amount),
      to: to,
    })
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to sendTransaction', error)
      throw error
    })
}
