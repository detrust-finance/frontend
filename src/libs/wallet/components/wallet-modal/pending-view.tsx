import { AbstractConnector } from '@web3-react/abstract-connector'
import React from 'react'
import Option from './option'
import { SUPPORTED_WALLETS } from '../../constants'
import { injected } from '../../connectors'
//import Loader from '../loader'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../../../hooks'
import { Box, Flex } from 'rebass/styled-components'
import { Button, Spacer } from '../../../../theme/ui'

interface PendingViewProps {
  connector?: AbstractConnector
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}

const PendingView: React.FC<PendingViewProps> = ({
  connector,
  error = false,
  setPendingError,
  tryActivation,
}) => {
  const isMetamask = window?.ethereum?.isMetaMask
  const { t } = useTranslation('wallet')
  const { colors } = useTheme()
  return (
    <Flex flexDirection='column' width='100%'>
      <Box
        flex={1}
        flexDirection='column'
        p={24}
        sx={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: colors.blue[100],
        }}
      >
        {error ? (
          <Flex
            width='100%'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Box>{t('wallet.label.error-connecting')}</Box>
            <Spacer />
            <Button
              variant='secondary'
              onClick={() => {
                setPendingError(false)
                connector && tryActivation(connector)
              }}
              sx={{ textTransform: 'uppercase' }}
            >
              {t('wallet.label.try-again')}
            </Button>
          </Flex>
        ) : (
          <Flex
            width='100%'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            {t('wallet.label.initializing')}
          </Flex>
        )}
      </Box>
      <Spacer size='xl' />
      {Object.keys(SUPPORTED_WALLETS).map(key => {
        const option = SUPPORTED_WALLETS[key]
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              color={option.color}
              header={option.name}
              icon={'/images/' + option.iconName}
            />
          )
        }
        return null
      })}
    </Flex>
  )
}

export default PendingView
