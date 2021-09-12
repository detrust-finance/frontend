import React, { useCallback, useEffect } from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import Image from 'next/image'
import {
  IWizardButton,
  IWizardHeader,
  WizardButtons,
  WizardHeader,
  DashboardLayout,
} from '../../../../components'
import { useTranslation } from 'react-i18next'
import { FullData } from '../../../../interfaces'
import { useRouter } from 'next/router'
import { Spacer, Title, Button } from '../../../../theme/ui'
import {
  useAddTrust,
  useAddTrustFromBalance,
} from '../../../../libs/detrust/hooks/useAddTrust'
import BigNumber from 'bignumber.js'
import {
  useActiveWeb3React,
  useWallet,
  getEtherscanLink,
} from '../../../../libs/wallet'
import moment from 'moment'
import { useResponsive, useTheme } from '../../../../hooks'
import { Loader } from '../../../../components/loader'

const Submit: React.FC<FullData> = ({ formData, navigation }) => {
  const { chainId } = useActiveWeb3React()
  const { spacer, fontWeight, colors } = useTheme()
  const { addTransaction } = useWallet()
  const [isLoading, setIsLoading] = React.useState(true)
  const [isError, setIsError] = React.useState(false)
  const [isConfirmed, setIsConfirmed] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [txId, setTxId] = React.useState('')
  const router = useRouter()
  const { isTablet } = useResponsive()

  const { t } = useTranslation('dashboard')

  const { onAddTrust } = useAddTrust()

  useEffect(() => {
    setIsError(false)
  }, [])

  const handleTxConfirmed = useCallback(() => {
    setIsConfirmed(true)
  }, [setIsConfirmed])

  const handleAddTrust = useCallback(
    async (
      amount: any,
      name: any,
      beneficiary: any,
      startReleaseTime: any,
      timeInterval: any,
      amountPerTimeInterval: any,
      revocable: any,
    ) => {
      try {
        const tx = await onAddTrust(
          amount,
          name,
          beneficiary,
          startReleaseTime,
          //timeInterval * 86400,
          Math.floor(timeInterval * 86400),
          amountPerTimeInterval,
          revocable,
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
        if (String(e).indexOf('-32603')) {
          console.log('locked')
        }
        setErrorMsg(e?.message)
        setIsError(true)
        setIsLoading(false)
      }
    },
    [onAddTrust, addTransaction, handleTxConfirmed],
  )

  const { onAddTrustFromBalance } = useAddTrustFromBalance()
  const handleAddTrustFromBalance = useCallback(
    async (
      amount: any,
      name: any,
      beneficiary: any,
      startReleaseTime: any,
      timeInterval: any,
      amountPerTimeInterval: any,
      revocable: any,
    ) => {
      try {
        const tx = await onAddTrustFromBalance(
          amount,
          name,
          beneficiary,
          startReleaseTime,
          //timeInterval * 86400,
          Math.floor(timeInterval * 86400),
          amountPerTimeInterval,
          revocable,
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
    [addTransaction, handleTxConfirmed, onAddTrustFromBalance],
  )

  const handleCallAddTrust = useCallback(() => {
    handleAddTrust(
      new BigNumber(formData?.totalDepositAmount).multipliedBy(1e18).toFixed(0),
      formData?.fundName,
      formData?.beneficiaryAddress,
      moment(formData?.releaseStartTime).format('X'),
      formData?.releaseInterval,
      new BigNumber(formData?.releaseAmount).multipliedBy(1e18).toFixed(0),
      formData?.revocable,
    )
  }, [
    formData?.beneficiaryAddress,
    formData?.fundName,
    formData?.releaseAmount,
    formData?.releaseInterval,
    formData?.releaseStartTime,
    formData?.totalDepositAmount,
    formData?.revocable,
    handleAddTrust,
  ])

  const handleCallAddTrustFromBalance = useCallback(() => {
    handleAddTrustFromBalance(
      new BigNumber(formData?.totalDepositAmount).multipliedBy(1e18).toFixed(0),
      formData?.fundName,
      formData?.beneficiaryAddress,
      moment(formData?.releaseStartTime).format('X'),
      formData?.releaseInterval,
      new BigNumber(formData?.releaseAmount).multipliedBy(1e18).toFixed(0),
      formData?.revocable,
    )
  }, [
    formData?.beneficiaryAddress,
    formData?.fundName,
    formData?.releaseAmount,
    formData?.releaseInterval,
    formData?.releaseStartTime,
    formData?.totalDepositAmount,
    formData?.revocable,
    handleAddTrustFromBalance,
  ])

  const handleTryAgain = useCallback(() => {
    setIsError(false)
    setErrorMsg('')
    setIsLoading(true)
    if (formData?.fundSource === 'dtrust') {
      handleCallAddTrustFromBalance()
    } else {
      handleCallAddTrust()
    }
  }, [formData?.fundSource, handleCallAddTrust, handleCallAddTrustFromBalance])

  useEffect(() => {
    if (formData?.beneficiaryAddress) {
      if (formData?.fundSource === 'dtrust') {
        handleCallAddTrustFromBalance()
      } else {
        handleCallAddTrust()
      }
    }
  }, [formData, handleCallAddTrust, handleCallAddTrustFromBalance])

  const headers = React.useMemo(
    (): IWizardHeader[] => [
      {
        title: t('create-new-trust.menu.step-one'),
        number: 1,
        status: 'done',
      },
      {
        title: t('create-new-trust.menu.step-two'),
        number: 2,
        status: 'done',
      },
      {
        title: t('create-new-trust.menu.step-three'),
        number: 3,
        status: 'done',
      },
    ],
    [t],
  )

  const buttons = React.useMemo(
    (): IWizardButton[] => [
      {
        title: t('button.label.back'),
        onClick: navigation?.previous,
        buttonProps: isTablet
          ? {
              variant: 'grey-outline',
              width: 240,
            }
          : {
              flex: 1,
            },
      },
      {
        title: t('button.label.try-again'),
        onClick: handleTryAgain,
        buttonProps: isTablet
          ? {
              variant: 'grey-outline',
              width: 240,
            }
          : {
              flex: 1,
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
              subtitle={t('content.subtitle.settlor-new-trust')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('content.description.beneficiary')}
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
            <Flex justifyContent='center'>
              <Loader size={58} />
            </Flex>
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('create-new-trust.last-submit.description')}
            </Box>
          </Flex>
          <Spacer size='xl' />
          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            onClick={() => router.push(`/dashboard/settlor`)}
            disabled={!isConfirmed}
          >
            {t('button.create-new-trust.back-to-main')}
          </Button>
        </Flex>
      </DashboardLayout>
    )

  if (isError)
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
              subtitle={t('content.subtitle.settlor-new-trust')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('content.description.beneficiary')}
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
              subtitle={t('content.subtitle.settlor-new-trust')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('content.description.beneficiary')}
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
            <Image
              src='/images/icon-confirmation-success.svg'
              width={52}
              height={52}
            />
            <Spacer size='xxl' />
            <Text fontWeight={fontWeight.medium} fontSize='md'>
              {t('create-new-trust.last-submit.tx-success')}
              {/*t('create-new-trust.last-submit.tx-success-id')*/}
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
                color={colors.grey[300]}
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
            {t('button.create-new-trust.back-to-main')}
          </Button>
        </Flex>
      </DashboardLayout>
    )
  }

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
            subtitle={t('content.subtitle.settlor-new-trust')}
          />
          <Spacer size='xl' />
          <Box as='p' fontSize='md'>
            {t('content.description.beneficiary')}
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
          <Text fontWeight={fontWeight.medium} fontSize='md'>
            {t('create-new-trust.last-submit.success')}{' '}
            {t('create-new-trust.last-submit.wait-tx')}
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
              color={colors.grey[300]}
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
        <Spacer size='xl' />
        <Button
          variant='primary'
          py={13}
          px={41}
          sx={{ textTransform: 'uppercase' }}
          onClick={() => router.push(`/dashboard/settlor`)}
          disabled={!isConfirmed}
        >
          {t('button.create-new-trust.back-to-main')}
        </Button>
      </Flex>
    </DashboardLayout>
  )
}

export default Submit
