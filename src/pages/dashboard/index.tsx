import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
// Components
import { Box, Flex } from 'rebass/styled-components'
import {
  Login,
  DashboardLayout,
  WalletList,
  DeTrustContractList,
} from '../../components'
import { Button, Spacer, Title } from '../../theme/ui'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../libs/wallet'
import { useTheme } from '../../hooks'

const Dashboard: NextPage = () => {
  return <></>
}

export default Dashboard
