import { useContext } from 'react'

import { MulticallContext } from '../contexts/multicall'

export function useMulticall(): any {
  const context = useContext(MulticallContext)
  return context
}
