import { useContext } from 'react'

import { DetrustContext } from '../'

export function useDetrust(): any {
  const context = useContext(DetrustContext)
  return context
}
