import React from 'react'
import Image from 'next/image'
import { useActiveWeb3React } from '../../../libs/wallet'
import { Box, BoxProps, Flex } from 'rebass/styled-components'
import { useTheme } from '../../../hooks'
import { Spacer } from '../../../theme/ui'
import numeral from 'numeral'
import { useTranslation } from 'react-i18next'
import { getEtherscanLink, shortenAddress } from '../../../libs/wallet/utils'
import { DETRUST_NETWORKS, useDetrust } from '../../../libs/detrust'
import {
  useETHBalances,
  useTokenBalancesWithLoadingIndicator,
} from '../../../libs/multicall'
import BigNumber from 'bignumber.js'
import { ETH_ADDRESS, NUMBER_FORMAT } from '../../../constants'
import { useGetBalance } from '../../../libs/detrust/hooks/useContractGet'
import usePrices from '../../../hooks/usePrices'

export const WalletList: React.FC<BoxProps> = ({ ...restprops }) => {
  const { fontWeight } = useTheme()
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation('yourAccount')
  const { walletTrustTokens } = useDetrust()
  const { walletTrustTokens: walletPrices } = usePrices()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ''
  ]

  const listWithAmount = useTokenBalancesWithLoadingIndicator(
    account ? account : '',
    walletTrustTokens && walletTrustTokens.length > 0
      ? walletTrustTokens?.filter((token: any) => {
          if (
            token?.enabled === true &&
            token?.contract_address !== ETH_ADDRESS
          ) {
            return {
              contract_address: token.contract_address,
            }
          }
        })
      : [],
  )

  return (
    <Box variant='list' {...restprops}>
      <Flex variant='list-title'>
        <Box sx={{ textTransform: 'uppercase' }}>{t('wallet-list.title')}</Box>
        <a
          href={getEtherscanLink(chainId, account ?? '', 'address')}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Box fontSize='md' color='white'>
            {shortenAddress(account!, 6)}
          </Box>
        </a>
      </Flex>
      {walletTrustTokens.map((token: any) => {
        return (
          <Flex
            key={`walletTrust${token.contract_address}`}
            variant={token.enabled ? 'list-item' : 'list-item-disabled'}
          >
            <Flex alignItems='center'>
              <Image
                className='list-icon'
                src={token.icon3x?.url}
                width={28}
                height={28}
              />
              <Box ml='8px'>
                <Box
                  fontSize='md'
                  fontWeight={fontWeight.semiBold}
                  className='symbol'
                >
                  {token.symbol}
                </Box>
                <Spacer size='xs' />
                <Box fontSize='sm' className='name'>
                  {token.name}
                </Box>
              </Box>
            </Flex>
            <Flex flexDirection='column' alignItems='flex-end'>
              {token?.contract_address === ETH_ADDRESS ? (
                <>
                  <Box
                    as='span'
                    fontSize='md'
                    fontWeight={fontWeight.semiBold}
                    className='balance'
                  >
                    {numeral(
                      new BigNumber(userEthBalance?.amount ?? 0)
                        .dividedBy(`1e${token.decimals}`)
                        .toFixed(2),
                    ).format(NUMBER_FORMAT[2])}
                  </Box>
                  <Spacer size='xs' />
                </>
              ) : (
                <>
                  <Box
                    as='span'
                    fontSize='md'
                    fontWeight={fontWeight.semiBold}
                    className='balance'
                  >
                    {numeral(
                      new BigNumber(
                        listWithAmount?.[0]?.[token.contract_address]?.amount ??
                          0,
                      )
                        .dividedBy(`1e${token.decimals}`)
                        .toFixed(2),
                    ).format(NUMBER_FORMAT[2])}
                  </Box>
                  <Spacer size='xs' />
                </>
              )}
              {walletPrices ? (
                token?.contract_address === ETH_ADDRESS ? (
                  <Box as='span' fontSize='sm' className='balanceFiat'>
                    ≈ $
                    {numeral(
                      new BigNumber(userEthBalance?.amount ?? 0)
                        .dividedBy(`1e${token.decimals}`)
                        .multipliedBy(walletPrices[ETH_ADDRESS]?.price_usd)
                        .toFixed(2),
                    ).format(NUMBER_FORMAT[2])}
                  </Box>
                ) : (
                  <Box as='span' fontSize='sm' className='balanceFiat'>
                    ≈ $
                    {numeral(
                      new BigNumber(
                        listWithAmount?.[0]?.[token.contract_address]?.amount ??
                          0,
                      )
                        .dividedBy(`1e${token.decimals}`)
                        .multipliedBy(
                          walletPrices[token.contract_address]?.price_usd,
                        )
                        .toFixed(2),
                    ).format(NUMBER_FORMAT[2])}
                  </Box>
                )
              ) : (
                <Box as='span' fontSize='sm' className='balanceFiat'>
                  ---
                </Box>
              )}
            </Flex>
          </Flex>
        )
      })}
    </Box>
  )
}

export const DeTrustContractList: React.FC<BoxProps> = ({ ...restprops }) => {
  const { fontWeight } = useTheme()
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation('yourAccount')
  const { contractTrustTokens } = useDetrust()
  const { contractTrustTokens: contractPrices } = usePrices()
  const { data: contractBalance } = useGetBalance()

  const listWithAmount = useTokenBalancesWithLoadingIndicator(
    account ? account : '',
    contractTrustTokens && contractTrustTokens.length > 0
      ? contractTrustTokens?.filter((token: any) => {
          if (
            token?.enabled === true &&
            token?.contract_address !== ETH_ADDRESS
          ) {
            return {
              contract_address: token.contract_address,
            }
          }
        })
      : [],
  )

  return (
    <Box variant='list' {...restprops}>
      <Flex variant='list-title'>
        <Box sx={{ textTransform: 'uppercase' }}>
          {t('contract-list.title')}
        </Box>
        <a
          href={getEtherscanLink(
            chainId,
            DETRUST_NETWORKS[chainId ?? 1],
            'address',
          )}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Box fontSize='md' color='white'>
            {shortenAddress(DETRUST_NETWORKS[chainId ?? 1], 6)}
          </Box>
        </a>
      </Flex>
      {contractTrustTokens.map((token: any) => {
        return (
          <Flex
            key={`contractTrust${token.contract_address}`}
            variant={token.enabled ? 'list-item' : 'list-item-disabled'}
          >
            <Flex alignItems='center'>
              <Image
                className='list-icon'
                src={token.icon3x?.url}
                width={28}
                height={28}
              />
              <Box ml='8px'>
                <Box
                  fontSize='md'
                  fontWeight={fontWeight.semiBold}
                  className='symbol'
                >
                  {token.symbol}
                </Box>
                <Spacer size='xs' />
                <Box fontSize='sm' className='name'>
                  {token.name}
                </Box>
              </Box>
            </Flex>
            <Flex flexDirection='column' alignItems='flex-end'>
              {token?.contract_address === ETH_ADDRESS ? (
                <>
                  <Box
                    as='span'
                    fontSize='md'
                    fontWeight={fontWeight.semiBold}
                    className='balance'
                  >
                    {numeral(
                      new BigNumber(contractBalance?.balance ?? 0)
                        .dividedBy(`1e${token.decimals}`)
                        .toFixed(2),
                    ).format(NUMBER_FORMAT[2])}
                  </Box>
                  <Spacer size='xs' />
                </>
              ) : (
                <>
                  <Box
                    as='span'
                    fontSize='md'
                    fontWeight={fontWeight.semiBold}
                    className='balance'
                  >
                    {numeral(
                      new BigNumber(
                        listWithAmount?.[0]?.[token.contract_address]?.amount ??
                          0,
                      )
                        .dividedBy(`1e${token.decimals}`)
                        .toFixed(2),
                    ).format(NUMBER_FORMAT[2])}
                  </Box>
                  <Spacer size='xs' />
                </>
              )}
              {contractPrices ? (
                token?.contract_address === ETH_ADDRESS ? (
                  <Box as='span' fontSize='sm' className='balanceFiat'>
                    ≈ $
                    {numeral(
                      new BigNumber(contractBalance?.balance ?? 0)
                        .dividedBy(`1e${token.decimals}`)
                        .multipliedBy(contractPrices[ETH_ADDRESS]?.price_usd)
                        .toFixed(2),
                    ).format(NUMBER_FORMAT[2])}
                  </Box>
                ) : (
                  <Box as='span' fontSize='sm' className='balanceFiat'>
                    ≈ $
                    {numeral(
                      new BigNumber(
                        listWithAmount?.[0]?.[token.contract_address]?.amount ??
                          0,
                      )
                        .dividedBy(`1e${token.decimals}`)
                        .multipliedBy(
                          contractPrices[token.contract_address]?.price_usd,
                        )
                        .toFixed(2),
                    ).format(NUMBER_FORMAT[2])}
                  </Box>
                )
              ) : (
                <Box as='span' fontSize='sm' className='balanceFiat'>
                  ---
                </Box>
              )}
            </Flex>
          </Flex>
        )
      })}
    </Box>
  )
}
