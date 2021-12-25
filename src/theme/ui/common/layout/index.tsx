import React, { ReactNode } from 'react'
import Head from 'next/head'
// Components
import { Box, BoxProps } from 'rebass/styled-components'
import { Header } from '../../../../theme/ui'
import { useTheme } from '../../../../hooks'

interface Props extends BoxProps {
  children?: ReactNode
  title?: any
  description?: any
  url?: string
  image?: string
}

const Layout = ({
  children,
  title = 'DeTrust',
  description = 'Decentralized Trust',
  url = 'https://detrust.finance',
  image = 'https://detrust.finance/images/cover.png',
  ...restprops
}: Props) => {
  const { colors } = useTheme()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/logo192.png' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />

        <meta name='title' content={title} />
        <meta name='description' content={description} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={url} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={url} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta property='twitter:image' content={image} />
      </Head>
      <Header />
      <Box
        width={['100%', '100%', '100%', null]}
        pt={144}
        pb={40}
        mx='auto'
        //px={[10, 10, 20, 0]}
        px={['1px', '1px', 26, 140]}
        bg={colors.zircon}
        {...restprops}
      >
        {children}
      </Box>
    </>
  )
}

export default Layout
