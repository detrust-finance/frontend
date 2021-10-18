import React from 'react'
import { NextPage } from 'next'
// import Head from 'next/head'
// Components
//import { useRouter } from 'next/router'
//import { useTranslation } from 'react-i18next'
//import { useTheme } from '../hooks'
import { Home } from '../components'
import { useResponsive } from '../hooks';

const IndexPage: NextPage = () => {
  // const { t } = useTranslation('common')
  // const { colors, fontSizes } = useTheme()
  // const router = useRouter()

  const { isTablet, isDesktop } = useResponsive();
  //console.log(`${isMobile}, ${isTablet}, ${isDesktop}`);
  const device = isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'

  return (
    <Home device={device} />
  )
}

export default IndexPage
