import React from 'react'
import { NextPage } from 'next'
// Components
import { Box, Flex, Button, Link } from 'rebass/styled-components'
import { Login, DashboardLayout, TrustList } from '../../../components'
import { Spacer, Title } from '../../../theme/ui'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../../libs/wallet'
// import CreateNewTrust from './create-new-trust/index'

const Settlor: NextPage = () => {
  const { t } = useTranslation('dashboard')
  const { account } = useActiveWeb3React()

  // let showCreateNewTrust = false
  if (!account) return <Login />
  // if (showCreateNewTrust) return <CreateNewTrust />

  return (
    <DashboardLayout layoutBackgroundImage='/images/bg-settlor.svg'>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        variant='layout-content'
      >
        <Box>
          <Title
            title={t('content.title.settlor')}
            subtitle={t('content.subtitle.settlor-dashboard')}
          />
          <Spacer size='xl' />
          <Box as='p' fontSize='md'>
            {t('content.description.settlor')}
          </Box>
          <Spacer size='xxl' />
        </Box>

        <Flex flexDirection='column' mb='auto'>
          <TrustList />
        </Flex>

        <Flex flexDirection='row' justifyContent='center'>
          <Link href='/dashboard/settlor/create-new-trust'>
            <Button
              variant='primary'
              py={13}
              px={41}
              sx={{ textTransform: 'uppercase' }}
              width={240}
            >
              {t('button.label.create-trust')}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </DashboardLayout>
  )
}

export default Settlor
