import {
  IApiTrustToken,
  walletTrustTokens,
  contractTrustTokens,
  ETH_ADDRESS,
  IRemoteData,
  IApiDataResponse,
} from '../../constants'
import { sleep, getCoingeckoCoinDataUrl } from '../detrust/utils'

const getRemoteData = async (
  tokens: IApiTrustToken[],
): Promise<IRemoteData> => {
  let data: IRemoteData = {}

  let i = 0
  while (i < tokens.length) {
    const token = tokens[i]
    if (token.enabled) {
      try {
        const request = await fetch(getCoingeckoCoinDataUrl(token.coingecko_id))
        const result = await request.json()

        data = {
          ...data,
          [token.coingecko_id === 'ethereum'
            ? ETH_ADDRESS
            : result.contract_address]: {
            price_usd: result?.market_data?.current_price?.usd,
          },
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    i += 1
    await sleep(1000)
  }

  return data
}

const fetchPrices = async () => {
  try {
    const walletTokens = await getRemoteData(walletTrustTokens)
    const contractTokens = await getRemoteData(contractTrustTokens)

    const data: IApiDataResponse = {
      walletTrustTokens: walletTokens,
      contractTrustTokens: contractTokens,
    }

    return {
      status_code: 200,
      data: data,
    }
  } catch (err) {
    return { status_code: 500, message: err.message }
  }
}

export default fetchPrices
