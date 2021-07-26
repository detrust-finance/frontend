import React from 'react'
import { PricesContext } from '../contexts'

const usePrices = () => {
  const prices = React.useContext(PricesContext)

  return prices
}

export default usePrices
