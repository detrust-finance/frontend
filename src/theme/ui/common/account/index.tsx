import React from 'react'
import { Flex, FlexProps } from 'rebass/styled-components'
import Image from 'next/image'
import { useActiveWeb3React } from '../../../../libs/wallet'
import { useTheme, useModal } from '../../../../hooks'
import Modal from '../../layout/modal'
import WalletModal from '../../../../libs/wallet/components/wallet-modal'

interface Props extends FlexProps {
  size: string | number
  disableClick?: boolean
  sx?: any
}

const Account = ({ size, disableClick, sx, ...restprops }: Props) => {
  const { account } = useActiveWeb3React()
  const { colors } = useTheme()
  const [toggleWalletModal] = useModal(
    //<Modal title={t('wallet.modal.title')}>
    <Modal>
      <WalletModal />
    </Modal>
  )

  const clickSx = disableClick ? {} : {
    cursor: 'pointer',
  }
  const clickProps = disableClick ? {} : {
    onClick: toggleWalletModal,
  }

  return (
    <Flex
      sx={{
        bg: account ? colors.jaffa : colors.grey[200],
        width: size,
        height: size,
        borderRadius: size,
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.white,
        pr: '1px',
        ...clickSx,
        ...sx,
      }}
      {...clickProps}
      {...restprops}
    >
      <Image src='/images/user.svg' width={22} height={24} />
      {/* <User height={16} /> */}
    </Flex>
  )
}

export default Account
