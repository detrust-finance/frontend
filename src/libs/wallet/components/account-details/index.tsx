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
import { useTheme } from '../../../../hooks'

const AccountDetails: React.FC<AccountDetailsProps> = ({ openOptions }) => {
  const { t } = useTranslation('wallet')
  const { account, connector } = useActiveWeb3React()
  const { colors } = useTheme()

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
    <Box>
      <Flex justifyContent='space-between' alignItems='center'>
        {formatConnectorName()}
        <Flex>
          <Button
            variant='secondary'
            onClick={() => {
              openOptions()
            }}
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
              p='px'
              sx={{ textTransform: 'uppercase' }}
            >
              <LogOut height={16} />
            </Button>
          )}
        </Flex>
      </Flex>
      <Spacer size='xl' />
      <Box
        id='web3-account-identifier-row'
        p={24}
        sx={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: colors.blue[100],
        }}
      >
        <Text fontSize='xl' textAlign='center'>
          {account && shortenAddress(account, 10)}
        </Text>
      </Box>
      <Spacer size='xl' />
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
      </Flex>
    </Box>
  )
}

export default AccountDetails
