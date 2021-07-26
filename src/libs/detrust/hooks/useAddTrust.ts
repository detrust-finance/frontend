import { useCallback } from 'react'

import { useDetrustContract } from './useContract'
import {
  addTrust,
  addTrustFromBalance,
  release,
  releaseAll,
  releaseAllTo,
  releaseTo,
  sendBalanceTo,
  topUp,
  topUpFromBalance,
} from '../utils/detrust'
import { useActiveWeb3React } from '../../wallet'

export const useAddTrust = () => {
  //const { account } = useActiveWeb3React()
  const contract = useDetrustContract(true)

  const handleAction = useCallback(
    async (
      amount,
      name,
      beneficiary,
      startReleaseTime,
      timeInterval,
      amountPerTimeInterval,
    ) => {
      try {
        const tx = await addTrust(
          contract,
          amount,
          name,
          beneficiary,
          startReleaseTime,
          timeInterval,
          amountPerTimeInterval,
          true,
        )
        return tx
      } catch (e) {
        return e
      }
    },
    [contract],
  )

  return { onAddTrust: handleAction }
}

export const useAddTrustFromBalance = () => {
  //const { account } = useActiveWeb3React()
  const contract = useDetrustContract(true)

  const handleAction = useCallback(
    async (
      amount,
      name,
      beneficiary,
      startReleaseTime,
      timeInterval,
      amountPerTimeInterval,
    ) => {
      try {
        const tx = await addTrustFromBalance(
          contract,
          amount,
          name,
          beneficiary,
          startReleaseTime,
          timeInterval,
          amountPerTimeInterval,
          true,
        )
        return tx
      } catch (e) {
        return e
      }
    },
    [contract],
  )

  return { onAddTrustFromBalance: handleAction }
}

export const useReleaseAll = () => {
  //const { account } = useActiveWeb3React()
  const contract = useDetrustContract(true)

  const handleAction = useCallback(async () => {
    try {
      const tx = await releaseAll(contract)
      return tx
    } catch (e) {
      return e
    }
  }, [contract])

  return { onReleaseAll: handleAction }
}

export const useSendBalanceTo = () => {
  const { account } = useActiveWeb3React()
  const contract = useDetrustContract(true)

  const handleAction = useCallback(
    async amount => {
      try {
        if (!account)
          return {
            message: 'error',
          }
        const tx = await sendBalanceTo(contract, amount, account)
        return tx
      } catch (e) {
        return e
      }
    },
    [contract, account],
  )

  return { onSendBalanceTo: handleAction }
}

export const useTopUp = () => {
  const contract = useDetrustContract(true)

  const handleAction = useCallback(
    async (amount, trustId) => {
      try {
        const tx = await topUp(contract, amount, trustId)
        return tx
      } catch (e) {
        return e
      }
    },
    [contract],
  )

  return { onTopUp: handleAction }
}

export const useTopUpFromBalance = () => {
  const contract = useDetrustContract(true)

  const handleAction = useCallback(
    async (amount, trustId) => {
      try {
        const tx = await topUpFromBalance(contract, amount, trustId)
        return tx
      } catch (e) {
        return e
      }
    },
    [contract],
  )

  return { onTopUpFromBalance: handleAction }
}

export const useRelease = () => {
  const contract = useDetrustContract(true)

  const handleAction = useCallback(
    async trustId => {
      try {
        const tx = await release(contract, trustId)
        return tx
      } catch (e) {
        return e
      }
    },
    [contract],
  )

  return { onRelease: handleAction }
}

export const useReleaseAllTo = () => {
  const contract = useDetrustContract(true)

  const handleAction = useCallback(
    async releaseToAddress => {
      try {
        const tx = await releaseAllTo(contract, releaseToAddress)
        return tx
      } catch (e) {
        return e
      }
    },
    [contract],
  )

  return { onReleaseAllTo: handleAction }
}

export const useReleaseTo = () => {
  const contract = useDetrustContract(true)

  const handleAction = useCallback(
    async (trustId, releaseToAddress) => {
      try {
        const tx = await releaseTo(contract, trustId, releaseToAddress)
        return tx
      } catch (e) {
        return e
      }
    },
    [contract],
  )

  return { onReleaseTo: handleAction }
}
