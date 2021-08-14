import React from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import {
  Balance,
  IWizardButton,
  IWizardHeader,
  WizardButtons,
  WizardHeader,
  DashboardLayout,
} from '../../../../components'
import { useTranslation } from 'react-i18next'
import { FullData } from '../../../../interfaces'
import { Spacer, Title, Input, ErrorMessage } from '../../../../theme/ui'
import { useResponsive, useTheme } from '../../../../hooks'
import { Label, Radio } from '@rebass/forms'
import { useForm } from 'react-hook-form'
import { ETH_ADDRESS } from '../../../../constants'

const StepOne: React.FC<FullData> = ({ formData, setForm, navigation }) => {
  const { t } = useTranslation('dashboard')
  const { t: tc } = useTranslation('common')
  const { isTablet } = useResponsive()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  })
  const { fontWeight, colors } = useTheme()
  const headers = React.useMemo(
    (): IWizardHeader[] => [
      {
        title: t('top-up-fund.menu.step-one'),
        number: 1,
        status: 'active',
      },
      {
        title: t('top-up-fund.menu.step-two'),
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
        href: '/dashboard/settlor',
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
      if (!setForm) return
      Object.keys(data).map((key: string) => {
        if (!data[key]) return
        setForm({
          target: {
            name: key,
            value: data[key],
          },
        })
      })
      navigation?.next()
    },
    [navigation, setForm],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <Box as='p' fontSize='md'>
              {t('content.description.top-up-fund')}
            </Box>
            <Spacer size='xl' />
            <WizardHeader headers={headers} />
          </Box>

          <Spacer size='xxxl' />

          <Box width='100%' mb='auto'>
            <Box variant='outlined-box'>
              <Flex flexDirection='column' alignItems='center'>
                <Box as='p'>{t('create-new-trust.fund-deposit')}</Box>
                <Spacer size='xl' />
              </Flex>

              <Flex
                flexDirection={['column', 'column', 'row']}
                justifyContent='center'
                width={['70%', '70%', '100%']}
                mx={['auto', 'auto', 0]}
              >
                <Label htmlFor='wallet' width='auto'>
                  <Flex alignItems='center' mr={15}>
                    <Radio
                      id='wallet'
                      name='fundSource'
                      onChange={setForm}
                      value='wallet'
                      mr={15}
                      defaultChecked
                      color={colors.red[100]}
                      sx={{
                        'input:focus ~ &': {
                          bg: 'transparent',
                        },
                      }}
                    />
                    {t('create-new-trust.label.wallet')}
                    <Spacer />
                    <Balance address={ETH_ADDRESS} type={'wallet'} />
                  </Flex>
                </Label>

                {!isTablet && <Spacer />}

                <Label htmlFor='dtrust' width='auto'>
                  <Flex alignItems='center'>
                    <Radio
                      id='dtrust'
                      name='fundSource'
                      onChange={setForm}
                      value='dtrust'
                      mr={15}
                      color={colors.red[100]}
                      sx={{
                        'input:focus ~ &': {
                          bg: 'transparent',
                        },
                      }}
                    />
                    {t('create-new-trust.label.dtrust')}
                    <Spacer />
                    <Balance address={ETH_ADDRESS} type={'contract'} />
                  </Flex>
                </Label>
              </Flex>
            </Box>

            <Spacer size='xxxl' />

            <Flex
              variant='outlined-box'
              flexDirection='column'
              alignItems='center'
              sx={{ borderBottomColor: 'transparent' }}
            >
              <Text fontWeight={fontWeight.medium}>
                {t('top-up-fund.label.top-up-amount')}
              </Text>
            </Flex>
            <Input
              {...register('totalTopUpAmount', {
                required: {
                  value: true,
                  message: tc('error.field-is-required'),
                },
                pattern: {
                  value: /^\d*\.?\d*$/,
                  message: tc('error.field-must-be-number'),
                },
              })}
              sx={{
                textAlign: 'center',
              }}
              placeholder='0.00'
            />
            {errors?.totalTopUpAmount?.message && (
              <ErrorMessage textAlign='center'>
                {tc(`${errors?.totalTopUpAmount?.message}`)}
              </ErrorMessage>
            )}
          </Box>

          <WizardButtons buttons={buttons} />
        </Flex>
      </DashboardLayout>
    </form>
  )
}

export default StepOne
