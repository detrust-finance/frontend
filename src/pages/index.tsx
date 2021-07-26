import React from 'react'
import { NextPage } from 'next'
// import Head from 'next/head'
import { Text, Box, Image, Button } from 'rebass/styled-components'
// Components
import { Container, Section, Spacer } from '../theme/ui'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks'
import styled from 'styled-components'
import { HomeLayout } from '../components'

const IndexPage: NextPage = () => {
  const { t } = useTranslation('common')
  const { colors, fontSizes } = useTheme()
  const router = useRouter()

  return (
    <HomeLayout>
      <Background>
        <Container>
          <Section
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            height='calc(100vh - 120px)'
            p={[20, 20, 40, null]}
          >
            <Box width={['100%', '100%', 620, null]} mr={[0, 0, 0, '20%']}>
              <Image
                src='/images/logo-white.svg'
                width={[246, null, 346, null]}
                height={[41, null, 58, null]}
              />
              <Spacer size={['xxxxl', 'xxxxxl']} />
              <Text
                lineHeight={[1.4, 1.4, 1.6]}
                color={colors.white}
                fontSize={[fontSizes.xl, fontSizes.xl, fontSizes.xxl, null]}
              >
                {t('description.index-page')}
              </Text>
              <Spacer size='xxxxxl' />
              <Button
                variant='primary'
                py={15}
                px={45}
                sx={{ textTransform: 'uppercase' }}
                onClick={() => router.push(`/your-account/`)}
              >
                {t('button.index-page')}
              </Button>
            </Box>
          </Section>
        </Container>
      </Background>
    </HomeLayout>
  )
}

const Background = styled(Box)`
  padding: 0;
  margin: 0;
  background: url(/images/bg-space.jpg) no-repeat;
  background-size: cover;
  background-position: center 50%;
  height: 100%;
`

export default IndexPage
