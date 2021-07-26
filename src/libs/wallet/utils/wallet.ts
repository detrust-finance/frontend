// import { NETWORK_URL, NETWORK_CHAIN_ID } from '../connectors'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
// export const setupNetwork = async () => {
//   const provider: any = window.ethereum

//   let params:
//     | {
//         chainId: string
//         chainName: string
//         nativeCurrency: {
//           name: string
//           symbol: string
//           decimals: number
//         }
//         rpcUrls: any
//         blockExplorerUrls: string[]
//       }[]
//     | undefined

//   if (provider) {
//     try {
//       if (NETWORK_CHAIN_ID === 97) {
//         params = [
//           {
//             chainId: `0x${NETWORK_CHAIN_ID?.toString(16)}`,
//             chainName: 'Binance Smart Chain Testnet',
//             nativeCurrency: {
//               name: 'BNB',
//               symbol: 'bnb',
//               decimals: 18,
//             },
//             rpcUrls: [`${NETWORK_URL}`],
//             blockExplorerUrls: ['https://testnet.bscscan.com/'],
//           },
//         ]
//       }

//       if (NETWORK_CHAIN_ID === 56) {
//         params = [
//           {
//             chainId: `0x${NETWORK_CHAIN_ID?.toString(16)}`,
//             chainName: 'Binance Smart Chain Mainnet',
//             nativeCurrency: {
//               name: 'BNB',
//               symbol: 'bnb',
//               decimals: 18,
//             },
//             rpcUrls: [`${NETWORK_URL}`],
//             blockExplorerUrls: ['https://bscscan.com/'],
//           },
//         ]
//       }

//       await provider.request({
//         method: 'wallet_addEthereumChain',
//         params,
//       })
//       return true
//     } catch (error) {
//       console.error(error)
//       return false
//     }
//   } else {
//     console.error(
//       "Can't setup the network on metamask because window.ethereum is undefined",
//     )
//     return false
//   }
// }

// /**
//  * Prompt the user to add a custom token to metamask
//  * @param tokenAddress
//  * @param tokenSymbol
//  * @param tokenDecimals
//  * @param tokenImage
//  * @returns {boolean} true if the token has been added, false otherwise
//  */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const provider: any = window.ethereum
  const tokenAdded: any = await provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}
