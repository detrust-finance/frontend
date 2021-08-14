import React from 'react'
/* import Image from 'next/image' */
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import { useActiveWeb3React } from '../../../libs/wallet'
import { Box, Flex, Text } from 'rebass/styled-components'
import { useTranslation } from 'react-i18next'
import { shortenAddress } from '../../../libs/wallet/utils'
import Table from '../../../theme/ui/layout/table/index'
import { TableColumnProps } from '../../../theme/ui/layout/table/interfaces'
import { rem } from 'polished'
//import { useGetTrustListAsBeneficiary } from '../../../libs/detrust/hooks/useContractGet'
import { useGetTrustListAsBeneficiary } from '../../../libs/detrust/hooks/useSubgraph'
import moment from 'moment'
import { ETH_ADDRESS, NUMBER_FORMAT, ONE_DAY_SECONDS } from '../../../constants'
import { TokenIcon, TokenName } from '../..'
import { useResponsive, useTheme } from '../../../hooks'
import { useDetrust } from '../../../libs/detrust'
import { Spacer, Button } from '../../../theme/ui'
import usePrices from '../../../hooks/usePrices'
import _ from 'lodash'

export const AssetList: React.FC = ({ ...restprops }) => {
  const router = useRouter()
  const { colors, fontWeight, spacer } = useTheme()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation('dashboard')
  const { data: assetList, isLoading } = useGetTrustListAsBeneficiary()
  const { walletTrustTokens } = useDetrust()
  const { walletTrustTokens: walletPrices } = usePrices()
  const { isTablet } = useResponsive()

  const toUSD = (amount: BigNumber) => walletPrices &&
  numeral(
    amount
      .multipliedBy(
        walletPrices[walletTrustTokens[0]?.contract_address]
          ?.price_usd,
      )
      .toFixed(2),
  ).format(NUMBER_FORMAT[2])

  // const data = React.useMemo(
  //   () =>
  //     assetList
  //       ? assetList?.map((trust: any, index: number) => {
  //           const now = new BigNumber(moment.now()).dividedBy(1000)
  //           const timeInterval: BigNumber = trust.timeInterval
  //           const releaseAmount = now
  //             .minus(trust.nextReleaseTime)
  //             .dividedBy(timeInterval)
  //             .multipliedBy(trust.amountPerTimeInterval)
  //           const days = timeInterval.dividedBy(ONE_DAY_SECONDS)
  //           return {
  //             key: `beneficiary-trust-list-index-${index}`,
  //             id: trust.id,
  //             asset: trust.name,
  //             blockchain: ETH_ADDRESS,
  //             beneficiary: trust.beneficiary,
  //             available: now.isGreaterThanOrEqualTo(trust.nextReleaseTime)
  //               ? releaseAmount.toFixed(2)
  //               : '0.00',
  //             unlockdate: {
  //               firstLine: moment
  //                 .unix(trust.nextReleaseTime.toString())
  //                 .format('YYYY-MM-DD'),
  //               secondLine: moment
  //                 .unix(trust.nextReleaseTime.toString())
  //                 .format('h.mm a'),
  //             },
  //             unlockperiod: timeInterval.isGreaterThanOrEqualTo(ONE_DAY_SECONDS)
  //               ? {
  //                   number: days.toFixed(0),
  //                   timePeriod: days.isEqualTo(1)
  //                     ? t('option.label.day')
  //                     : t('option.label.days'),
  //                 }
  //               : {
  //                   number: timeInterval.toFixed(0),
  //                   timePeriod: t('option.label.seconds'),
  //                 },
  //             numpayouts: trust.totalAmount
  //               .dividedBy(trust.amountPerTimeInterval)
  //               .toFixed(0),
  //             totalAmount: trust.totalAmount.toFixed(2),
  //             claimEnabled: trust.claimEnabled,
  //           }
  //         })
  //       : [],
  //   [assetList, t],
  // )

  const data = React.useMemo(
    () =>
      assetList
        ? assetList?.map((trust: any, index: number) => {
            const now = new BigNumber(moment.now()).idiv(1000)
            const timeInterval = new BigNumber(trust.timeInterval)
            //const totalAmount = new BigNumber(trust.totalAmount)
            const amountPerTimeInterval = new BigNumber(trust.amountPerTimeInterval)
            const releasedAmount = new BigNumber(trust.releasedAmount)
            //const cumAmount = new BigNumber(trust.cumAmount)
            //const unreleasedAmount = cumAmount.minus(releasedAmount)
            const unreleasedAmount= new BigNumber(trust.totalAmount)
            const nextReleaseTime = new BigNumber(trust.nextReleaseTime)
            //const totalAmountETH = unreleasedAmount.dividedBy(1e18)
            const releasedAmountETH = releasedAmount.dividedBy(1e18)
            const unreleasedAmountETH = unreleasedAmount.dividedBy(1e18)
            const days = timeInterval.dividedBy(ONE_DAY_SECONDS)
            const claimEnabled = now.isGreaterThanOrEqualTo(nextReleaseTime)
            const claimableAmount = BigNumber.min(
              claimEnabled ? now
                .minus(nextReleaseTime)
                .idiv(timeInterval)
                .plus(1)
                .multipliedBy(amountPerTimeInterval) : new BigNumber(0),
                unreleasedAmount
            )
            const claimableAmountETH = claimableAmount.dividedBy(1e18)
            const lockedAmount = unreleasedAmount.minus(claimableAmount)
            const lockedAmountETH = lockedAmount.dividedBy(1e18)
            return {
              key: `beneficiary-trust-list-index-${index}`,
              //id: trust.id,
              //id: parseInt(trust.id, 16).toString(),
              id: parseInt(trust.id, 16),
              asset: trust.name,
              type: ETH_ADDRESS, // token contract address
              beneficiary: account,
              unlockdate: {
                firstLine: moment
                  .unix(trust.nextReleaseTime)
                  .format('YYYY-MM-DD'),
                secondLine: moment
                  .unix(trust.nextReleaseTime)
                  .format('h.mm a'),
              },
              unlockperiod: timeInterval.isGreaterThanOrEqualTo(ONE_DAY_SECONDS)
                ? {
                    number: days.toFixed(0),
                    timePeriod: days.isEqualTo(1)
                      ? t('option.label.day')
                      : t('option.label.days'),
                  }
                : {
                    number: timeInterval.toFixed(0),
                    timePeriod: t('option.label.seconds'),
                  },
              numpayouts: unreleasedAmount
                .dividedBy(amountPerTimeInterval)
                .toFixed(0),
              //totalAmount: totalAmountETH.toFixed(2),
              releasedAmount: releasedAmountETH.toFixed(2),
              unreleasedAmount: unreleasedAmountETH.toFixed(2),
              //totalAmountUSD: toUSD(totalAmountETH),
              releasedAmountUSD: toUSD(releasedAmountETH),
              unreleasedAmountUSD: toUSD(unreleasedAmountETH),
              claimable: claimableAmountETH.toFixed(2),
              claimableUSD: toUSD(claimableAmountETH),
              lockedAmount: lockedAmountETH.toFixed(2),
              lockedAmountUSD: toUSD(lockedAmountETH),
              claimEnabled,
            }
          })
        : [],
    [assetList, t, walletPrices, walletTrustTokens],
  )

  const columns = React.useMemo(
    (): TableColumnProps[] => [
      {
        key: 'asset',
        dataIndex: 'asset',
        //title: t('label.asset-list.asset-name'),
        title: t('label.trust-list.asset-name'),
        width: '200px',
        align: 'left',
        Render(data) {
          return (
            <Flex flexDirection='row' width={rem('160px')}>
              <Box pr={12}>
                {/*<Image src={data.asset.tradeAsset === 'ETH' ? IconETH : IconBTC} sx={{ width: rem('32px'), height: rem('32px'), marginRight: rem('8px') }} />*/}
                <TokenIcon className='list-icon' address={data.type} />
              </Box>
              <Box>
                <Text fontWeight={fontWeight.medium}>{data.asset}</Text>
                <TokenName
                  address={data.type}
                  as='p'
                  fontSize='md'
                  color={colors.grey[200]}
                />
              </Box>
            </Flex>
          )
        },
      },

      {
        key: 'unlockdate',
        dataIndex: 'unlockdate',
        title: t('label.asset-list.unlock-date'),
        width: '150px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight={fontWeight.medium}>
                {data.unlockdate?.firstLine}
              </Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                {data.unlockdate?.secondLine} UTC
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'unlockperiod',
        dataIndex: 'unlockperiod',
        title: t('label.asset-list.unlock-period'),
        width: '100px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight={fontWeight.medium}>
                {data.unlockperiod.number}
              </Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                {data.unlockperiod.timePeriod}
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'numpayouts',
        dataIndex: 'numpayouts',
        title: t('label.asset-list.num-payouts'),
        width: '150px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight={fontWeight.medium}>{data.numpayouts}</Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                {t('content.asset-list.payouts')}
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'claimable',
        dataIndex: 'claimable',
        title: t('label.asset-list.claimable'),
        width: '120px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight={fontWeight.medium}>{data.claimable}</Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                ≈ ${data.claimableUSD}
              </Text>
            </Flex>
          )
        },
      },
      {
        // key: 'totalAmount',
        // dataIndex: 'totalAmount',
        // title: t('label.asset-list.total-amount'),
        key: 'unclaimed',
        dataIndex: 'unclaimed',
        title: t('label.asset-list.unclaimed'),
        width: '120px',
        align: 'right',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='flex-end'>
              <Text fontWeight={fontWeight.medium}>{data.unreleasedAmount}</Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                ≈ ${data.unreleasedAmountUSD}
              </Text>
            </Flex>
          )
        },
      },
    ],
    [colors.grey, fontWeight.medium, t, walletPrices, walletTrustTokens],
  )

  return (
    <>
      <Flex flexDirection='column' mb='auto'>
        <Box variant='list' {...restprops}>
          <Flex variant='list-title'>
            <Box sx={{ textTransform: 'uppercase' }}>{t('asset-list.title')}</Box>
            <Box fontSize='md'>{shortenAddress(account!, 8)}</Box>
          </Flex>

          <Box overflowX='auto' mb={[spacer['xxl'], spacer['xxl'], 0]}>
            <Table
              columns={columns}
              subRowComponent={(data: any) => <SubRow data={data} />}
              dataSource={data}
              loading={isLoading}
              minWidth={650}
              tableHeaderStyle={{
                minWidth: 650,
              }}
              scrollbarsStyle={{
                height: isTablet ? 290 : 'auto',
              }}
            />
          </Box>
        </Box>
      </Flex>

      <Flex flexDirection='row' justifyContent='center'>
        {/* <Link href={`/dashboard/beneficiary/claim`} passHref> */}
          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            width={260}
            disabled={!_.some(data, { claimEnabled: true })}
            onClick={() => {
              router.push('/dashboard/beneficiary/claim')
            }}
          >
            {t('button.label.claim-assets')}
          </Button>
        {/* </Link> */}
      </Flex>
    </>
  )
}

interface SubRowProps {
  data: any
}
const SubRow: React.FC<SubRowProps> = ({ data }) => {
  const { t } = useTranslation('dashboard')
  const { colors, fontWeight } = useTheme()
  const router = useRouter()

  return (
    <Flex variant='list-details'>
      <Flex sx={{ position: 'relative' }} flex={0.7}>
        {/* <Flex variant='overlay'>
          <Box as='span' bg={colors.white} p={10}>
            Work in progress.
          </Box>
        </Flex> */}
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          py={10}
        >
          <Text color={colors.red[100]} fontWeight={fontWeight.semiBold}>
            {t('content.asset-list.claimed')}
          </Text>
          <Spacer size='lg' />
          <Text fontWeight={fontWeight.semiBold}>{data.releasedAmount} ETH</Text>
          <Text color={colors.grey[200]} mt={1} fontSize='md'>
            ≈ ${data.releasedAmountUSD}
          </Text>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          py={10}
        >
          <Text fontWeight={fontWeight.semiBold}>
            {t('content.asset-list.locked')}
          </Text>
          <Spacer size='lg' />
          <Text fontWeight={fontWeight.semiBold}>{data.lockedAmount} ETH</Text>
          <Text color={colors.grey[200]} mt={1} fontSize='md'>
            ≈ ${data.lockedAmountUSD}
          </Text>
        </Flex>
        {/* <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          py={10}
        >
          <Text color={colors.green} fontWeight={fontWeight.semiBold}>
            {t('content.asset-list.unclaimed')}
          </Text>
          <Spacer size='lg' />
          <Text fontWeight={fontWeight.semiBold}>{data.unreleasedAmount} ETH</Text>
          <Text color={colors.grey[200]} mt={1} fontSize='md'>
            ≈ ${data.unreleasedAmountUSD}
          </Text>
        </Flex> */}
      </Flex>

      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        flex={0.3}
        py={10}
      >
        <Text fontWeight={fontWeight.semiBold}>
          {' '}
          {t('beneficiaries.label.available-to-claim')}
        </Text>
        <Spacer size='lg' />

        <Button
          variant='primary'
          disabled={!data.claimEnabled}
          fontSize={10}
          width={120}
          py={10}
          sx={{ textTransform: 'uppercase' }}
          onClick={() => {
              //console.log(data.id)
              //console.log(data.beneficiary)
              router.push(
                `/dashboard/beneficiary/claim/${data.id}/${data.beneficiary}/${encodeURIComponent(data.asset)}`,
              )
            }
          }
        >
          {t('button.label.claim-now')}
        </Button>
      </Flex>
    </Flex>
  )
}
