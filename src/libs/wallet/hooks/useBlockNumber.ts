import { useWallet } from './'

export function useBlockNumber(): number | undefined {
  const { lastBlockNumber } = useWallet()
  return lastBlockNumber
}
