import React from 'react'
// Hooks
import { useTranslation } from 'react-i18next'
import { useResponsive } from '../../../hooks'
import { useActiveWeb3React, useWallet } from '../../../libs/wallet'
// Components
import Image from 'next/image'
import {
  Layout,
  Container,
  Section,
  Spacer,
  Modal,
  ModalContext,
} from '../../../theme/ui'
import { Sidebar, MobileSidebar, NetworkModal } from '../..'
// interfaces
import { BoxProps } from 'rebass'

interface YourAccountLayoutProps extends BoxProps {
  layoutBackgroundImage?: string
}

const YourAccountLayout: React.FC<YourAccountLayoutProps> = ({
  children,
  layoutBackgroundImage,
  ...restprops
}) => {
  const { isTablet } = useResponsive()
  const { t } = useTranslation('common')
  const { chainEnabled } = useWallet()
  const { account } = useActiveWeb3React()
  const { onPresent } = React.useContext(ModalContext)

  React.useEffect(() => {
    if (!account || chainEnabled) return
    onPresent(
      <Modal title={t('modal.title.warning')} width={[320, 320, 386, null]}>
        <NetworkModal />
      </Modal>,
      {
        hideClose: true,
      },
    )
  }, [account, chainEnabled, onPresent, t])

  return (
    <Layout
      {...restprops}
      sx={
        layoutBackgroundImage
          ? {
              backgroundImage: `url(${layoutBackgroundImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto 80%',
              backgroundPositionX: 'calc(65% + 525px)',
              backgroundPositionY: 'center',
            }
          : null
      }
    >
      <Container flexDirection='column'>
        {isTablet && (
          <>
            <Section justifyContent='flex-end'>
              <Image src='/images/logo.svg' width={180} height={30} />
            </Section>
            <Spacer size='xxl' />
          </>
        )}
        <Section>
          {isTablet && <Sidebar />}
          {children}
        </Section>
      </Container>
      {!isTablet && <MobileSidebar />}
    </Layout>
  )
}

export default YourAccountLayout
