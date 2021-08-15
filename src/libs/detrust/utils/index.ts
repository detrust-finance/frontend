import { walletTrustTokens, IApiTrustToken, contractTrustTokens } from "../../../constants"

export const getWalletTrustTokens = async function (chainId: number) {
  // try {
  //   return (await fetch(`/api/balances/wallet-trust-tokens/${chainId}`)).json()
  // } catch (e) {
  //   console.log(e)
  //   return {}
  // }
  return {
    status_code: 200,
    data: walletTrustTokens.filter(
      (contract: IApiTrustToken) =>
        contract.network.chain_id.toString() === chainId.toString(),
    ),
  }
}

export const getContractTrustTokens = async function (chainId: number) {
  // try {
  //   return (
  //     await fetch(`/api/balances/contract-trust-tokens/${chainId}`)
  //   ).json()
  // } catch (e) {
  //   console.log(e)
  //   return {}
  // }
  return {
    status_code: 200,
    // data: contractTrustTokens,
    data: contractTrustTokens.filter(
      (contract: IApiTrustToken) =>
        contract.network.chain_id.toString() === chainId.toString(),
    ),
  }
}

export const getCoingeckoCoinDataUrl = (coinId: string) =>
  `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`

export const sleep = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
