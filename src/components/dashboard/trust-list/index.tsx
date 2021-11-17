import React from 'react'
import numeral from 'numeral'
import { useActiveWeb3React } from '../../../libs/wallet'
import { Box, Flex, Text } from 'rebass/styled-components'
import { useTranslation } from 'react-i18next'
import { shortenAddress } from '../../../libs/wallet/utils'
import Table from '../../../theme/ui/layout/table/index'
import { TableColumnProps } from '../../../theme/ui/layout/table/interfaces'
//import { useGetTrustListAsSettlor } from '../../../libs/detrust/hooks/useContractGet'
import { useGetTrustListAsSettlor } from '../../../libs/detrust/hooks/useSubgraph'
import moment from 'moment'
import { useDetrust } from '../../../libs/detrust'
import BigNumber from 'bignumber.js'
import { ETH_ADDRESS, NUMBER_FORMAT, ONE_DAY_SECONDS } from '../../../constants'
import { TokenIcon, TokenName, RevokeModal, SetIrrevocableModal } from '../..'
import { useResponsive, useTheme, useModal } from '../../../hooks'
import { Spacer, Button, Modal } from '../../../theme/ui'
import { useRouter } from 'next/router'
import usePrices from '../../../hooks/usePrices'
import { Archive, EditPencil } from 'iconoir-react'
import { Loader } from '../../loader'
import DropDown from '../../dropw-down'

export const TrustList: React.FC = ({ ...restprops }) => {
  const { colors, fontWeight, spacer } = useTheme()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation('dashboard')
  const { data: trustList, isLoading } = useGetTrustListAsSettlor()
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
  //     trustList
  //       ? trustList?.map((trust: any) => {
  //           const timeInterval: BigNumber = trust.timeInterval
  //           const days = timeInterval.dividedBy(ONE_DAY_SECONDS)
  //           return {
  //             key: trust.id,
  //             asset: trust.name,
  //             blockchain: ETH_ADDRESS,
  //             available: '12.05',
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
  //           }
  //         })
  //       : [],
  //   [t, trustList],
  // )

  const data = React.useMemo(
    () =>
      trustList
        ? trustList?.map((trust: any) => {
            const now = new BigNumber(moment.now()).idiv(1000)
            const timeInterval = new BigNumber(trust.timeInterval)
            //const totalAmount = new BigNumber(trust.totalAmount)
            const amountPerTimeInterval = new BigNumber(trust.amountPerTimeInterval)
            const releasedAmount = new BigNumber(trust.releasedAmount)
            //const cumAmount = new BigNumber(trust.cumAmount)
            //const unreleasedAmount = cumAmount.minus(releasedAmount)
            const unreleasedAmount= new BigNumber(trust.totalAmount)
            const days = timeInterval.dividedBy(ONE_DAY_SECONDS)
            const nextReleaseTime = new BigNumber(trust.nextReleaseTime)
            //const totalAmountETH = totalAmount.dividedBy(1e18)
            const releasedAmountETH = releasedAmount.dividedBy(1e18)
            const unreleasedAmountETH = unreleasedAmount.dividedBy(1e18)
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
              //key: trust.id,
              key: parseInt(trust.id, 16).toString(),
              asset: trust.name,
              type: ETH_ADDRESS, // token contract address
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
              revocable: trust.revocable,
            }
          })
        : [],
    [t, trustList, walletPrices, walletTrustTokens],
  )

  const columns = React.useMemo(
    (): TableColumnProps[] => [
      {
        key: 'asset',
        dataIndex: 'asset',
        title: t('label.trust-list.asset-name'),
        width: '200px',
        align: 'left',
        Render(data) {
          return (
            <Flex flexDirection='row' alignItems='center'>
              <Box pr={12}>
                <TokenIcon className='list-icon' address={data.type} />
              </Box>
              <Box>
                <Text fontSize='lg'>{data.asset}</Text>
                <TokenName
                  address={data.type}
                  as='p'
                  fontSize='sm'
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
        title: t('label.trust-list.first-unlock-date'),
        width: '150px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontSize='lg'>
                {data.unlockdate?.firstLine}
              </Text>
              <Text as='p' fontSize='sm' color={colors.grey[200]}>
                {data.unlockdate?.secondLine} UTC
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'unlockinterval',
        dataIndex: 'unlockinterval',
        title: t('label.trust-list.unlock-period'),
        width: '100px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontSize='lg'>
                {data.unlockperiod.number}
              </Text>
              <Text as='p' fontSize='sm' color={colors.grey[200]}>
                {data.unlockperiod.timePeriod}
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'numpayouts',
        dataIndex: 'numpayouts',
        title: t('label.trust-list.num-payouts'),
        width: '150px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontSize='lg'>{data.numpayouts}</Text>
              <Text as='p' fontSize='sm' color={colors.grey[200]}>
                {t('content.trust-list.payouts')}
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'claimable',
        dataIndex: 'claimable',
        title: t('label.trust-list.claimable'),
        width: '120px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontSize='lg'>{data.claimable}</Text>
              <Text as='p' fontSize='sm' color={colors.grey[200]}>
                ≈ ${data.claimableUSD}
              </Text>
            </Flex>
          )
        },
      },
      {
        // key: 'totalamount',
        // dataIndex: 'totalamount',
        // title: t('label.trust-list.total-amount'),
        key: 'unclaimed',
        dataIndex: 'unclaimed',
        title: t('label.trust-list.unclaimed'),
        width: '120px',
        align: 'right',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='flex-end'>
              <Text fontSize='lg'>{data.unreleasedAmount}</Text>
              <Text as='p' fontSize='sm' color={colors.grey[200]}>
                ≈ ${data.unreleasedAmountUSD}
              </Text>
            </Flex>
          )
        },
      },
    ],
    [colors.grey, fontWeight.medium, t],
  )

  if (!isLoading && data.length) {
    return (
      <Flex flexDirection='column' mb='auto'>
        <Box variant='list' {...restprops}>
          <Flex variant='list-title'>
            <Box fontSize='lg' sx={{ textTransform: 'uppercase' }}>{t('trust-list.title')}</Box>
            <Box fontSize='lg'>{shortenAddress(account!, 6)}</Box>
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
    )
  }

  return ( 
      <Flex
        flexDirection='column'
          width='100%'
          flex={1}
          justifyContent='center'
          alignItems='center'
          px={spacer.xl}
        >
          {isLoading ?
          <Loader size={67} /> :
          <>
            <Flex justifyContent='center'>
              <Archive
                color='#212832'
                width={67}
                height={67}
                strokeWidth={0.8}
                opacity={0.4}
              />
            </Flex>
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('trust-list.empty-data')}
            </Box>
          </>
          }
      </Flex>
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
          //py={10}
        >
          <Text color='#F0864B' fontSize='md'>
            {' '}
            {t('content.trust-list.claimed')}
          </Text>
          <Spacer size='lg' />
          <Text fontSize='md'>{data.releasedAmount} ETH</Text>
          <Text color={colors.grey[200]} mt={1} fontSize='sm'>
            ≈ ${data.releasedAmountUSD}
          </Text>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          //py={10}
        >
          <Text fontSize='md'>
            {t('content.trust-list.locked')}
          </Text>
          <Spacer size='lg' />
          <Text fontSize='md'>{data.lockedAmount} ETH</Text>
          <Text color={colors.grey[200]} mt={1} fontSize='sm'>
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
          <Text fontWeight={fontWeight.semiBold}>
            {t('create-new-trust.label.revocable')}
          </Text>
          <Spacer size='lg' />
          <Text fontWeight={fontWeight.semiBold}>{data.revocable ? "true" : "false"}</Text>
        </Flex> */}
        {data.revocable &&
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          //py={10}
        >
          <DropDown
            buttonComponent={<TrustEditButton />}
            menuComponent={<TrustEditMenu trustId={data.key} />}
            menuStyle={{
              top: 32,
              left: -39.5,
            }}
          />
          <Spacer size='lg' />
          <Text fontSize='md'>
            {t('content.subtitle.settlor-edit')}
          </Text>
        </Flex>
        }
        {/* <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          py={10}
        >
          <Text fontWeight={fontWeight.semiBold} color={colors.green}>
            {t('content.trust-list.unclaimed')}
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
        //py={10}
      >
        <Text paddingBottom='13px' fontSize='md'>
          {t('content.subtitle.settlor-top-up.add')}
        </Text>

        <Button
          variant='primary'
          width='140px'
          py='3px'
          sx={{
            textTransform: 'uppercase',
            borderRadius: 4,
          }}
          onClick={() =>
            router.push(`/dashboard/settlor/top-up-fund/${data.key}`)
          }
        >
          {t('button.label.top-up')}
        </Button>
      </Flex>
    </Flex>
  )
}

const TrustEditButton = () => <EditPencil
  color='#212832'
  width={32}
  height={32}
  strokeWidth={1}
/>

interface TrustEditMenuProps {
  handleClose?: React.EffectCallback
  trustId: string | number
}

const TrustEditMenu = ({
  handleClose,
  trustId,
}: TrustEditMenuProps) => {
  const { colors } = useTheme()
  const { t } = useTranslation('dashboard')

  const [toggleRevokeModal] = useModal(
    <Modal>
      <RevokeModal trustId={trustId} />
    </Modal>,
  )
  const [toggleSetIrrevocableModal] = useModal(
    <Modal>
      <SetIrrevocableModal trustId={trustId} />
    </Modal>,
  )

  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      sx={{
        width: 180,
        bg: colors.white,
        boxShadow: '0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481)',
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        color: 'dolphin',
        px: '20px',
      }}
    >
      <Box
        onClick={() => {
          console.log(trustId)
          handleClose?.()
          toggleRevokeModal()
        }}
        width='100%'
        py='26px'
        textAlign='left'
        fontSize='lg'
        sx={{
          cursor: 'pointer',
          '&:hover': {
            fontWeight: 'bold',
          },
          '& a': {
            textDecoration: 'none',
          },
        }}
      >
        {t('content.subtitle.settlor-edit.revoke')}
      </Box>
      <Box
        width={140}
        height={0}
        sx={{
          opacity: 0.1,
          border: '1px solid #000000',
        }}
      />
      <Box
        onClick={() => {
          console.log(trustId)
          handleClose?.()
          toggleSetIrrevocableModal()
        }}
        width='100%'
        py='26px'
        textAlign='left'
        fontSize='lg'
        sx={{
          cursor: 'pointer',
          '&:hover': {
            fontWeight: 'bold',
          },
          '& a': {
            textDecoration: 'none',
          },
        }}
      >
        {t('content.subtitle.settlor-edit.set-irrevocable')}
      </Box>
    </Flex>
  )
}
