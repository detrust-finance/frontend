import React, { useCallback, useEffect } from 'react'
import { Box, Flex, Button, Text } from 'rebass/styled-components'
import { Loader } from '../../../../components/loader'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { FullData } from '../../../../interfaces'
import { Spacer, Title } from '../../../../theme/ui'
import { useRouter } from 'next/router'
import { useResponsive, useTheme } from '../../../../hooks'
import {
  getEtherscanLink,
  useActiveWeb3React,
  useWallet,
} from '../../../../libs/wallet'
import {
  IWizardButton,
  IWizardHeader,
  WizardButtons,
  WizardHeader,
  DashboardLayout,
} from '../../../../components'
import { useTopUp, useTopUpFromBalance } from '../../../../libs/detrust'
import BigNumber from 'bignumber.js'

const Submit: React.FC<FullData> = ({ formData, navigation }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation('dashboard')
  const { addTransaction } = useWallet()
  const [isLoading, setIsLoading] = React.useState(true)
  const [isError, setIsError] = React.useState(false)
  const [isConfirmed, setIsConfirmed] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [txId, setTxId] = React.useState('')
  const router = useRouter()
  const { spacer, colors, fontWeight } = useTheme()
  const { isTablet } = useResponsive()

  const { onTopUp } = useTopUp()
  const { onTopUpFromBalance } = useTopUpFromBalance()

  useEffect(() => {
    setIsError(false)
  }, [])

  const handleTxConfirmed = useCallback(() => {
    setIsConfirmed(true)
  }, [setIsConfirmed])

  const handleTopUp = useCallback(
    async (amount: any, trustId: any) => {
      try {
        const tx =
          formData?.fundSource === 'wallet'
            ? await onTopUp(
                new BigNumber(amount).multipliedBy(1e18).toFixed(0),
                trustId,
              )
            : await onTopUpFromBalance(
                new BigNumber(amount).multipliedBy(1e18).toFixed(0),
                trustId,
              )

        // user rejected tx or didn't go thru
        if (!tx || tx.message) {
          setErrorMsg(tx?.message)
          setIsError(true)
        } else {
          setTxId(tx?.hash)
          addTransaction(tx, handleTxConfirmed)
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
      formData?.fundSource,
      onTopUp,
      onTopUpFromBalance,
      addTransaction,
      handleTxConfirmed,
    ],
  )

  useEffect(() => {
    if (
      formData?.totalTopUpAmount &&
      formData?.fundSource &&
      formData?.trustId
    ) {
      handleTopUp(formData?.totalTopUpAmount, formData?.trustId)
    }
  }, [
    formData?.fundSource,
    formData?.totalTopUpAmount,
    formData?.trustId,
    handleTopUp,
  ])

  const headers = React.useMemo(
    (): IWizardHeader[] => [
      {
        title: t('top-up-fund.menu.step-one'),
        number: 1,
        status: 'done',
      },
      {
        title: t('top-up-fund.menu.step-two'),
        number: 2,
        status: 'done',
      },
    ],
    [t],
  )

  const handleTryAgain = useCallback(() => {
    setIsError(false)
    setErrorMsg('')
    handleTopUp(formData?.totalTopUpAmount, formData?.trustId)
  }, [formData?.totalTopUpAmount, formData?.trustId, handleTopUp])

  const buttons = React.useMemo(
    (): IWizardButton[] => [
      {
        title: t('button.label.back'),
        onClick: navigation?.previous,
        buttonProps: isTablet
          ? {
              variant: 'grey-outline',
              width: 250,
              height: 52
            }
          : {
              variant: 'grey-outline',
              flex: 1,
              height: 52
            },
      },
      {
        title: t('button.label.try-again'),
        onClick: handleTryAgain,
        buttonProps: isTablet
          ? {
              width: 250,
              height: 52
          }
          : {
              flex: 1,
              height: 52
            },
      },
    ],
    [handleTryAgain, isTablet, navigation?.previous, t],
  )

  if (isLoading)
    return (
      <DashboardLayout layoutBackgroundImage='/images/bg-settlor.svg'>
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.settlor')}
              subtitle={t('content.subtitle.settlor-top-up')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md' color='dolphin' opacity={0.4}>
              {t('content.description.top-up-fund')}
            </Box>
            <Spacer size='xl' />
            <WizardHeader headers={headers} />

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
          >
            <Flex justifyContent='center'>
              <Loader size={58} />
            </Flex>
            <Spacer size='xl' />
            <Box as='p' fontSize='lg' opacity={0.5}>
              {t('top-up-fund.last-submit.description')}
            </Box>
          </Flex>
          <Spacer size='xxl' />
          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            onClick={() => router.push(`/dashboard/settlor`)}
            disabled={!isConfirmed}
          >
            {t('button.top-up-fund.back-to-main')}
          </Button>
        </Flex>
      </DashboardLayout>
    )

  if (isError)
    return (
      <DashboardLayout>
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.settlor')}
              subtitle={t('content.subtitle.settlor-top-up')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('content.description.top-up-fund')}
            </Box>
            <Spacer size='xl' />
            <WizardHeader headers={headers} />
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

          <Spacer size='xl' />

          <WizardButtons buttons={buttons} />
        </Flex>
      </DashboardLayout>
    )

  if (isConfirmed) {
    return (
      <DashboardLayout>
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.settlor')}
              subtitle={t('content.subtitle.settlor-top-up')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('content.description.top-up-fund')}
            </Box>
            <Spacer size='xl' />
            <WizardHeader headers={headers} />
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
          >
            <Image
              src='/images/icon-confirmation-success.svg'
              width={52}
              height={52}
            />
            <Spacer size='xxl' />
            <Text fontWeight={fontWeight.bold} fontSize='lg' color='#5E6282'>
              {t('top-up-fund.last-submit.tx-success')}
              {/*t('top-up-fund.last-submit.tx-success-id')*/}
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
          <Spacer size='xxl' />
          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            onClick={() => router.push(`/dashboard/settlor`)}
            disabled={!isConfirmed}
          >
            {t('button.top-up-fund.back-to-main')}
          </Button>
        </Flex>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Flex
        flexDirection='column'
        justifyContent='space-between'
        variant='layout-content'
        alignItems='center'
      >
        <Box width='100%'>
          <Title
            title={t('content.title.settlor')}
            subtitle={t('content.subtitle.settlor-top-up')}
          />
          <Spacer size='xl' />
          <Box as='p' fontSize='md'>
            {t('content.description.top-up-fund')}
          </Box>
          <Spacer size='xl' />
          <WizardHeader headers={headers} />
        </Box>

        <Spacer size='xxl' />

        <Flex
          flexDirection='column'
          variant='outlined-box'
          width='100%'
          flex={1}
          justifyContent='center'
          alignItems='center'
          px={spacer.xl}
        >
          <Loader size={58} />
          <Spacer size='xxl' />
          <Text fontWeight={fontWeight.bold} fontSize='lg' color='#5E6282'>
            {t('top-up-fund.last-submit.success')}{' '}
            {t('top-up-fund.last-submit.wait-tx')}
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
        <Spacer size='xxl' />
        <Button
          variant='primary'
          py={13}
          px={41}
          sx={{ textTransform: 'uppercase' }}
          onClick={() => router.push(`/dashboard/settlor`)}
          disabled={!isConfirmed}
        >
          {t('button.top-up-fund.back-to-main')}
        </Button>
      </Flex>
    </DashboardLayout>
  )
}

export default Submit
