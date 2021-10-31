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
import moment from 'moment'
import { DATE_FORMAT_NO_TIME } from '../../../../constants'
import { shortenAddress } from '../../../../libs/wallet/utils'
// import { SelectOption } from '../../../../theme/ui/forms/input/interfaces'

const StepTwo: React.FC<FullData> = ({ formData, navigation }) => {
  const { t } = useTranslation('dashboard')
  const { t: tc } = useTranslation('common')
  const { spacer, fontWeight } = useTheme()
  const { isTablet } = useResponsive()

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
              height: 52,
            }
          : {
              variant: 'grey-outline',
              flex: 1,
              height: 52,
            },
      },
      {
        title: t('button.label.next'),
        onClick: navigation?.next,
        buttonProps: isTablet
          ? {
              width: 250,
              height: 52,
            }
          : {
              flex: 1,
              height: 52,
            },
      },
    ],
    [isTablet, navigation?.next, navigation?.previous, t],
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
            subtitle={t('content.subtitle.settlor-new-trust')}
          />
          <Spacer size='xl' />
          <Box as='p' fontSize='md'>
            {t('content.description.settlor-steps')}
          </Box>
          <Spacer size='xl' />

          <WizardHeader headers={headers} />
        </Box>

        <Spacer size='xxxl' />

        <Box width='100%' mb='auto'>
          <Box variant='outlined-box-full' px={spacer.xl}>
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('create-new-trust.label.fundname')}{' '}
              </Text>
              <Box variant='dots' />
              <Text>{`${formData?.fundName}`}</Text>
            </Flex>
            <Spacer size='xxl' />
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('create-new-trust.label.beneficiary-address')}{' '}
              </Text>
              <Box variant='dots' />
              <Text>{`${
                isTablet
                  ? formData?.beneficiaryAddress
                  : shortenAddress(formData?.beneficiaryAddress)
              }`}</Text>
            </Flex>
            {/* <Spacer size='xxl' />
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('create-new-trust.label.fund-source')}
              </Text>
              <Box variant='dots' />
              <Text>{`${formData?.fundSource}`}</Text>
            </Flex> */}
            <Spacer size='xxl' />
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('create-new-trust.label.depost-amount')}
              </Text>
              <Box variant='dots' />
              <Text>
                {`${formData?.totalDepositAmount}`} {formData?.asset}
              </Text>
            </Flex>
            <Spacer size='xxl' />
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('create-new-trust.label.release-start')}
              </Text>
              <Box variant='dots' />
              <Text>
                {moment(formData?.releaseStartTime).format(DATE_FORMAT_NO_TIME)}
              </Text>
            </Flex>
            <Spacer size='xxl' />
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('create-new-trust.label.release-interval')}
              </Text>
              <Box variant='dots' />
              <Text>
                {formData?.releaseInterval}{' '}
                {formData?.releaseInterval?.length > 1 ? tc('days') : tc('day')}
              </Text>
            </Flex>
            <Spacer size='xxl' />
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('create-new-trust.label.release-amount')}
              </Text>
              <Box variant='dots' />
              <Text>
                {`${formData?.releaseAmount}`} {formData?.asset}
              </Text>
            </Flex>
            <Spacer size='xxl' />
            <Flex justifyContent='space-between'>
              <Text fontWeight={fontWeight.medium}>
                {t('create-new-trust.label.revocable')}
              </Text>
              <Box variant='dots' />
              <Text>
                {formData?.revocable ? 'true' : 'false'}
              </Text>
            </Flex>
          </Box>
        </Box>

        <WizardButtons buttons={buttons} />
      </Flex>
    </DashboardLayout>
  )
}

export default StepTwo
