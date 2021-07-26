import React from 'react'
import { Box } from 'rebass/styled-components'
import { TokenNameProps } from './interfaces'
import { useDetrust } from '../../libs/detrust'
import { IApiTrustToken } from '../../constants'

const TokenName: React.FC<TokenNameProps> = ({ address, ...restprops }) => {
  const { walletTrustTokens } = useDetrust()
  const name = React.useMemo(() => {
    const result = walletTrustTokens.find(
      (token: IApiTrustToken) => token.contract_address === address,
    )

    return result?.name
  }, [address, walletTrustTokens])

  if (!name) return null
  return <Box {...restprops}>{name}</Box>
}

export default TokenName
