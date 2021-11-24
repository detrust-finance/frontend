import React, { useCallback } from 'react'
import { NextPage } from 'next'
// Components
import { Box, Flex, Text } from 'rebass/styled-components'
import Image from 'next/image'
import {
  Login,
  DashboardLayout,
  WizardButtons,
  IWizardButton,
} from '../../../components'
import { Button, Spacer, Title, Input } from '../../../theme/ui'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import {
  getEtherscanLink,
  useActiveWeb3React,
  useSendTransaction,
  useWallet,
} from '../../../libs/wallet'
//import { Input } from '@rebass/forms'
import TokenDropDown from './token-drop-down'
import { DETRUST_NETWORKS, useGetBalance } from '../../../libs/detrust'
import { Loader } from '../../../components/loader'
import { useSendBalanceTo } from '../../../libs/detrust/hooks/useAddTrust'
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import { NUMBER_FORMAT } from '../../../constants'
import { useTheme } from '../../../hooks'
import { useETHBalances } from '../../../libs/multicall'

//import { useBalanceOf, useETHBalances, useTokenBalancesWithLoadingIndicator } from '../../../libs/multicall'

const TransferFunds: NextPage = () => {
  const { t } = useTranslation('dashboard')
  const { account, chainId } = useActiveWeb3React()
  const [amount, setAmount] = React.useState('')
  const [from, setFrom] = React.useState('wallet')
  const { spacer, colors, fontWeight } = useTheme()
  const router = useRouter()

  // const [showInterface, setShowInterface] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [isConfirming, setIsConfirming] = React.useState(false)
  const [isConfirmed, setIsConfirmed] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [txId, setTxId] = React.useState('')
  const { addTransaction } = useWallet()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ''
  ]
  const { data: contractBalance } = useGetBalance()

  const { onSendTransaction } = useSendTransaction()
  const { onSendBalanceTo } = useSendBalanceTo()

  const handleTxConfirmed = useCallback(() => {
    setIsConfirming(false)
    setIsConfirmed(true)
  }, [setIsConfirmed])

  const handleSendTransaction = useCallback(
    async (amount: any) => {
      try {
        setIsLoading(true)
        const tx =
          from === 'wallet'
            ? await onSendTransaction(amount, DETRUST_NETWORKS[chainId!])
            : await onSendBalanceTo(
                new BigNumber(amount).multipliedBy(1e18).toFixed(0),
              )

        // user rejected tx or didn't go thru
        if (!tx || tx.message) {
          setErrorMsg(tx?.message)
          setIsError(true)
        } else {
          setTxId(tx?.hash)
          addTransaction(tx, handleTxConfirmed)
          setIsConfirming(true)
        }
        setIsLoading(false)
      } catch (e) {
        console.log('error', e)
        setErrorMsg(e?.message)
        setIsError(true)
        setIsLoading(false)
      }
    },
    [
      from,
      onSendTransaction,
      chainId,
      onSendBalanceTo,
      addTransaction,
      handleTxConfirmed,
    ],
  )

  const handleTryAgain = useCallback(() => {
    setIsError(false)
    setErrorMsg('')
    handleSendTransaction(amount)
  }, [amount, handleSendTransaction])

  const buttons = React.useMemo(
    (): IWizardButton[] => [
      {
        title: t('button.label.back'),
        href: '/dashboard',
        buttonProps: {
          variant: 'grey-outline',
          width: 240,
        },
      },
      {
        title: t('button.label.try-again'),
        onClick: handleTryAgain,
        buttonProps: {
          width: 240,
        },
      },
    ],
    [t, handleTryAgain],
  )

  if (!account) return <Login />

  if (isLoading)
    return (
      <DashboardLayout layoutBackgroundImage='/images/bg-balances.svg'>
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.balances')}
              subtitle={t('content.subtitle.balances.transfer-funds')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('content.description.balances.transfer-funds')}
            </Box>
            <Spacer size='xl' />
          </Box>

          <Flex
            flexDirection='column'
            variant='outlined-box'
            width='100%'
            flex={1}
            justifyContent='center'
            alignItems='center'
            px={spacer.xl}
            mb='20px'
          >
            <Flex justifyContent='center'>
              <Loader size={58} />
            </Flex>
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('transfer-funds.description')}
            </Box>
          </Flex>

          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            onClick={() => router.push(`/dashboard/`)}
            disabled={!isConfirmed}
            width={240}
          >
            {t('button.transfer-funds.back-to-main')}
          </Button>
        </Flex>
      </DashboardLayout>
    )

  if (isError)
    return (
      <DashboardLayout>
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.balances')}
              subtitle={t('content.subtitle.balances.transfer-funds')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('content.description.balances.transfer-funds')}
            </Box>
          </Box>

          <Spacer size='xl' />

          <Flex
            variant='outlined-box'
            width='100%'
            flex={1}
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            px={spacer.xl}
            mb='20px'
          >
            <Flex justifyContent='center'>
              <Image
                src='/images/icon-confirmation-error.svg'
                width={52}
                height={52}
              />
            </Flex>
            <Spacer size='xl' />
            <Box
              as='p'
              fontSize='md'
              textAlign='center'
              width='100%'
              sx={{ wordWrap: 'break-word' }}
            >
              {' '}
              {t('label.error')}: {errorMsg}
            </Box>
          </Flex>

          <WizardButtons buttons={buttons} />
        </Flex>
      </DashboardLayout>
    )

  if (isConfirmed) {
    return (
      <DashboardLayout>
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.balances')}
              subtitle={t('content.subtitle.balances.transfer-funds')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md' width='100%' textAlign='left'>
              {t('content.description.balances.transfer-funds')}
            </Box>
          </Box>

          <Spacer size='xl' />

          <Flex
            flexDirection='column'
            variant='outlined-box'
            width='100%'
            flex={1}
            justifyContent='center'
            alignItems='center'
            px={spacer.xl}
            mb='20px'
          >
            <Image
              src='/images/icon-confirmation-success.svg'
              width={52}
              height={52}
            />
            <Spacer size='xxl' />
            <Text fontWeight={fontWeight.medium} fontSize='md'>
              {t('transfer-funds.tx-success')}
            </Text>
            <Spacer size='xl' />
            <a
              href={getEtherscanLink(chainId, txId, 'transaction')}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none' }}
            >
              <Text
                fontSize='md'
                opacity={0.5}
                color='dolphin'
                sx={{ lineBreak: 'anywhere' }}
              >
                {txId}{' '}
                <Image
                  src='/images/icon-external-url.svg'
                  width={12}
                  height={12}
                />
              </Text>
            </a>
          </Flex>

          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            onClick={() => router.push(`/dashboard/`)}
            disabled={!isConfirmed}
          >
            {t('button.transfer-funds.back-to-main')}
          </Button>
        </Flex>
      </DashboardLayout>
    )
  }

  if (isConfirming)
    return (
      <DashboardLayout>
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.balances')}
              subtitle={t('content.subtitle.balances.transfer-funds')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md' textAlign='left' width='100%'>
              {t('content.description.balances.transfer-funds')}
            </Box>
          </Box>

          <Spacer size='xl' />

          <Flex
            flexDirection='column'
            variant='outlined-box'
            width='100%'
            flex={1}
            justifyContent='center'
            alignItems='center'
            px={spacer.xl}
            mb='20px'
          >
            <Loader size={58} />
            <Spacer size='xxl' />
            <Text fontWeight={fontWeight.medium} fontSize='md'>
              {t('transfer-funds.success')} {t('transfer-funds.wait-tx')}
            </Text>
            <Spacer size='xxl' />
            <a
              href={getEtherscanLink(chainId, txId, 'transaction')}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none' }}
            >
              <Text
                fontSize='md'
                opacity={0.5}
                color='dolphin'
                sx={{ lineBreak: 'anywhere' }}
              >
                {txId}{' '}
                <Image
                  src='/images/icon-external-url.svg'
                  width={12}
                  height={12}
                />
              </Text>
            </a>
          </Flex>

          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            onClick={() => router.push(`/dashboard/`)}
            disabled={!isConfirmed}
            width={240}
          >
            {t('button.transfer-funds.back-to-main')}
          </Button>
        </Flex>
      </DashboardLayout>
    )

  return (
    <DashboardLayout>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        variant='layout-content'
        alignItems='center'
      >
        <Box width='100%'>
          <Title
            title={t('content.title.balances')}
            subtitle={t('content.subtitle.balances.transfer-funds')}
          />
          <Spacer size='xl' />
          <Box as='p' fontSize='md'>
            {t('content.description.balances.transfer-funds')}
          </Box>
        </Box>

        <Spacer size='xl' />

        <Box width='100%' mb='auto'>
          <Flex flexDirection='row' justifyContent='space-between'>
            <Box flex={1}>
              <Flex
                variant='outlined-box'
                flexDirection='column'
                alignItems='center'
                sx={{ borderBottomColor: 'transparent' }}
              >
                <Text fontSize='md'>{t('transfer-funds.from')}</Text>
              </Flex>

              {from === 'wallet' ? (
                <Button
                  variant='secondary'
                  width='100%'
                  py={15}
                  px={41}
                  sx={{ textTransform: 'uppercase' }}
                  onClick={() => {
                    setFrom('contract')
                  }}
                >
                  <Flex alignItems='center'>
                    <Image
                      src='/images/icon-wallet-hover.svg'
                      height={16}
                      width={16}
                    />
                  </Flex>
                  <Spacer size='md' />
                  {t('WALLET')}
                </Button>
              ) : (
                <Button
                  width='100%'
                  variant='secondary'
                  py={15}
                  px={41}
                  onClick={() => {
                    setFrom('wallet')
                  }}
                >
                  <Flex alignItems='center' color={'white'}>
                    <Image
                      src='/images/icon-unlock.svg'
                      height={16}
                      width={16}
                    />
                  </Flex>
                  <Spacer size='md' />
                  {t('DeTRUST CONTRACT')}
                </Button>
              )}
            </Box>
            <Spacer size='xl' />

            <Box flex={1}>
              <Flex
                variant='outlined-box'
                flexDirection='column'
                alignItems='center'
                sx={{ borderBottomColor: 'transparent' }}
              >
                <Text fontSize='md'>{t('transfer-funds.to')}</Text>
              </Flex>

              {from === 'wallet' ? (
                <Button
                  width='100%'
                  variant='secondary'
                  py={15}
                  px={41}
                  onClick={() => {
                    setFrom('contract')
                  }}
                >
                  <Flex alignItems='center' color={'white'}>
                    <Image
                      src='/images/icon-unlock.svg'
                      height={16}
                      width={16}
                    />
                  </Flex>
                  <Spacer size='md' />
                  {t('DeTRUST CONTRACT')}
                </Button>
              ) : (
                <Button
                  variant='secondary'
                  width='100%'
                  py={15}
                  px={41}
                  sx={{ textTransform: 'uppercase' }}
                  onClick={() => {
                    setFrom('wallet')
                  }}
                >
                  <Flex alignItems='center'>
                    <Image
                      src='/images/icon-wallet-hover.svg'
                      height={16}
                      width={16}
                    />
                  </Flex>
                  <Spacer size='md' />
                  {t('WALLET')}
                </Button>
              )}
            </Box>
          </Flex>

          <Spacer size='xxl' />

          <Flex
            flexDirection={['column', 'column', 'row']}
            justifyContent='space-between'
          >
            <Box flex={1}>
              <Flex
                variant='outlined-box'
                flexDirection='column'
                alignItems='center'
                sx={{ borderBottomColor: 'transparent' }}
              >
                <Text fontSize='md'>{t('transfer-funds.token')}</Text>
              </Flex>
              <TokenDropDown />
            </Box>

            <Spacer size='xl' />

            <Box flex={1}>
              <Flex
                variant='outlined-box'
                flexDirection='column'
                alignItems='center'
                sx={{ borderBottomColor: 'transparent' }}
              >
                <Text fontSize='md'>{t('transfer-funds.amount')}</Text>
              </Flex>
              <Input
                name='amount'
                value={amount}
                onChange={(element: any) => setAmount(element?.target?.value)}
                placeholder='0.00'
                endAdornment={
                  <Flex mr={13} alignItems='center'>
                    <Text marginRight='5px' fontSize='md'>
                      {t('transfer-funds.available')}
                    </Text>
                    <Box as='span' fontSize='md' className='balance'>
                      {from === 'wallet'
                        ? `${numeral(
                            new BigNumber(userEthBalance?.amount ?? 0)
                              .dividedBy(1e18)
                              .toFixed(2),
                          ).format(NUMBER_FORMAT[2])} ETH`
                        : `${numeral(
                            contractBalance?.balance
                              ?.dividedBy(1e18)
                              .toFixed(2),
                          ).format(NUMBER_FORMAT[2])} ETH`}
                    </Box>
                  </Flex>
                }
              />
            </Box>
          </Flex>
        </Box>

        <Flex alignItems='center' justifyContent='center'>
          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            onClick={() => handleSendTransaction(amount)}
            width={240}
            disabled={!amount || !Number(amount)}
          >
            {t('button.label.transfer-confirm')}
          </Button>
        </Flex>
      </Flex>
    </DashboardLayout>
  )
}

export default TransferFunds
