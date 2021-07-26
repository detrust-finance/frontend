import { calculateGasMargin } from '../../wallet'
// READ methods

/**
 * @notice Get the balance in this contract, which is not send to any trust
 * @return the balance of the settlor in this contract
 */
export const getBalance = async (detrustContract: any, account: string) => {
  return detrustContract.functions.getBalance(account)
}

export const getTrustListAsBeneficiary = async (
  detrustContract: any,
  account: string,
) => {
  return detrustContract.functions.getTrustListAsBeneficiary(account)
}
export const getTrustListAsSettlor = async (
  detrustContract: any,
  account: string,
) => {
  return detrustContract.functions.getTrustListAsSettlor(account)
}
// write

// write
/**
  * Add a new trust by pay
  *
  * @param detrustContract contract
  * @param amount total amount
  * @param name the trust's name
  * @param beneficiary the beneficiary's address to receive the trust fund
  * @param startReleaseTime the start time beneficiary can start to get money,
                            UTC seconds
  * @param timeInterval how often the beneficiary can get money
  * @param amountPerTimeInterval how much money can beneficiary get after one timeInterval
  */
export const addTrust = async (
  detrustContract: any,
  amount: string,
  name: string,
  beneficiary: string,
  startReleaseTime: string,
  timeInterval: string,
  amountPerTimeInterval: string,
  revocable: boolean,
) => {
  const estimatedGas = await detrustContract.estimateGas
    .addTrust(
      name,
      beneficiary,
      startReleaseTime,
      timeInterval,
      amountPerTimeInterval,
      revocable,
      {
        value: amount,
      },
    )
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.addTrust(
        name,
        beneficiary,
        startReleaseTime,
        timeInterval,
        amountPerTimeInterval,
        revocable,
      )
    })

  return detrustContract
    .addTrust(
      name,
      beneficiary,
      startReleaseTime,
      timeInterval,
      amountPerTimeInterval,
      revocable,
      {
        gasLimit: calculateGasMargin(estimatedGas),
        value: amount,
      },
    )
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to addTrust', error)
      throw error
    })
}
/**
  * Add a new trust from settlor's balance in this contract.
  *
  * @param name the trust's name
  * @param beneficiary the beneficiary's address to receive the trust fund
  * @param startReleaseTime the start time beneficiary can start to get money,
                            UTC seconds
  * @param timeInterval how often the beneficiary can get money
  * @param amountPerTimeInterval how much money can beneficiary get after one timeInterval
  * @param totalAmount how much money is added to the trust
  */
export const addTrustFromBalance = async (
  detrustContract: any,
  amount: string,
  name: string,
  beneficiary: string,
  startReleaseTime: string,
  timeInterval: string,
  amountPerTimeInterval: string,
  revocable: boolean,
) => {
  const estimatedGas = await detrustContract.estimateGas
    .addTrustFromBalance(
      name,
      beneficiary,
      startReleaseTime,
      timeInterval,
      amountPerTimeInterval,
      amount,
      revocable,
    )
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.addTrustFromBalance(
        name,
        beneficiary,
        startReleaseTime,
        timeInterval,
        amountPerTimeInterval,
        amount,
        revocable,
      )
    })

  return detrustContract
    .addTrustFromBalance(
      name,
      beneficiary,
      startReleaseTime,
      timeInterval,
      amountPerTimeInterval,
      amount,
      revocable,
      {
        gasLimit: calculateGasMargin(estimatedGas),
      },
    )
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to addTrustFromBalance', error)
      throw error
    })
}

/**
 * Beneficiary get token by this function, release all the
 * trust releaeable assets in the contract
 */
export const releaseAll = async (detrustContract: any) => {
  const estimatedGas = await detrustContract.estimateGas
    .releaseAll()
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.releaseAll()
    })

  return detrustContract
    .releaseAll({
      gasLimit: calculateGasMargin(estimatedGas),
    })
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to releaseAll', error)
      throw error
    })
}

/**
 * If money is send to this contract by accident, can use this
 * function to get money back ASAP.
 *
 * @param to the address money would send to
 * @param amount how much money are added into the trust
 */
export const sendBalanceTo = async (
  detrustContract: any,
  amount: string,
  to: string,
) => {
  console.log('util sendBalanceTo data', amount, to)
  const estimatedGas = await detrustContract.estimateGas
    .sendBalanceTo(to, amount)
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.sendBalanceTo(to, amount)
    })

  return detrustContract
    .sendBalanceTo(to, amount, {
      gasLimit: calculateGasMargin(estimatedGas),
    })
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to sendBalanceTo', error)
      throw error
    })
}

/**
 * Top up a trust by payment
 * @param trustId the trustId settlor want to top up
 */
//### `topUp(uint256 trustId)` (external)

export const topUp = async (
  detrustContract: any,
  amount: string,
  trustId: string,
) => {
  console.log('util topUp data', amount, trustId)
  const estimatedGas = await detrustContract.estimateGas
    .topUp(trustId, {
      value: amount,
    })
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.topUp(trustId, {
        value: amount,
      })
    })

  return detrustContract
    .topUp(trustId, {
      gasLimit: calculateGasMargin(estimatedGas),
      value: amount,
    })
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to topUp', error)
      throw error
    })
}

/**
 * Top up from balance to a trust by trustId
 *
 * @param trustId the trustId settlor want add to top up
 * @param amount the amount of money settlor want to top up
 */
export const topUpFromBalance = async (
  detrustContract: any,
  amount: string,
  trustId: string,
) => {
  console.log('util topUpFromBalance data', amount, trustId)
  const estimatedGas = await detrustContract.estimateGas
    .topUpFromBalance(trustId, amount)
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.topUpFromBalance(trustId, amount)
    })

  return detrustContract
    .topUpFromBalance(trustId, amount, {
      gasLimit: calculateGasMargin(estimatedGas),
    })
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to topUpFromBalance', error)
      throw error
    })
}

/**
 * Beneficiary release one trust asset by this function
 *
 * @param trustId the trustId beneficiary want to release
 *
 */
//### `release(uint256 trustId)` (external)
export const release = async (detrustContract: any, trustId: string) => {
  console.log('util release data', trustId)
  const estimatedGas = await detrustContract.estimateGas
    .release(trustId)
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.release(trustId)
    })

  return detrustContract
    .release(trustId, {
      gasLimit: calculateGasMargin(estimatedGas),
    })
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to release', error)
      throw error
    })
}

/**
 * Beneficiary get token by this function, release all the
 * trust releaeable assets in the contract
 *
 * @param to the address beneficiary want to release to
 */
//### `releaseAllTo(address to)` (external)
export const releaseAllTo = async (
  detrustContract: any,
  releaseToAddress: string,
) => {
  console.log('util releaseAllTo data', releaseToAddress)
  const estimatedGas = await detrustContract.estimateGas
    .releaseAllTo(releaseToAddress)
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.releaseAllTo(releaseToAddress)
    })

  return detrustContract
    .releaseAllTo(releaseToAddress, {
      gasLimit: calculateGasMargin(estimatedGas),
    })
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to releaseAllTo', error)
      throw error
    })
}

/**
 * Beneficiary release one trust asset by this function
 *
 * @param trustId the trustId beneficiary want to release
 * @param to the address beneficiary want to release to
 *
 */
//### `releaseTo(uint256 trustId, address to)` (external)
export const releaseTo = async (
  detrustContract: any,
  trustId: string,
  releaseToAddress: string,
) => {
  console.log('util releaseTo data', trustId, releaseToAddress)
  const estimatedGas = await detrustContract.estimateGas
    .releaseTo(trustId, releaseToAddress)
    .catch((e: any) => {
      console.log('estimatedGas failed', e)
      return detrustContract.estimateGas.releaseTo(trustId, releaseToAddress)
    })

  return detrustContract
    .releaseTo(trustId, releaseToAddress, {
      gasLimit: calculateGasMargin(estimatedGas),
    })
    .then((response: any) => {
      return response
    })
    .catch((error: Error) => {
      console.debug('Failed to releaseTo', error)
      throw error
    })
}
