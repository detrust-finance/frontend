import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
// Components
import { Box, Flex } from 'rebass/styled-components'
import {
  Login,
  YourAccountLayout,
  WalletList,
  DeTrustContractList,
} from '../../components'
import { Button, Spacer, Title } from '../../theme/ui'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../libs/wallet'
import { useTheme } from '../../hooks'

const YourAccount: NextPage = () => {
  const { t } = useTranslation('yourAccount')
  const { account } = useActiveWeb3React()
  const { spacer } = useTheme()

  if (!account) return <Login />

  return (
    <YourAccountLayout layoutBackgroundImage='/images/bg-balances.svg'>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        variant='layout-content'
        alignItems='center'
      >
        <Box width='100%'>
          <Title title={t('content.title.balances')} />
          <Spacer size='xl' />
          <Box as='p' fontSize='md'>
            {t('content.description.balances')}
          </Box>
        </Box>

        <Spacer size='xxl' />

        <Flex
          flexDirection={['column', 'column', 'row']}
          mb='auto'
          width='100%'
        >
          <WalletList flex={1} />
          <Spacer size='xxl' />
          <DeTrustContractList flex={1} />
        </Flex>

        <Flex
          alignItems='center'
          justifyContent='center'
          mt={[spacer['xxl'], spacer['xxl'], 0, 0]}
        >
          <Link href='/your-account/balances/transfer-funds' passHref>
            <Button
              variant='primary'
              py={13}
              px={41}
              sx={{ textTransform: 'uppercase', fontWeight: '700' }}
              width={240}
            >
              {t('button.label.transfer-funds')}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </YourAccountLayout>
  )
}

export default YourAccount
