import React from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { ETH_ADDRESS, IApiDataResponse } from '../constants'
import fetchPrices from '../libs/misc/update-prices'

const initialState: IApiDataResponse = {
  contractTrustTokens: {
    [ETH_ADDRESS]: {
      price_usd: 0.0,
    },
  },
  walletTrustTokens: {
    [ETH_ADDRESS]: {
      price_usd: 0.0,
    },
  },
}

export const PricesContext = React.createContext<IApiDataResponse>(initialState)

const PricesProvider: React.FC = ({ children }) => {
  const { data }: UseQueryResult<any, any> = useQuery(
    'update prices',
    async () => {
      // const request = await fetch('/api/update-prices')
      // const result: {
      //   status_code: number
      //   data: IApiDataResponse
      // } = await request.json()
      const result = await fetchPrices()

      return result.data
    },
    {
      refetchInterval: 600000,
      initialData: initialState,
    },
  )

  return (
    <PricesContext.Provider
      value={{
        ...data,
      }}
    >
      {children}
    </PricesContext.Provider>
  )
}

export default PricesProvider
