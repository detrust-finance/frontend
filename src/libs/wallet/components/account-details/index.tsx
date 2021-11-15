import React from 'react'
import { Flex, Box, Text } from 'rebass/styled-components'
// Hooks
import { useActiveWeb3React } from '../../hooks'
import { useTranslation } from 'react-i18next'
// Connectors
import { injected, walletlink } from '../../connectors'
// Components
import Copy from './copy'
import { Button, Spacer } from '../../../../theme/ui'
import { LogOut } from 'react-feather'
// Utils
import { shortenAddress } from '../../utils'
// Interfaces
import { AccountDetailsProps } from './interfaces'
// Constants
import { SUPPORTED_WALLETS } from '../../constants'
import { useTheme, useResponsive } from '../../../../hooks'
import { Cancel } from 'iconoir-react'
import Image from 'next/image'

const AccountDetails: React.FC<AccountDetailsProps> = ({ openOptions, onDismiss }) => {
  const { t } = useTranslation('wallet')
  const { account, connector } = useActiveWeb3React()
  const { colors } = useTheme()
  const { isTablet } = useResponsive()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        k =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK')),
      )
      .map(k => SUPPORTED_WALLETS[k].name)[0]
    return <Text>{t('wallet.label.connected-with', { name })}</Text>
  }

  return (
    <Flex flexDirection='column'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text fontSize='17px' sx={{ textTransform: 'uppercase' }}>
          {t('wallet.modal.title')}
        </Text>
        <Cancel
          width='14px'
          height='14px'
          onClick={onDismiss}
          cursor='pointer'
          color='black'
        />
      </Flex>
      <Text fontSize='17px' my='42px'>
        {formatConnectorName()}
      </Text>
      <Flex
        id='web3-account-identifier-row'
        alignItems='center'
        p={24}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxSizing: 'border-box',
          boxShadow: '0px 20px 80px rgba(0, 0, 0, 0.02)',
          borderRadius: '8px',
        }}
      >
        <Text fontSize={['sm', 'sm', '17px', '17px']} textAlign='center'>
          {account && shortenAddress(account, 10)}
        </Text>
        {account && (
          <Copy variant='copy' toCopy={account} />
        )}
        {isTablet &&
        <Flex
          sx={{
            bg: account ? colors.jaffa : colors.grey[200],
            width: 40,
            height: 40,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            color: colors.white,
            ml: 25,
            pr: '1px',
            cursor: 'pointer',
          }}
        >
          <Image src='/images/user.svg' width={22} height={24} />
        </Flex>}
      </Flex>
      {/* <Spacer size='xl' />
      <Flex flexDirection='column' width='100%'>
        {account && (
          <Copy
            variant='secondary'
            size='sm'
            toCopy={account}
            sx={{ textTransform: 'uppercase' }}
          >
            <Text ml='8px'>{t('wallet.button.copy-address')}</Text>
          </Copy>
        )}
      </Flex> */}
      <Flex
        justifyContent='center'
        alignItems='center'
        width='100%'
        my='40px'
      >
        <Button
          variant='primary'
          onClick={() => {
            openOptions()
          }}
          px='50px'
          sx={{ textTransform: 'uppercase' }}
        >
          {t('wallet.button.change')}
        </Button>
        {connector !== injected && connector !== walletlink && (
          <Button
            variant='secondary'
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-extra-semi
              ;(connector as any).close()
            }}
            ml='8px'
            px='30px'
            sx={{ textTransform: 'uppercase' }}
          >
            <LogOut height={16} />
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default AccountDetails
