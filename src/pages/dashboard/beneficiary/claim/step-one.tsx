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
//import Image from 'next/image'
import { FullData } from '../../../../interfaces'
import { Spacer, Title, Input, ErrorMessage } from '../../../../theme/ui'
import { useResponsive, useTheme } from '../../../../hooks'
import { useForm } from 'react-hook-form'

const StepOne: React.FC<FullData> = ({ formData, setForm, navigation }) => {
  //console.log('StepOne')
  //console.log(formData)
  const { t } = useTranslation('dashboard')
  const { fontWeight } = useTheme()
  const { t: tc } = useTranslation('common')
  const { isTablet } = useResponsive()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  })

  const headers = React.useMemo(
    (): IWizardHeader[] => [
      {
        title: t('beneficiaries.claim.step-one.choose-address'),
        number: 1,
        status: 'active',
      },
      {
        title: t('beneficiaries.claim.step-one.confirm'),
        number: 2,
        status: 'inactive',
      },
    ],
    [t],
  )

  const buttons = React.useMemo(
    (): IWizardButton[] => [
      {
        title: t('button.label.cancel'),
        href: '/dashboard/beneficiary',
        buttonProps: isTablet
          ? {
              variant: 'grey-outline',
              width: 240,
            }
          : {
              variant: 'grey-outline',
              flex: 1,
            },
      },
      {
        title: t('button.label.next'),
        type: 'submit',
        buttonProps: isTablet
          ? {
              width: 240,
            }
          : {
              flex: 1,
            },
      },
    ],
    [isTablet, t],
  )

  const onSubmit = React.useCallback(
    data => {
      //console.log('onSubmit')
      //console.log(data)
      if (!setForm) return
      // Object.keys(data).map((key: string) => {
      //   setForm({
      //     target: {
      //       name: key,
      //       value: data[key],
      //     },
      //   })
      // })
      setForm(data)
      navigation?.next()
    },
    [navigation, setForm],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DashboardLayout layoutBackgroundImage='/images/bg-beneficial.svg'>
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
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
            <Box as='p' fontSize='md' color='dolphin' opacity={0.4}>
              {t('content.description.beneficiary')}
            </Box>
            <Spacer size='xl' />
            <WizardHeader headers={headers} />
          </Box>

          <Spacer size='xxxl' />

          <Box width='100%' mb='auto'>
            <Flex
              variant='outlined-box'
              flexDirection='column'
              alignItems='center'
              sx={{ borderBottomColor: 'transparent' }}
            >
              <Text fontWeight={fontWeight.medium}>
                {t('beneficiaries.claim.step-one.release-address')}
              </Text>
            </Flex>
            <Input
              {...register('releaseToAddress', {
                required: {
                  value: true,
                  message: tc('error.field-is-required'),
                },
                pattern: {
                  value: /^0x[a-fA-F0-9]{40}$/,
                  message: tc('error.field-is-not-eth-address'),
                },
              })}
              sx={{ textAlign: 'center' }}
              placeholder={t('beneficiaries.claim.enter-address')}
            />
            {errors?.releaseToAddress?.message && (
              <ErrorMessage>{errors?.releaseToAddress?.message}</ErrorMessage>
            )}
          </Box>
          <WizardButtons buttons={buttons} />
        </Flex>
      </DashboardLayout>
    </form>
  )
}

export default StepOne
