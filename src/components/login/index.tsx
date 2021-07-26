import React from 'react'
// Components
import { Box } from 'rebass/styled-components'
import { YourAccountLayout } from '../'
import { Spacer, Title } from '../../theme/ui'
import { useTranslation } from 'react-i18next'

import { Web3StatusInner } from '../../libs/wallet/components/web3-status'

const Login: React.FC = () => {
  const { t } = useTranslation('yourAccount')
  return (
    <YourAccountLayout layoutBackgroundImage='/images/bg-login.svg'>
      <Box variant='layout-content'>
        <Title title={t('content.title.your-account')} />
        <Spacer size='xl' />
        <Box as='p' fontSize='md'>
          {t('content.description.your-account')}
        </Box>
        <Spacer size='xxl' />
        <Web3StatusInner text={t('content.buttons.connect-your-wallet')} />
      </Box>
    </YourAccountLayout>
  )
}

export default Login
