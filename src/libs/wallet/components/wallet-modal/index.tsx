import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import usePrevious from '../../hooks/usePrevious'
import AccountDetails from '../account-details'
import PendingView from './pending-view'
import Option from './option'
import { SUPPORTED_WALLETS } from '../../constants'
import { ExternalLink } from '../../../../theme/components'

import { injected, portis } from '../../connectors'
// import { OVERLAY_READY } from '../../connectors/fortmatic'
import { WalletConnectConnector } from '../../connectors/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { Flex, Box, Text } from 'rebass/styled-components'
import { Button, Spacer } from '../../../../theme/ui'
import { useTranslation } from 'react-i18next'
import { useWallet, useToastify } from '../../hooks'
import { setupNetwork } from '../../utils/wallet'

// Close icon 
import { X } from 'react-feather'

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

const WalletModal: React.FC<{ onDismiss?: any }> = ({ onDismiss }) => {
  const { t } = useTranslation('wallet')
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingWallet, setPendingWallet] = useState<
    AbstractConnector | undefined
  >()

  const { txToast } = useToastify()

  const [pendingError, setPendingError] = useState<boolean>()
  const { walletModalOpen, chainEnabled, WalletDispatch } = useWallet()
  const toggleWalletModal = React.useCallback(() => {
    WalletDispatch({
      type: 'UPDATE',
      payload: {
        walletModalOpen: !walletModalOpen,
      },
    })
  }, [WalletDispatch, walletModalOpen])

  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (
      walletModalOpen &&
      ((active && !activePrevious) ||
        (connector && connector !== connectorPrevious && !error))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }

    if (active && previousAccount) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [
    onDismiss,
    setWalletView,
    active,
    error,
    connector,
    walletModalOpen,
    activePrevious,
    connectorPrevious,
    account,
    previousAccount,
  ])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return SUPPORTED_WALLETS[key].name
      }
      return true
    })

    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    connector &&
      activate(connector, undefined, true).catch(async error => {
        console.log('connector error', error)
        if (error?.code === -32002) {
          console.log('connector error', error.code)
          txToast(
            "Request of type 'wallet_requestPermissions' already pending",
            '',
            'error',
          )
          if (chainEnabled) {
            onDismiss()
          }
        }
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
          // activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  }

  // get wallets user can switch too, depending on device/browser
  const getOptions = () => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector)
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              icon={`/images/${option.iconName}`}
            />
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={'Install Metamask'}
                link={'https://metamask.io/'}
                icon={'/images/metamask.png'}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            icon={`/images/${option.iconName}`}
          />
        )
      )
    })
  }

  const getModalContent = () => {
    if (error) {
      return (
        <>
          <Text>
            {error instanceof UnsupportedChainIdError
              ? t('wrong-network')
              : t('error-connecting')}
          </Text>
          <Box mt='md'>
            {error instanceof UnsupportedChainIdError ? (
              <Text as='h5'>
                {t(
                  'unsupported-chain-id' /* Please connect to the appropriate Ethereum network. */,
                )}
              </Text>
            ) : (
              t(
                'error-connecting-refresh' /* Error connecting. Try refreshing the page. */,
              )
            )}
          </Box>
        </>
      )
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
          onDismiss={onDismiss}
        />
      )
    }
    return (
      <Box>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <>
            <Button
              variant='secondary'
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
              sx={{ textTransform: 'uppercase' }}
            >
              {t('wallet.button.back')}
            </Button>
            <Spacer size='xl' />
          </>
        ) : (
          <Box>
            <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Text>{t('wallet.label.connect-to-a-wallet')}</Text>
              <X
                width='14px'
                height='14px'
                onClick={onDismiss}
                cursor='pointer'
                color='black'
              />
            </Flex>
            <Spacer size='xl' />
          </Box>
        )}
        <Box>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridGap: '10px',
              }}
            >
              {getOptions()}
            </Box>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <Flex mt='32px'>
              <Text>{t('wallet.label.new-to-ethereum')}? &nbsp;</Text>{' '}
              <ExternalLink href='https://ethereum.org/wallets/'>
                {t('wallet.label.learn-more-about-wallets')}
              </ExternalLink>
            </Flex>
          )}
        </Box>
      </Box>
    )
  }

  return <Flex flexDirection='column'>{getModalContent()}</Flex>
}

export default WalletModal
