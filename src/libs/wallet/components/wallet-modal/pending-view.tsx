import { AbstractConnector } from '@web3-react/abstract-connector'
import React from 'react'
import Option from './option'
import { SUPPORTED_WALLETS } from '../../constants'
import { injected } from '../../connectors'
//import Loader from '../loader'
import { useTranslation } from 'react-i18next'
//import { useTheme } from '../../../../hooks'
import { Box, Flex } from 'rebass/styled-components'
import { Button } from '../../../../theme/ui'
import Image from 'next/image'

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
  return (
    <Flex flexDirection='column' width='100%' justifyContent='center'>
      <Box p='30px' />
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
            // <Option
            //   id={`connect-${key}`}
            //   key={key}
            //   //color={option.color}
            //   header={option.name}
            //   icon={'/images/' + option.iconName}
            // />
            // <Image
            //   id={`connect-${key}`}
            //   key={key}
            //   width='30px'
            //   height='30px'
            //   src={'/images/' + option.iconName}
            // />
            <Flex
              justifyContent='center'
              sx={{
                '.wallet-icon': {
                  bg: 'white',
                  borderRadius: 1337,
                  padding: '3px !important',
                },
                //marginRight: '20px',
              }}
            >
              <Image
                src={'/images/' + option.iconName}
                alt='Icon'
                width={50}
                height={50}
                className='wallet-icon'
              />
            </Flex>
          )
        }
        return null
      })}
        {error ? (
          <Flex
            width='100%'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Box mt='20px' fontSize='17px'>
              {t('wallet.label.error-connecting')}
            </Box>
            <Button
              variant='primary'
              onClick={() => {
                setPendingError(false)
                connector && tryActivation(connector)
              }}
              my='40px'
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
            py='40px'
          >
            {t('wallet.label.initializing')}
          </Flex>
        )}
    </Flex>
  )
}

export default PendingView
