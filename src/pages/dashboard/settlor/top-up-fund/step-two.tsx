import React from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import {
  IWizardButton,
  IWizardHeader,
  WizardButtons,
  WizardHeader,
  DashboardLayout,
} from '../../../../components'
import { useTranslation } from 'react-i18next'
import { FullData } from '../../../../interfaces'
import { Spacer, Title } from '../../../../theme/ui'
import { useResponsive, useTheme } from '../../../../hooks'
import { shortenAddress } from '../../../../libs/wallet/utils'

const StepThree: React.FC<FullData> = ({ formData, navigation }) => {
  const { t } = useTranslation('dashboard')
  const { fontWeight, spacer } = useTheme()
  const { isTablet, isLaptop } = useResponsive()
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
        status: 'active',
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
        title: t('button.label.next'),
        onClick: navigation?.next,
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
    [t, navigation?.previous, navigation?.next, isTablet],
  )

  return (
    <DashboardLayout layoutBackgroundImage='/images/bg-settlor.svg'>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
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
        </Box>

        <Spacer size='xxxl' />

        <Box width='100%' mb='auto'>
          <Box
            variant='outlined-box-full'
            px={spacer.xl}
          >
            <Flex justifyContent='space-between'>
              <Text fontSize='lg' lineHeight='30px'>
                {t('create-new-trust.label.fundname')}{' '}
              </Text>
              <Box variant='dots' />
              <Text>{`${formData?.fundName}`}</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text fontSize='lg' lineHeight='30px'>
                {t('top-up-fund.label.beneficiary-address')}{' '}
              </Text>
              <Box variant='dots' />
              <Text>{`${
                isLaptop
                  ? formData?.beneficiaryAddress
                  : shortenAddress(formData?.beneficiaryAddress)
              }`}</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text fontSize='lg' lineHeight='34px'>
                {t('top-up-fund.label.settlor-address')}
              </Text>
              <Box variant='dots' />
              <Text>{`${
                isLaptop
                  ? formData?.settlorAddress
                  : shortenAddress(formData?.settlorAddress)
              }`}</Text>
            </Flex>
            {/* <Spacer size='xxl' />
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('top-up-fund.label.fund-source')}
              </Text>
              <Box variant='dots' />
              <Text>{`${formData?.fundSource}`}</Text>
            </Flex> */}
            <Flex justifyContent='space-between'>
              <Text fontSize='lg' lineHeight='30px'>
                {t('top-up-fund.label.top-up-amount')}
              </Text>
              <Box variant='dots' />
              <Text>{`${formData?.totalTopUpAmount} ${formData?.asset}`}</Text>
            </Flex>
          </Box>
        </Box>

        <WizardButtons buttons={buttons} />
      </Flex>
    </DashboardLayout>
  )
}

export default StepThree
