import React from 'react'
import { Box, Flex } from 'rebass/styled-components'
import { Label, Radio, Checkbox } from '@rebass/forms'
import {
  WizardHeader,
  WizardButtons,
  IWizardHeader,
  IWizardButton,
  DashboardLayout,
  Balance,
} from '../../../../components'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { FullData } from '../../../../interfaces'
import { Spacer, Title } from '../../../../theme/ui'
import { useDetrust } from '../../../../libs/detrust'
import { IApiTrustToken } from '../../../../constants'
import { useResponsive, useTheme } from '../../../../hooks'

const StepOne: React.FC<FullData> = ({ setForm, formData, navigation }) => {
  const { t } = useTranslation('dashboard')
  const { walletTrustTokens } = useDetrust()
  const { fontWeight, colors } = useTheme()
  const { isTablet } = useResponsive()

  const headers = React.useMemo(
    (): IWizardHeader[] => [
      {
        title: t('create-new-trust.menu.step-one'),
        number: 1,
        status: 'active',
      },
      {
        title: t('create-new-trust.menu.step-two'),
        number: 2,
        status: 'inactive',
      },
      {
        title: t('create-new-trust.menu.step-three'),
        number: 3,
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
        onClick: navigation?.next,
        buttonProps: isTablet
          ? {
              width: 240,
            }
          : {
              flex: 1,
            },
      },
    ],
    [isTablet, navigation?.next, t],
  )

  return (
    <DashboardLayout layoutBackgroundImage='/images/bg-settlor.svg'>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        variant='layout-content'
        as='form'
      >
        <Box>
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
          {/* <Box variant='outlined-box'>
            <Flex flexDirection='column' alignItems='center'>
              <Box as='p' fontWeight={fontWeight.medium}>
                {t('create-new-trust.fund-deposit')}
              </Box>
            </Flex>

            <Spacer size='xl' />

            <Flex flexDirection='row' justifyContent='center'>
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
                </Flex>
              </Label>

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
                </Flex>
              </Label>
            </Flex>
          </Box>
          <Spacer size='xxxl' /> */}
          <Box variant='outlined-box'>
            <Flex flexDirection='column' alignItems='center'>
              <Box as='p' fontWeight={fontWeight.medium}>
                {t('create-new-trust.fund-deposit-asset')}
              </Box>

              <Spacer size='xl' />

              <Flex flexDirection='row'>
                {walletTrustTokens?.map(
                  (token: IApiTrustToken, index: number) =>
                    token.enabled && (
                      <Label
                        htmlFor={token.symbol}
                        width='auto'
                        key={token.symbol}
                      >
                        <Flex
                          alignItems='center'
                          mr={index < walletTrustTokens.length - 1 ? 15 : null}
                        >
                          <Radio
                            type='radio'
                            id={token.symbol}
                            name='asset'
                            onChange={setForm}
                            value={token.symbol}
                            defaultChecked={!!!index}
                            color={colors.red[100]}
                            mr={15}
                            sx={{
                              'input:focus ~ &': {
                                bg: 'transparent',
                              },
                            }}
                          />
                          <Image
                            src={token.icon3x?.url}
                            width={20}
                            height={20}
                          />
                          <Box ml='8px'>
                            {token.symbol}{' '}
                            <Balance
                              address={token.contract_address}
                              type={formData?.fundSource}
                            />
                          </Box>
                        </Flex>
                      </Label>
                    ),
                )}
              </Flex>
            </Flex>
          </Box>

          <Spacer size='xxxl' />

          {/* set revocable or not */}
          <Box variant='outlined-box'>
            <Flex flexDirection='column' alignItems='center'>
              <Box as='p' fontWeight={fontWeight.medium}>
                {t('create-new-trust.is-trust-revocable-or-not')}
              </Box>

              <Spacer size='xl' />

              <Flex flexDirection='row'>
                <Label htmlFor='revocable' width='auto'>
                  <Flex alignItems='center' mr={15}>
                    <Checkbox
                      color={colors.red[100]}
                      id='revocable'
                      name='revocable'
                      value='revocable'
                      checked={formData.revocable}
                      onChange={setForm}
                    />
                    {t('create-new-trust.label.revocable')}
                  </Flex>
                </Label>
              </Flex>
            </Flex>
          </Box>
        </Box>

        <WizardButtons buttons={buttons} />
      </Flex>
    </DashboardLayout>
  )
}

export default StepOne
