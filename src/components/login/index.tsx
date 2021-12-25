import React from 'react'
// Components
import { Box, Flex } from 'rebass/styled-components'
import { DashboardLayout } from '../'
import { Spacer, Title } from '../../theme/ui'
import { useTranslation } from 'react-i18next'

import { Web3StatusInner } from '../../libs/wallet/components/web3-status'

const Login: React.FC = () => {
  const { t } = useTranslation('dashboard')
  return (
    <DashboardLayout layoutBackgroundImage='/images/bg-login.svg'>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        variant='layout-content'
      >
        <Title title={t('content.title.dashboard')} mb='20px' />
        {/* <Spacer size='xl' /> */}
        <Box
          as='p'
          fontSize='lg'
          color='dolphin'
          opacity={0.5}
          mb='64px'
        >
          {t('content.description.dashboard')}
        </Box>
        {/* <Spacer size='xxxxl' /> */}
        <Web3StatusInner text={t('content.buttons.connect-your-wallet')} />
      </Flex>
    </DashboardLayout>
  )
}

export default Login
