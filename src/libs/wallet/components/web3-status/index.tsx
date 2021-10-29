import { useWeb3React } from '@web3-react/core'
import React from 'react'
// import Image from 'next/image'
import { Text, Flex } from 'rebass/styled-components'
// Hooks
import { useTranslation } from 'react-i18next'
import { useWallet } from '../../hooks'
/*
import {
  isTransactionRecent,
  useAllTransactions,
} from '../../state/transactions/hooks'
*/
import { useModal } from '../../../../hooks'
// Components
import { Button } from '../../../../theme/ui'
import { Modal } from '../../../../theme/ui'
//import Loader from '../loader'
import WalletModal from '../wallet-modal'
// Reducers
//import { TransactionDetails } from '../../state/transactions/reducer'
// Utils
// import { shortenAddress } from '../../utils'
// Constants
import { NetworkContextName } from '../../constants'
// Styles
//import { Smile, Sad } from './index.css'
// Contexts
// import { Context as ModalContext } from '../../theme/ui/layout/modal/context'
// import Tooltip from 'rc-tooltip'

// we want the latest one to come first, so return negative if a is after b
/*
const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => {
  return b.addedTime - a.addedTime
}
*/

interface Web3StatusInnerProps {
  buttonVariant?: string
  text?: string
}
export const Web3StatusInner: React.FC<Web3StatusInnerProps> = ({
  buttonVariant,
  text,
}) => {
  const { t } = useTranslation('wallet')
  const { walletModalOpen, WalletDispatch } = useWallet()
  const toggle = React.useCallback(() => {
    WalletDispatch({
      type: 'UPDATE',
      payload: {
        walletModalOpen: !walletModalOpen,
      },
    })
  }, [WalletDispatch, walletModalOpen])

  const [toggleWalletModal] = useModal(() => {
    toggle()
    return (
      // <Modal title={t('wallet.modal.title')}>
      <Modal>
        <WalletModal />
      </Modal>
    )
  })

  return (
    <Button
      variant={buttonVariant ? buttonVariant : 'primary'}
      py={18}
      px={18}
      sx={{ textTransform: 'uppercase' }}
      onClick={toggleWalletModal}
    >
      <Flex alignItems='center'>
        {text && (
          <Text ml={4} mr={4}>
            {text}
          </Text>
        )}
      </Flex>
    </Button>
  )
}

const Web3Status: React.FC = () => {
  const { active } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  if (!contextNetwork.active && !active) {
    return null
  }

  return <Web3StatusInner />
}

export default Web3Status
