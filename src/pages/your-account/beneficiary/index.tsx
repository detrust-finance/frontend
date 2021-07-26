import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
// Components
import { Box, Flex, Button } from 'rebass/styled-components'
import { Login, YourAccountLayout, AssetList } from '../../../components'
import { Spacer, Title } from '../../../theme/ui'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../../libs/wallet'
// import { useReleaseAll } from '../../../libs/detrust/hooks/useAddTrust'

const Beneficiary: NextPage = () => {
  const { t } = useTranslation('yourAccount')
  const { account } = useActiveWeb3React()

  if (!account) return <Login />

  return (
    <YourAccountLayout layoutBackgroundImage='/images/bg-beneficial.svg'>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        variant='layout-content'
      >
        <Box>
          <Title
            title={t('content.title.beneficiary')}
            subtitle={t('content.subtitle.settlor-dashboard')}
          />
          <Spacer size='xl' />
          <Box as='p' fontSize='md'>
            {t('content.description.beneficiary')}
          </Box>
          <Spacer size='xxl' />
        </Box>

        <Flex flexDirection='column' mb='auto'>
          <AssetList />
        </Flex>

        <Flex flexDirection='row' justifyContent='center'>
          <Link href={`/your-account/beneficiary/claim`} passHref>
            <Button
              variant='primary'
              py={13}
              px={41}
              sx={{ textTransform: 'uppercase' }}
              width={260}
            >
              {t('button.label.claim-assets')}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </YourAccountLayout>
  )
}

export default Beneficiary
