// import gql from 'graphql-tag'
import { NextApiRequest, NextApiResponse } from 'next'
import { IApiTrustToken } from '../../../../constants'
import { contractTrustTokens } from '../../../../constants/api-responses'
// import { initializeApollo } from '../../../../libs/apollo-client'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { chainId } = _req.query
    // const client = initializeApollo()

    // const {
    //   data: { contractTrustTokens },
    // }: any = await client.query({
    //   query: gql`
    //     query ($chainId: String) {
    //       contractTrustTokens(where: { network: { chain_id: $chainId } }) {
    //         name
    //         symbol
    //         contract_address
    //         enabled
    //         price_usd
    //         icon {
    //           url
    //           width
    //           height
    //         }
    //         icon2x {
    //           url
    //           width
    //           height
    //         }
    //         icon3x {
    //           url
    //           width
    //           height
    //         }
    //         decimals
    //       }
    //     }
    //   `,
    //   variables: {
    //     chainId,
    //   },
    // })

    res.status(200).json({
      status_code: 200,
      // data: contractTrustTokens,
      data: contractTrustTokens.filter(
        (contract: IApiTrustToken) =>
          contract.network.chain_id.toString() === chainId.toString(),
      ),
    })
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message })
  }
}

export default handler
