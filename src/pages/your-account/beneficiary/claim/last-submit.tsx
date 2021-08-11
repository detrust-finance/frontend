import React, { useCallback, useEffect } from 'react'
import { Box, Flex, Button, Text } from 'rebass/styled-components'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Spacer, Title } from '../../../../theme/ui'
import { Loader } from '../../../../components/loader'
import { useRouter } from 'next/router'
import {
  getEtherscanLink,
  useActiveWeb3React,
  useWallet,
} from '../../../../libs/wallet'
import {
  useRelease,
  useReleaseAll,
  useReleaseAllTo,
  useReleaseTo,
} from '../../../../libs/detrust'
import { FullData } from '../../../../interfaces'
import {
  IWizardButton,
  IWizardHeader,
  WizardButtons,
  WizardHeader,
  YourAccountLayout,
} from '../../../../components'
import { useTheme } from '../../../../hooks'

const Submit: React.FC<FullData> = ({ formData }) => {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation('yourAccount')
  const { addTransaction } = useWallet()
  const [isLoading, setIsLoading] = React.useState(true)
  const [isError, setIsError] = React.useState(false)
  const [isConfirmed, setIsConfirmed] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [txId, setTxId] = React.useState('')
  const { spacer, colors, fontWeight } = useTheme()
  const router = useRouter()

  const { onReleaseAll } = useReleaseAll()
  const { onReleaseAllTo } = useReleaseAllTo()
  const { onRelease } = useRelease()
  const { onReleaseTo } = useReleaseTo()

  useEffect(() => {
    setIsError(false)
  }, [])

  const handleTxConfirmed = useCallback(() => {
    setIsConfirmed(true)
  }, [setIsConfirmed])

  const handleRelease = useCallback(async () => {
    try {
      const tx =
        formData?.releaseToAddress === account
          ? await onRelease(formData?.trustId)
          : await onReleaseTo(formData?.trustId, formData?.releaseToAddress)

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
  }, [
    formData?.releaseToAddress,
    formData?.trustId,
    account,
    onRelease,
    onReleaseTo,
    addTransaction,
    handleTxConfirmed,
  ])

  const handleReleaseAll = useCallback(async () => {
    try {
      const tx =
        formData?.releaseToAddress === account
          ? await onReleaseAll()
          : await onReleaseAllTo(formData?.releaseToAddress)

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
  }, [
    formData?.releaseToAddress,
    account,
    onReleaseAll,
    onReleaseAllTo,
    addTransaction,
    handleTxConfirmed,
  ])

  useEffect(() => {
    if (formData?.releaseToAddress) {
      if (formData?.trustId) {
        handleRelease()
        //console.log('handleRelease()')
      } else {
        handleReleaseAll()
        //console.log('handleReleaseAll()')
      }
    }
  }, [
    formData?.releaseToAddress,
    formData?.trustId,
    handleRelease,
    handleReleaseAll,
  ])

  const handleTryAgain = useCallback(() => {
    setIsError(false)
    setErrorMsg('')
    setIsLoading(true)
    if (formData?.trustId) {
      handleRelease()
    } else {
      handleReleaseAll()
    }
  }, [formData?.trustId, handleRelease, handleReleaseAll])

  const headers = React.useMemo(
    (): IWizardHeader[] => [
      {
        title: t('beneficiaries.claim.step-one.choose-address'),
        number: 1,
        status: 'done',
      },
      {
        title: t('beneficiaries.claim.step-one.confirm'),
        number: 2,
        status: 'active',
      },
    ],
    [t],
  )

  const buttons = React.useMemo(
    (): IWizardButton[] => [
      {
        title: t('button.label.cancel'),
        href: '/your-account/beneficiary',
      },
      {
        title: t('button.label.try-again'),
        onClick: handleTryAgain,
      },
    ],
    [t, handleTryAgain],
  )

  if (isLoading)
    return (
      <YourAccountLayout layoutBackgroundImage='/images/bg-beneficial.svg'>
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.beneficiary')}
              subtitle={
                formData?.trustId ? `CLAIM ${formData?.fundName}` : `CLAIM ALL`
              }
            />
            <Spacer size='xl' />
            <Box as='p'>{t('beneficiaries.claim.last-submit.description')}</Box>
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
          <Spacer size='xxl' />
          <Button
            variant='primary'
            py={13}
            px={41}
            sx={{ textTransform: 'uppercase' }}
            onClick={() => router.push(`/your-account/beneficiary`)}
            disabled={!isConfirmed}
          >
            {t('button.claim.back-to-main')}
          </Button>
        </Flex>
      </YourAccountLayout>
    )

  if (isError)
    return (
      <YourAccountLayout>
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.beneficiary')}
              subtitle={
                formData?.trustId ? `CLAIM ${formData?.fundName}` : `CLAIM ALL`
              }
            />
            <Spacer size='xl' />
            <Box as='p'>{t('beneficiaries.claim.last-submit.description')}</Box>
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
      </YourAccountLayout>
    )

  if (isConfirmed) {
    return (
      <YourAccountLayout>
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%'>
            <Title
              title={t('content.title.beneficiary')}
              subtitle={
                formData?.trustId ? `CLAIM ${formData?.fundName}` : `CLAIM ALL`
              }
            />
            <Spacer size='xl' />
            <Box as='p'>{t('beneficiaries.claim.last-submit.description')}</Box>
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
              <Text fontSize='md' color={colors.grey[300]}>
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
            onClick={() => router.push(`/your-account/beneficiary`)}
            disabled={!isConfirmed}
          >
            {t('button.claim.back-to-main')}
          </Button>
        </Flex>
      </YourAccountLayout>
    )
  }

  return (
    <YourAccountLayout>
      <Flex
        flexDirection='column'
        justifyContent='space-between'
        variant='layout-content'
        alignItems='center'
      >
        <Box width='100%'>
          <Title
            title={t('content.title.beneficiary')}
            subtitle={
              formData?.trustId ? `CLAIM ${formData?.fundName}` : `CLAIM ALL`
            }
          />
          <Spacer size='xl' />
          <Box as='p'>{t('beneficiaries.claim.last-submit.description')}</Box>
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
            <Text fontSize='md' color={colors.grey[300]}>
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
          onClick={() => router.push(`/your-account/beneficiary`)}
          disabled={!isConfirmed}
        >
          {t('button.claim.back-to-main')}
        </Button>
      </Flex>
    </YourAccountLayout>
  )
}

export default Submit
