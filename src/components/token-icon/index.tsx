import React from 'react'
import Image from 'next/image'
import { TokenIconProps } from './interfaces'
import { useDetrust } from '../../libs/detrust'
import { IApiTrustToken } from '../../constants'

const TokenIcon: React.FC<TokenIconProps> = ({ address, ...restprops }) => {
  const { walletTrustTokens } = useDetrust()
  const image = React.useMemo(() => {
    const result = walletTrustTokens.find(
      (token: IApiTrustToken) => token.contract_address === address,
    )

    return {
      path: result?.icon3x?.url ? result?.icon3x?.url : null,
      width: result?.icon?.width,
      height: result?.icon?.height,
    }
  }, [address, walletTrustTokens])

  if (!image.path) return null
  return (
    <Image
      {...restprops}
      src={image.path!}
      width={image.width}
      height={image.height}
      placeholder='empty'
    />
  )
}

export default TokenIcon
